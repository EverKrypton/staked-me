'use client'

import { Suspense } from 'react'
import { Wallet, ExternalLink, PieChart } from 'lucide-react'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { useAccount } from 'wagmi'
import { formatCurrency } from '@/utils/format'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
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
    logo: 'https://cryptologos.cc/logos/lido-dao-ldo-logo.png',
  },
  {
    protocol: 'PancakeSwap',
    chain: 'bsc',
    token: 'CAKE-BNB LP',
    amount: 1250,
    value: 8450,
    apy: 15.2,
    rewards: 89,
    logo: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
  },
  {
    protocol: 'GMX',
    chain: 'arbitrum',
    token: 'GLP',
    amount: 3200,
    value: 12800,
    apy: 18.5,
    rewards: 456,
    logo: 'https://cryptologos.cc/logos/gmx-gmx-logo.png',
  },
]

function PortfolioContent() {
  const { isConnected } = useAccount()

  const totalValue = mockPositions.reduce((acc, p) => acc + p.value, 0)
  const totalRewards = mockPositions.reduce((acc, p) => acc + p.rewards, 0)

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-void bg-grid bg-noise">
        <Header />
        <CartDrawer />
        <main className="pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate/30 flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-10 h-10 text-mist" />
            </div>
            <h2 className="text-2xl font-display font-bold text-snow mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-mist">
              Connect your wallet to view your staking positions and track your portfolio performance.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise">
      <Header />
      <CartDrawer />

      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-snow mb-2">
              <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-mist">Track your staking positions across all chains</p>
          </section>

          <section className="mb-8 sm:mb-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="glass-card p-4 sm:p-5 hover-lift">
                <p className="text-xs text-mist uppercase tracking-wide mb-1">Total Value</p>
                <p className="stat-value text-2xl sm:text-3xl gradient-text">{formatCurrency(totalValue)}</p>
                <p className="text-xs text-plasma mt-1">+$4,842 (12.3%)</p>
              </div>
              <div className="glass-card p-4 sm:p-5 hover-lift">
                <p className="text-xs text-mist uppercase tracking-wide mb-1">Total Rewards</p>
                <p className="stat-value text-2xl sm:text-3xl text-snow">${totalRewards}</p>
                <p className="text-xs text-mist mt-1">This month</p>
              </div>
              <div className="glass-card p-4 sm:p-5 hover-lift">
                <p className="text-xs text-mist uppercase tracking-wide mb-1">Avg APY</p>
                <p className="stat-value text-2xl sm:text-3xl text-snow">12.5%</p>
                <p className="text-xs text-mist mt-1">Weighted average</p>
              </div>
              <div className="glass-card p-4 sm:p-5 hover-lift">
                <p className="text-xs text-mist uppercase tracking-wide mb-1">Positions</p>
                <p className="stat-value text-2xl sm:text-3xl text-snow">{mockPositions.length}</p>
                <p className="text-xs text-mist mt-1">Across 3 chains</p>
              </div>
            </div>
          </section>

          <section className="mb-8 sm:mb-10">
            <div className="glass-card p-5 sm:p-6">
              <h3 className="font-display font-semibold text-snow mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-plasma" />
                Allocation
              </h3>
              <div className="space-y-4">
                {mockPositions.map((position) => {
                  const percentage = (position.value / totalValue) * 100
                  return (
                    <div key={position.protocol} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={position.logo} alt={position.protocol} className="w-5 h-5 rounded-full" />
                          <span className="text-sm font-medium text-snow">{position.protocol}</span>
                        </div>
                        <span className="text-sm text-mist">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-plasma to-neon rounded-full transition-all duration-1000"
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
            <h2 className="text-lg sm:text-xl font-display font-bold text-snow mb-4 sm:mb-6">Your Positions</h2>

            <div className="space-y-3 sm:space-y-4">
              {mockPositions.map((position, index) => {
                const chainMeta = CHAIN_METADATA[position.chain as keyof typeof CHAIN_METADATA]

                return (
                  <div
                    key={position.protocol}
                    className="glass-card p-4 sm:p-5 hover-lift animate-in"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1">
                        <img
                          src={position.logo}
                          alt={position.protocol}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate/30 p-1"
                        />
                        <div>
                          <h4 className="font-semibold text-snow">{position.protocol}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <img
                              src={chainMeta.logo}
                              alt={chainMeta.name}
                              className="w-4 h-4 rounded-full"
                            />
                            <span className="text-xs text-mist">{chainMeta.name}</span>
                            <span className="text-xs text-ash">•</span>
                            <span className="text-xs text-mist">{position.token}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-mist uppercase">Value</p>
                          <p className="stat-value text-lg sm:text-xl text-snow">{formatCurrency(position.value)}</p>
                          <p className="text-[10px] text-mist">{position.amount} {position.token}</p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs text-mist uppercase">APY</p>
                          <p className="stat-value text-lg sm:text-xl text-plasma">{position.apy}%</p>
                          <p className="text-[10px] text-mist">${position.rewards} rewards</p>
                        </div>

                        <a
                          href={chainMeta.explorer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-slate/30 transition-colors hidden sm:flex"
                          aria-label="View on explorer"
                        >
                          <ExternalLink className="w-4 h-4 text-mist" />
                        </a>
                      </div>
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

export default function PortfolioPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PortfolioContent />
    </Suspense>
  )
}
