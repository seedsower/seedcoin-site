// Cache at the Next.js layer — revalidate every 5 minutes
export const revalidate = 300

export interface PriceData {
  seedPrice: number | null
  seedChange24h: number | null
  seedMarketCap: number | null
  seedVolume24h: number | null
  susdPrice: number | null
  susdChange24h: number | null
  totalSeedKg: number | null
  fetchedAt: string
}

const FALLBACK: PriceData = {
  seedPrice: null,
  seedChange24h: null,
  seedMarketCap: null,
  seedVolume24h: null,
  susdPrice: null,
  susdChange24h: null,
  totalSeedKg: null,
  fetchedAt: new Date().toISOString(),
}

// ── CoinGecko fetch ─────────────────────────────────────────────────────────

async function fetchFromCoinGecko(): Promise<PriceData | null> {
  const apiKey = process.env.COINGECKO_API_KEY
  const headers: HeadersInit = apiKey
    ? { 'x-cg-demo-api-key': apiKey }
    : {}

  // NOTE: The CoinGecko ID for SeedCoin may differ — update 'seedcoin' if needed
  const ids = 'seedcoin,seedstable-usd'

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`,
      {
        headers,
        next: { revalidate },
      }
    )

    if (!res.ok) return null

    const coins: Array<{
      id: string
      current_price: number
      price_change_percentage_24h: number
      market_cap: number
      total_volume: number
    }> = await res.json()

    const seed = coins.find((c) => c.id === 'seedcoin')
    const susd = coins.find((c) => c.id === 'seedstable-usd')

    return {
      seedPrice: seed?.current_price ?? null,
      seedChange24h: seed?.price_change_percentage_24h ?? null,
      seedMarketCap: seed?.market_cap ?? null,
      seedVolume24h: seed?.total_volume ?? null,
      susdPrice: susd?.current_price ?? null,
      susdChange24h: susd?.price_change_percentage_24h ?? null,
      totalSeedKg: null, // sourced from reserves data, not price APIs
      fetchedAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

// ── DexScreener fallback ────────────────────────────────────────────────────

async function fetchFromDexScreener(): Promise<Partial<PriceData> | null> {
  const ethAddress = process.env.NEXT_PUBLIC_SEED_ETH_ADDRESS
  if (!ethAddress) return null

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${ethAddress}`,
      { next: { revalidate } }
    )
    if (!res.ok) return null

    const json = await res.json()
    const pair = json.pairs?.[0]
    if (!pair) return null

    return {
      seedPrice: parseFloat(pair.priceUsd) || null,
      seedChange24h: pair.priceChange?.h24 ?? null,
      seedVolume24h: pair.volume?.h24 ?? null,
      seedMarketCap: pair.fdv ?? null,
    }
  } catch {
    return null
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function getPrices(): Promise<PriceData> {
  // Try CoinGecko first
  const cgData = await fetchFromCoinGecko()
  if (cgData?.seedPrice != null) return cgData

  // Fall back to DexScreener for DEX-only tokens
  const dexData = await fetchFromDexScreener()
  if (dexData) {
    return {
      ...FALLBACK,
      ...dexData,
      fetchedAt: new Date().toISOString(),
    }
  }

  // Graceful fallback — never NaN, never broken skeleton
  return FALLBACK
}
