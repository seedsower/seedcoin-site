'use client'

import { ReactNode, useState } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { connectors } = getDefaultWallets({
  appName: 'SeedCoin',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
})

const wagmiConfig = createConfig({
  chains: [mainnet, polygon],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true,
})

const rainbowTheme = darkTheme({
  accentColor: '#3d7a3a',
  accentColorForeground: '#f5efe4',
  borderRadius: 'medium',
  fontStack: 'system',
})

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowTheme} locale="en-US">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
