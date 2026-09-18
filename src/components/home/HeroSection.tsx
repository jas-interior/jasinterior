import Link from 'next/link'
import Image from 'next/image'
import { Phone, MessageCircle, ArrowRight, MapPin } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 30%, #1a1208 60%, #0a0a0a 100%)' }} />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, #c8941a 0px, #c8941a 1px, transparent 0px, transparent 50%)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c8941a 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c8941a]/30 bg-[#c8941a]/5 mb-6">
              <MapPin size={14} className="text-[#c8941a]" />
              <span className="text-xs text-[#c8941a] font-semibold tracking-widest uppercase">Vadodara, Gujarat</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              <span className="text-[#f5f5f0]">Premium Custom</span><br />
              <span style={{ background: 'linear-gradient(135deg, #c8941a 0%, #e9a825 50%, #c8941a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Furniture</span><br />
              <span className="text-[#f5f5f0]">Manufacturer</span>
            </h1>
            <p className="text-lg text-[#a0a0a0] leading-relaxed mb-4 max-w-lg">Designed to Your Space. Crafted to Your Style. Built with Premium Quality.</p>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c8941a]" />
              <span className="text-sm text-[#888]">All Gujarat Service Available &nbsp;|&nbsp; Delivery Charges Extra</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/locations/vadodara" className="flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl btn-gold text-white text-sm font-semibold flex-1 text-center leading-tight">
                <span>JAS Interior Location</span><span className="text-[10px] opacity-80 uppercase tracking-wider">Our Vadodara Office</span>
              </Link>
              <Link href="/locations/ahmedabad" className="flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl bg-white border border-[#c8941a] text-[#111111] text-sm font-semibold hover:bg-[#faf9f6] flex-1 text-center leading-tight">
                <span>FM Furniture Location</span><span className="text-[10px] text-[#555] uppercase tracking-wider">Ahmedabad Factory Outlet</span>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://wa.me/918866531993?text=Hello%20JAS%20INTERIOR%2C%20I%20am%20interested%20in%20custom%20furniture." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-700/20 border border-green-700/30 text-green-400 text-sm font-semibold hover:bg-green-700/30 transition-colors">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <a href="tel:8866531993" className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] text-sm font-semibold hover:border-[#c8941a]/30 hover:text-[#c8941a] transition-colors">
                <Phone size={16} /> Talk to Support
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center animate-fade-in-up animate-delay-200">
            <div className="relative">
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 80px rgba(200,148,26,0.2), 0 0 160px rgba(200,148,26,0.1)' }} />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#c8941a]/20 flex items-center justify-center">
                <Image src="/logo.webp" alt="JAS INTERIOR" width={320} height={320} className="rounded-full w-5/6 h-5/6 object-contain" priority />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#111] border border-[#c8941a]/30 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-xs text-[#c8941a] font-semibold">Custom Made</div><div className="text-xs text-[#a0a0a0]">All Gujarat</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#111] border border-[#c8941a]/30 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-xs text-[#c8941a] font-semibold">Premium Quality</div><div className="text-xs text-[#a0a0a0]">Direct Manufacturer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
