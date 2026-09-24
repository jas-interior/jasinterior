require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const DIR = 'C:\\Users\\jafar khan\\Desktop\\jas ragular bed';

const description = `🛏️ Wooden Folding Bed – Plywood
Premium Wooden Folding Bed made with quality plywood, designed for durability, strength and everyday use.

Material: 16+2 mm Quality Plywood
Type: Wooden Folding Bed
Warranty: 5 Years

Delivery: All Gujarat delivery facility available
Delivery Charges: Extra as per location
Suitable for home, bedroom, guest room and space-saving requirements.

📦 All Gujarat Delivery Available
💰 Best Price | Quality Plywood | 5 Year Warranty`;

const variants = [
  { size: '4 × 6 ft', price: 15000 },
  { size: '5 × 6 ft', price: 20000 },
  { size: '6 × 6 ft', price: 25000 }
];

async function run() {
  const { data: existingCat } = await supabase.from('categories').select('id').eq('slug', 'regular-bed').single();
  if (!existingCat) throw new Error('Category not found');
  const categoryId = existingCat.id;

  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images.`);

  let successCount = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let title = file.replace(/\.(png|jpg|jpeg)$/i, '');
    
    // Add "Wooden Folding Bed -" prefix to title to make it look professional
    title = `Wooden Folding Bed - ${title}`;
    
    const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    const slug = `${slugBase}-${Date.now()}`;
    
    // Check if already exists by title
    const { data: existingProd } = await supabase.from('products').select('id').eq('title', title).single();
    if (existingProd) {
      console.log(`[${i+1}/${files.length}] Skipping existing: ${title}`);
      continue;
    }

    console.log(`[${i+1}/${files.length}] Processing: ${title}`);
    const inputPath = path.join(DIR, file);
    const outputPath = path.join(__dirname, `tmp-${i}.webp`);
    
    try {
      execSync(`ffmpeg -y -i "${inputPath}" -c:v libwebp -quality 80 "${outputPath}"`, { stdio: 'ignore' });
      
      const fileBuffer = fs.readFileSync(outputPath);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('products')
        .upload(`regular-bed-${Date.now()}-${i}.webp`, fileBuffer, {
          contentType: 'image/webp',
          upsert: false
        });

      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(uploadData.path);
      
      const { error: prodError } = await supabase
        .from('products')
        .insert([{
          title: title,
          slug: slug,
          description: description,
          category_id: categoryId,
          price: 15000,
          price_enabled: true,
          images: [publicUrl],
          variants: variants,
          active: true
        }]);

      if (prodError) throw prodError;
      successCount++;
    } catch (err) {
      console.error(`Error on ${title}:`, err.message);
    } finally {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    }
  }
  
  console.log(`Successfully processed ${successCount} products!`);
}
run();
