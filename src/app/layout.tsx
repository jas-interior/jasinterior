import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_URL = 'https://www.jasinterior.store';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'JAS INTERIOR | Premium Custom Furniture Manufacturer in Gujarat',
    template: '%s | JAS INTERIOR',
  },
  description:
    'JAS INTERIOR is a premium custom furniture manufacturer in Gujarat. Custom sofas, beds, wardrobes, dining tables, TV units & more. Made-to-order furniture across all Gujarat. Based in Vadodara.',
  keywords: [
    'JAS Interior', 'JAS Interior Vadodara', 'custom furniture manufacturer Gujarat',
    'premium furniture manufacturer Gujarat', 'custom furniture Vadodara',
    'custom sofa manufacturer Vadodara', 'custom bed manufacturer Vadodara',
    'custom wardrobe manufacturer Vadodara', 'custom dining table manufacturer',
    'furniture manufacturer Vadodara', 'made to order furniture Gujarat',
    'premium custom furniture Gujarat',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'JAS INTERIOR',
    title: 'JAS INTERIOR | Premium Custom Furniture Manufacturer in Gujarat',
    description:
      'Premium custom furniture manufacturer in Gujarat. Made-to-order sofas, beds, wardrobes, dining tables & more. Serving all Gujarat from Vadodara.',
    images: [{ url: '/logo.webp', width: 512, height: 512, alt: 'JAS INTERIOR Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JAS INTERIOR | Premium Custom Furniture Manufacturer',
    description: 'Premium custom furniture manufacturer in Gujarat.',
    images: ['/logo.webp'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FurnitureStore', 'Organization'],
  name: 'JAS INTERIOR',
  alternateName: 'FM FURNITURE',
  description: 'Premium Custom Furniture Manufacturer & Factory Outlet in Gujarat. Specializing in luxury sofas, beds, wardrobes, and custom interior solutions.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  image: `${SITE_URL}/logo.webp`,
  telephone: '+918866531993',
  email: 'support@jasinterior.store',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 1, Maa Complex, Near Uma Char Rasta, Waghodiya Road',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      postalCode: '390019',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Mangalmurti Complex, B-3, Ashram Rd, opp. city gold cinema, Vishalpur, Navrangpura',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380009',
      addressCountry: 'IN',
      name: 'FM Furniture Factory Outlet'
    }
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.3072',
    longitude: '73.1812',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '20:00',
  },
  priceRange: '₹₹₹',
  hasMap: 'https://maps.google.com/?q=Waghodiya+Road+Vadodara+Gujarat',
  areaServed: {
    '@type': 'State',
    name: 'Gujarat',
  },
  sameAs: [
    SITE_URL
  ]
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you provide custom furniture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, JAS INTERIOR specializes in premium custom furniture. We can customize the size, color, material, and design of sofas, beds, wardrobes, and more to perfectly fit your space.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where is your showroom and factory located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our premium booking office (JAS INTERIOR) is located in Vadodara, and our direct manufacturing factory outlet (FM FURNITURE) is located in Navrangpura, Ahmedabad.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you deliver across Gujarat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide furniture delivery services across all major cities in Gujarat. Delivery charges are calculated extra based on your exact location.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I get a quote or place an order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can browse our catalog online and add products to your cart for a quote request, or directly contact our support team via WhatsApp or Call at 8866531993.'
      }
    }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/logo-192.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-brand-black text-brand-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#f5f5f0',
              border: '1px solid #2a2a2a',
            },
            success: { iconTheme: { primary: '#c8941a', secondary: '#0a0a0a' } },
          }}
        />
      </body>
    </html>
  )
}
