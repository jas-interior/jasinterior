import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function getStorageSize() {
  console.log('Calculating storage size for "products" bucket...')
  
  let totalBytes = 0
  let totalFiles = 0

  // The files might be in root or in folders like 'wardrobes/'
  // Supabase list() only lists a specific path. We need to check both root and 'wardrobes' if we used folders.
  // Actually, wait, list() can be used recursively or we just check the known paths.
  
  const pathsToCheck = ['', 'wardrobes']
  
  for (const folder of pathsToCheck) {
    let hasMore = true
    let limit = 100
    let offset = 0
    
    while (hasMore) {
      const { data, error } = await supabase.storage.from('products').list(folder, {
        limit: limit,
        offset: offset,
      })
      
      if (error) {
        console.error('Error fetching list:', error.message)
        break
      }
      
      if (!data || data.length === 0) {
        hasMore = false
        break
      }
      
      for (const file of data) {
        // Ignore placeholders or directories (often have size 0 or no metadata)
        if (file.metadata && file.metadata.size) {
          totalBytes += file.metadata.size
          totalFiles++
        }
      }
      
      if (data.length < limit) {
        hasMore = false
      } else {
        offset += limit
      }
    }
  }

  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2)
  console.log(`\nTotal Files: ${totalFiles}`)
  console.log(`Total Size: ${totalMB} MB`)
}

getStorageSize()
