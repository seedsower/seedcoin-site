# SeedCoin — Marketing & Community Site

Next.js 15 rebuild of seedcoin.org. Replaces the WordPress/Elementor stack with a maintainable, high-performance site with MDX content, live price data, and Web3 wallet integration.

---

## Tech decisions

### MDX: `next-mdx-remote` + `gray-matter`

We evaluated two options specified in the brief:

- **contentlayer** — unmaintained since late 2023; last release August 2023, repo archived. Do not use.
- **fumadocs-mdx** — actively maintained and excellent, but designed for documentation sites with sidebar navigation. Overkill for a blog + FAQ use case.

We chose **`next-mdx-remote`** with **`gray-matter`** for frontmatter parsing. This is the simplest, most reliable approach for a marketing site with blog posts and FAQs. It works natively with Next.js App Router RSC (`next-mdx-remote/rsc`), has no build-step magic, and is widely understood by any Next.js developer.

---

## Local development

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Setup

```bash
git clone https://github.com/seedcoin/seedcoin-site
cd seedcoin-site
pnpm install
cp .env.example .env.local
# Fill in required env vars (see below)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes (for wallet) | Get at [cloud.walletconnect.com](https://cloud.walletconnect.com) |
| `COINGECKO_API_KEY` | No | Free tier works without key; key increases rate limits |
| `NEXT_PUBLIC_SEED_ETH_ADDRESS` | Yes | SEED ERC-20 contract address on Ethereum |
| `NEXT_PUBLIC_SEED_SOL_ADDRESS` | Yes | SEED SPL mint address on Solana |
| `NEXT_PUBLIC_SUSD_ETH_ADDRESS` | Yes | SUSD ERC-20 contract address on Ethereum |
| `RESEND_API_KEY` | Yes (for forms) | [resend.com](https://resend.com) — contact + newsletter emails |
| `RESEND_FROM_ADDRESS` | No | Default: `noreply@seedcoin.org` |
| `CONTACT_TO_ADDRESS` | No | Default: `info@seedcoin.org` |
| `UPSTASH_REDIS_REST_URL` | Yes (for rate limiting) | [upstash.com](https://upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Yes (for rate limiting) | |
| `DATABASE_URL` | Yes (for newsletter) | Neon Postgres connection string |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | e.g. `seedcoin.org` |
| `NEXT_PUBLIC_PLAUSIBLE_HOST` | No | Default: `https://plausible.io` |
| `NEXT_PUBLIC_SITE_URL` | No | Default: `https://seedcoin.org` |

**The site works without most of these.** In dev, forms log to console, rate limiting is bypassed, and price data falls back to `—`.

---

## How to add a blog post

1. Create a new `.mdx` file in `content/blog/`:

```bash
touch content/blog/my-post-slug.mdx
```

2. Add frontmatter at the top:

```mdx
---
title: "Post title"
date: "2026-04-10"
author: "Tom Westlund"
cover: "/images/blog/my-cover.jpg"
tags: ["Tag1", "Tag2"]
excerpt: "One or two sentences describing the post."
---

Your MDX content here...
```

3. Add the cover image to `public/images/blog/`.
4. The post automatically appears in the blog grid and RSS feed.

### Available MDX components

In content files, you can use:

- `<Callout type="info|warning|success">` — highlighted note box
- `<PullQuote>` — large italic pull quote
- `<ContractAddress chain="eth|sol" address="0x..." />` — copy button + explorer link
- `<BotanicalDivider variant="seed|stem|leaf|vine" />` — decorative section break

---

## How to update reserves data

Edit `content/data/partners.ts`. Each partner is a `SeedPartner` object:

```typescript
{
  id: 'unique-id',
  name: 'Seed Bank Name',
  location: 'City',
  country: 'Country',
  photo: '/images/partners/photo.jpg',
  species: 1200,            // number of species held
  quantityKg: 450,          // quantity in kilograms
  lastAudit: '2026-03-01',  // ISO date string
  custodyDoc: 'https://...', // link to PDF (optional)
  description: 'One paragraph about the partner.',
  status: 'active' | 'pending' | 'onboarding',
}
```

