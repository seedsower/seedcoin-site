import type { Config, Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async (req: Request, _ctx: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!emailRe.test(email)) return json({ error: 'Invalid email address' }, 422)

  const store = getStore('newsletter')
  await store.setJSON(email, { email, subscribedAt: new Date().toISOString() })

  return json({ ok: true })
}

export const config: Config = { path: '/api/newsletter' }
