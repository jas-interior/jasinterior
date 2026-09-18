import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function roundPrices() {
  console.log('Fetching all products...')
  const { data: products, error } = await supabase.from('products').select('*')
  if (error) return console.error(error)

  let updatedCount = 0

  for (let p of products) {
    if (p.price) {
      const rounded = Math.round(p.price / 1000) * 1000
      if (rounded !== p.price) {
        await supabase.from('products').update({ price: rounded }).eq('id', p.id)
        updatedCount++
        console.log(`Updated ${p.price} -> ${rounded}`)
      }
    }
  }

  console.log(`Rounded ${updatedCount} product prices to nearest 1000.`)
}

roundPrices()
