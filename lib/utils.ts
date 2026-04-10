import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 0.01 ? 6 : value < 1 ? 4 : 2,
    maximumFractionDigits: value < 0.01 ? 6 : value < 1 ? 4 : 2,
  }).format(value)
}

export function formatMarketCap(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return '—'
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

export function formatVolume(value: number | null | undefined): string {
  return formatMarketCap(value)
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return '—'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncateAddress(address: string, chars = 6): string {
  if (!address) return ''
  return `${address.slice(0, chars)}…${address.slice(-4)}`
}

export function getBlockExplorerUrl(chain: 'eth' | 'sol' | 'polygon', address: string): string {
  switch (chain) {
    case 'eth':
      return `https://etherscan.io/token/${address}`
    case 'polygon':
      return `https://polygonscan.com/token/${address}`
    case 'sol':
      return `https://solscan.io/token/${address}`
  }
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seedcoin.org'
