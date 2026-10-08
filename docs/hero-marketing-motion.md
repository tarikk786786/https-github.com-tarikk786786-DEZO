# DEZO — Marketing Hero Banner & Animation Spec

Date: 2026-10-08  
Audience: prospects on first visit (conversion + brand authority)

## Job of the hero

In one viewport, a prospect should understand:

1. **Who** — DEZO (hero-level brand)
2. **What** — BUILD. MARKET. GROW.
3. **Why now** — connected digital infrastructure, not fragmented freelancers
4. **Proof** — real product stills + live work link
5. **Next step** — Start a Project / View Our Work

The reel is a **site trailer**, not decoration: chapters map to the product (Build → Studio).

## Composition

| Surface | Layout | Media |
| --- | --- | --- |
| Mobile | Stacked cinema: ~50vh sharp reel → solid paper type | Portrait MP4 (`dezo-hero-loop-mobile.mp4`) |
| Desktop | Full-bleed reel under left paper feather | Landscape WebM + MP4 |

No overlays on media (no floating badges/chips). Chapter UI lives in the type column only.

## Animation information (shipping)

| Beat | Mechanism | Timing / notes |
| --- | --- | --- |
| 1. Media settle | GSAP on `[data-hero-media]` | opacity 0→1, scale 1.04→1, ~1.2s |
| 2. Atmosphere | GSAP on `[data-hero-atmosphere]` (lg+) | fade in ~1.45s after slight delay |
| 3. Eyebrow track-in | Motion letter-spacing settle | ~0.9s |
| 4. Brand clip rise | Motion y 110%→0 in overflow mask | ~0.95s |
| 5. Gold rule draw | Motion `scaleX` 0→1 | ~0.7s |
| 6. **Pillar rotate** | BUILD → MARKET → GROW clip wipe | 2.2s each, loop |
| 7. Body de-blur | Motion blur 6px→0 | ~0.8s |
| 8. CTA / trailer / proof | GSAP on `[data-hero-item]` | y stagger after type |
| 9. Poster ken burns | CSS `.dezo-hero-kenburns` | only while video not playing |
| 10. Chapter sync | `HeroShowcaseContext` from reel time | 8 trailer chapters |
| 11. Magnetic CTAs | spring (desktop hover) | disabled under reduced-motion |

**Reduced motion:** poster only, no reel, no ken burns, no chapter pulse; chapters freeze at index 0 (or interval off).

**Fallback:** if autoplay blocked, interval walks chapters using known reel durations so the marketing ticker still educates.

## Chapter map (prospect language)

| # | Label | Hint | Route |
| --- | --- | --- | --- |
| 01 | Build | Websites & commerce that convert | `/services/web-development` |
| 02 | Market | Amazon, Flipkart & storefronts | `/services/amazon` |
| 03 | Grow | SEO, ads & measurement | `/services/seo` |
| 04 | Work | Live proof, not mockups | `/work` |
| 05 | Engine | One connected growth system | `/#engine` |
| 06 | Lab | Free diagnostics for your site | `/growth-lab` |
| 07 | Standard | Guarantees we control | `/promise` |
| 08 | Studio | Bhubaneswar · deliver India-wide | `/locations/bhubaneswar` |

## Content source

Homepage hero copy/CTAs read from `content/banners.ts` → `heroBanner` so marketing can iterate without hunting JSX.

## Do not

- Reintroduce washed cream overlay on mobile
- Put stats, schedule, or promo chips in the first viewport
- Neon / HUD / fake metrics
- Client website chrome in reel frames
