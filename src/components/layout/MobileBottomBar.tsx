'use client'
import { Phone, MessageCircle, FileText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileBottomBar() {
  const pathname = usePathname()
  const isInquiryActive = pathname === '/inquiry'

  return (
    <div className="mobile-bottom-bar lg:hidden">
      <div className="flex items-center justify-around gap-2">
        <a
          href="https://wa.me/918866531993?text=Hello%20JAS%20INTERIOR%2C%20I%20need%20custom%20furniture."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center gap-1 py-1 rounded-lg text-green-400 hover:bg-green-400/10 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>

        <a
          href="tel:8866531993"
          className="flex-1 flex flex-col items-center gap-1 py-1 rounded-lg text-[#c8941a] hover:bg-[#c8941a]/10 transition-colors"
        >
          <Phone size={20} />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        <Link
          href="/inquiry"
          className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-colors ${
            isInquiryActive ? 'bg-[#111111] text-[#c8941a]' : 'text-[#111111] hover:bg-white/5'
          }`}
        >
          <FileText size={20} />
          <span className="text-[10px] font-medium">Inquiry</span>
        </Link>
      </div>
    </div>
  )
}
