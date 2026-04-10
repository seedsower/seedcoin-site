import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ArrowRight, BookOpen, BarChart3 } from 'lucide-react'

import { StatsStrip } from '@/components/StatsStrip'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { HowItWorks } from '@/components/HowItWorks'
import { ReserveCard } from '@/components/ReserveCard'
import { BlogCard } from '@/components/BlogCard'
import { NewsletterForm } from '@/components/NewsletterForm'

import { getBlogPosts } from '@/lib/mdx'
import { SEED_PARTNERS } from '@/content/data/partners'

export const metadata: Metadata = {
  title: 'SeedCoin — A Currency You Can Plant',
  description:
    'SeedCoin is a cryptocurrency backed by real seeds held in certified seed banks. Not a metaphor — actual seeds, actual vaults, on-chain proof of reserves.',
}

function SkeletonStat() {
  return (
    <div className="h-14 bg-soil-3 rounded-md animate-pulse" />
  )
}

export default async function HomePage() {
  const posts = getBlogPosts().slice(0, 3)
  const previewPartners = SEED_PARTNERS.slice(0, 3)

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background video (muted, looping germination footage) */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            aria-hidden
          >
            {/* TODO: Replace with high-quality germination video */}
            <source src="/videos/germination.mp4" type="video/mp4" />
          </video>
          {/* Soil gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-soil via-soil/95 to-soil/60" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soil to-transparent" />
        </div>

        <div className="container-editorial relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-20">
          {/* Left: copy */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <p className="text-germ-2 text-sm font-semibold uppercase tracking-widest mb-4">
                Since 2013 · Now on Ethereum &amp; Solana
              </p>
              <h1 className="font-display text-husk leading-display text-5xl md:text-6xl xl:text-7xl mb-6">
                A currency<br />
                <em className="not-italic text-germ-2">you can plant.</em>
              </h1>
              <p className="text-husk-2 text-lg md:text-xl leading-relaxed max-w-lg">
                SeedCoin is a cryptocurrency backed by real seeds, held in
                certified seed banks. Not a metaphor. Actual seeds. Actual
                vaults. Verifiable on-chain.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/reserves" className="btn-primary">
                <BarChart3 size={16} aria-hidden />
                View reserves
              </Link>
              <Link href="/docs" className="btn-secondary">
                <BookOpen size={16} aria-hidden />
                Read the whitepaper
              </Link>
            </div>

            {/* Pill badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Real seed collateral', color: 'text-germ-2 border-germ/30' },
                { label: 'DAO-governed', color: 'text-kernel border-kernel/30' },
                { label: 'On-chain reserves', color: 'text-stone-2 border-stone/30' },
              ].map((pill) => (
                <span
                  key={pill.label}
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${pill.color} bg-soil-2/60`}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: botanical illustration / video placeholder */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-germ/20 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-kernel/10 animate-[spin_40s_linear_infinite_reverse]" />

              {/* Seed illustration placeholder */}
              <div className="absolute inset-12 rounded-full bg-soil-2 border border-white/8 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/seed-illustration.png"
                  alt="Botanical seed illustration"
                  fill
                  className="object-contain p-8 opacity-80"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowRight size={14} className="rotate-90" />
        </div>
      </section>

      {/* ── LIVE STATS STRIP ──────────────────────────────────────────── */}
      <Suspense fallback={<div className="border-y border-white/8 py-5"><div className="container-editorial grid grid-cols-5 gap-8">{Array.from({length: 5}).map((_, i) => <SkeletonStat key={i} />)}</div></div>}>
        <StatsStrip />
      </Suspense>

      {/* ── THE THESIS ────────────────────────────────────────────────── */}
      <section className="section bg-soil">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Text */}
            <div className="lg:col-span-7">
              <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
                The thesis
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-husk leading-display mb-8">
                Money used to mean something<br />
                <em className="not-italic text-kernel">you could hold in your hands.</em>
              </h2>

              <div className="space-y-5 text-husk-2 leading-relaxed">
                <p>
                  Gold worked for centuries because it was scarce, durable, and
                  universally recognized. Then we moved to abstractions: fiat
                  currency, digital ledgers, tokens backed by nothing but
                  consensus. We&apos;re not against consensus — blockchain is a
                  powerful tool. But we think value should be anchored to
                  something real.
                </p>
                <p>
                  Seeds are the most fundamental store of value on earth. They
                  are the genetic heritage of ten thousand years of agriculture.
                  They are renewable, self-replicating, and — unlike any other
                  asset class — they can feed people. A seed bank is humanity&apos;s
                  original distributed ledger: immutable, decentralized, and
                  stored across dozens of facilities worldwide.
                </p>
                <p>
                  SeedCoin connects that ancient system to the modern one. Each
                  SEED token corresponds to a real quantity of seed, held in a
                  certified seed bank, auditable on-chain. The SUSD stablecoin is
                  minted against over-collateralized SEED positions, giving you
                  the stability of a dollar-peg with the backing of something
                  that grows.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="pull-quote mt-10">
                &ldquo;Humans can&apos;t eat gold. They can&apos;t plant a Bitcoin.
                But they&apos;ve been planting seeds for ten thousand years,
                and they&apos;ll be planting them long after every fiat currency
                has been forgotten.&rdquo;
                <footer className="mt-4 text-sm text-stone-2 not-italic font-sans">
                  — Tom Westlund, SeedCoin Forward, 2013
                </footer>
              </blockquote>
            </div>

            {/* Botanical illustration */}
            <div className="lg:col-span-5 flex flex-col items-center gap-8">
              <div className="relative w-full max-w-xs mx-auto">
                <Image
                  src="/images/botanical-wheat.png"
                  alt="19th-century botanical illustration of wheat"
                  width={400}
                  height={550}
                  className="w-full opacity-60 mix-blend-luminosity"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-stone italic">
                  Triticum aestivum — common wheat<br />
                  From the Biodiversity Heritage Library, circa 1885
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BotanicalDivider variant="seed" className="py-2" />

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
              How it works
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-husk leading-heading">
              From collateral to canopy
            </h2>
            <p className="text-stone-2 mt-3 max-w-xl mx-auto">
              Four steps from your deposit to a living reserve of seed — and back again.
            </p>
          </div>

          <HowItWorks />

          <div className="text-center mt-12">
            <Link href="/docs" className="btn-secondary">
              Read the full whitepaper →
            </Link>
          </div>
        </div>
      </section>

      <BotanicalDivider variant="leaf" flip className="py-2" />

      {/* ── RESERVES PREVIEW ─────────────────────────────────────────── */}
      <section className="section bg-soil">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
                Proof of reserves
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-husk leading-heading">
                The vaults are real.
              </h2>
              <p className="text-stone-2 mt-2 max-w-lg">
                Partner seed banks, species counts, custody documentation. Updated after each audit.
              </p>
            </div>
            <Link
              href="/reserves"
              className="btn-secondary whitespace-nowrap self-start md:self-auto"
            >
              View full reserves →
            </Link>
          </div>

          {/* Beta notice */}
          <div className="mb-8 px-4 py-3 rounded-lg border border-alert/30 bg-alert/10 text-alert text-sm">
            <strong>Reserves dashboard is in beta.</strong> We are onboarding our first custody
            partners — see the{' '}
            <Link href="/dao#roadmap" className="underline hover:text-kernel">
              roadmap
            </Link>{' '}
            for current status.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewPartners.map((partner) => (
              <ReserveCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <BotanicalDivider variant="vine" className="py-2" />

      {/* ── LATEST FROM THE BLOG ─────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="section bg-soil-2/30">
          <div className="container-editorial">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
                  Latest
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-husk leading-heading">
                  From the seed vault
                </h2>
              </div>
              <Link href="/blog" className="btn-secondary whitespace-nowrap">
                All posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER CTA ───────────────────────────────────────────── */}
      <section className="section bg-soil border-t border-white/8">
        <div className="container-editorial max-w-2xl text-center">
          <BotanicalDivider variant="stem" className="mb-8" />
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Stay rooted
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-husk leading-heading mb-4">
            Protocol updates, reserve news,<br />governance announcements.
          </h2>
          <p className="text-stone-2 mb-8">
            No spam. No noise. Just what matters for SEED holders.
          </p>
          <NewsletterForm variant="hero" className="max-w-md mx-auto" />
        </div>
      </section>
    </>
  )
}
