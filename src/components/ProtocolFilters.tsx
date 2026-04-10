'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { CHAIN_METADATA } from '@/config/chains'
import { PROTOCOLS } from '@/config/protocols'

const protocolTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'Liquid Staking', label: 'Liquid Staking' },
  { value: 'LP Staking', label: 'LP Staking' },
  { value: 'Lending', label: 'Lending' },
  { value: 'Restaking', label: 'Restaking' },
  { value: 'Native Staking', label: 'Native Staking' },
  { value: 'Yield Optimizer', label: 'Yield Optimizer' },
]

const chains = [
  { value: 'all', label: 'All Chains', logo: null },
  { value: 'ethereum', label: 'Ethereum', logo: CHAIN_METADATA.ethereum.logo },
  { value: 'polygon', label: 'Polygon', logo: CHAIN_METADATA.polygon.logo },
  { value: 'arbitrum', label: 'Arbitrum', logo: CHAIN_METADATA.arbitrum.logo },
  { value: 'bsc', label: 'BNB Chain', logo: CHAIN_METADATA.bsc.logo },
  { value: 'avalanche', label: 'Avalanche', logo: CHAIN_METADATA.avalanche.logo },
  { value: 'optimism', label: 'Optimism', logo: CHAIN_METADATA.optimism.logo },
  { value: 'base', label: 'Base', logo: CHAIN_METADATA.base.logo },
]

const sortOptions = [
  { value: 'apy', label: 'Highest APY' },
  { value: 'tvl', label: 'Highest TVL' },
  { value: 'name', label: 'Name A-Z' },
]

export function ProtocolFilters() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedChain, setSelectedChain] = useState('all')
  const [selectedSort, setSelectedSort] = useState('apy')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search protocols..."
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
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
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
        <div className="glass-card p-4 space-y-4 animate-in">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Protocol Type</label>
            <div className="flex flex-wrap gap-2">
              {protocolTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedType === type.value
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-dark-800/50 text-dark-300 border border-dark-700 hover:border-dark-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Chain</label>
            <div className="flex flex-wrap gap-2">
              {chains.map((chain) => (
                <button
                  key={chain.value}
                  onClick={() => setSelectedChain(chain.value)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedChain === chain.value
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-dark-800/50 text-dark-300 border border-dark-700 hover:border-dark-600'
                  }`}
                >
                  {chain.logo && (
                    <img src={chain.logo} alt={chain.label} className="w-4 h-4 rounded-full" />
                  )}
                  {chain.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
