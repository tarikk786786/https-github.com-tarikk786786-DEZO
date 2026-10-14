# DEZO — Marketing Hero Banner & Animation Spec

Date: 2026-10-14  
Audience: prospects on first visit (conversion + brand authority)

## Job of the hero

In one viewport, a prospect should understand:

1. **Who** — DEZO (hero-level brand)
2. **What** — BUILD. MARKET. GROW.
3. **Why now** — connected digital infrastructure, not fragmented freelancers
4. **Next step** — Start a Project / View Our Work

## Composition

| Surface | Layout | Media |
| --- | --- | --- |
| All | Full-bleed cinema plane + film grade + type | Landscape WebM/MP4; portrait MP4 on narrow |

No split panels. No chapter ticker in the first viewport. No floating badges/chips on media.

## Animation information (shipping)

| Beat | Mechanism | Timing / notes |
| --- | --- | --- |
| 1. Media shoot | Motion scale 1.22→1 + opacity | ~1.35s power settle |
| 2. Brand slam | Clip-rise y 120%→0 + slight scale | ~0.95s |
| 3. Accent line | scaleX 0→1 gold bar | delay ~0.35s |
| 4. Word shoot | BUILD / MARKET / GROW x + blur streak | stagger 0.1s |
| 5. Body + CTAs | opacity / y rise | after words |
| 6. Ken burns | CSS fallback when video blocked | poster only |

**Reduced motion:** poster only, no reel, no ken burns, static type.

## Content source

Homepage hero copy/CTAs read from `content/banners.ts` → `heroBanner`.

## Do not

- Reintroduce editorial split / cream paper panel over reel
- Put chapter ticker, stats, or promo chips in the first viewport
- Neon / HUD / fake metrics
- Root `DezoHeroMotion` GSAP on the homepage hero (entrance lives in hero components)
