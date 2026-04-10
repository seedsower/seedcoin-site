import { cn } from '@/lib/utils'

interface ProseProps {
  children: React.ReactNode
  className?: string
  dropCap?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Prose({ children, className, dropCap = false, size = 'md' }: ProseProps) {
  return (
    <div
      className={cn(
        'prose-editorial',
        dropCap && 'drop-cap',
        size === 'sm' && '[&_p]:text-sm',
        size === 'lg' && '[&_p]:text-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
