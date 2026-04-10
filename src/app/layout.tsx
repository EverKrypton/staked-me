import React from 'react'
import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020203',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://staked.me'),
  title: {
    default: 'Staked.me | Multi-Chain Staking Aggregator - Track, Compare & Optimize DeFi Yields',
    template: '%s | Staked.me'
  },
  description: 'Track staking positions across 50+ DeFi protocols on Ethereum, Polygon, Arbitrum, BNB Chain, Avalanche, Optimism & Base. Compare APY rates, monitor TVL, and optimize your staking yields in real-time. Free portfolio tracker for liquid staking, restaking, LP farming.',
  keywords: [
    'staking', 'stake crypto', 'crypto staking', 'DeFi staking', 'staking rewards',
    'staking APY', 'liquid staking', 'restaking', 'EigenLayer', 'Lido stETH',
    'stake Ethereum', 'stake Polygon', 'staking calculator',
    'staking pools', 'validator staking', 'proof of stake', 'staking aggregator',
    'yield farming', 'LP staking', 'DeFi yields', 'crypto yields',
    'portfolio tracker', 'crypto portfolio', 'DeFi dashboard',
    'Ethereum staking', 'Polygon staking', 'Arbitrum staking', 'BNB staking',
    'best staking rates', 'highest APY crypto', 'staking comparison'
  ],
  authors: [{ name: 'Staked.me', url: 'https://staked.me' }],
  creator: 'Staked.me',
  publisher: 'Staked.me',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://staked.me',
    siteName: 'Staked.me',
    title: 'Staked.me | Multi-Chain Staking Aggregator',
    description: 'Track, compare, and optimize your staking positions across 50+ DeFi protocols on 7 chains.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Staked.me - Multi-Chain Staking Aggregator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staked.me | Multi-Chain Staking Aggregator',
    description: 'Track, compare, and optimize your staking positions across 50+ DeFi protocols',
    creator: '@stakedme',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://staked.me',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Staked.me',
              description: 'Multi-chain staking aggregator for tracking and optimizing DeFi yields',
              url: 'https://staked.me',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Staked.me',
              url: 'https://staked.me',
              logo: 'https://staked.me/logo.png',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
