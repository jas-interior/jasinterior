import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `JAS-${timestamp}-${random}`
}

export function getWhatsAppLink(phone: string, message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}

export function getOrderWhatsAppMessage(order: {
  order_number: string
  customer_name: string
  product_title?: string
  total_amount: number
  payment_status: string
}): string {
  return `*JAS INTERIOR - ORDER CONFIRMATION*\n\nOrder ID: ${order.order_number}\nCustomer: ${order.customer_name}\nProduct: ${order.product_title || 'Multiple Items'}\nAmount: ₹${order.total_amount.toLocaleString('en-IN')}\nPayment: ${order.payment_status.toUpperCase()}\n\nThank you for choosing JAS INTERIOR!`
}

export function getProductInquiryMessage(productName: string): string {
  return `Hello JAS INTERIOR, I am interested in *${productName}*. I would like to know more about customization options and pricing. Please get in touch with me.`
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const SUPPORT_PHONE = '8866531993'
export const WHATSAPP_NUMBER = '918866531993'
