'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Activity, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Cart } from '@/components/cart/Cart'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/products', label: 'Products' },
  { href: '/stake', label: 'Stake' },
  { href: '/pool', label: 'Pools' },
  { href: '/portfolio', label: 'Portfolio' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <Activity className="w-8 h-8 text-primary-500" />
                <div className="absolute inset-0 blur-md bg-primary-500/50 rounded-full" />
              </div>
              <span className="font-display text-xl font-bold gradient-text">staked.me</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Cart />
            <ConnectButton />
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-dark-800/50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-dark-800/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
