# AGENTS — complete context for working on fractalthemer

> Read this top to bottom before touching anything. It is written to be the
> whole context: what the package is, how it is built, what must never be
> broken, and the exact checklists. Deep details live in `docs/` (links at
> the end) — this file tells you what matters and where to look.

## What this package is

**fractalthemer** is a class-based styling system, published on npm
(account `fractaldesign`, MIT, Node >=20, Svelte 5 peer dependency). Repo:
`/Users/amrit/fractalmandala/fractalthemer`, GitHub
`fractalmandala/fractalthemer`, branch `main`. Current version lives in
`package.json` (0.7.0 published 2026-09-17).

It is composed of four concerns that ship together:

1. **The styles** — layered indented SASS (single tab, no braces, no
   semicolons) in `src/lib/styles/`, compiled also to plain CSS
   (`fractalthemer/styles.css`). Semantic tokens, curated themes, auras,
   glass, a theme-picker, and ~1,148 generated utility/component classes.
2. **The registry** — `src/lib/data/registry.json`, a generated complete
   inventory of everything the styles emit, plus
   `src/lib/data/registry.api.md`, a generated human-readable "what each
   class means" doc. Both ship inside the npm package.
3. **The runtime** — one mode engine and one transition engine (Svelte 5
   runes), with an animated dark/light swipe toggle component.
4. **ft-lint** — the shipped contract linter (`bin/lint.mjs`, the
   `fractalthemer` bin) that enforces the system's rules in this repo and
   in consumer projects.

## The golden rules (always remember)

- **No ad-hoc CSS anywhere.** Styles are added ONLY inside the system's
  designated files `src/lib/styles`. No scoped `<style>` blocks anywhere,
  including components. No inline `style=` attributes. This is enforced,
  not advisory — `pnpm lint` fails on violations.
- **`registry.json` and `registry.api.md` are generated — never hand-edit.**
  After ANY edit under `src/lib/styles`, run `pnpm registry` and commit the
  diff. `ft/registry-stale` failing means the committed registry lies about
  the layers.
- **Layer 08 (`_08_own.sass`) is the extension point** for project-local
  classes, and must never shadow a system class name (`ft/own-conflict`).
  If a behavior is missing, extend `_08_own` or propose a system class —
  never patch with inline styles.
- **One engine per concern.** Mode: `src/lib/state/mode.svelte.ts`
  (`mode()` store, animated `toggle()`/`set(spec)` — do not wire ad-hoc
  transitions around mode flips). Transitions:
  `src/lib/motion/transitions.ts` (`transition()`), with `transition.css`
  imported once in the root layout. There is no second copy of either
  concern; the old preset-axes runtime was deliberately deleted (variant
  axes belong to generation pipelines like affedo, not here).
- **Color tokens require the `[data-mode]` marker.** `_00_tokens.sass`
  defines every color token only inside `[data-mode='light']` /
  `[data-mode='dark']` blocks — no `:root` fallbacks. Consumers must
  render `{@html `<script>${modeScript()}<\/script>`}` in
  `<svelte:head>` (from `fractalthemer/mode`) or the page is unstyled.
  Do not "fix" this by adding `:root` fallbacks; it is the anti-flicker
  design and the modeScript is the contract.
