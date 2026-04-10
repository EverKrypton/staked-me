'use client'

import Link from 'next/link'
import { ExternalLink, Github, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-charcoal bg-abyss/50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-stake via-yield to-gain rounded-xl animate-stake-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-void" fill="currentColor">
                      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18 8v8l-6 3.75L6 16V8l6-3.5z"/>
                      <path d="M12 7l4 2.5v5L12 17l-4-2.5v-5L12 7z" opacity="0.6"/>
                    </svg>
                  </div>
                </div>
                <span className="font-display text-xl font-bold gradient-text">staked.me</span>
              </Link>
              <p className="text-sm text-fog leading-relaxed mb-6">
                Multi-chain staking aggregator. Track, compare, and optimize your DeFi yields across 50+ protocols on 7 blockchains.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com/stakedme" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-iron hover:bg-steel transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4 text-fog hover:text-stake transition-colors" />
                </a>
                <a href="https://github.com/EverKrypton/staked-me" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-iron hover:bg-steel transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4 text-fog hover:text-stake transition-colors" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-sm text-fog hover:text-stake transition-colors">Dashboard</Link></li>
                <li><Link href="/pools" className="text-sm text-fog hover:text-stake transition-colors">Pools</Link></li>
                <li><Link href="/stake" className="text-sm text-fog hover:text-stake transition-colors">Stake</Link></li>
                <li><Link href="/portfolio" className="text-sm text-fog hover:text-stake transition-colors">Portfolio</Link></li>
                <li><Link href="/build" className="text-sm text-fog hover:text-stake transition-colors">Build</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Chains</h4>
              <ul className="space-y-3">
                <li><Link href="/pools?chain=ethereum" className="text-sm text-fog hover:text-stake transition-colors">Ethereum</Link></li>
                <li><Link href="/pools?chain=polygon" className="text-sm text-fog hover:text-stake transition-colors">Polygon</Link></li>
                <li><Link href="/pools?chain=arbitrum" className="text-sm text-fog hover:text-stake transition-colors">Arbitrum</Link></li>
                <li><Link href="/pools?chain=bsc" className="text-sm text-fog hover:text-stake transition-colors">BNB Chain</Link></li>
                <li><Link href="/pools?chain=avalanche" className="text-sm text-fog hover:text-stake transition-colors">Avalanche</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="https://docs.staked.me" target="_blank" rel="noopener noreferrer" className="text-sm text-fog hover:text-stake transition-colors inline-flex items-center gap-1">Documentation <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://github.com/EverKrypton/staked-me" target="_blank" rel="noopener noreferrer" className="text-sm text-fog hover:text-stake transition-colors inline-flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a></li>
                <li><Link href="/terms" className="text-sm text-fog hover:text-stake transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-fog hover:text-stake transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-charcoal">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc text-center sm:text-left">
              © {currentYear} Staked.me. All rights reserved. Built with ❤️ for the DeFi community.
            </p>
            <p className="text-xs text-zinc">
              Staking involves risk. Do your own research.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
