'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import ZoomableImage from '@/components/ui/ZoomableImage';
import { Loader2 } from 'lucide-react';

export default function PremiumIdeasGallery() {
  const supabase = createClient();
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch categories
      const { data: catData } = await supabase.from('interior_idea_categories').select('*').order('sort_order', { ascending: true });
      if (catData) setCategories(catData);
      
      // Fetch images
      const { data: imgData } = await supabase.from('interior_idea_images').select('*, interior_idea_categories(slug)').order('created_at', { ascending: false });
      if (imgData) setImages(imgData);
      
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.interior_idea_categories?.slug === activeCategory);

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-bold tracking-[0.2em] text-center uppercase mb-8 text-[#6d6355]">Premium Interior Design Ideas</h2>
      
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#c8941a]" size={32} /></div>
      ) : (
        <>
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${activeCategory === 'all' ? 'bg-[#c8941a] text-white' : 'bg-[#f4f1eb] text-[#555555] hover:bg-[#e2ddd5]'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors ${activeCategory === cat.slug ? 'bg-[#c8941a] text-white' : 'bg-[#f4f1eb] text-[#555555] hover:bg-[#e2ddd5]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Image Grid (1:1 Ratio) */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No ideas found in this category yet.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredImages.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group">
                  <ZoomableImage src={img.image_url} alt="Interior Idea" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
