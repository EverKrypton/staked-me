# Staked.me - AGENTS.md

## Project Overview

**Staked.me** is a multi-chain staking aggregator built with:
- Next.js 15.5 + React 19 + TypeScript 5.7
- Tailwind CSS with custom color scheme
- wagmi + viem for Web3 (MetaMask only, no external wallet kits)
- Zustand for state management
- Vercel deployment

**Repository:** https://github.com/EverKrypton/staked-me

---

## Build Commands

```bash
npm run dev          # Development server
npm run build        # Production build (runs lint + typecheck)
npm run lint         # ESLint check
npm run typecheck    # TypeScript check
```

---

## Critical Rules - READ BEFORE ANY CHANGES

### 1. ALWAYS Run These Commands After Changes

```bash
npm run lint && npm run typecheck && npm run build
```

**NEVER** push without verifying the build passes locally.

### 2. ESLint Configuration (eslint.config.mjs)

- Uses **flat config** format (not .eslintrc)
- **Always check** `eslint.config.mjs` for globals before adding new browser types
- Required globals: `Node`, `Event`, `HTMLElement`, `KeyboardEvent`, `MouseEvent`, etc.

### 3. TypeScript Strict Mode

The project uses strict TypeScript. Common issues:

- **process.env** → Use bracket notation: `process.env['NEXT_PUBLIC_KEY']`
- **Index signatures** → Use bracket notation for dynamic property access
- **Unused imports** → WILL FAIL BUILD - remove all unused imports before committing

### 4. Client vs Server Components

- `'use client'` directive MUST be at the top of client components
- Files using hooks (useState, useEffect, wagmi) MUST be client components
- `providers.tsx` MUST have `'use client'`
- RainbowKit/wallet themes MUST NOT be called on server

### 5. Color System (DO NOT CHANGE)

```css
/* Tailwind colors - use these only */
void: #020203      /* Background */
abyss: #07080c     /* Secondary bg */
obsidian: #0c0e14  /* Tertiary bg */
charcoal: #12151e  /* Card bg */
iron: #1a1f2e      /* Borders */
steel: #252b3d     /* Hover states */
slate: #323850     /* Muted */
zinc: #4a5470      /* Secondary text */
fog: #6b7590       /* Muted text */
pearl: #a0a8bc     /* Light text */
cream: #d8dce8     /* Highlight text */
white: #f4f6fc     /* Primary text */

stake: #22d3ee     /* Primary accent (cyan) */
yield: #a3e635     /* Success/gains (lime) */
gain: #facc15      /* Warning/highlights (amber) */
boost: #f97316     /* Alert/action (orange) */
rise: #ec4899      /* Special/pink */
deep: #6366f1      /* Links/indigo */
```

### 6. Import Rules

```typescript
// ✅ CORRECT - No unused imports
import { Header } from '@/components/Header'
import { useAccount } from 'wagmi'

// ❌ WRONG - Unused imports will fail build
import { Header, Footer, SomethingUnused } from '@/components/Header'
import { ExternalLink } from 'lucide-react' // if not used
```

### 7. Wagmi Configuration

- **NO WalletConnect** - causes build errors
- **NO RainbowKit** - causes deprecation warnings
- **NO CoinbaseWallet connector** - causes build errors
- **ONLY** use `injected()` connector for MetaMask
- **NO project ID required**

```typescript
// ✅ CORRECT
import { injected } from 'wagmi/connectors'
connectors: [injected({ target: 'metaMask' })]

// ❌ WRONG - Will fail build
import { walletConnect, coinbaseWallet } from 'wagmi/connectors'
```

### 8. File Structure

```
src/
├── app/
│   ├── page.tsx          # Home
│   ├── pools/page.tsx    # Staking pools
│   ├── stake/page.tsx    # Stake page
│   ├── portfolio/page.tsx
│   ├── build/page.tsx    # Project deployment
│   ├── layout.tsx        # Root layout (SEO)
│   ├── providers.tsx     # Wagmi providers
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ConnectWallet.tsx
│   ├── ProtocolCard.tsx
│   └── StatsGrid.tsx
├── config/
│   ├── wagmi.ts          # Wagmi config
│   ├── chains.ts         # Chain metadata
│   └── protocols.ts      # Protocol data
└── utils/
    ├── format.ts
    └── security.ts
```

### 9. SEO Requirements

- All pages must have proper metadata
- Use Schema.org structured data in layout.tsx
- Keywords: staking, DeFi, crypto, yield, APY, Ethereum, Polygon, etc.

### 10. Git Commit Rules

- **NEVER** commit without running `npm run build` first
- **ALWAYS** remove unused imports before commit
- **ALWAYS** check for TypeScript errors

---

## Common Errors & Fixes

### Error: 'X' is not defined (ESLint)

**Fix:** Add to `eslint.config.mjs` globals:
```javascript
globals: {
  // ...existing
  Node: "readonly",
  HTMLImageElement: "readonly",
}
```

### Error: Cannot use namespace 'jest' as a value

**Fix:** Exclude test files from TypeScript compilation:
```json
// tsconfig.json
"exclude": ["node_modules", "__tests__", "jest.setup.ts", "jest.config.ts"]
```

### Error: Property 'NEXT_PUBLIC_KEY' comes from an index signature

**Fix:** Use bracket notation:
```typescript
// ❌ Wrong
process.env.NEXT_PUBLIC_KEY

// ✅ Correct
process.env['NEXT_PUBLIC_KEY']
```

### Error: Attempted to call darkTheme() from the server

**Fix:** Add `'use client'` to the component:
```typescript
'use client'  // Must be first line

import { darkTheme } from '@rainbow-me/rainbowkit'
```

### Error: Module not found 'pino-pretty' / '@react-native-async-storage'

**Fix:** This is caused by wallet connector packages. Remove them:
```typescript
// Remove these imports
import { walletConnect } from 'wagmi/connectors'
import { coinbaseWallet } from 'wagmi/connectors'
import { metaMask } from 'wagmi/connectors'
```

---

## Required Skills

This project benefits from these skills:

1. **android-security** / **security** - For secure crypto handling
2. **frontend-design** - For UI/UX improvements
3. **seo** - For search engine optimization
4. **accessibility** - For WCAG compliance

---

## Testing Checklist

Before pushing:

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes  
- [ ] `npm run build` succeeds
- [ ] No unused imports
- [ ] All client components have `'use client'`
- [ ] process.env uses bracket notation
- [ ] No WalletConnect/CoinbaseWallet connectors

---

## Deployment

- Platform: Vercel
- Auto-deploys from `main` branch
- Build command: `npm run build`
- Node version: >=20.0.0
