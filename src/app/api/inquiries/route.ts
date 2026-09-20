import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name, mobile, whatsapp_number, email, city,
      product_name, category, quantity, custom_size,
      preferred_colour, material_requirement, message,
      inquiry_type, product_id,
    } = body

    if (!name || !mobile) {
      return NextResponse.json({ error: 'Name and mobile are required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name,
        mobile,
        whatsapp_number: whatsapp_number || null,
        email: email || null,
        city: city || null,
        product_id: product_id || null,
        product_name: product_name || null,
        category: category || null,
        quantity: quantity || null,
        custom_size: custom_size || null,
        preferred_colour: preferred_colour || null,
        material_requirement: material_requirement || null,
        message: message || null,
        inquiry_type: inquiry_type || 'general',
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Inquiry error:', error)
      return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true, inquiry: data })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
    return NextResponse.json({ inquiries: data || [] })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
