export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceUSD: number
  image: string
  category: 'staking' | 'lp' | 'lending' | 'boost'
  chain: string
  apy: number
  tvl: number
  token: string
  protocol: string
  inStock: boolean
  maxQuantity: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  totalUSD: number
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  paymentMethod: 'usdt' | 'usdc' | 'eth' | 'matic' | 'bnb'
  paymentAddress: string
  transactionHash?: string
  createdAt: Date
  userId?: string
}

export interface PaymentMethod {
  id: string
  name: string
  symbol: string
  icon: string
  chainId: number
  contractAddress?: string
  decimals: number
}

export interface CheckoutFormData {
  walletAddress: string
  paymentMethod: string
  email?: string
}