- **Indentation is tabs**, everywhere in this repo (SASS, JS, MD code
  blocks follow the file's style). Indented SASS: no braces, no semicolons.
- **Dev servers**: always first ask the user if they already have one
  running before starting your own; if they do, use theirs. Kill any
  server you started when done — never leave them running in background.

## The layer map (`src/lib/styles/`, composed in `index.sass`)

| Layer | Owns |
|---|---|
| `_00_tokens.sass` | ALL semantic tokens — colors (inside `[data-mode]` blocks only), type scale, shadows, z-index |
| `_00_configsteps.sass` | step/config vocabulary declarations; font-face (consumer must ship the font asset) |
| `_01_config.sass` | `$breakpoint: 769px !default`, `$responsive-modes` (mob < 769, desk >= 769), literal ladder `!default`s |
| `_01_base.sass` | element selectors and the reset |
| `_02_dimensions.sass` | generated space families — gaps (`gp/rgp/cgp`), pads (`pad/px/py/pt/pr/pb/pl`), margins (`mar/mx/my/mt/mr/mb/ml`), radius, size (`w-/h-/square-`), full-bleed/min- helpers |
| `_03_containers.sass` | `.box/.row/.grid` bases with nested x*/y* alignment modifiers (x = left/right, y = top/bottom — PHYSICAL axes, never logical) |
| `_04_layouts.sass` | named layout gridding, prose, frames, reel |
| `_05_shells.sass` | app-shell, rails, navtree/toc, tabs, overlays, accordion, hero, content-section, page-shell/split |
| `_06_visuals.sass` | bg family, ink, status fills, typography, shadows (whole family lives here), field/kbd/avatar/divider/switch, visibility |
| `_07_interactions.sass` | interactive roster `btn/link/pill/card/badge` × three orthogonal axes: paint (`primary/outline/soft/ghost/danger`), size (`sm/bs/lg` on the shared control-height channel), shape (`round/curved/square`) — compose as `"btn primary lg curved"` |
| `_08_own.sass` | project-local classes. Seeded EMPTY on eject; the repo's own copy holds personal classes (and a `.bdr` test leftover — see quirks) |
| `_09_modifiers.sass` | variant axes: shape/density/scale sets (`.radius-round`, `.density-comfort`, `.scale-expanded`…) and their `data-shape`/`data-density`/`data-scale` token remaps — set on `<html>` or any subtree |
| `configvocab.sass` | the vocabulary the generators loop over (`$steps`, family maps) — change a family HERE and the classes regenerate |

Numeric ladder facts: literal space rungs are `0, 4, 8, 16, 32, 64`
(`$literal-space-max: 64`); gap/margin rungs ride `var(--gap-scale)`, pads
`var(--pad-scale)`; radius channel rungs (`radius-md`) ride the shape axis,
radius literals never do. Responsive twins are the same class with
`-mob`/`-desk` suffix.

## The registry — how it is built and kept true

- `pnpm registry` runs `scripts/build-registry.mjs`, which compiles **each
  layer standalone** (only `@use`ing non-class-emitting modules) to harvest
  provenance — that is how the registry knows which partial owns each item.
  If a layer ever `@use`s another class-emitting layer, ownership falls to
  `index.sass` order. The Vite plugin also regenerates on dev-server
  `buildStart` and on any change under `src/lib/styles`.
- Two outputs, written only on content change (no churn):
  `src/lib/data/registry.json` (machine: `{name, kind, group}` per item;
  class names carry the leading dot, tokens are bare `--bg`) and
  `src/lib/data/registry.api.md` (human: every class with a one-line
  meaning). Freshness = "already fresh, nothing written"; `pnpm lint`
  self mode uses exactly that as its staleness check.
- **Meanings come from `scripts/class-vocab.mjs`** — `describe(item,
  layerId)` decodes class names from the real generator-loop families
  (plus curated per-layer intros via `LAYER_INTROS`). Coverage must stay
  100%: **when you add or change a class family in the SASS, extend the
  matching decoder or curated dictionary in `class-vocab.mjs` in the same
  change**, then `pnpm registry` and eyeball the new entries in
  `registry.api.md`. Registry counts at 0.7.0: 1,148 classes / 74 tokens /
  18 elements.

## The CLI (`bin/lint.mjs`, `npx fractalthemer …`)

```
fractalthemer lint            # self mode (this repo): freshness + contracts
fractalthemer lint <dir>      # consumer mode: lints a project that uses the package
fractalthemer eject [dir]     # consumption mode 2: copy the styles as the project's own
fractalthemer mode [dir]      # consumption mode 3: install the mode-toggle feature as source
fractalthemer browser [dir]   # open the registry as a searchable page (--out writes it)
```

Linter rules: `ft/no-in-component-styles`, `ft/no-inline-styles`,
`ft/unknown-class` (fuzzy "did you mean"), `ft/declaration-outside-own`
(a class used in markup that lives only in a project-specific layer —
component skins, docs surfaces — names the declaring file; declaration
rights are `_08_own.sass` only, since components must compose system
classes), `ft/token-purity` (no raw hex, px budget, every `var()` maps to
a registry token or local property), `ft/hardcoded-radius` (consumer
styles must use `var(--radius-*)`), `ft/sass-interpolation` (never a bare
Sass function call inside a custom-property value — interpolate with
`#{}`; applies everywhere, including privileged files), `ft/own-conflict`,
`ft/registry-stale`.
Consumer-mode class allowlist: the CANONICAL shipped registry (minus its
own layer) ∪ the project's system-layer classes (same layer ids) ∪ the
project's `_08_own.sass` declarations — NEVER the project's compiled
registry, which absorbs skins and would legitimize their classes.
Registry resolution for tokens/layer attribution is preference-ordered:
the project's own `src/lib/data/registry.json` (ejected) first, then the
shipped package registry.

**Three consumption modes** (documented in README "Three ways to use it"):
1. npm dependency + `@use 'fractalthemer/styles' as *` (use an explicit
   version pin — bare installs can resolve an older published version).
2. `eject` — copies 12 styles + 5 palette modules + `build-registry.mjs` +
   `class-vocab.mjs` into the project, seeds an empty `_08_own.sass`; the
   project then owns and regenerates its registry.
3. `mode` — installs the dark/light swipe feature as editable source
   (`motion/`, `state/mode.svelte.ts`, `ModeToggle.svelte`, `Sun/Moon`
   icons), mirroring the canonical `$lib` layout so imports resolve.
   Never let a consumer rename those destination directories.

## The VSIX (editor intellisense)

`src/lib/data/fractalthemer-intellisense-<version>.vsix` is the packaged
editor extension (1,692 class completions + hover docs; HTML/Svelte/Vue/
Astro/JSX/TSX/CSS/Sass/SCSS; Svelte `class:` directive). It ships inside the
npm package via `files: "src/lib/data/*.vsix"` (with `!dist/**/*.vsix` so the
`svelte-package` mirror doesn't duplicate it — exactly ONE copy must appear
in the tarball). The README hardcodes the current filename — bump it when
the VSIX version changes.

**Rebuild procedure** (run whenever the registry changed — new classes,
renamed rungs, new layers):

1. `pnpm registry` — regenerate `src/lib/data/registry.json` +
   `registry.api.md` (the extension's hover descriptions come from the md;
   a new class family needs its decoder in `scripts/class-vocab.mjs` first,
   otherwise entries fall back to generic text).
2. `node scripts/build-fractalthemer-intellisense-vsix.mjs [semver]` —
   bundles the registry, the API md, `static/images/
   fractalthemer-intellisense-icon.png` and the repo LICENSE into
   `src/lib/data/fractalthemer-intellisense-<version>.vsix` (default version
   `0.2.1`). The script fails loudly on a missing/inconsistent registry.
3. Delete superseded VSIX versions from `src/lib/data/` so the tarball
   carries exactly one, and bump the hardcoded filename in the README's
   install path.

Verify a rebuild with:
`unzip -p src/lib/data/<file>.vsix extension/data/registry.json | cmp - src/lib/data/registry.json`
(byte-identical) and `npm pack --dry-run | grep vsix` (exactly one entry).

**Any registry change (new/renamed classes) makes the bundled registry
stale — rebuild the VSIX as part of the same change, not as a follow-up.**

## Known quirks (as of 0.7.0 — verify before "fixing")

- `_08_own.sass` line ~9 contains `.bdr { border: 1px solid red }` — a
  suspected test leftover. Deliberately NOT copied by eject (eject seeds an
  empty `_08_own`). Ask the user before deleting.
- `--shadow-sm` does not exist in `_00_tokens.sass` (only `--shadow-md/bs/lg`);
  anything referencing `var(--shadow-sm)` falls back to nothing. Flagged,
  resolution belongs to the user.
- Sass `@for $i from 2 through 1` counts DOWNWARD — the size loop guards
  with `@if $literal-max > $literal-step`; keep that guard.
- This repo's `scripts/*.mjs` are type-checked by svelte-check (checkJs):
  every new function needs JSDoc `@param`/`@returns`, and every literal
  lookup table needs `@type {Record<string, string>}` or indexing errors
  will fail `pnpm check`.
- Deleting a generated class family: first grep `.svelte`/`.ts` for usage
  with word-boundary anchoring (broad regexes matched unrelated lines
  before), and remember families are named `gp-`/`rgp-`/`cgp-`, never
  `gap*`.

## Workflow

```sh
pnpm dev         # registry browser on :5173 (ask the user first — see golden rules)
pnpm check       # svelte-check — must be 0/0
pnpm lint        # ft-lint self mode — must be 0 violations
pnpm registry    # regenerate registry.json + registry.api.md after style edits
pnpm build       # full dist build (also runs the registry build)
pnpm package     # same as the prepack pipeline
npm pack --dry-run  # inspect the tarball BEFORE publishing
```

## Checklist — before each new version publish

1. `pnpm registry` — output must say "already fresh, nothing written" for
   BOTH files (if not, review the diff and commit it).
2. `pnpm lint` — 0 violations. `pnpm check` — 0 errors, 0 warnings.
3. Bump `version` in `package.json`; update the README if the VSIX
   filename changed.
4. `pnpm build` — clean.
5. `npm pack --dry-run` — verify: `registry.json`, `registry.api.md`,
   exactly ONE `.vsix` (the `src/lib/data` one), `class-vocab.mjs`,
   `build-registry.mjs`, `browser.mjs`, and that every `exports` path
   resolves.
6. Commit (never push --force; never skip hooks). The user runs
   `npm publish` — do not publish without being asked.
7. After publish: `npm view` 404s for a few minutes while npm processes —
   that is normal. When it resolves, smoke-test from a scratch dir:
   `npm install fractalthemer@<version>`, then check `registry.api.md` +
   the `.vsix` under `node_modules/fractalthemer/src/lib/data/` and run
   `npx fractalthemer browser`.

## References

- [docs/architecture.md](./docs/architecture.md) — layer map and engines
- [docs/contract.md](./docs/contract.md) — the rules and configuration knobs
- [docs/registry.md](./docs/registry.md) — the registry, its build, and the browser command
- [docs/lint.md](./docs/lint.md) — linter rules, modes, allowlists
- [docs/skins.md](./docs/skins.md) — the skin contract: how component skins attach to the variant axes
- [README.md](./README.md) — consumer-facing setup: three ways to use it, mode wiring, VSIX install
