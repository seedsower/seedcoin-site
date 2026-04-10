'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface NewsletterFormProps {
  variant?: 'inline' | 'footer' | 'hero'
  className?: string
}

export function NewsletterForm({ variant = 'inline', className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex items-center gap-2.5 text-germ-2',
          variant === 'hero' && 'text-lg',
          className
        )}
      >
        <CheckCircle size={20} />
        <span className="font-medium">You&apos;re subscribed. Welcome to the vault.</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-2', className)}
      noValidate
    >
      <div
        className={cn(
          'flex gap-2',
          variant === 'hero' ? 'flex-col sm:flex-row' : 'flex-row'
        )}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className={cn(
            'flex-1 bg-soil-3 border border-white/12 rounded-md px-3.5 py-2.5 text-sm text-husk',
            'placeholder:text-stone focus:outline-none focus:border-germ transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variant === 'hero' && 'py-3 text-base'
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={cn(
            'btn-primary whitespace-nowrap',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            variant === 'hero' && 'py-3 px-6'
          )}
        >
          {status === 'loading' ? (
            <span className="inline-block w-4 h-4 border-2 border-husk/40 border-t-husk rounded-full animate-spin" />
          ) : (
            <Send size={14} aria-hidden />
          )}
          <span>Subscribe</span>
        </button>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-alert text-xs">
          <AlertCircle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      <p className="text-xs text-stone">
        No spam. Unsubscribe at any time. We respect your privacy.
      </p>
    </form>
  )
}
