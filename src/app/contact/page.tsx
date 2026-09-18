import MainLayout from '@/components/layout/MainLayout'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact JAS INTERIOR | Custom Furniture in Gujarat',
  description: 'Get in touch with JAS INTERIOR. Visit our showroom in Vadodara or contact us for custom furniture inquiries across Gujarat.',
}

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-semibold uppercase tracking-widest">Get In Touch</span><div className="w-8 h-px bg-[#c8941a]" />
          </div>
          <h1 className="section-title">Contact JAS INTERIOR</h1>
          <p className="text-[#666666] mt-4 max-w-2xl mx-auto">Have a question about our furniture or want to discuss a custom design? We're here to help.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#c8941a]/10 rounded-full flex items-center justify-center mb-4"><Phone className="text-[#c8941a]" /></div>
              <h3 className="font-semibold text-[#111111] mb-4">Contact Numbers</h3>
              <div className="space-y-3">
                <a href="tel:8866531993" className="flex items-center gap-3 text-[#555555] hover:text-[#c8941a]"><Phone size={16} className="text-[#555]" /> 8866531993 (Support)</a>
                <a href="tel:9574285584" className="flex items-center gap-3 text-[#555555] hover:text-[#c8941a]"><Phone size={16} className="text-[#555]" /> 9574285584 (Shahwaj Khan)</a>
                <a href="tel:9173293129" className="flex items-center gap-3 text-[#555555] hover:text-[#c8941a]"><Phone size={16} className="text-[#555]" /> 9173293129 (Akash Parmar)</a>
              </div>
            </div>

            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4"><MessageCircle className="text-green-500" /></div>
              <h3 className="font-semibold text-[#111111] mb-4">WhatsApp Support</h3>
              <p className="text-sm text-[#666666] mb-4">Fastest way to get quotes and share your custom designs with us.</p>
              <a href="https://wa.me/918866531993" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700/20 text-green-400 border border-green-700/30 rounded-xl text-sm font-semibold hover:bg-green-700/30 transition-colors">Chat on WhatsApp</a>
            </div>

            <div className="bg-white border border-[#eaeaea] rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#c8941a]/10 rounded-full flex items-center justify-center mb-4"><MapPin className="text-[#c8941a]" /></div>
              <h3 className="font-semibold text-[#111111] mb-4">Our Showroom / Factory</h3>
              <p className="text-sm text-[#555555] leading-relaxed mb-4">
                Shop No. 1, Maa Complex,<br />
                Near Uma Char Rasta,<br />
                Waghodiya Road, Vadodara,<br />
                Gujarat, India
              </p>
              <div className="flex items-center gap-2 text-sm text-[#666666]"><Clock size={16} className="text-[#555]" /> Open Mon-Sat, 10 AM - 8 PM</div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-[#eaeaea] rounded-3xl p-6 sm:p-10 h-full">
              <h2 className="font-serif text-2xl font-bold text-[#111111] mb-6" style={{fontFamily:'Playfair Display,serif'}}>Send us a Message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Full Name</label><input type="text" className="input-gold" placeholder="John Doe" /></div>
                  <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Mobile Number</label><input type="tel" className="input-gold" placeholder="10-digit number" /></div>
                </div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Email Address</label><input type="email" className="input-gold" placeholder="john@example.com" /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Subject</label><input type="text" className="input-gold" placeholder="How can we help?" /></div>
                <div><label className="block text-xs text-[#555555] font-medium mb-1.5">Message</label><textarea rows={5} className="input-gold resize-none" placeholder="Your message here..." /></div>
                <button type="button" className="w-full py-4 rounded-xl btn-gold font-semibold">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
