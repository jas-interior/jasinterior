'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (data) setInquiries(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    const toastId = toast.loading('Updating...')
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
    if (error) toast.error(error.message, { id: toastId })
    else { toast.success('Status updated', { id: toastId }); loadData() }
  }

  const filtered = inquiries.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.mobile.includes(search) ||
    (i.product_name && i.product_name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">Inquiries & Quotes</h1>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
          <input type="text" placeholder="Search inquiries..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-gold !pl-9 h-10 w-full" />
        </div>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table min-w-[1200px]">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Type / Product</th>
                <th>Location</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8">No inquiries found.</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className={item.status === 'new' ? 'bg-[#c8941a]/5' : ''}>
                    <td className="text-[#555555] whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>
                      <p className="font-medium text-[#111111]">{item.name}</p>
                      <p className="text-xs text-[#c8941a]">{item.mobile}</p>
                    </td>
                    <td>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#eaeaea] mb-1 inline-block uppercase tracking-wider">{item.inquiry_type}</span>
                      <p className="font-medium text-[#111111] line-clamp-1">{item.product_name || 'General'}</p>
                    </td>
                    <td className="text-[#555555]">{item.city || '-'}</td>
                    <td>
                      <div className="text-xs text-[#666666] line-clamp-2 max-w-xs" title={item.message}>
                        {item.message || '-'}
                      </div>
                    </td>
                    <td>
                      <select 
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-md focus:outline-none ${
                          item.status === 'new' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          item.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          item.status === 'quoted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="quoted">QUOTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
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
