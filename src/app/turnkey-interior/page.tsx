import Image from 'next/image'
import ZoomableImage from '@/components/ui/ZoomableImage'
import PremiumIdeasGallery from '@/components/PremiumIdeasGallery'
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
                  src="/assets/turnkey_hero.webp" 
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

        {/* OUR PACKAGE PRICE */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold tracking-[0.2em] text-center uppercase mb-10 md:mb-16 text-[#6d6355]">Our Package Price</h2>
          <div className="space-y-16 md:space-y-24">
            
            {/* 2 BHK Package */}
            <div className="flex flex-row items-start gap-4 lg:gap-10">
              <div className="w-[30%] shrink-0 sticky top-20 md:top-24 self-start">
                <ZoomableImage 
                  src="/assets/packages/2-bhk-12-lac.png" 
                  alt="2 BHK Interior Package" 
                  width={800} height={1200} 
                  className="w-full h-auto rounded-xl shadow-2xl border border-[#e2ddd5]" 
                  priority
                />
              </div>
              <div className="w-[70%] flex flex-col pt-0 lg:pt-4">
                <h3 className="text-[14px] md:text-3xl font-bold md:font-light mb-1 md:mb-2" style={{fontFamily:'Playfair Display, serif'}}>2 BHK Full Luxury Interior</h3>
                <div className="text-[#8c7b68] text-[12px] md:text-2xl font-serif italic mb-2">₹12,00,000</div>
                <div className="text-[8px] md:text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-2 md:mb-4 leading-tight">Complete Specification &bull; 15 Years Warranty</div>
                
                <div className="mb-4 md:mb-8">
                  <Link href="/inquiry?product=2-BHK-Package" className="inline-flex justify-center bg-[#1a1a1a] text-white px-5 py-2 md:px-10 md:py-3.5 text-[9px] md:text-xs font-bold uppercase tracking-widest w-fit hover:bg-[#c8941a] transition-colors shadow-md">
                    Get Quote
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-6 text-[8px] md:text-xs text-[#555555] leading-snug md:leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">1. Living Room / Hall</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>Safety Door, Shoe Rack</li>
                      <li>TV Unit, 6 Seater Sofa Set, Tipoi</li>
                      <li>Curtains, Pelmet, Behind Sofa Wall Design</li>
                      <li>Kitchen Partition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">2. Kitchen</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>Premium Acrylic Kitchen</li>
                      <li>Kitchen Loft / Maliya, Service Table</li>
                      <li>Kitchen Partition</li>
                      <li>Complete Storage & Cabinet Work</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">3. All Bedrooms</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                        <li><span className="font-semibold">Master Bedroom:</span> Bed, Mattress, Side Tables</li>
                        <li>Behind Bed Wall Decoration</li>
                        <li>Wardrobe with Maliya / Loft</li>
                        <li>Dressing Table, Curtains with Pelmet</li>
                        <li>Small TV Unit</li>
                      </ul>
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                        <li><span className="font-semibold">Bedroom 2:</span> Bed, Mattress, Side Tables</li>
                        <li>Behind Bed Wall Decoration</li>
                        <li>Wardrobe with Maliya / Loft</li>
                        <li>Dressing Table, Curtains with Pelmet</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">4. Common Work</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>False Gypsum Ceiling, Asian Royale Paint</li>
                      <li>Electrical Wiring & Lights for False Ceiling</li>
                      <li>Wash Basin Box / Vanity & Mirror (All Bathrooms)</li>
                      <li>Wash Area Mini Cabinet</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">5. Material & Lighting</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>BWR Semi-Waterproof Plywood</li>
                      <li>1mm Outer / 0.8mm Inner Premium Laminate</li>
                      <li>SS Hardware, Locks, Premium Accessories</li>
                      <li>Fevicol Marine, Philips Lights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 BHK Package */}
            <div className="flex flex-row items-start gap-4 lg:gap-10 pt-6 md:pt-8 border-t border-[#e2ddd5]">
              <div className="w-[30%] shrink-0 sticky top-20 md:top-24 self-start">
                <ZoomableImage 
                  src="/assets/packages/3-bhk-15-lac.png" 
                  alt="3 BHK Interior Package" 
                  width={800} height={1200} 
                  className="w-full h-auto rounded-xl shadow-2xl border border-[#e2ddd5]" 
                />
              </div>
              <div className="w-[70%] flex flex-col pt-0 lg:pt-4">
                <h3 className="text-[14px] md:text-3xl font-bold md:font-light mb-1 md:mb-2" style={{fontFamily:'Playfair Display, serif'}}>3 BHK Full Luxury Interior</h3>
                <div className="text-[#8c7b68] text-[12px] md:text-2xl font-serif italic mb-2">₹15,00,000</div>
                <div className="text-[8px] md:text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-2 md:mb-4 leading-tight">Complete Specification &bull; 15 Years Warranty</div>
                
                <div className="mb-4 md:mb-8">
                  <Link href="/inquiry?product=3-BHK-Package" className="inline-flex justify-center bg-[#1a1a1a] text-white px-5 py-2 md:px-10 md:py-3.5 text-[9px] md:text-xs font-bold uppercase tracking-widest w-fit hover:bg-[#c8941a] transition-colors shadow-md">
                    Get Quote
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-6 text-[8px] md:text-xs text-[#555555] leading-snug md:leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">1. Living Room / Hall</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>Safety Door, Shoe Rack</li>
                      <li>TV Unit, 6 Seater Sofa Set, Tipoi</li>
                      <li>Curtains, Pelmet, Behind Sofa Wall Design</li>
                      <li>Kitchen Partition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">2. Kitchen</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>Premium Acrylic Kitchen</li>
                      <li>Kitchen Loft / Maliya, Service Table</li>
                      <li>Kitchen Partition</li>
                      <li>Complete Storage & Cabinet Work</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">3. All Bedrooms</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                        <li><span className="font-semibold">Master Bedroom:</span> Bed, Mattress, Side Tables</li>
                        <li>Behind Bed Wall Decoration</li>
                        <li>Wardrobe with Maliya, Dressing Table</li>
                        <li>Curtains with Pelmet, Small TV Unit</li>
                      </ul>
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                        <li><span className="font-semibold">Bedroom 2:</span> Bed, Mattress, Side Tables</li>
                        <li>Behind Bed Wall Decoration</li>
                        <li>Wardrobe with Maliya, Dressing Table</li>
                        <li>Curtains with Pelmet</li>
                      </ul>
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a] md:col-span-2">
                        <li><span className="font-semibold">Bedroom 3:</span> Bed, Mattress, Side Tables, Behind Bed Wall Decoration, Wardrobe with Maliya, Dressing Table, Curtains with Pelmet, Study Table</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">4. Common Work</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>False Gypsum Ceiling, Asian Royale Paint</li>
                      <li>Electrical Wiring & Lights for False Ceiling</li>
                      <li>Wash Basin Box / Vanity & Mirror (All Bathrooms)</li>
                      <li>Wash Area Mini Cabinet</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">5. Material & Lighting</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>BWR Semi-Waterproof Plywood</li>
                      <li>1mm Outer / 0.8mm Inner Premium Laminate</li>
                      <li>SS Hardware, Locks, Premium Accessories</li>
                      <li>Fevicol Marine, Philips Lights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 BHK Package */}
            <div className="flex flex-row items-start gap-4 lg:gap-10 pt-6 md:pt-8 border-t border-[#e2ddd5]">
              <div className="w-[30%] shrink-0 sticky top-20 md:top-24 self-start">
                <ZoomableImage 
                  src="/assets/packages/4-bhk-18-lac.png" 
                  alt="4 BHK Interior Package" 
                  width={800} height={1200} 
                  className="w-full h-auto rounded-xl shadow-2xl border border-[#e2ddd5]" 
                />
              </div>
              <div className="w-[70%] flex flex-col pt-0 lg:pt-4">
                <h3 className="text-[14px] md:text-3xl font-bold md:font-light mb-1 md:mb-2" style={{fontFamily:'Playfair Display, serif'}}>4 BHK Full Luxury Interior</h3>
                <div className="text-[#8c7b68] text-[12px] md:text-2xl font-serif italic mb-2">₹18,00,000</div>
                <div className="text-[8px] md:text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-2 md:mb-4 leading-tight">Complete Specification &bull; 15 Years Warranty</div>
                
                <div className="mb-4 md:mb-8">
                  <Link href="/inquiry?product=4-BHK-Package" className="inline-flex justify-center bg-[#1a1a1a] text-white px-5 py-2 md:px-10 md:py-3.5 text-[9px] md:text-xs font-bold uppercase tracking-widest w-fit hover:bg-[#c8941a] transition-colors shadow-md">
                    Get Quote
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-6 text-[8px] md:text-xs text-[#555555] leading-snug md:leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">1. Living Room / Hall</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>Safety Door, Shoe Rack</li>
                      <li>TV Unit, 6 Seater Sofa Set, Tipoi</li>
                      <li>Curtains, Pelmet, Behind Sofa Wall Design</li>
                      <li>Kitchen Partition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">2. Kitchen</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>Premium Acrylic Kitchen</li>
                      <li>Kitchen Loft / Maliya, Service Table</li>
                      <li>Kitchen Partition</li>
                      <li>Complete Storage & Cabinet Work</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">3. All Bedrooms</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                        <li><span className="font-semibold">Master Bedroom:</span> Bed, Mattress, Side Tables</li>
                        <li>Behind Bed Wall Decoration</li>
                        <li>Wardrobe with Maliya, Dressing Table</li>
                        <li>Curtains with Pelmet, Small TV Unit</li>
                      </ul>
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                        <li><span className="font-semibold">Kids Bedroom:</span> Bed, Mattress, Side Tables</li>
                        <li>Behind Bed Wall Decoration</li>
                        <li>Wardrobe with Maliya, Dressing Table</li>
                        <li>Curtains with Pelmet, Study Table</li>
                      </ul>
                      <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a] md:col-span-2">
                        <li><span className="font-semibold">Other Bedrooms:</span> Bed, Mattress, Side Tables, Behind Bed Wall Decoration, Wardrobe with Maliya, Dressing Table, Curtains with Pelmet</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">4. Common Work</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>False Gypsum Ceiling, Asian Royale Paint</li>
                      <li>Electrical Wiring & Lights for False Ceiling</li>
                      <li>Wash Basin Box / Vanity & Mirror (All Bathrooms)</li>
                      <li>Wash Area Mini Cabinet</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1 uppercase">5. Material & Lighting</h4>
                    <ul className="list-disc pl-3 space-y-0.5 marker:text-[#c8941a]">
                      <li>BWR Semi-Waterproof Plywood</li>
                      <li>1mm Outer / 0.8mm Inner Premium Laminate</li>
                      <li>SS Hardware, Locks, Premium Accessories</li>
                      <li>Fevicol Marine, Philips Lights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        <PremiumIdeasGallery />

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
