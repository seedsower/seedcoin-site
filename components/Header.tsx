'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { WalletConnect } from './WalletConnect'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'About', href: '/about' },
  {
    label: 'Tokens',
    href: '/tokens/seedcoin',
    children: [
      { label: 'SEED Token', href: '/tokens/seedcoin' },
      { label: 'SUSD Stablecoin', href: '/tokens/susd' },
    ],
  },
  { label: 'Reserves', href: '/reserves' },
  { label: 'DAO', href: '/dao' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: '/docs' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tokensOpen, setTokensOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-soil/95 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/seedcoin-logo.png"
              alt="SeedCoin"
              width={140}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    className={cn(
                      'px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1',
                      pathname.startsWith('/tokens')
                        ? 'text-husk'
                        : 'text-stone-2 hover:text-husk'
                    )}
                    onMouseEnter={() => setTokensOpen(true)}
                    onMouseLeave={() => setTokensOpen(false)}
                    onClick={() => setTokensOpen((p) => !p)}
                    aria-expanded={tokensOpen}
                  >
                    {item.label}
                    <svg
                      className="w-3 h-3 mt-px transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      'absolute top-full left-0 mt-1 w-48 bg-soil-2 border border-white/8 rounded-lg shadow-xl shadow-black/40 py-1 transition-all',
                      'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block px-4 py-2.5 text-sm transition-colors',
                          isActive(child.href)
                            ? 'text-germ-2'
                            : 'text-stone-2 hover:text-husk hover:bg-white/4'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive(item.href)
                      ? 'text-husk'
                      : 'text-stone-2 hover:text-husk'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: wallet + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <WalletConnect />
            <Link href="/contact" className="btn-primary text-sm py-2 px-4">
              Partner with us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-husk rounded-md"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-soil-2 border-t border-white/8 px-4 py-4 space-y-1">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label}>
                <span className="block px-3 py-1 text-xs uppercase tracking-widest text-stone font-semibold mt-3 mb-1">
                  {item.label}
                </span>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'block px-3 py-2.5 text-sm rounded-md transition-colors',
                      isActive(child.href) ? 'text-germ-2' : 'text-husk hover:bg-white/4'
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2.5 text-sm rounded-md transition-colors',
                  isActive(item.href) ? 'text-germ-2' : 'text-husk hover:bg-white/4'
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="pt-4 pb-1 flex flex-col gap-3">
            <WalletConnect />
            <Link href="/contact" className="btn-primary text-sm text-center">
              Partner with us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
