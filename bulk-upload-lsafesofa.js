require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const folderPath = 'C:\\Users\\jafar khan\\Desktop\\jas L safe sofa cumbed';
const CATEGORY_SLUG = 'l-safe-sofa-cumbed';

async function uploadBulkImages() {
  console.log(`Starting bulk upload for ${CATEGORY_SLUG.toUpperCase()}...`);
  
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', CATEGORY_SLUG)
    .single();
    
  if (catError || !catData) {
    console.error(`Error finding ${CATEGORY_SLUG} category. Make sure it exists.`, catError);
    return;
  }
  const categoryId = catData.id;
  console.log(`Found Category ID:`, categoryId);

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to process.`);

  let successCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(folderPath, file);
    let originalTitle = file.replace(/\.(png|jpe?g)$/i, '').trim();
    
    // Extract rate: look for "RATE 36000" or "RATE36000" (case insensitive) at the end
    let price = null;
    let cleanTitle = originalTitle;
    
    const rateMatch = originalTitle.match(/RATE\s*(\d+)/i);
    if (rateMatch && rateMatch[1]) {
      price = parseInt(rateMatch[1], 10);
      // Remove the rate part from the title
      cleanTitle = originalTitle.replace(/RATE\s*\d+/i, '').replace(/\(\d+\)/g, '').trim(); 
      // Also removed things like (1) using replace(/\(\d+\)/g, '')
    } else {
      // Fallback random price if not found
      price = 36000;
    }
    
    // Cleanup any trailing hyphens or spaces
    cleanTitle = cleanTitle.replace(/[-\s]+$/, '').trim();
    
    let slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    console.log(`\n[${i+1}/${files.length}] Processing: ${cleanTitle} (Price: ₹${price})`);
    
    try {
      const buffer = await sharp(filePath)
        .resize(1000, 1000, { fit: 'cover' }) 
        .webp({ quality: 80 })
        .toBuffer();
        
      const fileName = `lsafe-${slug}-${Date.now()}.webp`;

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
        
      const seoDescription = `Experience ultimate luxury and smart design with the ${cleanTitle}. This premium L-Shape Sofa Cum Bed by JAS INTERIOR is meticulously crafted with high-end materials, perfect for elevating your living room decor while providing a comfortable guest bed. Designed and manufactured in Gujarat.`;
      
      const payload = {
        title: cleanTitle,
        slug: slug,
        description: seoDescription,
        short_description: `Premium L-Shape Convertible Sofa Bed.`,
        category_id: categoryId,
        price: price,
        price_enabled: true,
        images: [publicUrl],
        active: true,
        meta_title: `${cleanTitle} - L Shape Sofa Cum Bed | JAS INTERIOR`,
        meta_description: `Buy ${cleanTitle}, a premium custom-made L-Shape sofa bed from JAS INTERIOR, Gujarat. Expertly crafted for comfort, style, and space-saving utility.`
      };

      let { error: dbError } = await supabase.from('products').insert([payload]);
      
      if (dbError && (dbError.code === '23505' || dbError.message.includes('duplicate key'))) {
        payload.slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
        const retry = await supabase.from('products').insert([payload]);
        dbError = retry.error;
      }

      if (dbError) throw new Error(`DB Error: ${dbError.message}`);
      
      console.log(`✅ Successfully added: ${cleanTitle}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed: ${cleanTitle} - ${err.message}`);
    }
  }
  
  console.log(`\n🎉 Bulk upload complete! Successfully added ${successCount} out of ${files.length} products.`);
}

uploadBulkImages();
