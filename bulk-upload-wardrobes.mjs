import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// Ensure we load env vars
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials!")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const FOLDER_PATH = 'C:\\Users\\jafar khan\\Desktop\\jas wardrobe'
const CATEGORY_SLUG = 'wardrobe'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
}

async function uploadWardrobes() {
  console.log(`Starting bulk upload from ${FOLDER_PATH}...`)

  // 1. Get Category ID
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', CATEGORY_SLUG)
    .single()

  if (catError || !catData) {
    console.error(`Failed to find category with slug '${CATEGORY_SLUG}'. Error:`, catError)
    return
  }
  const categoryId = catData.id
  console.log(`Found category '${CATEGORY_SLUG}' with ID: ${categoryId}`)

  // 2. Read Files
  const files = fs.readdirSync(FOLDER_PATH).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
  console.log(`Found ${files.length} images to upload.`)

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const file of files) {
    const filePath = path.join(FOLDER_PATH, file)
    const title = file.replace(/\.(png|jpg|jpeg)$/i, '').trim()
    let slug = slugify(title)

    // Check if product exists
    const { data: existing } = await supabase.from('products').select('id').eq('slug', slug).maybeSingle()
    if (existing) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`
    }

    try {
      console.log(`Processing: ${title}...`)
      
      // Upload image
      const fileBuffer = fs.readFileSync(filePath)
      const fileName = `${Date.now()}-${slug}.png`
      const storagePath = `wardrobes/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('products')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/png',
          upsert: true
        })

      if (uploadError) {
        console.error(`  -> Image upload failed:`, uploadError.message)
        errorCount++
        continue
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(storagePath)

      // Random price between 25,000 and 75,000, rounded to nearest 1000
      const randomPriceRaw = Math.floor(Math.random() * (75000 - 25000) + 25000)
      const price = Math.round(randomPriceRaw / 1000) * 1000

      // Insert DB record
      const { error: dbError } = await supabase.from('products').insert({
        title,
        slug,
        category_id: categoryId,
        price,
        price_enabled: true,
        images: [publicUrl],
        active: true,
        featured: false,
        short_description: `Premium custom ${title.toLowerCase()} for your home.`,
        description: `Elevate your space with this stunning ${title.toLowerCase()}. Manufactured locally in Gujarat with the finest materials and craftsmanship. Fully customizable to fit your specific dimensions and color preferences.`
      })

      if (dbError) {
        console.error(`  -> DB insert failed:`, dbError.message)
        errorCount++
      } else {
        console.log(`  -> Successfully added ${title}!`)
        successCount++
      }
    } catch (e) {
      console.error(`  -> Unexpected error:`, e.message)
      errorCount++
    }
  }

  console.log(`\nUpload complete!`)
  console.log(`Success: ${successCount}`)
  console.log(`Skipped: ${skipCount}`)
  console.log(`Errors:  ${errorCount}`)
}

uploadWardrobes()
