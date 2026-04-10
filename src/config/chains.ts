export const RPC_ENDPOINTS = {
  ethereum: [
    'https://eth.llamarpc.com',
    'https://ethereum.publicnode.com',
    'https://rpc.ankr.com/eth',
    'https://eth-pokt.nodies.app',
  ],
  polygon: [
    'https://polygon.llamarpc.com',
    'https://polygon-rpc.com',
    'https://rpc.ankr.com/polygon',
    'https://polygon-bor.publicnode.com',
  ],
  arbitrum: [
    'https://arbitrum.llamarpc.com',
    'https://arb1.arbitrum.io/rpc',
    'https://rpc.ankr.com/arbitrum',
  ],
  bsc: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc.publicnode.com',
    'https://rpc.ankr.com/bsc',
  ],
  avalanche: [
    'https://api.avax.network/ext/bc/C/rpc',
    'https://avalanche-c-chain-rpc.publicnode.com',
    'https://rpc.ankr.com/avalanche',
  ],
  optimism: [
    'https://mainnet.optimism.io',
    'https://optimism.publicnode.com',
    'https://rpc.ankr.com/optimism',
  ],
  base: [
    'https://mainnet.base.org',
    'https://base.publicnode.com',
    'https://rpc.ankr.com/base',
  ],
}

export const CHAIN_METADATA = {
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    chainId: 1,
    explorer: 'https://etherscan.io',
  },
  polygon: {
    name: 'Polygon',
    symbol: 'MATIC',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    chainId: 137,
    explorer: 'https://polygonscan.com',
  },
  arbitrum: {
    name: 'Arbitrum',
    symbol: 'ARB',
    logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    chainId: 42161,
    explorer: 'https://arbiscan.io',
  },
  bsc: {
    name: 'BNB Chain',
    symbol: 'BNB',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    chainId: 56,
    explorer: 'https://bscscan.com',
  },
  avalanche: {
    name: 'Avalanche',
    symbol: 'AVAX',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    chainId: 43114,
    explorer: 'https://snowtrace.io',
  },
  optimism: {
    name: 'Optimism',
    symbol: 'OP',
    logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
    chainId: 10,
    explorer: 'https://optimistic.etherscan.io',
  },
  base: {
    name: 'Base',
    symbol: 'ETH',
    logo: 'https://avatars.githubusercontent.com/u/108554348',
    chainId: 8453,
    explorer: 'https://basescan.org',
  },
}
