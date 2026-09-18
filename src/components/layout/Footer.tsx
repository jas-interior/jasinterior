import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, MessageCircle } from 'lucide-react'

const categories = [
  { name: 'Sofa', href: '/shop/sofa' },
  { name: 'Bed', href: '/shop/bed' },
  { name: 'Wardrobe', href: '/shop/wardrobe' },
  { name: 'Dining Table', href: '/shop/dining-table' },
  { name: 'TV Unit', href: '/shop/tv-unit' },
  { name: 'Mattress', href: '/shop/mattress' },
  { name: 'T Table', href: '/shop/t-table' },
]
const quickLinks = [
  { name: 'Home', href: '/' }, { name: 'Shop', href: '/shop' },
  { name: 'Custom Furniture', href: '/custom-furniture' }, { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' }, { name: 'Inquiry', href: '/inquiry' }, { name: 'Contact', href: '/contact' },
]
const policies = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-conditions' },
  { name: 'Shipping & Delivery', href: '/shipping-delivery' },
  { name: 'Refund / Cancellation', href: '/refund-cancellation' },
]

export default function Footer() {
  return (
    <footer className="bg-[#faf9f6] border-t border-[#eaeaea]">
      {/* CTA Strip */}
      <div className="border-b border-[#eaeaea] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555555] text-sm text-center sm:text-left">Need custom furniture? Talk to our support team.</p>
          <div className="flex gap-3">
            <a href="https://wa.me/918866531993?text=Hello%20JAS%20INTERIOR%2C%20I%20need%20custom%20furniture." target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
              <MessageCircle size={15} /> WhatsApp
            </a>
            <a href="tel:8866531993" className="flex items-center gap-2 px-4 py-2 rounded-lg btn-outline-gold text-sm font-semibold">
              <Phone size={13} /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section for SEO & Users */}
      <div className="border-b border-[#eaeaea] py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-[#111111] mb-6 text-center" style={{fontFamily:'Playfair Display,serif'}}>Frequently Asked Questions</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#faf9f6] p-5 rounded-xl border border-[#eaeaea]">
              <h4 className="text-sm font-bold text-[#111] mb-2">Do you provide custom furniture?</h4>
              <p className="text-xs text-[#606060] leading-relaxed">Yes, JAS INTERIOR specializes in premium custom furniture. We can customize the size, color, material, and design of sofas, beds, wardrobes, and more to perfectly fit your space.</p>
            </div>
            <div className="bg-[#faf9f6] p-5 rounded-xl border border-[#eaeaea]">
              <h4 className="text-sm font-bold text-[#111] mb-2">Where is your showroom and factory located?</h4>
              <p className="text-xs text-[#606060] leading-relaxed">Our premium booking office (JAS INTERIOR) is located in Vadodara, and our direct manufacturing factory outlet (FM FURNITURE) is located in Navrangpura, Ahmedabad.</p>
            </div>
            <div className="bg-[#faf9f6] p-5 rounded-xl border border-[#eaeaea]">
              <h4 className="text-sm font-bold text-[#111] mb-2">Do you deliver across Gujarat?</h4>
              <p className="text-xs text-[#606060] leading-relaxed">Yes, we provide furniture delivery services across all major cities in Gujarat. Delivery charges are calculated extra based on your exact location.</p>
            </div>
            <div className="bg-[#faf9f6] p-5 rounded-xl border border-[#eaeaea]">
              <h4 className="text-sm font-bold text-[#111] mb-2">How can I get a quote or place an order?</h4>
              <p className="text-xs text-[#606060] leading-relaxed">You can browse our catalog online and add products to your cart for a quote request, or directly contact our support team via WhatsApp or Call at 8866531993.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.webp" alt="JAS INTERIOR" width={52} height={52} className="rounded-full" />
              <div>
                <div className="font-bold tracking-wider text-lg" style={{fontFamily:'Playfair Display,serif',background:'linear-gradient(135deg,#c8941a,#e9a825,#c8941a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  JAS INTERIOR
                </div>
                <div className="text-[10px] text-[#555555] tracking-widest uppercase">Premium Furniture</div>
              </div>
            </Link>
            <p className="text-sm text-[#606060] leading-relaxed mb-5">
              Premium Custom Furniture Manufacturer serving all of Gujarat. Made-to-order furniture crafted to your requirements.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#c8941a] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#606060] leading-relaxed">
                  Shop No. 1, Maa Complex, Near Uma Char Rasta,<br />Waghodiya Road, Vadodara, Gujarat, India
                </p>
              </div>
              <a href="tel:8866531993" className="flex items-center gap-3 text-sm text-[#555555] hover:text-[#c8941a] transition-colors">
                <Phone size={13} className="text-[#c8941a]" /><span>8866531993 (Support)</span>
              </a>
              <a href="tel:9574285584" className="flex items-center gap-3 text-xs text-[#606060] hover:text-[#c8941a] transition-colors">
                <Phone size={11} className="text-[#c8941a]/60" /><span>Shahwaj Khan: 9574285584</span>
              </a>
              <a href="tel:9173293129" className="flex items-center gap-3 text-xs text-[#606060] hover:text-[#c8941a] transition-colors">
                <Phone size={11} className="text-[#c8941a]/60" /><span>Akash Parmar: 9173293129</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#606060] hover:text-[#c8941a] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-widest mb-5">Furniture</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-[#606060] hover:text-[#c8941a] transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-widest mb-5">Policies</h4>
            <ul className="space-y-2.5 mb-8">
              {policies.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-[#606060] hover:text-[#c8941a] transition-colors">{p.name}</Link>
                </li>
              ))}
            </ul>
            <div className="bg-white rounded-lg p-4 border border-[#eaeaea]">
              <div className="text-xs font-semibold text-[#c8941a] uppercase tracking-widest mb-1">Service Area</div>
              <p className="text-xs text-[#606060]">All Gujarat</p>
              <p className="text-xs text-[#444] mt-1">Delivery charges are extra and confirmed separately.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#eaeaea] px-4 py-5 mb-[70px] lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#444] text-center">&copy; {new Date().getFullYear()} JAS INTERIOR. All rights reserved. | Premium Custom Furniture Manufacturer | All Gujarat Service</p>
          <p className="text-xs text-[#444]">Vadodara, Gujarat, India</p>
        </div>
      </div>
    </footer>
  )
}
