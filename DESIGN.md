# Design System — SeedCoin

This document explains the visual identity so the next person who touches this site
doesn't accidentally turn it back into a generic crypto template.

---

## The brief in one sentence

**Seed vault meets protocol.** Botanical, archival, slightly scientific — with restrained crypto cues.

---

## What this is NOT

- Not a dark-mode purple-gradient ICO site
- Not 3D coins floating in space
- Not glowing blockchain visualizations
- Not a template with a logo swap

The visual references are: 19th-century seed catalogs, scientific field notes, archival museum typography,
and the restraint of serious editorial design (The Browser Company, Linear, Are.na) — not Coinbase or Binance.

---

## Palette

Defined as CSS custom properties in [app/globals.css](app/globals.css) via Tailwind v4 `@theme`.

| Token | Hex | Role |
|---|---|---|
| `--color-soil` | `#1a1410` | Primary background — deep warm brown, not flat black. Warm tones reference earth, not void. |
| `--color-soil-2` | `#221c16` | Secondary background (cards, panels) |
| `--color-soil-3` | `#2e2620` | Tertiary background (code blocks, inputs) |
| `--color-husk` | `#f5efe4` | Primary foreground / light sections — warm off-white, like paper |
| `--color-husk-2` | `#ede4d6` | Secondary text — slightly dimmer than husk |
| `--color-germ` | `#3d7a3a` | Primary accent — living green, used sparingly. Buttons, active states, links |
| `--color-germ-2` | `#4e9a4b` | Lighter green for hover states and highlighted text |
| `--color-kernel` | `#c9a961` | Secondary accent — muted gold. Numbers, highlights, pull quote borders |
| `--color-kernel-2` | `#e0c07a` | Lighter gold for hover states |
| `--color-stone` | `#6b6660` | Cool gray for borders, muted text, secondary labels |
| `--color-stone-2` | `#8c8480` | Slightly lighter gray for body text in dark sections |
| `--color-alert` | `#d97706` | Amber for warnings and beta notices — deliberately not red (avoids scam aesthetic) |

### Why these colours

