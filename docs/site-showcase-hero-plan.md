# DEZO — Full-Site Showcase Hero Plan

Date: 2026-10-07 · Owner: autonomous redesign

## Research (what Tarik is asking for)

“Showcase **all of the website** as animation on banner/hero” means: the first viewport should feel like a **site trailer** — a cinematic index of the product — not a second homepage dump and not a neon dashboard.

### Constraints (from governing docs)

- `professional-design-direction.md`: editorial, text-dominant, no cyber/HUD, restrained motion
- `wow-visual-creative-system.md`: craft over effects; real DEZO assets first; 5–8 major moments
- Homepage already removed service-repeat deep-dives — do **not** reintroduce clutter

### Wrong interpretations (rejected)

| Idea | Why rejected |
|---|---|
| Floating cards of every page | Clutter; AI-template |
| Live iframe montage of all routes | Chrome bleed, performance, client UI collision |
| Fake metrics / neon command center | Hard ban |
| Stock lifestyle loop behind text | Already replaced; not “the website” |

### Right interpretation (chosen)

**Site Trailer Hero** — a muted looping composition that shoots through the site’s real chapters with sharp editorial plates + chrome-free work stills. Static DEZO UI (brand, BMG, tagline, CTAs) stays dominant over a paper atmosphere.

## Site chapter map (what “all of the website” means)

Map routes/sections → short plates (not every URL):

| # | Chapter | Site meaning | Visual |
|---|---|---|---|
| 00 | DEZO | Brand | Paper plate |
| 01 | BUILD | Web / brand systems | Yasana product still |
| 02 | MARKET | Ecommerce / Amazon / Flipkart | Paan Luxe still |
| 03 | GROW | SEO / ads / measurement | Nilkanth still |
| 04 | WORK | Selected work archive | Shree + resolve stills |
| 05 | ENGINE | Connected system | Typographic + subtle still |
| 06 | LAB | Growth Lab diagnostics | Typographic plate |
| 07 | STANDARD | Promise / guarantee | Typographic plate |
| 08 | STUDIO | Bhubaneswar / Odisha | Typographic plate |
| 09 | START | CTA resolve | Product still hold |

Duration target: **~12–14s** loop (desktop WebM/MP4 + **portrait 9:16 mobile**). Poster = strongest product frame. Mobile UI is a **stacked cinema** (see `docs/mobile-hero-research.md`), not a washed overlay.

## UI redesign (hero chrome)

Keep text stack:

1. **DEZO** (hero brand)
2. Gold rule
3. **BUILD. MARKET. GROW.**
4. Digital infrastructure…
5. CTAs
6. Studio line + Proof link

**Add:** a restrained chapter ticker in the text column (DEZO UI only — not stickers on media):

`Showing · Work` → cycles Engine → Lab → Standard → Studio…  
Synced loosely to reel timing; `prefers-reduced-motion` freezes on Work.

## Delivery

1. Render original showcase reel from DEZO stills + plates → `/public/hero/dezo-hero-loop.*`
2. Wire `DezoHeroMedia` + chapter ticker on homepage
3. Update `docs/media-license-ledger.md`
4. Push `main`, confirm https://dezo.in
5. Screenshots → `/cursor/stores/self/media/dezo-redesign/showcase-hero.png`, `showcase-hero-mobile.png`

## Success criteria

- Customer can *feel* the whole site in one loop without scrolling
- Type remains readable at all times
- No client chrome, neon, fake stats
- Mobile uses lighter encode or poster

## Follow-on

Marketing motion + prospect copy + reel-synced ticker: see `docs/hero-marketing-motion.md`.
