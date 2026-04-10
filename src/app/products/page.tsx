'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { ShoppingCart, Filter, Search, ChevronDown, Star, TrendingUp } from 'lucide-react'
import { stakingProducts, getProductsByCategory } from '@/config/products'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/utils'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { Cart } from '@/components/cart/Cart'

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'staking', label: 'Liquid Staking' },
  { value: 'lp', label: 'LP Staking' },
  { value: 'lending', label: 'Lending' },
  { value: 'boost', label: 'Yield Boost' },
]

const sortOptions = [
  { value: 'apy', label: 'Highest APY' },
  { value: 'tvl', label: 'Highest TVL' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function ProductsPage() {
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
  
  const handleAddToCart = (productId: string) => {
    const product = stakingProducts.find((p) => p.id === productId)
    if (product) {
      addItem(product, 1)
    }
  }
  
  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }
  
  return (
    <div className="min-h-screen bg-dark-950 bg-grid-pattern bg-grid">
      <div className="fixed inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-dark-950 pointer-events-none" />
      
      <Header />
      
      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Staking Products</h1>
                <p className="text-dark-400">Browse and purchase staking positions across protocols</p>
              </div>
              <Cart />
            </div>
          </section>
          
          <section className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl text-dark-300 hover:text-white hover:border-dark-600 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500/50 transition-colors appearance-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {showFilters && (
              <div className="glass-card p-4">
                <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.value
                          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                          : 'bg-dark-800/50 text-dark-300 border border-dark-700 hover:border-dark-600'
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
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-400 text-sm">
                Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300 hover:scale-[1.02] flex flex-col"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-xl bg-dark-800 p-1"
                      />
                      <div>
                        <h3 className="font-display font-semibold text-white">{product.name}</h3>
                        <p className="text-xs text-dark-400">{product.protocol}</p>
                      </div>
                    </div>
                    {product.apy > 20 && (
                      <span className="px-2 py-1 bg-accent-orange/20 text-accent-orange text-xs font-medium rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Hot
                      </span>
                    )}
                  </div>
                  
                  <p className="text-dark-400 text-sm mb-4 flex-grow">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-dark-800/50 rounded-lg">
                      <p className="text-dark-500 text-xs">APY</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        <span className="text-lg font-display font-bold text-primary-500">{product.apy}%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-dark-800/50 rounded-lg">
                      <p className="text-dark-500 text-xs">TVL</p>
                      <span className="text-lg font-display font-bold text-white">{formatCurrency(product.tvl)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                    <div>
                      <p className="text-dark-500 text-xs">Price</p>
                      <p className="text-lg font-display font-bold text-white">{formatCurrency(product.priceUSD)}</p>
                      <p className="text-xs text-dark-500">{product.price.toFixed(6)} {product.token}</p>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isInCart(product.id)}
                      variant={isInCart(product.id) ? 'secondary' : 'default'}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
