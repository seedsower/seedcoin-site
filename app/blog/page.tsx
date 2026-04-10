import type { Metadata } from 'next'
import Link from 'next/link'
import { Rss } from 'lucide-react'
import { BlogCard } from '@/components/BlogCard'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { getBlogPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Protocol updates, seed reserve news, governance announcements, and ideas from the SeedCoin community.',
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <section className="pt-28 pb-12 bg-soil">
        <div className="container-editorial">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-germ-2 text-xs uppercase tracking-widest font-semibold mb-4">
                From the seed vault
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-husk leading-display mb-4">
                The blog.
              </h1>
              <p className="text-husk-2 text-lg">
                Protocol updates, ideas, and field dispatches.
              </p>
            </div>
            <a
              href="/blog/rss.xml"
              title="RSS feed"
              aria-label="Subscribe via RSS"
              className="flex-shrink-0 p-3 rounded-lg border border-white/12 text-stone hover:text-kernel hover:border-kernel/40 transition-colors"
            >
              <Rss size={20} />
            </a>
          </div>
        </div>
      </section>

      <BotanicalDivider variant="vine" className="bg-soil py-2" />

      <section className="section bg-soil-2/30">
        <div className="container-editorial">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-stone mb-4">
                The first post is germinating.
              </p>
              <p className="text-stone-2">
                Subscribe to the newsletter to be notified when we publish.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} featured={i === 0 && posts.length > 2} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
