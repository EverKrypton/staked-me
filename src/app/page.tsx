'use client'

import { Suspense } from 'react'
import { TrendingUp, Shield, Zap, Wallet, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { StatsGrid } from '@/components/StatsGrid'
import { ProductCard } from '@/components/ProductCard'
import { stakingProducts } from '@/config/products'
import { useCartStore } from '@/store/cart'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Yields',
    description: 'Live APY tracking across 50+ protocols',
    gradient: 'from-plasma to-neon',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Direct wallet-to-wallet transactions',
    gradient: 'from-neon to-flux',
  },
  {
    icon: Zap,
    title: 'Instant Execution',
    description: 'No KYC, no delays, just stake',
    gradient: 'from-flux to-pulse',
  },
  {
    icon: Wallet,
    title: 'Multi-Chain',
    description: '7 chains, one unified dashboard',
    gradient: 'from-pulse to-plasma',
  },
]

const supportedChains = [
  { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
  { name: 'Arbitrum', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
  { name: 'BNB Chain', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
  { name: 'Avalanche', logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  { name: 'Optimism', logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
  { name: 'Base', logo: 'https://avatars.githubusercontent.com/u/108554348' },
]

function HomeContent() {
  const { addItem, items } = useCartStore()
  
  const featuredProducts = stakingProducts.slice(0, 4)
  
  const handleAddToCart = (productId: string) => {
    const product = stakingProducts.find((p) => p.id === productId)
    if (product) addItem(product, 1)
  }
  
  const isInCart = (productId: string) => items.some((item) => item.product.id === productId)

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise overflow-hidden">
      <Header />
      <CartDrawer />
      
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="text-center mb-12 sm:mb-16 lg:mb-20 animate-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plasma/10 border border-plasma/20 mb-6 sm:mb-8">
              <div className="pulse-dot"></div>
              <span className="text-xs sm:text-sm font-medium text-plasma">
                Live on 7 chains • 50+ protocols
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1]">
              <span className="text-snow">Stake smarter.</span>
              <br />
              <span className="gradient-text">Earn more.</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-mist max-w-2xl mx-auto mb-8 sm:mb-10">
              The premier marketplace for DeFi staking products. Purchase, track, and optimize your positions across all major chains.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/products" className="btn-primary w-full sm:w-auto">
                <span>Browse Products</span>
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
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-snow">Featured Products</h2>
                <p className="text-sm sm:text-base text-mist mt-1">Top yielding opportunities right now</p>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-plasma hover:text-neon transition-colors">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={() => handleAddToCart(product.id)}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>
            
            <Link href="/products" className="sm:hidden mt-6 flex items-center justify-center gap-2 text-sm font-medium text-plasma">
              View all products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="glass-card p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-snow mb-4">
                    Multi-Chain <span className="gradient-text">Support</span>
                  </h2>
                  <p className="text-mist text-base sm:text-lg mb-6">
                    Access the best yields across all major EVM chains. One wallet, unlimited opportunities.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {supportedChains.map((chain) => (
                      <div key={chain.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate/30 border border-ash/20 hover:border-plasma/30 transition-colors">
                        <img src={chain.logo} alt={chain.name} className="w-5 h-5 rounded-full" />
                        <span className="text-xs sm:text-sm font-medium text-snow">{chain.name}</span>
                      </div>
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
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3`}>
                        <feature.icon className="w-5 h-5 text-void" />
                      </div>
                      <h3 className="font-semibold text-snow text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-mist mt-1">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 sm:p-8 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-snow mb-3">
              Ready to start earning?
            </h2>
            <p className="text-mist text-base sm:text-lg mb-6 max-w-lg mx-auto">
              Connect your wallet and explore the best staking opportunities in DeFi.
            </p>
            <Link href="/products" className="btn-primary inline-flex">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
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
