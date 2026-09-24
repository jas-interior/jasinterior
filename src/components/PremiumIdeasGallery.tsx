'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Image as ImageIcon } from 'lucide-react';

export default function PremiumIdeasGallery() {
  const supabase = createClient();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: catData } = await supabase.from('interior_idea_categories').select('*').order('sort_order', { ascending: true });
      if (catData) setCategories(catData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section id="premium-ideas" className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-bold tracking-[0.2em] text-center uppercase mb-12 text-[#6d6355]">Premium Interior Design Ideas</h2>
      
      {loading ? (
        <div className="flex justify-center py-10 min-h-[600px]"><Loader2 className="animate-spin text-[#c8941a]" size={32} /></div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map(cat => (
            <Link 
              key={cat.id} 
              href={`/interior-ideas/${cat.slug}`}
              className="flex flex-col items-center group w-24 md:w-32"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-md border-2 border-transparent group-hover:border-[#c8941a] transition-all overflow-hidden mb-3 md:mb-4 relative flex items-center justify-center">
                {cat.cover_image ? (
                  <Image 
                    src={cat.cover_image} 
                    alt={cat.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    unoptimized
                  />
                ) : (
                  <ImageIcon className="text-gray-300" size={32} />
                )}
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-center text-[#555555] group-hover:text-[#1a1a1a] transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
