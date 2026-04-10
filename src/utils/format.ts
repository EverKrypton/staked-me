export function formatNumber(num: number): string {
  if (!Number.isFinite(num)) return '0'
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toFixed(2)
}

export function formatCurrency(num: number): string {
  if (!Number.isFinite(num)) return '$0'
  
  if (num >= 1000000000) {
    return '$' + (num / 1000000000).toFixed(1) + 'B'
  }
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return '$' + (num / 1000).toFixed(1) + 'K'
  }
  return '$' + num.toFixed(2)
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatPercentage(num: number): string {
  if (!Number.isFinite(num)) return '0%'
  return num.toFixed(2) + '%'
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function formatTokenAmount(amount: number, decimals: number = 18): string {
  if (!Number.isFinite(amount)) return '0'
  return (amount / Math.pow(10, decimals)).toFixed(6)
}

export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  const num = parseFloat(amount)
  if (!Number.isFinite(num)) return BigInt(0)
  return BigInt(Math.floor(num * Math.pow(10, decimals)))
}
