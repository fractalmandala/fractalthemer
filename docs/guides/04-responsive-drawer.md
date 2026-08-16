---
id: responsive-drawer-guide
title: 100vh Responsive Drawer & Mobile Breakpoints Guide
type: design
tags: [drawer, responsive, breakpoints, mobile-design, css]
summary: Detailed guide covering the layout, touch ergonomics, and responsive width transitions (360px desktop, 180px mobile) of the ThemePicker drawer.
relates_to: [theme-picker-component, tokens-and-css-contract]
updated: 2026-08-16
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
| [◻ Plain] [✨ Aura]   🎨 Studio [✕]|    | [◻ Pl] [✨ Au]    |
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
- **Header**: Inline style toggle group side-by-side with the Studio link and Close button.
- **Tabs**: Full tab labels with theme counts (`All (42)`, `Light (21)`, `Dark (21)`).

### 2. Mobile / Compact (`≤ 1024px`)
- **Width**: `180px`.
- **Card Layout**: Single-column vertical stream (`grid-template-columns: 1fr`).
- **Header**: Stacked style toggle group adapting to narrow width.
- **Tabs**: Compact padding and wrapped chips.
- **Cards**: Single column with truncated text labels to prevent horizontal scrolling.

---

## 🖐 Touch Ergonomics & Scrolling

1. **`overflow-y: scroll`**: Enables momentum touch scrolling on iOS (`-webkit-overflow-scrolling: touch`).
2. **Sticky Header & Footer**: Style switcher controls and reset actions stay anchored at top and bottom while the user scrolls through the 42 themes.
3. **Backdrop Dismiss**: Clicking or tapping the semi-transparent blurred backdrop closes the drawer instantly.

---

## 🔗 Related Documents

- [ThemePicker Component](../components/ThemePicker.md)
- [Quickstart Guide](./01-quickstart.md)
