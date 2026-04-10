import { cn } from '@/lib/utils'

const STEPS = [
  {
    number: '01',
    title: 'Deposit',
    description:
      'Provide collateral (USDC or ETH) to the SeedCoin protocol. Your deposit is recorded on-chain.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 14v20M14 24h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Seed bank custody',
    description:
      'Partner seed banks receive and store corresponding real-world seed varieties under certified custody agreements.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        {/* Vault door */}
        <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1" />
        {/* Spokes */}
        <line x1="24" y1="16" x2="24" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="27" x2="24" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="27" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Handle */}
        <line x1="34" y1="22" x2="34" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Mint',
    description:
      'Receive SEED tokens proportional to your collateral. SUSD is minted against over-collateralized SEED positions.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        {/* Sprouting seed */}
        <ellipse cx="24" cy="30" rx="10" ry="7" stroke="currentColor" strokeWidth="1.5" />
        {/* Stem */}
        <line x1="24" y1="23" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Left leaf */}
        <path d="M24 18 C18 14 14 18 18 22 C20 24 24 22 24 18Z" stroke="currentColor" strokeWidth="1" fill="none" />
        {/* Right leaf */}
        <path d="M24 16 C30 12 34 16 30 20 C28 22 24 20 24 16Z" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Redeem',
    description:
      'Burn SEED tokens to reclaim collateral. Institutional holders may also redeem for physical seed lots under partnership agreements.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        {/* Circle with arrow out */}
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 24h12M28 20l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Small seed */}
        <ellipse cx="14" cy="36" rx="4" ry="2.5" stroke="currentColor" strokeWidth="1" transform="rotate(-30,14,36)" />
        <line x1="14" y1="38" x2="12" y2="44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
]

interface HowItWorksProps {
  className?: string
}

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Connector line (desktop) */}
      <div
        className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-stone/30 to-transparent"
        aria-hidden
      />

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {STEPS.map((step) => (
          <li key={step.number} className="flex flex-col items-center text-center gap-4 relative">
            {/* Number + icon circle */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-stone/30 bg-soil-2 flex items-center justify-center text-stone">
                {step.icon}
              </div>
              <span className="absolute -top-2 -right-2 text-[10px] font-mono font-bold text-kernel bg-soil border border-kernel/30 rounded-full w-6 h-6 flex items-center justify-center">
                {step.number}
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg text-husk leading-tight mb-2">{step.title}</h3>
              <p className="text-stone-2 text-sm leading-relaxed max-w-[200px] mx-auto">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
