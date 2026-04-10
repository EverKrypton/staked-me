'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { Wallet, LogOut, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isConnected && address) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate/30 hover:bg-slate/50 border border-ash/30 hover:border-plasma/30 transition-all duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-plasma to-neon flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5 text-void" />
          </div>
          <span className="text-sm font-medium text-snow hidden sm:block">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <ChevronDown className="w-4 h-4 text-mist" />
        </button>

        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-64 glass-card p-3 z-50">
            <div className="mb-3 pb-3 border-b border-ash/20">
              <p className="text-xs text-mist mb-1">Address</p>
              <p className="text-sm font-mono text-snow truncate">{address}</p>
            </div>
            {balance && (
              <div className="mb-3 pb-3 border-b border-ash/20">
                <p className="text-xs text-mist mb-1">Balance</p>
                <p className="text-sm text-snow">
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                disconnect()
                setShowDropdown(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate/30 text-red-400 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-plasma to-neon text-void font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      <Wallet className="w-4 h-4" />
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
