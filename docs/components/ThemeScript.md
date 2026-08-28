---
id: theme-script-component
title: ThemeScript Component & SSR Injection Reference
type: design
tags: [components, anti-flicker, ssr, sveltekit, head-script]
summary: Component specification for injecting zero-flicker initialization script into <svelte:head>.
relates_to: [anti-flicker-guide, quickstart-guide]
source: src/lib/components/ThemeScript.svelte
updated: 2026-08-16
---

# ThemeScript Component & SSR Injection Reference

[`ThemeScript.svelte`](../../src/lib/components/ThemeScript.svelte) injects the anti-flicker startup script into `<svelte:head>` to ensure proper theme and mode application on initial load.

---

## 🎯 Functional Specification

- **Role**: Emits a synchronous inline `<script>` into the HTML `<head>`.
- **Purpose**: Reads `localStorage` for `theme` and `bgStyle` before first paint to prevent Flash of Unstyled Content (FOUC).
- **Alternative**: You can also use the exported `getAntiFlickerScript()` function directly in `src/app.html`.

---

## ⚙️ Component Props

```typescript
interface Props {
    defaultTheme?: string;                 // Fallback theme if none in storage (default: 'theme-light-default')
    defaultBgStyle?: 'plain' | 'aura' | 'gradient' | 'pattern';    // Fallback background style (default: 'plain')
}
```

---

## 💻 Usage Example

In `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
  import { ThemeScript, AuraBackground, ThemePicker } from 'fractalthemer';

  let { children } = $props();
</script>

<ThemeScript defaultTheme="theme-night-dark" defaultBgStyle="aura" />
<AuraBackground />

<main>
  {@render children()}
</main>
```

---

## 🔗 Related Documents

- [Zero-Flicker SSR Guide](../guides/02-anti-flicker-guide.md)
- [Quickstart Guide](../guides/01-quickstart.md)
