import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactForm } from '@/components/ContactForm'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { Mail, MessageSquare, Globe, Sprout } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with SeedCoin — general inquiries, partnership proposals, press, and seed bank onboarding.',
}

const CHANNELS = [
  {
    icon: <Mail size={20} className="text-germ-2" />,
    title: 'Email',
    value: 'info@seedcoin.org',
    href: 'mailto:info@seedcoin.org',
    description: 'For all inquiries. We reply within 2–3 business days.',
  },
  {
    icon: <MessageSquare size={20} className="text-kernel" />,
    title: 'Discord',
    value: 'discord.gg/seedcoin',
    href: 'https://discord.gg/seedcoin',
    description: 'Fastest response for community and technical questions.',
  },
  {
    icon: <Globe size={20} className="text-stone-2" />,
    title: 'Twitter / X',
    value: '@seedcoin',
    href: 'https://x.com/seedcoin',
    description: 'Protocol announcements and community updates.',
  },
  {
    icon: <Sprout size={20} className="text-germ-2" />,
    title: 'Seed bank partnerships',
    value: 'partnerships@seedcoin.org',
    href: 'mailto:partnerships@seedcoin.org',
    description: 'For seed banks and agricultural organizations interested in partnering.',
  },
]

function ContactFormWithSearchParams() {
  // In production, parse searchParams for defaultType
  // Using client component approach via Suspense boundary
  return <ContactForm />
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Get in touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
            Let&apos;s talk.
          </h1>
          <p className="text-husk-2 text-xl leading-relaxed max-w-2xl">
            Whether you&apos;re a seed bank, a DeFi protocol, a journalist, or
            just curious — we want to hear from you.
          </p>
        </div>
      </section>

      <BotanicalDivider variant="seed" className="bg-soil py-2" />

      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-display text-2xl text-husk leading-heading mb-6">
                Send a message
              </h2>
              <Suspense fallback={<div className="h-96 bg-soil-3 rounded-lg animate-pulse" />}>
                <ContactFormWithSearchParams />
              </Suspense>
            </div>

            {/* Contact channels */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl text-husk leading-heading mb-2">
                Other ways to reach us
              </h2>

              <div className="space-y-4">
                {CHANNELS.map((ch) => (
                  <a
                    key={ch.title}
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                    rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="card-glass p-5 flex gap-4 hover:bg-soil-3/50 transition-colors block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-soil-3 flex items-center justify-center flex-shrink-0">
                      {ch.icon}
                    </div>
                    <div>
                      <p className="text-stone-2 text-xs uppercase tracking-wider mb-0.5">
                        {ch.title}
                      </p>
                      <p className="text-husk font-medium text-sm">{ch.value}</p>
                      <p className="text-stone-2 text-xs mt-1">{ch.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Partnership CTA */}
              <div className="card-glass p-5 border border-germ/20 mt-2">
                <h3 className="text-husk font-semibold text-sm mb-2 flex items-center gap-2">
                  <Sprout size={16} className="text-germ-2" />
                  Seed bank partners
                </h3>
                <p className="text-stone-2 text-sm leading-relaxed">
                  If you represent a seed bank, botanical garden, or agricultural
                  heritage organization, we&apos;re particularly interested in
                  speaking with you. Select &quot;Seed bank partner&quot; in the
                  form, or email{' '}
                  <a
                    href="mailto:partnerships@seedcoin.org"
                    className="text-germ-2 underline"
                  >
                    partnerships@seedcoin.org
                  </a>{' '}
                  directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
