# Content TODO

This file lists every piece of placeholder content in the site and who should provide the real version.
Update this file as items are completed — delete the row when done.

---

## Images

| Path | Used in | TODO |
|---|---|---|
| `/public/images/seed-illustration.png` | Home hero (right column) | Provide a high-quality botanical seed illustration. Suggest sourcing from [Biodiversity Heritage Library](https://www.biodiversitylibrary.org/) (public domain). |
| `/public/images/botanical-wheat.png` | About page | 19th-century botanical wheat illustration. Suggested source: BHL or Wikimedia Commons. |
| `/public/images/botanical-corn.png` | About page sidebar | 19th-century maize illustration. Same sourcing as above. |
| `/public/videos/germination.mp4` | Home hero background | Short (10–30 sec) looping video of a seed germinating — shallow DOF, muted tones. The existing WordPress site has one; source similar quality or license new footage. |
| `/public/images/team/tom-westlund.jpg` | Team page, About page | Professional headshot of Tom Westlund, min 400×400px. |
| `/public/images/team/placeholder.jpg` | Team page (all other members) | Replace with real headshots as team bios are provided. |
| `/public/images/partners/svalbard.jpg` | Reserves page | Photo of Svalbard Seed Vault exterior. Public domain photos are available via Wikimedia Commons (CC-BY). |
| `/public/images/partners/kew.jpg` | Reserves page | Photo of Kew Millennium Seed Bank. Check RBG Kew press kit for licensed photos. |
| `/public/images/partners/community-vault.jpg` | Reserves page | Placeholder until the Community Seed Vault site is chosen. Use a generic seed storage photo in the interim. |
| `/public/images/blog/founders-forward.jpg` | Blog post cover | Archival / contemplative image: hands holding seeds, a worn notebook, something evocative of 2013. |
| `/public/images/blog/seeds-history.jpg` | Blog post cover | Historical image: ancient grain vessel, Mesopotamian tablet, or Silk Road scene (public domain). |
| `/public/images/blog/solana-expansion.jpg` | Blog post cover | Abstract tech + botanical hybrid: e.g. circuit board overlaid with seed macro. |
| `/public/images/blog/default-cover.jpg` | Blog post fallback | Generic SeedCoin branded image for posts without a cover. |
| `/public/images/seedcoin-logo.png` | OG images, RSS, JSON-LD | Primary logo on dark background, min 512×512px. |

---

## Team

**Provide for each team member (edit `content/data/team.ts`):**

| Person | Missing |
|---|---|
| Tom Westlund | Confirm bio text is accurate. Add Twitter handle, LinkedIn, GitHub if public. Provide headshot. |
| Head of Engineering | Full name, bio (2–3 sentences), photo, social links. |
| Head of Partnerships | Full name, bio, photo, social links. |
| Community & DAO Lead | Full name, bio, photo, social links. |
| Seed Science Advisor | Full name, affiliation, bio, photo. |
| DeFi Protocol Advisor | Full name, affiliation, bio, photo. |

---

## Reserves / Partners

**Edit `content/data/partners.ts`:**

| Field | Status |
|---|---|
| Svalbard partnership status | Update `status` from `'pending'` → `'onboarding'` or `'active'` when agreement is signed. Add `lastAudit` date and `custodyDoc` URL when available. |
| Kew Millennium Seed Bank | Same as above. |
| Community Vault Alpha | Confirm location when site is chosen. Update `location`, `country`, `species`, `quantityKg` once operational. |
| Any new partners | Add a new `SeedPartner` object to the array. See README for field reference. |

---

## Token data

**Edit `content/data/tokenomics.ts`:**

| Field | TODO |
|---|---|
| `SEED_TOKENOMICS` percentages | Confirm the final allocation breakdown with the founding team. Current numbers (40/25/15/12/8) are illustrative. |
| `SUSD_COLLATERAL` percentages | Confirm with the protocol engineers once the collateral system is live. |
| `SEED_SUPPLY.circulating` | Set to real circulating supply once on-chain data is available (currently `null`). |
| ETH contract address | Set `NEXT_PUBLIC_SEED_ETH_ADDRESS` in Netlify environment variables once deployed. |
| SOL mint address | Set `NEXT_PUBLIC_SEED_SOL_ADDRESS`. |
| SUSD contract address | Set `NEXT_PUBLIC_SUSD_ETH_ADDRESS`. |

---

## Contract addresses

Currently set to zero-address placeholders in `.env.local` (dev only). For production, set real values in Netlify environment variables — **never commit real addresses in `.env.local` to git.**

---

## Blog posts

| Post | TODO |
|---|---|
| `founders-forward.mdx` | Confirm with Tom that the migrated text is accurate. Add a real cover image. |
| `seeds-as-currency-history.mdx` | Review and fact-check. Confirm the Decentralized Agriculture Network conference reference is accurate or remove it. |
| `seedcoin-solana-expansion.mdx` | Update the bridge UI timeline references. Confirm the Wormhole auditor list is accurate. |
| Future posts | Add new `.mdx` files to `content/blog/`. See README for frontmatter format. |

---

## FAQ

The FAQ content is written in [app/faq/page.tsx](app/faq/page.tsx) as inline React components.
- Review all answers with legal counsel before launch, especially the **"Is SEED a security?"** entry.
- The **privacy** answer correctly describes Plausible — confirm this is the analytics tool being used.
- Add more items to the `FAQ_CATEGORIES` array as questions come in from the community.

---

## Links that need real targets

| Link | Current value | Needs |
|---|---|---|
| Discord invite | `https://discord.gg/seedcoin` | Real invite link |
| Telegram | `https://t.me/seedcoin` | Real channel link |
| Twitter / X | `https://x.com/seedcoin` | Confirm handle |
| GitHub | `https://github.com/seedcoin` | Real org URL |
| Snapshot governance | `https://snapshot.org/#/seedcoin.eth` | Real Snapshot space |
| GitBook docs | `https://seedcoin.gitbook.io/seedcoin` | Confirm still active |
| Uniswap swap link | `https://app.uniswap.org/` | Deep-link to SEED/ETH pair once address is set |

---

## Legal

Before launch, have counsel review:
- FAQ "Is SEED a security?" answer
- Footer risk disclaimer
- SUSD audit status notice
- Privacy policy (currently described as Plausible-only)

A proper Terms of Service and Privacy Policy page should be added before launch.
Currently `/faq#legal` and `/faq#privacy` serve as lightweight placeholders.

---

## Audit docs

Once audit reports are available:
- Upload PDFs to `/public/docs/seed-audit-[date].pdf`
- Update the audit status text on [app/tokens/seedcoin/page.tsx](app/tokens/seedcoin/page.tsx) and [app/tokens/susd/page.tsx](app/tokens/susd/page.tsx)
- Update the FAQ audit entry
