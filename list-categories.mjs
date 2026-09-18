import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function listCategories() {
  const { data, error } = await supabase.from('categories').select('id, name, slug, sort_order').order('sort_order', { ascending: true })
  if (error) return console.error(error)
  console.log('Current Categories:')
  data.forEach((c, i) => {
    console.log(`${i + 1}. [${c.sort_order}] ${c.name} (${c.slug})`)
  })
}

listCategories()
