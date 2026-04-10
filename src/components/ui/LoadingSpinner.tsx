'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function LoadingSpinner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="70 200" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee"/>
                  <stop offset="50%" stopColor="#a3e635"/>
                  <stop offset="100%" stopColor="#facc15"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-2 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient2)" strokeWidth="1.5" strokeDasharray="50 150" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#22d3ee"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-stake via-yield to-gain rounded-xl animate-stake-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-void" fill="currentColor">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18 8v8l-6 3.75L6 16V8l6-3.5z"/>
                  <path d="M12 6v12M8 8.5v7M16 8.5v7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-display font-bold gradient-text tracking-wider">STAKED</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-stake rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yield rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 bg-gain rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
          <span className="text-xs text-fog font-mono tracking-widest">SECURING ASSETS</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
