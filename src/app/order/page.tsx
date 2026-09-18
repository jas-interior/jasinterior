'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { useCartStore } from '@/store/cart'
import { getProductById } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Product } from '@/types'

function OrderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const singleProductId = searchParams.get('product')

  const { items: cartItems, getTotal } = useCartStore()
  const [items, setItems] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const [form, setForm] = useState({
    full_name: '', mobile: '', whatsapp_number: '', email: '',
    address: '', city: '', state: 'Gujarat', pincode: '', special_instructions: ''
  })

  useEffect(() => {
    async function load() {
      if (singleProductId) {
        const prod = await getProductById(singleProductId)
        if (prod && prod.price_enabled && prod.price) {
          setItems([{ product: prod, quantity: 1 }])
          setSubtotal(prod.price)
        } else {
          toast.error('Product not found or price not available')
          router.push('/shop')
        }
      } else {
        if (cartItems.length === 0) {
          router.push('/shop')
          return
        }
        setItems(cartItems)
        setSubtotal(getTotal())
      }
      setLoading(false)
    }
    load()
  }, [singleProductId, cartItems, getTotal, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name || !form.mobile || !form.address || !form.city || !form.pincode) {
      toast.error('Please fill all required fields')
      return
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { toast.error('Enter valid mobile number'); return }
    if (!/^\d{6}$/.test(form.pincode)) { toast.error('Enter valid 6-digit pincode'); return }

    setProcessing(true)
    try {
      // 1. Create order on server
      const orderItems = items.map(i => ({
        product_id: i.product.id,
        product_title: i.product.title,
        product_image: i.product.images?.[0] || null,
        quantity: i.quantity,
        unit_price: i.product.price
      }))

      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems, customer: form, subtotal })
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.error)

      // 2. Load Razorpay
      const options: any = {
        key: data.keyId,
        amount: data.amount * 100,
        currency: 'INR',
        name: 'JAS INTERIOR',
        description: 'Premium Custom Furniture',
        image: '/logo-192.webp',
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: data.orderId
            })
          })
          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            if (!singleProductId) useCartStore.getState().clearCart()
            router.push(`/order/success?id=${data.orderNumber}`)
          } else {
            router.push(`/order/failed?id=${data.orderNumber}`)
          }
        },
        prefill: {
          name: form.full_name,
          contact: form.mobile,
          email: form.email
        },
        theme: { color: '#c8941a' }
      }

      const rzp = new window.Razorpay(options) as any
      rzp.on('payment.failed', function (response: any) {
        toast.error('Payment Failed')
        router.push(`/order/failed?id=${data.orderNumber}`)
      })
      rzp.open()

    } catch (err: any) {
      toast.error(err.message || 'Failed to process checkout')
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8941a]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="section-title mb-3">Checkout</h1>
        <p className="text-[#666666]">Complete your order securely.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-[#eaeaea] rounded-2xl p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold text-[#111111] mb-6" style={{fontFamily:'Playfair Display,serif'}}>Shipping Details</h2>
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Full Name *</label><input name="full_name" value={form.full_name} onChange={handleChange} className="input-gold" required /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Mobile Number *</label><input name="mobile" value={form.mobile} onChange={handleChange} className="input-gold" required maxLength={10} /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">WhatsApp Number</label><input name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} className="input-gold" maxLength={10} /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Email (Optional)</label><input type="email" name="email" value={form.email} onChange={handleChange} className="input-gold" /></div>
              </div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Complete Address *</label><textarea name="address" value={form.address} onChange={handleChange} rows={3} className="input-gold resize-none" required /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">City *</label><input name="city" value={form.city} onChange={handleChange} className="input-gold" required /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">State</label><input name="state" value={form.state} className="input-gold opacity-70 cursor-not-allowed" readOnly /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Pincode *</label><input name="pincode" value={form.pincode} onChange={handleChange} className="input-gold" required maxLength={6} /></div>
              </div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Special Instructions (Optional)</label><textarea name="special_instructions" value={form.special_instructions} onChange={handleChange} rows={2} className="input-gold resize-none" placeholder="Any specific requirements..." /></div>
            </form>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#c8941a]/30 rounded-2xl p-6 sm:p-8 sticky top-24">
            <h2 className="font-serif text-xl font-bold text-[#111111] mb-6" style={{fontFamily:'Playfair Display,serif'}}>Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                    {item.product.images?.[0] ? <Image src={item.product.images[0]} alt="" width={64} height={64} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111111] truncate">{item.product.title}</p>
                    <p className="text-xs text-[#555555] mb-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-[#c8941a]">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#eaeaea] pt-4 mb-6 space-y-3">
              <div className="flex justify-between text-sm text-[#555555]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-sm text-[#555555]"><span>Delivery Charges</span><span className="text-xs font-semibold text-[#c8941a]">Paid in Cash at Delivery</span></div>
              <div className="flex justify-between text-lg font-bold text-[#111111] pt-2 border-t border-[#eaeaea]"><span>Total (Excl. Delivery)</span><span className="text-[#c8941a]">{formatPrice(subtotal)}</span></div>
            </div>

            {/* Professional Delivery Notice */}
            <div className="bg-[#faf9f6] border border-[#c8941a]/30 rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-[#c8941a]" />
                </div>
                <div className="text-xs text-[#555555] leading-relaxed">
                  <strong className="text-[#111111] block mb-1 font-semibold tracking-wide">Important: Delivery Payment</strong>
                  Delivery charges are extra and not included in this total. Please pay the exact delivery amount (as discussed and agreed upon with our team) directly to the driver in cash at the time of delivery.
                </div>
              </div>
            </div>
            
            <button form="checkout-form" type="submit" disabled={processing} className="w-full py-4 rounded-xl btn-gold font-semibold text-base mb-4 disabled:opacity-60">
              {processing ? 'Processing...' : 'Pay Securely'}
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-[#666666]">
              <ShieldCheck size={14} className="text-green-500" /> 100% Secure Razorpay Payment
            </div>
          </div>
        </div>
      </div>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
    </div>
  )
}

export default function OrderPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8941a]"></div></div>}>
        <OrderContent />
      </Suspense>
    </MainLayout>
  )
}
