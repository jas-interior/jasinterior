'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const togglePublished = async (id: string, current: boolean) => {
    const supabase = createClient()
    await supabase.from('blog_posts').update({ published: !current }).eq('id', id)
    loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    const supabase = createClient()
    const toastId = toast.loading('Deleting...')
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) toast.error(error.message, { id: toastId })
    else { toast.success('Deleted successfully', { id: toastId }); loadData() }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">Blog Posts</h1>
        {/* Placeholder for Add Blog - can be added later if requested */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#eaeaea] text-[#888] text-sm font-semibold cursor-not-allowed">
          <Plus size={16} /> Add Post (Coming Soon)
        </button>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table min-w-[800px]">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No blog posts found. Seed data might be missing.</td></tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="font-medium text-[#111111]">{post.title}</td>
                    <td className="text-[#555555] text-xs">{post.slug}</td>
                    <td>
                      <button onClick={() => togglePublished(post.id, post.published)} className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider ${post.published ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {post.published ? 'PUBLISHED' : 'DRAFT'}
                      </button>
                    </td>
                    <td className="text-[#555555] text-sm">{new Date(post.created_at).toLocaleDateString()}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-[#555555] hover:text-[#111111] transition-colors"><ExternalLink size={16} /></Link>
                        <button onClick={() => handleDelete(post.id, post.title)} className="p-2 text-[#555555] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
