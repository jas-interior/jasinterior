'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function InteriorIdeasAdmin() {
  const supabase = createClient();
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState<string | null>(null);
  
  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  
  // Upload State
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null);
  
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: catData } = await supabase.from('interior_idea_categories').select('*').order('sort_order', { ascending: true });
    if (catData) setCategories(catData);
    
    const { data: imgData } = await supabase.from('interior_idea_images').select('*, interior_idea_categories(name)').order('created_at', { ascending: false });
    if (imgData) setImages(imgData);
    setLoading(false);
  };

  const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    
    const slug = createSlug(newCatName);
    const { error } = await supabase.from('interior_idea_categories').insert({ name: newCatName, slug, sort_order: categories.length + 1 });
    
    if (!error) {
      setNewCatName('');
      fetchData();
    } else {
      alert('Error adding category: ' + error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure? This will delete the category and all its images.')) {
      await supabase.from('interior_idea_categories').delete().eq('id', id);
      fetchData();
    }
  };

  const compressImageToWebp = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max width 1600px for web optimization
          if (width > 1600) {
            height = Math.round((height * 1600) / width);
            width = 1600;
          }
          
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
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };


  const triggerCoverUpload = (categoryId: string) => {
    setEditingCategoryId(categoryId);
    coverFileInputRef.current?.click();
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCategoryId) return;

    setCoverUploading(editingCategoryId);
    const cat = categories.find(c => c.id === editingCategoryId);
    const seoBaseName = cat ? cat.slug : 'category';
    
    try {
      const webpBlob = await compressImageToWebp(file);
      const fileName = `jas-interior-${seoBaseName}-cover-ahmedabad-vadodara-gujarat-${Date.now()}.webp`;

      const { data, error } = await supabase.storage.from('interior-ideas').upload(fileName, webpBlob, { contentType: 'image/webp' });

      if (data) {
        const { data: publicUrlData } = supabase.storage.from('interior-ideas').getPublicUrl(fileName);
        if (publicUrlData) {
          await supabase.from('interior_idea_categories')
            .update({ cover_image: publicUrlData.publicUrl })
            .eq('id', editingCategoryId);
          fetchData();
        }
      } else if (error) {
        alert('Error uploading cover: ' + error.message);
      }
    } catch (err) {
      console.error('Failed to compress cover image', err);
      alert('Error compressing image to WebP');
    }

    setCoverUploading(null);
    setEditingCategoryId(null);
    if (coverFileInputRef.current) coverFileInputRef.current.value = '';
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !filesToUpload || filesToUpload.length === 0) return;
    
    setUploading(true);
    let successCount = 0;
    
    const selectedCat = categories.find(c => c.id === selectedCategory);
    const seoBaseName = selectedCat ? selectedCat.slug : 'design-idea';
    
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      try {
        const webpBlob = await compressImageToWebp(file);
        
        // Auto-rename for SEO and WebP extension
        const fileName = `jas-interior-${seoBaseName}-${i + 1}-ahmedabad-vadodara-gujarat-${Date.now()}.webp`;
        
        const { data, error } = await supabase.storage.from('interior-ideas').upload(fileName, webpBlob, { contentType: 'image/webp' });
        
        if (data) {
          const { data: publicUrlData } = supabase.storage.from('interior-ideas').getPublicUrl(fileName);
          if (publicUrlData) {
            await supabase.from('interior_idea_images').insert({
              category_id: selectedCategory,
              image_url: publicUrlData.publicUrl
            });
            successCount++;
          }
        }
      } catch (err) {
        console.error('Failed to compress or upload image', err);
      }
    }
    
    setUploading(false);
    setFilesToUpload(null);
    (document.getElementById('file-upload') as HTMLInputElement).value = '';
    alert(`Successfully uploaded ${successCount} out of ${filesToUpload.length} images.`);
    fetchData();
  };

  const handleDeleteImage = async (id: string, url: string) => {
    if (confirm('Delete this image?')) {
      if (url.includes('interior-ideas')) {
        const fileName = url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('interior-ideas').remove([fileName]);
        }
      }
      await supabase.from('interior_idea_images').delete().eq('id', id);
      fetchData();
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Loading...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Interior Design Ideas</h1>
        <p className="text-gray-500">Manage categories, covers, and bulk upload images for the gallery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Categories Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-1">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus size={18} /> Manage Categories</h2>
          
          <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="e.g. Master Bedroom" 
              className="flex-1 border p-2 text-sm rounded focus:outline-none focus:border-black"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              required
            />
            <button type="submit" className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800">Add</button>
          </form>

          {/* Hidden File Input for Category Cover */}
          <input 
            type="file" 
            ref={coverFileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleCoverUpload} 
          />

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex flex-col p-3 bg-gray-50 rounded border border-gray-100 group">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm">{cat.name}</div>
                  </div>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-gray-200 relative overflow-hidden shrink-0 border border-gray-300">
                    {cat.cover_image ? (
                      <Image src={cat.cover_image} alt="" fill className="object-cover" unoptimized />
                    ) : (
                      <ImageIcon className="absolute inset-0 m-auto text-gray-400" size={20} />
                    )}
                  </div>
                  <button 
                    onClick={() => triggerCoverUpload(cat.id)}
                    disabled={coverUploading === cat.id}
                    className="text-xs bg-white border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    {coverUploading === cat.id ? 'Uploading...' : cat.cover_image ? 'Change Cover' : 'Add Cover Image'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload & Images Section */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Upload size={18} /> Bulk Upload Images</h2>
            <form onSubmit={handleBulkUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-500 uppercase">Select Category</label>
                  <select 
                    className="w-full border p-2 rounded text-sm focus:outline-none focus:border-black"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-500 uppercase">Select Images (1:1 Ratio)</label>
                  <input 
                    id="file-upload"
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="w-full border p-[5px] rounded text-sm focus:outline-none focus:border-black"
                    onChange={(e) => setFilesToUpload(e.target.files)}
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={uploading || !selectedCategory || !filesToUpload}
                className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : 'Upload All Images'}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><ImageIcon size={18} /> Uploaded Gallery Images ({images.length})</h2>
            
            {images.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No images uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto p-1">
                {images.map(img => (
                  <div key={img.id} className="relative aspect-square rounded-md overflow-hidden group border border-gray-200">
                    <Image src={img.image_url} alt="" fill className="object-cover" unoptimized />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-2 text-center">
                      <span className="text-white text-[10px] font-bold mb-2 truncate w-full">{img.interior_idea_categories?.name}</span>
                      <button onClick={() => handleDeleteImage(img.id, img.image_url)} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
}
