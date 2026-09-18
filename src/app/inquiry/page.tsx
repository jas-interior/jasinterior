'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { MessageCircle, Phone, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const categories = ['Sofa', 'Bed', 'Wardrobe', 'Dining Table', 'TV Unit', 'Mattress', 'T Table', 'Other']

function InquiryFormContent() {
  const searchParams = useSearchParams()
  const productName = searchParams.get('product') || ''
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '', mobile: '', whatsapp_number: '', email: '', city: '',
    product_name: productName, category: '', quantity: '', custom_size: '',
    preferred_colour: '', material_requirement: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.mobile) { toast.error('Name and mobile are required'); return }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { toast.error('Enter a valid 10-digit mobile number'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, quantity: form.quantity ? Number(form.quantity) : undefined, inquiry_type: 'general' }),
      })
      const data = await res.json()
      if (data.success) { setSubmitted(true); toast.success('Inquiry submitted successfully!') }
      else toast.error(data.error || 'Failed to submit')
    } catch { toast.error('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (submitted) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <CheckCircle size={64} className="text-[#c8941a] mx-auto mb-6" />
            <h2 className="section-title mb-3">Thank You!</h2>
            <p className="text-[#666666] mb-8">Your inquiry has been submitted successfully. Our support team will contact you shortly.</p>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/918866531993" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <a href="tel:8866531993" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-outline-gold font-semibold">
                <Phone size={18} /> Call Support
              </a>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h1 className="section-title mb-3">Send an Inquiry</h1>
          <p className="text-[#666666]">Fill in your requirements and our team will get in touch with you.</p>
        </div>
        <div className="bg-white border border-[#eaeaea] rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-gold" required /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Mobile Number *</label><input name="mobile" value={form.mobile} onChange={handleChange} placeholder="10-digit mobile" className="input-gold" required maxLength={10} /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">WhatsApp Number</label><input name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} placeholder="WhatsApp number" className="input-gold" maxLength={10} /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Email</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-gold" /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">City</label><input name="city" value={form.city} onChange={handleChange} placeholder="Your city in Gujarat" className="input-gold" /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Category</label><select name="category" value={form.category} onChange={handleChange} className="input-gold"><option value="">Select Category</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Product / Item</label><input name="product_name" value={form.product_name} onChange={handleChange} placeholder="e.g. L-Shape Sofa" className="input-gold" /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Quantity</label><input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} placeholder="Number of pieces" className="input-gold" /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Custom Size</label><input name="custom_size" value={form.custom_size} onChange={handleChange} placeholder="e.g. 8x4 feet" className="input-gold" /></div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Preferred Colour</label><input name="preferred_colour" value={form.preferred_colour} onChange={handleChange} placeholder="e.g. Walnut Brown" className="input-gold" /></div>
            </div>
            <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Material Requirement</label><input name="material_requirement" value={form.material_requirement} onChange={handleChange} placeholder="e.g. Teak wood, Fabric, Leather" className="input-gold" /></div>
            <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Message / Additional Requirements</label><textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Describe your requirements in detail..." className="input-gold resize-none" /></div>
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl btn-gold font-semibold text-base disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="https://wa.me/918866531993" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold text-sm">
            <MessageCircle size={16} /> WhatsApp: 8866531993
          </a>
          <a href="tel:8866531993" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-outline-gold font-semibold text-sm">
            <Phone size={16} /> Call: 8866531993
          </a>
        </div>
      </div>
    </MainLayout>
  )
}

export default function InquiryPage() {
  return (
    <Suspense fallback={<MainLayout><div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8941a]"></div></div></MainLayout>}>
      <InquiryFormContent />
    </Suspense>
  )
}
