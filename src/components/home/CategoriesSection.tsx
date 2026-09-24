'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import type { Category } from '@/types';

export default function CategoriesSection() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await supabase.from('categories').select('*').eq('active', true).order('sort_order', { ascending: true });
      if (data) setCategories(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-[1px] bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-medium uppercase tracking-[0.2em]">Our Collections</span><div className="w-8 h-[1px] bg-[#c8941a]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4" style={{fontFamily:'Playfair Display,serif'}}>Shop By Category</h2>
        <p className="text-[#666666] max-w-xl mx-auto font-light">Discover our extensive range of premium custom furniture, meticulously crafted to elevate your living spaces.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#c8941a]" size={32} /></div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map(cat => (
            <Link 
              key={cat.id} 
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center group w-24 md:w-32"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-sm border border-[#eaeaea] group-hover:border-[#c8941a] group-hover:shadow-md transition-all overflow-hidden mb-3 md:mb-4 relative flex items-center justify-center">
                {cat.image_url ? (
                  <Image 
                    src={cat.image_url} 
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
