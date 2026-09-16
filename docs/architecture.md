# Architecture

fractalthemer is a class-based styling system. Everything a project styles is
either a class from the system or an extension declared in `_08_own.sass` —
never ad-hoc CSS. This document maps the pieces; the rules live in
[contract.md](./contract.md), the machine-readable inventory in
[registry.md](./registry.md).

## The stylesheet

`src/lib/styles/index.sass` is the composition. Its `@use` list **is** the
layer order — adding a line there adds a layer everywhere it matters. Indented
SASS only (single tab, no braces, no semicolons).

| File | Owns |
| --- | --- |
| `_00_configsteps.sass` | `@font-face` declarations (Areal) |
| `_00_tokens.sass` | The single source of truth for runtime CSS custom properties. Light is the marker-free default (tokens defined during SSR and with JS disabled); dark comes from `prefers-color-scheme` and explicit `[data-mode='dark']`. Palette hexes enter here and only here, via `palette/allsets`. |
| `_01_config.sass` | Builder knobs, all `!default` — overridable at compile time, never edited in place. See [contract.md](./contract.md#configuration). |
| `_01_base.sass` | Element-level reset and base element styling (`box-sizing`, the `button` element, …). |
| `_02_dimensions.sass` | L1. The loop-generated half of the registry: space families, radius, size, viewport heights — each class in three bands (base, `-mob`, `-desk`) per Contract 7. Presets are token-routed; literals come from the px ladder. |
| `_03_containers.sass` | L2. Containers and the alignment universe (`.box` + nested alignment). x/y are physical axes, always (Contract 4). |
| `_04_layouts.sass` | L3. Grids (golden rules), card-grid, prose, frame presets, reel. Grids are pure stepping: no default gap. |
| `_05_shells.sass` | L4. Canonical page markups: app shell, drawer, docs-frame roles, mobile TOC disclosure, overlay mechanics. |
| `_06_visuals.sass` | L5. Skin and compositions. Emission order follows Contract 5: bare dress before compositions. Reads the `--radius-*` channels so shape reaches everything. |
| `_07_interactions.sass` | L6. One shared vocabulary of three orthogonal axes for every interactive surface: paint, metrics, corner (`.btn .primary .lg .curved`). Each axis is a `!default` config map — a consumer skin reroutes a rung at compile time. |
| `_08_own.sass` | The extension point. Project-local additions live here — in this repo and, by the same convention, in every consumer project. |
| `configvocab.sass` | The vocabulary the generators share: `$steps`, gap/pad/border families. |

Palette modules (`palette/allsets`, `themes`, `auras`, `glass`,
`_theme-picker`) sit outside the layer stack and are consumed/forwarded
individually.

## The two JS engines

One of each. There is no second copy of either concern anywhere in `src/`.

### Mode — `src/lib/state/mode.svelte.ts`

```ts
import { mode } from 'fractalthemer/mode';

const store = mode();          // singleton; configure on the first call
store.preference;              // 'dark' | 'light' | 'system' ($state)
store.resolved;                // 'dark' | 'light' — never 'system' ($state)
store.isDark;
await store.toggle();          // the swipe: 520ms wipe, dark falls from the
                               // top, light rises from the bottom
await store.set('dark', { kind: 'circle', origin: { x, y } });
```

- Three states, not two: `system` follows the OS until a choice is made.
- Resolves onto `<html data-mode>` so the CSS keys off an attribute.
- Persists to `localStorage['mode']`; syncs across tabs; reads the legacy
  `futils.mode` key once so existing choices survive.
- `modeScript()` emits a `<head>` snippet that stamps `data-mode` before
  first paint — the anti-flash mechanism.

### Transitions — `src/lib/motion/transitions.ts`

```ts
import { transition } from 'fractalthemer/motion';

await transition(() => { theme = 'dark' }, { kind: 'wipe', direction: 'down' });
```

- Kinds: `wipe`, `slide`, `fade`, `circle`, `none`; four directions; easing
  from `motion/easing.ts` (`'in-out'` is the house curve,
  `cubic-bezier(0.65, 0, 0.35, 1)`).
- Drives `::view-transition-old/new(root)` snapshots with the Web Animations
  API. Import `fractalthemer/transition.css` **once** in the root layout to
  switch off the browser's default cross-fade.
- Falls back to the plain update under `prefers-reduced-motion`, without the
  API, or for `kind: 'none'` — callers never branch.

### Components

- `ModeToggle.svelte` — a thin wrapper over the store: renders the icon,
  calls `store.toggle()`.
- `ThemeScript.svelte` — emits `getAntiFlickerScript()` for theme
  backgrounds.

## What was deliberately removed

The preset-axes runtime (layout/shape/color/motion/shell → `data-*`
attributes) was removed: variant axes belong to generation pipelines (e.g.
affedo recipes), not to the host styling system. The CSS-side `[data-*]`
hooks are inert defaults.
