import { z } from 'zod'

const indianMobile = z.string().min(10).regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number')

export const checkoutSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  mobile: indianMobile,
  whatsapp_number: indianMobile.optional().or(z.literal('')),
  email: z.string().email('Enter valid email').optional().or(z.literal('')),
  address: z.string().min(5, 'Full address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  special_instructions: z.string().optional(),
})

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  mobile: indianMobile,
  whatsapp_number: indianMobile.optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().optional(),
  product_name: z.string().optional(),
  category: z.string().optional(),
  quantity: z.coerce.number().min(1).optional(),
  custom_size: z.string().optional(),
  preferred_colour: z.string().optional(),
  material_requirement: z.string().optional(),
  message: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
export type InquiryFormData = z.infer<typeof inquirySchema>
