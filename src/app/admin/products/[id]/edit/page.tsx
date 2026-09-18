'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    price: '',
    price_enabled: true,
    featured: false,
    active: true
  })

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      const [catsRes, prodRes] = await Promise.all([
        supabase.from('categories').select('id, name').eq('active', true),
        supabase.from('products').select('*').eq('id', id).single()
      ])

      if (catsRes.data) setCategories(catsRes.data)
      if (prodRes.data) {
        const p = prodRes.data
        setFormData({
          title: p.title || '',
          slug: p.slug || '',
          description: p.description || '',
          short_description: p.short_description || '',
          category_id: p.category_id || '',
          price: p.price ? p.price.toString() : '',
          price_enabled: p.price_enabled ?? true,
          featured: p.featured ?? false,
          active: p.active ?? true
        })
      } else {
        toast.error('Product not found')
        router.push('/admin/products')
      }
      setLoading(false)
    }
    loadData()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const toastId = toast.loading('Saving changes...')

    try {
      const supabase = createClient()
      
      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        short_description: formData.short_description,
        category_id: formData.category_id || null,
        price: formData.price ? parseFloat(formData.price) : null,
        price_enabled: formData.price_enabled,
        featured: formData.featured,
        active: formData.active
      }

      const { error } = await supabase.from('products').update(payload).eq('id', id)
      
      if (error) throw error
      
      toast.success('Product updated successfully!', { id: toastId })
      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Error updating product', { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8">Loading product details...</div>

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-10 h-10 rounded-full bg-white border border-[#eaeaea] flex items-center justify-center text-[#555] hover:text-[#111111] transition-colors"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-[#111111]">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#eaeaea] p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-[#111111] mb-4">Basic Details</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#555] mb-1">Product Title *</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-gold" />
            </div>
            <div>
              <label className="block text-xs text-[#555] mb-1">SEO URL (Slug) *</label>
              <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="input-gold" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#555] mb-1">Category</label>
            <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="input-gold">
              <option value="">No Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#555] mb-1">Description</label>
            <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-gold resize-none" />
          </div>
        </div>

        <div className="bg-white border border-[#eaeaea] p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-[#111111] mb-4">Pricing & Status</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <input type="checkbox" id="price_enabled" checked={formData.price_enabled} onChange={e => setFormData({...formData, price_enabled: e.target.checked})} className="w-4 h-4 accent-[#c8941a]" />
            <label htmlFor="price_enabled" className="text-sm text-[#111111]">Show Price (If unchecked, shows "Price on Request")</label>
          </div>

          {formData.price_enabled && (
            <div>
              <label className="block text-xs text-[#555] mb-1">Price (₹)</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="input-gold" placeholder="e.g. 15000" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#eaeaea]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 accent-[#c8941a]" />
              <span className="text-sm font-medium text-[#111111]">Active (Visible)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-[#c8941a]" />
              <span className="text-sm font-medium text-[#111111]">Featured Product</span>
            </label>
          </div>
        </div>

        <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-gold font-semibold text-lg">
          <Save size={20} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
