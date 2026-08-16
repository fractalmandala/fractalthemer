# fractalthemer

> An ultra-light, zero-runtime-overhead theming and ambient background system for SvelteKit and modern web applications. Features 42 curated light & dark themes, 203 atmospheric GPU auras, 257 CSS background patterns, vibrant gradient presets, and a responsive drawer with strict background isolation.

[![npm version](https://img.shields.io/npm/v/fractalthemer.svg)](https://www.npmjs.com/package/fractalthemer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)

---

## ✨ Features

### 🏛 42 Curated Light & Dark Themes
- **21 Light Themes**: Clean editorial palettes, soft off-whites, terracotta ceramics, and vibrant accents (*Emerald Light, Paper Light, Botanical, Latte, Clay Studio, Nord Light, Matcha, Sunset Amber*, etc.).
- **21 Dark Themes**: Deep obsidian canvases, velvety darks, and neon synthwaves (*Dracula, Catppuccin Mocha, Nord Dark, Gruvbox, OneDark Pro, Synthwave, Obsidian Crimson, Amethyst Void*, etc.).
- **22 Semantic CSS Tokens**: Standardized `:root` CSS variables mapped across `--bg`, `--bg-surface`, `--bg-panel`, `--text-primary`, `--theme-color`, `--border`, etc.

### 🌌 203 Atmospheric GPU Aura Presets
- Multi-layer GPU-accelerated atmospheric gradient blends calibrated to match every theme.
- Categorized across *aura, mesh, glass, grain, flux, nebula, lattice, prism*.

### 📐 257 CSS Background Patterns
- Curated vector-grade CSS background patterns across 4 categories:
  - **📐 Geometric (99)**: Dots, grids, isometric cubes, diagonals, checks, zigzags, honeycombs, circuits, cross-hashes.
  - **✨ Effects (66)**: Spotlights, light beams, cyber scanlines, bokeh, particles, starfields.
  - **🌈 Gradients (48)**: Multi-stop mesh gradients, chromatic conic sweeps, sunsets, twilight velvet blends.
  - **🎨 Decorative (44)**: Luxury radial glows, badge frames, vignette halos, organic curvature.

### 🛡️ Strict Background Interchangeability & Isolation
- **1 Unified Navigation System**: Seamlessly switch between `Plain`, `Aura`, `Gradient`, and `Pattern` in the drawer.
- **Full Isolation**: Setting any background type automatically clears and replaces previous styles, eliminating leftover blurs, overlays, or conflicting CSS properties.
- **Pointer-Events Isolation**: Backdrops operate strictly at `z-index: -1` with `pointer-events: none !important`.

### ⚡ Pure Svelte 5 Runes & Zero-Flicker SSR
- Reactive Svelte 5 state management via `themeState` (`$state`, `$derived`).
- Anti-flicker SSR script preventing Flash of Unstyled Content (FOUC) across page reloads and browser hydration.

---

## 📦 Installation & Setup

### 1. Install Package

```bash
pnpm add fractalthemer
# or
npm install fractalthemer
```

### 2. Zero-Flicker SSR Script (`src/app.html`)

Add the anti-flicker initialization script into `<head>` inside `src/app.html` to guarantee instant theme synchronization before initial paint:

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

### 3. Add to Root Layout (`src/routes/+layout.svelte`)

```svelte
<script lang="ts">
  import 'fractalthemer/styles.css';
  import { AuraBackground, ThemePicker } from 'fractalthemer';

  let { children } = $props();
</script>

<!-- Ambient background layer (handles Plain, Aura, Gradient, and Pattern) -->
<AuraBackground />

<div class="appshell">
  <header>
    <!-- Drawer launcher & mode switcher -->
    <ThemePicker />
  </header>

  <main>
    {@render children()}
  </main>
</div>
```

---

## 🕹️ Runtime State & API (`themeState`)

Import `themeState` anywhere in your application for reactive runes-based theme control:

```typescript
import { themeState } from 'fractalthemer';

// Switch theme
themeState.setTheme('theme-dracula-dark');

// Toggle light / dark mode
themeState.toggleMode();

// Switch background style ('plain' | 'aura' | 'gradient' | 'pattern')
themeState.setBgStyle('aura');
themeState.setAura('aura-midnight-emerald');
themeState.setGradient('grad-sunset-violet');
themeState.setPattern('pat-cyber-grid');

// Cycle themes
themeState.cycleNext();
themeState.cycleRandom();
```

---

## 💅 Styling Options

### Option A: Precompiled CSS (Zero-Config)
```typescript
import 'fractalthemer/styles.css';
```

### Option B: Raw Indented SASS Imports
```sass
// Master bundle (tokens, themes, auras, patterns, drawer)
@use 'fractalthemer/styles'

// Or granular sub-modules:
@use 'fractalthemer/tokens'   // 22 semantic color tokens (_tokens.sass)
@use 'fractalthemer/themes'   // 42 curated theme classes (_themes.sass)
@use 'fractalthemer/auras'    // GPU gradient aura & pattern shaders (_auras.sass)
@use 'fractalthemer/picker'   // Responsive right drawer (_theme-picker.sass)
```

---

## 📄 Documentation

Comprehensive architecture guides, component APIs, and token specifications:

### 📖 Guides
- [Quickstart Guide](./docs/guides/01-quickstart.md): Step-by-step setup in any SvelteKit project.
- [Zero-Flicker SSR Guide](./docs/guides/02-anti-flicker-guide.md): Storage synchronization and instant initialization.
- [Custom Themes & Storage Guide](./docs/guides/03-custom-themes.md): Saving, deleting, and rehydrating custom themes.
- [API & Conditional Rendering Guide](./docs/guides/05-api-guide.md): `{#if themeState.isDark}` templates and component recipes.

### 🧩 Components
- [`<ThemePicker />`](./docs/components/ThemePicker.md): Responsive right sliding drawer with search, mode switcher, and instant preview.
- [`<AuraBackground />`](./docs/components/AuraBackground.md): Ambient background layer for Plain, Aura, Gradient, and Pattern modes.
- [`<ThemeToggle />`](./docs/components/ThemeToggle.md): Compact Sun/Moon toggle button.
- [`<ThemeScript />`](./docs/components/ThemeScript.md): Head script injector for zero-flicker SSR hydration.

### 🎨 Catalogs
- [42 Curated Themes Catalog](./docs/themes/01-theme-catalog.md): Complete index of all 21 Light and 21 Dark curated themes.
- [Atmospheric Auras Catalog](./docs/themes/02-auras-catalog.md): 203 atmospheric gradient blend presets.
- [Gradient Presets Catalog](./docs/themes/03-gradients-catalog.md): Curated gradient backgrounds.

---

## 📜 License

MIT © [Fractal Mandala](https://github.com/fractalmandala)