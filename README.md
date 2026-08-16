# fractalthemer

> Drop-in Svelte 5 Theming System with 42 curated light & dark themes, GPU-accelerated atmospheric aura gradients, and a 100vh right off-canvas drawer.

## ✨ Features

- **42 Curated Themes**: 21 tiered Light themes and 21 Dark themes (Emerald, Himalaya, Editorial, Catppuccin Mocha, Dracula, Nord, Gruvbox, OneDark, Synthwave, and more).
- **GPU-Accelerated Auras**: Atmospheric radial and linear gradient blend shaders calibrated to every theme.
- **100vh Off-Canvas Drawer**: A right-sliding drawer (`360px` on desktop, `180px` on mobile `≤1024px`, full height `100vh`, smooth scroll).
- **Zero-Flicker SSR**: Anti-flicker script to prevent flash of wrong mode before hydration.
- **Svelte 5 Runes**: Built entirely with modern `$state` and `$derived` runes.
- **Custom Theme Creator**: Build, save, and persist custom token palettes in `localStorage`.

---

## 📦 Installation

```bash
pnpm add fractalthemer
# or
npm install fractalthemer
```

[![npm version](https://img.shields.io/npm/v/fractalthemer.svg)](https://www.npmjs.com/package/fractalthemer)

---

## 🚀 Quickstart

### 1. Configure `app.html` (Anti-Flicker)

Add the anti-flicker snippet to `<head>` in `src/app.html` to instantly apply saved theme and mode before first render:

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

### 2. Add to `src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import 'fractalthemer/styles.css';
  import { AuraBackground, ThemePicker } from 'fractalthemer';

  let { children } = $props();
</script>

<!-- Renders atmospheric gradient blend or vibrant gradient when active -->
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

`fractalthemer` provides both a **precompiled, zero-config CSS bundle** and **modular indented SASS files**.

### Option A: Precompiled CSS (Recommended)
Import the master stylesheet in your root layout:

```typescript
import 'fractalthemer/styles.css';
```

This single import provides:
- **42 Theme Palettes**: Complete CSS variable maps for all 21 Light and 21 Dark themes.
- **Atmospheric Auras**: Multi-layer GPU blend shaders for `.aura-ambient`.
- **180+ Gradient Presets**: Viewport canvas shaders for `.aura-gradient-backdrop`.
- **100vh Drawer**: Slide-in animations, responsive breakpoints (`360px` / `180px`), tabs, and search bar.
- **Semantic Tokens**: CSS custom properties for surfaces, borders, typography, and states.

### Option B: Raw SASS Imports (For SASS projects)
If your project uses indented SASS (`.sass`) or SCSS, you can `@use` the modules directly:

```sass
// Master bundle (all tokens, themes, auras, drawer)
@use 'fractalthemer/styles'

// Or granular sub-modules:
@use 'fractalthemer/tokens'   // CSS variables & Utopia scales
@use 'fractalthemer/themes'   // 42 light/dark theme classes
@use 'fractalthemer/auras'    // GPU gradient aura blend shaders
@use 'fractalthemer/picker'   // 100vh responsive right drawer
```

## 🕹 Programmatic API (`themeState`)

Control themes anywhere in your application:

```typescript
import { themeState } from 'fractalthemer';

// Toggle between Light and Dark mode
themeState.toggleMode();

// Set an exact theme
themeState.setTheme('theme-dracula-dark');

// Toggle between plain and aura gradient backgrounds
themeState.setBgStyle('aura'); // or 'plain'
themeState.toggleBgStyle();

// Cycle themes
themeState.cycleNext();
themeState.cycleRandom();
themeState.resetDefault();

// Open or close the off-canvas drawer
themeState.openPicker();
themeState.closePicker();
themeState.togglePicker();

// Inspect reactive state
console.log(themeState.current);      // 'theme-dracula-dark'
console.log(themeState.isDark);       // true
console.log(themeState.isAura);       // true
console.log(themeState.currentTheme); // ThemeInfo object
```

---

## 🎨 Semantic Token Contract

Consume standard CSS custom properties across your styles:

| CSS Variable | Purpose |
|---|---|
| `--bg` | App canvas base backdrop |
| `--bg-surface` | Primary card and surface container |
| `--bg-raised` | Elevated modals, popovers, floating headers |
| `--bg-panel` | Navbars, sidebars, drawer panels |
| `--border` | Standard card and separator border |
| `--border-subtle` | Faint inner dividers |
| `--text-primary` | High contrast headings & main text |
| `--text-secondary` | Body text, labels, subtitles |
| `--text-muted` | Captions, metadata, timestamps |
| `--theme-color` | Primary brand accent color |
| `--theme-color-alt` | Hover state for accent buttons |
| `--state-hover` | Background tint on hover |
| `--state-selected` | Active tab / selected highlight |

---

## 📚 Documentation

Comprehensive documentation is available under [`docs/`](./docs/INDEX.md):

- [Documentation Index](./docs/INDEX.md)
- [System Architecture](./docs/architecture/01-overview.md)
- [Svelte 5 Runes State Machine](./docs/architecture/02-state-and-reactivity.md)
- [Semantic Design Tokens Contract](./docs/architecture/03-tokens-and-css-contract.md)
- [ThemePicker & 100vh Drawer Component](./docs/components/ThemePicker.md)
- [AuraBackground Component](./docs/components/AuraBackground.md)
- [42 Curated Themes Catalog](./docs/themes/01-theme-catalog.md)
- [Atmospheric Auras Catalog](./docs/themes/02-auras-catalog.md)
- [180+ Vibrant Gradients Catalog](./docs/themes/03-gradients-catalog.md)

---

## 📜 License

MIT
