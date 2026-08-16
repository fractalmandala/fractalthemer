---
id: palette-generator
title: PaletteGenerator Component & Per-Color Locking
type: component
tags: [components, palette, color-harmony, tokens, locking, contrast]
summary: 9-column semantic theme palette generator with per-color locking, 8 color harmony algorithms, and live WCAG contrast auditing.
relates_to: [theme-studio, tokens-and-css-contract]
updated: 2026-08-16
---

# 🌈 `<PaletteGenerator />`

`<PaletteGenerator />` creates harmonious 9-column color palettes mapped directly to the core semantic tokens of the `fractalthemer` CSS contract, featuring interactive per-swatch color locking.

---

## 🎨 9 Semantic Theme Tokens Mapped

1. `--bg`: App Canvas Base
2. `--bg-surface`: Card Surface
3. `--bg-panel`: Sidebar / Toolbar Panel
4. `--bg-raised`: Elevated Popover / Modal
5. `--state-hover`: Neutral Hover Tint
6. `--state-hover-subtle`: Subtle Hover Tint
7. `--border`: Standard Separator & Border
8. `--theme-color`: Primary Brand Accent
9. `--theme-color-alt`: Accent Hover / Active State

---

## 🔒 Per-Color Locking Invariant

- Click the Lock icon (`🔒` / `🔓`) on any column to freeze that specific color in place.
- Locked colors **never change** when clicking **Randomize**, **Reset**, or changing harmony modes.
- Unlocked columns harmonize around the base/locked colors using the selected algorithm.

---

## 🚀 Standalone Usage

```svelte
<script lang="ts">
  import { PaletteGenerator } from 'fractalthemer';

  function handleApply(palette) {
    console.log('Applied new theme palette:', palette);
  }
</script>

<PaletteGenerator onApply={handleApply} />
```
