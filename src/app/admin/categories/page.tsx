'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, X, CheckCircle, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import type { Category } from '@/types'

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const [form, setForm] = useState({ name: '', slug: '', description: '', image_url: '', sort_order: 0, active: true })

  
  const compressImageToWebp = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > 800) { height = Math.round((height * 800) / width); width = 800; }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('No context');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject('Blob conversion failed');
          }, 'image/webp', 0.8);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const toastId = toast.loading('Compressing and uploading image...');
    try {
      const webpBlob = await compressImageToWebp(file);
      const supabase = createClient();
      const fileName = `category-${form.slug}-${Date.now()}.webp`;
      
      const { data, error } = await supabase.storage.from('products').upload(fileName, webpBlob, { contentType: 'image/webp' });
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
      setForm({ ...form, image_url: publicUrl });
      toast.success('Image uploaded!', { id: toastId });
    } catch (err: any) {
      toast.error('Failed to upload image', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('categories').select('*').order('sort_order', { ascending: true })
    if (data) setCategories(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingId(cat.id)
      setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', image_url: cat.image_url || '', sort_order: cat.sort_order || 0, active: cat.active })
    } else {
      setEditingId(null)
      setForm({ name: '', slug: '', description: '', image_url: '', sort_order: 0, active: true })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const generateSlug = (val: string) => {
    setForm({ ...form, name: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.slug) return toast.error('Name and slug are required')
    
    const supabase = createClient()
    const toastId = toast.loading('Saving category...')
    
    try {
      if (editingId) {
        const { error } = await supabase.from('categories').update(form).eq('id', editingId)
        if (error) throw error
        toast.success('Category updated', { id: toastId })
      } else {
        const { error } = await supabase.from('categories').insert([form])
        if (error) throw error
        toast.success('Category created', { id: toastId })
      }
      handleCloseModal()
      loadData()
    } catch (err: any) {
      toast.error(err.message || 'Error saving category', { id: toastId })
    }
  }

  const toggleActive = async (id: string, current: boolean) => {
    const supabase = createClient()
    await supabase.from('categories').update({ active: !current }).eq('id', id)
    loadData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">Categories</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gold text-sm font-semibold">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Sort Order</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No categories found.</td></tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="font-medium text-[#111111]">{cat.name}</td>
                    <td className="text-[#555555]">{cat.slug}</td>
                    <td>{cat.sort_order}</td>
                    <td>
                      <button onClick={() => toggleActive(cat.id, cat.active)} className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider flex items-center gap-1.5 w-fit ${cat.active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.active ? 'bg-green-500' : 'bg-red-500'}`} />
                        {cat.active ? 'ACTIVE' : 'HIDDEN'}
                      </button>
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleOpenModal(cat)} className="p-2 text-[#555555] hover:text-[#c8941a] transition-colors"><Edit size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#faf9f6]/80 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white border border-[#eaeaea] rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#111111]">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={handleCloseModal} className="text-[#555555] hover:text-black"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-xs text-[#555555] mb-1.5">Category Name</label><input value={form.name} onChange={(e) => generateSlug(e.target.value)} className="input-gold" required /></div>
              <div><label className="block text-xs text-[#555555] mb-1.5">Slug (URL)</label><input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} className="input-gold" required /></div>
              <div><label className="block text-xs text-[#555555] mb-1.5">Description (Optional)</label><textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="input-gold resize-none" rows={3} /></div>

              <div>
                <label className="block text-xs text-[#555555] mb-1.5">Category Cover Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-[#eaeaea] overflow-hidden bg-gray-50 flex items-center justify-center relative shrink-0">
                    {(form as any).image_url ? <Image src={(form as any).image_url} alt="" fill className="object-cover" unoptimized /> : <ImageIcon className="text-gray-300" />}
                  </div>
                  <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors flex items-center gap-2">
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading || !form.slug} />
                  </label>
                  {!form.slug && <span className="text-xs text-red-500">Enter slug first</span>}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1"><label className="block text-xs text-[#555555] mb-1.5">Sort Order</label><input type="number" value={form.sort_order} onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value) || 0})} className="input-gold" /></div>
                <div className="flex-1 flex flex-col justify-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} className="accent-[#c8941a] w-4 h-4 rounded" />
                    <span className="text-sm text-[#111111]">Active (Visible on site)</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-xl border border-[#eaeaea] text-[#555555] hover:text-black text-sm font-medium">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl btn-gold text-sm font-semibold flex items-center gap-2"><CheckCircle size={16} /> Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
