/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.smold.app', 'tokens.1inch.io', 'cryptologos.cc', 's2.coinmarketcap.com', 'raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
