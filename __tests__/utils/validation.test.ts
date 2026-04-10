import { checkoutSchema, productSchema } from '@/utils/validation'

describe('checkoutSchema', () => {
  it('should validate correct checkout data', () => {
    const result = checkoutSchema.safeParse({
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      paymentMethod: 'usdt-eth',
      email: 'test@example.com',
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid wallet address', () => {
    const result = checkoutSchema.safeParse({
      walletAddress: '0x123',
      paymentMethod: 'usdt-eth',
    })
    expect(result.success).toBe(false)
  })

  it('should reject missing payment method', () => {
    const result = checkoutSchema.safeParse({
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      paymentMethod: '',
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid email', () => {
    const result = checkoutSchema.safeParse({
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      paymentMethod: 'usdt-eth',
      email: 'invalid-email',
    })
    expect(result.success).toBe(false)
  })
})

describe('productSchema', () => {
  const validProduct = {
    id: 'test-1',
    name: 'Test Product',
    description: 'Test description',
    price: 100,
    priceUSD: 100,
    image: 'https://example.com/image.png',
    category: 'staking' as const,
    chain: 'ethereum',
    apy: 10,
    tvl: 1000000,
    token: 'TEST',
    protocol: 'TestProtocol',
    inStock: true,
    maxQuantity: 100,
  }

  it('should validate correct product data', () => {
    const result = productSchema.safeParse(validProduct)
    expect(result.success).toBe(true)
  })

  it('should reject negative price', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      price: -10,
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid category', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      category: 'invalid',
    })
    expect(result.success).toBe(false)
  })

  it('should reject APY above 1000%', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      apy: 1500,
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid image URL', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      image: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })
})
