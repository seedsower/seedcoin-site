import Link from 'next/link'
import { BotanicalDivider } from '@/components/BotanicalDivider'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-editorial max-w-lg text-center py-20">
        <BotanicalDivider variant="seed" className="mb-8" />
        <h1 className="font-display text-6xl text-husk mb-2">404</h1>
        <h2 className="font-display text-2xl text-husk mb-4">
          This seed didn&apos;t germinate.
        </h2>
        <p className="text-stone-2 mb-8">
          The page you&apos;re looking for doesn&apos;t exist, or may have been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/blog" className="btn-secondary">
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  )
}
