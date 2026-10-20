# DEZO Design System Specification

## 1. Color System

### Primary Surfaces & Canvas
| Token | Hex | Role | Usage |
|---|---|---|---|
| `dezo-bg` | `#F5F3EE` | Page Canvas | Base viewport background, warm paper feel |
| `dezo-bg-warm` | `#EFECE5` | Warm Section Surface | Alternate section bands, hero containers |
| `dezo-surface` | `#FFFFFF` | Card & Form Surface | High-contrast data panels, cards, inputs |
| `dezo-surface-hover` | `#FAF9F6` | Interactive Surface | Table row hovers, card hover states |

### Ink & Text Hierarchy
| Token | Hex | Role | Contrast Ratio |
|---|---|---|---|
| `dezo-ink` | `#0B0B0A` | Deep Charcoal Black | 18.5:1 against `#F5F3EE` (AAA) |
| `dezo-text-secondary`| `#4A4A46` | Muted Body Text | 7.2:1 against `#F5F3EE` (AAA) |
| `dezo-text-muted` | `#7A7A74` | Annotations & Tags | 4.6:1 against `#F5F3EE` (AA) |
| `dezo-text-inverse` | `#F5F3EE` | Inverted Text | For buttons/badges on `#0B0B0A` |

### Brand Accents & Semantic States
| Token | Hex | Semantic Role |
|---|---|---|
| `dezo-primary` | `#B08D57` | Ochre Gold — Highlights, active borders, primary accents |
| `dezo-primary-hover`| `#9A7A48` | Deeper Gold — Button hovers, active links |
| `dezo-success` | `#3D6B4F` | Forest Green — Successful form submissions, verified badges |
| `dezo-error` | `#DC2626` | Crimson Red — Form validation errors, missing fields |

---

## 2. Typography Hierarchy

### Display Type: `Instrument Serif`
- Hero H1: `text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tightest leading-[0.98]`
- Section H2: `text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tightest leading-tight`
- Card H3: `text-xl sm:text-2xl font-bold uppercase tracking-tight`

### Body & Interface Type: `DM Sans`
- Body Large: `text-base sm:text-lg font-normal leading-relaxed`
- Body Regular: `text-sm sm:text-base font-normal leading-relaxed`
- UI Label: `text-xs sm:text-sm font-semibold tracking-wide`

### Data, Technical & Code Type: `JetBrains Mono`
- Overlines / Category Eyebrows: `text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em]`
- Price Tags & Numeric Stats: `text-2xl sm:text-3xl font-mono font-bold tracking-tight`
- Badges & Status Pills: `text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2.5 py-1`

---

## 3. Spacing, Borders & Shadows

### Spacing Scale
Follows standard 4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px rhythm.

### Borders
- Structural Cards: `border-2 border-dezo-ink` (`#0B0B0A`)
- Input Fields: `border-2 border-dezo-ink focus:border-dezo-primary`
- Subtle Dividers: `1px solid rgba(11, 11, 10, 0.10)`

### Hard Offset Shadows
- Primary Button: `shadow-[3px_3px_0_0_#B08D57] hover:shadow-[4px_4px_0_0_#0B0B0A]`
- Secondary Button: `shadow-[3px_3px_0_0_#0B0B0A] hover:shadow-[4px_4px_0_0_#B08D57]`
- Feature Cards: `shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[6px_6px_0_0_#B08D57]`
- Pressed State: `active:translate-x-[1px] active:translate-y-[1px]`
