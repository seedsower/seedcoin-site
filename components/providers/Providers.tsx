'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Web3Provider } from './Web3Provider'

// Solana wallet adapters use browser-only APIs (indexedDB, localStorage).
// Load them dynamically with ssr:false to avoid SSR errors.
const SolanaProvider = dynamic(
  () => import('./SolanaProvider').then((m) => m.SolanaProvider),
  { ssr: false }
)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <SolanaProvider>{children}</SolanaProvider>
    </Web3Provider>
  )
}
