---
id: custom-themes-guide
title: Custom Themes & Runtime Creation Guide
type: design
tags: [custom-themes, runtime-tokens, localstorage, persistence, studio]
summary: Guide to creating, saving, persisting, and dynamically applying user-generated custom themes and custom aura layers.
relates_to: [state-and-reactivity, tokens-and-css-contract, auras-catalog]
updated: 2026-08-16
---

# Custom Themes & Runtime Creation Guide

`fractalthemer` includes a built-in custom theme engine that allows users and developers to craft new color palettes and custom aura gradient blend layers at runtime, saving them directly to `localStorage`.

---

## 🎨 Anatomy of a Custom Theme

A custom theme is represented by the [`ThemeInfo`](../../src/lib/data/themes.ts) interface:

```typescript
export interface ThemeInfo {
    id: string;
    name: string;
    mode: 'light' | 'dark';
    accentColor: string;
    bgColor: string;
    textColor: string;
    description: string;
    auraId: string;
    auraName: string;
    auraDescription: string;
    tokens: Record<string, string>;
    isCustom?: boolean;
    customAura?: {
        id: string;
        name: string;
        description: string;
        layers: AuraLayer[];
    };
}
```

---

## 💾 Saving a Custom Theme

Use `themeState.saveCustomTheme()`:

```typescript
import { themeState } from 'fractalthemer';

const newTheme = themeState.saveCustomTheme({
    name: 'Cyberpunk Neon',
    mode: 'dark',
    description: 'Electric violet and neon turquoise',
    tokens: {
        'bg': '#0a0a14',
        'bg-surface': '#121224',
        'bg-raised': '#1c1c36',
        'bg-panel': '#16162c',
        'border': '#2d2d54',
        'text-primary': '#ffffff',
        'text-secondary': '#9d9dc4',
        'theme-color': '#00f0ff',
        'theme-color-alt': '#ff0077'
    },
    aura: {
        id: 'neon-matrix',
        name: 'Neon Matrix',
        description: 'Cyan and magenta laser dispersion',
        layers: [
            {
                layer: 1,
                background: 'radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.5) 0%, transparent 60%)',
                blendMode: 'screen',
                blur: 150
            },
            {
                layer: 2,
                background: 'radial-gradient(circle at 80% 70%, rgba(255, 0, 119, 0.4) 0%, transparent 50%)',
                blendMode: 'screen',
                blur: 180
            }
        ]
    }
});

// Immediately activates the custom theme!
console.log('Saved custom theme:', newTheme.id);
```

---

## 🗑 Deleting a Custom Theme

```typescript
import { themeState } from 'fractalthemer';

themeState.deleteCustomTheme('custom-theme-id');
```

---

## ⚡ Runtime Overrides without Saving

If you want to preview live token edits in an interactive studio without committing them to storage:

```typescript
import { themeState } from 'fractalthemer';

themeState.applyCustomOverrides({
    'bg': '#1e1e2e',
    'theme-color': '#fab387'
});

// Clear overrides when done
themeState.clearCustomOverrides();
```

---

## 🔗 Related Documents

- [State & Reactivity](../architecture/02-state-and-reactivity.md)
- [Tokens Contract](../architecture/03-tokens-and-css-contract.md)
