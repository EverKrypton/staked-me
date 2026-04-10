import { z } from 'zod'

export const checkoutSchema = z.object({
  walletAddress: z
    .string()
    .min(42, 'Wallet address must be 42 characters')
    .max(42, 'Wallet address must be 42 characters')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format'),
  
  paymentMethod: z
    .string()
    .min(1, 'Please select a payment method'),
  
  email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
})

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().max(1000),
  price: z.number().positive(),
  priceUSD: z.number().positive(),
  image: z.string().url(),
  category: z.enum(['staking', 'lp', 'lending', 'boost']),
  chain: z.string().min(1),
  apy: z.number().min(0).max(1000),
  tvl: z.number().nonnegative(),
  token: z.string().min(1),
  protocol: z.string().min(1),
  inStock: z.boolean(),
  maxQuantity: z.number().int().positive(),
})

export const orderSchema = z.object({
  items: z.array(z.object({
    product: productSchema,
    quantity: z.number().int().positive(),
  })).min(1, 'Cart cannot be empty'),
  
  total: z.number().positive(),
  totalUSD: z.number().positive(),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'cancelled']),
  paymentMethod: z.enum(['usdt', 'usdc', 'eth', 'matic', 'bnb']),
  paymentAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  transactionHash: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
export type ProductData = z.infer<typeof productSchema>
export type OrderData = z.infer<typeof orderSchema>
