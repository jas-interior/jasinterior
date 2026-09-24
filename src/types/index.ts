// JAS INTERIOR - All TypeScript Types

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description?: string
  short_description?: string
  category_id?: string
  category?: Category
  price?: number | null
  price_enabled: boolean
  variants?: { size: string, price: number }[]
  images: string[]
  featured: boolean
  active: boolean
  sort_order: number
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  full_name: string
  mobile: string
  whatsapp_number?: string
  email?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  product?: Product
  product_title: string
  product_image?: string
  quantity: number
  unit_price: number
  total_price: number
  custom_requirements?: string
  created_at: string
}

export type OrderStatus =
  | 'pending'
  | 'payment_pending'
  | 'paid'
  | 'confirmed'
  | 'in_production'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export interface Order {
  id: string
  order_number: string
  customer_id?: string
  customer?: Customer
  customer_name: string
  customer_mobile: string
  customer_whatsapp?: string
  customer_email?: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_pincode: string
  special_instructions?: string
  subtotal: number
  delivery_charges: number
  delivery_note?: string
  total_amount: number
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  order_status: OrderStatus
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  notes?: string
  items?: OrderItem[]
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  name: string
  mobile: string
  whatsapp_number?: string
  email?: string
  city?: string
  product_id?: string
  product?: Product
  product_name?: string
  category?: string
  quantity?: number
  custom_size?: string
  preferred_colour?: string
  material_requirement?: string
  message?: string
  inquiry_type: 'general' | 'product' | 'custom' | 'quote'
  status: 'new' | 'contacted' | 'in_discussion' | 'converted' | 'closed'
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  short_description?: string
  content?: string
  featured_image?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value?: string
  updated_at: string
}

export type SiteSettings = Record<string, string | undefined>

export interface CartItem {
  product: Product
  quantity: number
  custom_requirements?: string
  variant_size?: string
}

export interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill: { name: string; email?: string; contact: string }
  theme: { color: string }
  modal: { ondismiss: () => void }
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void }
  }
}
