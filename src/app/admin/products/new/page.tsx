'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, ArrowLeft, Upload, X, Plus } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import type { Category } from '@/types'

export default function AddProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [form, setForm] = useState({
    title: '', slug: '', description: '', short_description: '',
    category_id: '', price: '', price_enabled: true,
    featured: false, active: true
  })

  // Image Upload States
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [seoName, setSeoName] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      if (data) setCategories(data)
    })
    
    // Load last used category
    const lastCategory = localStorage.getItem('jas_admin_last_add_category')
    if (lastCategory) {
      setForm(prev => ({ ...prev, category_id: lastCategory }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'category_id') {
      localStorage.setItem('jas_admin_last_add_category', e.target.value)
    }
  }

  const generateSlug = (val: string) => {
    setForm({ ...form, title: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
  }

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setSeoName(form.slug || 'premium-furniture')
    }
    // reset input so same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const cancelImageUpload = () => {
    setSelectedFile(null)
    setSeoName('')
  }

  const processAndUploadImage = async () => {
    if (!selectedFile || !seoName) return
    setIsUploading(true)
    const toastId = toast.loading('Processing & Uploading image...')
    
    try {
      // 1. Load image into memory
      const img = new window.Image()
      const objectUrl = URL.createObjectURL(selectedFile)
      img.src = objectUrl
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      
      // 2. Setup Canvas for 1:1 Crop
      const canvas = document.createElement('canvas')
      const size = Math.min(img.width, img.height) // Shortest side for square crop
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      
      // Calculate center crop
      const startX = (img.width - size) / 2
      const startY = (img.height - size) / 2
      
      ctx?.drawImage(img, startX, startY, size, size, 0, 0, size, size)
      
      // 3. Convert to WEBP
      const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b)
          else reject(new Error('Canvas to Blob failed'))
        }, 'image/webp', 0.85) // 85% quality WEBP
      })
      
      // 4. Upload to Supabase Storage
      const supabase = createClient()
      const safeSeoName = seoName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const fileName = `${safeSeoName}-${Date.now()}.webp`
      
      const { data, error } = await supabase.storage.from('products').upload(fileName, blob, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: false
      })
      
      if (error) {
        if (error.message.includes('Bucket not found')) {
           throw new Error('Supabase Storage bucket "products" does not exist. Please create it in your Supabase dashboard and make it public.')
        }
        throw error
      }
      
      // 5. Get public URL
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName)
      
      setImageUrls([...imageUrls, publicUrl])
      setSelectedFile(null)
      toast.success('Image compressed and uploaded successfully!', { id: toastId })
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Image upload failed', { id: toastId })
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (idx: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug || !form.category_id) return toast.error('Title, slug and category are required')
    
    setLoading(true)
    const supabase = createClient()
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : null,
      images: imageUrls
    }

    let { error } = await supabase.from('products').insert([payload])
    
    // JUGAAD: If error is duplicate unique constraint (slug exists), append random number and retry automatically
    if (error && (error.code === '23505' || error.message.includes('duplicate key'))) {
      payload.slug = `${payload.slug}-${Math.floor(Math.random() * 10000)}`
      const retry = await supabase.from('products').insert([payload])
      error = retry.error
    }
    
    setLoading(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Product added successfully!')
      router.push('/admin/products')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-white rounded-lg text-[#555555] hover:text-black"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-[#111111]">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#111111] mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div><label className="block text-xs text-[#555555] mb-1.5">Product Title *</label><input name="title" value={form.title} onChange={(e) => generateSlug(e.target.value)} className="input-gold" required /></div>
                <div><label className="block text-xs text-[#555555] mb-1.5">Slug (URL) *</label><input name="slug" value={form.slug} onChange={handleChange} className="input-gold" required /></div>
                <div><label className="block text-xs text-[#555555] mb-1.5">Short Description</label><textarea name="short_description" value={form.short_description} onChange={handleChange} rows={2} className="input-gold resize-none" /></div>
                <div><label className="block text-xs text-[#555555] mb-1.5">Full Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={6} className="input-gold resize-none" /></div>
              </div>
            </div>

            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#111111]">Images (1:1 WebP)</h2>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>
              
              {/* Image Preview & Upload Dialog */}
              {selectedFile && (
                <div className="p-4 bg-white border border-[#eaeaea] rounded-xl mb-6">
                  <h3 className="text-sm font-semibold text-[#c8941a] mb-3">Upload & Compress Image</h3>
                  <div className="flex gap-4 items-start">
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-[#eaeaea]" />
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs text-[#555555] mb-1">SEO Image Name (e.g. luxury-sofa-black)</label>
                        <input type="text" value={seoName} onChange={(e) => setSeoName(e.target.value)} className="input-gold text-sm h-9" placeholder="luxury-sofa-black" />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={processAndUploadImage} disabled={isUploading} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg disabled:opacity-50">
                          {isUploading ? 'Compressing...' : 'Upload Image'}
                        </button>
                        <button type="button" onClick={cancelImageUpload} disabled={isUploading} className="px-4 py-2 bg-[#f0f0f0] hover:bg-[#f0f0f0] text-white text-xs font-semibold rounded-lg disabled:opacity-50">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white border border-[#eaeaea] group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                  </div>
                ))}
                {!selectedFile && (
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-lg border-2 border-dashed border-[#eaeaea] hover:border-[#c8941a]/40 flex flex-col items-center justify-center text-[#666666] hover:text-[#c8941a] transition-colors">
                    <Upload size={24} className="mb-2" />
                    <span className="text-xs font-semibold">Select File</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#111111] mb-4">Organization & Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#555555] mb-1.5">Category *</label>
                  <select name="category_id" value={form.category_id} onChange={handleChange} className="input-gold" required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                
                <div className="pt-2 border-t border-[#eaeaea]">
                  <label className="flex items-center justify-between cursor-pointer mb-3">
                    <span className="text-sm font-medium text-[#111111]">Enable Pricing</span>
                    <input type="checkbox" checked={form.price_enabled} onChange={(e) => setForm({...form, price_enabled: e.target.checked})} className="accent-[#c8941a] w-4 h-4" />
                  </label>
                  {form.price_enabled && (
                    <div><label className="block text-xs text-[#555555] mb-1.5">Price (₹)</label><input type="number" name="price" value={form.price} onChange={handleChange} className="input-gold" placeholder="e.g. 45000" /></div>
                  )}
                  {!form.price_enabled && <p className="text-xs text-[#666666] italic">Product will show "Price on Request" instead of a specific amount.</p>}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#111111] mb-4">Visibility</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div><span className="block text-sm font-medium text-[#111111]">Active</span><span className="text-xs text-[#666666]">Visible on website</span></div>
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} className="accent-[#c8941a] w-4 h-4" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div><span className="block text-sm font-medium text-[#111111]">Featured</span><span className="text-xs text-[#666666]">Show on homepage</span></div>
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="accent-[#c8941a] w-4 h-4" />
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl btn-gold font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
              <CheckCircle size={18} /> {loading ? 'Saving...' : 'Publish Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
