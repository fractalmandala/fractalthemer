---
id: state-and-reactivity
title: Svelte 5 Reactive State & Runes Architecture
type: design
tags: [svelte5, runes, state-management, reactivity, localstorage]
summary: Deep dive into the ThemeState class, reactive runes ($state, $derived), storage persistence, and DOM synchronization.
relates_to: [architecture-overview, theme-picker-component, custom-themes-guide]
updated: 2026-08-16
---

# Svelte 5 Reactive State & Runes Architecture

The state architecture of `fractalthemer` is powered entirely by Svelte 5 Runes. All theme modifications, custom themes, background aura toggles, and drawer visibility states are managed through the [`ThemeState`](file:///Users/amrit/fractalmandala/fractalthemer/src/lib/state/theme.svelte.ts) class and exported as a reactive singleton `themeState`.

---

## 🧬 Reactive State Fields

Inside [`src/lib/state/theme.svelte.ts`](file:///Users/amrit/fractalmandala/fractalthemer/src/lib/state/theme.svelte.ts), the state is defined using Svelte 5 runes:

```typescript
export class ThemeState {
    current = $state<string>(DEFAULT_THEME_ID);
    bgStyle = $state<BgStyle>('plain');
    isOpen = $state<boolean>(false);
    customThemes = $state<ThemeInfo[]>([]);
    activeCustomOverrides = $state<Record<string, string> | null>(null);
    activeCustomAuraLayers = $state<AuraLayer[] | null>(null);
}
```

### State Variables

| Field | Type | Description |
|---|---|---|
| `current` | `string` | Active theme identifier (e.g. `'theme-sun-dark'`, `'theme-light-default'`) |
| `bgStyle` | `'plain' \| 'aura'` | Backdrop mode: flat distraction-free canvas vs. multi-layer GPU aura gradient |
| `isOpen` | `boolean` | Controls visibility and transition state of the 100vh right off-canvas drawer |
| `customThemes` | `ThemeInfo[]` | User-created custom themes restored from `localStorage` |
| `activeCustomOverrides` | `Record<string, string> \| null` | Runtime CSS variable overrides when a custom theme is active |
| `activeCustomAuraLayers` | `AuraLayer[] \| null` | Dynamic aura gradient nodes for custom crafted themes |

---

## ⚡ Computed Derived State

The class provides instant, reactive getters:

```typescript
get allThemes(): ThemeInfo[] {
    return [...THEMES, ...this.customThemes];
}

get currentTheme(): ThemeInfo {
    return this.allThemes.find((t) => t.id === this.current) ?? THEMES[0];
}

get isDark(): boolean {
    return this.currentTheme.mode === 'dark';
}

get isAura(): boolean {
    return this.bgStyle === 'aura';
}
```

- **`isDark`**: Accurately reflects whether the active palette is light or dark. Used by the mode toggle icon (Sun vs. Moon) and accessibility attributes.
- **`isAura`**: Flags the [`AuraBackground.svelte`](file:///Users/amrit/fractalmandala/fractalthemer/src/lib/components/AuraBackground.svelte) renderer to mount or unmount GPU blend layers.

---

## 🛠 Core State Methods

### 1. `init()`
Executed on `onMount` in browser contexts. Reads `localStorage` for `theme`, `bgStyle`, and `customThemes`, validates against known schemas, and synchronizes the DOM attributes:

```typescript
init(): void
```

### 2. `setTheme(id: string)`
Switches the active palette to `id`. Removes prior `.theme-*` classes from `<html>`, adds the new class, updates `data-theme`, `data-mode`, and `colorScheme`, and stores the preference:

```typescript
setTheme(id: string): void
```

### 3. `toggleMode()`
Toggles between Light and Dark mode. Intelligently picks corresponding light and dark flagship themes:

```typescript
toggleMode(): void
```

### 4. `setBgStyle(style: 'plain' | 'aura')` and `toggleBgStyle()`
Switches background styling. Updates the `data-bg-style` attribute on `<html>` and persists to `localStorage`.

### 5. `cycleNext()` and `cycleRandom()`
Iterates sequentially or picks a random theme from the 42 built-in and custom theme pool.

### 6. `saveCustomTheme(...)` and `deleteCustomTheme(id: string)`
Creates and persists custom user-defined themes with custom token key-value pairs and aura gradient layer specifications.

---

## 🌐 DOM Mutation Model

When `apply(id, style)` executes, `themeState` performs atomic, layout-shift-free DOM updates:

```typescript
apply(id: string, style?: BgStyle) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const currentStyle = style ?? this.bgStyle;

    this.clearCustomOverrides();

    for (const theme of this.allThemes) {
        root.classList.remove(theme.id);
    }
    root.classList.add(id);

    const theme = this.allThemes.find((t) => t.id === id);
    if (theme) {
        root.setAttribute('data-theme', theme.id);
        root.setAttribute('data-mode', theme.mode);
        root.setAttribute('data-bg-style', currentStyle);
        root.style.colorScheme = theme.mode;

        if (theme.isCustom && theme.tokens) {
            this.applyCustomOverrides(theme.tokens, theme.customAura?.layers);
        }
    }
}
```

---

## 🔗 Related Documents

- [System Architecture](file:///Users/amrit/fractalmandala/fractalthemer/docs/architecture/01-overview.md)
- [ThemePicker Component](file:///Users/amrit/fractalmandala/fractalthemer/docs/components/ThemePicker.md)
- [Custom Themes Guide](file:///Users/amrit/fractalmandala/fractalthemer/docs/guides/03-custom-themes.md)
