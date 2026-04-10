'use client'

import { Header } from '@/components/Header'
import { StatsOverview } from '@/components/StatsOverview'
import { ProtocolList, TopProtocols, HighYieldProtocols } from '@/components/ProtocolCard'
import { TVLChart, ChainDistribution, APYDistribution } from '@/components/Charts'
import { ProtocolFilters } from '@/components/ProtocolFilters'
import { useAccount } from 'wagmi'
import { Wallet, TrendingUp, Shield, Zap, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time APY Tracking',
    description: 'Monitor yields across 50+ protocols with live data updates every minute.',
  },
  {
    icon: Wallet,
    title: 'Portfolio Dashboard',
    description: 'Track all your staked positions across chains in one unified interface.',
  },
  {
    icon: Shield,
    title: 'Risk Analysis',
    description: 'Comprehensive risk scores and audits for every supported protocol.',
  },
  {
    icon: Zap,
    title: 'Gas Optimization',
    description: 'Smart routing finds the cheapest way to stake across all chains.',
  },
]

const supportedProtocols = [
  { name: 'Lido', logo: 'https://cryptologos.cc/logos/lido-dao-ldo-logo.png' },
  { name: 'Uniswap', logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png' },
  { name: 'PancakeSwap', logo: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png' },
  { name: 'Aave', logo: 'https://cryptologos.cc/logos/aave-aave-logo.png' },
  { name: 'GMX', logo: 'https://cryptologos.cc/logos/gmx-gmx-logo.png' },
  { name: 'Rocket Pool', logo: 'https://cryptologos.cc/logos/rocket-pool-rpl-logo.png' },
  { name: 'EigenLayer', logo: 'https://avatars.githubusercontent.com/u/111273511' },
  { name: 'Velodrome', logo: 'https://cryptologos.cc/logos/velodrome-finance-velo-logo.png' },
]

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-dark-950 bg-grid-pattern bg-grid">
      <div className="fixed inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-dark-950 pointer-events-none" />
      
      <Header />

      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Live on 7 chains • 50+ protocols
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-white">Find the best</span>
              <br />
              <span className="gradient-text">staking yields</span>
            </h1>
            
            <p className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Track, compare, and optimize your staking positions across Ethereum, Polygon, Arbitrum, BNB Chain, and more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/stake" className="btn-primary flex items-center gap-2">
                Start Staking
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="btn-secondary flex items-center gap-2">
                View Portfolio
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <StatsOverview />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <TVLChart />
            </div>
            <div>
              <ChainDistribution />
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Top Protocols by TVL</h2>
                <p className="text-dark-400 mt-1">Highest total value locked</p>
              </div>
              <Link href="/pool" className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center gap-1">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <TopProtocols />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">Highest APY</h2>
                  <p className="text-dark-400 text-sm mt-1">Top yielding opportunities</p>
                </div>
                <Link href="/stake" className="text-primary-500 hover:text-primary-400 text-sm font-medium">
                  View all
                </Link>
              </div>
              <HighYieldProtocols />
            </div>
            <div>
              <APYDistribution />
            </div>
          </section>

          <section className="mb-16">
            <div className="glass-card p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Supported Protocols
              </h2>
              <p className="text-dark-400 mb-8 max-w-xl mx-auto">
                We aggregate data from the most trusted DeFi protocols across all major chains.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {supportedProtocols.map((protocol) => (
                  <div key={protocol.name} className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-lg">
                    <img
                      src={protocol.logo}
                      alt={protocol.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-dark-200">{protocol.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Everything you need to stake smarter
              </h2>
              <p className="text-dark-400 max-w-2xl mx-auto">
                Professional-grade tools for DeFi yield optimization
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="glass-card p-6 hover-glow transition-all duration-300 hover:border-primary-500/30">
                  <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-dark-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Ready to optimize your yields?
                </h2>
                <p className="text-dark-400">
                  Connect your wallet and start tracking your staking positions.
                </p>
              </div>
              <Link href="/stake" className="btn-primary whitespace-nowrap">
                Get Started
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-dark-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold gradient-text">staked.me</span>
              <span className="text-dark-500 text-sm">© 2024</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Docs</Link>
              <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">API</Link>
              <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Twitter</Link>
              <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
