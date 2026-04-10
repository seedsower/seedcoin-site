'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
  category?: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

function FAQAccordionItem({ item, isOpen, onToggle }: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        'border border-white/8 rounded-lg transition-colors overflow-hidden',
        isOpen ? 'bg-soil-2' : 'bg-transparent hover:bg-soil-2/50'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
        id={`faq-btn-${item.id}`}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-husk text-sm md:text-base leading-snug">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'flex-shrink-0 text-stone transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          aria-hidden
        />
      </button>

      <div
        id={`faq-${item.id}`}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-5 pb-5 text-stone-2 text-sm leading-relaxed border-t border-white/8 pt-4">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <FAQAccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  )
}
