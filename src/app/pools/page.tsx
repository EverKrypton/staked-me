'use client'

import { Suspense, useState, useMemo } from 'react'
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProtocolCard } from '@/components/ProtocolCard'
import { PROTOCOLS } from '@/config/protocols'
import { CHAIN_METADATA } from '@/config/chains'
import { useAccount } from 'wagmi'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const poolTypes = ['All', 'Liquid Staking', 'LP Staking', 'Restaking', 'Lending']

function PoolsContent() {
  const { isConnected } = useAccount()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChain, setSelectedChain] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  const allProtocols = useMemo(() => Object.values(PROTOCOLS).flat(), [])

  const filteredProtocols = useMemo(() => {
    return allProtocols.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'All' || p.type === selectedType
      const chainKey = Object.entries(CHAIN_METADATA).find(([, v]) => v.chainId === p.chainId)?.[0] || ''
      const matchesChain = selectedChain === 'All' || chainKey.toLowerCase() === selectedChain.toLowerCase()
      return matchesSearch && matchesType && matchesChain
    })
  }, [allProtocols, searchQuery, selectedType, selectedChain])

  const chains = ['All', ...Object.keys(CHAIN_METADATA).map((k) => k.charAt(0).toUpperCase() + k.slice(1))]

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise">
      <Header />

      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
              <span className="gradient-text">Staking Pools</span>
            </h1>
            <p className="text-fog">Explore all staking opportunities across chains</p>
          </section>

          {!isConnected && (
            <div className="glass-card p-4 mb-6 flex items-center gap-3 border-boost/30">
              <AlertCircle className="w-5 h-5 text-boost" />
              <p className="text-fog text-sm">
                Connect your wallet to track your positions and receive personalized recommendations.
              </p>
            </div>
          )}

          <section className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc" />
                <input
                  type="text"
                  placeholder="Search protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {chains.slice(0, 5).map((chain) => (
                  <button
                    key={chain}
                    onClick={() => setSelectedChain(chain)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedChain === chain
                        ? 'bg-gradient-to-r from-stake to-yield text-void'
                        : 'bg-iron/30 text-fog hover:text-white'
                    }`}
                  >
                    {chain}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {poolTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedType === type
                      ? 'bg-stake/20 text-stake border border-stake/30'
                      : 'bg-iron/20 text-fog hover:text-white border border-transparent'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <p className="text-fog text-sm">
                Showing <span className="text-white font-medium">{filteredProtocols.length}</span> pools
              </p>
              <div className="flex items-center gap-2 text-fog text-sm">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Sorted by TVL</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProtocols.map((protocol, index) => (
                <ProtocolCard key={`${protocol.name}-${protocol.chainId}`} protocol={protocol} index={index} />
              ))}
            </div>
            {filteredProtocols.length === 0 && (
              <div className="text-center py-12">
                <p className="text-fog">No pools found matching your criteria</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function PoolsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PoolsContent />
    </Suspense>
  )
}
