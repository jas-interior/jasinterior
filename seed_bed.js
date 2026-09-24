require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const { execSync } = require('child_process');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  try {
    // 1. Create Category
    console.log('Creating category...');
    const { data: categoryData, error: catError } = await supabase
      .from('categories')
      .insert([{ 
        name: 'Regular Bed', 
        slug: 'regular-bed',
        active: true
      }])
      .select()
      .single();

    let categoryId;
    if (catError) {
      if (catError.code === '23505') {
        console.log('Category already exists, fetching it...');
        const { data: existingCat } = await supabase.from('categories').select('id').eq('slug', 'regular-bed').single();
        categoryId = existingCat.id;
      } else {
        throw catError;
      }
    } else {
      categoryId = categoryData.id;
    }
    console.log('Category ID:', categoryId);

    // 2. Upload Image
    const inputPath = 'C:\\Users\\jafar khan\\Desktop\\jas ragular bed\\Modern Dark-Wood Bedroom Interior.png';
    const outputPath = 'wooden-folding-bed-plywood-1.webp';
    
    console.log('Converting image to webp...');
    execSync(`ffmpeg -y -i "${inputPath}" -c:v libwebp -quality 80 "${outputPath}"`, { stdio: 'ignore' });
    
    console.log('Uploading image...');
    const fileBuffer = fs.readFileSync(outputPath);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('products')
      .upload(`regular-bed-${Date.now()}.webp`, fileBuffer, {
        contentType: 'image/webp',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(uploadData.path);
    console.log('Image uploaded:', publicUrl);

    // 3. Create Product
    console.log('Creating product...');
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
      { size: '4 × 6 ft', price: 10000 },
      { size: '5 × 6 ft', price: 12000 },
      { size: '6 × 6 ft', price: 15000 }
    ];

    const { data: prodData, error: prodError } = await supabase
      .from('products')
      .insert([{
        title: 'Wooden Folding Bed – Plywood',
        slug: 'wooden-folding-bed-plywood',
        description: description,
        category_id: categoryId,
        price: 10000,
        price_enabled: true,
        images: [publicUrl],
        variants: variants,
        active: true
      }])
      .select();

    if (prodError) throw prodError;
    console.log('Product created successfully!');

    // Cleanup
    fs.unlinkSync(outputPath);
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
