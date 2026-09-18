require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const folderPath = 'C:\\Users\\jafar khan\\Desktop\\jas product sofa';

async function uploadBulkImages() {
  console.log('Starting bulk upload...');
  
  // 1. Get Sofa Category ID
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'sofa')
    .single();
    
  if (catError || !catData) {
    console.error('Error finding Sofa category. Make sure it exists.', catError);
    return;
  }
  const sofaCategoryId = catData.id;
  console.log('Found Sofa Category ID:', sofaCategoryId);

  // 2. Read Files
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to process.`);

  let successCount = 0;

  // Process sequentially to avoid overwhelming memory/network
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(folderPath, file);
    const title = file.replace(/\.(png|jpe?g)$/i, '').trim();
    
    // Generate clean slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    console.log(`\n[${i+1}/${files.length}] Processing: ${title}`);
    
    try {
      // 3. Process Image with Sharp (Crop 1:1, compress to WebP)
      const buffer = await sharp(filePath)
        .resize(1000, 1000, { fit: 'cover' }) // 1:1 crop, 1000x1000 resolution
        .webp({ quality: 80 })
        .toBuffer();
        
      const fileName = `${slug}-${Date.now()}.webp`;

      // 4. Upload to Supabase Storage
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
        
      // 5. Insert into Products Table
      const payload = {
        title: title,
        slug: slug,
        description: `Premium quality ${title} crafted by JAS INTERIOR.`,
        category_id: sofaCategoryId,
        price_enabled: false, // Price on Request
        images: [publicUrl],
        active: true
      };

      let { error: dbError } = await supabase.from('products').insert([payload]);
      
      // Handle duplicate slug
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
