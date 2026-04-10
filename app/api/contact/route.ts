import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rateLimit'

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  type: z.enum(['general', 'partnership', 'press', 'seed-bank']),
  message: z.string().min(10).max(5000),
})

const TYPE_LABELS: Record<string, string> = {
  general: 'General inquiry',
  partnership: 'Partnership',
  press: 'Press / media',
  'seed-bank': 'Seed bank partner',
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const rl = await checkRateLimit(req)
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute before trying again.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid form data', details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const { name, email, type, message } = parsed.data

  // If Resend isn't configured, log and return success (dev mode)
  if (!process.env.RESEND_API_KEY) {
    console.log('[contact] Resend not configured — would have sent:', {
      name,
      email,
      type,
      message,
    })
    return NextResponse.json({ ok: true })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.CONTACT_TO_ADDRESS ?? 'info@seedcoin.org'
    const from = process.env.RESEND_FROM_ADDRESS ?? 'noreply@seedcoin.org'

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[SeedCoin] ${TYPE_LABELS[type]} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Type: ${TYPE_LABELS[type]}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#1a1410;background:#c9a961;padding:12px 16px;border-radius:6px">
            New contact: ${TYPE_LABELS[type]}
          </h2>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px 0;color:#6b6660;font-size:13px;width:100px">Name</td>
              <td style="padding:8px 0;font-size:14px">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b6660;font-size:13px">Email</td>
              <td style="padding:8px 0;font-size:14px">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b6660;font-size:13px">Type</td>
              <td style="padding:8px 0;font-size:14px">${TYPE_LABELS[type]}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please email us directly at info@seedcoin.org.' },
      { status: 500 }
    )
  }
}
