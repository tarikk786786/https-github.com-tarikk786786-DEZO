# DEZO Visual + Motion Research

Internal (2026-10-07). Principles only — never clone.  
**Wins over neon drafts:** craft editorial + `professional-design-direction.md`.

## Reference set (sampled)

### Indian premium / editorial
Circe · Chariot×The Ken · Studio Mesmer×Esquire India · Modifyed×Daatri · OneDigital · boutique D2C storefronts (Mamaearth rebuild literature, Bloom Organics CRO) · ethnic/luxury Shopify case narratives

### International premium
Pentagram editorial · Studio Freight / Psyop portfolio systems · Locomotive×Baillat · Awwwards discourse (Robot, Working Stiff, Orage) · Codrops GSAP+Lenis storytelling · Class Act / Neplen cinematic agency builds · Minick editorial style grammar

### Motion systems studied
GSAP ScrollTrigger + Lenis smooth scroll · masked image reveals · staggered reading order · pinned scrub only when it explains a system · muted autoplay video with poster + reduced-motion stills

## HIGH-VALUE vs LOW-VALUE

| HIGH-VALUE (do) | LOW-VALUE (ban) |
|---|---|
| Full-bleed real work / product proof | Generic stock lifestyle or AI art as “hero” |
| Serif display + calm sans hierarchy | Giant startup type shouting everywhere |
| Challenge → action → result stories | Card grids of identical service tiles |
| Calm reveal / 1–3% image zoom / magnetic CTA | Particles, mouse blobs, 20 anims/viewport |
| Engine that explains the business system | Neon HUD / fake live metrics |
| Honest tools (Lab) | Fake dashboards / invented ROI |
| Hairline rules, editorial rows | Excessive glass, pills, multi-shadow cards |
| One accent gold on warm paper | Rainbow gradients, glow borders |

## Motion language (DEZO)

Unified primitives in `lib/motion/MotionAdapter.tsx` + `globals.css`:

1. **Hero entrance** — GSAP stagger on `[data-hero-item]` (~0.85s, power3)
2. **Scroll reveal** — `DezoReveal` / `DezoStagger` (once, 22–28px rise)
3. **Image reveal** — clip-path settle + scale 1.06→1
4. **Hover** — image zoom 1.045, engine node translateX(4px), CTA arrow nudge
5. **Scroll progress** — 2px gold top bar
6. **Magnetic CTAs** — light spring, disabled under reduced-motion
7. **Lenis** — smooth wheel when motion allowed
8. **Trust marquee** — host strip only (not logo fake wall)

Memorable beats ≤7: Hero · Engine · Work · Marketplace · Goal · Standard · Final CTA.

## Hero media decision

`public/hero/dezo-hero-loop.mp4` + poster appear to be **generic lifestyle / generative stock**, not a DEZO client capture and **not license-cleared** for commercial use in this pass.  
Per brief: prefer real work; stock only after ledger. **Production hero uses live project preview composition** (`LiveSitePreview` / `work-previews`). Stock files retained offline from hero until cleared — see `docs/media-license-ledger.md`.

## Signature experiences shipping

- Premium proof hero (real site plane)
- Interactive DEZO Engine (connected nodes)
- Cinematic Selected Work (image reveal + narrative)
- Marketplace dual editorial columns
- DEZO Lab analyst toolkit
- Goal selector (stack recommendation)
- DEZO Standard (controlled guarantees)
