---
id: theme-picker-component
title: ThemePicker Component & 100vh Drawer Reference
type: design
tags: [components, drawer, themepicker, off-canvas, svelte5, ui]
summary: Complete functional logic and specification for the 100vh right off-canvas theme drawer, tabs, filters, and mobile breakpoints.
relates_to: [state-and-reactivity, responsive-drawer-guide, aura-background-component]
source: src/lib/components/ThemePicker.svelte
updated: 2026-08-16
---

# ThemePicker Component & 100vh Off-Canvas Drawer

The [`ThemePicker.svelte`](../../src/lib/components/ThemePicker.svelte) component is the primary interface for user theme exploration. It renders a trigger button cluster (quick mode toggle + palette icon) that opens a hardware-accelerated, full-height `100vh` off-canvas drawer sliding from the right edge of the screen.

---

## 🎯 Functional Specification

- **Role**: Primary UI drawer allowing users to switch themes, toggle plain vs. aura background modes, filter by Light/Dark/Custom palettes, cycle randomly, and reset preferences.
- **Placement**: Fixed to the right viewport edge (`right: 0; top: 0; bottom: 0;`).
- **Dimensions**:
  - Desktop (`≥ 1025px`): `width: 360px`, `height: 100vh` (and `100dvh`).
  - Mobile / Tablet (`≤ 1024px`): `width: 180px`, `height: 100vh` (and `100dvh`).
- **Scrolling**: `overflow-y: scroll` with thin scrollbars, sticky headers, and sticky footers.
- **Dismissal**: Dismisses on outside click (via `.theme-drawer-backdrop`), `Escape` keyboard shortcut, explicit close `✕` button, or selecting the Studio link.

---

## ⚙️ Component Props

```typescript
interface Props {
    studioHref?: string;          // Target URL for Studio button (default: '/studio')
    showStudioLink?: boolean;     // Whether to display the Studio navigation button (default: true)
    showModeToggle?: boolean;     // Whether to show the Sun/Moon button next to palette trigger (default: true)
    triggerButton?: Snippet;      // Optional custom Svelte 5 snippet to override the palette button
}
```

---

## 🧬 State & Svelte 5 Runes Breakdown

Inside [`src/lib/components/ThemePicker.svelte`](../../src/lib/components/ThemePicker.svelte):

### 1. Local Runes State
- `let activeTab = $state<'all' | 'light' | 'dark' | 'gradients' | 'custom'>('all');`: Tracks the active category tab.
- `let searchFilter = $state<string>('');`: Supports instant substring filtering across theme names, aura names, and gradient preset names.
- `let pickerEl = $state<HTMLDivElement | null>(null);`: Binds to the root container for outside-click boundary calculations.

### 2. Derived Filters
```typescript
const filteredThemes = $derived.by(() => {
    let list: ThemeInfo[] = [];
    if (activeTab === 'light') list = LIGHT_THEMES;
    else if (activeTab === 'dark') list = DARK_THEMES;
    else if (activeTab === 'custom') list = themeState.customThemes;
    else list = themeState.allThemes;

    if (!searchFilter.trim()) return list;

    const q = searchFilter.toLowerCase().trim();
    return list.filter(
        (t) =>
            t.name.toLowerCase().includes(q) ||
            t.id.toLowerCase().includes(q) ||
            t.auraName.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
    );
});

const filteredGradients = $derived.by(() => {
    if (!searchFilter.trim()) return GRADIENT_PRESETS;
    const q = searchFilter.toLowerCase().trim();
    return GRADIENT_PRESETS.filter(
        (g) => g.name.toLowerCase().includes(q) || g.id.toLowerCase().includes(q)
    );
});
```

### 3. Lifecycle Hooks (`onMount`)
- Initializes `themeState.init()` to synchronize `localStorage` values.
- Registers global event listeners for `click` outside and `Escape` key.
- Tears down event listeners cleanly on component unmount.

---

## 🎨 Drawer DOM & Style Hierarchy

```
<div class="theme-controls">
  ├── <button class="theme-icon-btn"> (Quick Sun/Moon Mode Toggle)
  ├── <button class="theme-icon-btn"> (Palette Trigger)
  └── {#if themeState.isOpen}
      ├── <div class="theme-drawer-backdrop"> (Click outside dismiss overlay)
      └── <div class="theme-popover" role="dialog"> (100vh Fixed Drawer)
          ├── <div class="theme-style-switcher"> (Sticky Plain vs Aura vs Gradient + Close Button)
          ├── <div class="theme-tabs"> (Sticky All / Light / Dark / Gradients / Custom / Next Filter Tabs)
          ├── <div class="theme-search-bar"> (Sticky Live Search Input)
          ├── <div class="theme-grid-container"> (Scrollable Themes or 180+ Gradients Grid)
          │    ├── {#each filteredThemes as theme}
          │    │    └── <button class="theme-card"> (Theme preview dot swatches + Aura tag)
          │    └── {#each filteredGradients as grad}
          │         └── <button class="theme-gradient-card"> (Gradient bar + Swatch dots)
          └── <div class="theme-popover-footer"> (Sticky Reset to Default & Random buttons)
```

---

## 📐 Responsive Breakpoint Rules

Styled in [`_theme-picker.sass`](../../src/lib/styles/_theme-picker.sass):

### Desktop (`≥ 1025px`)
- Drawer width is **360px**.
- Theme grid uses `grid-template-columns: repeat(auto-fill, minmax(130px, 1fr))` rendering 2 columns of rich preview cards.
- Mode switcher buttons and tab bars span horizontally with ample spacing.

### Mobile & Tablet (`≤ 1024px`)
- Drawer width is **180px**.
- Theme grid switches to a **single-column** layout (`grid-template-columns: 1fr`).
- Plain/Aura toggle buttons stack into a full-width button group.
- Font sizes and padding adapt to prevent horizontal overflow or clipping.

---

## 🔗 Related Documents

- [State & Reactivity](../architecture/02-state-and-reactivity.md)
- [Responsive Drawer Guide](../guides/04-responsive-drawer.md)
- [Theme Catalog](../themes/01-theme-catalog.md)
