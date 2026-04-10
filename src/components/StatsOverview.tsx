'use client'

import { useAccount } from 'wagmi'
import { TrendingUp, Users, DollarSign, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatNumber, formatCurrency } from '@/utils/format'

const mockStats = {
  totalTVL: 45200000000,
  totalUsers: 2840000,
  totalProtocols: 52,
  avgAPY: 12.4,
  tvlChange: 3.2,
  usersChange: 8.5,
  protocolsChange: 4,
  apyChange: -0.8,
}

export function StatsOverview() {
  useAccount()

  const stats = [
    {
      label: 'Total Value Locked',
      value: formatCurrency(mockStats.totalTVL),
      change: mockStats.tvlChange,
      icon: DollarSign,
      positive: mockStats.tvlChange > 0,
    },
    {
      label: 'Active Stakers',
      value: formatNumber(mockStats.totalUsers),
      change: mockStats.usersChange,
      icon: Users,
      positive: mockStats.usersChange > 0,
    },
    {
      label: 'Supported Protocols',
      value: mockStats.totalProtocols.toString(),
      change: mockStats.protocolsChange,
      icon: Zap,
      positive: true,
    },
    {
      label: 'Average APY',
      value: `${mockStats.avgAPY}%`,
      change: mockStats.apyChange,
      icon: TrendingUp,
      positive: mockStats.apyChange > 0,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card p-5 hover-lift animate-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-mist text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-display font-bold mt-1 text-snow">{stat.value}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate/50">
              <stat.icon className="w-5 h-5 text-plasma" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {stat.positive ? (
              <ArrowUpRight className="w-4 h-4 text-plasma" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${stat.positive ? 'text-plasma' : 'text-red-500'}`}>
              {stat.positive ? '+' : ''}{stat.change}%
            </span>
            <span className="text-mist text-sm">vs last week</span>
          </div>
        </div>
      ))}
    </div>
  )
}
