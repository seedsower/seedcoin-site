import type { TokenomicsSegment } from '@/components/TokenomicsBar'

export const SEED_TOKENOMICS: TokenomicsSegment[] = [
  {
    label: 'Community & Ecosystem',
    percent: 40,
    color: '#3d7a3a',
    description: 'Liquidity mining, grants, and community incentives',
  },
  {
    label: 'Reserve Backing',
    percent: 25,
    color: '#c9a961',
    description: 'Held as collateral against seed vault deposits',
  },
  {
    label: 'Team & Advisors',
    percent: 15,
    color: '#4e9a4b',
    description: '4-year vesting, 1-year cliff',
  },
  {
    label: 'Treasury',
    percent: 12,
    color: '#6b6660',
    description: 'Protocol operations and future development',
  },
  {
    label: 'Seed Bank Partnerships',
    percent: 8,
    color: '#e0c07a',
    description: 'Allocated to certified partner seed banks',
  },
]

export const SUSD_COLLATERAL: TokenomicsSegment[] = [
  {
    label: 'SEED (over-collateralized)',
    percent: 75,
    color: '#3d7a3a',
    description: 'Primary collateral — seed-backed SEED tokens',
  },
  {
    label: 'USDC',
    percent: 20,
    color: '#c9a961',
    description: 'Stability reserve for peg maintenance',
  },
  {
    label: 'ETH',
    percent: 5,
    color: '#6b6660',
    description: 'Secondary reserve asset',
  },
]

export const SEED_SUPPLY = {
  total: 1_000_000_000,
  circulating: null as number | null, // TODO: fetch from chain
  label: '1 Billion SEED',
}
