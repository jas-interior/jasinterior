import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'
import { MapPin, Phone, Factory, Truck, Gem } from 'lucide-react'

export default function AhmedabadLocationPage() {
  return (
    <MainLayout>
      <div className="bg-[#faf9f6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              FM FURNITURE - <span className="text-[#c8941a]">Ahmedabad Factory Outlet</span>
            </h1>
            <p className="text-lg text-[#666666] leading-relaxed">
              Welcome to the manufacturing heart of our brand. FM Furniture is our state-of-the-art factory outlet where raw materials are transformed into luxurious masterpieces. Enjoy direct factory prices and unparalleled quality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 animate-fade-in-up animate-delay-100">
              <div className="bg-white p-8 rounded-2xl border border-[#eaeaea] shadow-sm">
                <h2 className="text-2xl font-bold text-[#111111] mb-6 border-b border-[#eaeaea] pb-4">Factory Details</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 text-[#c8941a]">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] mb-1">Address</h3>
                      <p className="text-[#666666]">Mangalmurti Complex, B-3, Ashram Rd, opp. city gold cinema, Vishalpur, Muslim Society, Navrangpura, Ahmedabad, Gujarat 380009</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 text-[#c8941a]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] mb-1">Contact Details</h3>
                      <p className="text-[#666666]">Phone: +91 8866531993, +91 8866581993</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 text-[#c8941a]">
                      <Factory size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] mb-1">Direct Manufacturer</h3>
                      <p className="text-[#666666]">No middlemen. Direct factory pricing for bulk and retail orders.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-[#eaeaea] text-center">
                  <Gem size={32} className="mx-auto text-[#c8941a] mb-3" />
                  <h3 className="font-semibold text-[#111111] mb-2">Premium Materials</h3>
                  <p className="text-xs text-[#666666]">Quality tested woods, fabrics, and hardware.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#eaeaea] text-center">
                  <Truck size={32} className="mx-auto text-[#c8941a] mb-3" />
                  <h3 className="font-semibold text-[#111111] mb-2">All Gujarat Delivery</h3>
                  <p className="text-xs text-[#666666]">Safe and secure transport across the state.</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <div className="bg-white p-2 rounded-2xl border border-[#eaeaea] shadow-lg h-[600px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7745924764586!2d72.570605!3d23.032047100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85f45f5e6a01%3A0x4e5c6057e5b3b25f!2sTHE%20FM%20FURNITURE!5e0!3m2!1sen!2sin!4v1789670701286!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin">
                </iframe>
              </div>
              <div className="mt-6 flex gap-4">
                <a href="https://maps.google.com/maps?q=THE+FM+FURNITURE,+Ahmedabad" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-4 rounded-xl btn-gold text-white font-semibold">
                  Get Directions
                </a>
                <Link href="/shop" className="flex-1 text-center py-4 rounded-xl btn-outline-gold font-semibold">
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
