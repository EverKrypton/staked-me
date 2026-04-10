import { sanitizeInput, escapeHtml, validateWalletAddress, generateOrderId } from '@/utils/security'

describe('sanitizeInput', () => {
  it('should remove HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
  })

  it('should remove javascript: protocol', () => {
    expect(sanitizeInput('javascript:void(0)')).toBe('void(0)')
  })

  it('should remove event handlers', () => {
    expect(sanitizeInput('onclick=alert(1)')).toBe('alert(1)')
  })

  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world')
  })
})

describe('escapeHtml', () => {
  it('should escape HTML special characters', () => {
    expect(escapeHtml('<div>Hello & Goodbye</div>')).toBe('&lt;div&gt;Hello &amp; Goodbye&lt;/div&gt;')
  })

  it('should escape quotes', () => {
    expect(escapeHtml('"test"')).toBe('&quot;test&quot;')
    expect(escapeHtml("'test'")).toBe('&#39;test&#39;')
  })
})

describe('validateWalletAddress', () => {
  it('should validate correct Ethereum addresses', () => {
    expect(validateWalletAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe(true)
    expect(validateWalletAddress('0xABCDEFabcdef1234567890123456789012345678')).toBe(true)
  })

  it('should reject invalid addresses', () => {
    expect(validateWalletAddress('0x123')).toBe(false)
    expect(validateWalletAddress('1234567890abcdef1234567890abcdef12345678')).toBe(false)
    expect(validateWalletAddress('0xGGGG567890abcdef1234567890abcdef12345678')).toBe(false)
  })
})

describe('generateOrderId', () => {
  it('should generate unique order IDs', () => {
    const id1 = generateOrderId()
    const id2 = generateOrderId()
    expect(id1).not.toBe(id2)
  })

  it('should start with order_', () => {
    const id = generateOrderId()
    expect(id.startsWith('order_')).toBe(true)
  })
})
