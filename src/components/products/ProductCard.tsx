'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, MessageSquare, Eye, Zap, Share2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, getProductInquiryMessage, WHATSAPP_NUMBER, getWhatsAppLink } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const hasPricing = product.price != null && product.price > 0 && product.price_enabled

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!hasPricing) return
    addItem(product)
    toast.success(`${product.title} added to cart`)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/product/${product.slug}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          url: url
        })
      } catch (err) {
        console.log('Share dismissed')
      }
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied!')
    }
  }

  const primaryImage = product.images?.[0] || null

  return (
    <div className="product-card rounded-2xl overflow-hidden group flex flex-col h-full relative">
      <Link href={`/product/${product.slug}`} className="flex-shrink-0">
        <div className="product-image-wrapper aspect-square bg-white relative">
          {primaryImage ? (
            <Image 
              src={primaryImage} 
              alt={product.title} 
              fill 
              className="object-cover select-none pointer-events-none" 
              sizes="(max-width:640px) 100vw, 50vw" 
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#333]">
              <div className="w-16 h-16 rounded-full bg-[#f0f0f0] flex items-center justify-center"><Eye size={24} /></div>
              <span className="text-xs">No Image</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && <span className="badge-gold text-[10px] px-2 py-0.5 z-10">Featured</span>}
          </div>
        </div>
      </Link>
      
      <button 
        onClick={handleShare} 
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#555] hover:text-[#c8941a] hover:bg-white z-20 transition-colors"
        title="Share Product"
      >
        <Share2 size={14} />
      </button>

      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-[#c8941a] uppercase tracking-widest mb-1">{product.category?.name || 'Furniture'}</div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base font-semibold text-[#111111] mb-2 line-clamp-2 hover:text-[#c8941a] transition-colors" style={{fontFamily:'Playfair Display,serif'}}>{product.title}</h3>
        </Link>
        
        <div className="mt-auto flex flex-col gap-4">
          <div>
            {hasPricing ? <span className="text-lg font-bold text-[#c8941a]">{formatPrice(product.price!)}</span> : <span className="text-sm font-semibold text-[#666666] italic">Price on Request</span>}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {hasPricing ? (
              <>
                <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg btn-outline-gold text-xs font-semibold"><ShoppingCart size={13} /> Add to Cart</button>
                <Link href={`/order?product=${product.id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg btn-gold text-xs font-semibold"><Zap size={13} /> Buy Now</Link>
              </>
            ) : (
              <>
                <a href={getWhatsAppLink(WHATSAPP_NUMBER, getProductInquiryMessage(product.title))} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-700/20 border border-green-700/30 text-green-400 hover:bg-green-700/30 text-xs font-semibold transition-colors"><MessageSquare size={13} /> WhatsApp</a>
                <Link href={`/inquiry?product=${product.slug}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg btn-gold text-xs font-semibold">Get Quote</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
