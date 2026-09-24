'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Eye, Search } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('orders').select('*, customer:customers(*)').order('created_at', { ascending: false })
    if (data) setOrders(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    const toastId = toast.loading('Updating...')
    const { error } = await supabase.from('orders').update({ order_status: status }).eq('id', id)
    if (error) toast.error(error.message, { id: toastId })
    else { toast.success('Status updated', { id: toastId }); loadData() }
  }

  const filtered = orders.filter(o => 
    o.order_number.toLowerCase().includes(search.toLowerCase()) || 
    o.customer?.full_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer?.mobile.includes(search)
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">Orders</h1>
        <div className="relative !w-full sm:!w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-gold !pl-9 h-10 w-full" />
        </div>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table min-w-[1000px]">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Order Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8">No orders found.</td></tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium text-[#c8941a]">{order.order_number}</td>
                    <td className="text-[#555555]">{new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td>
                      <p className="font-medium text-[#111111]">{order.customer?.full_name}</p>
                      <p className="text-xs text-[#666666]">{order.customer?.mobile}</p>
                    </td>
                    <td className="font-medium">{formatPrice(order.total_amount)}</td>
                    <td>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider ${
                        order.payment_status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {order.payment_status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <select 
                        value={order.order_status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-white border border-[#eaeaea] text-xs font-semibold px-2 py-1 rounded-md text-[#111111] focus:outline-none focus:border-[#c8941a]"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button className="p-2 text-[#555555] hover:text-black transition-colors" title="View Details"><Eye size={16} /></button>
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
