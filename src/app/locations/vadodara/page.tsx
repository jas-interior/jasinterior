import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'
import { MapPin, Phone, Clock, ShieldCheck, Award } from 'lucide-react'

export default function VadodaraLocationPage() {
  return (
    <MainLayout>
      <div className="bg-[#faf9f6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              JAS INTERIOR - <span className="text-[#c8941a]">Vadodara Office</span>
            </h1>
            <p className="text-lg text-[#666666] leading-relaxed">
              Welcome to our premium booking office in Vadodara. This is where your dream furniture journey begins. Discuss your requirements with our expert consultants in a luxurious environment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 animate-fade-in-up animate-delay-100">
              <div className="bg-white p-8 rounded-2xl border border-[#eaeaea] shadow-sm">
                <h2 className="text-2xl font-bold text-[#111111] mb-6 border-b border-[#eaeaea] pb-4">Office Details</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 text-[#c8941a]">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] mb-1">Address</h3>
                      <p className="text-[#666666]">Shop No. 1, Maa Complex, Near Uma Char Rasta, Waghodiya Road, Vadodara, Gujarat</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 text-[#c8941a]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] mb-1">Contact Details</h3>
                      <p className="text-[#666666]">Phone: +91 8866531993<br/>WhatsApp: +91 8866531993</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c8941a]/10 flex items-center justify-center flex-shrink-0 text-[#c8941a]">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] mb-1">Business Hours</h3>
                      <p className="text-[#666666]">Monday - Sunday<br/>10:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-[#eaeaea] text-center">
                  <ShieldCheck size={32} className="mx-auto text-[#c8941a] mb-3" />
                  <h3 className="font-semibold text-[#111111] mb-2">Premium Consulting</h3>
                  <p className="text-xs text-[#666666]">One-on-one expert advice for your space.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#eaeaea] text-center">
                  <Award size={32} className="mx-auto text-[#c8941a] mb-3" />
                  <h3 className="font-semibold text-[#111111] mb-2">Easy Booking</h3>
                  <p className="text-xs text-[#666666]">Hassle-free ordering and customizations.</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <div className="bg-white p-2 rounded-2xl border border-[#eaeaea] shadow-lg h-[600px]">
                {/* Placeholder for GMB Map */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221669!2d73.17308625!3d22.32210265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <div className="mt-6 flex gap-4">
                <a href="https://maps.google.com/?q=Vadodara,Gujarat" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-4 rounded-xl btn-gold text-white font-semibold">
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
