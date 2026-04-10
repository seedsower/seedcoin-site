import type { Metadata } from 'next'
import Link from 'next/link'
import { TeamCard } from '@/components/TeamCard'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { TEAM, ADVISORS } from '@/content/data/team'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the people building SeedCoin — from the 2013 founder to our growing team of engineers, partnership leads, and community builders.',
}

export default function TeamPage() {
  const [founder, ...rest] = TEAM

  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            The team
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
            The people behind the seeds.
          </h1>
          <p className="text-husk-2 text-xl leading-relaxed max-w-2xl">
            Builders, agronomists, and DeFi veterans united by the belief that
            money should mean something tangible.
          </p>
        </div>
      </section>

      <BotanicalDivider variant="seed" className="bg-soil py-2" />

      {/* Founder — featured card */}
      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <p className="text-xs uppercase tracking-widest text-stone font-semibold mb-8">
            Founder
          </p>
          {founder && (
            <TeamCard member={{ ...founder, featured: true }} className="max-w-3xl" />
          )}
        </div>
      </section>

      {/* Rest of team */}
      {rest.length > 0 && (
        <section className="section bg-soil">
          <div className="container-editorial">
            <p className="text-xs uppercase tracking-widest text-stone font-semibold mb-8">
              Core team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BotanicalDivider variant="leaf" flip className="bg-soil py-2" />

      {/* Advisors */}
      {ADVISORS.length > 0 && (
        <section className="section bg-soil-2/30">
          <div className="container-editorial">
            <p className="text-xs uppercase tracking-widest text-stone font-semibold mb-8">
              Advisors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADVISORS.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join us */}
      <section className="section bg-soil border-t border-white/8">
        <div className="container-editorial text-center max-w-xl">
          <BotanicalDivider variant="vine" className="mb-8" />
          <h2 className="font-display text-2xl text-husk mb-4">
            Want to help build SeedCoin?
          </h2>
          <p className="text-stone-2 mb-6">
            We&apos;re always looking for developers, seed scientists, community
            builders, and people who believe money should be backed by something
            real. Reach out.
          </p>
          <Link href="/contact?type=general" className="btn-primary">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
