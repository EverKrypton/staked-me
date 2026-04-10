'use client'

import { Suspense } from 'react'
import { TrendingUp, Shield, Zap, Globe, ArrowRight, ExternalLink, Lock, BarChart3, Coins } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsGrid } from '@/components/StatsGrid'
import { ProtocolCard, TopProtocols } from '@/components/ProtocolCard'
import { CHAIN_METADATA } from '@/config/chains'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Yields',
    description: 'Live APY tracking across 50+ protocols with instant updates',
    color: 'stake',
  },
  {
    icon: Shield,
    title: 'Audited Protocols',
    description: 'Only verified and audited DeFi protocols listed',
    color: 'yield',
  },
  {
    icon: Zap,
    title: 'Instant Staking',
    description: 'Stake directly from your wallet in seconds',
    color: 'gain',
  },
  {
    icon: Globe,
    title: 'Multi-Chain',
    description: '7 chains unified in one dashboard',
    color: 'deep',
  },
]

const whyStaked = [
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'Your keys, your crypto. We never hold your funds.',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Analytics',
    description: 'Track performance, APR, and rewards in real-time.',
  },
  {
    icon: Coins,
    title: 'Best Rates',
    description: 'Compare yields across all major protocols instantly.',
  },
]

function HomeContent() {
  const chains = Object.values(CHAIN_METADATA)

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise overflow-hidden">
      <Header />
      
      <main className="pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="text-center mb-12 sm:mb-16 lg:mb-20 animate-in pb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stake/10 border border-stake/20 mb-6 sm:mb-8">
              <div className="pulse-dot"></div>
              <span className="text-xs sm:text-sm font-medium text-stake">
                Live on 7 chains • 50+ protocols • $45B+ TVL tracked
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1]">
              <span className="text-white">Track, Compare &</span>
              <br />
              <span className="gradient-text">Optimize Staking</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-fog max-w-2xl mx-auto mb-8 sm:mb-10">
              The multi-chain staking aggregator. Monitor positions, compare yields, and maximize rewards across Ethereum, Polygon, Arbitrum, and 4 more chains.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/pools" className="btn-primary w-full sm:w-auto">
                <span>Explore Pools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="btn-secondary w-full sm:w-auto">
                <span>View Portfolio</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <section className="mb-12 sm:mb-16 lg:mb-20">
            <StatsGrid />
          </section>

          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Top Staking Pools</h2>
                <p className="text-sm sm:text-base text-fog mt-1">Highest APY opportunities right now</p>
              </div>
              <Link href="/pools" className="hidden sm:flex items-center gap-1 text-sm font-medium text-stake hover:text-yield transition-colors">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">By TVL</h3>
                <TopProtocols />
              </div>
              <div className="glass-card p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Chain Distribution</h3>
                <div className="space-y-3">
                  {chains.slice(0, 5).map((chain, index) => {
                    const tvls = [28.5, 4.2, 3.2, 2.8, 1.8]
                    return (
                      <div key={chain.name} className="flex items-center gap-3">
                        <img src={chain.logo} alt={chain.name} className="w-6 h-6 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-white">{chain.name}</span>
                            <span className="text-sm text-stake">${tvls[index]}B</span>
                          </div>
                          <div className="h-1.5 bg-iron/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-stake to-yield rounded-full"
                              style={{ width: `${(tvls[index] / 28.5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="glass-card p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                    Multi-Chain <span className="gradient-text">Infrastructure</span>
                  </h2>
                  <p className="text-fog text-base sm:text-lg mb-6">
                    Access the best yields across all major EVM chains. One wallet, unlimited opportunities.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {chains.map((chain) => (
                      <Link 
                        key={chain.name} 
                        href={`/pools?chain=${chain.name.toLowerCase()}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-iron/30 border border-steel/30 hover:border-stake/30 transition-colors"
                      >
                        <img src={chain.logo} alt={chain.name} className="w-5 h-5 rounded-full" />
                        <span className="text-xs sm:text-sm font-medium text-white">{chain.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className="glass-card p-4 sm:p-5 hover-lift animate-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-${feature.color}/20 flex items-center justify-center mb-3`}>
                        <feature.icon className={`w-5 h-5 text-${feature.color}`} />
                      </div>
                      <h3 className="font-semibold text-white text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-fog mt-1">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 text-center">Why Staked.me?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {whyStaked.map((item, index) => (
                <div key={item.title} className="glass-card p-6 text-center hover-lift animate-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stake to-yield flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-void" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-fog">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6 sm:p-8 lg:p-12 text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
              Ready to optimize your staking?
            </h2>
            <p className="text-fog text-base sm:text-lg mb-6 max-w-lg mx-auto">
              Connect your wallet and start tracking your DeFi positions across all chains.
            </p>
            <Link href="/pools" className="btn-primary inline-flex">
              Start Staking
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  )
}
