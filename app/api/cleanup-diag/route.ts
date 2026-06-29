import { getStore } from '@netlify/blobs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Temporary one-time endpoint to remove diagnostic test submissions.
const TOKEN = 'cleanup-diag-7f3a9c'
const TEST_EMAIL = 'diagtest@example.com'

export async function GET(req: Request) {
  const url = new URL(req.url)
  if (url.searchParams.get('token') !== TOKEN) {
    return new Response('forbidden', { status: 403 })
  }

  const deleted: Record<string, string[]> = { newsletter: [], contact: [] }

  const newsletter = getStore('newsletter')
  await newsletter.delete(TEST_EMAIL)
  deleted.newsletter.push(TEST_EMAIL)

  const contact = getStore('contact')
  const { blobs } = await contact.list()
  for (const b of blobs) {
    const entry = (await contact.get(b.key, { type: 'json' })) as { email?: string } | null
    if (entry?.email === TEST_EMAIL) {
      await contact.delete(b.key)
      deleted.contact.push(b.key)
    }
  }

  return new Response(JSON.stringify({ ok: true, deleted }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
