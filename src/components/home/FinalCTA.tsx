import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #0f0d07 50%, #1a1208 100%)', border: '1px solid rgba(200,148,26,0.25)' }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage:'repeating-linear-gradient(45deg,#c8941a 0px,#c8941a 1px,transparent 0px,transparent 30px)', backgroundSize:'30px 30px' }} />
          <h2 className="section-title mb-4 relative z-10">
            Looking for Furniture Made<br />
            <span style={{ background:'linear-gradient(135deg,#c8941a,#e9a825)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Exactly for Your Space?</span>
          </h2>
          <p className="text-[#666666] mb-8 max-w-xl mx-auto relative z-10">Get in touch with our support team or send an inquiry. We will understand your requirements and craft the perfect furniture for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/inquiry" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-gold font-semibold">Send Inquiry</Link>
            <a href="https://wa.me/918866531993?text=Hello%20JAS%20INTERIOR%2C%20I%20need%20custom%20furniture%20for%20my%20space." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold hover:bg-green-700/30 transition-colors">
              <MessageCircle size={18} /> WhatsApp Support
            </a>
            <a href="tel:8866531993" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-outline-gold font-semibold">
              <Phone size={18} /> Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
