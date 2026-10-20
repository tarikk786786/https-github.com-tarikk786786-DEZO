# DEZO Visual Quality & Anti-Slop Checklist

This checklist must be reviewed before and after any UI implementation. It synthesizes `no-slop-ui`, `ui-skill`, and `ux-ui-skills` standards.

---

## 1. Anti-Slop Guardrails (Pass / Fail)

- [x] **No Arbitrary Gradients**: No purple/blue/pink background gradients used merely as decoration.
- [x] **No Floating Glassmorphism**: No semi-transparent frosted blur panels floating ungrounded.
- [x] **No Oversized Rounded Corners**: 0px radius (`rounded-none`) maintained for crisp editorial precision.
- [x] **No Fake Dashboard Metrics**: No mock counters, fabricated engagement graphs, or pseudo-live ticker feeds.
- [x] **No Decorative Buzzwords**: Headings and subheadings communicate concrete deliverables, timelines, and pricing.
- [x] **No Pill Buttons Everywhere**: Buttons use sharp brutalist rectangles with tactile offset drop shadows.
- [x] **No Unbalanced Whitespace**: Spacing between sections and cards follows consistent 8px/16px/24px/32px scale.
- [x] **No Non-Functional Controls**: Every button, link, and calculator slider produces a measurable effect.

---

## 2. 9-Point UI Quality Floor (`ui-skill`)

1. **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<a>`, `<form>`, `<label>` used properly.
2. **Typography Hierarchy**: Distinct contrast between Display (Serif), Body (Sans), and Data (Mono).
3. **Responsive Collapse**: Checked across Mobile (375px), Tablet (768px), Laptop (1024px), Desktop (1440px).
4. **Token Compliance**: Zero rogue hex codes in inline styles; all colors map to `--bg-dezo`, `--ink-dezo`, `--primary-dezo`, etc.
5. **Interactive States**: Default, Hover, Focus-Visible, Active, Disabled, Loading, Error handled.
6. **Accessible Contrast**: WCAG 2.2 AA (minimum 4.5:1 for body copy, 3:1 for large display headlines and icons).
7. **Keyboard Navigability**: Full Tab stop flow, visible focus rings, Escape key handlers on menus.
8. **Motion Restraint**: Sub-300ms transitions, no bouncy cartoon transforms, respects `prefers-reduced-motion`.
9. **Zero Layout Shifts (CLS)**: Image dimensions, font swap, and dynamic states reserve space to prevent jumping.
