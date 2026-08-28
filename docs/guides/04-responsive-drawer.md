---
id: responsive-drawer-guide
title: 100vh Responsive Drawer & Mobile Breakpoints Guide
type: design
tags: [drawer, responsive, breakpoints, mobile-design, css]
summary: Detailed guide covering the layout, touch ergonomics, and responsive width transitions (360px desktop, 180px mobile) of the ThemePicker drawer.
relates_to: [theme-picker-component, tokens-and-css-contract]
updated: 2026-08-28
---

# 100vh Responsive Drawer & Mobile Breakpoints Guide

The theme selection interface in `fractalthemer` is structured as a full-height `100vh` off-canvas drawer that slides smoothly from the right side of the screen.

---

## 📱 Breakpoint Specifications

The drawer layout automatically transitions at the **1024px** breakpoint:

```
Desktop (>= 1025px)                       Mobile (<= 1024px)
+------------------------------------+    +------------------+
| 360px Wide                         |    | 180px Wide       |
| [◻ Plain] [✨ Aura]          [✕]|    | [◻ Pl] [✨ Au]    |
| [All] [Light] [Dark] [Custom] NEXT |    | [✕ Close] [🎨]   |
| +--------------------------------+ |    | [All] [Lt] [Dk]  |
| | Card 1       | Card 2          | |    | +--------------+ |
| +--------------------------------+ |    | | Card 1       | |
| | Card 3       | Card 4          | |    | +--------------+ |
| +--------------------------------+ |    | | Card 2       | |
| [Reset to Default]      [🎲 Random]|    | +--------------+ |
+------------------------------------+    | [Reset] [Random] |
                                          +------------------+
```

---

## 📐 Breakpoint Rules

### 1. Desktop (`≥ 1025px`)
- **Width**: `360px`.
- **Card Layout**: Multi-column auto-fill grid (`grid-template-columns: repeat(auto-fill, minmax(130px, 1fr))`).
- **Header**: Inline style toggle group side-by-side with the Close button.
- **Tabs**: Full tab labels with theme counts (`All (41)`, `Light (21)`, `Dark (20)`).

### 2. Mobile / Compact (`≤ 1024px`)
- **Width**: `180px`.
- **Card Layout**: Single-column vertical stream (`grid-template-columns: 1fr`).
- **Header**: Stacked style toggle group adapting to narrow width.
- **Tabs**: Compact padding and wrapped chips.
- **Cards**: Single column with truncated text labels to prevent horizontal scrolling.

---

## 🖐 Touch Ergonomics & Scrolling

1. **`overflow-y: scroll`**: Enables momentum touch scrolling on iOS (`-webkit-overflow-scrolling: touch`).
2. **Sticky Header & Footer**: Style switcher controls and reset actions stay anchored at top and bottom while the user scrolls through the 41 themes and background catalogs.
3. **Backdrop Dismiss**: Clicking or tapping the semi-transparent blurred backdrop closes the drawer instantly.

---

## 🚪 Driving the Drawer from Your Own Buttons

You don't need fractalthemer's palette icon to open the drawer — the drawer is driven entirely by `themeState`. Any button in your chrome can toggle it:

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<button
  type="button"
  aria-haspopup="dialog"
  aria-expanded={themeState.isOpen}
  onclick={() => themeState.togglePicker()}
>
  {#if themeState.isOpen}
    ✕ Close
  {:else}
    🎨 Themes
  {/if}
</button>
```

- `themeState.togglePicker()` — flips open/closed (verified: this is exactly what the built-in palette trigger calls).
- `themeState.openPicker()` / `themeState.closePicker()` — one-directional control (e.g. a palette icon that only ever opens; the drawer's own backdrop, `Escape`, and `✕` handle closing).
- `themeState.isOpen` — boolean `$state`, drives `{#if}/{:else}` icon swaps and `aria-expanded`.

A full copy-paste recipe pairing this with a custom mode toggle: [Recipe D: Build Your Own Mode & Picker Toggles](./05-api-guide.md).

---

## 🔗 Related Documents

- [ThemePicker Component](../components/ThemePicker.md)
- [API Guide — Custom Toggles](./05-api-guide.md)
- [Quickstart Guide](./01-quickstart.md)
