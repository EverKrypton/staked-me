'use client'

import { Header } from '@/components/Header'
import { ProtocolFilters } from '@/components/ProtocolFilters'
import { ProtocolCard } from '@/components/ProtocolCard'
import { PROTOCOLS } from '@/config/protocols'
import { useAccount } from 'wagmi'
import { AlertCircle, Wallet } from 'lucide-react'

export default function PoolPage() {
  const { isConnected } = useAccount()
  const allProtocols = Object.values(PROTOCOLS).flat()

  return (
    <div className="min-h-screen bg-dark-950 bg-grid-pattern bg-grid">
      <div className="fixed inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-dark-950 pointer-events-none" />
      
      <Header />

      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Liquidity Pools</h1>
            <p className="text-dark-400">Explore LP staking opportunities with the highest yields</p>
          </section>

          {!isConnected && (
            <div className="glass-card p-4 mb-6 flex items-center gap-3 border-accent-orange/30">
              <AlertCircle className="w-5 h-5 text-accent-orange" />
              <p className="text-dark-300 text-sm">
                Connect your wallet to track your LP positions and calculate impermanent loss.
              </p>
            </div>
          )}

          <section className="mb-8">
            <ProtocolFilters />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-400 text-sm">
                Showing <span className="text-white font-medium">{allProtocols.length}</span> pools
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProtocols
                .filter((p) => p.type === 'LP Staking')
                .map((protocol, index) => (
                  <ProtocolCard key={`${protocol.name}-${protocol.chainId}`} protocol={protocol} index={index} />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
