'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart, Phone } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import CartDrawer from '@/components/cart/CartDrawer'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom-furniture', label: 'Custom Furniture' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getItemCount, openCart } = useCartStore()
  const itemCount = getItemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#eaeaea]' : 'bg-white/90 backdrop-blur-sm border-b border-[#eaeaea]/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <Image src="/logo.webp" alt="JAS INTERIOR Logo" width={48} height={48} className="rounded-full group-hover:scale-105 transition-transform" priority />
              <div className="hidden sm:block">
                <div className="font-bold tracking-wider text-[15px] md:text-lg" style={{fontFamily:'Playfair Display,Georgia,serif',background:'linear-gradient(135deg,#c8941a,#e9a825,#c8941a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  JAS INTERIOR
                </div>
                <div className="text-[9px] md:text-[10px] text-[#555555] tracking-[0.2em] uppercase mt-0.5">Premium Furniture</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-semibold text-[#333333] hover:text-[#c8941a] transition-colors tracking-wider uppercase">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link href="/inquiry" className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg btn-gold">
                Get Quote
              </Link>
              <button onClick={openCart} className="relative p-2 text-[#555555] hover:text-[#c8941a] transition-colors" aria-label="Cart">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c8941a] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <a href="tel:8866531993" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-[#c8941a]/30 text-[#c8941a] text-xs font-semibold hover:bg-[#c8941a]/10 transition-colors">
                <Phone size={14} /><span>Call</span>
              </a>
              <button className="lg:hidden p-2 text-[#555555] hover:text-[#c8941a] transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-[#eaeaea] shadow-xl absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-sm font-semibold tracking-wider uppercase text-[#111111] hover:text-[#c8941a] hover:bg-[#faf9f6] rounded-xl transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-[#eaeaea] flex flex-col gap-3">
                <a href="tel:8866531993" className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#c8941a]/30 text-[#c8941a] text-sm font-bold hover:bg-[#faf9f6]">
                  <Phone size={16} /> Call Support
                </a>
                <Link href="/inquiry" onClick={() => setMobileOpen(false)} className="flex items-center justify-center py-3.5 rounded-xl btn-gold text-sm font-bold">
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  )
}
