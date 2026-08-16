---
id: quickstart-guide
title: SvelteKit Quickstart & Integration Guide
type: design
tags: [quickstart, installation, sveltekit, layout, setup]
summary: Step-by-step procedure to install, configure, and mount fractalthemer in any new or existing SvelteKit project.
relates_to: [docs-index, anti-flicker-guide, responsive-drawer-guide]
updated: 2026-08-16
---

# SvelteKit Quickstart & Integration Guide

Follow this guide to install and configure `fractalthemer` in your SvelteKit or Svelte 5 application.

---

## 📥 Step 1: Install the Package

Install `fractalthemer` using your preferred package manager:

```bash
pnpm add fractalthemer
# or
npm install fractalthemer
# or
yarn add fractalthemer
```

---

## ⚡ Step 2: Configure `app.html` for Zero Flicker

Open `src/app.html` and add the startup script directly inside `<head>` above `%sveltekit.head%`:

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
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

---

## 🎨 Step 3: Mount Components in `src/routes/+layout.svelte`

Import the stylesheet and place `<AuraBackground />` and `<ThemePicker />` in your root layout:

```svelte
<script lang="ts">
  import 'fractalthemer/styles.css';
  import { AuraBackground, ThemePicker } from 'fractalthemer';

  let { children } = $props();
</script>

<!-- Ambient gradient backdrop (renders when aura mode is enabled) -->
<AuraBackground />

<!-- App Shell -->
<div class="app">
  <header class="app-header">
    <h1>My Application</h1>
    
    <!-- Theme trigger buttons & 100vh off-canvas drawer -->
    <ThemePicker />
  </header>

  <main class="app-main">
    {@render children()}
  </main>
</div>
```

---

## 🖋 Step 4: Consume Semantic Tokens in Your CSS

Style your components using the standard CSS custom properties:

```css
.card {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-8);
  padding: var(--space-m);
}

.button-primary {
  background-color: var(--theme-color);
  color: var(--text-inverse);
}

.button-primary:hover {
  background-color: var(--theme-color-alt);
}
```

---

## 🎨 Step 5: (Optional) Using Raw Indented SASS

If your project is built with indented SASS (`.sass`) or SCSS, you can `@use` the stylesheets directly from `fractalthemer`:

```sass
// In your master index.sass:
@use 'fractalthemer/styles'

// Or granular partials:
@use 'fractalthemer/tokens'  // Fluid typography, spacing, and CSS custom properties
@use 'fractalthemer/themes'  // 42 theme classes (.theme-*)
@use 'fractalthemer/auras'   // Multi-layer GPU blend shaders & gradient canvas
@use 'fractalthemer/picker'  // 100vh drawer and controls
```

---

## 🔗 Related Documents

- [Zero-Flicker SSR Guide](./02-anti-flicker-guide.md)
- [Responsive Drawer Guide](./04-responsive-drawer.md)
- [Theme Catalog](../themes/01-theme-catalog.md)
