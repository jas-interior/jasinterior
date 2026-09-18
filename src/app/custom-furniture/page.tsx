'use client'
import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { CheckCircle, MessageCircle, Phone } from 'lucide-react'
import toast from 'react-hot-toast'

const furnitureTypes = ['Sofa', 'Bed', 'Wardrobe', 'Dining Table', 'TV Unit', 'Mattress', 'T Table', 'Other']

export default function CustomFurniturePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', mobile: '', whatsapp_number: '', city: '',
    furniture_type: '', size: '', colour: '', material: '',
    quantity: '1', budget: '', special_requirements: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.mobile || !form.city || !form.furniture_type) {
      toast.error('Please fill in all required fields')
      return
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { toast.error('Enter valid mobile number'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, mobile: form.mobile, whatsapp_number: form.whatsapp_number || undefined,
          city: form.city, product_name: form.furniture_type, category: form.furniture_type,
          custom_size: form.size, preferred_colour: form.colour, material_requirement: form.material,
          quantity: Number(form.quantity) || 1,
          message: `Budget: ${form.budget || 'Not specified'}\n\nSpecial Requirements: ${form.special_requirements || 'None'}`,
          inquiry_type: 'custom',
        }),
      })
      const data = await res.json()
      if (data.success) { setSubmitted(true) }
      else toast.error(data.error || 'Failed to submit')
    } catch { toast.error('Network error') }
    finally { setLoading(false) }
  }

  if (submitted) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <CheckCircle size={64} className="text-[#c8941a] mx-auto mb-6" />
            <h2 className="section-title mb-3">Request Submitted!</h2>
            <p className="text-[#666666] mb-8">Our team will contact you with a custom quote. Thank you for choosing JAS INTERIOR!</p>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/918866531993" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold">
                <MessageCircle size={18} /> WhatsApp Support
              </a>
              <a href="tel:8866531993" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-outline-gold font-semibold">
                <Phone size={18} /> 8866531993
              </a>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <section className="py-16 px-4 bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="section-title mb-4">Custom Furniture Manufacturer in Gujarat</h1>
          <p className="text-[#666666] max-w-2xl mx-auto leading-relaxed">
            JAS INTERIOR manufactures furniture according to your exact requirements. Share your size, design, colour, material and any special needs — we craft it with premium quality.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { icon: '📐', label: 'Custom Size', desc: 'Any dimension' },
              { icon: '🎨', label: 'Colour & Finish', desc: 'Your preference' },
              { icon: '🪵', label: 'Material', desc: 'Wood, fabric, leather' },
              { icon: '✨', label: 'Modern Design', desc: 'Contemporary styles' },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 rounded-xl bg-white border border-[#eaeaea]">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-[#111111]">{item.label}</div>
                <div className="text-xs text-[#666666]">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#eaeaea] rounded-2xl p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-[#111111] mb-6" style={{fontFamily:'Playfair Display,serif'}}>Request Custom Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-gold" required /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Mobile *</label><input name="mobile" value={form.mobile} onChange={handleChange} placeholder="10-digit mobile" className="input-gold" required maxLength={10} /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">WhatsApp</label><input name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} placeholder="WhatsApp number" className="input-gold" maxLength={10} /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">City *</label><input name="city" value={form.city} onChange={handleChange} placeholder="City in Gujarat" className="input-gold" required /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Furniture Type *</label><select name="furniture_type" value={form.furniture_type} onChange={handleChange} className="input-gold" required><option value="">Select type</option>{furnitureTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Quantity</label><input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className="input-gold" /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Size / Dimensions</label><input name="size" value={form.size} onChange={handleChange} placeholder="e.g. 6x3 feet" className="input-gold" /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Preferred Colour</label><input name="colour" value={form.colour} onChange={handleChange} placeholder="e.g. Walnut, Beige" className="input-gold" /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Material</label><input name="material" value={form.material} onChange={handleChange} placeholder="e.g. Teak wood, Fabric" className="input-gold" /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Budget Range</label><input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹20,000 - ₹50,000" className="input-gold" /></div>
              </div>
              <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Special Requirements</label><textarea name="special_requirements" value={form.special_requirements} onChange={handleChange} rows={4} placeholder="Describe any special design, storage, or finishing requirements..." className="input-gold resize-none" /></div>
              <button type="submit" disabled={loading} className="w-full py-4 rounded-xl btn-gold font-semibold text-base disabled:opacity-60">{loading ? 'Submitting...' : 'Request Custom Quote'}</button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
