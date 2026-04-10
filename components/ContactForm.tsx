'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type InquiryType = 'general' | 'partnership' | 'press' | 'seed-bank'
type Status = 'idle' | 'loading' | 'success' | 'error'

const INQUIRY_OPTIONS: { value: InquiryType; label: string }[] = [
  { value: 'general', label: 'General inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'press', label: 'Press / media' },
  { value: 'seed-bank', label: 'Seed bank partner' },
]

export function ContactForm({ defaultType }: { defaultType?: InquiryType }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: (defaultType ?? 'general') as InquiryType,
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  const inputClass = cn(
    'w-full bg-soil-3 border border-white/12 rounded-md px-4 py-3 text-sm text-husk',
    'placeholder:text-stone focus:outline-none focus:border-germ transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  )

  if (status === 'success') {
    return (
      <div className="card-glass p-8 flex flex-col items-center gap-4 text-center">
        <CheckCircle size={40} className="text-germ-2" />
        <h3 className="font-display text-xl text-husk">Message received</h3>
        <p className="text-stone-2 text-sm max-w-xs">
          We'll get back to you at <strong className="text-husk">{form.email}</strong> within
          2–3 business days. For urgent matters, reach us on Discord.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-xs text-stone uppercase tracking-wider mb-2">
            Name <span className="text-alert" aria-label="required">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Tom Westlund"
            required
            disabled={status === 'loading'}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs text-stone uppercase tracking-wider mb-2">
            Email <span className="text-alert" aria-label="required">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            required
            disabled={status === 'loading'}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-type" className="block text-xs text-stone uppercase tracking-wider mb-2">
          Inquiry type
        </label>
        <select
          id="contact-type"
          value={form.type}
          onChange={set('type')}
          disabled={status === 'loading'}
          className={cn(inputClass, 'appearance-none cursor-pointer')}
        >
          {INQUIRY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs text-stone uppercase tracking-wider mb-2">
          Message <span className="text-alert" aria-label="required">*</span>
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={set('message')}
          placeholder="Tell us what you're thinking…"
          required
          rows={6}
          disabled={status === 'loading'}
          className={cn(inputClass, 'resize-y min-h-[120px]')}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-alert text-sm">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !form.name || !form.email || !form.message}
        className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === 'loading' ? (
          <span className="inline-block w-4 h-4 border-2 border-husk/40 border-t-husk rounded-full animate-spin" />
        ) : (
          <Send size={15} aria-hidden />
        )}
        <span>Send message</span>
      </button>

      <p className="text-xs text-stone">
        By submitting this form you agree to us contacting you regarding your inquiry.
        We will not share your email with third parties.
        You can also email us directly at{' '}
        <a href="mailto:info@seedcoin.org" className="text-germ-2 hover:text-kernel transition-colors">
          info@seedcoin.org
        </a>.
      </p>
    </form>
  )
}
