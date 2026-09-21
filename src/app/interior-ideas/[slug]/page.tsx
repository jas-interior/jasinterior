'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import MainLayout from '@/components/layout/MainLayout';
import ZoomableImage from '@/components/ui/ZoomableImage';
import { Loader2, ArrowLeft, ArrowUp } from 'lucide-react';
import Link from 'next/link';

import { useParams } from 'next/navigation';

export default function CategoryGalleryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const supabase = createClient();
  const [category, setCategory] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // 1. Fetch category by slug
      const { data: catData, error: catError } = await supabase
        .from('interior_idea_categories')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (catData) {
        setCategory(catData);
        
        // 2. Fetch images for this category
        const { data: imgData } = await supabase
          .from('interior_idea_images')
          .select('*')
          .eq('category_id', catData.id)
          .order('created_at', { ascending: false });
          
        if (imgData) setImages(imgData);
      }
      
      setLoading(false);
    }
    if (slug) fetchData();
  }, [slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-[#c8941a] mb-4" size={40} />
          <p className="text-[#555555] tracking-widest text-sm uppercase">Loading Gallery...</p>
        </div>
      </MainLayout>
    );
  }

  if (!category) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-serif mb-4" style={{fontFamily:'Playfair Display, serif'}}>Category Not Found</h1>
          <Link href="/turnkey-interior" className="text-[#c8941a] hover:underline underline-offset-4 flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
            <ArrowLeft size={16} /> Back to Interior Ideas
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-24 pb-12 md:pt-32 md:pb-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 md:mb-16">
          <Link href="/turnkey-interior" className="inline-flex items-center gap-2 text-[#6d6355] hover:text-[#1a1a1a] transition-colors text-xs font-bold uppercase tracking-widest mb-6 md:mb-10">
            <ArrowLeft size={14} /> Back to Packages
          </Link>
          <h1 className="text-3xl md:text-5xl font-light text-[#1a1a1a] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
            {category.name}
          </h1>
          <p className="text-[#555555] text-sm md:text-base max-w-2xl">
            Explore our premium collection of {category.name.toLowerCase()} for your home. Click on any image to view it in full screen.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="bg-[#f4f1eb] rounded-2xl p-12 text-center border border-[#e2ddd5]">
            <p className="text-[#555555] font-serif text-lg">No ideas uploaded in this category yet.</p>
            <p className="text-xs text-[#6d6355] mt-2 uppercase tracking-widest">Check back soon for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {images.map((img) => (
              <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group bg-[#f4f1eb]">
                <ZoomableImage src={img.image_url} alt={`${category.name} Inspiration`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        )}

      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] bg-[#1a1a1a] text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-[#c8941a] transition-all hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </MainLayout>
  );
}
