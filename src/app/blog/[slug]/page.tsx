import { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/queries'
import BlogClient from './BlogClient'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found | JAS INTERIOR',
    }
  }

  const title = post.seo_title || `${post.title} | JAS INTERIOR Blog`
  const description = post.seo_description || post.short_description || ''
  const image = post.featured_image || '/logo.webp'

  return {
    title,
    description,
    keywords: post.seo_keywords || '',
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.published_at,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
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

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  // Generate Article JSON-LD Schema
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo_description || post.short_description || '',
    image: post.featured_image ? [post.featured_image] : [],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: [{
      '@type': 'Organization',
      name: 'JAS INTERIOR',
      url: 'https://jasinterior.store'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'JAS INTERIOR',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jasinterior.store/logo.webp'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <BlogClient post={post} />
    </>
  )
}
