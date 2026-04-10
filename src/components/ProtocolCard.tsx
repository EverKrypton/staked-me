'use client'

import { ExternalLink } from 'lucide-react'
import { PROTOCOLS } from '@/config/protocols'
import { CHAIN_METADATA } from '@/config/chains'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

interface Protocol {
  name: string
  type: string
  logo: string
  token: string
  underlying: string
  apy: number
  tvl: number
  contract: string
  chainId: number
  url: string
}

const getTypeTagClass = (type: string) => {
  switch (type.toLowerCase()) {
    case 'liquid staking':
    case 'native staking':
      return 'tag-staking'
    case 'lp staking':
      return 'tag-lp'
    case 'lending':
      return 'tag-lending'
    case 'restaking':
      return 'tag-restaking'
    case 'yield optimizer':
      return 'tag-yield'
    default:
      return 'tag-lp'
  }
}

const getChainKey = (chainId: number): string => {
  const mapping: Record<number, string> = {
    1: 'ethereum',
    137: 'polygon',
    42161: 'arbitrum',
    56: 'bsc',
    43114: 'avalanche',
    10: 'optimism',
    8453: 'base',
  }
  return mapping[chainId] || 'ethereum'
}

interface ProtocolCardProps {
  protocol: Protocol
  index?: number
}

export function ProtocolCard({ protocol, index = 0 }: ProtocolCardProps) {
  const chainKey = getChainKey(protocol.chainId)
  const chain = CHAIN_METADATA[chainKey as keyof typeof CHAIN_METADATA]

  return (
    <div
      className="product-card group animate-in"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={protocol.logo}
            alt={protocol.name}
            className="w-12 h-12 rounded-xl bg-slate/50 p-1"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=' + protocol.name[0]
            }}
          />
          <div>
            <h3 className="font-semibold text-snow text-sm sm:text-base">{protocol.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <img
                src={chain.logo}
                alt={chain.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-xs text-mist">{chain.name}</span>
            </div>
          </div>
        </div>
        <span className={`tag ${getTypeTagClass(protocol.type)}`}>
          {protocol.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="metric-badge">
          <p className="text-[10px] text-mist uppercase">APY</p>
          <p className="stat-value text-base text-plasma">{protocol.apy}%</p>
        </div>
        <div className="p-2.5 rounded-lg bg-slate/20 border border-ash/20">
          <p className="text-[10px] text-mist uppercase">TVL</p>
          <p className="stat-value text-base text-snow">{formatCurrency(protocol.tvl)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-graphite">
        <div className="flex items-center gap-2">
          <span className="text-xs text-mist">Earn</span>
          <span className="text-sm font-medium text-snow">{protocol.token}</span>
        </div>
        <Link
          href={protocol.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-plasma text-sm font-medium hover:text-neon transition-colors"
        >
          Open
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

export function ProtocolList() {
  const allProtocols: Protocol[] = Object.values(PROTOCOLS).flat()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allProtocols.slice(0, 12).map((protocol, index) => (
        <ProtocolCard key={`${protocol.name}-${protocol.chainId}`} protocol={protocol} index={index} />
      ))}
    </div>
  )
}

export function TopProtocols() {
  const allProtocols: Protocol[] = Object.values(PROTOCOLS)
    .flat()
    .sort((a, b) => b.tvl - a.tvl)
    .slice(0, 6)

  return (
    <div className="space-y-3">
      {allProtocols.map((protocol, index) => (
        <div
          key={`${protocol.name}-${protocol.chainId}`}
          className="glass-card p-4 hover-lift"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-mist font-mono text-sm w-6">#{index + 1}</span>
              <img
                src={protocol.logo}
                alt={protocol.name}
                className="w-10 h-10 rounded-xl bg-slate/50 p-1"
              />
              <div>
                <h4 className="font-medium text-snow">{protocol.name}</h4>
                <p className="text-xs text-mist">{protocol.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-plasma">{protocol.apy}% APY</p>
              <p className="text-xs text-mist">{formatCurrency(protocol.tvl)} TVL</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function HighYieldProtocols() {
  const allProtocols: Protocol[] = Object.values(PROTOCOLS)
    .flat()
    .sort((a, b) => b.apy - a.apy)
    .slice(0, 6)

  return (
    <div className="space-y-3">
      {allProtocols.map((protocol, index) => (
        <div
          key={`${protocol.name}-${protocol.chainId}`}
          className="glass-card p-4 hover-lift"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-mist font-mono text-sm w-6">#{index + 1}</span>
              <img
                src={protocol.logo}
                alt={protocol.name}
                className="w-10 h-10 rounded-xl bg-slate/50 p-1"
              />
              <div>
                <h4 className="font-medium text-snow">{protocol.name}</h4>
                <p className="text-xs text-mist">{protocol.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-plasma">{protocol.apy}% APY</p>
              <p className="text-xs text-mist">{formatCurrency(protocol.tvl)} TVL</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
