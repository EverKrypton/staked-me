'use client'

import { Header } from '@/components/Header'
import { useAccount, useBalance } from 'wagmi'
import { Wallet, TrendingUp, Clock, ArrowUpRight, ExternalLink } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { CHAIN_METADATA } from '@/config/chains'

const mockPositions = [
  {
    protocol: 'Lido',
    chain: 'ethereum',
    token: 'stETH',
    amount: 5.42,
    value: 18234,
    apy: 3.2,
    rewards: 234,
  },
  {
    protocol: 'PancakeSwap',
    chain: 'bsc',
    token: 'CAKE-BNB LP',
    amount: 1250,
    value: 8450,
    apy: 15.2,
    rewards: 89,
  },
  {
    protocol: 'GMX',
    chain: 'arbitrum',
    token: 'GLP',
    amount: 3200,
    value: 12800,
    apy: 18.5,
    rewards: 456,
  },
]

const mockHistorical = [
  { date: '2024-01', value: 25000 },
  { date: '2024-02', value: 27500 },
  { date: '2024-03', value: 32000 },
  { date: '2024-04', value: 35000 },
  { date: '2024-05', value: 38000 },
  { date: '2024-06', value: 39484 },
]

export default function PortfolioPage() {
  const { address, isConnected } = useAccount()

  const totalValue = mockPositions.reduce((acc, p) => acc + p.value, 0)
  const totalRewards = mockPositions.reduce((acc, p) => acc + p.rewards, 0)
  const avgAPY = (
    mockPositions.reduce((acc, p) => acc + p.apy * p.value, 0) / totalValue
  ).toFixed(1)

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-dark-950 bg-grid-pattern bg-grid">
        <div className="fixed inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-dark-950 pointer-events-none" />
        <Header />
        <main className="relative pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-12 text-center">
              <div className="p-4 rounded-2xl bg-dark-800/50 w-fit mx-auto mb-6">
                <Wallet className="w-12 h-12 text-dark-400" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-dark-400 max-w-md mx-auto">
                Connect your wallet to view your staking positions and track your portfolio performance.
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950 bg-grid-pattern bg-grid">
      <div className="fixed inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-dark-950 pointer-events-none" />
      <Header />

      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Portfolio</h1>
            <p className="text-dark-400">Track your staking positions across all chains</p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="stat-card">
              <p className="text-dark-400 text-sm font-medium">Total Value</p>
              <p className="text-2xl font-display font-bold mt-1 text-white">{formatCurrency(totalValue)}</p>
              <p className="text-primary-500 text-sm mt-1">+$4,842 (12.3%)</p>
            </div>
            <div className="stat-card">
              <p className="text-dark-400 text-sm font-medium">Total Rewards</p>
              <p className="text-2xl font-display font-bold mt-1 text-primary-500">${totalRewards}</p>
              <p className="text-dark-400 text-sm mt-1">This month</p>
            </div>
            <div className="stat-card">
              <p className="text-dark-400 text-sm font-medium">Avg APY</p>
              <p className="text-2xl font-display font-bold mt-1 text-white">{avgAPY}%</p>
              <p className="text-dark-400 text-sm mt-1">Weighted average</p>
            </div>
            <div className="stat-card">
              <p className="text-dark-400 text-sm font-medium">Positions</p>
              <p className="text-2xl font-display font-bold mt-1 text-white">{mockPositions.length}</p>
              <p className="text-dark-400 text-sm mt-1">Across 3 chains</p>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-6">Portfolio Value</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {mockHistorical.map((data, index) => {
                  const maxValue = Math.max(...mockHistorical.map((d) => d.value))
                  const minValue = Math.min(...mockHistorical.map((d) => d.value))
                  const height = ((data.value - minValue) / (maxValue - minValue)) * 100

                  return (
                    <div key={data.date} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative" style={{ height: '160px' }}>
                        <div
                          className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-xs text-dark-500">{data.date.split('-')[1]}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-6">Allocation</h3>
              <div className="space-y-4">
                {mockPositions.map((position) => {
                  const percentage = (position.value / totalValue) * 100
                  return (
                    <div key={position.protocol} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{position.protocol}</span>
                        <span className="text-sm text-dark-400">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">Your Positions</h2>
            </div>

            <div className="space-y-3">
              {mockPositions.map((position) => {
                const chainMeta = CHAIN_METADATA[position.chain as keyof typeof CHAIN_METADATA]

                return (
                  <div
                    key={position.protocol}
                    className="glass-card p-5 hover:border-primary-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-dark-800/50">
                          <TrendingUp className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{position.protocol}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <img
                              src={chainMeta.logo}
                              alt={chainMeta.name}
                              className="w-4 h-4 rounded-full"
                            />
                            <span className="text-xs text-dark-400">{chainMeta.name}</span>
                            <span className="text-xs text-dark-500">•</span>
                            <span className="text-xs text-dark-400">{position.token}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-display font-bold text-white">{formatCurrency(position.value)}</p>
                        <p className="text-xs text-dark-400">{position.amount} {position.token}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-display font-bold text-primary-500">{position.apy}% APY</p>
                        <p className="text-xs text-dark-400">${position.rewards} rewards</p>
                      </div>

                      <a
                        href={chainMeta.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-dark-800/50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-dark-400" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
