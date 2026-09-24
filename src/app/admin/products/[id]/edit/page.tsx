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
  const [variants, setVariants] = useState<{size: string, price: string}[]>([])
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
        if (p.variants) setVariants(p.variants.map((v:any) => ({ size: v.size, price: v.price.toString() })));
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
        active: formData.active,
        variants: variants.filter(v => v.size && v.price).map(v => ({ size: v.size, price: Number(v.price) }))
      }

      const { error } = await supabase.from('products').update(payload).eq('id', id)
      
      if (error) throw error
      
      toast.success('Product updated successfully!', { id: toastId })
      router.refresh()
      setTimeout(() => router.back(), 100)
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
            <div className="space-y-4">
              <div><label className="block text-xs text-[#555] mb-1.5">Base Price (₹)</label><input type="number" name="price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="input-gold" placeholder="e.g. 15000" /></div>
              
              <div className="pt-4 border-t border-[#eaeaea]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-[#111111]">Size Variants (Optional)</label>
                  <div className="flex items-center gap-4">
                    {categories.find(c => c.id === formData.category_id)?.slug === 'regular-wardrobe' && (
                      <button type="button" onClick={() => setVariants([...variants, {size: '3 × 6.25 ft', price: ''}, {size: '4 × 6.25 ft', price: ''}, {size: '5 × 6.25 ft', price: ''}, {size: '6 × 6.25 ft', price: ''}, {size: '7 × 7 ft', price: ''}])} className="text-xs text-[#3b82f6] font-medium hover:underline">+ Quick Fill Wardrobe Sizes</button>
                    )}
                    {categories.find(c => c.id === formData.category_id)?.slug === 'regular-bed' && (
                      <button type="button" onClick={() => setVariants([...variants, {size: '4 × 6 ft', price: ''}, {size: '5 × 6 ft', price: ''}, {size: '6 × 6 ft', price: ''}])} className="text-xs text-[#3b82f6] font-medium hover:underline">+ Quick Fill Bed Sizes</button>
                    )}
                    <button type="button" onClick={() => setVariants([...variants, {size: '', price: ''}])} className="text-xs text-[#c8941a] font-medium hover:underline">+ Add Variant</button>
                  </div>
                </div>
                {variants.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input type="text" placeholder="Size (e.g. 4 x 6 ft)" value={v.size} onChange={(e) => { const newV = [...variants]; newV[i].size = e.target.value; setVariants(newV) }} className="flex-1 border border-[#eaeaea] rounded-lg px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#c8941a]" style={{ minWidth: "120px" }} />
                    <input type="number" placeholder="Price" value={v.price} onChange={(e) => { const newV = [...variants]; newV[i].price = e.target.value; setVariants(newV) }} className="w-28 border border-[#eaeaea] rounded-lg px-3 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#c8941a]" />
                    <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">X</button>
                  </div>
                ))}
              </div>
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
