import MainLayout from '@/components/layout/MainLayout'
import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import WhyChooseSection from '@/components/home/WhyChooseSection'
import CustomCTASection from '@/components/home/CustomCTASection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks from '@/components/home/HowItWorks'
import ServiceAreaSection from '@/components/home/ServiceAreaSection'
import BlogPreview from '@/components/home/BlogPreview'
import FinalCTA from '@/components/home/FinalCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JAS INTERIOR | Premium Custom Furniture Manufacturer in Gujarat',
  description: 'JAS INTERIOR – Premium custom furniture manufacturer in Gujarat. Custom sofas, beds, wardrobes, dining tables, TV units & more. Made-to-order furniture from Vadodara, serving all Gujarat.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <WhyChooseSection />
      <CustomCTASection />
      <HowItWorks />
      <ServiceAreaSection />
      <BlogPreview />
      <FinalCTA />
    </MainLayout>
  )
}
