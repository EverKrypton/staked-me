import React from 'react'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Staked.me | Multi-Chain Staking Aggregator',
  description: 'Track, compare, and optimize your staking positions across 50+ DeFi protocols on 7 chains. Real-time APY data, portfolio tracking, and yield optimization.',
  keywords: ['staking', 'defi', 'crypto', 'yield', 'apy', 'ethereum', 'polygon', 'arbitrum', 'bnb chain', 'avalanche'],
  authors: [{ name: 'EverKrypton' }],
  openGraph: {
    title: 'Staked.me | Multi-Chain Staking Aggregator',
    description: 'Track, compare, and optimize your staking positions across 50+ DeFi protocols',
    type: 'website',
    url: 'https://staked.me',
    images: [{ url: 'https://staked.me/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staked.me | Multi-Chain Staking Aggregator',
    description: 'Track, compare, and optimize your staking positions across 50+ DeFi protocols',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
