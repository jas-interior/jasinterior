import { MetadataRoute } from 'next'
import { getProducts, getCategories, getBlogPosts } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jasinterior.store'

  const routes = [
    '',
    '/about',
    '/contact',
    '/shop',
    '/custom-furniture',
    '/locations/vadodara',
    '/locations/ahmedabad',
    '/inquiry'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const products = await getProducts({ limit: 1000 })
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updated_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    const categories = await getCategories()
    const categoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/shop/${cat.slug}`,
      lastModified: new Date(cat.updated_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...routes, ...categoryRoutes, ...productRoutes]
  } catch (err) {
    console.error('Error generating sitemap dynamic routes:', err)
    return routes
  }
}
