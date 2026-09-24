'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Search, Plus, User, FileText, ArrowRight } from 'lucide-react'

interface CustomerLedger {
  mobile: string
  name: string
  total_business: number
  total_paid: number
  total_pending: number
  invoice_count: number
  last_order_date: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerLedger[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from('invoices').select('*').order('created_at', { ascending: false })
    
    if (data) {
      const ledger: Record<string, CustomerLedger> = {}
      
      data.forEach(inv => {
        const mobile = inv.customer_mobile
        if (!mobile) return
        
        if (!ledger[mobile]) {
          ledger[mobile] = {
            mobile: mobile,
            name: inv.customer_name || 'Unknown',
            total_business: 0,
            total_paid: 0,
            total_pending: 0,
            invoice_count: 0,
            last_order_date: inv.created_at
          }
        }
        
        ledger[mobile].total_business += Number(inv.total_amount || 0)
        ledger[mobile].total_paid += Number(inv.paid_amount || 0)
        ledger[mobile].invoice_count += 1
      })

      // Calculate pending
      Object.values(ledger).forEach(c => {
        c.total_pending = c.total_business - c.total_paid
      })
      
      setCustomers(Object.values(ledger))
    }
    setLoading(false)
  }

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.mobile.includes(search)
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Client Ledger (Khata)</h1>
          <p className="text-sm text-gray-500">Manage all your clients, view pending balances, and create new bills.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input type="text" placeholder="Search name or mobile..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-gold !pl-9 h-10 w-full sm:w-64" />
          </div>
          <Link href="/admin/bill-book/new" className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gold text-sm font-semibold whitespace-nowrap text-black w-full sm:w-auto justify-center">
            <Plus size={16} /> New Client
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#111111] text-white">
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold">Client Name</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-right">Total Business</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-right">Advance / Paid</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-right">Bakaya (Pending)</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading clients...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No clients found</td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.mobile} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#111111] flex items-center gap-2">
                        <User size={16} className="text-[#c8941a]" />
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">+91 {client.mobile}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{client.invoice_count} Bills Generated</div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      ₹{client.total_business.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-green-600">
                      ₹{client.total_paid.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${client.total_pending > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        ₹{client.total_pending.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/customers/${client.mobile}`} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors">
                          Profile <ArrowRight size={14} />
                        </Link>
                        <Link href={`/admin/bill-book/new?mobile=${client.mobile}&name=${encodeURIComponent(client.name)}`} className="flex items-center gap-1 px-3 py-1.5 bg-[#c8941a]/10 hover:bg-[#c8941a]/20 text-[#c8941a] text-xs font-bold rounded-lg transition-colors">
                          <Plus size={14} /> New Bill
                        </Link>
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
