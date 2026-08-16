---
id: tokens-and-css-contract
title: Semantic Design Tokens & CSS Custom Properties Contract
type: design
tags: [tokens, css-variables, design-system, utopia, typography, spacing]
summary: Contract specifications for fluid typography, spatial scales, layered elevation surfaces, and semantic color tokens.
relates_to: [architecture-overview, theme-catalog]
updated: 2026-08-16
---

# Semantic Design Tokens & CSS Custom Properties Contract

`fractalthemer` enforces a strict, multi-tier semantic design token contract defined in [`_tokens.sass`](../../src/lib/styles/_tokens.sass) and implemented across all 42 theme files in [`_themes.sass`](../../src/lib/styles/_themes.sass).

---

## 📐 Fluid Scales (Utopia 360px → 1240px)

All typography and spacing automatically scale smoothly between 360px mobile viewports and 1240px desktop viewports using CSS `clamp()`.

### Fluid Typography Scale

| Token | Calculation | Render Range |
|---|---|---|
| `--text-xs` | `10.4px` | 10.4px |
| `--text-sm` | `12px` | 12px |
| `--text-md` | `14px` | 14px |
| `--text-bs` | `clamp(0.9375rem, 0.9119rem + 0.1136vw, 1rem)` | 15px → 16px |
| `--text-lg` | `clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)` | 18px → 20px |
| `--text-xl` | `clamp(1.35rem, 1.2631rem + 0.3864vw, 1.5625rem)` | 21.6px → 25px |
| `--text-2xl` | `clamp(1.62rem, 1.4837rem + 0.6057vw, 1.9531rem)` | 25.9px → 31.25px |
| `--text-3xl` | `clamp(1.944rem, 1.7405rem + 0.9044vw, 2.4414rem)` | 31.1px → 39px |
| `--text-4xl` | `clamp(2.3328rem, 2.0387rem + 1.3072vw, 3.0518rem)` | 37.3px → 48.8px |
| `--text-5xl` | `clamp(2.7994rem, 2.384rem + 1.8461vw, 3.8147rem)` | 44.8px → 61px |

### Fluid Spacing Scale

| Token | Calculation | Render Range |
|---|---|---|
| `--space-3xs` | `0.3125rem` | 5px |
| `--space-2xs` | `clamp(0.5625rem, 0.5369rem + 0.1136vw, 0.625rem)` | 9px → 10px |
| `--space-xs` | `clamp(0.875rem, 0.8494rem + 0.1136vw, 0.9375rem)` | 14px → 15px |
| `--space-s` | `clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)` | 18px → 20px |
| `--space-m` | `clamp(1.6875rem, 1.6108rem + 0.3409vw, 1.875rem)` | 27px → 30px |
| `--space-l` | `clamp(2.25rem, 2.1477rem + 0.4545vw, 2.5rem)` | 36px → 40px |
| `--space-xl` | `clamp(3.375rem, 3.2216rem + 0.6818vw, 3.75rem)` | 54px → 60px |
| `--space-2xl` | `clamp(4.5rem, 4.2955rem + 0.9091vw, 5rem)` | 72px → 80px |
| `--space-3xl` | `clamp(6.75rem, 6.4432rem + 1.3636vw, 7.5rem)` | 108px → 120px |
| `--space-s-l` | `clamp(1.125rem, 0.5625rem + 2.5vw, 2.5rem)` | 18px → 40px |

---

## 🎨 Semantic Surface & Elevation Tokens

Every theme provides tiered background surfaces to maintain distinct visual hierarchy without heavy borders:

```
+-------------------------------------------------------------+
| --bg (Deepest Application Canvas)                           |
|  +-------------------------------------------------------+  |
|  | --bg-panel (Sidebars, Toolbars, Drawer Panels)        |  |
|  |  +-------------------------------------------------+  |  |
|  |  | --bg-surface (Cards, Content Containers)        |  |  |
|  |  |  +-------------------------------------------+  |  |  |
|  |  |  | --bg-raised (Elevated Badges, Hover Tints)|  |  |  |
|  |  |  +-------------------------------------------+  |  |  |
|  |  +-------------------------------------------------+  |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

### Complete Surface Token Reference

| Token | Category | Description |
|---|---|---|
| `--bg` | Surface | Deepest canvas backdrop |
| `--bg-surface` | Surface | Primary card and article body background |
| `--bg-raised` | Surface | Raised header elements, dropdowns, floating surfaces |
| `--bg-panel` | Surface | Lateral sidebars, navigation panels, drawer container |
| `--bg-footer` | Surface | Bottom footer surface |
| `--bg-popover` | Surface | Context menus, popup dialogs, drawer interior |
| `--bg-dialog` | Surface | Modal backdrop and dialog cards |
| `--bg-terminal` | Surface | Code blocks, command line, and monospace terminal |
| `--bg-input` | Surface | Text inputs, textareas, and select menus |
| `--bg-canvas` | Surface | Viewport canvas background |

---

## 🖋 Typography & Feedback Tokens

| Token | Description |
|---|---|
| `--text-primary` | Main high-contrast titles, headers, bold body |
| `--text-secondary` | Paragraphs, descriptions, secondary metadata |
| `--text-muted` | Faint timestamps, captions, disabled labels |
| `--text-inverse` | Contrast text rendered on top of brand accent buttons |
| `--border` | Primary separator and card outline border |
| `--border-subtle` | Subtle divider lines |
| `--theme-color` | Primary brand accent color |
| `--theme-color-alt` | Hover/active state for primary brand buttons |
| `--state-hover` | Neutral hover background tint |
| `--state-hover-subtle` | Gentle list-item hover tint |
| `--state-selected` | Active tab, selected item highlight |
| `--feedback-error` | Validation errors and destructive alerts |

---

## 🔗 Related Documents

- [System Overview](./01-overview.md)
- [Theme Catalog](../themes/01-theme-catalog.md)
