# Media License Ledger — DEZO

Every external or third-party media asset must be listed before production use.  
Date: 2026-10-07.

| Asset | Source | URL / path | License | Commercial OK | Attribution | Restrictions | Where used | Status |
|---|---|---|---|---|---|---|---|---|
| Work preview JPEGs (Yasana, Sonvica, Shree Ayurved, Nilkanth, Paan Luxe, GIPS, etc.) | DEZO in-house capture of live client sites | `/public/work-previews/*.jpg` via `content/work-previews.ts` | Client project deliverables / portfolio rights under DEZO engagement | Yes (portfolio) | Not required on-page; host shown | Do not imply endorsement beyond live work; keep captures current | Homepage Selected Work, `/work`, hero proof plane | **APPROVED** |
| LiveSitePreview remote screenshots / proxied frames | Live client production URLs | Runtime fetch of client domains | Client sites owned by clients; DEZO portfolio display of work delivered | Yes (portfolio) | Host / title shown | No fake metrics overlays | Hero featured link, case stories | **APPROVED** |
| `dezo-logo-transparent.png` | DEZO brand asset | `/public/dezo-logo-transparent.png` | DEZO owned | Yes | — | — | Brand moments as needed | **APPROVED** |
| `dezo-hero-loop.mp4` | Unknown / likely stock or generative lifestyle plate | `/public/hero/dezo-hero-loop.mp4` | **Unverified** | No until cleared | Unknown | Cannot confirm commercial license or non-AI provenance | **NOT used in production hero** | **HOLD** |
| `dezo-hero-poster.jpg` | Same as above | `/public/hero/dezo-hero-poster.jpg` | **Unverified** | No until cleared | Unknown | Same | **NOT used in production hero** | **HOLD** |
| Lucide icons | Lucide | npm `lucide-react` | ISC | Yes | Per package | — | UI icons | **APPROVED** |
| Fonts (Instrument Serif, DM Sans, etc.) | Google Fonts / next/font | `app/layout.tsx` | OFL / respective | Yes | — | — | Global type | **APPROVED** |
| Banner chapter / OG imagery | Same work-preview captures | `content/banners.ts` → `/work-previews/*` | Client portfolio rights | Yes | Host shown where relevant | No fake client photography | ChapterBanner, ServiceBanner, ProjectMosaic, OG templates | **APPROVED** |
| `yasana-beauty-rituals-hero.jpg` | Crop of DEZO capture (chrome removed) | `/public/work-previews/yasana-beauty-rituals-hero.jpg` | Same portfolio rights | Yes | Featured credit on hero | Never show uncropped chrome in hero | Homepage hero plane only | **APPROVED** |
| Typographic statement banners | Original DEZO copy + CSS composition | `StatementBanner` / `CTASection` | DEZO owned | Yes | — | No stock required | Homepage statements, final CTA | **APPROVED** |

## Policy

1. Prefer DEZO/client captures over stock.
2. No Pexels/Pixabay/Coverr/Mixkit asset enters production without a new ledger row + commercial confirmation.
3. No AI-generated “fake client” photography as proof.
4. When Tarik clears a stock license, move HOLD → APPROVED and wire via `DezoHeroMedia` only then.
