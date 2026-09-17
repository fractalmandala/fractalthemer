# fractalthemer

> A class-based styling system: layered indented SASS, one generated class
> registry, and a linter that keeps every project using it honest.

[![npm version](https://img.shields.io/npm/v/fractalthemer.svg)](https://www.npmjs.com/package/fractalthemer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)

## The idea

Everything a project styles is either **a class from the system** or **an
extension declared in its own `_08_own.sass`** — never ad-hoc CSS, never a
scoped `<style>` block, never an inline style. The complete class inventory
is generated into a registry, and a shipped linter turns that contract into
exit codes.

## Install

```sh
pnpm add -D fractalthemer
```

## Styles

```sass
@use 'fractalthemer/styles' as *
```

The stylesheet is assembled from numbered layers under `src/lib/styles`,
loaded in order by `index.sass` — that file's `@use` list *is* the
composition. Eleven layer partials, `00_tokens` (the custom-property source of
truth) through `08_own` (the sanctioned extension point). Precompiled CSS is
also available:

```ts
import 'fractalthemer/styles.css'
```

## Three ways to use it

**1. Install and use** — track the package; upgrades come from npm.

```sh
pnpm add -D fractalthemer
```

```sass
@use 'fractalthemer/styles' as *
```

**2. Eject — the files become yours.** Copy every styles layer, the palette
modules and the registry builder into your project, where you may edit them
freely (including the `!default` knobs, in place — no `@use with` needed):

```sh
npx fractalthemer eject
```

That leaves you `src/lib/styles/` (11 layers + a seeded `_08_own.sass`),
`src/lib/palette/`, and `scripts/build-registry.mjs`. Import relatively,
regenerate your own registry after edits (`node scripts/build-registry.mjs`,
needs `sass`), and the linter keeps enforcing the contract against *your*
copy:

```sh
npx fractalthemer lint src/
```

**3. Install the mode toggle — the feature becomes yours.** Copy the complete
dark/light mode feature into your project as editable source — the ModeToggle
component, the ModeStore state engine, the View Transitions engine and
easing, the transition CSS reset, and the Sun/Moon icons:

```sh
npx fractalthemer mode
```

That leaves you `src/lib/motion/`, `src/lib/state/`, `src/lib/mode/` and
`src/lib/icons/` — same layout as this repo, so the `$lib` imports inside the
copied files resolve unchanged. Wire it up in your root layout:

```svelte
<script lang="ts">
        // 1. The transition reset ONCE — without it the wipe arrives smeared
        //    with the UA cross-fade. This is the step people miss.
        import '$lib/motion/transition.css';
        import ModeToggle from '$lib/mode/ModeToggle.svelte';
        import { modeScript } from '$lib/state/mode.svelte.js';

        let { children } = $props();
</script>

<!-- 2. Stamp the mode before first paint (no flash of wrong theme). -->
<svelte:head>
        {@html `<script>${modeScript()}<\/script>`}
</svelte:head>

<!-- 3. Drop the button anywhere. -->
<ModeToggle />
```

`store.toggle()` defaults to the 520ms wipe; pass a spec to steer it
(`store.toggle({ kind: 'circle', origin: { x, y } })`), and everything falls
back to an instant flip under `prefers-reduced-motion` or where the View
Transitions API is missing. The npm dependency is then only needed for the
styles — the toggle is yours to edit.

Full layer map: [docs/architecture.md](./docs/architecture.md). The styling
rules (contracts, golden rules, configuration knobs): [docs/contract.md](./docs/contract.md).

## Mode & transitions — full API

The shipped `ModeToggle` button is deliberately trivial: everything it does is
`mode()` plus one method call. **Build your own toggle instead** — your markup,
your icons, your placement — and keep the engine (persistence, OS-follow,
cross-tab sync, the swipe).

Import paths differ by install option; the API is identical:

| Install option | Mode engine | Transitions |
| --- | --- | --- |
| Install and use | `fractalthemer/mode` | `fractalthemer/motion` |
| `npx fractalthemer mode` (source) | `$lib/state/mode.svelte.js` | `$lib/motion/transitions.js` |

### Build your own toggle — the recipe

Everything the shipped toggle does, in three steps. Only step 3 is yours to
vary — the engine never needs rewiring.

**1. The transition reset, once, in the root layout** — without it the wipe
arrives smeared with the UA cross-fade. This is the step people miss.

```ts
import 'fractalthemer/transition.css'; // or $lib/motion/transition.css
```

**2. Stamp the mode before first paint** — `modeScript()` emits a head snippet
that sets `<html data-mode>` before any stylesheet runs, so the page never
flashes the wrong theme:

```svelte
<svelte:head>
	{@html `<script>${modeScript()}<\/script>`}
</svelte:head>
```

**3. Your component, on the store.** `mode()` is the app-wide singleton —
call it in your root layout (with options, if any) and everywhere else it
returns the same instance:

```svelte
<script lang="ts">
	import { mode } from 'fractalthemer/mode'; // or $lib/state/mode.svelte.js

	const store = mode();
	const dark = $derived(store.isDark);
</script>

<!-- Your markup, your icons. The store carries all state and motion. -->
<button
	type="button"
	aria-pressed={dark}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	onclick={(e) => store.toggle({ kind: 'circle', origin: { x: e.clientX, y: e.clientY } })}
>
	{dark ? '☀︎' : '☾'} <!-- your icon here -->
</button>
```

Anything reactive **reads** the store: `store.resolved`, `store.preference`,
`store.isDark`. Anything mutating **calls** it: `store.set(...)`,
`store.toggle(...)`. You never touch `localStorage` or the `data-mode`
attribute yourself — and never hard-code mode styles in your component;
key off `[data-mode='dark']` on `<html>` from the stylesheet layers instead.

**Icons.** With a source install (`npx fractalthemer mode`) the shipped
`Sun.svelte` / `Moon.svelte` land in your `src/lib/icons/` — import them like
any local component, or ignore them entirely. With an npm install the package
ships no icons: bring your own SVG, emoji or icon font — the engine is
agnostic about what sits inside your button.

### A three-state toggle (dark / light / system)

`preference` is what the user picked and may be `'system'`; `resolved` is
what is actually applied. A cycling button or segmented control just calls
`set` — no transition spec means an instant swap, or pass one to animate:

```svelte
<script lang="ts">
	import { mode, type Mode } from 'fractalthemer/mode';

	const store = mode();
	const next: Record<Mode, Mode> = { light: 'system', system: 'dark', dark: 'light' };
</script>

<button type="button" onclick={() => store.set(next[store.preference])}>
	{store.preference === 'system'
		? `System (${store.resolved})`
		: store.preference === 'dark'
			? 'Dark'
			: 'Light'}
</button>
```

While `preference` is `'system'` the store follows OS changes by itself;
`set('dark')` / `set('light')` pin it until something sets `'system'` again.

### `modeScript(options?) → string`

Emits the head snippet that stamps `<html data-mode>` **before first paint** —
no flash of the wrong theme. Render it in `<svelte:head>` exactly as shown in
step 2 (note the escaped `<\/script>` closing tag inside `{@html ...}`).

| Option | Default | Meaning |
| --- | --- | --- |
| `attribute` | `'data-mode'` | The `<html>` attribute stamped with the resolved mode |
| `storageKey` | `'mode'` | localStorage key the choice persists under |
| `defaultMode` | `'system'` | Used when nothing is stored: `'dark' \| 'light' \| 'system'` |

If you customize options, pass **the same options to `mode()`** — the script
and the store must agree on the attribute and key.

### `mode(options?) → ModeStore`

The app-wide singleton. Configure on the first call (root layout); every later
call returns the same instance, whatever options they pass. Takes the same
`ModeOptions` as `modeScript`.

State (reactive — read it in templates and `$derived`):

| Member | Type | Meaning |
| --- | --- | --- |
| `preference` | `'dark' \| 'light' \| 'system'` | What the user picked — may be `'system'` |
| `resolved` | `'dark' \| 'light'` | What is actually applied (and stamped on `<html>`) |
| `isDark` | `boolean` | `resolved === 'dark'` |

Methods:

| Method | Meaning |
| --- | --- |
| `set(next, spec?)` | Set the mode. With a `spec`, animated through the transition engine; without one, an instant swap. Persists the choice. |
| `toggle(spec?)` | Flip dark ↔ light. **Default spec: the swipe** — `wipe`, 520ms, dark falls from the top, light rises from the bottom. A passed spec merges over that default. |

Built-in behavior, no wiring needed: follows the OS while `preference` is
`'system'`; follows changes made in other tabs; reads the legacy `futils.mode`
key so an existing choice survives; degrades to an instant swap under
`prefers-reduced-motion` or where the View Transitions API is missing.

### `transition(update, spec?)` — animate any DOM change

The engine under `set`/`toggle`, exported for your own uses (route changes,
section swaps, anything). Returns a promise that settles when the animation
does; when view transitions are missing, reduced motion is on, or `kind` is
`'none'`, the update simply runs — callers never branch:

```ts
import { transition } from 'fractalthemer/motion'; // or $lib/motion/transitions.js

await transition(() => (section = next), { kind: 'slide', direction: 'left' });
```

| `TransitionSpec` | Default | Meaning |
| --- | --- | --- |
| `kind` | `'wipe'` | `'wipe'` (new page grows in from an edge, old stays) · `'slide'` (both pages move) · `'fade'` · `'circle'` (opens from a point — pass `origin`) · `'none'` |
| `direction` | `'up'` | `'up' \| 'down' \| 'left' \| 'right'` — ignored by `fade` / `circle` |
| `duration` | `420` | Milliseconds |
| `easing` | `'in-out'` | A name from the shared vocabulary (below) — or any raw CSS timing function |
| `origin` | viewport centre | `{ x, y }` in px, for `circle`. Pass a click's `clientX` / `clientY` to open from the button pressed |
| `className` | — | Class set on `<html>` for the duration, for bespoke `::view-transition` CSS |

`fractalthemer/motion` also exports two probes, if you want to branch
yourself: `supportsViewTransitions()` and `prefersReducedMotion()`.

**Required once:** import the reset — `import 'fractalthemer/transition.css'`
(or `$lib/motion/transition.css`) — in the root layout. Without it the
browser's built-in cross-fade also runs and every effect arrives smeared with
a fade. This is the step people miss.

### Easing — the shared vocabulary

Every animation in the kit names its curve from this one vocabulary, so a
curve means the same thing whether CSS or JS runs it:

| Name | Curve | Reads as |
| --- | --- | --- |
| `linear` | `linear` | Constant |
| `out-quad` | `cubic-bezier(.25,.46,.45,.94)` | Gentle settle |
| `out-cubic` | `cubic-bezier(.215,.61,.355,1)` | Snappy settle |
| `out-expo` | `cubic-bezier(.16,1,.3,1)` | Fast, long tail |
| `out-back` | `cubic-bezier(.34,1.56,.64,1)` | Slight overshoot |
| `in-out` | `cubic-bezier(.65,0,.35,1)` | Symmetric — the default |
| `in-cubic` | `cubic-bezier(.55,.055,.675,.19)` | Slow start |
| `stepped` | `steps(8, end)` | Ticks, not glide |

Any other string passes through as a raw CSS timing function. The names are
exported from `fractalthemer/motion/easing` (`EASINGS`, `easingValue`,
`easingFn`) so per-frame JS animation can share the vocabulary.

## The linter

```sh
pnpm lint                        # in this repo
npx fractalthemer lint src/      # in a project that depends on fractalthemer
```

Enforces the contract: only registry classes (plus `_08_own.sass`
extensions — which may not shadow system classes), no scoped styles, no
inline styles, no raw hex or off-ladder pixels in consumer CSS. In an
ejected project, `src/lib/styles/` + `src/lib/palette/` are privileged and
the project's own registry is used. Rules and modes: [docs/lint.md](./docs/lint.md).

## Class registry & class API

`src/lib/data/registry.json` is **generated — never hand-edit it.** It
inventories everything the layers emit (classes, custom properties, element
selectors and keyframes) filed under the partial that produces each item.

```sh
pnpm registry   # regenerate on demand
```

Provenance is by per-layer standalone compile — each layer partial compiled
alone yields exactly its own output. Details: [docs/registry.md](./docs/registry.md).

### The class API — what each class means

The same build also generates the **class API**: a human-readable reference
where every one of the 1,000+ classes carries its meaning, grouped by layer
and family, with a curated intro per layer explaining intent (when to reach
for `rgp-` vs `gp-`, how the interaction axes compose, what rides the shape
axis…). It ships in the npm package, so non-ejected projects have the full
reference offline:

```
node_modules/fractalthemer/src/lib/data/registry.api.md
```

It also renders on GitHub/npm, and an ejected project regenerates its own
(`node scripts/build-registry.mjs` writes both the JSON and the API doc).

### The registry browser

Prefer to browse? The CLI can open the registry as a searchable page — filter
by layer or kind, search names and meanings. It resolves the project's own
registry first (ejected), falling back to the shipped package registry:

```sh
npx fractalthemer browser          # opens in your browser
npx fractalthemer browser --out classes.html   # or just write the page
```

### Editor intellisense — VSIX included

The package also ships a **VS Code extension** with the full class system as
completions, so the class names arrive as you type instead of living in a
reference file:

```
node_modules/fractalthemer/src/lib/data/fractalthemer-intellisense-0.2.1.vsix
```

Install it straight from the package folder:

```sh
code --install-extension node_modules/fractalthemer/src/lib/data/fractalthemer-intellisense-0.2.1.vsix
```

(or Extensions panel → ⋯ → *Install from VSIX…*). It provides the 1,692
canonical class completions with API-derived descriptions and hover
documentation, works in HTML, Svelte, Vue, Astro, JSX/TSX, CSS, Sass and
SCSS, and completes Svelte's `class:` directive.

#### Rebuilding the VSIX

The extension bundles the generated registry, so it must be rebuilt whenever
the class system changes (new classes, renamed rungs, new layers). From the
repo root:

```sh
pnpm registry                                          # 1. regenerate registry.json + registry.api.md
node scripts/build-fractalthemer-intellisense-vsix.mjs # 2. bundle into the VSIX (default version 0.2.1)
```

The build reads `src/lib/data/registry.json` + `registry.api.md` (descriptions),
`static/images/fractalthemer-intellisense-icon.png` (marketplace icon) and the
repo `LICENSE`, then writes
`src/lib/data/fractalthemer-intellisense-<version>.vsix`. Pass a semver as the
first argument to write a different versioned filename:
`node scripts/build-fractalthemer-intellisense-vsix.mjs 0.3.0`. The build fails
loudly if the registry is missing or internally inconsistent, so it is safe to
run at any time. Remember that the npm `files` glob `src/lib/data/*.vsix` ships
whatever VSIX files exist there — delete superseded versions so the tarball
carries exactly one.

## Development

```sh
pnpm dev         # registry browser on :5173
pnpm check       # svelte-check
pnpm lint        # contract linter (self mode)
pnpm registry    # regenerate registry.json
pnpm package     # build dist (registry + svelte-package + css compile)
```
