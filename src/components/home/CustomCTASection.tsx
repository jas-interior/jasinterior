import Link from 'next/link'
import { Paintbrush, Ruler, Package, ArrowRight } from 'lucide-react'

const customOptions = [
  { icon: Ruler, label: 'Custom Size', desc: 'Any dimension you need' },
  { icon: Paintbrush, label: 'Colour & Finish', desc: 'Your preferred colour' },
  { icon: Package, label: 'Material Choice', desc: 'Wood, fabric, leather & more' },
]

export default function CustomCTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-[#c8941a]/20 bg-gradient-to-br from-[#1a1208] via-[#111111] to-[#0a0a0a] p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{background:'radial-gradient(circle, #c8941a 0%, transparent 70%)', transform:'translate(30%, -30%)'}} />
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-semibold uppercase tracking-widest">Custom Furniture</span><div className="w-8 h-px bg-[#c8941a]" />
            </div>
            <h2 className="section-title mb-4">Custom Furniture Made For Your Space</h2>
            <p className="text-[#666666] max-w-2xl mx-auto leading-relaxed">Share your preferred size, design, colour, material and requirements. JAS INTERIOR manufactures furniture exactly as per your vision.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {customOptions.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center text-center p-5 rounded-xl bg-[#faf9f6] border border-[#eaeaea]">
                <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-[#c8941a]" />
                </div>
                <h4 className="font-semibold text-[#111111] mb-1">{label}</h4>
                <p className="text-xs text-[#666666]">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/custom-furniture" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-gold font-semibold">Send Custom Furniture Inquiry <ArrowRight size={18} /></Link>
            <a href="https://wa.me/918866531993?text=Hello%20JAS%20INTERIOR%2C%20I%20want%20custom%20furniture." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-700/20 border border-green-700/30 text-green-400 font-semibold hover:bg-green-700/30 transition-colors">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
