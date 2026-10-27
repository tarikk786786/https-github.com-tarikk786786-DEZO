# DEZO Influencer Platform — Audit & Phase Plan

Date: 2026-10-27  
Repo: `tarikk786786/https-github.com-tarikk786786-DEZO`  
Production: https://dezo.in

## Current architecture

| Area | Finding |
| --- | --- |
| Framework | Next.js App Router + React 19 + TypeScript + Tailwind |
| Design | `design-system/` tokens (ink / paper / gold), `components/dezo/*` |
| Motion | GSAP + Motion + Lenis (existing) |
| Content | `content/site.ts`, `content/banners.ts`, portfolio in `content/projects.ts` |
| Forms | `DezoContactForm` → `/api/contact` (Zod + RHF + WhatsApp handoff + in-memory rate limit) |
| Auth / DB | No production auth, no Postgres/Supabase. Portal page is a stub |
| Deploy | Vercel project `dezo` (production domain) |

## Preserve

- Brand system, BUILD. MARKET. GROW., work archive, services, Lab, pricing, about, contact
- Live case studies (no invented metrics)
- Existing contact / start-a-project flows

## Gaps for influencer platform

- No Influencer Marketing / For Brands / For Creators routes
- No campaign inquiry or creator registration schemas
- No matching, assignments, contracts, invoices, or role-based admin
- No persistent lead store beyond server logs + WhatsApp handoff

## Phase sequence

1. **Phase 2 (shipped on branch `cursor/influencer-growth-platform-15f3`):** positioning, nav, pages, dual intake
   - Routes: `/influencer-marketing`, `/for-brands`, `/for-creators`, `/campaigns/launch`, `/creators/register`
   - APIs: `/api/campaigns/inquiry`, `/api/creators/register`
   - Sitemap + contact service enum + `campaign_inquiry` / `creator_apply` analytics events
2. **Phase 3:** auth + creator portal + durable storage (SQL migrations exist but unused by Next APIs)
3. **Phase 4–5:** matching engine, notifications, assignments
4. **Phase 6–8:** contracts, payments reconciliation, staging → prod controls

Note: Repo audit recommended `/influencer/*` nesting; shipped flat brand routes for clearer CTAs without breaking existing IA.

## Honest claims policy

- Opportunity volume is a **network development target**, not a guaranteed paid-job count
- No fake influencer counts, earnings, or campaign results
- Barter / affiliate never labeled as fixed paid unless payment exists
