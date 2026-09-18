import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function reorderCategories() {
  const desiredOrder = [
    'sofa', // 1
    'bed', // 2
    'l-safe-sofa-cumbed', // 3
    '3-seater-sofa-cumbed', // 4
    'wardrobe', // 5
    'dining-table', // 6
    'tv-unit', // 7
    'mattress', // 8
    't-table' // 9
  ]

  for (let i = 0; i < desiredOrder.length; i++) {
    const slug = desiredOrder[i]
    const { error } = await supabase.from('categories').update({ sort_order: i + 1 }).eq('slug', slug)
    if (error) {
      console.error(`Error updating ${slug}:`, error)
    } else {
      console.log(`Updated ${slug} to position ${i + 1}`)
    }
  }
}

reorderCategories()
