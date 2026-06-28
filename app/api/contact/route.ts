import { getStore } from '@netlify/blobs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_TYPES = new Set(['general', 'partnership', 'press', 'seed-bank'])

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const type = typeof body.type === 'string' ? body.type : 'general'
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > 200) return json({ error: 'Name is required' }, 422)
  if (!emailRe.test(email)) return json({ error: 'Invalid email address' }, 422)
  if (!VALID_TYPES.has(type)) return json({ error: 'Invalid inquiry type' }, 422)
  if (!message || message.length < 10 || message.length > 5000)
    return json({ error: 'Message must be between 10 and 5000 characters' }, 422)

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const store = getStore('contact')
  await store.setJSON(id, { id, name, email, type, message, submittedAt: new Date().toISOString() })

  return json({ ok: true })
}
