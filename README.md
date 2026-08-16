# fractalthemer

> A production-ready, drop-in Svelte 5 Theming & Atmospheric Visuals Engine featuring **42 curated Light & Dark themes**, **GPU-accelerated atmospheric auras**, **180+ vibrant linear gradient presets**, and a responsive **100vh off-canvas right drawer**.

[![npm version](https://img.shields.io/npm/v/fractalthemer.svg)](https://www.npmjs.com/package/fractalthemer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)

---

## ✨ Features

- **42 Curated Tiered Themes**: 21 Light and 21 Dark themes calibrated with distinct accents, surfaces, and contrast ratios (Emerald, Himalaya, Editorial, Nord, Dracula, Catppuccin Mocha, Gruvbox, OneDark, Synthwave, Obsidian Crimson, Rose Pine, Amethyst Void, and more).
- **Three Background Modes (`bgStyle`)**:
  - `plain`: Clean, distraction-free flat surface backgrounds.
  - `aura`: GPU-accelerated atmospheric radial/linear blend shaders calibrated to every theme.
  - `gradient`: Full viewport linear gradient backdrops chosen from 180+ presets.
- **180+ Vibrant Gradient Presets**: Rich, named linear gradients (*Omolon, Farhan, Radioactive Heat, The Sky And The Sea, From Ice To Fire, Blue & Orange, Lunada, Mango, YouTube, Instagram, Netflix, After the Rain, Hyper Blue*, etc.) with live search and color swatch samplers.
- **100vh Right Off-Canvas Drawer (`<ThemePicker />`)**: Full-height drawer sliding from the right edge (`360px` on desktop, `180px` on mobile `≤1024px`), backdrop dismiss, `Escape` key dismiss, tabbed categorization, and live search.
- **Zero-Flicker SSR Script**: Instant localStorage synchronization before initial DOM paint to completely prevent Flash of Unstyled Content (FOUC) or mode flicker.
- **Svelte 5 Runes Architecture**: Reactive singleton state manager built with `$state` and `$derived`.
- **Dual Styles Architecture**: Use either precompiled zero-config CSS (`import 'fractalthemer/styles.css'`) or modular indented SASS partials (`@use 'fractalthemer/tokens'`).
- **Semantic Design Tokens Contract**: Complete Utopia fluid typography and spacing scales, 3-tier elevation surfaces, and semantic custom properties (`--bg`, `--bg-surface`, `--text-primary`, `--theme-color`, etc.).
- **Custom Theme Studio Support**: Save, update, and persist custom token overrides and multi-layer aura blends in `localStorage`.

---

## 📦 Installation

```bash
pnpm add fractalthemer
# or
npm install fractalthemer
```

---

## 🚀 Quickstart Guide

### 1. Zero-Flicker SSR Setup (`src/app.html`)

Add the anti-flicker initialization script into `<head>` inside `src/app.html`. This ensures the user's saved theme, dark mode preference, and background style are applied to `<html>` synchronously before hydration:

```html
<!doctype html>
<html lang="en" class="theme-light-default" data-theme="theme-light-default" data-mode="light" data-bg-style="plain">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      (function () {
        try {
          var darkThemes = [
            'theme-lagoona-dark', 'theme-frozen-dark', 'theme-night-dark',
            'theme-inkworm-dark', 'theme-monochrono-dark', 'theme-fouram-dark',
            'theme-wintercame-dark', 'theme-sun-dark', 'theme-console-dark',
            'theme-dracula-dark', 'theme-catppuccin-mocha', 'theme-nord-dark',
            'theme-gruvbox-dark', 'theme-onedark-pro', 'theme-rose-pine-dark',
            'theme-midnight-emerald-dark', 'theme-obsidian-crimson-dark',
            'theme-synthwave-dark', 'theme-deep-ocean-dark', 'theme-amethyst-void-dark'
          ];
          var saved = localStorage.getItem('theme') || 'theme-light-default';
          var savedBg = localStorage.getItem('bgStyle') || 'plain';
          var savedGrad = localStorage.getItem('gradient');
          var isDark = darkThemes.indexOf(saved) !== -1 || saved.indexOf('-dark') !== -1 || saved.indexOf('-mocha') !== -1;
          var mode = isDark ? 'dark' : 'light';
          var root = document.documentElement;
          root.className = saved;
          root.setAttribute('data-theme', saved);
          root.setAttribute('data-mode', mode);
          root.setAttribute('data-bg-style', savedBg);
          root.style.colorScheme = mode;
        } catch (e) {}
      })();
    </script>
    %sveltekit.head%
  </head>
  <body>
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

### 2. Add to Root Layout (`src/routes/+layout.svelte`)

```svelte
<script lang="ts">
  import 'fractalthemer/styles.css';
  import { AuraBackground, ThemePicker } from 'fractalthemer';

  let { children } = $props();
</script>

<!-- Ambient GPU aura shader / gradient background layer -->
<AuraBackground />

<header>
  <!-- Full-height 100vh right drawer launcher + sun/moon toggle -->
  <ThemePicker />
</header>

<main>
  {@render children()}
</main>
```

---

## 🎨 Styles & SASS Architecture

`fractalthemer` supports both **precompiled CSS** and **modular indented SASS (`.sass`)**.

### Option A: Precompiled CSS (Recommended)
Import the master stylesheet in your root layout:

```typescript
import 'fractalthemer/styles.css';
```

This single import bundles:
- **42 Theme Palettes**: Complete CSS variable maps for all 21 Light and 21 Dark themes.
- **Atmospheric Auras**: Multi-layer GPU blend shaders for `.aura-ambient`.
- **180+ Gradient Presets**: Viewport canvas shaders for `.aura-gradient-backdrop`.
- **100vh Drawer**: Slide-in animations, responsive breakpoints (`360px` / `180px`), tabs, and search bar.
- **Semantic Tokens**: CSS custom properties for surfaces, borders, typography, and states.

### Option B: Raw Indented SASS Imports (For SASS projects)
If your project compiles indented SASS (`.sass`) or SCSS, you can `@use` the raw files directly:

```sass
// Master bundle (all tokens, themes, auras, drawer)
@use 'fractalthemer/styles'

// Or granular sub-modules:
@use 'fractalthemer/tokens'   // CSS variables & Utopia scales (_tokens.sass)
@use 'fractalthemer/themes'   // 42 light/dark theme classes (_themes.sass)
@use 'fractalthemer/auras'    // GPU gradient aura blend shaders (_auras.sass)
@use 'fractalthemer/picker'   // 100vh responsive right drawer (_theme-picker.sass)
```

---

## 🕹 Programmatic API (`themeState`)

The reactive singleton `themeState` provides complete control over themes, dark mode, background styles, and presets:

```typescript
import { themeState, GRADIENT_PRESETS } from 'fractalthemer';

// --- Binary Mode Toggling ---
themeState.toggleMode(); // Switches between default light & dark themes

// --- Direct Theme Selection ---
themeState.setTheme('theme-dracula-dark');
themeState.setTheme('theme-nord-dark');
themeState.setTheme('theme-catppuccin-mocha');

// --- Background Style Modes ('plain' | 'aura' | 'gradient') ---
themeState.setBgStyle('plain');    // Flat background
themeState.setBgStyle('aura');     // Atmospheric theme aura shader
themeState.setBgStyle('gradient'); // Vibrant linear gradient
themeState.toggleBgStyle();        // Cycles through plain -> aura -> gradient

// --- Gradient Presets ---
themeState.setGradient('omolon');
themeState.setGradient('radioactive-heat');
themeState.setGradient('after-the-rain');
themeState.clearGradient();

// --- Theme Cycling ---
themeState.cycleNext();   // Cycle to next theme in list
themeState.cycleRandom(); // Pick a random theme
themeState.resetDefault(); // Reset to .theme-light-default

// --- Drawer Control ---
themeState.openPicker();
themeState.closePicker();
themeState.togglePicker();

// --- Reactive State Inspection ---
console.log(themeState.current);              // Active theme ID (string)
console.log(themeState.isDark);               // boolean
console.log(themeState.isAura);               // boolean
console.log(themeState.isGradient);           // boolean
console.log(themeState.currentTheme);         // Full ThemeInfo object
console.log(themeState.activeGradientPreset); // GradientPreset object or null
```

---

## 📐 Semantic Token Contract

All themes populate the standard semantic variable interface, allowing UI components, markdown prose, terminals, and forms to automatically adapt:

| CSS Variable | Category | Purpose & Description |
|---|---|---|
| `--bg` | Surface | App canvas base backdrop surface |
| `--bg-surface` | Surface | Primary card and surface container background |
| `--bg-raised` | Surface | Elevated modals, floating headers, popovers |
| `--bg-panel` | Surface | Navbars, lateral sidebars, drawer panels |
| `--bg-footer` | Surface | Footer container background |
| `--bg-popover` | Surface | Popup menus, dropdowns, contextual dialogs |
| `--bg-dialog` | Surface | Dialog backdrop container |
| `--bg-terminal` | Surface | Terminal and code block backdrop |
| `--bg-input` | Surface | Form inputs, select boxes, textareas |
| `--bg-canvas` | Surface | Outer viewport canvas surface |
| `--border` | Border | Standard card, panel, and separator border |
| `--border-subtle` | Border | Faint inner dividers and item separators |
| `--text-primary` | Typography | Headings, titles, high-contrast text |
| `--text-secondary` | Typography | Body text, descriptions, labels |
| `--text-muted` | Typography | Captions, metadata, timestamps |
| `--text-inverse` | Typography | High-contrast text on brand accent buttons |
| `--theme-color` | Accent | Primary brand action color, active indicators |
| `--theme-color-alt` | Accent | Hover state for primary action buttons |
| `--state-hover` | State | Background tint on interactive element hover |
| `--state-hover-subtle`| State | Subtle background tint on list item hover |
| `--state-selected` | State | Active tab, selected item highlight |

---

## 🌈 Featured Gradient Presets (180+ Total)

`fractalthemer` exports the full `GRADIENT_PRESETS` catalog with 180+ curated linear gradients:

```typescript
import { GRADIENT_PRESETS } from 'fractalthemer';

// Each preset satisfies the GradientPreset interface:
// { id: string; name: string; colors: string[]; css: string; }
```

| Preset | ID | Color Hex Stops |
|---|---|---|
| **Omolon** | `omolon` | `#091E3A`, `#2F80ED`, `#2D9EE0` |
| **Farhan** | `farhan` | `#9400D3`, `#4B0082` |
| **Purple** | `purple` | `#c84e89`, `#F15F79` |
| **Ibtesam** | `ibtesam` | `#00F5A0`, `#00D9F5` |
| **Radioactive Heat** | `radioactive-heat` | `#F7941E`, `#72C6EF`, `#00A651` |
| **The Sky And The Sea** | `the-sky-and-the-sea` | `#F7941E`, `#004E8F` |
| **From Ice To Fire** | `from-ice-to-fire` | `#72C6EF`, `#004E8F` |
| **Blue & Orange** | `blue-orange` | `#FD8112`, `#0085CA` |
| **Lunada** | `lunada` | `#5433FF`, `#20BDFF`, `#A5FECB` |
| **Mango** | `mango` | `#ffe259`, `#ffa751` |
| **YouTube** | `youtube` | `#e52d27`, `#b31217` |
| **Instagram** | `instagram` | `#833ab4`, `#fd1d1d`, `#fcb045` |
| **Netflix** | `netflix` | `#8E0E00`, `#1F1C18` |
| **After the Rain** | `after-the-rain` | `#ff75c3`, `#ffa647`, `#ffe83f`, `#9fff5b`, `#70e2ff`, `#cd93ff` |
| **Neon Life** | `neon-life` | `#B3FFAB`, `#12FFF7` |
| **Hyper Blue** | `hyper-blue` | `#59CDE9`, `#0A2A88` |

*(Explore the full list in the [Gradients Catalog](./docs/themes/03-gradients-catalog.md))*

---

## 📚 Complete Documentation Suite

Comprehensive architecture specifications, component breakdowns, and integration guides are available in the [`docs/`](./docs/INDEX.md) folder:

### 🏛 Architecture
- [**Documentation Index**](./docs/INDEX.md): Central map and navigation registry.
- [**System Architecture & Topology**](./docs/architecture/01-overview.md): High-level system structure, exports, and design principles.
- [**State & Svelte 5 Runes**](./docs/architecture/02-state-and-reactivity.md): In-depth walkthrough of `$state`, `$derived`, and the `ThemeState` manager.
- [**Tokens & CSS Contract**](./docs/architecture/03-tokens-and-css-contract.md): Utopia fluid typography/space scales and 3-tier elevation surfaces.

### 🧩 Components
- [**`<ThemePicker />`**](./docs/components/ThemePicker.md): 100vh right sliding drawer, responsive 360px/180px layout, tabs, search, and props.
- [**`<AuraBackground />`**](./docs/components/AuraBackground.md): Multi-layer GPU blend shader rendering, filter mechanics, and gradient backdrops.
- [**`<ThemeToggle />`**](./docs/components/ThemeToggle.md): Compact Sun/Moon button for dense toolbars.
- [**`<ThemeScript />`**](./docs/components/ThemeScript.md): Head script injector for zero-flicker SSR hydration.

### 📖 Guides
- [**Quickstart Guide**](./docs/guides/01-quickstart.md): Step-by-step setup in any SvelteKit project.
- [**Zero-Flicker SSR Guide**](./docs/guides/02-anti-flicker-guide.md): How storage synchronization and inline `<script>` initialization prevent theme flashing.
- [**Custom Themes & Studio Guide**](./docs/guides/03-custom-themes.md): Runtime token overriding, custom aura layers, and `localStorage` persistence.
- [**Responsive Drawer Ergonomics**](./docs/guides/04-responsive-drawer.md): Mobile drawer ergonomics, touch scrolling, and 180px vs 360px viewport behavior.

### 🎨 Catalogs
- [**42 Curated Themes Catalog**](./docs/themes/01-theme-catalog.md): Complete index of all 21 Light and 21 Dark curated themes with swatch values and descriptions.
- [**Atmospheric Auras Catalog**](./docs/themes/02-auras-catalog.md): Complete listing of atmospheric gradient blend presets, node coordinates, and blend modes.
- [**180+ Vibrant Gradients Catalog**](./docs/themes/03-gradients-catalog.md): Comprehensive catalog of 180+ curated vibrant gradient presets and background samplers.

---

## 📜 License

MIT © [Fractal Mandala](https://github.com/fractalmandala)
