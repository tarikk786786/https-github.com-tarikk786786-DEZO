# DEZO — Full Website Audit

Date: 2026-10-08  
Scope: Marketing consistency, cinematic hero system, SEO, route health

## Route health (local)

| Route | Status | CTA present | Notes |
| --- | --- | --- | --- |
| `/` | 200 | Yes | Site-trailer hero shipping |
| `/work` | 200 | Yes | Needed cinematic index hero |
| `/services` | 200 | Yes | Was typography-only |
| `/services/*` | 200 | Yes | Titles duplicated `DEZO \| DEZO` |
| `/growth-lab` | 200 | Yes | Missing page metadata (inherited home title) |
| `/promise` | 200 | Yes | Strong copy hero |
| `/about` | 200 | Yes | Scaffold motion weak |
| `/contact` | 200 | Yes | OK |
| `/start-a-project` | 200 | Yes | OK |
| `/pricing` | 200 | Yes | Scaffold only |
| `/locations/bhubaneswar` | 200 | Yes | OK |

## Critical findings → fixes

| Finding | Impact | Fix |
| --- | --- | --- |
| Homepage hero trailer vs flat inner pages | Brand system breaks after home | Services + Work + service detail use `ServiceBanner` / `ChapterBanner` with real work media |
| `/growth-lab` title = homepage title | SEO / share cards wrong | Added `app/growth-lab/layout.tsx` metadata |
| Service titles `Websites — DEZO \| DEZO` | Unprofessional SERP | `constructMetadata` strips trailing brand; slug pages pass clean titles |
| Services index had no media | Low marketing impact | Full chapter trail matching homepage trailer chapters |
| Scaffold pages had no entrance motion | Felt static vs home | `PlatformPageScaffold` uses `DezoHeroMotion` + reveals |
| Trust strip after hero felt disconnected | Trailer → proof gap | Relabeled as “Proof from the trailer” |

## Marketing system (must match)

1. **Brand first** — DEZO / page brand signal hero-level  
2. **One job per section**  
3. **Real work media** — no stock lifestyle as primary  
4. **Motion language** — GSAP hero stagger, reveal, ken burns on stills, magnetic CTAs  
5. **Honest CTAs** — Start a Project / Work / Lab / Promise  

## Remaining (non-blocking)

- Slight atmosphere feather can soften left of reel on desktop (by design)
- Pricing / About still text-led (acceptable; scaffold motion now present)
- Reduced-motion path: poster-only hero (manual spot-check)

## Acceptance

- Inner marketing pages feel like the same brand as the homepage trailer  
- No duplicated `| DEZO` in titles  
- Lab has its own title/description  
- Services page shows chapter media + capability index  
