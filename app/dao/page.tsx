import type { Metadata } from 'next'
import Link from 'next/link'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { Vote, BookOpen, Users, Coins } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SeedDAO',
  description:
    'SeedDAO — on-chain governance for the SeedCoin protocol. Vote on proposals, manage the treasury, and shape the future of seed-backed value.',
}

const GOVERNANCE_FEATURES = [
  {
    icon: <Vote size={22} className="text-germ-2" />,
    title: 'On-chain proposals',
    description:
      'Any holder with 100,000 SEED can submit a governance proposal. Voting is weighted by SEED held — 1 token, 1 vote. Proposals live for 7 days.',
  },
  {
    icon: <Coins size={22} className="text-kernel" />,
    title: 'Treasury management',
    description:
      'The DAO controls the protocol treasury. Approved proposals can fund grants, partner onboarding, audits, and ecosystem development.',
  },
  {
    icon: <Users size={22} className="text-stone-2" />,
    title: 'Parameter governance',
    description:
      'Collateral ratios, liquidation thresholds, stability fees, and reserve allocation can all be adjusted through governance.',
  },
  {
    icon: <BookOpen size={22} className="text-husk-2" />,
    title: 'Seed bank mandates',
    description:
      'The DAO votes on which seed banks to partner with, which species to prioritize, and how custody agreements are structured.',
  },
]

const ROADMAP = [
  { label: 'SeedDAO v1 deployed', done: true, date: '2024 Q4' },
  { label: 'Snapshot governance live', done: true, date: '2025 Q1' },
  { label: 'On-chain treasury multisig', done: true, date: '2025 Q2' },
  { label: 'Full on-chain voting (Governor Bravo fork)', done: false, date: '2026 Q2' },
  { label: 'First custody partnership proposal', done: false, date: '2026 Q3' },
  { label: 'Community seed vault vote', done: false, date: '2026 Q4' },
]

export default function DAOPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Governance
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
            SeedDAO
          </h1>
          <p className="text-husk-2 text-xl leading-relaxed max-w-2xl mb-8">
            The protocol is governed by its community. SEED holders vote on
            everything from collateral ratios to which seed banks to partner with.
            No single entity controls SeedCoin.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://snapshot.org/#/seedcoin.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Vote size={15} />
              Vote on Snapshot
            </a>
            <a
              href="https://discord.gg/seedcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Join governance forum →
            </a>
          </div>
        </div>
      </section>

      <BotanicalDivider variant="leaf" className="bg-soil py-2" />

      {/* How governance works */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            How it works
          </p>
          <h2 className="font-display text-3xl text-husk leading-heading mb-10">
            Community-owned protocol
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {GOVERNANCE_FEATURES.map((feat) => (
              <div key={feat.title} className="card-glass p-6 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-soil-3 flex items-center justify-center flex-shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg text-husk mb-2">{feat.title}</h3>
                  <p className="text-stone-2 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Governance process */}
          <div className="card-glass p-6">
            <h3 className="font-display text-xl text-husk mb-6">
              Proposal lifecycle
            </h3>
            <ol className="space-y-4">
              {[
                { phase: 'Temperature check', desc: 'Post idea in the Discord #governance channel. Gauge community sentiment informally before writing a formal proposal.' },
                { phase: 'SeedCIP draft', desc: 'Write a SeedCoin Improvement Proposal (SeedCIP) using the template in the docs. Post to Snapshot for off-chain feedback.' },
                { phase: 'On-chain vote', desc: '7-day voting window. Quorum: 5% of circulating supply. Simple majority passes.' },
                { phase: 'Timelock execution', desc: 'Passed proposals enter a 48-hour timelock before execution, giving the community time to exit if they disagree.' },
              ].map((item, i) => (
                <li key={item.phase} className="flex gap-4 items-start">
                  <span className="font-mono text-kernel/50 text-xl font-bold w-6 flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-husk font-semibold text-sm">{item.phase}</span>
                    <p className="text-stone-2 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section bg-soil" id="roadmap">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Roadmap
          </p>
          <h2 className="font-display text-3xl text-husk leading-heading mb-10">
            Governance milestones
          </h2>

          <div className="space-y-4 max-w-2xl">
            {ROADMAP.map((item) => (
              <div
                key={item.label}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  item.done
                    ? 'border-germ/30 bg-germ/5'
                    : 'border-white/8 bg-soil-2/50'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    item.done
                      ? 'border-germ bg-germ text-husk'
                      : 'border-stone'
                  }`}
                >
                  {item.done && (
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <div className="flex-1">
                  <span
                    className={`font-medium text-sm ${
                      item.done ? 'text-husk' : 'text-stone-2'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-xs text-stone whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BotanicalDivider variant="vine" className="bg-soil py-2" />

      {/* CTA */}
      <section className="section bg-soil-2/30 border-t border-white/8">
        <div className="container-editorial text-center max-w-xl">
          <h2 className="font-display text-2xl text-husk mb-4">
            Your seeds. Your vote.
          </h2>
          <p className="text-stone-2 mb-6">
            Hold SEED, participate in governance, and help shape the future of
            seed-backed value.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tokens/seedcoin" className="btn-primary">Get SEED</Link>
            <a
              href="https://snapshot.org/#/seedcoin.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View active proposals →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
