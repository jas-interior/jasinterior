import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'About JAS INTERIOR | Premium Custom Furniture',
  description: 'Learn about JAS INTERIOR, the leading premium custom furniture manufacturer in Vadodara, Gujarat.',
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="section-title mb-6">Crafting Premium Furniture for Your Space</h1>
            <div className="prose-gold space-y-4 text-[#555555] leading-relaxed">
              <p>Welcome to <strong>JAS INTERIOR</strong>, the premier destination for custom-made luxury furniture in Gujarat. Based in Vadodara, we specialize in manufacturing high-quality, bespoke furniture that perfectly aligns with your vision and space requirements.</p>
              <p>We understand that every home is unique. That's why we don't just sell furniture; we manufacture it exactly to your specifications. Whether you need a perfectly sized sofa, a custom-designed wardrobe, or an elegant dining table, our skilled craftsmen bring your ideas to life.</p>
              <p>By dealing directly with us—the manufacturers—you avoid middlemen markups and ensure that every piece is crafted using premium materials, modern machinery, and a keen eye for detail.</p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-2xl border border-[#eaeaea]">
                <h3 className="font-serif text-2xl font-bold text-[#c8941a] mb-2" style={{fontFamily:'Playfair Display,serif'}}>100%</h3>
                <p className="text-sm text-[#666666]">Customizable Designs</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-[#eaeaea]">
                <h3 className="font-serif text-2xl font-bold text-[#c8941a] mb-2" style={{fontFamily:'Playfair Display,serif'}}>All</h3>
                <p className="text-sm text-[#666666]">Gujarat Service Area</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 border border-[#c8941a]/20 rounded-3xl -z-10 bg-[#faf9f6]" />
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white flex items-center justify-center border border-[#eaeaea]">
              <Image src="/logo.webp" alt="JAS INTERIOR Logo" width={400} height={400} className="w-2/3 h-auto object-contain opacity-80" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#c8941a]/30 p-6 rounded-2xl shadow-2xl max-w-xs">
              <h4 className="font-semibold text-[#111111] mb-3 flex items-center gap-2"><MapPin size={16} className="text-[#c8941a]" /> Our Showroom</h4>
              <p className="text-sm text-[#666666] mb-4">Shop No. 1, Maa Complex, Near Uma Char Rasta, Waghodiya Road, Vadodara, Gujarat</p>
              <div className="flex gap-2">
                <a href="tel:8866531993" className="w-10 h-10 rounded-full bg-white border border-[#eaeaea] flex items-center justify-center hover:border-[#c8941a]/50 hover:text-[#c8941a] transition-colors"><Phone size={16} /></a>
                <a href="mailto:contact@jasinterior.com" className="w-10 h-10 rounded-full bg-white border border-[#eaeaea] flex items-center justify-center hover:border-[#c8941a]/50 hover:text-[#c8941a] transition-colors"><Mail size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
