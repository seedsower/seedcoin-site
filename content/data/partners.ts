import type { SeedPartner } from '@/components/ReserveCard'

export const SEED_PARTNERS: SeedPartner[] = [
  {
    id: 'svalbard',
    name: 'Svalbard Global Seed Vault',
    location: 'Longyearbyen',
    country: 'Norway',
    photo: '/images/partners/svalbard.jpg',
    species: 0,
    quantityKg: 0,
    lastAudit: '2025-01-01',
    description:
      'The world\'s largest and most secure seed repository, built into the permafrost of a mountain on the Svalbard archipelago. SeedCoin is in active discussions to establish a partner depositor relationship. Pending formal onboarding.',
    status: 'pending',
  },
  {
    id: 'kew',
    name: 'Kew Millennium Seed Bank',
    location: 'Wakehurst, West Sussex',
    country: 'United Kingdom',
    photo: '/images/partners/kew.jpg',
    species: 0,
    quantityKg: 0,
    lastAudit: '2025-01-01',
    description:
      'Part of the Royal Botanic Gardens, Kew, the Millennium Seed Bank holds the largest ex situ wild plant seed collection in the world — over 2.4 billion seeds. Partnership MOU in progress.',
    status: 'pending',
  },
  {
    id: 'community-vault-alpha',
    name: 'Community Seed Vault Alpha',
    location: 'Location TBD',
    country: 'United States',
    photo: '/images/partners/community-vault.jpg',
    species: 0,
    quantityKg: 0,
    lastAudit: '2025-01-01',
    description:
      'SeedCoin\'s first community-operated seed vault, planned for the US Pacific Northwest. Currently in the facility design phase. This vault will be DAO-governed and open for community audits.',
    status: 'onboarding',
  },
]

export const TOTAL_SEED_KG = SEED_PARTNERS.filter((p) => p.status === 'active').reduce(
  (sum, p) => sum + p.quantityKg,
  0
)
