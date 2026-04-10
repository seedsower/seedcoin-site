import { cn } from '@/lib/utils'

interface BotanicalDividerProps {
  className?: string
  variant?: 'seed' | 'stem' | 'leaf' | 'vine'
  flip?: boolean
}

export function BotanicalDivider({
  className,
  variant = 'seed',
  flip = false,
}: BotanicalDividerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-full overflow-hidden',
        flip && 'scale-x-[-1]',
        className
      )}
      aria-hidden
    >
      {variant === 'seed' && <SeedMotif />}
      {variant === 'stem' && <StemMotif />}
      {variant === 'leaf' && <LeafMotif />}
      {variant === 'vine' && <VineMotif />}
    </div>
  )
}

/* ── Botanical SVG motifs ── */

function SeedMotif() {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-2xl h-16 text-kernel/30"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Horizontal rule left */}
      <line x1="0" y1="40" x2="220" y2="40" stroke="currentColor" strokeWidth="0.75" />
      {/* Right rule */}
      <line x1="380" y1="40" x2="600" y2="40" stroke="currentColor" strokeWidth="0.75" />

      {/* Central seed shape */}
      <g transform="translate(300,40)">
        {/* Outer ellipse */}
        <ellipse cx="0" cy="0" rx="28" ry="18" stroke="currentColor" strokeWidth="1" fill="none" />
        {/* Inner embryo */}
        <ellipse cx="0" cy="2" rx="10" ry="7" stroke="currentColor" strokeWidth="0.75" fill="none" />
        {/* Radicle */}
        <line x1="0" y1="9" x2="0" y2="18" stroke="currentColor" strokeWidth="0.75" />
        {/* Cotyledon veins */}
        <line x1="-6" y1="0" x2="-16" y2="-4" stroke="currentColor" strokeWidth="0.5" />
        <line x1="6" y1="0" x2="16" y2="-4" stroke="currentColor" strokeWidth="0.5" />
      </g>

      {/* Small decorative elements — left */}
      <g transform="translate(200,40)" opacity="0.7">
        <circle cx="0" cy="0" r="2.5" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <line x1="-8" y1="0" x2="-1" y2="0" stroke="currentColor" strokeWidth="0.5" />
      </g>
      <g transform="translate(165,40)" opacity="0.5">
        <circle cx="0" cy="0" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </g>

      {/* Small decorative elements — right */}
      <g transform="translate(400,40)" opacity="0.7">
        <circle cx="0" cy="0" r="2.5" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <line x1="1" y1="0" x2="8" y2="0" stroke="currentColor" strokeWidth="0.5" />
      </g>
      <g transform="translate(435,40)" opacity="0.5">
        <circle cx="0" cy="0" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </g>

      {/* Branch left */}
      <g transform="translate(240,40)" opacity="0.6">
        <line x1="0" y1="0" x2="-12" y2="-10" stroke="currentColor" strokeWidth="0.6" />
        <line x1="0" y1="0" x2="-12" y2="10" stroke="currentColor" strokeWidth="0.6" />
        {/* Leaves */}
        <ellipse cx="-14" cy="-12" rx="5" ry="3" stroke="currentColor" strokeWidth="0.5" fill="none"
          transform="rotate(-30,-14,-12)" />
        <ellipse cx="-14" cy="12" rx="5" ry="3" stroke="currentColor" strokeWidth="0.5" fill="none"
          transform="rotate(30,-14,12)" />
      </g>

      {/* Branch right */}
      <g transform="translate(360,40)" opacity="0.6">
        <line x1="0" y1="0" x2="12" y2="-10" stroke="currentColor" strokeWidth="0.6" />
        <line x1="0" y1="0" x2="12" y2="10" stroke="currentColor" strokeWidth="0.6" />
        <ellipse cx="14" cy="-12" rx="5" ry="3" stroke="currentColor" strokeWidth="0.5" fill="none"
          transform="rotate(30,14,-12)" />
        <ellipse cx="14" cy="12" rx="5" ry="3" stroke="currentColor" strokeWidth="0.5" fill="none"
          transform="rotate(-30,14,12)" />
      </g>
    </svg>
  )
}

function StemMotif() {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-3xl h-12 text-stone/40"
    >
      <line x1="0" y1="30" x2="600" y2="30" stroke="currentColor" strokeWidth="0.5"
        strokeDasharray="4 6" />
      {[100, 200, 300, 400, 500].map((x) => (
        <g key={x} transform={`translate(${x},30)`}>
          <line x1="0" y1="0" x2="0" y2="-12" stroke="currentColor" strokeWidth="0.75" />
          <ellipse cx="0" cy="-17" rx="4" ry="6" stroke="currentColor" strokeWidth="0.6"
            fill="none" transform="rotate(-15,0,-17)" />
        </g>
      ))}
    </svg>
  )
}

function LeafMotif() {
  return (
    <svg
      viewBox="0 0 700 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-3xl h-16 text-germ/20"
    >
      <line x1="0" y1="40" x2="700" y2="40" stroke="currentColor" strokeWidth="0.5" />
      {[140, 280, 350, 420, 560].map((x, i) => (
        <g key={x} transform={`translate(${x},40) rotate(${i % 2 === 0 ? 0 : 180})`}>
          {/* Leaf blade */}
          <path
            d="M0,0 C8,-16 24,-20 20,-6 C16,6 8,12 0,0Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Midrib */}
          <line x1="0" y1="0" x2="16" y2="-8" stroke="currentColor" strokeWidth="0.5" />
          {/* Lateral veins */}
          <line x1="6" y1="-5" x2="10" y2="-12" stroke="currentColor" strokeWidth="0.4" />
          <line x1="11" y1="-7" x2="16" y2="-14" stroke="currentColor" strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  )
}

function VineMotif() {
  return (
    <svg
      viewBox="0 0 700 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-3xl h-12 text-kernel/25"
    >
      {/* Undulating vine */}
      <path
        d="M0,30 C100,10 150,50 250,30 C350,10 400,50 500,30 C580,14 620,46 700,30"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Tendril spirals at peaks */}
      {[125, 375, 550].map((x) => (
        <g key={x} transform={`translate(${x},18)`}>
          <path
            d="M0,0 C4,-6 10,-4 8,0 C6,4 2,4 2,0 C2,-3 4,-3 4,0"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
          />
        </g>
      ))}
      {/* Small round dots for berries */}
      {[200, 450, 650].map((x) => (
        <circle key={x} cx={x} cy={30} r="3" stroke="currentColor" strokeWidth="0.6" fill="none" />
      ))}
    </svg>
  )
}
