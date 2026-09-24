'use client'
import { useState, useEffect, useCallback } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { getProducts, getCategories } from '@/lib/queries'
import type { Product, Category } from '@/types'
import { Search, X } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('sofa')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const cat = params.get('category')
      if (cat) setSelectedCategory(cat)
    }
  }, [])

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
    window.history.pushState(null, '', val ? `/shop?category=${val}` : '/shop')
  }
  const [sortBy, setSortBy] = useState('default')

  const loadData = useCallback(async () => {
    setLoading(true)
    const [prods, cats] = await Promise.all([
      getProducts({ categorySlug: selectedCategory || undefined, search: search || undefined }),
      getCategories(),
    ])
    let sorted = [...prods]
    if (sortBy === 'price-asc') sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
    if (sortBy === 'price-desc') sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
    if (sortBy === 'name') sorted.sort((a, b) => a.title.localeCompare(b.title))
    setProducts(sorted)
    setCategories(cats)
    setLoading(false)
  }, [search, selectedCategory, sortBy])

  useEffect(() => {
    const timer = setTimeout(loadData, 300)
    return () => clearTimeout(timer)
  }, [loadData])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-3">Explore Our Premium Furniture Collection</h1>
          <p className="text-[#666666] max-w-2xl mx-auto">Browse our complete range of premium custom furniture. Every piece can be customized to your requirements.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" />
            <input type="text" placeholder="Search furniture..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-gold !pl-10 !pr-10 h-11" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#111111]"><X size={14} /></button>}
          </div>
          <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="input-gold h-11 max-w-xs">
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-gold h-11 max-w-xs">
            <option value="default">Default</option><option value="name">Name A-Z</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          <button onClick={() => handleCategoryChange('')} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === '' ? 'bg-[#c8941a] text-black' : 'bg-white border border-[#eaeaea] text-[#555555] hover:border-[#c8941a]/40'}`}>All</button>
          {categories.map((cat) => <button key={cat.id} onClick={() => handleCategoryChange(cat.slug)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.slug ? 'bg-[#c8941a] text-black' : 'bg-white border border-[#eaeaea] text-[#555555] hover:border-[#c8941a]/40'}`}>{cat.name}</button>)}
        </div>
        {!loading && <p className="text-xs text-[#555] mb-6">{products.length} product{products.length !== 1 ? 's' : ''} found</p>}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"><div className="skeleton aspect-square" /><div className="p-4 space-y-2"><div className="skeleton h-4 rounded w-3/4" /><div className="skeleton h-3 rounded w-1/2" /><div className="skeleton h-8 rounded" /></div></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🪑</div>
            <h3 className="font-serif text-xl font-semibold text-[#111111] mb-2" style={{fontFamily:'Playfair Display,serif'}}>No Products Found</h3>
            <p className="text-[#666666] mb-6">{search ? `No results for "${search}". Try a different search.` : 'No products in this category yet.'}</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('') }} className="px-6 py-2.5 rounded-xl btn-outline-gold text-sm">Clear Filters</button>
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
