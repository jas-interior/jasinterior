'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Printer, ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'

export default function PrintBillPage() {
  const params = useParams()
  const router = useRouter()
  const [invoice, setInvoice] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInvoice = async () => {
      const supabase = createClient()
      
      const { data: inv, error: invErr } = await supabase.from('invoices').select('*').eq('id', params.id).single()
      if (invErr) {
        console.error(invErr)
        setLoading(false)
        return
      }
      setInvoice(inv)

      const { data: itm } = await supabase.from('invoice_items').select('*').eq('invoice_id', params.id).order('created_at', { ascending: true })
      if (itm) setItems(itm)

      const { data: pay } = await supabase.from('invoice_payments').select('*').eq('invoice_id', params.id).order('created_at', { ascending: true })
      if (pay) setPayments(pay)

      setLoading(false)
    }
    loadInvoice()
  }, [params.id])

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading beautiful bill...</div>
  if (!invoice) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Invoice not found.</div>

  const pendingAmount = invoice.total_amount - invoice.paid_amount;
  const whatsappMessage = `Hello ${invoice.customer_name},\n\nHere is your invoice ${invoice.invoice_number} from JAS INTERIOR.\n\nTotal Amount: ₹${invoice.total_amount.toLocaleString('en-IN')}\nAdvance Paid: ₹${invoice.paid_amount.toLocaleString('en-IN')}\nBalance Due: ₹${pendingAmount.toLocaleString('en-IN')}\n\nYou can view and download your detailed bill here: https://jasinterior.store/admin/bill-book/${invoice.id}/print\n\nThank you for choosing JAS INTERIOR!`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:py-0 print:bg-white text-black font-sans">
      
      {/* Non-printable action bar */}
      <div className="max-w-4xl mx-auto mb-6 px-4 print:hidden flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex gap-3">
          <a 
            href={`https://wa.me/91${invoice.customer_mobile}?text=${encodeURIComponent(whatsappMessage)}`} 
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all shadow-md shadow-[#25D366]/20"
          >
            <Send size={18} /> Send via WhatsApp
          </a>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-md"
          >
            <Printer size={18} /> Print Bill
          </button>
        </div>
      </div>

      {/* A4 Printable Area */}
      <div className="w-full max-w-[794px] min-h-[1123px] mx-auto bg-white shadow-2xl print:shadow-none print:max-w-full print:min-h-0 overflow-hidden relative mb-12">
        
        {/* Header - Golden Accent */}
        <div className="h-3 w-full bg-gradient-to-r from-[#c8941a] via-[#e9a825] to-[#c8941a]"></div>
        
        <div className="p-10 print:p-8">
          
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="font-serif text-4xl font-bold text-[#111111] mb-1">JAS INTERIOR</h1>
              <p className="text-gray-500 font-medium text-sm tracking-widest uppercase">Premium Custom Furniture</p>
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>Shop No. 1, Maa Complex, Near Uma Char Rasta,</p>
                <p>Waghodiya Road, Vadodara, Gujarat</p>
                <p className="font-medium text-black mt-2">Ph: +91 88665 31993</p>
              </div>
            </div>
            
            <div className="text-right">
              <h2 className="text-3xl font-light text-gray-400 mb-4 uppercase tracking-widest">Invoice</h2>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block text-left min-w-[200px]">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Bill No:</span>
                  <span className="text-sm font-bold text-black">{invoice.invoice_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">Date:</span>
                  <span className="text-sm font-medium text-black">{new Date(invoice.issue_date || invoice.created_at).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-xs font-bold text-[#c8941a] uppercase tracking-widest border-b-2 border-[#c8941a]/20 pb-2 mb-3 inline-block">Billed To</h3>
              <p className="text-xl font-bold text-gray-900 mb-1">{invoice.customer_name}</p>
              <p className="text-gray-600 mb-1 font-medium">+91 {invoice.customer_mobile}</p>
              {invoice.customer_address && (
                <p className="text-gray-500 text-sm max-w-[250px] leading-relaxed mt-2">{invoice.customer_address}</p>
              )}
            </div>
            {/* Status Stamp */}
            <div className="flex justify-end items-center">
              {pendingAmount === 0 ? (
                <div className="border-4 border-green-600 text-green-600 px-6 py-2 rounded-xl text-3xl font-black uppercase tracking-widest transform rotate-[-10deg] opacity-80">PAID</div>
              ) : invoice.paid_amount > 0 ? (
                <div className="border-4 border-[#c8941a] text-[#c8941a] px-6 py-2 rounded-xl text-2xl font-black uppercase tracking-widest transform rotate-[-5deg] opacity-80">PARTIAL PAYMENT</div>
              ) : (
                <div className="border-4 border-red-500 text-red-500 px-6 py-2 rounded-xl text-3xl font-black uppercase tracking-widest transform rotate-[-10deg] opacity-80">UNPAID</div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-widest w-12 text-center">#</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-widest text-center w-24">Qty</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-widest text-right w-32">Rate</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-widest text-right w-32">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4 text-center text-gray-400 align-top">{index + 1}</td>
                    <td className="py-4 align-top">
                      <div className="font-semibold text-gray-900">{item.description}</div>
                      {item.warranty && (
                        <div className="text-xs text-gray-500 mt-1 font-medium bg-gray-50 inline-block px-2 py-0.5 rounded">
                          <span className="font-bold text-[#c8941a]">WARRANTY:</span> {item.warranty}
                        </div>
                      )}
                    </td>
                    <td className="py-4 text-center font-medium text-gray-700 align-top">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-600 align-top">₹{item.unit_price.toLocaleString('en-IN')}</td>
                    <td className="py-4 text-right font-bold text-black align-top">₹{item.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-12">
            <div className="w-80">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-semibold text-gray-800">₹{invoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between py-2 text-sm border-t border-gray-100">
                  <span className="text-gray-500 font-medium">Discount</span>
                  <span className="font-semibold text-red-500">- ₹{invoice.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between py-4 border-t-2 border-black mt-2">
                <span className="text-lg font-bold text-black uppercase tracking-wider">Grand Total</span>
                <span className="text-xl font-bold text-[#c8941a]">₹{invoice.total_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Payments & Terms Grid */}
          <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t border-gray-100">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Terms & Conditions</h3>
              <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap font-medium">
                {invoice.terms}
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-xs font-bold text-[#c8941a] uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Payment Summary</h3>
              <div className="space-y-3">
                {payments.map(pay => (
                  <div key={pay.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{pay.payment_mode} <span className="text-xs text-gray-400 ml-1">({new Date(pay.payment_date || pay.created_at).toLocaleDateString('en-IN')})</span></span>
                    <span className="font-semibold text-green-600">₹{pay.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                
                <div className="pt-3 mt-3 border-t-2 border-gray-200 flex justify-between">
                  <span className="text-sm font-bold text-black uppercase tracking-wider">Balance Due</span>
                  <span className={`text-lg font-bold ${pendingAmount > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    ₹{pendingAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-gray-400 text-xs font-medium">
            This is a computer generated invoice and requires no signature.
          </div>
        </div>
      </div>

    </div>
  )
}
