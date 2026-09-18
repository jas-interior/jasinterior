'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DollarSign, ShoppingCart, Users, MessageSquare } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, customers: 0, inquiries: 0 })
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient()
      
      const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
      const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true })
      const { count: inquiryCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new')
      const { data: revData } = await supabase.from('orders').select('total_amount').eq('payment_status', 'paid')
      
      const totalRevenue = revData?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0

      setStats({
        orders: orderCount || 0,
        revenue: totalRevenue,
        customers: customerCount || 0,
        inquiries: inquiryCount || 0
      })

      const { data: recent } = await supabase.from('orders').select('id, order_number, total_amount, order_status, created_at, customer:customers(full_name)').order('created_at', { ascending: false }).limit(5)
      if (recent) setRecentOrders(recent)
    }
    loadStats()
  }, [])

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Customers', value: stats.customers, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'New Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-[#c8941a]', bg: 'bg-[#c8941a]/10' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111111] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white border border-[#eaeaea] rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-[#555555] mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#111111]">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#eaeaea]">
          <h2 className="text-lg font-semibold text-[#111111]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-[#666666]">No recent orders found.</td></tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium text-[#c8941a]">{order.order_number}</td>
                    <td>{order.customer?.full_name || 'Unknown'}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        order.order_status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                        order.order_status === 'confirmed' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                        order.order_status === 'delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="font-medium">₹{Number(order.total_amount).toLocaleString('en-IN')}</td>
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
