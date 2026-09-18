import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function restoreTitles() {
  console.log('Reading old_titles.txt...')
  const logContent = fs.readFileSync('old_titles.txt', 'utf-8')
  
  // Parse the log to get mapping of New -> Old
  // Format:
  //   Old: Blush Cloud Sofa Living Room
  //   New: Premium Navy Blue Royal Velvet Wingback Bed
  
  const lines = logContent.split('\n')
  let currentOld = ''
  let currentNew = ''
  
  const titleMap = new Map() // newTitle -> oldTitle
  
  for (const line of lines) {
    if (line.trim().startsWith('Old:')) {
      currentOld = line.replace('Old:', '').trim()
    } else if (line.trim().startsWith('New:')) {
      currentNew = line.replace('New:', '').trim()
      if (currentOld && currentNew) {
        titleMap.set(currentNew, currentOld)
      }
    }
  }
  
  console.log(`Found ${titleMap.size} mappings to restore.`)
  
  // Fetch all current products
  const { data: products, error } = await supabase.from('products').select('*')
  if (error) {
    console.error('Error fetching products:', error)
    return
  }

  let restoredCount = 0
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const oldTitle = titleMap.get(product.title)
    
    if (oldTitle) {
      let newSlug = oldTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      newSlug = `${newSlug}-${Math.floor(Math.random() * 10000)}`
      
      console.log(`Restoring [${product.id}]:\n  From: ${product.title}\n  To:   ${oldTitle}`)
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ title: oldTitle, slug: newSlug })
        .eq('id', product.id)
        
      if (updateError) {
        console.error('  Failed to update:', updateError.message)
      } else {
        restoredCount++
      }
    } else {
      console.log(`No mapping found for: ${product.title}`)
    }
  }
  
  console.log(`\nFinished restoring ${restoredCount} product titles!`)
}

restoreTitles()
