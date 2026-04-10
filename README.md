# 🥩 Staked.me

**Multi-chain staking aggregator & portfolio tracker**

[![Live Demo](https://img.shields.io/badge/Live-Demo-22c55e?style=for-the-badge)](https://staked.me)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

![Staked.me Dashboard](https://via.placeholder.com/1200x600/0f172a/22c55e?text=Staked.me+Dashboard)

## 🚀 Overview

Staked.me is a professional-grade DeFi staking aggregator that helps you find, track, and optimize your staking positions across 50+ protocols on 7 chains.

### Features

- **🔄 Multi-Chain Support** - Ethereum, Polygon, Arbitrum, BNB Chain, Avalanche, Optimism, Base
- **📊 Real-Time APY Data** - Live yield tracking across all supported protocols
- **💼 Portfolio Dashboard** - Unified view of all your staked positions
- **⚡ Gas Optimization** - Smart routing for cheapest transactions
- **🛡️ Risk Analysis** - Protocol security scores and audit information

## 🏗️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14, React 18, TypeScript |
| Web3 | wagmi, viem, RainbowKit |
| Styling | Tailwind CSS, Framer Motion |
| State | TanStack Query |
| Charts | Recharts |
| Icons | Lucide React |

## 🔗 Supported Protocols

| Protocol | Type | Chains |
|----------|------|--------|
| Lido | Liquid Staking | Ethereum, Polygon |
| Rocket Pool | Liquid Staking | Ethereum |
| EigenLayer | Restaking | Ethereum |
| Uniswap V3 | LP Staking | All EVM chains |
| PancakeSwap | LP Staking | BNB Chain |
| GMX | LP Staking | Arbitrum, Avalanche |
| Aave V3 | Lending | Multi-chain |
| Venus | Lending | BNB Chain |
| Velodrome | LP Staking | Optimism |
| Aerodrome | LP Staking | Base |

...and 40+ more protocols.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/EverKrypton/staked-me.git

# Navigate to directory
cd staked-me

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key
```

## 🎨 Design System

### Color Palette

- **Primary (Green)**: `#22c55e` - Actions, positive indicators, CTAs
- **Background (Dark)**: `#0f172a` - Main background
- **Accent Purple**: `#a855f7` - LP Staking tags
- **Accent Blue**: `#3b82f6` - Lending tags
- **Accent Cyan**: `#06b6d4` - Native staking tags
- **Accent Orange**: `#f97316` - Restaking tags

### Typography

- **Display**: Space Grotesk - Headlines, numbers
- **Body**: Inter - General text
- **Mono**: JetBrains Mono - Addresses, code

## 📊 API Integration

Staked.me uses free RPC endpoints for blockchain data:

| Chain | RPC Provider |
|-------|-------------|
| Ethereum | LlamaRPC, Ankr, PublicNode |
| Polygon | Polygon RPC, Ankr, LlamaRPC |
| Arbitrum | Arbitrum RPC, Ankr, LlamaRPC |
| BNB Chain | Binance RPC, PublicNode, Ankr |
| Avalanche | Avalanche RPC, Ankr, PublicNode |
| Optimism | Optimism RPC, Ankr, PublicNode |
| Base | Base RPC, Ankr, PublicNode |

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t staked-me .

# Run container
docker run -p 3000:3000 staked-me
```

## 📈 Roadmap

- [ ] Portfolio analytics with PnL tracking
- [ ] Impermanent loss calculator
- [ ] Yield farming strategies
- [ ] Mobile app (React Native)
- [ ] Governance token launch
- [ ] Cross-chain bridging integration
- [ ] ZK-proof verified APY data

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Website**: [staked.me](https://staked.me)
- **Twitter**: [@staked_me](https://twitter.com/staked_me)
- **Discord**: [Join Community](https://discord.gg/stakedme)
- **Docs**: [docs.staked.me](https://docs.staked.me)

---

Built with ❤️ by [EverKrypton](https://github.com/EverKrypton)
