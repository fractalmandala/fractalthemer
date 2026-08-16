---
id: theme-studio
title: ThemeStudio Component & Gradient Engine
type: component
tags: [components, studio, gradient-builder, shaders, palette-generator]
summary: Fullscreen visual theme studio with 21 gradient engines, 9-column lockable palette generator, and multi-format code/asset export.
relates_to: [theme-picker, aura-background, tokens-and-css-contract]
updated: 2026-08-16
---

# 🎨 `<ThemeStudio />`

`<ThemeStudio />` is a comprehensive visual theme creation studio and interactive atmospheric gradient builder. It unifies a 21-engine procedural gradient generator, a 9-column semantic theme palette generator with per-color locking, an artisan color catalog with WCAG contrast badges, and multi-format export.

---

## 🚀 Quick Usage

```svelte
<script lang="ts">
  import { ThemeStudio, ThemePicker } from 'fractalthemer';

  let studioOpen = $state(false);
</script>

<!-- Open via standalone trigger -->
<button onclick={() => (studioOpen = true)}>
  Open Studio
</button>

<!-- Full-screen Studio Interface -->
<ThemeStudio open={studioOpen} onClose={() => (studioOpen = false)} />

<!-- Or open directly from inside <ThemePicker /> -->
<ThemePicker />
```

---

## ⚡ The 21 Generator Engines

| Category | Engines (7 each) | Key Parameters |
|---|---|---|
| **Fields (7)** | `flow`, `sky`, `aurora`, `mesh`, `still`, `retro`, `ios` | `Scale`, `Distortion`, `Lights`, `Fold`, `Drift`, `Spread`, `Direction` |
| **Stripes (7)** | `linear`, `stripes`, `bars`, `columns`, `prism`, `waves`, `lines` | `Count`, `Speed`, `Envelope`, `Angle`, `Tension`, `Thickness` |
| **Objects (7)** | `rings`, `pixel`, `blocks`, `beehive`, `balls`, `radial`, `conic` | `Cell Size`, `Edge Softness`, `Steps`, `Radius`, `Decay` |

---

## 📦 Multi-Target Export
- **CSS**: Pure vanilla `linear-gradient` / `radial-gradient` / `@keyframes`
- **SASS**: Single-tab indented `$variables` and `@mixin`
- **SVG**: Vector graphics with `<defs>` linear/radial filters
- **JSON**: Serialized recipe schema
- **PNG**: High-DPI raster snapshot
