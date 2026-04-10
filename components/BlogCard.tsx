import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/mdx'

interface BlogCardProps {
  post: BlogPost
  className?: string
  featured?: boolean
}

export function BlogCard({ post, className, featured = false }: BlogCardProps) {
  return (
    <article
      className={cn(
        'card-glass overflow-hidden group transition-transform hover:-translate-y-0.5',
        featured && 'md:col-span-2',
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover image */}
        <div
          className={cn(
            'relative bg-soil-2 overflow-hidden',
            featured ? 'h-72 md:h-80' : 'h-52'
          )}
        >
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil/70 to-transparent" />

          {/* Tags overlay */}
          {post.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-soil/80 text-husk-2 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-stone-2">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
            {post.author && (
              <>
                <span aria-hidden>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          <h3
            className={cn(
              'font-display text-husk leading-tight group-hover:text-germ-2 transition-colors',
              featured ? 'text-2xl' : 'text-xl'
            )}
          >
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-stone-2 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
          )}

          <span className="text-germ-2 text-sm font-medium mt-auto">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  )
}
