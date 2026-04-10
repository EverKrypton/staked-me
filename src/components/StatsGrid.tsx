'use client'

import { TrendingUp, Users, DollarSign, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const stats = [
  {
    label: 'Total Value Locked',
    value: '$45.2B',
    change: 3.2,
    icon: DollarSign,
    gradient: 'from-plasma to-neon',
  },
  {
    label: 'Active Stakers',
    value: '2.84M',
    change: 8.5,
    icon: Users,
    gradient: 'from-neon to-flux',
  },
  {
    label: 'Protocols',
    value: '52',
    change: 4,
    icon: Zap,
    gradient: 'from-flux to-plasma',
  },
  {
    label: 'Avg. APY',
    value: '12.4%',
    change: -0.8,
    icon: TrendingUp,
    gradient: 'from-plasma to-pulse',
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const isPositive = stat.change > 0
        const Icon = stat.icon

        return (
          <div
            key={stat.label}
            className="glass-card p-4 sm:p-5 lg:p-6 hover-lift animate-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-plasma" />
              </div>
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-plasma" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                )}
                <span className={`text-xs font-semibold ${isPositive ? 'text-plasma' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}{stat.change}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-mist uppercase tracking-wide mb-1">{stat.label}</p>
              <p className="stat-value text-2xl sm:text-3xl lg:text-4xl gradient-text">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
