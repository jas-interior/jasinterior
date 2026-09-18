import { CheckCircle2 } from 'lucide-react'

const reasons = [
  { title: 'Custom Made Furniture', desc: 'Every piece is manufactured exactly as per your requirements — no compromises.' },
  { title: 'Premium Quality Materials', desc: 'Only high-quality materials are used to ensure durability and a premium finish.' },
  { title: 'Modern & Elegant Designs', desc: 'Contemporary designs that complement any interior style and space.' },
  { title: 'Direct Manufacturer', desc: 'You deal directly with the manufacturer — no middlemen, better pricing.' },
  { title: 'Made to Your Requirement', desc: 'Specify your size, colour, material, and design — we build it accordingly.' },
  { title: 'Professional Finishing', desc: 'Every detail is refined with professional-grade finishing and quality checks.' },
  { title: 'All Gujarat Service', desc: 'We serve customers across all of Gujarat. Delivery available across the state.' },
  { title: 'Delivery Available', desc: 'Delivery across Gujarat. Delivery charges are extra and confirmed separately.' },
]

export default function WhyChooseSection() {
  return (
    <section className="py-20 px-4 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-semibold uppercase tracking-widest">Why JAS Interior</span>
            </div>
            <h2 className="section-title mb-4">Why Choose<br /><span style={{ background:'linear-gradient(135deg,#c8941a,#e9a825)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>JAS INTERIOR?</span></h2>
            <p className="text-[#666666] leading-relaxed mb-8">We are a premium custom furniture manufacturer based in Vadodara, Gujarat. Every piece of furniture we create is made-to-order, crafted to your exact specifications.</p>
            <a href="/custom-furniture" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gold font-semibold">Get Custom Quote</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-3 p-4 rounded-xl bg-white border border-[#1e1e1e] hover:border-[#c8941a]/20 transition-colors">
                <CheckCircle2 size={18} className="text-[#c8941a] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#111111] mb-1">{reason.title}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
