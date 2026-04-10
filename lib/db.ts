import { neon } from '@neondatabase/serverless'

// Returns a lazily-created Neon SQL client
// Falls back to a no-op stub if DATABASE_URL is absent (dev without Neon)
export function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.warn('[db] DATABASE_URL not set — skipping database operations')
    return null
  }
  return neon(url)
}

// Run once at startup (e.g., in an app init route) or via a migration script
export async function ensureNewsletterTable() {
  const sql = getSql()
  if (!sql) return

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_signups (
      id         BIGSERIAL PRIMARY KEY,
      email      TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function insertNewsletterSignup(email: string): Promise<{ alreadyExists: boolean }> {
  const sql = getSql()
  if (!sql) {
    console.warn('[db] Skipping newsletter insert — no database configured')
    return { alreadyExists: false }
  }

  try {
    await sql`
      INSERT INTO newsletter_signups (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `
    return { alreadyExists: false }
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      'code' in err &&
      (err as { code?: string }).code === '23505'
    ) {
      return { alreadyExists: true }
    }
    throw err
  }
}
