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
          <div className="absolute inset-0">
            <div className="stake-ring ring-1"></div>
            <div className="stake-ring ring-2"></div>
            <div className="stake-ring ring-3"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-plasma via-neon to-flux animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-semibold gradient-text tracking-wide">STAKED</span>
          <div className="flex items-center gap-2">
            <div className="stake-dot"></div>
            <div className="stake-dot"></div>
            <div className="stake-dot"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stake-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
        }

        .ring-1 {
          border-top-color: #00ff88;
          border-right-color: #00ffcc;
          animation: spin-ring 1.5s linear infinite;
        }

        .ring-2 {
          inset: 6px;
          border-bottom-color: #88ff00;
          border-left-color: #00ff88;
          animation: spin-ring 2s linear infinite reverse;
        }

        .ring-3 {
          inset: 12px;
          border-top-color: #00ffcc;
          animation: spin-ring 2.5s linear infinite;
        }

        @keyframes spin-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .stake-dot {
          width: 6px;
          height: 6px;
          background: #00ff88;
          border-radius: 50%;
          animation: bounce-dot 1.4s ease-in-out infinite;
        }

        .stake-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .stake-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .stake-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce-dot {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>,
    document.body
  )
}
