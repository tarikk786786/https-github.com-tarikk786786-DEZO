# Design System — DEZO (BUILD. MARKET. GROW.)

## 1. Stack & Architecture
- **Framework**: Next.js 16.3.8 (App Router, Server Components & Dynamic SSR) + React 19
- **Language**: TypeScript ~5.8 (Strict type safety, zero `any` suppressions)
- **Styling**: Tailwind CSS 3.4 + CSS Custom Properties (`design-system/globals.css`)
- **Typography**:
  - Display / Headlines: `Instrument Serif` (`--font-display` / `font-display`)
  - Body & UI Controls: `DM Sans` (`--font-sans` / `font-sans`)
  - Technical Data, Badges, Prices: `JetBrains Mono` (`--font-mono` / `font-mono`)
- **Icons**: Lucide React (`lucide-react`)
- **Animation**: Motion (`motion/react`) + Lenis Smooth Scroll (respects `prefers-reduced-motion`)
- **Testing**: Node.js 24 Native Test Runner (`tsx --test`) + Chrome DevTools MCP

## 2. Design Tokens
- **Backgrounds**:
  - Base: `#F5F3EE` (`bg-dezo-bg`) — physical warm paper tone, zero eye fatigue
  - Warm Surface: `#EFECE5` (`bg-dezo-bg-warm`) — structured section contrasts
  - Pure Surface: `#FFFFFF` (`bg-white`) — high-clarity data cards and input fields
- **Typography & Ink**:
  - Ink Primary: `#0B0B0A` (`text-dezo-ink`) — deep mineral black for sharp legibility
  - Body Secondary: `#4A4A46` (`text-dezo-text-secondary`) — high-contrast reading text
  - Muted Annotations: `#7A7A74` (`text-dezo-text-muted`) — timestamps, subtitles, labels
- **Brand Accents**:
  - Architectural Gold: `#B08D57` (`text-dezo-primary` / `bg-dezo-primary`)
  - Gold Soft / Tint: `rgba(176, 141, 87, 0.12)` (`bg-dezo-accent-soft`)
  - Forest Green (Success): `#3D6B4F` (`text-emerald-700` / `bg-emerald-50`)
  - Crimson (Alert / Error): `#DC2626` (`text-red-600` / `bg-red-50`)
- **Borders & Shadows**:
  - Standard Border: `border-2 border-dezo-ink` (`#0B0B0A`)
  - Subtle Dividing Rule: `1px solid rgba(11, 11, 10, 0.10)`
  - Hard Offset Shadow: `shadow-[3px_3px_0_0_#B08D57]` or `shadow-[4px_4px_0_0_#0B0B0A]`
  - Active Press: `active:translate-x-[1px] active:translate-y-[1px]`
- **Geometry**:
  - Strict 0px radius (`rounded-none`). No generic 24px floating cards or oversized bubbles.

## 3. Anti-Slop Guardrails (no-slop-ui standard)
1. **No Artificial Gradients**: No purple-to-blue neon gradients or glowing orb blobs.
2. **No Frosted Glassmorphism**: Solid, predictable surfaces with authentic physical borders.
3. **No Fake Metrics or Proof**: Every figure published reflects verifiable deliverables, transparent starting rates (e.g. Student from ₹1,999, Dukaan from ₹2,999), or real Odisha business facts.
4. **No Non-Functional Elements**: Every button, tab, slider, filter, and drawer performs an actual operation or routes to verified WhatsApp/API endpoints.
5. **No Decorative Filler Copy**: Every sentence explains who the service is for, what is delivered, how long it takes, and what happens next.

## 4. Component Inventory
- `DezoButton`: Accessible button with variants (`primary`, `secondary`, `outline`, `ghost`), sizes (`sm`, `md`, `lg`), `isLoading` state, high-contrast keyboard focus ring, and magnetic hover.
- `DezoCard`: Structural content wrapper with 2px ink borders and hard offset shadow.
- `DezoHeading`: Multi-level typographic heading component with serif display styling and monospaced section tags.
- `DezoNavigation`: Fixed responsive header with desktop dropdown menus (accessible via keyboard focus & click), mobile slide-down drawer, and active pathname highlighting.
- `DezoFooter`: Structured editorial footer with 5 navigation columns, live studio address in Patia, Bhubaneswar, direct WhatsApp link, and legal trust links.
- `DezoContactForm`: Validated contact intake form with Zod schema, real-time error messages, loading states, and direct WhatsApp handoff.
- `WebsiteProjectEstimator`: Interactive project cost calculator with real budget estimation, scope options, addons, and direct WhatsApp quote builder.
- `PackageComparisonTable`: 5-tier responsive package matrix with sticky category headers and complete feature checklists.
- `DezoQualificationFunnel`: Step-by-step business assessment tool with budget tiers from Under ₹5,000 to Enterprise scale.

## 5. Interaction & Accessibility Guidelines (WCAG 2.2 AA)
- Focus Indicator: `outline: 2px solid #B08D57; outline-offset: 3px` on all interactive controls.
- Color Contrast: 4.5:1 minimum on all body copy against `#F5F3EE` and `#FFFFFF`.
- Form Labels: Always visible, associated via `htmlFor` and `id`, with explicit required indicators.
- Motion: Respects `prefers-reduced-motion: reduce` across all GSAP and CSS animations.
- Touch Targets: Minimum 44x44px bounding area on mobile navigation and buttons.
