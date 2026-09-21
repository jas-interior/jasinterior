import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowRight, Sofa, PenTool, Gem, ShieldCheck, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Turnkey Interior Solutions | JAS INTERIOR',
  description: 'Designing spaces that feel like home. Complete turnkey interior solutions for your living space.',
}

export default function TurnkeyInteriorPage() {
  return (
    <MainLayout>
      {/* Set a warm beige background for the entire page to match the design */}
      <div className="bg-[#f9f6f0] min-h-screen text-[#2d2a26] pb-20 pt-8">
        
        {/* HERO SECTION */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pt-8 lg:pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-6">
            <div className="flex-1 w-full max-w-2xl lg:pr-6 z-10">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#6d6355] mb-3">
                Premium Turnkey Interior Solutions by JAS INTERIOR
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-light mb-5 leading-[1.1]" style={{fontFamily:'Playfair Display, serif'}}>
                Transform Your House <br />
                <span className="italic text-[#8c7b68]">Into a Luxury Home</span>
              </h1>
              <p className="text-[#6d6355] text-base md:text-lg max-w-lg mb-6 leading-relaxed">
                From <strong>Design to Execution</strong>, we create beautiful, functional and luxurious interiors with premium materials, elegant designs and professional execution.
              </p>
              <div className="space-y-2 mb-8">
                <div className="inline-block bg-[#e8e4dc] text-[#2d2a26] text-xs font-bold px-4 py-2 rounded-full tracking-wider">
                  2 BHK | 3 BHK | 4 BHK Interior Packages
                </div>
                <div className="inline-block bg-[#e8e4dc] text-[#2d2a26] text-xs font-bold px-4 py-2 rounded-full tracking-wider ml-0 sm:ml-3">
                  Serving All Gujarat | Vadodara
                </div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#c8941a] transition-colors">
                Explore Our Work <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex-1 w-full relative">
              {/* Distinctive curved/arch mask shape from the design */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-tl-[120px] rounded-br-[120px] lg:rounded-tl-[160px] lg:rounded-br-[160px] shadow-2xl">
                <Image 
                  src="/assets/turnkey_hero.jpg" 
                  alt="Luxury Turnkey Interior Design by JAS INTERIOR" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES ROW */}
        <section className="border-y border-[#e2ddd5] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
              <div className="flex flex-col items-center">
                <Sofa size={32} strokeWidth={1} className="mb-4 text-[#8c7b68]" />
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2">Bespoke Designs</h3>
                <p className="text-[#6d6355] text-xs">Custom interiors tailored to you</p>
              </div>
              <div className="flex flex-col items-center">
                <PenTool size={32} strokeWidth={1} className="mb-4 text-[#8c7b68]" />
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2">Functional Spaces</h3>
                <p className="text-[#6d6355] text-xs">Smart solutions for beautiful living</p>
              </div>
              <div className="flex flex-col items-center">
                <Gem size={32} strokeWidth={1} className="mb-4 text-[#8c7b68]" />
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2">Quality Materials</h3>
                <p className="text-[#6d6355] text-xs">Carefully selected for lasting spaces</p>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={32} strokeWidth={1} className="mb-4 text-[#8c7b68]" />
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2">Timeless Appeal</h3>
                <p className="text-[#6d6355] text-xs">Designs that stay beautiful forever</p>
              </div>
            </div>
          </div>
        </section>

        {/* SHOP BY ROOM */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold tracking-[0.2em] text-center uppercase mb-12">Shop By Room</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Living Room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80' },
              { title: 'Bedroom', img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80' },
              { title: 'Dining Room', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80' },
              { title: 'Kitchen', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80' },
            ].map((room, i) => (
              <Link href="/shop" key={i} className="group flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/5] mb-5 overflow-hidden bg-[#e8e4dc]">
                  <Image src={room.img} alt={room.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2">{room.title}</h3>
                <span className="text-[#6d6355] text-xs flex items-center gap-1 group-hover:text-[#c8941a] transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold tracking-[0.2em] text-center uppercase mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Sunkissed Minimalism', loc: 'Ahmedabad, India', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1546?auto=format&fit=crop&q=80' },
              { title: 'Modern Serenity', loc: 'Vadodara, India', img: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80' },
              { title: 'Warmth in Wood', loc: 'Surat, India', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80' },
            ].map((proj, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative w-full aspect-[16/10] mb-5 overflow-hidden rounded-lg">
                  <Image src={proj.img} alt={proj.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-1">{proj.title}</h3>
                <p className="text-[#6d6355] text-xs">{proj.loc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-block border border-[#d3cec4] text-[#2d2a26] px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#2d2a26] hover:text-white transition-colors">
              View All Projects
            </Link>
          </div>
        </section>

        {/* DESIGN TIPS & IDEAS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#f2ede6] rounded-[40px] my-10">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 flex flex-col justify-center">
              <h2 className="text-2xl font-serif mb-4" style={{fontFamily:'Playfair Display, serif'}}>Design Tips & Ideas</h2>
              <p className="text-[#6d6355] text-sm mb-8">
                Inspiration, guides & expert tips to help you create a home you'll love.
              </p>
              <Link href="/blog" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest w-fit hover:bg-[#c8941a] transition-colors">
                Read The Blog
              </Link>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: '5 Tips to Make Your Small Space Feel Bigger', date: 'June 10, 2024', img: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80' },
                { title: 'Choosing the Right Color Palette', date: 'May 28, 2024', img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80' },
                { title: 'Trends We Love This Season', date: 'May 15, 2024', img: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80' },
              ].map((blog, i) => (
                <Link href="/blog" key={i} className="group block bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
                    <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2 leading-tight group-hover:text-[#c8941a] transition-colors">{blog.title}</h3>
                  <p className="text-[#8c7b68] text-xs">{blog.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BRANDS SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-[#e2ddd5]">
          <h2 className="text-xs font-bold tracking-[0.2em] text-center uppercase mb-10 text-[#6d6355]">Trusted By Leading Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['ASIAN PAINTS', 'HAFELE', 'JAQUAR', 'FEVICOL', 'CENTURY PLY'].map((brand, i) => (
              <div key={i} className="text-xl md:text-2xl font-bold tracking-widest text-[#2d2a26]" style={{fontFamily:'Playfair Display, serif'}}>
                {brand}
              </div>
            ))}
          </div>
        </section>

      </div>
    </MainLayout>
  )
}
