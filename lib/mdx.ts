import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  cover: string
  tags: string[]
  excerpt: string
  readingTime: string
  content: string
}

function postFromFile(filePath: string, slug: string): BlogPost {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? new Date().toISOString().slice(0, 10),
    author: data.author ?? 'SeedCoin',
    cover: data.cover ?? '/images/blog/default-cover.png',
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? '',
    readingTime: rt.text,
    content,
  }
}

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => postFromFile(path.join(dir, file), file.replace(/\.mdx$/, '')))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  return postFromFile(filePath, slug)
}

export function getAllBlogSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}
