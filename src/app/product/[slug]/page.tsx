import { Metadata } from 'next'
import { getProductBySlug } from '@/lib/queries'
import ProductClient from './ProductClient'
import { notFound } from 'next/navigation'
import type { Product } from '@/types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | JAS INTERIOR',
    }
  }

  const title = product.meta_title || `${product.title} | JAS INTERIOR`
  const description = product.meta_description || product.short_description || product.description?.substring(0, 160) || ''
  const image = product.images?.[0] ? product.images[0] : '/logo.webp'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: image,
          width: 1000,
          height: 1000,
          alt: product.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  
  if (!product) {
    notFound()
  }

  // Generate Product JSON-LD Schema
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.short_description || '',
    image: product.images || [],
    category: product.category?.name || 'Furniture',
    brand: {
      '@type': 'Brand',
      name: 'JAS INTERIOR'
    },
    offers: {
      '@type': 'Offer',
      url: `https://jasinterior.store/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price_enabled && product.price ? product.price : 0,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'JAS INTERIOR'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <ProductClient product={product} />
    </>
  )
}
