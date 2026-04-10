import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LiveStatProps {
  label: string
  value: string
  change?: string | null
  changePositive?: boolean | null
  sublabel?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LiveStat({
  label,
  value,
  change,
  changePositive,
  sublabel,
  className,
  size = 'md',
}: LiveStatProps) {
  const TrendIcon =
    changePositive == null ? Minus : changePositive ? TrendingUp : TrendingDown

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'text-stone-2 uppercase tracking-widest font-medium',
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        )}
      >
        {label}
      </span>

      <span
        className={cn(
          'font-mono font-semibold tracking-tight',
          size === 'sm' && 'text-xl',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-3xl',
          value === '—' ? 'text-stone' : 'text-kernel'
        )}
      >
        {value}
      </span>

      {(change || sublabel) && (
        <span
          className={cn(
            'flex items-center gap-1 text-xs',
            change
              ? changePositive == null
                ? 'text-stone-2'
                : changePositive
                ? 'text-germ-2'
                : 'text-alert'
              : 'text-stone-2'
          )}
        >
          {change && <TrendIcon size={12} strokeWidth={2.5} aria-hidden />}
          <span>{change ?? sublabel}</span>
        </span>
      )}
    </div>
  )
}
