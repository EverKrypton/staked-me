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
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-t-plasma border-r-neon border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute inset-[6px] rounded-full border-2 border-b-flux border-l-plasma border-t-transparent border-r-transparent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-3 rounded-full border-2 border-t-neon border-b-transparent border-l-transparent border-r-transparent animate-spin" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-plasma via-neon to-flux animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-semibold gradient-text tracking-wide">STAKED</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-plasma rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 bg-plasma rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-plasma rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