- **Soil + husk** = earth. The warm brown backgrounds and cream foregrounds echo seed packets,
  archival paper, and field notebooks. They immediately signal this is different from every other crypto site
  that uses pure black (#000) or Tailwind's `zinc-900`.
- **Germ green** = life, growth, the living asset. Used sparingly so it still means something.
- **Kernel gold** = value, harvest, the metallic reference without being generic "crypto gold".
- **Alert amber** = honest warnings without the panic of red.

---

## Typography

### Fonts

| Role | Font | Why |
|---|---|---|
| Display / headlines | **Fraunces** (variable) | Optical serif with agricultural/archival character. Variable axes (SOFT, WONK, opsz) allow expressive headlines. The f-ligatures and oldstyle numerals give it genuine personality. |
| Body | **Inter** | Neutral, highly legible, battle-tested. Gets out of the way of the content. |
| Monospace | **JetBrains Mono** | Clean, modern mono for contract addresses, numbers, and code. Clear at small sizes. |

All loaded via `next/font/google` for self-hosting — no external font requests, no FOIT/FOUT.

### Type scale

- **Display headlines:** `font-display` (Fraunces), `leading-display` (1.05). Large and tight.
- **Body:** `leading-body` (1.65). Generous — this is editorial content, not UI labels.
- **Monospace:** For all contract addresses, token quantities, and financial numbers. Signals precision and verifiability.
- **Labels/caps:** Small uppercase with wide tracking (`text-xs uppercase tracking-widest`) for section labels. Used consistently to create information hierarchy.

### Typography rules

1. **Headlines in Fraunces only.** Don't use it for body text or UI elements — it will lose its impact.
2. **Numbers in mono.** Any financial figure (price, market cap, kg of seed) uses `font-mono`. It signals the number is precise and on-chain verifiable.
3. **Pull quotes in Fraunces italic** with `--color-kernel` border. These are the moments where the reader pauses.
4. **Never center body text** beyond short CTAs. Long centered paragraphs are hard to read.
5. **Line height:** 1.65 on body. 1.05–1.15 on display. The contrast between tight headlines and open body text is intentional.

---

## Layout principles

- **Wide margins, editorial feel.** The `container-editorial` class caps at 72rem with generous fluid padding. Don't let content stretch to 100vw.
- **One strong idea per section.** Each section scroll reveals a single thing — don't stack 12 feature cards.
- **Asymmetric grids.** The About page (7/5 split), the Home hero (text + illustration), the reserves grid all use irregular proportions. Avoids the "brochure site" feel.
- **Empty space is not a bug.** Resist the impulse to fill white space. The soil background is interesting; let it breathe.

---

## Imagery rules

### DO use
- 19th-century botanical illustrations (public domain via [Biodiversity Heritage Library](https://www.biodiversitylibrary.org/))
- Real photography of seeds, germination, seed vaults — high contrast, shallow DOF
- Macro photography of specific seed varieties
- Archival agricultural documents

### DO NOT use
- Stock crypto imagery (glowing coins, 3D blockchains, abstract "digital" backgrounds)
- Flat icon sets that look like every other DeFi site
- Purple/blue gradients
- Anything that looks like it could be on a Fiverr logo template

### `<BotanicalDivider>` component

Four SVG variants — `seed`, `stem`, `leaf`, `vine` — used between sections instead of plain `<hr>` tags.
Each is a custom hand-drawn-style SVG in the `--color-kernel/30` or `--color-stone/40` palette.
They signal "botanical" without requiring image files. Use them to punctuate section transitions.

---

## Component conventions

### Cards

All cards use `.card-glass`:
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: var(--radius-lg);
```

This creates a subtle frosted-glass effect against the soil background.
It's intentionally very low contrast — the card should not scream.

### Buttons

Three variants:
- `.btn-primary` — germ green. The main action.
- `.btn-secondary` — transparent with subtle border. Secondary actions.
- `.btn-kernel` — gold on dark. Used sparingly for highest-emphasis CTAs.

All buttons have `transform: translateY(-1px)` on hover and spring back on active.
No shadows, no glows, no gradients — just clean movement.

### Status badges

- Active partnership: `bg-germ/20 text-germ-2 border-germ/30`
- Onboarding: `bg-kernel/20 text-kernel border-kernel/30`
- Pending: `bg-stone/20 text-stone-2 border-stone/30`
- Unaudited/alert: `border-alert/30 bg-alert/10 text-alert`

The badge palette directly mirrors the text palette — don't invent new colours for status.

---

## Motion

Framer Motion is installed but used conservatively.

**Rules:**
- Entrance animations only — no looping animations on content (except the hero ring spin at 60s, which is imperceptible).
- Duration ≤ 400ms. Easing: `ease-out` or spring.
- `prefers-reduced-motion` disables all animations — this is enforced in `globals.css`.
- Don't animate things the user isn't looking at.

The scrolling ticker, particle effects, and floating 3D elements that appear on every other crypto site are **explicitly banned**.

---

## Anti-patterns to avoid

| Pattern | Why it's banned |
|---|---|
| Purple/blue gradients | Signals generic DeFi template |
| "Powered by blockchain" hero text | Says nothing to anyone |
| 12-feature marketing cards | Dilutes every message equally |
| Animated counter numbers | Carnival trick, not protocol credibility |
| Glowing neon accents | Aesthetically associated with scams |
| Centering everything | Reads as low-effort template |
| `text-white` on `bg-black` | Correct WCAG, wrong identity. We use soil + husk. |
| Loading skeletons shaped like final content | Annoying and rarely necessary with Next.js RSC |

---

## Accessibility

- WCAG AA minimum contrast on all text. The soil + husk palette easily clears 4.5:1.
- Every interactive element is keyboard-reachable (`:focus-visible` uses germ green outline).
- `::selection` styled to germ green — signals the brand in an unexpected moment.
- Images have descriptive `alt` text.
- `role="img"` on SVG charts with `aria-label`.
- `prefers-reduced-motion` respected globally.

---

## The 10-second test

A new visitor landing on the home page should understand within 10 seconds:
1. This is a cryptocurrency
2. It is backed by real seeds in real vaults
3. That is unusual and interesting

If a design change obscures any of these three things, it's the wrong change.
