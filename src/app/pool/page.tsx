'use client'

import { Suspense } from 'react'
import { AlertCircle } from 'lucide-react'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ProtocolFilters } from '@/components/ProtocolFilters'
import { ProtocolCard } from '@/components/ProtocolCard'
import { PROTOCOLS } from '@/config/protocols'
import { useAccount } from 'wagmi'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

function PoolContent() {
  const { isConnected } = useAccount()
  const allProtocols = Object.values(PROTOCOLS).flat()

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise">
      <Header />
      <CartDrawer />

      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-snow mb-2">
              <span className="gradient-text">Liquidity Pools</span>
            </h1>
            <p className="text-mist">Explore LP staking opportunities with the highest yields</p>
          </section>

          {!isConnected && (
            <div className="glass-card p-4 mb-6 flex items-center gap-3 border-ember/30">
              <AlertCircle className="w-5 h-5 text-ember" />
              <p className="text-mist text-sm">
                Connect your wallet to track your LP positions and calculate impermanent loss.
              </p>
            </div>
          )}

          <section className="mb-8">
            <ProtocolFilters />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <p className="text-mist text-sm">
                Showing <span className="text-snow font-medium">{allProtocols.length}</span> pools
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

export default function PoolPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PoolContent />
    </Suspense>
  )
}
