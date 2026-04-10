import { formatNumber, formatCurrency, formatAddress, formatPercentage } from '@/utils/format'

describe('formatNumber', () => {
  it('should format billions correctly', () => {
    expect(formatNumber(1500000000)).toBe('1.5B')
    expect(formatNumber(28000000000)).toBe('28.0B')
  })

  it('should format millions correctly', () => {
    expect(formatNumber(1500000)).toBe('1.5M')
    expect(formatNumber(2840000)).toBe('2.8M')
  })

  it('should format thousands correctly', () => {
    expect(formatNumber(1500)).toBe('1.5K')
    expect(formatNumber(28400)).toBe('28.4K')
  })

  it('should handle small numbers', () => {
    expect(formatNumber(500)).toBe('500.00')
    expect(formatNumber(100)).toBe('100.00')
  })

  it('should handle non-finite numbers', () => {
    expect(formatNumber(Infinity)).toBe('0')
    expect(formatNumber(NaN)).toBe('0')
  })
})

describe('formatCurrency', () => {
  it('should format billions with dollar sign', () => {
    expect(formatCurrency(1500000000)).toBe('$1.5B')
    expect(formatCurrency(28000000000)).toBe('$28.0B')
  })

  it('should format millions with dollar sign', () => {
    expect(formatCurrency(1500000)).toBe('$1.5M')
    expect(formatCurrency(2840000)).toBe('$2.8M')
  })

  it('should format thousands with dollar sign', () => {
    expect(formatCurrency(1500)).toBe('$1.5K')
    expect(formatCurrency(28400)).toBe('$28.4K')
  })

  it('should handle small amounts', () => {
    expect(formatCurrency(500)).toBe('$500.00')
    expect(formatCurrency(100)).toBe('$100.00')
  })

  it('should handle non-finite numbers', () => {
    expect(formatCurrency(Infinity)).toBe('$0')
    expect(formatCurrency(NaN)).toBe('$0')
  })
})

describe('formatAddress', () => {
  it('should truncate long addresses', () => {
    expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234...5678')
  })

  it('should handle short addresses', () => {
    expect(formatAddress('0x123')).toBe('0x123')
    expect(formatAddress('')).toBe('')
  })
})

describe('formatPercentage', () => {
  it('should format percentages correctly', () => {
    expect(formatPercentage(3.5)).toBe('3.50%')
    expect(formatPercentage(15.123)).toBe('15.12%')
  })

  it('should handle non-finite numbers', () => {
    expect(formatPercentage(Infinity)).toBe('0%')
    expect(formatPercentage(NaN)).toBe('0%')
  })
})
