# DEZO.in — Platform Ecosystem & Architectural Blueprint

**Version:** 1.0  
**Target:** DEZO.in Digital Commerce, Brand, Marketplace & Growth Technology Platform  
**Market:** India (Specialization: Odisha & Bhubaneswar + National Scale)  

---

## 1. Product Triad Architecture

DEZO is structured as three interrelated software products rather than a standalone website:

```text
                             DEZO ECOSYSTEM
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ↓                            ↓                            ↓
  PRODUCT 01                   PRODUCT 02                   PRODUCT 03
   DEZO.in                   DEZO GROWTH OS             DEZO MARKETPLACE
(Public Platform)          (Telemetry SaaS)               INTELLIGENCE
• High-speed Next.js 16    • Authenticated client     • Cross-platform SP-API
• 5 Commercial Pillars       portal                     telemetry
• Verified Case Studies    • Unified margin &         • Product Opportunity
• Qualification Funnel       blended ROAS               Matrix
• DEZO Odisha hub          • AI Domain Agents         • Buy Box & SQP Mining
```

---

## 2. Curated Official GitHub Stack Reference

Every package in DEZO is selected for strict architectural reasons, avoiding package sprawl:

| Layer | Technology | Official GitHub Repository | Architectural Responsibility |
|---|---|---|---|
| **Framework** | Next.js 16 | [`vercel/next.js`](https://github.com/vercel/next.js) | SSR, SSG, Turbopack compilation, Edge CDN caching |
| **Language** | TypeScript | [`microsoft/TypeScript`](https://github.com/microsoft/TypeScript) | Strict typing across adapters and API boundaries |
| **Styling** | Tailwind CSS | [`tailwindlabs/tailwindcss`](https://github.com/tailwindlabs/tailwindcss) | Bespoke design system tokens & responsive utility engine |
| **UI Primitives** | shadcn/ui | [`shadcn-ui/ui`](https://github.com/shadcn-ui/ui) | Accessible headless primitives customized for DEZO tokens |
| **Iconography** | Lucide | [`lucide-icons/lucide`](https://github.com/lucide-icons/lucide) | Single consistent icon language across the entire platform |
| **Scroll Animation** | GSAP | [`greensock/GSAP`](https://github.com/greensock/GSAP) | Hero sequences, scroll storytelling, pinned timelines |
| **UI Motion** | Motion | [`motiondivision/motion`](https://github.com/motiondivision/motion) | Component micro-interactions, dialogs, drawers |
| **Smooth Scroll** | Lenis | [`darkroomengineering/lenis`](https://github.com/darkroomengineering/lenis) | Momentum scrolling with strict `prefers-reduced-motion` |
| **Forms & Zod** | React Hook Form | [`react-hook-form/react-hook-form`](https://github.com/react-hook-form/react-hook-form) | Validated multi-step qualification funnel |
| **Amazon SP-API** | Amazon Models & SDK | [`amzn/selling-partner-api-models`](https://github.com/amzn/selling-partner-api-models) | Official OpenAPI models for Orders, Listings, Pricing |
| **Meta Marketing** | Facebook Business SDK | [`facebook/facebook-python-business-sdk`](https://github.com/facebook/facebook-python-business-sdk) | Marketing API, CAPI server telemetry, ad reporting |
| **Google Ads** | Google Ads SDK | [`googleads/google-ads-python`](https://github.com/googleads/google-ads-python) | Search, Shopping, Performance Max campaign management |
| **Shopify** | Shopify Node App | [`Shopify/shopify-app-template-node`](https://github.com/Shopify/shopify-app-template-node) | Modern Admin GraphQL & webhook event intake |
| **Telemetry** | Umami / PostHog | [`umami-software/umami`](https://github.com/umami-software/umami) | Privacy-friendly normalized event telemetry |

---

## 3. The Provider Adapter Pattern (`/lib/`)

The core application code never couples directly to a third-party vendor SDK:

* **Marketplace:** [`lib/marketplace/adapter.ts`](file:///C:/Users/tarik/Downloads/DEZO/lib/marketplace/adapter.ts) (`MarketplaceProvider` -> `AmazonAdapter`, `FlipkartAdapter`, `FutureConnectorAdapter`)
* **Advertising:** [`lib/advertising/adapter.ts`](file:///C:/Users/tarik/Downloads/DEZO/lib/advertising/adapter.ts) (`AdsProvider` -> `MetaAdsAdapter`, `GoogleAdsAdapter`)
* **Commerce:** [`lib/commerce/adapter.ts`](file:///C:/Users/tarik/Downloads/DEZO/lib/commerce/adapter.ts) (`CommerceProvider` -> `ShopifyAdapter`)
* **AI Intelligence:** [`lib/ai/adapter.ts`](file:///C:/Users/tarik/Downloads/DEZO/lib/ai/adapter.ts) (`AIProvider` -> `DezoAIAnalyticsAdapter`)
* **Lead Qualification:** [`lib/crm/leadScoring.ts`](file:///C:/Users/tarik/Downloads/DEZO/lib/crm/leadScoring.ts) (Multi-factor scoring: intent, budget, maturity, urgency)

If a provider changes or is replaced, only its respective adapter requires updating; the UI and business layers remain untouched.

---

## 4. Human-Made Design Principles

1. **Editorial Typography:** High-contrast clamp headers (`clamp-h1`, `clamp-h2`) with deliberate letter-spacing and hierarchy.
2. **Aggressive Whitespace:** Sections breathe; no crammed 20-card grids or AI neon gradients.
3. **Verified Evidence:** All 100+ live client websites in [`content/projects.ts`](file:///C:/Users/tarik/Downloads/DEZO/content/projects.ts) represent real Indian and international businesses.
4. **Progressive Enhancement:** HTML rendered server-side first; JavaScript only layers micro-interactions; zero reliance on client hydration for basic layout legibility.
5. **Accessibility by Default:** Visible focus rings, keyboard navigability, WCAG 2.1 AA contrast compliance, and full support for `prefers-reduced-motion`.
