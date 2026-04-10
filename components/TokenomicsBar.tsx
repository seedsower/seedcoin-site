import { cn } from '@/lib/utils'

export interface TokenomicsSegment {
  label: string
  percent: number
  color: string
  description?: string
}

interface TokenomicsBarProps {
  segments: TokenomicsSegment[]
  className?: string
  showLegend?: boolean
}

export function TokenomicsBar({ segments, className, showLegend = true }: TokenomicsBarProps) {
  const total = segments.reduce((s, g) => s + g.percent, 0)

  return (
    <div className={cn('space-y-4', className)}>
      {/* Stacked horizontal bar */}
      <div
        className="flex h-8 rounded-lg overflow-hidden w-full"
        role="img"
        aria-label="Tokenomics allocation chart"
      >
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            style={{ width: `${(seg.percent / total) * 100}%`, background: seg.color }}
            className="relative group flex-shrink-0 transition-all"
            title={`${seg.label}: ${seg.percent}%`}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5
              bg-soil-2 border border-white/12 rounded-md text-xs text-husk whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
              <span className="font-semibold">{seg.label}</span>
              <span className="text-stone-2 ml-1">— {seg.percent}%</span>
            </div>

            {/* Thin separator */}
            {i < segments.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-soil/40" />
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      {showLegend && (
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-start gap-2.5">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0 mt-1"
                style={{ background: seg.color }}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <dt className="text-sm font-medium text-husk truncate">{seg.label}</dt>
                <dd className="text-xs text-stone-2">{seg.percent}%</dd>
                {seg.description && (
                  <p className="text-xs text-stone mt-0.5 leading-relaxed">{seg.description}</p>
                )}
              </div>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
