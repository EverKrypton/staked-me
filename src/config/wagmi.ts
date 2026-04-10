import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, bsc, avalanche, optimism, base } from 'wagmi/chains'
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const projectId = 'staked-me'

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, bsc, avalanche, optimism, base],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'Staked.me' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http('https://eth.llamarpc.com'),
    [polygon.id]: http('https://polygon.llamarpc.com'),
    [arbitrum.id]: http('https://arbitrum.llamarpc.com'),
    [bsc.id]: http('https://bsc-dataseed1.binance.org'),
    [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
    [optimism.id]: http('https://mainnet.optimism.io'),
    [base.id]: http('https://mainnet.base.org'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
