import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Pre-defined premium titles for beds
const bedTitles = [
  "Royal Velvet Wingback Bed",
  "Minimalist Teak Platform Bed",
  "Mid-Century Upholstered Bed",
  "Chesterfield Tufted King Bed",
  "Modern Scandi Wooden Bed",
  "Premium Leather Panel Bed",
  "Classic Sleigh Bed Frame",
  "Luxury Floating Platform Bed",
  "Cozy Boucle Fabric Bed",
  "Industrial Metal & Wood Bed",
  "Opulent Gold-Trimmed Bed",
  "Low-Profile Zen Platform Bed",
  "Regal Button-Tufted Bed",
  "Rustic Oak Wood Bed",
  "Contemporary Slat Headboard Bed"
]

// Pre-defined premium titles for sofas
const sofaTitles = [
  "L-Shape Italian Leather Sectional",
  "Modern U-Shape Velvet Sofa",
  "Chesterfield Deep Tufted Sofa",
  "Minimalist Cloud Couch",
  "Mid-Century Modern Loveseat",
  "Premium Reclining Sectional",
  "Curved Boucle Sofa",
  "Elegant Tuxedo Sofa",
  "Contemporary Modular Sectional",
  "Luxury Camelback Sofa",
  "Cozy Lawson Style Sofa",
  "Oversized Slouchy Sofa",
  "Plush Velvet Chaise Sectional",
  "Sleek Track Arm Sofa",
  "Royal Gold-Plated Trim Sofa"
]

const adjectives = ["Premium", "Luxury", "Bespoke", "Designer", "Handcrafted", "Elegant", "Signature"]
const colors = ["Navy Blue", "Emerald Green", "Charcoal Grey", "Cream White", "Midnight Black", "Blush Pink", "Mustard Yellow", "Ruby Red", "Teal", "Taupe", "Espresso", "Walnut", "Ivory"]

function generateTitle(categoryName, index) {
  const isBed = categoryName?.toLowerCase() === 'bed'
  const isSofa = categoryName?.toLowerCase() === 'sofa'
  
  const baseList = isBed ? bedTitles : isSofa ? sofaTitles : bedTitles
  const baseTitle = baseList[index % baseList.length]
  const adj = adjectives[index % adjectives.length]
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  return `${adj} ${color} ${baseTitle}`
}

async function updateTitles() {
  console.log('Fetching all products...')
  const { data: products, error } = await supabase.from('products').select('*, category:categories(name)')
  if (error) {
    console.error('Error fetching products:', error)
    return
  }

  console.log(`Found ${products.length} products to analyze.`)

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    
    // Generate new title
    let newTitle = generateTitle(product.category?.name, i)
    let newSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    
    // Append random number to slug to prevent duplicates
    newSlug = `${newSlug}-${Math.floor(Math.random() * 10000)}`

    console.log(`\n[${i+1}/${products.length}] Updating:`)
    console.log(`  Old: ${product.title}`)
    console.log(`  New: ${newTitle}`)

    const { error: updateError } = await supabase
      .from('products')
      .update({ title: newTitle, slug: newSlug })
      .eq('id', product.id)

    if (updateError) {
      console.error('  Failed to update:', updateError.message)
    }
  }
  
  console.log('\nFinished updating all product titles!')
}

updateTitles()
