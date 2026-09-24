'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { User, Phone, FileText, ArrowLeft, Edit, Trash2, Plus } from 'lucide-react'

interface Invoice {
  id: string
  invoice_number: string
  customer_name: string
  customer_mobile: string
  document_type: string
  total_amount: number
  paid_amount: number
  status: string
  created_at: string
}

export default function CustomerProfilePage() {
  const params = useParams()
  const mobile = params.mobile as string
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [customerName, setCustomerName] = useState('Loading...')

  useEffect(() => {
    fetchData()
  }, [mobile])

  const fetchData = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('customer_mobile', mobile)
      .order('created_at', { ascending: false })

    if (data && data.length > 0) {
      setInvoices(data)
      setCustomerName(data[0].customer_name)
    } else {
      setCustomerName('Unknown Customer')
    }
    setLoading(false)
  }

  const totalBusiness = invoices.reduce((acc, inv) => acc + Number(inv.total_amount), 0)
  const totalPaid = invoices.reduce((acc, inv) => acc + Number(inv.paid_amount), 0)
  const totalPending = totalBusiness - totalPaid

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/customers" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Client Profile</h1>
          <p className="text-sm text-gray-500">View complete history and generate new documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#eaeaea] shadow-sm md:col-span-1">
          <div className="w-16 h-16 bg-[#c8941a]/10 rounded-full flex items-center justify-center mb-4">
            <User size={32} className="text-[#c8941a]" />
          </div>
          <h2 className="text-xl font-bold text-[#111111] mb-1">{customerName}</h2>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <Phone size={14} /> +91 {mobile}
          </div>
          <Link 
            href={`/admin/bill-book/new?mobile=${mobile}&name=${encodeURIComponent(customerName)}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#111111] hover:bg-black text-white font-bold rounded-xl transition-all"
          >
            <Plus size={16} /> New Bill for Client
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#eaeaea] shadow-sm flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Business</p>
            <h3 className="text-3xl font-bold text-gray-900">₹{totalBusiness.toLocaleString('en-IN')}</h3>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Bakaya (Pending)</p>
            <h3 className="text-3xl font-bold text-red-600">₹{totalPending.toLocaleString('en-IN')}</h3>
            <p className="text-xs text-red-400 mt-1">Paid: ₹{totalPaid.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#eaeaea]">
          <h3 className="text-lg font-bold text-[#111111]">Document History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold">Date & Doc</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-right">Amount</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-right">Paid</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-right">Pending</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No history found.</td></tr>
              ) : (
                invoices.map(inv => {
                  const pending = inv.total_amount - inv.paid_amount
                  return (
                    <tr key={inv.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#111111]">{inv.invoice_number}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{new Date(inv.created_at).toLocaleDateString()}</span>
                          <span className="text-[9px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded uppercase">{inv.document_type || 'Invoice'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">₹{inv.total_amount.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 text-right text-green-600 font-medium">₹{inv.paid_amount.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${pending > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          ₹{pending.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/admin/bill-book/${inv.id}/edit`} className="p-2 text-gray-400 hover:text-[#c8941a] hover:bg-[#c8941a]/10 rounded-lg transition-colors">
                            <Edit size={16} />
                          </Link>
                          <Link href={`/admin/bill-book/${inv.id}/print`} target="_blank" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                            <FileText size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
