---
id: docs-index
title: Fractal Themer Documentation Index
type: design
tags: [theming, svelte5, auras, dark-mode, tokens, documentation]
summary: Central navigation manifest and architecture map for the fractalthemer Svelte 5 theming system.
relates_to: [architecture-overview, theme-picker-component, theme-catalog]
updated: 2026-08-16
---

# Fractal Themer Documentation

`fractalthemer` is a standalone, drop-in theming and atmospheric aura engine for Svelte 5 and SvelteKit. It provides full control over binary light/dark modes, 42 curated tiered color palettes, GPU-accelerated gradient blend layers, and a responsive 100vh right off-canvas drawer.

---

## 🗺 Documentation Map

### 🏛 Architecture & Core Concepts
- [**System Overview**](./architecture/01-overview.md): High-level system architecture, package structure, and design principles.
- [**State & Reactivity**](./architecture/02-state-and-reactivity.md): Detailed breakdown of the Svelte 5 `$state` and `$derived` runes in `themeState`.
- [**Tokens & CSS Contract**](./architecture/03-tokens-and-css-contract.md): Utopia fluid type/space scales, elevation surfaces, and semantic custom properties.

### 🧩 Components Reference
- [**ThemeStudio.svelte**](./components/ThemeStudio.md): Full-screen theme creation studio with 21 gradient engines and multi-target export.
- [**PaletteGenerator.svelte**](./components/PaletteGenerator.md): 9-column semantic theme palette generator with per-color locking and live contrast ratios.
- [**ThemePicker.svelte**](./components/ThemePicker.md): Complete functional logic for the 100vh right off-canvas drawer, responsive breakpoints (360px / 180px), tabs, and backdrop.
- [**AuraBackground.svelte**](./components/AuraBackground.md): Multi-layer GPU blend shader rendering, CSS filters, and blend mode mechanics.
- [**ThemeToggle.svelte**](./components/ThemeToggle.md): Standalone compact Sun/Moon mode switcher component.
- [**ThemeScript.svelte**](./components/ThemeScript.md): Head script injector preventing Flash of Unstyled Content (FOUC) on SSR.

### 📖 Integration & How-To Guides
- [**Quickstart Guide**](./guides/01-quickstart.md): Step-by-step setup in any new or existing SvelteKit project.
- [**Zero-Flicker SSR Guide**](./guides/02-anti-flicker-guide.md): How storage synchronization and inline `<script>` initialization prevent theme flashing.
- [**Custom Themes & Studio Guide**](./guides/03-custom-themes.md): Runtime token overriding, custom aura layers, and `localStorage` persistence.
- [**Responsive Drawer Layout**](./guides/04-responsive-drawer.md): Mobile drawer ergonomics, touch scrolling, and 180px vs 360px viewport behavior.

### 🎨 Palettes & Shaders
- [**Theme Catalog (42 Themes)**](./themes/01-theme-catalog.md): Complete index of all 21 Light and 21 Dark curated themes with swatch values and descriptions.
- [**Auras Catalog**](./themes/02-auras-catalog.md): Complete listing of atmospheric gradient blend presets, node coordinates, and blend modes.
- [**Gradients Catalog (180+ Presets)**](./themes/03-gradients-catalog.md): Comprehensive catalog of 180+ curated vibrant gradient presets and background samplers.

---

## 📦 Package Source Code Links

| Module | Source Link | Purpose |
|---|---|---|
| Main Entrypoint | [`src/lib/index.ts`](../src/lib/index.ts) | Public API exports |
| State Manager | [`src/lib/state/theme.svelte.ts`](../src/lib/state/theme.svelte.ts) | Svelte 5 reactive singleton |
| Theme Drawer | [`src/lib/components/ThemePicker.svelte`](../src/lib/components/ThemePicker.svelte) | Off-canvas drawer component |
| Aura Backdrop | [`src/lib/components/AuraBackground.svelte`](../src/lib/components/AuraBackground.svelte) | Ambient gradient renderer |
| Mode Toggle | [`src/lib/components/ThemeToggle.svelte`](../src/lib/components/ThemeToggle.svelte) | Quick Sun/Moon toggle |
| Master Styles | [`src/lib/styles/index.sass`](../src/lib/styles/index.sass) | SASS root bundle |
| Tokens Sass | [`src/lib/styles/_tokens.sass`](../src/lib/styles/_tokens.sass) | CSS custom properties & fluid scales |
| Themes Sass | [`src/lib/styles/_themes.sass`](../src/lib/styles/_themes.sass) | 42 theme definitions |
| Auras Sass | [`src/lib/styles/_auras.sass`](../src/lib/styles/_auras.sass) | GPU blend layer styles |
| Drawer Sass | [`src/lib/styles/_theme-picker.sass`](../src/lib/styles/_theme-picker.sass) | Drawer layout & animations |
| Theme Data | [`src/lib/data/themes.ts`](../src/lib/data/themes.ts) | Metadata and token maps |
| Anti-Flicker | [`src/lib/utils/anti-flicker.ts`](../src/lib/utils/anti-flicker.ts) | Zero-dependency SSR script builder |
