'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { getBlogPostBySlug } from '@/lib/queries'
import { formatDate } from '@/lib/utils'
import { Calendar, ChevronLeft } from 'lucide-react'
import type { BlogPost } from '@/types'

export default function BlogClient({ post }: { post: BlogPost }) {
  // Removed useEffect and loading checks since post is now passed from Server Component

  if (!post) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="section-title mb-4">Article Not Found</h1>
          <p className="text-[#666666] mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="px-6 py-3 rounded-xl btn-gold font-semibold">Back to Blog</Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-[#c8941a] transition-colors mb-10">
            <ChevronLeft size={16} /> Back to Blog
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-[#c8941a] font-semibold mb-4">
              <Calendar size={16} /> {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] leading-tight mb-6" style={{fontFamily:'Playfair Display,serif'}}>{post.title}</h1>
            {post.short_description && <p className="text-xl text-[#555555] leading-relaxed">{post.short_description}</p>}
          </div>
        </div>

        {post.featured_image && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="aspect-[21/9] relative rounded-3xl overflow-hidden bg-white border border-[#eaeaea]">
              <Image src={post.featured_image} alt={post.title} fill className="object-cover" priority />
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Extremely basic HTML rendering. For a production app, use something like DOMPurify or a proper Markdown/HTML renderer component */}
          <div className="prose-gold max-w-none text-[#555555] leading-loose text-lg" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
      </article>
    </MainLayout>
  )
}
