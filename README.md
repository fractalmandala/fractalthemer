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
@use 'fractalthemer/styles' as *;
```

The stylesheet is assembled from numbered layers under `src/lib/styles`,
loaded in order by `index.sass` — that file's `@use` list *is* the
composition. Eleven layer partials, `00_tokens` (the custom-property source of
truth) through `08_own` (the sanctioned extension point). Precompiled CSS is
also available:

```ts
import 'fractalthemer/styles.css';
```

## Two ways to use it

**1. Install and use** — track the package; upgrades come from npm.

```sh
pnpm add -D fractalthemer
```

```sass
@use 'fractalthemer/styles' as *;
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

Full layer map: [docs/architecture.md](./docs/architecture.md). The styling
rules (contracts, golden rules, configuration knobs): [docs/contract.md](./docs/contract.md).

## Mode with a swipe

```svelte
<script lang="ts">
	import { mode } from 'fractalthemer/mode';
	import 'fractalthemer/transition.css'; // once, in the root layout

	const store = mode();
</script>

<button onclick={() => store.toggle()}>
	{store.resolved === 'dark' ? 'Light' : 'Dark'}
</button>
```

`toggle()` defaults to the swipe — the incoming theme wipes over the old one
(dark falls from the top, light rises from the bottom, 520ms,
`cubic-bezier(0.65, 0, 0.35, 1)`) — and degrades to an instant flip under
`prefers-reduced-motion` or where the View Transitions API is missing.
Composable kinds: `wipe`, `slide`, `fade`, `circle`.

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

## Class registry

`src/lib/data/registry.json` is **generated — never hand-edit it.** It
inventories everything the layers emit (classes, custom properties, element
selectors and keyframes) filed under the partial that produces each item,
and it backs the filterable browser on `/`.

```sh
pnpm registry   # regenerate on demand
```

Provenance is by per-layer standalone compile — each layer partial compiled
alone yields exactly its own output. Details: [docs/registry.md](./docs/registry.md).

## Development

```sh
pnpm dev         # registry browser on :5173
pnpm check       # svelte-check
pnpm lint        # contract linter (self mode)
pnpm registry    # regenerate registry.json
pnpm package     # build dist (registry + svelte-package + css compile)
```
