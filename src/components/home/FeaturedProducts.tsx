'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/queries'
import type { Product } from '@/types'
import Image from 'next/image'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProducts(10).then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className="py-8 px-4 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#111111]">Featured Products</h2>
          <Link href="/shop" className="text-xs text-[#c8941a] font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2 min-w-[140px] sm:min-w-[180px]">
                <div className="skeleton w-full aspect-square rounded-xl" />
                <div className="skeleton h-3 rounded w-3/4" />
                <div className="skeleton h-4 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8"><p className="text-[#555] text-sm">No featured products yet.</p></div>
        ) : (
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col gap-3 min-w-[140px] sm:min-w-[180px] h-full snap-start bg-white border border-[#eaeaea] p-2 rounded-2xl hover:border-[#c8941a]/50 transition-colors">
                <div className="w-full aspect-square rounded-xl bg-white overflow-hidden relative flex-shrink-0">
                  {product.images && product.images[0] ? (
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#333] text-xs">No Img</div>
                  )}
                </div>
                <div className="px-1 pb-1 flex flex-col flex-grow">
                  <p className="text-xs sm:text-sm font-semibold text-[#111111] group-hover:text-[#c8941a] line-clamp-2 leading-tight mb-2">{product.title}</p>
                  <p className="text-xs sm:text-sm font-bold text-[#c8941a] mt-auto">
                    {product.price_enabled && product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on Request'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
