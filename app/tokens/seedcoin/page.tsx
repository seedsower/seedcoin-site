import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ContractAddress } from '@/components/ContractAddress'
import { TokenomicsBar } from '@/components/TokenomicsBar'
import { LiveStat } from '@/components/LiveStat'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { getPrices } from '@/lib/prices'
import { formatPrice, formatMarketCap, formatVolume, formatPercent } from '@/lib/utils'
import { SEED_TOKENOMICS, SEED_SUPPLY } from '@/content/data/tokenomics'
import { ShoppingCart, FileText, Shield } from 'lucide-react'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'SEED Token',
  description:
    'SEED is the native token of the SeedCoin protocol — backed by real seeds held in certified seed banks. Live price, tokenomics, contract addresses, and how to buy.',
}

const ETH_ADDRESS = process.env.NEXT_PUBLIC_SEED_ETH_ADDRESS ?? '0x0000000000000000000000000000000000000000'
const SOL_ADDRESS = process.env.NEXT_PUBLIC_SEED_SOL_ADDRESS ?? 'SeedXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

const HOW_TO_BUY = [
  {
    step: '1',
    title: 'Get a wallet',
    description:
      'Install MetaMask (Ethereum) or Phantom (Solana). Store your seed phrase somewhere physical — not digital.',
    link: null,
  },
  {
    step: '2',
    title: 'Get some ETH or SOL',
    description:
      'Purchase ETH or SOL on Coinbase, Kraken, or another exchange, then send to your self-custody wallet.',
    link: null,
  },
  {
    step: '3',
    title: 'Swap for SEED',
    description:
      'Connect your wallet to Uniswap (ETH) or Jupiter (SOL) and swap for SEED using the contract address above.',
    link: 'https://app.uniswap.org/',
  },
]

async function TokenPriceStats() {
  const data = await getPrices()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <LiveStat
        label="Price"
        value={formatPrice(data.seedPrice)}
        change={data.seedChange24h != null ? formatPercent(data.seedChange24h) : null}
        changePositive={data.seedChange24h != null ? data.seedChange24h >= 0 : null}
        size="lg"
      />
      <LiveStat
        label="Market Cap"
        value={formatMarketCap(data.seedMarketCap)}
        size="lg"
      />
      <LiveStat
        label="24h Volume"
        value={formatVolume(data.seedVolume24h)}
        size="lg"
      />
      <LiveStat
        label="Total Supply"
        value={SEED_SUPPLY.label}
        sublabel="fixed supply"
        size="lg"
      />
    </div>
  )
}

export default function SeedCoinPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-2">
                Protocol token
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-husk leading-display">
                SEED Token
              </h1>
              <p className="text-husk-2 mt-3 max-w-lg">
                The native asset of the SeedCoin protocol. Each SEED is backed by
                seeds in certified bank custody — verified on-chain.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="https://app.uniswap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ShoppingCart size={15} />
                Buy SEED
              </a>
              <Link href="/docs" className="btn-secondary">
                <FileText size={15} />
                Whitepaper
              </Link>
            </div>
          </div>

          {/* Live stats */}
          <div className="card-glass p-6 mb-8">
            <Suspense
              fallback={
                <div className="grid grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 bg-soil-3 rounded animate-pulse" />
                  ))}
                </div>
              }
            >
              <TokenPriceStats />
            </Suspense>
            <p className="text-[10px] text-stone mt-4 text-right">
              Data from CoinGecko · revalidates every 5 min
            </p>
          </div>

          {/* Contract addresses */}
          <div className="card-glass p-6 mb-8">
            <h2 className="text-sm font-semibold text-stone-2 uppercase tracking-wider mb-4">
              Contract addresses
            </h2>
            <div className="flex flex-col gap-4">
              <ContractAddress
                chain="eth"
                address={ETH_ADDRESS}
                label="Ethereum (ERC-20)"
              />
              <ContractAddress
                chain="sol"
                address={SOL_ADDRESS}
                label="Solana (SPL)"
              />
            </div>
          </div>

          {/* Audit status */}
          <div className="card-glass p-5 border border-alert/20 mb-8 flex items-start gap-3">
            <Shield size={18} className="text-alert flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-husk">Audit status</p>
              <p className="text-stone-2 text-sm mt-1">
                {/* TODO: Update with real audit status */}
                The SEED token contract is currently unaudited. A security audit
                with a reputable firm is scheduled for Q2 2026. Do not invest
                more than you are prepared to lose.{' '}
                <Link href="/docs#security" className="text-germ-2 underline hover:text-kernel">
                  View security roadmap →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <BotanicalDivider variant="leaf" className="bg-soil py-2" />

      {/* Tokenomics */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Tokenomics
          </p>
          <h2 className="font-display text-3xl text-husk leading-heading mb-3">
            Allocation breakdown
          </h2>
          <p className="text-stone-2 mb-8 max-w-xl">
            Fixed supply of {SEED_SUPPLY.label}. No inflation. Allocations are
            locked or vested as described below.
          </p>
          <div className="card-glass p-6">
            <TokenomicsBar segments={SEED_TOKENOMICS} />
          </div>
        </div>
      </section>

      {/* How to buy */}
      <section className="section bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            How to buy
          </p>
          <h2 className="font-display text-3xl text-husk leading-heading mb-10">
            Three steps to SEED
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TO_BUY.map((item) => (
              <div key={item.step} className="card-glass p-6 flex flex-col gap-4">
                <span className="font-mono text-4xl text-kernel/40 font-bold leading-none">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display text-xl text-husk mb-2">{item.title}</h3>
                  <p className="text-stone-2 text-sm leading-relaxed">{item.description}</p>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-auto text-sm py-2"
                  >
                    Open Uniswap
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg border border-stone/20 bg-soil-2/50 text-stone-2 text-xs leading-relaxed">
            <strong className="text-husk">Risk notice:</strong> SeedCoin is an
            experimental protocol. The SEED token may have low liquidity. Always
            verify the contract address above before transacting. Never share
            your private key or seed phrase with anyone.
          </div>
        </div>
      </section>
    </>
  )
}
