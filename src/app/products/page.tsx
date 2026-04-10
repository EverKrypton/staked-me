'use client'

import { useState, useMemo, useCallback, Suspense } from 'react'
import { Search, Filter, ChevronDown, Sparkles } from 'lucide-react'
import { stakingProducts } from '@/config/products'
import { useCartStore } from '@/store/cart'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ProductCard } from '@/components/ProductCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const categories = [
  { value: 'all', label: 'All' },
  { value: 'staking', label: 'Staking' },
  { value: 'lp', label: 'LP' },
  { value: 'lending', label: 'Lending' },
  { value: 'boost', label: 'Boost' },
]

const sortOptions = [
  { value: 'apy', label: 'Highest APY' },
  { value: 'tvl', label: 'Highest TVL' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function ProductsContent() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('apy')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  const { addItem, items } = useCartStore()
  
  const filteredProducts = useMemo(() => {
    let products = [...stakingProducts]
    
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.protocol.toLowerCase().includes(query) ||
          p.token.toLowerCase().includes(query)
      )
    }
    
    switch (sortBy) {
      case 'apy':
        products.sort((a, b) => b.apy - a.apy)
        break
      case 'tvl':
        products.sort((a, b) => b.tvl - a.tvl)
        break
      case 'price':
        products.sort((a, b) => a.priceUSD - b.priceUSD)
        break
      case 'price-desc':
        products.sort((a, b) => b.priceUSD - a.priceUSD)
        break
    }
    
    return products
  }, [selectedCategory, sortBy, searchQuery])
  
  const handleAddToCart = useCallback((productId: string) => {
    const product = stakingProducts.find((p) => p.id === productId)
    if (product) {
      addItem(product, 1)
    }
  }, [addItem])
  
  const isInCart = useCallback((productId: string) => {
    return items.some((item) => item.product.id === productId)
  }, [items])

  return (
    <div className="min-h-screen bg-void bg-grid bg-noise">
      <Header />
      <CartDrawer />
      
      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <section className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-snow mb-2">
                  <span className="gradient-text">Staking Products</span>
                </h1>
                <p className="text-mist text-base sm:text-lg max-w-xl">
                  Browse and purchase staking positions across the best DeFi protocols
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-plasma/10 border border-plasma/20">
                  <Sparkles className="w-4 h-4 text-plasma" />
                  <span className="text-xs font-medium text-plasma">{filteredProducts.length} products</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist" />
                <input
                  type="text"
                  placeholder="Search by name, protocol, or token..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                    showFilters
                      ? 'bg-plasma/10 border-plasma/30 text-plasma'
                      : 'bg-slate/30 border-ash/30 text-mist hover:text-snow hover:border-ash/50'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-slate/30 border border-ash/30 rounded-xl text-snow text-sm focus:outline-none focus:border-plasma/50 transition-colors cursor-pointer appearance-none pr-10 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234a4a5a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[center_right_1rem] bg-no-repeat"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {showFilters && (
              <div className="glass-card p-4 sm:p-5 animate-in">
                <p className="text-xs text-mist uppercase tracking-wide mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.value
                          ? 'bg-plasma/15 text-plasma border border-plasma/30'
                          : 'bg-slate/30 text-mist border border-ash/20 hover:text-snow hover:border-ash/40'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={() => handleAddToCart(product.id)}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsContent />
    </Suspense>
  )
}
