---
id: anti-flicker-guide
title: Zero-Flicker SSR & Hydration Guide
type: design
tags: [ssr, anti-flicker, fouc, localstorage, hydration, sveltekit]
summary: In-depth guide explaining how fractalthemer eliminates theme flicker on initial page load and server-side rendering.
relates_to: [quickstart-guide, theme-script-component, state-and-reactivity]
updated: 2026-08-16
---

# Zero-Flicker SSR & Hydration Guide

Flash of Unstyled Content (FOUC) or Flash of Wrong Theme (such as a white flash on a dark-mode website) happens when client-side JavaScript reads stored user preferences *after* the browser has already painted the initial HTML document.

`fractalthemer` solves this problem by using an inline synchronous initialization script executed before first paint.

---

## 🔍 How the Problem Occurs in Standard SPAs

```
1. Server returns HTML with default class="light"
2. Browser renders white background (Frame 1)
3. JavaScript bundle loads and hydrates (e.g. at 200ms)
4. Svelte reads localStorage.getItem('theme') -> 'dark'
5. Svelte mutates <html> to class="dark" (Frame 2 - FLASH OCCURS!)
```

---

## 🛡 How `fractalthemer` Solves It

By inserting a blocking, micro-sized (0.4KB) script synchronously in the HTML `<head>`:

```
1. Server returns HTML
2. Parser encounters inline <script> in <head>
3. Script immediately reads localStorage synchronously
4. Script applies target .theme-* class & colorScheme to <html>
5. Browser paints Frame 1 directly in Dark Mode (ZERO FLASH!)
6. Svelte hydrates seamlessly and assumes state ownership
```

---

## 🛠 Methods to Apply Anti-Flicker

### Method A: Direct HTML Injection in `src/app.html` (Recommended)

Place the following script directly in `src/app.html`:

```html
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
```

### Method B: Programmatic Generation via `getAntiFlickerScript()`

In custom build scripts or SSR hooks:

```typescript
import { getAntiFlickerScript } from 'fractalthemer';

const scriptString = getAntiFlickerScript('theme-light-default', 'plain');
```

### Method C: Using `<ThemeScript />` in Layout

```svelte
<script lang="ts">
  import { ThemeScript } from 'fractalthemer';
</script>

<ThemeScript defaultTheme="theme-light-default" defaultBgStyle="plain" />
```

---

## 🔗 Related Documents

- [ThemeScript Component](file:///Users/amrit/fractalmandala/fractalthemer/docs/components/ThemeScript.md)
- [Quickstart Guide](file:///Users/amrit/fractalmandala/fractalthemer/docs/guides/01-quickstart.md)
