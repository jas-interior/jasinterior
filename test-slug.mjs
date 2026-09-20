import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function testSlug() {
  const { data } = await supabase
    .from('products')
    .select('slug, title')
    .limit(10)
  console.log(data)
}

testSlug()
