import Razorpay from 'razorpay'
import crypto from 'crypto'

export function getRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const body = orderId + '|' + paymentId
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')
  return expectedSignature === signature
}

export async function createRazorpayOrder(amountINR: number, receiptId: string) {
  const razorpay = getRazorpayInstance()
  return razorpay.orders.create({
    amount: Math.round(amountINR * 100),
    currency: 'INR',
    receipt: receiptId,
    notes: { company: 'JAS INTERIOR' },
  })
}
