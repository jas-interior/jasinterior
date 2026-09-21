'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Grid, ShoppingCart, MessageSquare, FileText, Settings, LogOut, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/categories', label: 'Categories', icon: Grid },
  { href: '/admin/interior-ideas', label: 'Interior Ideas', icon: ShoppingBag }, // Will fix import
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Simple hardcoded login check could go here if needed, but for now we keep it open for development
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-[#faf9f6]/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-[#eaeaea] z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#eaeaea]">
          <Link href="/admin" className="font-serif font-bold text-xl text-[#c8941a]" style={{fontFamily:'Playfair Display,serif'}}>JAS ADMIN</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#555555]"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-[#c8941a]/10 text-[#c8941a]' : 'text-[#555555] hover:bg-white hover:text-[#111111]'}`}>
                <Icon size={18} /> {item.label}
              </Link>
            )
          })}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors mt-8">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0">
        <header className="h-16 bg-white border-b border-[#eaeaea] flex items-center px-4 sm:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 mr-4 text-[#555555]">
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <Link href="/" target="_blank" className="text-xs font-medium text-[#555555] hover:text-[#c8941a] px-4 py-2 rounded-lg bg-white border border-[#eaeaea]">View Live Site ↗</Link>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
