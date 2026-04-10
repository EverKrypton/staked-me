export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatCurrency(num: number): string {
  if (num >= 1000000000) {
    return '$' + (num / 1000000000).toFixed(1) + 'B'
  }
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return '$' + (num / 1000).toFixed(1) + 'K'
  }
  return '$' + num.toString()
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatPercentage(num: number): string {
  return num.toFixed(2) + '%'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
