# fractalthemer

> A modern, zero-runtime-overhead theming system and visual gradient studio for SvelteKit and modern web applications. Features 42 curated light & dark themes, 203 atmospheric GPU auras, 21 procedural gradient generator engines, a 9-column lockable semantic theme palette generator, and full-bleed visual studio tooling.

[![npm version](https://img.shields.io/npm/v/fractalthemer.svg)](https://www.npmjs.com/package/fractalthemer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)

---

## ✨ Features

### 🎨 Visual Theme Studio & Gradient Builder
- **21 Generator Engines**:
  - **7 Fields**: *Flow, Sky, Aurora, Mesh, Still, Retro, iOS*.
  - **7 Stripes**: *Linear, Stripes, Bars, Columns, Prism, Waves, Lines*.
  - **7 Objects**: *Rings, Pixel, Blocks, Beehive, Balls, Radial, Conic*.
- **Direct Canvas Ergonomics**: Draggable color emitter pins and outer ring radius handles directly on the canvas viewport.
- **Multi-Band Reach Timeline**: Live distribution slider to rebalance color dominance across your blend.
- **Finish Controls**: `Soften` (Gaussian blur / liquid feathering) & `Noise` (procedural grain dither to eliminate 8-bit digital banding).
- **Typography & Contrast Check**: Real-time readability heatmap evaluating foreground text against dynamic backgrounds.

### 🌈 9-Column Semantic Theme Palette Generator
- **Exact Semantic Token Mapping**:
  1. `--bg`: Deepest application canvas
  2. `--bg-surface`: Card and article container surface
  3. `--bg-panel`: Sidebar, toolbar, and drawer panel
  4. `--bg-raised`: Elevated modal dialog and popover
  5. `--state-hover`: Neutral hover background tint
  6. `--state-hover-subtle`: Gentle list-item and row hover tint
  7. `--border`: Primary separator and card outline border
  8. `--theme-color`: Primary brand action and accent color
  9. `--theme-color-alt`: Accent hover and active button state
- **Per-Color Locking (`🔒` / `🔓`)**: Lock any number of swatches to freeze specific colors while randomizing or harmonizing the rest.
- **8 Color Harmony Algorithms**: *Monochromatic, Analogous, Complementary, Split-Comp, Triadic, Tetradic, Shades, Tints*.
- **WCAG Contrast Ratios**: Live contrast ratings against White (`W:`) and Black (`B:`) on every column.
- **Instant Live Application**: One-click **"✦ Apply Theme"** applies tokens directly to your running application.

### 🏛 Curated Catalogs & Drawer UI
- **42 Curated Themes**: 21 Light and 21 Dark palettes (*Emerald, Himalaya, Editorial, Nord, Dracula, Catppuccin Mocha, Gruvbox, OneDark, Synthwave, Obsidian Crimson, Rose Pine, Amethyst Void*, etc.).
- **203 Atmospheric Auras**: GPU-accelerated atmospheric blend shaders across 8 categories (*aura, mesh, glass, grain, flux, nebula, lattice, prism*).
- **70+ Gallery Studies**: One-click preset gradient browser.
- **Artisan Color Catalog**: Comprehensive designer color reference sortable by *Hue*, *Light to dark*, and *Dark to light*.
- **100vh Responsive Drawer (`<ThemePicker />`)**: Mobile-ready right drawer with search, mode toggle, and studio launcher.
- **Zero-Flicker SSR Script**: Synchronous `localStorage` synchronization preventing Flash of Unstyled Content (FOUC).

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

<!-- Ambient GPU aura shader / gradient background layer -->
<AuraBackground />

<div class="appshell">
  <header>
    <!-- Drawer launcher with Theme Studio button & Sun/Moon toggle -->
    <ThemePicker />
  </header>

  <main>
    {@render children()}
  </main>
</div>
```

---

## 🛠 Using the Standalone Theme Studio & Palette Generator

You can mount the Theme Studio or Palette Generator as dedicated pages or modal components in your app:

### Standalone Theme Studio Page (`src/routes/studio/+page.svelte`)

```svelte
<script lang="ts">
  import { ThemeStudio } from 'fractalthemer';
</script>

<ThemeStudio open={true} />
```

### Standalone Palette Generator Component

```svelte
<script lang="ts">
  import { PaletteGenerator } from 'fractalthemer';

  function handleThemeApplied(columns) {
    console.log('Custom theme applied with columns:', columns);
  }
</script>

<PaletteGenerator onApply={handleThemeApplied} />
```

---

## 💅 Styling Options

### Option A: Precompiled CSS (Zero-Config)
```typescript
import 'fractalthemer/styles.css';
```

### Option B: Raw Indented SASS Imports
```sass
// Master bundle (all tokens, themes, auras, drawer, studio)
@use 'fractalthemer/styles'

// Or granular sub-modules:
@use 'fractalthemer/tokens'   // 22 semantic color tokens (_tokens.sass)
@use 'fractalthemer/themes'   // 42 curated theme classes (_themes.sass)
@use 'fractalthemer/auras'    // GPU gradient aura blend shaders (_auras.sass)
@use 'fractalthemer/picker'   // 100vh responsive right drawer (_theme-picker.sass)
@use 'fractalthemer/studio'   // Theme studio & canvas styles (_studio.sass)
@use 'fractalthemer/palette-gen' // 9-column palette styles (_palette-gen.sass)
```

---

## 📄 Documentation

Comprehensive architecture guides, component APIs, and token specifications are available in [`docs/`](./docs/INDEX.md):

### 📖 Guides
- [Quickstart Guide](./docs/guides/01-quickstart.md): Step-by-step setup in any SvelteKit project.
- [Zero-Flicker SSR Guide](./docs/guides/02-anti-flicker-guide.md): Storage synchronization and instant initialization.
- [Theme Studio Guide](./docs/guides/06-theme-studio-guide.md): Full walkthrough of 21 generator engines, canvas pins, and exports.
- [Palette Generator Guide](./docs/guides/07-palette-generator-guide.md): 9-column token mapping, locking, and harmony algorithms.
- [API & Conditional Rendering Guide](./docs/guides/05-api-guide.md): `{#if themeState.isDark}` templates and component recipes.

### 🧩 Components
- [`<ThemeStudio />`](./docs/components/ThemeStudio.md): Full-screen studio interface with 21 gradient engines.
- [`<PaletteGenerator />`](./docs/components/PaletteGenerator.md): 9-column lockable semantic theme palette generator.
- [`<ThemePicker />`](./docs/components/ThemePicker.md): 100vh right sliding drawer, responsive layout, search, and props.
- [`<AuraBackground />`](./docs/components/AuraBackground.md): Multi-layer GPU blend shader rendering.
- [`<ThemeToggle />`](./docs/components/ThemeToggle.md): Compact Sun/Moon toggle button.
- [`<ThemeScript />`](./docs/components/ThemeScript.md): Head script injector for zero-flicker SSR hydration.

### 🎨 Catalogs
- [21 Gradient Generator Engines Catalog](./docs/themes/04-21-generator-engines.md): Technical parameters for Fields, Stripes, and Objects.
- [Artisan Colors Catalog](./docs/themes/05-artisan-colors-palette.md): Designer color library with WCAG contrast ratings.
- [42 Curated Themes Catalog](./docs/themes/01-theme-catalog.md): Complete index of all 21 Light and 21 Dark curated themes.
- [Atmospheric Auras Catalog](./docs/themes/02-auras-catalog.md): 203 atmospheric gradient blend presets.

---

## 📜 License

MIT © [Fractal Mandala](https://github.com/fractalmandala)