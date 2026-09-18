import Header from './Header'
import Footer from './Footer'
import MobileBottomBar from './MobileBottomBar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  )
}
