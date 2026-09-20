import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function testSort() {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .order('created_at', { ascending: false })
    
  if (error) return console.error(error)
  
  let products = data || []
  console.log('--- Before Sort ---')
  console.log(products.map(p => `${p.title} (${p.category?.slug})`).slice(0, 5))
  
  products.sort((a, b) => {
      const isPureSofaA = a.category?.slug?.toLowerCase() === 'sofa'
      const isPureSofaB = b.category?.slug?.toLowerCase() === 'sofa'
      if (isPureSofaA && !isPureSofaB) return -1
      if (!isPureSofaA && isPureSofaB) return 1

      const isOtherSofaA = a.category?.slug?.toLowerCase().includes('sofa') || a.category?.name?.toLowerCase().includes('sofa')
      const isOtherSofaB = b.category?.slug?.toLowerCase().includes('sofa') || b.category?.name?.toLowerCase().includes('sofa')
      if (isOtherSofaA && !isOtherSofaB) return -1
      if (!isOtherSofaA && isOtherSofaB) return 1

      return 0
  })

  console.log('\n--- After Sort ---')
  console.log(products.map(p => `${p.title} (${p.category?.slug})`).slice(0, 20))
}

testSort()
