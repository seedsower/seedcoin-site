import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQAccordion, type FAQItem } from '@/components/FAQAccordion'
import { BotanicalDivider } from '@/components/BotanicalDivider'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about SeedCoin — how reserves work, the SEED token, SUSD stablecoin, and the skeptical questions we want you to ask.',
}

const FAQ_CATEGORIES = [
  {
    id: 'reserves',
    title: 'The reserves',
    items: [
      {
        id: 'reserves-real',
        question: 'How do I know the seeds actually exist?',
        answer: (
          <div className="space-y-3">
            <p>
              This is the most important question you can ask, and we encourage
              you to keep asking it. Right now, we're honest: the first custody
              agreements are not yet finalized. The reserves dashboard shows
              partnerships in progress, not completed ones.
            </p>
            <p>
              Once custody agreements are signed, we'll publish: (1) a physical
              audit report signed by an independent auditor, (2) an IPFS-hosted
              custody document, (3) an on-chain attestation recording the IPFS
              hash. Anyone can verify the chain of evidence at any time.
            </p>
            <p>
              If the seeds don't exist, the reserve dashboard will say so.
              Honesty here is more valuable than fake numbers.
            </p>
          </div>
        ),
        category: 'reserves',
      },
      {
        id: 'reserves-bank-fail',
        question: 'What happens if a seed bank fails?',
        answer: (
          <div className="space-y-3">
            <p>
              SeedCoin mitigates this in three ways: (1) we partner with
              multiple independent seed banks across different countries and
              legal jurisdictions, (2) custody agreements include insurance
              requirements, and (3) the SeedDAO has a reserve fund allocated
              for emergency relocation of seeds.
            </p>
            <p>
              No single seed bank failure should affect more than a fraction of
              total reserves. We prioritize established, government-backed
              institutions like the Svalbard Vault for this reason.
            </p>
          </div>
        ),
        category: 'reserves',
      },
      {
        id: 'reserves-buy-direct',
        question: 'Why not just buy seeds directly?',
        answer: (
          <div className="space-y-3">
            <p>
              You can! And you should. But purchasing seeds directly doesn't
              give you: (1) a liquid, tradeable representation of that value,
              (2) access to the DeFi ecosystem for lending, borrowing, or
              yield, (3) a standardized, audited custody framework, or
              (4) the SUSD stablecoin you can spend.
            </p>
            <p>
              SeedCoin isn't a replacement for seed saving — it's a financial
              layer on top of the physical asset, making the value of seed
              heritage accessible and transferable.
            </p>
          </div>
        ),
        category: 'reserves',
      },
    ] as FAQItem[],
  },
  {
    id: 'susd',
    title: 'SUSD stablecoin',
    items: [
      {
        id: 'susd-peg',
        question: 'How does SUSD maintain its $1 peg?',
        answer: (
          <p>
            SUSD uses a combination of over-collateralization (minimum 150%
            collateral ratio), a USDC stability reserve, and on-chain
            liquidation mechanisms. When SUSD trades below $1, arbitrageurs
            can purchase it cheaply and redeem it at face value, capturing
            the spread. When it trades above $1, new SUSD can be minted
            against collateral, increasing supply. See the{' '}
            <Link href="/tokens/susd" className="text-germ-2 underline">
              SUSD page
            </Link>{' '}
            for a full mechanism description.
          </p>
        ),
        category: 'susd',
      },
      {
        id: 'susd-unaudited',
        question: 'SUSD is unaudited. Should I use it?',
        answer: (
          <div className="space-y-3">
            <p>
              We appreciate the directness. <strong className="text-husk">
              SUSD is experimental and unaudited.</strong> An audit is
              scheduled for Q2 2026. Until then:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Do not put life savings into SUSD.</li>
              <li>Treat it as a high-risk, experimental asset.</li>
              <li>Only use amounts you're prepared to lose entirely.</li>
            </ul>
            <p>
              We'll post the audit report publicly the moment it's done.
            </p>
          </div>
        ),
        category: 'susd',
      },
    ] as FAQItem[],
  },
  {
    id: 'legal',
    title: 'Legal & compliance',
    items: [
      {
        id: 'security',
        question: 'Is SEED a security?',
        answer: (
          <div className="space-y-3">
            <p>
              We are not lawyers, and this is not legal advice. We believe
              SEED is structured as a utility token: it provides governance
              rights, access to protocol features, and represents a claim on
              seed collateral. It is not designed as an investment contract
              promising returns.
            </p>
            <p>
              That said, the legal status of crypto assets varies by
              jurisdiction and is actively evolving. We encourage you to
              consult a qualified attorney in your jurisdiction before
              purchasing SEED.
            </p>
          </div>
        ),
        category: 'legal',
      },
      {
        id: 'privacy',
        question: 'What data does the site collect?',
        answer: (
          <p>
            We use Plausible Analytics, a privacy-respecting analytics tool
            that does not use cookies and does not collect personally
            identifiable information. We do not use Google Analytics. If
            you submit the contact form or sign up for the newsletter, we
            store your email address and handle it in accordance with GDPR.
            We will never sell your data.
          </p>
        ),
        category: 'legal',
      },
    ] as FAQItem[],
  },
  {
    id: 'technical',
    title: 'Technical questions',
    items: [
      {
        id: 'chains',
        question: 'Which blockchains does SeedCoin support?',
        answer: (
          <p>
            SEED tokens exist on Ethereum (ERC-20) and Solana (SPL). SUSD is
            currently Ethereum-only. The SeedDAO operates primarily on
            Ethereum via Snapshot (off-chain) with plans for on-chain
            governance via Governor Bravo in 2026.
          </p>
        ),
        category: 'technical',
      },
      {
        id: 'wallets',
        question: 'Which wallets can I use?',
        answer: (
          <p>
            Any EVM-compatible wallet works for Ethereum: MetaMask, Coinbase
            Wallet, Rainbow, Ledger, etc. For Solana: Phantom, Solflare, or
            Backpack. You can connect directly on this site — click "Connect"
            in the header.
          </p>
        ),
        category: 'technical',
      },
      {
        id: 'risk',
        question: 'What are the main risks?',
        answer: (
          <div className="space-y-3">
            <p>The main risks, in plain English:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-husk">Smart contract risk:</strong> The contracts are unaudited. Bugs could result in loss of funds.</li>
              <li><strong className="text-husk">Custody risk:</strong> Seed bank partnerships are not yet formalized. Real-world asset backing is aspirational until the first audit.</li>
              <li><strong className="text-husk">Liquidity risk:</strong> SEED has limited trading volume. You may not be able to sell at your preferred price.</li>
              <li><strong className="text-husk">Regulatory risk:</strong> Crypto regulations are changing rapidly across jurisdictions.</li>
              <li><strong className="text-husk">Peg risk:</strong> SUSD could lose its peg in extreme market conditions.</li>
            </ul>
          </div>
        ),
        category: 'technical',
      },
    ] as FAQItem[],
  },
]

