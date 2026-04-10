'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

// Both wallet providers use browser-only APIs (indexedDB, localStorage,
// crypto.subtle) at module evaluation time.  Load them with ssr:false so
// they are never evaluated in Netlify's serverless runtime.
const Web3Provider = dynamic(
  () => import('./Web3Provider').then((m) => m.Web3Provider),
  { ssr: false }
)

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
