'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Zap, MessageSquare, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { getProductBySlug } from '@/lib/queries'
import { useCartStore } from '@/store/cart'
import { formatPrice, getProductInquiryMessage, WHATSAPP_NUMBER, getWhatsAppLink } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [qty, setQty] = useState(1)
  const { addItem } = useCartStore()

  useEffect(() => {
    getProductBySlug(slug).then((p) => {
      setProduct(p)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="space-y-4"><div className="skeleton h-8 rounded w-3/4" /><div className="skeleton h-4 rounded w-1/2" /><div className="skeleton h-20 rounded" /></div>
        </div>
      </MainLayout>
    )
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="section-title mb-4">Product Not Found</h1>
          <p className="text-[#666666] mb-6">This product is not available or may have been removed.</p>
          <Link href="/shop" className="px-6 py-3 rounded-xl btn-gold font-semibold">Browse All Furniture</Link>
        </div>
      </MainLayout>
    )
  }

  const hasPricing = product.price != null && product.price > 0 && product.price_enabled
  const images = product.images?.length ? product.images : []

  const handleAddToCart = () => {
    addItem(product, qty)
    toast.success(`${product.title} added to cart!`)
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-xs text-[#555] mb-8">
          <Link href="/" className="hover:text-[#c8941a]">Home</Link><span>/</span>
          <Link href="/shop" className="hover:text-[#c8941a]">Shop</Link>
          {product.category && (<><span>/</span><Link href={`/shop/${product.category.slug}`} className="hover:text-[#c8941a]">{product.category.name}</Link></>)}
          <span>/</span><span className="text-[#555555]">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#eaeaea] mb-4">
              {images.length > 0 ? (
                <Image 
                  src={images[currentImage]} 
                  alt={product.title} 
                  fill 
                  className="object-cover select-none" 
                  priority 
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#333]"><span className="text-8xl">🪑</span></div>
              )}
              {images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#faf9f6]/60 flex items-center justify-center hover:bg-[#faf9f6]/80 transition-colors"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCurrentImage((currentImage + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#faf9f6]/60 flex items-center justify-center hover:bg-[#faf9f6]/80 transition-colors"><ChevronRight size={20} /></button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)} className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === currentImage ? 'border-[#c8941a]' : 'border-[#eaeaea] hover:border-[#c8941a]/40'}`}>
                    <Image 
                      src={img} 
                      alt="" 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-cover select-none" 
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.category && <div className="text-xs text-[#c8941a] uppercase tracking-widest mb-2">{product.category.name}</div>}
            <h1 className="font-serif text-3xl font-bold text-[#111111] mb-3" style={{fontFamily:'Playfair Display,serif'}}>{product.title}</h1>
            {product.description && <p className="text-[#555555] leading-relaxed mb-6">{product.description}</p>}

            <div className="mb-6 p-4 rounded-xl bg-white border border-[#eaeaea]">
              {hasPricing ? (
                <div>
                  <div className="text-3xl font-bold text-[#c8941a] mb-1">{formatPrice(product.price!)}</div>
                  <p className="text-xs text-[#555]">* Delivery charges extra. Confirmed at time of order.</p>
                </div>
              ) : (
                <div>
                  <div className="text-xl font-semibold text-[#666666] mb-1">Price on Request</div>
                  <p className="text-xs text-[#555]">Contact us for pricing. Customization available.</p>
                </div>
              )}
            </div>

            <div className="mb-6 p-4 rounded-xl bg-[#c8941a]/5 border border-[#c8941a]/20">
              <p className="text-sm text-[#555555]"><span className="text-[#c8941a] font-semibold">Custom Made: </span>This product can be customized to your preferred size, colour, material and design. Contact us with your requirements.</p>
            </div>

            {hasPricing && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-white border border-[#eaeaea] rounded-xl p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-lg bg-[#f0f0f0] hover:bg-[#c8941a]/20 flex items-center justify-center transition-colors">-</button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-lg bg-[#f0f0f0] hover:bg-[#c8941a]/20 flex items-center justify-center transition-colors">+</button>
                </div>
                <span className="text-sm text-[#555]">Qty</span>
              </div>
            )}

            <div className="space-y-3 mb-6">
              {hasPricing ? (
                <>
                  <Link href={`/order?product=${product.id}`} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-gold font-semibold text-base"><Zap size={18} /> Buy Now</Link>
                  <button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-outline-gold font-semibold"><ShoppingCart size={18} /> Add to Cart</button>
                </>
              ) : (
                <>
                  <a href={getWhatsAppLink(WHATSAPP_NUMBER, getProductInquiryMessage(product.title))} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold"><MessageSquare size={18} /> Chat on WhatsApp</a>
                  <Link href={`/inquiry?product=${product.slug}`} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-gold font-semibold">Get Custom Quote</Link>
                </>
              )}
              <Link href={`/inquiry?product=${product.slug}`} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#eaeaea] text-[#555555] hover:border-[#c8941a]/30 hover:text-[#c8941a] text-sm font-medium transition-colors"><MessageSquare size={16} /> Send Inquiry</Link>
              <a href="tel:8866531993" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#eaeaea] text-[#555555] hover:border-[#c8941a]/30 hover:text-[#c8941a] text-sm font-medium transition-colors"><Phone size={16} /> Contact Support: 8866531993</a>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 border-t border-[#eaeaea]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#111111]">Suggested Products</h2>
          <Link href="/shop" className="text-xs text-[#c8941a] font-semibold hover:underline">View All</Link>
        </div>
        <SuggestedProducts categorySlug={product.category?.slug} currentProductId={product.id} />
      </div>
    </MainLayout>
  )
}

function SuggestedProducts({ categorySlug, currentProductId }: { categorySlug?: string, currentProductId: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch products from same category, or all products if no category, limit 10
    import('@/lib/queries').then(({ getProducts }) => {
      getProducts({ categorySlug, limit: 12 }).then((data) => {
        // filter out the current product
        const filtered = data.filter(p => p.id !== currentProductId).slice(0, 10)
        
        // If not enough products in same category, fetch more from other categories
        if (filtered.length < 4) {
          getProducts({ limit: 10 }).then((moreData) => {
             const moreFiltered = moreData.filter(p => p.id !== currentProductId)
             setProducts(moreFiltered.slice(0, 10))
             setLoading(false)
          })
        } else {
          setProducts(filtered)
          setLoading(false)
        }
      })
    })
  }, [categorySlug, currentProductId])

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2 min-w-[140px] sm:min-w-[180px]">
            <div className="skeleton w-full aspect-square rounded-xl" />
            <div className="skeleton h-3 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) return <p className="text-[#555] text-sm">No other products found.</p>

  return (
    <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col gap-3 min-w-[140px] sm:min-w-[180px] snap-start bg-white border border-[#eaeaea] p-2 rounded-2xl hover:border-[#c8941a]/50 transition-colors">
          <div className="w-full aspect-square rounded-xl bg-white overflow-hidden relative">
            {product.images && product.images[0] ? (
              <Image 
                src={product.images[0]} 
                alt={product.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500 select-none" 
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#333] text-xs">No Img</div>
            )}
          </div>
          <div className="px-1 pb-1">
            <p className="text-xs sm:text-sm font-semibold text-[#111111] group-hover:text-[#c8941a] line-clamp-2 leading-tight mb-1">{product.title}</p>
            <p className="text-xs sm:text-sm font-bold text-[#c8941a]">
              {product.price_enabled && product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on Request'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
