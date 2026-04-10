import { defineStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  getTotalItems: () => number
  getTotalPrice: () => number
  getTotalPriceUSD: () => number
}

export const useCartStore = defineStore<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find((item) => item.product.id === product.id)

        if (existingItem) {
          const newQuantity = Math.min(
            existingItem.quantity + quantity,
            product.maxQuantity
          )
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          })
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        const items = get().items
        const item = items.find((i) => i.product.id === productId)

        if (!item) return

        const newQuantity = Math.max(0, Math.min(quantity, item.product.maxQuantity))

        if (newQuantity === 0) {
          get().removeItem(productId)
        } else {
          set({
            items: items.map((i) =>
              i.product.id === productId ? { ...i, quantity: newQuantity } : i
            ),
          })
        }
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getTotalPriceUSD: () => {
        return get().items.reduce(
          (total, item) => total + item.product.priceUSD * item.quantity,
          0
        )
      },
    }),
    {
      name: 'staked-me-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
