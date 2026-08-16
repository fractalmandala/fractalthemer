# fractalthemer

> Fractalthemer is a drop-in themeing solution for Sveltekit. It features 42 curated light and dark themes, 200+ atmospheric gradient backgrounds, and 180 linear gradient presets. This creates a highly modular themeing platform for Sveltekit. It surfaces general css tokens in the form of --bg, bg-surface, --state-hover, etc., so users can also plug into other themes like from Tailwind or Astryx.

[![npm version](https://img.shields.io/npm/v/fractalthemer.svg)](https://www.npmjs.com/package/fractalthemer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)


## ✨ Features

- 42 Curated Tiered Themes: 21 Light and 21 Dark themes calibrated with distinct accents, surfaces, and contrast ratios (Emerald, Himalaya, Editorial, Nord, Dracula, Catppuccin Mocha, Gruvbox, OneDark, Synthwave, Obsidian Crimson, Rose Pine, Amethyst Void, and more).
- Three Background Modes (`bgStyle`):
  - `plain`: Clean, distraction-free flat surface backgrounds.
  - `aura`: GPU-accelerated atmospheric radial/linear blend shaders calibrated to every theme.
  - `gradient`: Full viewport linear gradient backdrops chosen from 180+ presets.
- 180+ Vibrant Gradient Presets: Rich, named linear gradients (*Omolon, Farhan, Radioactive Heat, The Sky And The Sea, From Ice To Fire, Blue & Orange, Lunada, Mango, YouTube, Instagram, Netflix, After the Rain, Hyper Blue*, etc.) with live search and color swatch samplers.
- Styled theme picker component that operates as off-canvas drawer. 
- Zero-Flicker SSR Script: Instant localStorage synchronization before initial DOM paint to completely prevent Flash of Unstyled Content (FOUC) or mode flicker.
- Svelte 5 Runes Architecture: Reactive singleton state manager built with `$state` and `$derived`.
- Dual Styles Architecture: Use either precompiled zero-config CSS (`import 'fractalthemer/styles.css'`) or modular indented SASS partials (`@use 'fractalthemer/tokens'`).
- Semantic Design Tokens Contract: 3-tier elevation surfaces, and semantic custom properties (`--bg`, `--bg-surface`, `--text-primary`, `--theme-color`, etc.).
- While the package's internals are styled in SASS, the design tokens are usable with any CSS system.


## 📦 Install and Setup

### 1. Add package into your project

```bash
pnpm add fractalthemer
# or
npm install fractalthemer
```

### 2. Initiate zero-flicker SSR setup

Add the anti-flicker initialization script into `<head>` inside `src/app.html`. This ensures the your saved theme, dark mode preference, and background style are applied to `<html>` synchronously before hydration:

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

### 3. Add to Root Layout (`src/routes/+layout.svelte`)

Add the components AuraBackground to the layout, to ensure you are able to use aura gradients. And add the theme picker into your header - or elsewhere. Theme picker comes wired with its own styling, overlay rules, and button icons. So you can use it wherever you like. 

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

### 4. Add styling files to your project

Fractal Themer supports both - precompiled CSS and indented SASS. Choose whichever you like:

#### Option A: Precompiled CSS

Import the master stylesheet in your root layout:
```typescript
import 'fractalthemer/styles.css';
```

This import bundles:
- 42 Theme Palettes: Complete CSS variable maps for all 21 Light and 21 Dark themes.
- Atmospheric Auras: Multi-layer GPU blend shaders for `.aura-ambient`.
- 180+ Gradient Presets: Viewport canvas shaders for `.aura-gradient-backdrop`.
- Color variables: CSS custom properties for surfaces, borders, typography, and states.

#### Option B: Raw Indented SASS Imports

This option requires SASS to be set up in your project (`pnpm add -D sass`). In this case you can `@use` the raw files directly:

```sass
// Master bundle (all tokens, themes, auras, drawer)
@use 'fractalthemer/styles'

// Or granular sub-modules:
@use 'fractalthemer/tokens'   // CSS variables & Utopia scales (_tokens.sass)
@use 'fractalthemer/themes'   // 42 light/dark theme classes (_themes.sass)
@use 'fractalthemer/auras'    // GPU gradient aura blend shaders (_auras.sass)
@use 'fractalthemer/picker'   // 100vh responsive right drawer (_theme-picker.sass)
```

> That's it! You're ready to play. Use one of our configured themes, or mix and match with the gradient backgrounds to find your fit. 

## 📄 Documentation

Read the complete guide and documentation, with API guide, tokens list, and more in [`docs/`](./docs/INDEX.md).

### 📖 Guides
- [Quickstart Guide](./docs/guides/01-quickstart.md): Step-by-step setup in any SvelteKit project.
- [Zero-Flicker SSR Guide](./docs/guides/02-anti-flicker-guide.md): How storage synchronization and inline `<script>` initialization prevent theme flashing.
- [Custom Themes & Studio Guide](./docs/guides/03-custom-themes.md): Runtime token overriding, custom aura layers, and `localStorage` persistence.
- [Responsive Drawer Ergonomics](./docs/guides/04-responsive-drawer.md): Mobile drawer ergonomics, touch scrolling, and 180px vs 360px viewport behavior.

### 🧩 Components
- [`<ThemePicker />`](./docs/components/ThemePicker.md): 100vh right sliding drawer, responsive 360px/180px layout, tabs, search, and props.
- [`<AuraBackground />`](./docs/components/AuraBackground.md): Multi-layer GPU blend shader rendering, filter mechanics, and gradient backdrops.
- [`<ThemeToggle />`](./docs/components/ThemeToggle.md): Compact Sun/Moon button for dense toolbars.
- [`<ThemeScript />`](./docs/components/ThemeScript.md): Head script injector for zero-flicker SSR hydration.

### 🏛 Architecture
- [Documentation Index](./docs/INDEX.md): Central map and navigation registry.
- [System Architecture & Topology](./docs/architecture/01-overview.md): High-level system structure, exports, and design principles.
- [State & Svelte 5 Runes](./docs/architecture/02-state-and-reactivity.md): In-depth walkthrough of `$state`, `$derived`, and the `ThemeState` manager.
- [Tokens & CSS Contract](./docs/architecture/03-tokens-and-css-contract.md): Utopia fluid typography/space scales and 3-tier elevation surfaces.

### 🎨 Catalogs
- [42 Curated Themes Catalog](./docs/themes/01-theme-catalog.md): Complete index of all 21 Light and 21 Dark curated themes with swatch values and descriptions.
- [Atmospheric Auras Catalog](./docs/themes/02-auras-catalog.md): Complete listing of atmospheric gradient blend presets, node coordinates, and blend modes.
- [180+ Vibrant Gradients Catalog](./docs/themes/03-gradients-catalog.md): Comprehensive catalog of 180+ curated vibrant gradient presets and background samplers.

---

## 📜 License

MIT © [Fractal Mandala](https://github.com/fractalmandala)

This package uses and extends the MIT License of [uiGradients](https://github.com/Ghosh/uiGradients?tab=MIT-1-ov-file) by Indrashish Ghosh -

```
MIT License
Copyright (c) 2017 Indrashish Ghosh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

And the MIT License for [Aura gradients](https://github.com/CristianOlivera1/Aura?tab=MIT-1-ov-file) by Cristian Olivera-

```
MIT License

Copyright (c) 2026 CristianOlivera1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```