'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function PaymentReceiptPrint() {
  const params = useSearchParams()
  const amount = Number(params.get('amount') || 0)
  const mode = params.get('mode') || 'Cash'
  const ref = params.get('ref') || ''
  const order_num = params.get('order_num') || ''
  const client_name = params.get('client_name') || ''
  const order_amount = Number(params.get('order_amount') || 0)
  const paid_total = Number(params.get('paid_total') || amount)
  const balance = order_amount - paid_total
  const today = new Date().toLocaleDateString('en-IN')
  const receiptNum = `JAS-RCP-${Date.now().toString(36).toUpperCase().slice(-6)}`

  return (
    <>
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; }
        }
        body { background: #f3f4f6; font-family: 'Arial', sans-serif; }
      `}</style>

      {/* Action Bar */}
      <div className="no-print fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 z-50 shadow-sm">
        <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
          ← Back
        </button>
        <button onClick={() => window.print()} className="px-6 py-2 bg-[#111111] hover:bg-black text-white rounded-lg text-sm font-bold flex items-center gap-2">
          🖨️ Print / Download PDF
        </button>
      </div>

      <div className="flex justify-center pt-20 pb-10 no-print-padding">
        <div
          className="print-area bg-white"
          style={{ width: '800px', minHeight: '600px', boxShadow: '0 4px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}
        >
          {/* Header */}
          <div className="relative h-32 bg-[#1e293b] flex items-center justify-between px-10 shrink-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[55%] h-full bg-[#c8941a] skew-x-[-30deg] origin-bottom translate-x-12" />
            <div className="relative z-10">
              <h1 className="text-3xl font-black text-white tracking-widest">JAS INTERIOR</h1>
              <p className="text-[10px] text-[#c8941a] tracking-[0.25em] uppercase mt-1">Premium Custom Furniture</p>
            </div>
            <div className="relative z-10 text-right">
              <h2 className="text-4xl font-bold text-[#1e293b] tracking-widest uppercase">RECEIPT</h2>
              <p className="text-xs font-semibold tracking-wider text-[#1e293b] uppercase mt-1">NO : {receiptNum}</p>
              <p className="text-xs font-semibold tracking-wider text-[#1e293b] uppercase">DATE : {today}</p>
            </div>
          </div>

          {/* Billing Info */}
          <div className="flex justify-between px-10 py-8 shrink-0">
            <div className="w-[45%]">
              <h3 className="bg-[#1e293b] text-white inline-block px-3 py-1 text-xs font-bold mb-3 tracking-wider uppercase">Received By :</h3>
              <p className="font-bold text-lg text-gray-900 mb-1">JAS INTERIOR</p>
              <p className="text-sm text-gray-600">Shop No. 1, Maa Complex</p>
              <p className="text-sm text-gray-600">Near Uma Char Rasta, Waghodiya Road</p>
              <p className="text-sm text-gray-600">Vadodara, Gujarat</p>
              <p className="text-sm font-bold text-gray-800 mt-1">Ph: +91 88665 31993</p>
            </div>
            <div className="w-[45%] text-right">
              <h3 className="bg-[#1e293b] text-white inline-block px-3 py-1 text-xs font-bold mb-3 tracking-wider uppercase">Received From :</h3>
              <p className="font-bold text-lg text-gray-900 mb-1">{client_name}</p>
              {order_num && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Against Order</p>
                  <p className="text-sm font-bold text-[#c8941a]">{order_num}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Details Box */}
          <div className="px-10 pb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Payment Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Value</span>
                  <span className="font-bold text-gray-900">₹{order_amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-700">Amount Received Now</span>
                  <span className="text-xl font-black text-green-600">₹{amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Mode</span>
                  <span className="font-bold text-gray-900">{mode}</span>
                </div>
                {ref && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Payment Ref. No.</span>
                    <span className="font-bold text-gray-900">{ref}</span>
                  </div>
                )}
                {!ref && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Payment Ref. No.</span>
                    <span className="text-gray-400 border-b border-gray-300 w-48 inline-block text-right">&nbsp;</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Total Paid Till Now</span>
                  <span className="font-bold text-gray-900">₹{paid_total.toLocaleString('en-IN')}</span>
                </div>
                <div className={`flex justify-between items-center px-4 py-3 rounded-lg ${balance > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                  <span className={`font-bold text-sm ${balance > 0 ? 'text-red-700' : 'text-green-700'}`}>
                    {balance > 0 ? 'Balance Due' : '✓ Fully Paid'}
                  </span>
                  <span className={`font-black text-lg ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {balance > 0 ? `₹${balance.toLocaleString('en-IN')}` : 'PAID'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 pb-4 mt-auto">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-gray-700">Thank you for your payment!</p>
                <p className="text-xs text-gray-400 mt-1">This is a computer generated receipt.</p>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-[#1e293b] pt-2 min-w-[180px]">
                  <p className="text-xs font-bold text-[#1e293b] uppercase tracking-wider">Authorized Signatory</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-3">
              <p className="text-[9px] text-gray-400 leading-snug">
                1. Amount received will be adjusted against order value. 2. Balance payment as per agreed terms. 3. Receipt confirms payment only, not delivery/completion.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="h-10 bg-[#c8941a] relative overflow-hidden shrink-0 w-full">
            <div className="absolute top-0 bottom-0 left-0 w-[45%] bg-[#1e293b] skew-x-[30deg] origin-bottom -translate-x-12" />
          </div>
        </div>
      </div>
    </>
  )
}

export default function PaymentReceiptPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <PaymentReceiptPrint />
    </Suspense>
  )
}
