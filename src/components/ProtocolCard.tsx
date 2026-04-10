'use client'

import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { PROTOCOLS, CHAIN_METADATA, type typeof PROTOCOLS } from '@/config/protocols'
import { formatCurrency, formatNumber } from '@/lib/utils'
import Link from 'next/link'

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
  protocol: typeof PROTOCOLS.ethereum[0]
  index?: number
}

export function ProtocolCard({ protocol, index = 0 }: ProtocolCardProps) {
  const chainKey = getChainKey(protocol.chainId)
  const chain = CHAIN_METADATA[chainKey as keyof typeof CHAIN_METADATA]

  return (
    <div
      className={`protocol-card animate-in opacity-0`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={protocol.logo}
            alt={protocol.name}
            className="w-12 h-12 rounded-xl bg-dark-800 p-1"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=' + protocol.name[0]
            }}
          />
          <div>
            <h3 className="font-display font-semibold text-white">{protocol.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={chain.logo}
                alt={chain.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-xs text-dark-400">{chain.name}</span>
            </div>
          </div>
        </div>
        <span className={`tag ${getTypeTagClass(protocol.type)}`}>
          {protocol.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-dark-500 text-xs font-medium mb-1">APY</p>
          <p className="text-xl font-display font-bold text-primary-500">{protocol.apy}%</p>
        </div>
        <div>
          <p className="text-dark-500 text-xs font-medium mb-1">TVL</p>
          <p className="text-xl font-display font-bold text-white">{formatCurrency(protocol.tvl)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
        <div className="flex items-center gap-2">
          <span className="text-dark-500 text-xs">Earn</span>
          <span className="text-sm font-medium text-white">{protocol.token}</span>
        </div>
        <Link
          href={protocol.url}
          target="_blank"
          className="flex items-center gap-1 text-primary-500 text-sm font-medium hover:text-primary-400 transition-colors"
        >
          Open
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

export function ProtocolList() {
  const allProtocols = Object.values(PROTOCOLS).flat()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allProtocols.slice(0, 12).map((protocol, index) => (
        <ProtocolCard key={`${protocol.name}-${protocol.chainId}`} protocol={protocol} index={index} />
      ))}
    </div>
  )
}

export function TopProtocols() {
  const allProtocols = Object.values(PROTOCOLS)
    .flat()
    .sort((a, b) => b.tvl - a.tvl)
    .slice(0, 6)

  return (
    <div className="space-y-3">
      {allProtocols.map((protocol, index) => (
        <div
          key={`${protocol.name}-${protocol.chainId}`}
          className="flex items-center justify-between p-4 glass-card hover:border-primary-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="text-dark-500 font-mono text-sm w-6">#{index + 1}</span>
            <img
              src={protocol.logo}
              alt={protocol.name}
              className="w-10 h-10 rounded-xl bg-dark-800 p-1"
            />
            <div>
              <h4 className="font-medium text-white">{protocol.name}</h4>
              <p className="text-xs text-dark-400">{protocol.type}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-primary-500">{protocol.apy}% APY</p>
            <p className="text-xs text-dark-400">{formatCurrency(protocol.tvl)} TVL</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function HighYieldProtocols() {
  const allProtocols = Object.values(PROTOCOLS)
    .flat()
    .sort((a, b) => b.apy - a.apy)
    .slice(0, 6)

  return (
    <div className="space-y-3">
      {allProtocols.map((protocol, index) => (
        <div
          key={`${protocol.name}-${protocol.chainId}`}
          className="flex items-center justify-between p-4 glass-card hover:border-primary-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="text-dark-500 font-mono text-sm w-6">#{index + 1}</span>
            <img
              src={protocol.logo}
              alt={protocol.name}
              className="w-10 h-10 rounded-xl bg-dark-800 p-1"
            />
            <div>
              <h4 className="font-medium text-white">{protocol.name}</h4>
              <p className="text-xs text-dark-400">{protocol.type}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-primary-500">{protocol.apy}% APY</p>
            <p className="text-xs text-dark-400">{formatCurrency(protocol.tvl)} TVL</p>
          </div>
        </div>
      ))}
    </div>
  )
}
