import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertCircle, Clock, ArrowRight } from 'lucide-react'
import { ReserveCard } from '@/components/ReserveCard'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { SEED_PARTNERS } from '@/content/data/partners'

export const metadata: Metadata = {
  title: 'Proof of Reserves',
  description:
    'SeedCoin reserves dashboard — partner seed banks, species held, custody documentation, and audit history. Transparency first.',
}

const LAST_UPDATED = '2026-04-10'

const SUMMARY_STATS = [
  { label: 'Partner seed banks', value: SEED_PARTNERS.length.toString() },
  {
    label: 'Active partnerships',
    value: SEED_PARTNERS.filter((p) => p.status === 'active').length.toString(),
  },
  {
    label: 'Total species (active)',
    value: SEED_PARTNERS.filter((p) => p.status === 'active')
      .reduce((s, p) => s + p.species, 0)
      .toLocaleString() || '—',
  },
  {
    label: 'Total seed on deposit (kg)',
    value:
      SEED_PARTNERS.filter((p) => p.status === 'active').reduce(
        (s, p) => s + p.quantityKg,
        0
      ) > 0
        ? SEED_PARTNERS.filter((p) => p.status === 'active')
            .reduce((s, p) => s + p.quantityKg, 0)
            .toLocaleString()
        : '—',
  },
]

export default function ReservesPage() {
  const activePartners = SEED_PARTNERS.filter((p) => p.status === 'active')
  const onboardingPartners = SEED_PARTNERS.filter((p) => p.status !== 'active')

  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
                Proof of reserves
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
                The vaults.
              </h1>
              <p className="text-husk-2 text-xl leading-relaxed max-w-2xl">
                Every seed held on behalf of SEED token holders, verified by
                independent audit. We publish this data because we have nothing
                to hide — and because trust must be earned.
              </p>
            </div>
            <div className="flex items-center gap-2 text-stone-2 text-sm whitespace-nowrap">
              <Clock size={14} />
              <span>Last updated: <strong className="text-husk">{LAST_UPDATED}</strong></span>
            </div>
          </div>

          {/* Beta notice */}
          <div className="rounded-lg border border-alert/30 bg-alert/10 p-5 mb-8 flex items-start gap-3">
            <AlertCircle size={20} className="text-alert flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-husk font-semibold mb-1">
                Reserves dashboard is in beta
              </p>
              <p className="text-stone-2 text-sm">
                We are actively onboarding our first custody partners. The
                partnerships listed here represent ongoing negotiations and
                onboarding processes — not yet finalized custody agreements.
                We are publishing this data now, in placeholder form, to
                demonstrate our commitment to transparency. Follow the{' '}
                <Link href="/dao#roadmap" className="text-alert underline hover:text-husk">
                  roadmap
                </Link>{' '}
                for milestone updates.
              </p>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {SUMMARY_STATS.map((stat) => (
              <div key={stat.label} className="card-glass p-5 text-center">
                <p className="font-mono text-2xl font-bold text-kernel">{stat.value}</p>
                <p className="text-stone-2 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BotanicalDivider variant="seed" className="bg-soil py-2" />

      {/* Active partners */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          {activePartners.length > 0 ? (
            <>
              <h2 className="font-display text-2xl text-husk leading-heading mb-8">
                Active custody partners
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePartners.map((partner) => (
                  <ReserveCard key={partner.id} partner={partner} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-display text-2xl text-stone mb-4">
                No active custody partnerships yet.
              </p>
              <p className="text-stone-2 text-sm max-w-md mx-auto">
                We&apos;re working on it. Follow our progress in the DAO forum or
                subscribe for updates.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Onboarding / pending partners */}
      {onboardingPartners.length > 0 && (
        <section className="section bg-soil">
          <div className="container-editorial">
            <h2 className="font-display text-2xl text-husk leading-heading mb-3">
              Partnerships in progress
            </h2>
            <p className="text-stone-2 mb-8">
              These institutions are in active negotiation or onboarding. Status
              is updated as agreements are formalized.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onboardingPartners.map((partner) => (
                <ReserveCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Methodology */}
      <section className="section bg-soil-2/30 border-t border-white/8">
        <div className="container-editorial max-w-3xl">
          <BotanicalDivider variant="vine" className="mb-10" />

          <h2 className="font-display text-2xl text-husk leading-heading mb-6">
            How reserves are verified
          </h2>

          <div className="prose-editorial space-y-4 text-sm">
            <p>
              SeedCoin uses a combination of independent physical audits,
              cryptographic attestations, and on-chain proof of reserves to
              verify that seed holdings match token supply. Here is our
              methodology:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong className="text-husk">Physical audit:</strong> An
                independent auditor visits each partner seed bank annually
                (or more frequently) to physically verify seed quantities,
                species counts, storage conditions, and custody documentation.
              </li>
              <li>
                <strong className="text-husk">Cryptographic attestation:</strong> The
                auditor signs a digital report, which is published to IPFS and
                linked from this page. The IPFS hash is recorded on-chain.
              </li>
              <li>
                <strong className="text-husk">On-chain recording:</strong> A
                designated oracle contract records reserve data on Ethereum.
                Anyone can verify that the on-chain numbers match the audit reports.
              </li>
              <li>
                <strong className="text-husk">Continuous monitoring:</strong> Between
                formal audits, seed banks provide monthly attestations of quantity
                and condition, also recorded on-chain.
              </li>
            </ol>
            <p>
              This methodology is aspirational until the first audit cycle is
              complete. We publish it now so the community can hold us
              accountable to it.
            </p>
          </div>

          <Link href="/faq#reserves" className="btn-secondary mt-8 inline-flex">
            FAQs about reserves <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
