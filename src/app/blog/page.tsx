'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { getBlogPosts } from '@/lib/queries'
import { formatDate } from '@/lib/utils'
import { Calendar } from 'lucide-react'
import type { BlogPost } from '@/types'

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts().then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="section-title mb-4">Design & Furniture Blog</h1>
          <p className="text-[#666666] max-w-2xl mx-auto">Discover interior design tips, furniture care guides, and the latest trends from the JAS INTERIOR team.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white border border-[#eaeaea]">
                <div className="skeleton aspect-video" />
                <div className="p-6 space-y-3"><div className="skeleton h-4 rounded w-1/4" /><div className="skeleton h-6 rounded w-3/4" /><div className="skeleton h-4 rounded w-full" /></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#eaeaea] rounded-3xl">
            <p className="text-[#555555]">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl overflow-hidden bg-white border border-[#eaeaea] hover:border-[#c8941a]/40 transition-colors flex flex-col">
                <div className="aspect-video relative overflow-hidden bg-white">
                  {post.featured_image ? (
                    <Image src={post.featured_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">📰</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#c8941a] mb-3 font-semibold">
                    <Calendar size={14} />{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#111111] mb-3 group-hover:text-[#c8941a] transition-colors line-clamp-2" style={{fontFamily:'Playfair Display,serif'}}>{post.title}</h2>
                  {post.short_description && <p className="text-[#555555] text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{post.short_description}</p>}
                  <span className="text-sm font-semibold text-[#111111] group-hover:text-[#c8941a] transition-colors mt-auto inline-flex items-center gap-1">Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
