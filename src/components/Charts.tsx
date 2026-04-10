'use client'

import { formatCurrency, formatNumber } from '@/utils/format'
import { CHAIN_METADATA } from '@/config/chains'

const chainStats = [
  { chain: 'ethereum', tvl: 28500000000, protocols: 18, avgAPY: 6.2 },
  { chain: 'polygon', tvl: 4200000000, protocols: 12, avgAPY: 8.5 },
  { chain: 'arbitrum', tvl: 3200000000, protocols: 10, avgAPY: 9.8 },
  { chain: 'bsc', tvl: 2800000000, protocols: 9, avgAPY: 12.4 },
  { chain: 'avalanche', tvl: 1800000000, protocols: 8, avgAPY: 14.2 },
  { chain: 'optimism', tvl: 1200000000, protocols: 6, avgAPY: 11.5 },
  { chain: 'base', tvl: 650000000, protocols: 5, avgAPY: 18.2 },
]

const tvlHistory = [
  { date: '2024-01', tvl: 38000000000 },
  { date: '2024-02', tvl: 39500000000 },
  { date: '2024-03', tvl: 42000000000 },
  { date: '2024-04', tvl: 43500000000 },
  { date: '2024-05', tvl: 41000000000 },
  { date: '2024-06', tvl: 44000000000 },
  { date: '2024-07', tvl: 45200000000 },
]

export function TVLChart() {
  const maxTVL = Math.max(...tvlHistory.map((d) => d.tvl))
  const minTVL = Math.min(...tvlHistory.map((d) => d.tvl))

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-snow">Total Value Locked</h3>
          <p className="text-mist text-sm mt-1">Across all chains</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-display font-bold gradient-text">$45.2B</p>
          <p className="text-plasma text-sm font-medium">+3.2% this week</p>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between gap-2">
        {tvlHistory.map((data) => {
          const height = ((data.tvl - minTVL) / (maxTVL - minTVL)) * 100
          return (
            <div key={data.date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative" style={{ height: '160px' }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-plasma to-neon hover:from-plasma/80 hover:to-neon/80 transition-all duration-300 cursor-pointer group"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate rounded text-xs text-snow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatCurrency(data.tvl)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-mist">{data.date.split('-')[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ChainDistribution() {
  const totalTVL = chainStats.reduce((acc, chain) => acc + chain.tvl, 0)

  return (
    <div className="glass-card p-5 sm:p-6">
      <h3 className="font-display font-semibold text-snow mb-6">Chain Distribution</h3>
      
      <div className="space-y-4">
        {chainStats.map((chain) => {
          const metadata = CHAIN_METADATA[chain.chain as keyof typeof CHAIN_METADATA]
          const percentage = (chain.tvl / totalTVL) * 100

          return (
            <div key={chain.chain} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={metadata.logo}
                    alt={metadata.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-sm font-medium text-snow">{metadata.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-mist">{formatCurrency(chain.tvl)}</span>
                  <span className="text-sm font-medium text-plasma">{percentage.toFixed(1)}%</span>
                </div>
              </div>
              <div className="h-2 bg-slate/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-plasma to-neon rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function APYDistribution() {
  const categories = [
    { range: '0-5%', count: 12, color: 'bg-ash' },
    { range: '5-10%', count: 18, color: 'bg-plasma' },
    { range: '10-15%', count: 14, color: 'bg-neon' },
    { range: '15-20%', count: 8, color: 'bg-flux' },
    { range: '20%+', count: 6, color: 'bg-pulse' },
  ]

  const maxCount = Math.max(...categories.map((c) => c.count))

  return (
    <div className="glass-card p-5 sm:p-6">
      <h3 className="font-display font-semibold text-snow mb-6">APY Distribution</h3>
      
      <div className="space-y-3">
        {categories.map((cat) => {
          const width = (cat.count / maxCount) * 100
          return (
            <div key={cat.range} className="flex items-center gap-3">
              <span className="text-sm text-mist w-16">{cat.range}</span>
              <div className="flex-1 h-6 bg-slate/50 rounded-lg overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-lg transition-all duration-500 flex items-center justify-end pr-2`}
                  style={{ width: `${width}%` }}
                >
                  <span className="text-xs font-medium text-void">{cat.count}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
