'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { CheckCircle, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  
  // Optional: clear cart again just to be safe
  useEffect(() => {
    useCartStore.getState().clearCart()
  }, [])

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-[#eaeaea] rounded-3xl p-8 sm:p-12 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#111111] mb-3" style={{fontFamily:'Playfair Display,serif'}}>Payment Successful!</h1>
          <p className="text-[#555555] mb-2">Thank you for your order.</p>
          {orderId && (
            <p className="text-sm text-[#666666] mb-8">
              Order ID: <span className="text-[#c8941a] font-semibold">{orderId}</span>
            </p>
          )}
          
          <div className="p-4 rounded-xl bg-white border border-[#eaeaea] mb-8 text-sm text-[#555555] leading-relaxed text-left">
            <span className="text-[#c8941a] font-semibold block mb-1">What's Next?</span>
            Our team will contact you shortly to confirm the delivery address and calculate the applicable delivery charges for your location in Gujarat.
          </div>

          <div className="space-y-3">
            <a href={`https://wa.me/918866531993?text=Hello%20JAS%20INTERIOR%2C%20I%20have%20placed%20an%20order%20(ID:%20${orderId}).%20Please%20confirm.`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold transition-colors">
              <MessageCircle size={18} /> Send Order Details on WhatsApp
            </a>
            <Link href="/shop" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-outline-gold font-semibold">
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<MainLayout><div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8941a]"></div></div></MainLayout>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
