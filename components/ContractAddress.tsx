'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { truncateAddress, getBlockExplorerUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ContractAddressProps {
  chain: 'eth' | 'sol' | 'polygon'
  address: string
  label?: string
  className?: string
  showFull?: boolean
}

const CHAIN_META: Record<
  ContractAddressProps['chain'],
  { label: string; badgeClass: string; shortLabel: string }
> = {
  eth: {
    label: 'Ethereum',
    shortLabel: 'ETH',
    badgeClass: 'badge-eth',
  },
  polygon: {
    label: 'Polygon',
    shortLabel: 'MATIC',
    badgeClass: 'bg-purple-900/50 text-purple-300',
  },
  sol: {
    label: 'Solana',
    shortLabel: 'SOL',
    badgeClass: 'badge-sol',
  },
}

export function ContractAddress({
  chain,
  address,
  label,
  className,
  showFull = false,
}: ContractAddressProps) {
  const [copied, setCopied] = useState(false)
  const meta = CHAIN_META[chain]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-xs text-stone-2 uppercase tracking-widest font-medium">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-full font-mono',
            meta.badgeClass
          )}
        >
          {meta.shortLabel}
        </span>
        <code className="font-mono text-sm text-husk-2 bg-soil-3 px-2.5 py-1 rounded-md">
          {showFull ? address : truncateAddress(address, 8)}
        </code>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : `Copy ${meta.label} contract address`}
          title={copied ? 'Copied!' : 'Copy address'}
          className={cn(
            'p-1.5 rounded-md transition-colors',
            copied
              ? 'text-germ-2 bg-germ/10'
              : 'text-stone hover:text-husk hover:bg-white/8'
          )}
        >
          {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
        </button>
        <a
          href={getBlockExplorerUrl(chain, address)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View on ${meta.label} block explorer`}
          title={`View on ${meta.label} explorer`}
          className="p-1.5 rounded-md text-stone hover:text-husk hover:bg-white/8 transition-colors"
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