// JSON-LD for FAQ
function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof item.answer === 'string'
            ? item.answer
            : item.id, // simplified — MDX answers can't easily serialize
        },
      }))
    ),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function FAQPage() {
  return (
    <>
      <FAQSchema />

      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
            Questions
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
            We want you to be skeptical.
          </h1>
          <p className="text-husk-2 text-xl leading-relaxed max-w-2xl">
            Crypto is full of projects that can&apos;t answer hard questions.
            We have answers. If something isn&apos;t covered here,{' '}
            <Link href="/contact" className="text-germ-2 underline">ask us</Link>.
          </p>
        </div>
      </section>

      <BotanicalDivider variant="seed" className="bg-soil py-2" />

      <section className="section bg-soil-2/30">
        <div className="container-editorial max-w-3xl">
          <div className="space-y-14">
            {FAQ_CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id}>
                <h2 className="font-display text-2xl text-husk leading-heading mb-6">
                  {cat.title}
                </h2>
                <FAQAccordion items={cat.items} />
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 card-glass text-center">
            <p className="text-husk font-semibold mb-2">Still have questions?</p>
            <p className="text-stone-2 text-sm mb-4">
              Ask in the Discord, or send us a message directly.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://discord.gg/seedcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2"
              >
                Join Discord
              </a>
              <Link href="/contact" className="btn-secondary text-sm py-2">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
