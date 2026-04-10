'use client'

import { useState, useEffect } from 'react'
import { Activity, Menu, X, TrendingUp, Layers, PieChart, Hammer } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectWallet } from '@/components/ConnectWallet'

const navItems = [
  { href: '/', label: 'Dashboard', icon: TrendingUp },
  { href: '/pools', label: 'Pools', icon: Layers },
  { href: '/stake', label: 'Stake', icon: Activity },
  { href: '/portfolio', label: 'Portfolio', icon: PieChart },
  { href: '/build', label: 'Build', icon: Hammer },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark border-b border-charcoal/50 shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            <div className="flex items-center gap-6 lg:gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-stake via-yield to-gain rounded-xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-void" fill="currentColor">
                      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18 8v8l-6 3.75L6 16V8l6-3.5z"/>
                      <path d="M12 7l4 2.5v5L12 17l-4-2.5v-5L12 7z" opacity="0.6"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-stake/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="font-display text-lg sm:text-xl font-bold gradient-text hidden xs:block">staked.me</span>
              </Link>
              
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-stake'
                          : 'text-fog hover:text-white hover:bg-iron/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-stake to-yield"></span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <ConnectWallet />
              
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-iron/50 hover:bg-steel/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-fog" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-void/90 backdrop-blur-xl transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        
        <nav
          className={`absolute top-20 left-4 right-4 glass-card p-6 transition-all duration-500 ${
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-stake/10 text-stake border border-stake/20'
                      : 'text-fog hover:text-white hover:bg-iron/30'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
