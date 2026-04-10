import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About SeedCoin',
  description:
    'The story of SeedCoin — from a 2013 Litecoin fork to a protocol that anchors cryptocurrency value in real, living seeds held in certified seed banks.',
}

// Timeline events
const TIMELINE = [
  {
    year: '2013',
    title: 'Genesis',
    body: 'Tom Westlund forks Litecoin to create SeedCoin, publishing the original Forward with the thesis that currencies should be backed by something humans can actually eat and plant. The initial supply is distributed to early community members.',
  },
  {
    year: '2014–2018',
    title: 'Community building',
    body: 'The SeedCoin community grows to thousands of holders across Bitcointalk, Reddit, and early crypto forums. The project explores seed-bank partnerships and refines the legal structure for real-world asset backing.',
  },
  {
    year: '2019–2022',
    title: 'DeFi infrastructure',
    body: 'The core team begins rebuilding the protocol on Ethereum, designing smart contracts for seed-backed collateral vaults. The SUSD stablecoin concept is formalized in the v2 whitepaper.',
  },
  {
    year: '2023',
    title: 'Solana expansion',
    body: 'SEED token is bridged to Solana for lower-fee transactions. The SeedDAO is established, giving the community formal governance rights over treasury and protocol parameters.',
  },
  {
    year: '2024',
    title: 'Reserve onboarding begins',
    body: 'SeedCoin initiates formal discussions with the Svalbard Global Seed Vault and Kew Millennium Seed Bank. Legal frameworks for custody partnerships are negotiated.',
  },
  {
    year: '2025–Present',
    title: 'SUSD launch & reserves dashboard',
    body: 'SUSD stablecoin launches on Ethereum mainnet. The reserves dashboard goes live, providing on-chain attestation of seed holdings. First custody agreements expected to close.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            About SeedCoin
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-8 max-w-3xl">
            Currency backed by something that grows.
          </h1>
          <p className="text-husk-2 text-xl leading-relaxed max-w-2xl">
            In 2013, Tom Westlund asked a simple question: why can&apos;t
            money be backed by something humans actually need? Not gold, not
            oil — seeds. The biological code of civilization itself.
          </p>
        </div>
      </section>

      <BotanicalDivider variant="seed" className="bg-soil py-4" />

      {/* ── SEEDS AS CURRENCY ─────────────────────────────────────────── */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 prose-editorial">
              <h2 className="font-display text-3xl md:text-4xl text-husk leading-heading mb-6">
                A history as old as civilization
              </h2>

              <p>
                Seeds have been used as currency, collateral, and tribute for as
                long as humans have farmed. Ancient Mesopotamia tracked grain
                deposits on clay tablets — the world&apos;s first ledgers. The
                Silk Road traded seeds alongside spices. Colonial powers extracted
                agricultural genetic wealth alongside physical resources.
              </p>
              <p>
                The value of seeds is not abstract. A single seed variety can
                represent ten thousand years of selective breeding. The loss of
                biodiversity — documented by institutions like the Svalbard Seed
                Vault — is the loss of irreplaceable genetic capital. Seeds are
                literally life-supporting technology that cannot be recreated once
                lost.
              </p>
              <p>
                SeedCoin doesn&apos;t romanticize this. We&apos;re building financial
                infrastructure. But we believe that financial infrastructure
                should be grounded in reality, and seeds are as real as value gets.
              </p>

              <h3 className="font-display text-2xl text-husk leading-heading mt-8 mb-4">
                Why not gold? Why not Bitcoin?
              </h3>
              <p>
                Gold is durable and scarce, but it is inert. It doesn&apos;t feed
                anyone. It can&apos;t be replicated or renewed. Bitcoin is
                brilliant in its scarcity mechanism, but it has no physical
                anchor — its value is entirely a function of consensus.
              </p>
              <p>
                Seeds combine the best attributes of both: they have intrinsic
                utility (they grow food), they are naturally scarce per variety
                (each species&apos; genetic information is unique and finite), and
                they are decentralizable (seed banks exist on every continent).
                Add blockchain attestation and you have an asset class that is
                simultaneously ancient and cutting-edge.
              </p>

              <blockquote className="pull-quote">
                &ldquo;Humans can&apos;t eat gold. They can&apos;t plant a Bitcoin.
                But they&apos;ve been planting seeds for ten thousand years,
                and they&apos;ll be planting them long after every fiat currency
                has been forgotten.&rdquo;
                <footer className="mt-3 text-sm text-stone-2 not-italic font-sans">
                  — Tom Westlund, SeedCoin Forward, 2013
                </footer>
              </blockquote>
            </div>

            {/* Illustration column */}
            <aside className="lg:col-span-5 flex flex-col gap-8">
              <div className="card-glass p-6">
                <Image
                  src="/images/botanical-corn.png"
                  alt="Botanical illustration of Zea mays (maize)"
                  width={380}
                  height={480}
                  className="w-full opacity-60 mix-blend-luminosity"
                />
                <p className="text-xs text-stone italic text-center mt-3">
                  Zea mays — maize<br />
                  Biodiversity Heritage Library, circa 1891
                </p>
              </div>

              <div className="card-glass p-5 space-y-3">
                <h3 className="text-sm font-semibold text-husk uppercase tracking-wider">
                  By the numbers
                </h3>
                {[
                  { label: 'Seed species at risk of extinction', value: '~30,000' },
                  { label: 'Seeds deposited in Svalbard vault', value: '1.3M+' },
                  { label: 'Years of human seed banking', value: '10,000+' },
                  { label: 'Years of Bitcoin (for comparison)', value: '~16' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-start gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0">
                    <span className="text-stone-2 text-sm">{stat.label}</span>
                    <span className="font-mono text-kernel font-semibold whitespace-nowrap">{stat.value}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────── */}
      <section className="section bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            History
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-husk leading-heading mb-12">
            How we got here
          </h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-soil-3 -translate-x-1/2" aria-hidden />

            <ol className="space-y-10">
              {TIMELINE.map((event, i) => (
                <li key={event.year} className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Date bubble */}
                  <div className="flex-shrink-0 w-10 md:w-1/2 flex md:justify-end items-start">
                    <div className={`relative z-10 w-8 h-8 rounded-full border-2 border-germ bg-soil flex items-center justify-center`}>
                      <div className="w-2 h-2 rounded-full bg-germ" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:w-1/2 pb-2">
                    <div className="card-glass p-5">
                      <span className="font-mono text-kernel text-sm font-bold">{event.year}</span>
                      <h3 className="font-display text-xl text-husk mt-1 mb-2">{event.title}</h3>
                      <p className="text-stone-2 text-sm leading-relaxed">{event.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── FOUNDER STORY ─────────────────────────────────────────────── */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial max-w-3xl">
          <BotanicalDivider variant="vine" className="mb-10" />

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="relative w-28 h-28 flex-shrink-0 rounded-full overflow-hidden border-2 border-germ/40">
              <Image
                src="/images/team/tom-westlund.jpg"
                alt="Tom Westlund, SeedCoin founder"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl text-husk mb-1">Tom Westlund</h2>
              <p className="text-germ-2 text-sm font-medium mb-4">Founder, SeedCoin · Since 2013</p>
              <div className="prose-editorial space-y-4 text-sm">
                <p>
                  Tom has been working at the intersection of permaculture,
                  open-source software, and alternative economics since the early
                  2010s. He first encountered Bitcoin in 2011 and immediately began
                  asking: what would a currency look like if it were backed by
                  biological value rather than computational work?
                </p>
                <p>
                  The answer became SeedCoin — launched in 2013 as a Litecoin fork
                  with a forward that remains the protocol&apos;s philosophical
                  foundation. Tom continues to lead the project, negotiating with
                  seed banks, designing governance structures, and communicating the
                  thesis to an increasingly receptive audience.
                </p>
              </div>
              <Link href="/team" className="btn-secondary mt-5 text-sm py-2 px-4 inline-flex">
                Meet the full team <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALLS TO ACTION ───────────────────────────────────────────── */}
      <section className="section bg-soil border-t border-white/8">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl text-husk mb-4">Ready to dig in?</h2>
          <p className="text-stone-2 mb-8 max-w-md mx-auto">
            Read the whitepaper, explore the reserves, or join the community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/docs" className="btn-primary">Read the whitepaper</Link>
            <Link href="/reserves" className="btn-secondary">View reserves</Link>
            <Link href="/dao" className="btn-secondary">Join the DAO</Link>
          </div>
        </div>
      </section>
    </>
  )
}
