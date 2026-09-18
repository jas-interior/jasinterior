import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // Verify signature
    const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValid) {
      // Mark payment as failed
      const supabase = createAdminClient()
      if (order_id) {
        await supabase
          .from('orders')
          .update({ payment_status: 'failed', order_status: 'cancelled' })
          .eq('id', order_id)
      }
      return NextResponse.json({ success: false, error: 'Payment verification failed' }, { status: 400 })
    }

    // Update order to paid
    const supabase = createAdminClient()
    const { data: order, error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        order_status: 'confirmed',
        razorpay_payment_id,
        razorpay_signature,
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select()
      .single()

    if (error) {
      console.error('Order update error:', error)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({ success: true, order })
  } catch (err) {
    console.error('Payment verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
