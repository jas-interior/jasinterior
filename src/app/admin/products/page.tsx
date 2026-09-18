'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Search, ExternalLink } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const [prodRes, catRes] = await Promise.all([
      supabase.from('products').select('*, category:categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name').order('name', { ascending: true })
    ])
    if (prodRes.data) setProducts(prodRes.data)
    if (catRes.data) setCategories(catRes.data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const toggleActive = async (id: string, current: boolean) => {
    const supabase = createClient()
    await supabase.from('products').update({ active: !current }).eq('id', id)
    loadData()
  }

  const toggleFeatured = async (id: string, current: boolean) => {
    const supabase = createClient()
    await supabase.from('products').update({ featured: !current }).eq('id', id)
    loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    const supabase = createClient()
    const toastId = toast.loading('Deleting...')
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) toast.error(error.message, { id: toastId })
    else { toast.success('Deleted successfully', { id: toastId }); loadData() }
  }

  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" />
            <button className="absolute -top-10 right-0 text-white hover:text-[#c8941a] font-bold text-xl" onClick={() => setPreviewImage(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">Products</h1>
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-gold h-10 text-sm px-3 w-full sm:w-auto min-w-[140px] bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="relative flex-grow sm:flex-grow-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-gold pl-9 h-10 w-full sm:w-64" />
          </div>
          <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gold text-sm font-semibold whitespace-nowrap text-white w-full sm:w-auto justify-center">
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden max-w-full">
        <div className="overflow-x-auto w-full">
          <table className="admin-table min-w-[800px] w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8">No products found.</td></tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => prod.images?.[0] && setPreviewImage(prod.images[0])}
                          className="w-16 h-16 rounded-lg overflow-hidden bg-[#faf9f6] flex-shrink-0 border border-[#eaeaea] hover:border-[#c8941a] transition-colors cursor-zoom-in"
                        >
                          {prod.images?.[0] ? <Image src={prod.images[0]} alt="" width={64} height={64} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No img</div>}
                        </button>
                        <div>
                          <p className="font-medium text-[#111111] line-clamp-1 max-w-[200px]">{prod.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#555555]">{prod.category?.name || '-'}</td>
                    <td className="font-medium text-[#c8941a]">{prod.price && prod.price_enabled ? formatPrice(prod.price) : 'On Request'}</td>
                    <td>
                      <button onClick={() => toggleActive(prod.id, prod.active)} className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider ${prod.active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {prod.active ? 'ACTIVE' : 'HIDDEN'}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => toggleFeatured(prod.id, prod.featured)} className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider ${prod.featured ? 'bg-[#c8941a]/10 text-[#c8941a] border border-[#c8941a]/20' : 'bg-[#f0f0f0] text-[#666666] border border-[#eaeaea]'}`}>
                        {prod.featured ? 'FEATURED' : 'NORMAL'}
                      </button>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/product/${prod.slug}`} target="_blank" className="p-2 text-[#555555] hover:text-[#111111] transition-colors" title="View"><ExternalLink size={16} /></Link>
                        <Link href={`/admin/products/${prod.id}/edit`} className="p-2 text-[#555555] hover:text-[#c8941a] transition-colors" title="Edit"><Edit size={16} /></Link>
                        <button onClick={() => handleDelete(prod.id, prod.title)} className="p-2 text-[#555555] hover:text-red-500 transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
