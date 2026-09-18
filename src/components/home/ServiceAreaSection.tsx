import Link from 'next/link'
import { MapPin, Truck } from 'lucide-react'

export default function ServiceAreaSection() {
  return (
    <section className="py-16 px-4 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto text-center">
        <MapPin size={32} className="text-[#c8941a] mx-auto mb-4" />
        <h2 className="section-title mb-4">Serving Customers Across Gujarat</h2>
        <p className="text-[#666666] leading-relaxed mb-6 max-w-2xl mx-auto">
          JAS INTERIOR provides custom furniture manufacturing and delivery services across all of Gujarat.
          We are based in Vadodara and serve customers from Ahmedabad to Surat, Rajkot to Bharuch and beyond.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#c8941a]/20 text-sm text-[#555555] mb-8">
          <Truck size={16} className="text-[#c8941a]" />
          Delivery charges are additional depending on location and order requirements.
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inquiry" className="px-8 py-3.5 rounded-xl btn-gold font-semibold">Send Inquiry</Link>
          <Link href="/contact" className="px-8 py-3.5 rounded-xl btn-outline-gold font-semibold">Contact Support</Link>
        </div>
      </div>
    </section>
  )
}
