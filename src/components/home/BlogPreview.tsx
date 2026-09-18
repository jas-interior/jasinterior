'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { getBlogPosts } from '@/lib/queries'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getBlogPosts(3).then(setPosts)
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-semibold uppercase tracking-widest">Blog</span>
            </div>
            <h2 className="section-title">Latest From Our Blog</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-sm text-[#c8941a] font-semibold hover:underline">
            All Posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl overflow-hidden bg-white border border-[#eaeaea] hover:border-[#c8941a]/30 transition-all duration-300 hover:-translate-y-1">
              {post.featured_image ? (
                <div className="aspect-video overflow-hidden">
                  <Image src={post.featured_image} alt={post.title} width={400} height={225} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="aspect-video bg-[#faf9f6] flex items-center justify-center"><span className="text-4xl">📰</span></div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#666666] mb-3">
                  <Calendar size={12} />{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                </div>
                <h3 className="font-serif font-semibold text-[#111111] mb-2 group-hover:text-[#c8941a] transition-colors line-clamp-2" style={{fontFamily:'Playfair Display,serif'}}>{post.title}</h3>
                {post.short_description && <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">{post.short_description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
