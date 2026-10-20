# DEZO Component Inventory

This document tracks all reusable UI components, their active props, and interaction states.

---

## 1. Core Primitives (`components/dezo/`)

### `DezoButton`
- **Path**: `components/dezo/DezoButton.tsx`
- **Variants**: `primary` (Ink background with Gold offset), `secondary` (White background with Ink offset), `outline` (Transparent with 2px ink border), `ghost` (Understated text action)
- **Sizes**: `sm` (Compact actions), `md` (Standard action), `lg` (Hero/Primary CTAs)
- **States Covered**:
  - `default`: Stable base rendering
  - `hover`: Offset shadow transition and micro-elevation
  - `active`: 1px offset translation simulating physical tactile click
  - `focus-visible`: 2px solid #B08D57 with 2px offset (WCAG AA)
  - `disabled`: Reduced opacity, cursor-not-allowed, aria-disabled
  - `isLoading`: Inline spinning indicator, aria-busy="true"

### `DezoContainer`
- **Path**: `components/dezo/DezoContainer.tsx`
- **Sizes**: `standard` (max-w-6xl), `wide` (max-w-7xl), `prose` (max-w-3xl)
- **Role**: Responsive horizontal gutters (px-4 sm:px-6 lg:px-8)

### `DezoHeading`
- **Path**: `components/dezo/DezoHeading.tsx`
- **Levels**: `h1`, `h2`, `h3`, `h4`
- **Features**: Integrated monospaced category tags, serif display typography, editorial gold accent line

### `DezoCard`
- **Path**: `components/dezo/DezoCard.tsx`
- **Variants**: `default` (white surface, 2px border), `warm` (bg-dezo-bg-warm), `interactive` (hover lift and gold shadow)

---

## 2. Navigation & Layout

### `DezoNavigation`
- **Path**: `components/dezo/DezoNavigation.tsx`
- **Desktop**: Mega-menu dropdowns for Services (12 departments A–L), Industries (16 sectors), and Odisha Hubs (25 districts).
- **Mobile**: High-speed touch drawer with collapsible categories.
- **Accessibility**: Keyboard navigable (Tab, Escape to close, aria-expanded).

### `DezoFooter`
- **Path**: `components/dezo/DezoFooter.tsx`
- **Structure**: 5 editorial columns: Services, Odisha Coverage, Marketplace Solutions, Studio/Legal, and WhatsApp direct contact.

---

## 3. Interactive Pricing & Conversion

### `WebsiteProjectEstimator`
- **Path**: `components/dezo/pricing/WebsiteProjectEstimator.tsx`
- **Controls**: Project scope selector, page count, platform choice, interactive addons (SEO, WhatsApp Bot, Speed, Maintenance).
- **Output**: Live calculated estimate starting from ₹1,999 to enterprise scale, with 1-click WhatsApp quote builder.

### `PackageComparisonTable`
- **Path**: `components/dezo/pricing/PackageComparisonTable.tsx`
- **Tiers**: Student & Dukaan (₹2,499), Launch (₹4,999), Business (₹8,999), Commerce (₹14,999), Grow & Custom (₹24,999).

### `DezoContactForm`
- **Path**: `components/dezo/DezoContactForm.tsx`
- **Fields**: Name, Email, Phone, Business, City, Service Area, Budget, Project Brief.
- **Validation**: Strict Zod schema with real-time error hints.
- **Output**: Direct lead submission + seamless pre-filled WhatsApp handoff.
