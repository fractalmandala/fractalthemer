---
id: api-guide
title: Fractalthemer Programmatic API & Svelte 5 Usage Guide
type: guide
tags: [architecture, runes, svelte5, api, conditional-rendering]
summary: Comprehensive guide for programmatic control with themeState, conditional Svelte 5 template rendering ({#if themeState.isDark}), reactive class bindings, and UI component recipes.
relates_to: [theme-picker-component, tokens-and-css-contract, aura-background-component]
updated: 2026-08-16
---

# 🛠 Programmatic API & Svelte 5 Usage Guide

`fractalthemer` exports a reactive Svelte 5 singleton object called **`themeState`**. Because it is built with `$state` and `$derived` runes, any change to `themeState` immediately triggers reactive UI updates across your entire application.

```typescript
import { themeState } from 'fractalthemer';
```

---

## ⚡ 1. Conditional Template Rendering in Svelte (`{#if}`)

You can use `themeState` directly inside any Svelte template for conditional logic, dynamic asset switching, and state-aware markup:

### ☀️ / 🌙 Conditional Light vs Dark Mode Content

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<div class="user-greeting">
  {#if themeState.isDark}
    <p>🌙 Good evening! Dark mode is currently active.</p>
  {:else}
    <p>☀️ Good day! Light mode is currently active.</p>
  {/if}
</div>
```

---

### 🖼 Switching Dynamic Logos & Media Assets

Render different logos or imagery depending on whether the user is in light or dark mode:

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<header class="brand-header">
  <img 
    src={themeState.isDark ? '/brand/logo-white.svg' : '/brand/logo-black.svg'} 
    alt="Acme Inc." 
    class="brand-logo"
  />
</header>
```

---

### 🎨 Background Style Conditional Blocks (`plain` vs `aura` vs `gradient`)

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<div class="status-pill">
  {#if themeState.isGradient && themeState.activeGradientPreset}
    <span>🌈 Active Gradient: <strong>{themeState.activeGradientPreset.name}</strong></span>
  {:else if themeState.isAura}
    <span>✨ Active Aura: <strong>{themeState.activeAuraPreset?.name || themeState.currentTheme.auraName}</strong></span>
  {:else}
    <span>◻ Flat Plain Background</span>
  {/if}
</div>
```

---

### 🎭 Targeted Theme Checks & Custom Classes

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<!-- Conditionally add class bindings -->
<div 
  class="dashboard-card" 
  class:dracula-glow={themeState.current === 'theme-dracula-dark'}
  class:is-dark={themeState.isDark}
>
  <h3>{themeState.currentTheme.name}</h3>
  <p>{themeState.currentTheme.description}</p>
</div>
```

---

## 🎛 2. Complete Programmatic API Reference

### 🔄 Mode & Theme Switching

```typescript
import { themeState } from 'fractalthemer';

// 1. Binary Light / Dark Flip
themeState.toggleMode(); // Flips to default light/dark equivalent

// 2. Direct Theme Selection (any of the 42 themes)
themeState.setTheme('theme-dracula-dark');
themeState.setTheme('theme-nord-dark');
themeState.setTheme('theme-catppuccin-mocha');
themeState.setTheme('theme-himalaya-light');

// 3. Carousel Cycling
themeState.cycleNext();   // Advances to the next theme in the catalog
themeState.cycleRandom(); // Activates a random theme from the catalog
themeState.resetDefault(); // Resets back to 'theme-light-default'
```

---

### 🌌 203 Atmospheric Aura Gradients API

```typescript
import { themeState, AURA_PRESETS } from 'fractalthemer';

// Activate any of the 203 aura presets by ID:
themeState.setAura('mesh-frosted-jade');
themeState.setAura('glass-emerald-lens');
themeState.setAura('aurora-beams');
themeState.setAura('solstice-veil');

// Revert to theme default aura:
themeState.clearAura();

// Inspect all 203 aura presets:
console.log(themeState.allAuras.length); // 203
console.log(themeState.activeAuraPreset); // Current active AuraPreset or null
```

---

### 🌈 180+ Linear Gradient Presets API

```typescript
import { themeState, GRADIENT_PRESETS } from 'fractalthemer';

// Set active linear gradient backdrop:
themeState.setGradient('omolon');
themeState.setGradient('radioactive-heat');
themeState.setGradient('the-sky-and-the-sea');

// Clear gradient and restore aura/plain:
themeState.clearGradient();

// Inspect gradient presets:
console.log(themeState.allGradients.length); // 180+
console.log(themeState.activeGradientPreset); // Current active GradientPreset or null
```

---

### 📐 Background Mode Toggle (`plain` | `aura` | `gradient`)

```typescript
import { themeState } from 'fractalthemer';

// Explicitly set mode:
themeState.setBgStyle('plain');    // Flat background surface
themeState.setBgStyle('aura');     // Multi-layer GPU blend shader
themeState.setBgStyle('gradient'); // Full viewport linear gradient

// Cycle through modes:
themeState.toggleBgStyle(); // 'plain' -> 'aura' -> 'gradient' -> 'plain'
```

---

### 🚪 Drawer Programmatic Control

```typescript
import { themeState } from 'fractalthemer';

themeState.openPicker();   // Opens 100vh right drawer
themeState.closePicker();  // Closes drawer
themeState.togglePicker(); // Toggles open/closed state

console.log(themeState.isOpen); // boolean
```

---

## 🧩 3. Custom Component Recipes

### Recipe A: Minimalist Custom Theme Switcher Button

A standalone icon button you can embed anywhere in your navigation bar:

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<button
  type="button"
  class="mode-toggle-btn"
  aria-label={themeState.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  onclick={() => themeState.toggleMode()}
>
  {#if themeState.isDark}
    <span class="icon">☀️</span>
    <span class="label">Light</span>
  {:else}
    <span class="icon">🌙</span>
    <span class="label">Dark</span>
  {/if}
</button>

<style>
  .mode-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: var(--radius-6);
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-primary);
    font-size: var(--text-sm);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .mode-toggle-btn:hover {
    background: var(--bg-raised);
    border-color: var(--theme-color);
  }
</style>
```

---

### Recipe B: Custom Theme Dropdown Select

A standard HTML `<select>` powered by `themeState.allThemes`:

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<label class="theme-select-wrapper">
  <span>Theme</span>
  <select
    value={themeState.current}
    onchange={(e) => themeState.setTheme(e.currentTarget.value)}
  >
    <optgroup label="Light Themes">
      {#each themeState.allThemes.filter(t => t.mode === 'light') as theme (theme.id)}
        <option value={theme.id}>{theme.name}</option>
      {/each}
    </optgroup>
    <optgroup label="Dark Themes">
      {#each themeState.allThemes.filter(t => t.mode === 'dark') as theme (theme.id)}
        <option value={theme.id}>{theme.name}</option>
      {/each}
    </optgroup>
  </select>
</label>

<style>
  .theme-select-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }

  select {
    padding: 6px 10px;
    border-radius: var(--radius-4);
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-primary);
    font-family: inherit;
    cursor: pointer;
  }
</style>
```

---

### Recipe C: Active Theme Pill Badge

Display active theme and aura details with live color swatches:

```svelte
<script lang="ts">
  import { themeState } from 'fractalthemer';
</script>

<div class="theme-badge">
  <span 
    class="swatch" 
    style:background-color={themeState.currentTheme.accentColor}
  ></span>
  <span class="theme-name">{themeState.currentTheme.name}</span>
  <span class="mode-tag">{themeState.isDark ? 'Dark' : 'Light'}</span>
</div>

<style>
  .theme-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg-panel);
    font-size: var(--text-xs);
    color: var(--text-primary);
  }

  .swatch {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
  }

  .mode-tag {
    color: var(--text-muted);
    font-size: 10px;
    text-transform: uppercase;
  }
</style>
```

---

## 🔗 Related Documentation

- [Quickstart Guide](./01-quickstart.md)
- [Zero-Flicker SSR Guide](./02-anti-flicker-guide.md)
- [ThemePicker Component Spec](../components/ThemePicker.md)
- [AuraBackground Component Spec](../components/AuraBackground.md)
- [Theme Catalog (42 Themes)](../themes/01-theme-catalog.md)
- [Gradient Presets Catalog (180+ Gradients)](../themes/03-gradients-catalog.md)
