import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rateLimit'
import { insertNewsletterSignup } from '@/lib/db'

const Schema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  // Rate limit: 3 signups per minute per IP
  const rl = await checkRateLimit(req)
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 })
  }

  const { email } = parsed.data

  // Store signup in Neon Postgres
  try {
    await insertNewsletterSignup(email)
  } catch (err) {
    console.error('[newsletter] DB error:', err)
    // Don't fail the request — still try to send the confirmation email
  }

  // Send confirmation email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = process.env.RESEND_FROM_ADDRESS ?? 'noreply@seedcoin.org'

      await resend.emails.send({
        from,
        to: email,
        subject: "You're subscribed to SeedCoin updates",
        text: [
          'Welcome to SeedCoin.',
          '',
          'You\'ve subscribed to receive protocol updates, reserve news, and governance announcements from SeedCoin.',
          '',
          'No spam. Unsubscribe by replying to this email with "unsubscribe".',
          '',
          '— The SeedCoin team',
          'https://seedcoin.org',
        ].join('\n'),
        html: `
          <div style="font-family:sans-serif;max-width:520px;color:#1a1410">
            <div style="background:#1a1410;padding:24px;border-radius:8px 8px 0 0">
              <span style="color:#f5efe4;font-size:20px;font-weight:600">🌱 SeedCoin</span>
            </div>
            <div style="background:#f5efe4;padding:24px;border-radius:0 0 8px 8px">
              <h1 style="font-size:22px;margin:0 0 12px">You're in.</h1>
              <p style="color:#6b6660;font-size:14px;line-height:1.6">
                You've subscribed to SeedCoin protocol updates, reserve news,
                and governance announcements.
              </p>
              <p style="color:#6b6660;font-size:14px;line-height:1.6">
                No spam. No noise. Just what matters for SEED holders.
              </p>
              <a href="https://seedcoin.org"
                style="display:inline-block;margin-top:16px;background:#3d7a3a;color:#f5efe4;
                       padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">
                Visit SeedCoin.org →
              </a>
              <p style="color:#9ca3af;font-size:11px;margin-top:24px">
                Unsubscribe by replying with "unsubscribe".
              </p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('[newsletter] Resend error:', err)
      // Non-fatal — the signup is stored even if the email fails
    }
  }

  return NextResponse.json({ ok: true })
}
