'use client'

import { useState, useEffect } from 'react'
import { Activity, Menu, X, TrendingUp, ShoppingBag, PieChart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useCartStore } from '@/store/cart'

const navItems = [
  { href: '/', label: 'Dashboard', icon: TrendingUp },
  { href: '/products', label: 'Products', icon: ShoppingBag },
  { href: '/stake', label: 'Stake', icon: Activity },
  { href: '/portfolio', label: 'Portfolio', icon: PieChart },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { getTotalItems, openCart } = useCartStore()
  const cartCount = getTotalItems()

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
            ? 'glass-dark border-b border-graphite/50 shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            <div className="flex items-center gap-6 lg:gap-10">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-plasma via-neon to-flux flex items-center justify-center shadow-lg shadow-plasma/20 group-hover:shadow-plasma/40 transition-shadow duration-300">
                    <Activity className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-void" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-plasma/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                          ? 'text-plasma'
                          : 'text-mist hover:text-snow hover:bg-slate/30'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-plasma to-neon"></span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl bg-slate/30 hover:bg-slate/50 border border-ash/30 hover:border-plasma/30 transition-all duration-300 group"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 text-mist group-hover:text-plasma transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-plasma to-neon text-void text-[10px] font-bold flex items-center justify-center shadow-lg shadow-plasma/30">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              <div className="hidden sm:block">
                <ConnectButton />
              </div>
              
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate/30 hover:bg-slate/50 border border-ash/30 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-snow" />
                ) : (
                  <Menu className="w-5 h-5 text-mist" />
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
                      ? 'bg-plasma/10 text-plasma border border-plasma/20'
                      : 'text-mist hover:text-snow hover:bg-slate/30'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-ash/20">
            <ConnectButton />
          </div>
        </nav>
      </div>
    </>
  )
}
