import { createClient } from '@/lib/supabase/client'
import type { Category, Product, BlogPost, SiteSettings } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  if (error) { console.error('getCategories:', error); return [] }
  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  if (error) return null
  return data
}

export async function getProducts(options?: {
  categorySlug?: string
  featured?: boolean
  limit?: number
  search?: string
}): Promise<Product[]> {
  const supabase = createClient()
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (options?.categorySlug) {
    const { data: cat } = await supabase
      .from('categories').select('id').eq('slug', options.categorySlug).single()
    if (cat) query = query.eq('category_id', cat.id)
  }
  if (options?.featured !== undefined) query = query.eq('featured', options.featured)
  if (options?.search) query = query.ilike('title', `%${options.search}%`)
  if (options?.limit) query = query.limit(options.limit)

  const { data, error } = await query
  if (error) { console.error('getProducts:', error); return [] }
  
  let products = (data || []).map((p: any) => ({ ...p, images: Array.isArray(p.images) ? p.images : [] }))
  
  // Custom logic: If no specific category is selected, show sofas first
  if (!options?.categorySlug) {
    products.sort((a, b) => {
      const isSofaA = a.category?.slug?.toLowerCase().includes('sofa') || a.category?.name?.toLowerCase().includes('sofa')
      const isSofaB = b.category?.slug?.toLowerCase().includes('sofa') || b.category?.name?.toLowerCase().includes('sofa')
      
      if (isSofaA && !isSofaB) return -1
      if (!isSofaA && isSofaB) return 1
      return 0 // Maintain existing order for others
    })
  }
  
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  if (error) return null
  return { ...data, images: Array.isArray(data.images) ? data.images : [] }
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('id', id)
    .eq('active', true)
    .single()
  if (error) return null
  return { ...data, images: Array.isArray(data.images) ? data.images : [] }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getProducts({ featured: true, limit })
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const supabase = createClient()
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error) { console.error('getBlogPosts:', error.message, error.details, error.hint, error.code); return [] }
  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient()
  const { data, error } = await supabase.from('site_settings').select('key, value')
  if (error) { console.error('getSiteSettings:', error); return {} }
  const settings: SiteSettings = {}
  ;(data || []).forEach((row: { key: string; value?: string }) => { settings[row.key] = row.value })
  return settings
}
