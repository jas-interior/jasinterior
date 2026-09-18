'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { getProducts, getCategoryBySlug } from '@/lib/queries'
import type { Product, Category } from '@/types'
import Link from 'next/link'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.category as string
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [cat, prods] = await Promise.all([
        getCategoryBySlug(slug),
        getProducts({ categorySlug: slug }),
      ])
      setCategory(cat)
      setProducts(prods)
      setLoading(false)
    }
    load()
  }, [slug])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-xs text-[#555] mb-8">
          <Link href="/" className="hover:text-[#c8941a] transition-colors">Home</Link><span>/</span>
          <Link href="/shop" className="hover:text-[#c8941a] transition-colors">Shop</Link><span>/</span>
          <span className="text-[#555555]">{category?.name || slug}</span>
        </div>
        <div className="mb-10">
          <h1 className="section-title mb-3">Custom {category?.name || slug} Manufacturer in Gujarat</h1>
          {category?.description && <p className="text-[#666666]">{category.description}</p>}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"><div className="skeleton aspect-[4/3]" /><div className="p-4 space-y-2"><div className="skeleton h-4 rounded w-3/4" /><div className="skeleton h-8 rounded" /></div></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#555] mb-4">No products in this category yet.</p>
            <Link href="/inquiry" className="px-6 py-3 rounded-xl btn-gold text-sm font-semibold">Send Custom Inquiry</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
