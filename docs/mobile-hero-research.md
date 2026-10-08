# DEZO — Mobile Hero Deep Dive

Date: 2026-10-08  
Scope: Make the first mobile viewport best-in-class for customers on phones.

## Research synthesis

Premium agency / product mobile heroes that feel cinematic (Aesop, Pentagram, Linear, Stripe, high-end D2C) converge on a few hard rules:

1. **Stacked cinema, not washed overlay** — On phones, a left-to-right paper wash over landscape video reads as blur and mud. The winning pattern is an **edge-to-edge media stage** (≈40–52% of `svh`) with **type on a solid field below**. Video stays sharp; copy stays readable.
2. **One job in the first viewport** — Brand, one headline, one short line, one primary CTA. Secondary proof and chapter index stay compact; never a 4-column index fighting thumbs.
3. **Portrait-native media** — Landscape 16:9 cropped into a short stage looks soft. A dedicated **9:16 reel** (or aggressively portrait-framed crop) keeps product detail and chapter plates legible.
4. **Thumb-first CTAs** — Primary action full-width; secondary outline below or beside. Min 44px height. No magnetic hover gimmicks that fight touch.
5. **Safe bands** — Solid nav band; no competing video typography under the brand lockup; respect notch / home indicator with `svh` + bottom padding.
6. **Performance** — Lighter encode, `playsInline` + `muted` + `preload=metadata` on cellular, poster-first paint, short loop (~10–12s).

## Failure modes we hit on dezo.in mobile

| Failure | Why it hurt |
| --- | --- |
| Overlay paper wash | Made the reel look like a soft stock blur |
| Landscape-only encode | Product detail and chapter plates cropped badly |
| Duplicate DEZO plate under UI | Ghosted brand type |
| Dense 4-col chapter grid | Noise in the thumb zone |
| Side-by-side CTAs | Cramped on 390px |

## Decision — Mobile Site Trailer v1

**Composition (mobile only):**

```
┌ nav (paper) ─────────────┐
│ edge-to-edge reel stage  │  ~48svh, no cream wash
├ solid paper type ────────┤
│ DEZO                     │
│ BUILD. MARKET. GROW.     │
│ one line                 │
│ [ Start a Project ]      │  full width
│ View Our Work            │
│ Watching · Build         │  compact ticker
└ studio / proof ──────────┘
```

**Desktop unchanged in spirit:** full-bleed overlay with soft left feather (already shipping).

**Assets:** `/public/hero/dezo-hero-loop-mobile.mp4` becomes a **portrait 1080×1920** encode of the same chapters (product stills + right-safe plates), cache-busted.

## Acceptance

- First mobile viewport: brand readable, reel sharp, one primary CTA above the fold on iPhone SE / 390×844.
- No client website chrome in any frame.
- Reduced-motion: poster only.
- Apex `dezo.in` serves `?v=` cache-bust matching the build.
