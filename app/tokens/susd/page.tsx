import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ContractAddress } from '@/components/ContractAddress'
import { TokenomicsBar } from '@/components/TokenomicsBar'
import { LiveStat } from '@/components/LiveStat'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { getPrices } from '@/lib/prices'
import { formatPercent } from '@/lib/utils'
import { SUSD_COLLATERAL } from '@/content/data/tokenomics'
import { Shield, TrendingUp, Lock } from 'lucide-react'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'SUSD — Seedstable',
  description:
    'SUSD (Seedstable) is a soft-pegged stablecoin backed by over-collateralized SEED positions. Learn about the peg mechanism, collateral composition, and current status.',
}

const SUSD_ETH_ADDRESS = process.env.NEXT_PUBLIC_SUSD_ETH_ADDRESS ?? '0x0000000000000000000000000000000000000001'

async function PegStats() {
  const data = await getPrices()

  const pegDeviation =
    data.susdPrice != null
      ? parseFloat(((data.susdPrice - 1) * 100).toFixed(3))
      : null

  const pegStatus =
    pegDeviation == null
      ? '—'
      : Math.abs(pegDeviation) < 0.1
      ? 'On peg'
      : `${pegDeviation > 0 ? '+' : ''}${pegDeviation}%`

  const isOnPeg = pegDeviation != null && Math.abs(pegDeviation) < 0.1

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <LiveStat
        label="SUSD Price"
        value={data.susdPrice != null ? `$${data.susdPrice.toFixed(4)}` : '—'}
        change={
          data.susdChange24h != null
            ? formatPercent(data.susdChange24h)
            : null
        }
        changePositive={
          data.susdChange24h != null ? data.susdChange24h >= 0 : null
        }
        size="lg"
      />
      <LiveStat
        label="Peg deviation"
        value={pegStatus}
        sublabel={isOnPeg ? 'Within tolerance' : 'Monitor closely'}
        size="lg"
      />
      <LiveStat
        label="Collateral ratio"
        value="150%+"
        sublabel="over-collateralized"
        size="lg"
      />
    </div>
  )
}

const MECHANISM_STEPS = [
  {
    icon: <Lock size={20} className="text-germ-2" />,
    title: 'Lock SEED collateral',
    description:
      'Deposit SEED tokens into the protocol vault at 150%+ collateral ratio. Your seeds remain on-chain — the smart contract holds them, not SeedCoin Ltd.',
  },
  {
    icon: <TrendingUp size={20} className="text-kernel" />,
    title: 'Mint SUSD',
    description:
      'The protocol mints SUSD against your locked collateral. You receive dollar-pegged tokens you can use in DeFi, for payments, or to hold as a stable store of value.',
  },
  {
    icon: <Shield size={20} className="text-stone-2" />,
    title: 'Stability mechanisms',
    description:
      'If SUSD deviates from $1, the protocol adjusts collateral requirements and activates the USDC stability reserve. Liquidations happen on-chain, transparently.',
  },
]

export default function SusdPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <div className="mb-10">
            <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-2">
              Seedstable · SUSD
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
              The stablecoin that grows.
            </h1>
            <p className="text-husk-2 text-xl leading-relaxed max-w-2xl">
              SUSD is a dollar-pegged stablecoin backed by over-collateralized
              SEED positions. Stability meets botanical backing.
            </p>
          </div>

          {/* Live peg stats */}
          <div className="card-glass p-6 mb-8">
            <Suspense
              fallback={
                <div className="grid grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-soil-3 rounded animate-pulse" />
                  ))}
                </div>
              }
            >
              <PegStats />
            </Suspense>
            <p className="text-[10px] text-stone mt-4 text-right">
              Peg data from CoinGecko · revalidates every 5 min
            </p>
          </div>

          {/* Contract address */}
          <div className="card-glass p-6 mb-8">
            <h2 className="text-sm font-semibold text-stone-2 uppercase tracking-wider mb-4">
              Contract address
            </h2>
            <ContractAddress
              chain="eth"
              address={SUSD_ETH_ADDRESS}
              label="Ethereum (ERC-20)"
            />
          </div>

          {/* Audit status — prominent for stablecoin */}
          <div className="rounded-lg border border-alert/30 bg-alert/10 p-5 mb-8">
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-alert flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-husk font-semibold mb-1" id="audit">Audit status</p>
                <p className="text-stone-2 text-sm">
                  SUSD is currently <strong className="text-husk">unaudited</strong>.
                  A security and economic model audit with a reputable DeFi auditing firm
                  is scheduled for Q2 2026. Until the audit is complete, we recommend
                  treating SUSD as experimental and sizing positions accordingly.{' '}
                  <Link href="/docs#audit" className="text-alert underline hover:text-husk">
                    View audit roadmap →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BotanicalDivider variant="vine" className="bg-soil py-2" />

      {/* Peg mechanism */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Mechanism
          </p>
          <h2 className="font-display text-3xl text-husk leading-heading mb-3">
            How the peg works
          </h2>
          <p className="text-stone-2 mb-10 max-w-xl">
            SUSD maintains its dollar peg through over-collateralization,
            stability reserves, and on-chain liquidation mechanisms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {MECHANISM_STEPS.map((step) => (
              <div key={step.title} className="card-glass p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-soil-3 flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl text-husk mb-2">{step.title}</h3>
                  <p className="text-stone-2 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Collateral composition */}
          <div className="card-glass p-6">
            <h3 className="font-display text-xl text-husk mb-2">Collateral composition</h3>
            <p className="text-stone-2 text-sm mb-6">
              SUSD is backed by a blend of SEED, USDC, and ETH. SEED makes up
              the majority — linking the stablecoin to the real-world seed reserve.
            </p>
            <TokenomicsBar segments={SUSD_COLLATERAL} />
          </div>
        </div>
      </section>

      {/* FAQ anchor */}
      <section className="section bg-soil border-t border-white/8">
        <div className="container-editorial text-center max-w-xl">
          <h2 className="font-display text-2xl text-husk mb-4">
            Questions about SUSD?
          </h2>
          <p className="text-stone-2 mb-6">
            Read the FAQ for answers to common questions about the peg mechanism,
            risks, and how to use SUSD in DeFi.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/faq#susd" className="btn-secondary">SUSD FAQ →</Link>
            <Link href="/docs" className="btn-secondary">Full whitepaper →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