Set `status: 'active'` only when a formal custody agreement is signed and an audit has been completed. Use `'onboarding'` or `'pending'` for everything in progress. **Honesty here matters more than impressive numbers.**

---

## How to update tokenomics

Edit `content/data/tokenomics.ts`. The `SEED_TOKENOMICS` and `SUSD_COLLATERAL` arrays drive the stacked bar charts on the token pages.

Each segment:

```typescript
{
  label: 'Community & Ecosystem',
  percent: 40,
  color: '#3d7a3a',
  description: 'Optional one-line description shown in legend',
}
```

Percentages should sum to 100.

---

## How to update team bios

Edit `content/data/team.ts`. Add or update `TeamMember` objects in the `TEAM` array (for core team) or `ADVISORS` array.

Place team photos at `public/images/team/[name].jpg`. Aim for square or portrait crops, min 400×400px.

---

## Deploy to Vercel

```bash
vercel deploy
```

Set all environment variables in the Vercel project dashboard. The build requires no `vercel.json` — all Next.js defaults apply.

**Database setup:** Before the first deploy, run the newsletter table migration. Connect to your Neon database and run:

```sql
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id         BIGSERIAL PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Performance targets

- Lighthouse 95+ on mobile for all pages
- All images use `next/image` with explicit dimensions
- Fonts self-hosted via `next/font/google`
- No CLS from font swaps
- `prefers-reduced-motion` disables all Framer Motion animations

---

## Phase 2: docs migration

The current GitBook at [seedcoin.gitbook.io/seedcoin](https://seedcoin.gitbook.io/seedcoin) is linked from `/docs` (redirect). Migrating the full documentation into the site using [Fumadocs](https://fumadocs.vercel.app/) is a planned phase-2 task. Fumadocs is excellent for in-site documentation with full-text search, TOC, and MDX — it's just more than we need for the initial launch.

---

## Project structure

```
app/                      Next.js App Router pages
  layout.tsx              Root layout (fonts, providers, header, footer)
  page.tsx                Home page
  about/page.tsx
  tokens/
    seedcoin/page.tsx     SEED token page
    susd/page.tsx         SUSD stablecoin page
  reserves/page.tsx
  dao/page.tsx
  team/page.tsx
  blog/
    page.tsx              Blog index
    [slug]/page.tsx       Blog post
    rss.xml/route.ts      RSS feed
  faq/page.tsx
  contact/page.tsx
  api/
    contact/route.ts      Contact form → Resend
    newsletter/route.ts   Newsletter signup → Neon + Resend
  sitemap.ts
  robots.ts

components/               Shared UI components
  providers/              Web3 (wagmi + RainbowKit + Solana)
  Header.tsx
  Footer.tsx
  LiveStat.tsx
  ContractAddress.tsx
  BotanicalDivider.tsx
  MDXLayout.tsx
  Prose.tsx
  NewsletterForm.tsx
  ReserveCard.tsx
  WalletConnect.tsx
  TokenomicsBar.tsx
  HowItWorks.tsx
  StatsStrip.tsx
  BlogCard.tsx
  TeamCard.tsx
  FAQAccordion.tsx
  ContactForm.tsx

lib/                      Utilities
  fonts.ts                next/font configuration
  mdx.ts                  Blog post reading and parsing
  prices.ts               CoinGecko / DexScreener price fetching
  utils.ts                Formatting helpers
  rateLimit.ts            Upstash rate limiting
  db.ts                   Neon Postgres (newsletter signups)

content/
  blog/                   MDX blog posts
  data/
    partners.ts           Seed bank partner data
    team.ts               Team and advisor data
    tokenomics.ts         Token allocation data

public/
  images/
    blog/                 Blog post cover images
    team/                 Team member photos
    partners/             Seed bank photos
  videos/
    germination.mp4       Hero background video
```
