# 🥩 Staked.me

**Multi-chain staking aggregator with e-commerce & crypto payments**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

![Staked.me Dashboard](https://via.placeholder.com/1200x600/0f172a/22c55e?text=Staked.me+Dashboard)

## 🚀 Overview

Staked.me is a professional-grade DeFi platform that combines staking aggregation with e-commerce functionality. Purchase staking positions with crypto payments, track your portfolio, and optimize yields across 50+ protocols on 7 chains.

### Features

- **🛒 E-Commerce Platform** - Purchase staking products with crypto payments
- **💳 Multi-Token Payments** - Pay with USDT, USDC, ETH, MATIC, BNB
- **🔄 Multi-Chain Support** - Ethereum, Polygon, Arbitrum, BNB Chain, Avalanche, Optimism, Base
- **📊 Real-Time APY Data** - Live yield tracking across all supported protocols
- **💼 Portfolio Dashboard** - Unified view of all your staked positions
- **🔒 Security First** - CSP headers, input sanitization, encrypted storage
- **⚡ Next.js 15** - Turbopack, React 19, optimal performance

## 🏗️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 15, React 19, TypeScript 5.7 |
| Web3 | wagmi, viem, RainbowKit |
| State | Zustand, TanStack Query |
| Forms | React Hook Form, Zod |
| Styling | Tailwind CSS, Framer Motion, Radix UI |
| Testing | Jest, React Testing Library |
| Security | DOMPurify, CryptoJS, CSP Headers |

## 🛒 E-Commerce Features

### Shopping Cart
- Add/remove staking products
- Quantity management
- Persistent cart (localStorage)
- Real-time price updates

### Checkout Flow
1. **Delivery Address** - Your wallet for receiving staking positions
2. **Payment Selection** - Choose from 7+ crypto payment methods
3. **Transaction** - Sign and send payment directly from wallet
4. **Confirmation** - Instant order confirmation

### Supported Payment Methods
| Token | Chain | Type |
|-------|-------|------|
| USDT | Ethereum | ERC-20 |
| USDC | Ethereum | ERC-20 |
| USDT | BNB Chain | BEP-20 |
| USDC | Polygon | ERC-20 |
| ETH | Ethereum | Native |
| MATIC | Polygon | Native |
| BNB | BNB Chain | Native |

## 🔐 Security Features

- **Content Security Policy (CSP)** - Strict headers prevent XSS
- **Input Sanitization** - All user inputs cleaned with DOMPurify
- **Data Encryption** - Sensitive data encrypted with AES
- **Form Validation** - Zod schemas for type-safe validation
- **No Unsafe Operations** - `no-eval`, `no-implied-eval` enforced
- **Strict TypeScript** - All strict mode checks enabled

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/EverKrypton/staked-me.git

# Navigate to directory
cd staked-me

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## 🔧 Environment Variables

```env
# Required
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ENCRYPTION_KEY=your-secure-key-min-32-chars

# Optional (for better RPC reliability)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key

# Payment receiving address
NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS=0x...
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint

# Type check
npm run typecheck
```

## 📊 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── checkout/           # Checkout page
│   ├── pool/               # Liquidity pools
│   ├── portfolio/          # User portfolio
│   ├── products/           # Product catalog
│   └── stake/              # Staking page
├── components/
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   └── ui/                 # Reusable UI components
├── config/
│   ├── chains.ts           # Chain configurations
│   ├── products.ts         # Staking products
│   ├── protocols.ts        # DeFi protocols
│   └── wagmi.ts            # Web3 config
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── store/                  # Zustand stores
│   ├── cart.ts             # Cart state
│   └── order.ts            # Order state
├── types/                  # TypeScript types
└── utils/
    ├── format.ts           # Number formatting
    ├── security.ts         # Security utilities
    └── validation.ts       # Zod schemas
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Roadmap

- [ ] Portfolio analytics with PnL tracking
- [ ] Impermanent loss calculator
- [ ] Auto-compounding strategies
- [ ] Cross-chain bridging
- [ ] Mobile app (React Native)
- [ ] Governance token
- [ ] ZK-proof verified APY

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Website**: [staked.me](https://staked.me)
- **GitHub**: [EverKrypton/staked-me](https://github.com/EverKrypton/staked-me)
- **Twitter**: [@staked_me](https://twitter.com/staked_me)

---

Built with ❤️ by [EverKrypton](https://github.com/EverKrypton)
