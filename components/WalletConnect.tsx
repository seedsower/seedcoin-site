'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

type Chain = 'eth' | 'sol'

export function WalletConnect({ className }: { className?: string }) {
  const [activeChain, setActiveChain] = useState<Chain>('eth')
  const { setVisible } = useWalletModal()
  const { connected: solConnected, disconnect: solDisconnect, publicKey } = useWallet()

  if (activeChain === 'eth') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <button
          onClick={() => setActiveChain('sol')}
          className="text-xs text-stone-400 hover:text-husk transition-colors px-2"
          title="Switch to Solana"
        >
          ETH
        </button>
        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus="avatar"
        />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={() => setActiveChain('eth')}
        className="text-xs text-stone-400 hover:text-husk transition-colors px-2"
        title="Switch to Ethereum"
      >
        SOL
      </button>
      {solConnected && publicKey ? (
        <button
          onClick={() => solDisconnect()}
          className="btn-secondary text-sm py-2 px-3"
        >
          <Wallet size={14} />
          {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
        </button>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="btn-secondary text-sm py-2 px-3"
        >
          <Wallet size={14} />
          Connect
        </button>
      )}
    </div>
  )
}
