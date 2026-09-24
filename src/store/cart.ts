import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number, custom_requirements?: string, variant_size?: string, variant_price?: number) => void
  removeItem: (productId: string, variant_size?: string) => void
  updateQuantity: (productId: string, quantity: number, variant_size?: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, custom_requirements, variant_size, variant_price) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.variant_size === variant_size
          )
          
          let modifiedProduct = { ...product };
          if (variant_size && variant_price) {
             modifiedProduct.price = variant_price;
          }

          if (existingIndex > -1) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += quantity
            return { items: newItems, isOpen: true }
          }
          return {
            items: [...state.items, { product: modifiedProduct, quantity, custom_requirements, variant_size }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId, variant_size) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.product.id === productId && item.variant_size === variant_size)),
        }))
      },

      updateQuantity: (productId, quantity, variant_size) => {
        if (quantity < 1) { get().removeItem(productId, variant_size); return }
        set((state) => ({
          items: state.items.map((item) =>
            (item.product.id === productId && item.variant_size === variant_size) ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => get().items.reduce((total, item) => {
        const price = item.product.price || 0
        return total + price * item.quantity
      }, 0),

      getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    { name: 'jas-interior-cart' }
  )
)
