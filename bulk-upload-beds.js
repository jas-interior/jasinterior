require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const folderPath = 'C:\\Users\\jafar khan\\Desktop\\jas product bed';

async function uploadBulkImages() {
  console.log('Starting bulk upload for BEDS...');
  
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'bed')
    .single();
    
  if (catError || !catData) {
    console.error('Error finding Bed category. Make sure it exists.', catError);
    return;
  }
  const categoryId = catData.id;
  console.log('Found Bed Category ID:', categoryId);

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to process.`);

  let successCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(folderPath, file);
    const title = file.replace(/\.(png|jpe?g)$/i, '').trim();
    
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    console.log(`\n[${i+1}/${files.length}] Processing: ${title}`);
    
    try {
      const buffer = await sharp(filePath)
        .resize(1000, 1000, { fit: 'cover' }) 
        .webp({ quality: 80 })
        .toBuffer();
        
      const fileName = `${slug}-${Date.now()}.webp`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, buffer, {
          contentType: 'image/webp',
          upsert: false
        });

      if (uploadError) throw new Error(`Upload Error: ${uploadError.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
        
      const seoDescription = `Experience ultimate luxury and comfort with the ${title}. This premium quality bed by JAS INTERIOR is meticulously crafted with high-end materials, perfect for elevating your modern bedroom decor. Custom sizes, colors, and finishes are available on request. Designed and manufactured in Gujarat.`;
      
      const payload = {
        title: title,
        slug: slug,
        description: seoDescription,
        category_id: categoryId,
        price_enabled: false,
        images: [publicUrl],
        active: true,
        meta_title: `${title} - Premium Luxury Bed | JAS INTERIOR`,
        meta_description: `Buy ${title}, a premium custom-made luxury bed from JAS INTERIOR, Gujarat. Expertly crafted for comfort and modern bedroom styling. Available in custom sizes.`
      };

      let { error: dbError } = await supabase.from('products').insert([payload]);
      
      if (dbError && (dbError.code === '23505' || dbError.message.includes('duplicate key'))) {
        payload.slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
        const retry = await supabase.from('products').insert([payload]);
        dbError = retry.error;
      }

      if (dbError) throw new Error(`DB Error: ${dbError.message}`);
      
      console.log(`✅ Successfully added: ${title}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed: ${title} - ${err.message}`);
    }
  }
  
  console.log(`\n🎉 Bulk upload complete! Successfully added ${successCount} out of ${files.length} products.`);
}

uploadBulkImages();
