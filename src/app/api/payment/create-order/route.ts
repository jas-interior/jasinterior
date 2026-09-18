import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createRazorpayOrder } from '@/lib/razorpay'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customer, subtotal } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }
    if (!customer?.full_name || !customer?.mobile) {
      return NextResponse.json({ error: 'Customer details required' }, { status: 400 })
    }

    const orderNumber = generateOrderNumber()
    const totalAmount = subtotal || items.reduce((sum: number, item: any) => sum + item.unit_price * item.quantity, 0)

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(totalAmount, orderNumber)

    // Save draft order to DB
    const supabase = createAdminClient()
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customer.full_name,
        customer_mobile: customer.mobile,
        customer_whatsapp: customer.whatsapp_number || customer.mobile,
        customer_email: customer.email || null,
        shipping_address: customer.address,
        shipping_city: customer.city,
        shipping_state: customer.state || 'Gujarat',
        shipping_pincode: customer.pincode,
        special_instructions: customer.special_instructions || null,
        subtotal: totalAmount,
        delivery_charges: 0,
        delivery_note: 'Delivery charges will be confirmed separately based on your location.',
        total_amount: totalAmount,
        payment_status: 'pending',
        order_status: 'payment_pending',
        razorpay_order_id: razorpayOrder.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Order creation error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Save order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id || null,
      product_title: item.product_title,
      product_image: item.product_image || null,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
      custom_requirements: item.custom_requirements || null,
    }))

    await supabase.from('order_items').insert(orderItems)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error('Payment create-order error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
