import type { Metadata, Viewport } from 'next'
import './globals.css'
import { fraunces, inter, jetbrainsMono } from '@/lib/fonts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/providers/Providers'
import { cn } from '@/lib/utils'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seedcoin.org'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SeedCoin — A Currency You Can Plant',
    template: '%s | SeedCoin',
  },
  description:
    'SeedCoin is a cryptocurrency backed by real seeds held in certified seed banks. Not an abstract metaphor — actual seeds, actual vaults, on-chain proof of reserves.',
  keywords: [
    'SeedCoin',
    'SEED token',
    'SUSD stablecoin',
    'seed-backed cryptocurrency',
    'agricultural crypto',
    'seed bank',
    'DeFi',
    'Solana',
    'Ethereum',
  ],
  authors: [{ name: 'Tom Westlund', url: SITE_URL }],
  creator: 'SeedCoin Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'SeedCoin',
    title: 'SeedCoin — A Currency You Can Plant',
    description:
      'A cryptocurrency backed by real seeds held in certified seed banks. Planting the future of value.',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'SeedCoin — A Currency You Can Plant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@seedcoin',
    creator: '@seedcoin',
    title: 'SeedCoin — A Currency You Can Plant',
    description:
      'A cryptocurrency backed by real seeds held in certified seed banks.',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
    types: { 'application/rss+xml': `${SITE_URL}/blog/rss.xml` },
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1410',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

// JSON-LD Organisation schema
function OrganisationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SeedCoin',
    url: SITE_URL,
    logo: `${SITE_URL}/images/seedcoin-logo.png`,
    sameAs: [
      'https://x.com/seedcoin',
      'https://discord.gg/seedcoin',
      'https://t.me/seedcoin',
      'https://github.com/seedcoin',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@seedcoin.org',
      contactType: 'customer support',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Plausible analytics (privacy-respecting, no cookie banner)
function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? 'https://plausible.io'
  if (!domain) return null
  return (
    <script
      defer
      data-domain={domain}
      src={`${host}/js/script.js`}
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        fraunces.variable,
        inter.variable,
        jetbrainsMono.variable,
        'scroll-smooth'
      )}
    >
      <head>
        <OrganisationSchema />
        <PlausibleScript />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
