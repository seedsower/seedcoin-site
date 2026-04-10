import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Prose } from './Prose'
import { ContractAddress } from './ContractAddress'
import { BotanicalDivider } from './BotanicalDivider'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

/* Custom MDX components available in content files */
const mdxComponents = {
  ContractAddress,
  BotanicalDivider,

  // Styled callout blocks
  Callout: ({
    children,
    type = 'info',
  }: {
    children: React.ReactNode
    type?: 'info' | 'warning' | 'success'
  }) => {
    const styles = {
      info: 'border-l-4 border-stone/50 bg-soil-2 text-husk-2',
      warning: 'border-l-4 border-alert bg-alert/10 text-husk-2',
      success: 'border-l-4 border-germ bg-germ/10 text-husk-2',
    }
    return (
      <div className={`p-4 rounded-r-md my-4 text-sm leading-relaxed ${styles[type]}`}>
        {children}
      </div>
    )
  },

  // Pull quote shortcode
  PullQuote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="pull-quote">{children}</blockquote>
  ),
}

interface MDXLayoutProps {
  source: string
  dropCap?: boolean
  className?: string
}

export async function MDXLayout({ source, dropCap = false, className }: MDXLayoutProps) {
  return (
    <Prose dropCap={dropCap} className={className}>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        }}
      />
    </Prose>
  )
}
