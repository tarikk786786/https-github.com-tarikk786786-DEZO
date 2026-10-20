# DEZO Interaction Guidelines & State Design

Every interactive control in DEZO must handle its complete state lifecycle. This document outlines the standards defined by `ui-skill` and `ux-ui-skills` (designing-states-not-screens).

---

## 1. State Matrix

| State | Visual Treatment | Accessibility Attribute |
|---|---|---|
| **Default** | Solid surface, 2px solid `#0B0B0A` border, offset shadow | Base element |
| **Hover** | 100-150ms ease color change, shadow expands from 3px to 4px | Mouse/Pointer hover |
| **Focus-Visible** | 2px solid `#B08D57` outline with 2px or 3px offset | `:focus-visible` only |
| **Active / Pressed** | `translate(1px, 1px)` micro-shift, shadow reduces | `active:` |
| **Disabled** | 50% opacity, `cursor-not-allowed`, no active translate | `disabled` and `aria-disabled="true"` |
| **Loading** | Inline SVG spinner, disabled interaction | `aria-busy="true"` |
| **Success** | Emerald green `#3D6B4F` border, feedback icon, clear text | `role="status"` |
| **Error** | Crimson `#DC2626` border, specific message below control | `aria-invalid="true"`, `role="alert"` |

---

## 2. Forms & Inputs
1. **Labels Above Fields**: Labels are always visible above input fields using `font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink`. Never rely solely on placeholder text.
2. **Explicit Error Messages**: Explain what needs correction (e.g., "Enter a valid 10-digit Indian phone number").
3. **Validation Timing**: Validate on blur or form submit, not aggressively on initial focus.
4. **Submitting State**: Disable submit button and show "Routing Request..." with spinner; do not leave user wondering if click registered.
5. **Success Recovery**: Always provide a manual fallback button ("Open WhatsApp Now") in case popup blockers block `window.open()`.

---

## 3. Dropdowns & Modals
1. **Keyboard Escape**: Pressing `Escape` must immediately close any open dropdown or drawer.
2. **Focus Trapping**: In full-screen mobile drawers, focus stays contained until dismissed.
3. **Aria Attributes**: Include `aria-expanded`, `aria-haspopup="true"`, and `aria-label`.
