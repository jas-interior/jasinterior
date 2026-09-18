'use client'
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore()
  const total = getTotal()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-[#faf9f6]/70 z-50 backdrop-blur-sm" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-white border-l border-[#eaeaea] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#eaeaea]">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-[#c8941a]" />
            <h2 className="font-serif text-lg font-semibold" style={{fontFamily:'Playfair Display,serif'}}>Your Cart</h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-white rounded-lg transition-colors">
            <X size={20} className="text-[#555555]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingCart size={48} className="text-[#2a2a2a]" />
              <p className="text-[#555555]">Your cart is empty</p>
              <Link href="/shop" onClick={closeCart} className="px-6 py-2.5 rounded-lg btn-gold text-sm font-semibold">
                Explore Furniture
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-white rounded-xl p-3 border border-[#eaeaea]">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                  {item.product.images?.[0] ? (
                    <Image src={item.product.images[0]} alt={item.product.title} width={80} height={80} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#444]"><ShoppingCart size={24} /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111111] truncate">{item.product.title}</p>
                  <p className="text-xs text-[#555555] mb-2">{item.product.price ? formatPrice(item.product.price) : 'Price on Request'}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-md bg-[#f0f0f0] hover:bg-[#c8941a] hover:text-black flex items-center justify-center transition-colors"><Minus size={12} /></button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-md bg-[#f0f0f0] hover:bg-[#c8941a] hover:text-black flex items-center justify-center transition-colors"><Plus size={12} /></button>
                    <button onClick={() => removeItem(item.product.id)} className="ml-auto text-[#ef4444]/60 hover:text-[#ef4444] transition-colors p-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-[#eaeaea] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#555555]">Subtotal</span>
              <span className="font-semibold text-[#111111]">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-[#555]">Delivery charges will be confirmed separately.</p>
            <Link href="/order" onClick={closeCart} className="w-full flex items-center justify-center py-3.5 rounded-xl btn-gold font-semibold">
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="w-full py-2.5 rounded-xl text-sm text-[#555555] hover:text-[#111111] transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
