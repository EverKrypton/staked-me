import { create } from 'zustand'
import type { Order, PaymentMethod } from '@/types'

interface OrderState {
  currentOrder: Order | null
  orders: Order[]
  isProcessing: boolean
  
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  setTransactionHash: (orderId: string, txHash: string) => void
  getCurrentOrder: () => Order | null
  clearCurrentOrder: () => void
  setProcessing: (value: boolean) => void
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'usdt-eth',
    name: 'Tether USD',
    symbol: 'USDT',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    chainId: 1,
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
  },
  {
    id: 'usdc-eth',
    name: 'USD Coin',
    symbol: 'USDC',
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    chainId: 1,
    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
  },
  {
    id: 'usdt-bsc',
    name: 'Tether USD (BSC)',
    symbol: 'USDT',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    chainId: 56,
    contractAddress: '0x55d398326f99059fF775485246999027B3197955',
    decimals: 18,
  },
  {
    id: 'usdc-polygon',
    name: 'USD Coin (Polygon)',
    symbol: 'USDC',
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    chainId: 137,
    contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    decimals: 6,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    chainId: 1,
    decimals: 18,
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    chainId: 137,
    decimals: 18,
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    chainId: 56,
    decimals: 18,
  },
]

export const useOrderStore = create<OrderState>()((set, get) => ({
  currentOrder: null,
  orders: [],
  isProcessing: false,

  createOrder: (orderData) => {
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    const order: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date(),
    }

    set((state) => ({
      orders: [...state.orders, order],
      currentOrder: order,
    }))

    return orderId
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
      currentOrder:
        state.currentOrder?.id === orderId
          ? { ...state.currentOrder, status }
          : state.currentOrder,
    }))
  },

  setTransactionHash: (orderId, txHash) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, transactionHash: txHash } : order
      ),
      currentOrder:
        state.currentOrder?.id === orderId
          ? { ...state.currentOrder, transactionHash: txHash }
          : state.currentOrder,
    }))
  },

  getCurrentOrder: () => get().currentOrder,

  clearCurrentOrder: () => set({ currentOrder: null }),

  setProcessing: (value) => set({ isProcessing: value }),
}))
