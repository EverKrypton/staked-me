'use client'

import { Suspense } from 'react'
import { Wallet, TrendingUp } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAccount } from 'wagmi'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

function PortfolioContent() {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-void bg-grid bg-noise">
        <Header />
        <main className="pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-iron/30 flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-10 h-10 text-fog" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-fog">
              Connect your wallet to view your staking positions and track your portfolio performance.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise">
      <Header />

      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
              <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-fog">Track your staking positions across all chains</p>
          </section>

          <section className="mb-8 sm:mb-10">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-iron/30 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-fog" />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">No Positions Yet</h2>
              <p className="text-fog text-sm mb-4">
                You don't have any staking positions. Start exploring pools to earn yields.
              </p>
              <a href="/pools" className="btn-primary inline-flex">
                Explore Pools
              </a>
            </div>
          </section>

          <section className="mb-8 sm:mb-10">
            <div className="glass-card p-5 sm:p-6">
              <h3 className="font-display font-semibold text-white mb-4">Wallet Info</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-iron/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stake to-yield flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-void" />
                </div>
                <div>
                  <p className="text-xs text-fog">Address</p>
                  <p className="text-sm font-mono text-white">{address?.slice(0, 10)}...{address?.slice(-8)}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
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
