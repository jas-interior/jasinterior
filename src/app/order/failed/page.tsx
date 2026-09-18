'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { XCircle, RefreshCcw, Phone } from 'lucide-react'

function OrderFailedContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-[#eaeaea] rounded-3xl p-8 sm:p-12 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} className="text-red-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#111111] mb-3" style={{fontFamily:'Playfair Display,serif'}}>Payment Failed</h1>
          <p className="text-[#555555] mb-2">We couldn't process your payment.</p>
          {orderId && (
            <p className="text-sm text-[#666666] mb-8">
              Attempted Order ID: <span className="font-semibold">{orderId}</span>
            </p>
          )}
          
          <div className="p-4 rounded-xl bg-white border border-[#eaeaea] mb-8 text-sm text-[#555555] leading-relaxed">
            No money has been deducted. If any amount was debited, it will be refunded to your account within 5-7 business days by your bank.
          </div>

          <div className="space-y-3">
            <Link href="/order" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-gold font-semibold">
              <RefreshCcw size={18} /> Try Again
            </Link>
            <a href="tel:8866531993" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#eaeaea] text-[#555555] hover:text-[#111111] transition-colors font-semibold">
              <Phone size={18} /> Contact Support
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default function OrderFailedPage() {
  return (
    <Suspense fallback={<MainLayout><div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8941a]"></div></div></MainLayout>}>
      <OrderFailedContent />
    </Suspense>
  )
}
