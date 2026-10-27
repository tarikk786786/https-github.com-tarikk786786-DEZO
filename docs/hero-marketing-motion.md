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
| Desktop | Paper brief on the left, framed reel on the right | Landscape WebM/MP4 inside the frame |
| Narrow | Brief first, framed reel below | Same reel; poster if motion is reduced |

The first viewport explains BUILD, MARKET, and GROW with a real link for each. No full-bleed film grade. No brand slam.

## Animation information (shipping)

| Beat | Mechanism | Timing / notes |
| --- | --- | --- |
| 1. Name | Clip-rise | ~0.7s |
| 2. Gold rule | scaleX 0→1 | delay ~0.25s |
| 3. Brief rows | Fade up, stagger | ~0.08s apart |
| 4. Active row | Linear progress, then advance | 4.2s; pauses on hover or focus |
| 5. Frame caption | Crossfade with the active row | ~0.28s |
| 6. Reel | Plays inside the frame; ken burns on the poster if video is blocked | no white flash |

**Reduced motion:** poster only, no cycle, no progress bar, static type.

## Content source

Homepage hero copy/CTAs read from `content/banners.ts` → `heroBanner`.

## Do not

- Restore the full-bleed cinema slam (flash, blur word streak, type over the reel)
- Put a chapter ticker or invented metrics in the first viewport
- Neon / HUD treatments
- Root `DezoHeroMotion` GSAP on the homepage hero (entrance lives in `DezoHomeHero`)
