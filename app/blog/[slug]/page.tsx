import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react'
import { MDXLayout } from '@/components/MDXLayout'
import { BotanicalDivider } from '@/components/BotanicalDivider'
import { getBlogPost, getBlogPosts, getAllBlogSlugs } from '@/lib/mdx'
import { formatDate, SITE_URL } from '@/lib/utils'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const allPosts = getBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // JSON-LD Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    image: `${SITE_URL}${post.cover}`,
    publisher: {
      '@type': 'Organization',
      name: 'SeedCoin',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/seedcoin-logo.png` },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Cover */}
      <div className="relative h-72 md:h-96 bg-soil-2 overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/40 to-transparent" />
      </div>

      {/* Article */}
      <article className="bg-soil">
        <div className="container-editorial max-w-3xl">
          {/* Back nav */}
          <div className="pt-8 mb-8">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-stone-2 hover:text-husk transition-colors text-sm"
            >
              <ArrowLeft size={14} />
              All posts
            </Link>
          </div>

          {/* Header */}
          <header className="mb-10">
            {post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-soil-3 text-stone-2"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-4xl md:text-5xl text-husk leading-display mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-5 text-sm text-stone-2 border-b border-white/8 pb-6">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>
          </header>

          {/* MDX content */}
          <MDXLayout source={post.content} dropCap />

          <BotanicalDivider variant="seed" className="my-12" />

          {/* Prev / next */}
          <nav aria-label="Blog post navigation" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="card-glass p-5 flex flex-col gap-2 hover:bg-soil-3/50 transition-colors"
              >
                <span className="flex items-center gap-1 text-xs text-stone-2">
                  <ArrowLeft size={12} /> Previous
                </span>
                <span className="font-display text-husk text-sm leading-snug line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="card-glass p-5 flex flex-col gap-2 text-right hover:bg-soil-3/50 transition-colors sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-stone-2">
                  Next <ArrowRight size={12} />
                </span>
                <span className="font-display text-husk text-sm leading-snug line-clamp-2">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  )
}
