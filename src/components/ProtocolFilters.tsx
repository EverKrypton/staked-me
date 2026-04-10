'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { CHAIN_METADATA } from '@/config/chains'

const protocolTypes = [
  { value: 'all', label: 'All' },
  { value: 'Liquid Staking', label: 'Liquid Staking' },
  { value: 'LP Staking', label: 'LP Staking' },
  { value: 'Lending', label: 'Lending' },
  { value: 'Restaking', label: 'Restaking' },
  { value: 'Native Staking', label: 'Native' },
  { value: 'Yield Optimizer', label: 'Yield' },
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist" />
          <input
            type="text"
            placeholder="Search protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>

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
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="px-4 py-3 bg-slate/30 border border-ash/30 rounded-xl text-snow text-sm focus:outline-none focus:border-plasma/50 transition-colors cursor-pointer appearance-none pr-10"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {showFilters && (
        <div className="glass-card p-4 sm:p-5 animate-in">
          <div className="mb-4">
            <label className="block text-xs text-mist uppercase tracking-wide mb-3">Protocol Type</label>
            <div className="flex flex-wrap gap-2">
              {protocolTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedType === type.value
                      ? 'bg-plasma/15 text-plasma border border-plasma/30'
                      : 'bg-slate/30 text-mist border border-ash/20 hover:text-snow hover:border-ash/40'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-mist uppercase tracking-wide mb-3">Chain</label>
            <div className="flex flex-wrap gap-2">
              {chains.map((chain) => (
                <button
                  key={chain.value}
                  onClick={() => setSelectedChain(chain.value)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedChain === chain.value
                      ? 'bg-plasma/15 text-plasma border border-plasma/30'
                      : 'bg-slate/30 text-mist border border-ash/20 hover:text-snow hover:border-ash/40'
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
