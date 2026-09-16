# fractalthemer — class API

> Generated from the class registry by `scripts/build-registry.mjs` — **do not edit by hand**;
> edit the layers (or `_08_own.sass`) and rebuild. Shipped in the npm package so this reference
> is available offline in `node_modules/fractalthemer/src/lib/data/registry.api.md`.

**1148** classes · **74** custom properties · **18** element selectors in 11 layers.

Every generated class decodes from its family; the intro paragraphs are the intent.
Interactive surfaces compose axes: `btn primary lg curved`.

---

## 0. tokens

`tokens.sass`

Custom properties — every value the system owns. Themes stamp them under [data-mode] (light/dark have opinions only here); components and utilities only consume them. Never hard-code a value the ladder already has.

### Custom properties (74)

| Name | Meaning |
| --- | --- |
| `--avatar-size` | avatar edge length |
| `--bg` | page background |
| `--bg-muted` | muted surface background |
| `--bg-primary` | primary surface background |
| `--bg-secondary` | secondary surface background |
| `--border` | default border color |
| `--border-strong` | emphasized border color |
| `--border-subtle` | quiet border color |
| `--content-clamp` | max width for clamped content |
| `--control-h-bs` | default control height |
| `--control-h-lg` | large control height |
| `--control-h-sm` | compact control height (buttons, inputs) |
| `--danger` | status color: danger (light -9 / dark -5 rung) |
| `--ease-out` | shared deceleration curve |
| `--ease-spring` | shared overshoot curve |
| `--font-mono` | monospace family |
| `--font-sans` | sans family |
| `--footer-height` | app-shell footer height (0 = no footer) |
| `--header-height` | app-shell header height |
| `--info` | status color: info |
| `--motion-base` | standard motion duration |
| `--motion-fast` | fast motion duration (hovers, toggles) |
| `--motion-slow` | slow motion duration (large surfaces) |
| `--prose-clamp` | max width for long-form reading |
| `--radius-bs` | radius channel rung |
| `--radius-lg` | radius channel rung |
| `--radius-md` | radius channel rung — the common corner |
| `--radius-sm` | radius channel rung |
| `--radius-xl` | radius channel, largest rung (full round) |
| `--radius-xs` | radius channel, smallest rung — the shape axis rewrites these |
| `--shadow-bs` | subtle shadow |
| `--shadow-lg` | elevated shadow |
| `--shadow-md` | medium shadow |
| `--sidebar-width` | app-shell rail width |
| `--space-bs` | space rung — the body spacing |
| `--space-lg` | space rung |
| `--space-md` | space rung |
| `--space-sm` | space rung |
| `--space-xl` | space rung |
| `--space-xs` | space rung (density axes rewrite these) |
| `--speed-0` | motion speed preset 0 |
| `--speed-1` | motion speed preset 1 |
| `--speed-2` | motion speed preset 2 |
| `--speed-3` | motion speed preset 3 |
| `--success` | status color: success |
| `--switch-h` | toggle track height |
| `--switch-thumb` | toggle knob size |
| `--switch-w` | toggle track width |
| `--text-2xl` | type rung: 2xl |
| `--text-3xl` | type rung: 3xl (display) |
| `--text-4xl` | type rung: 4xl (display) |
| `--text-5xl` | type rung: 5xl (display) |
| `--text-bs` | type rung: body |
| `--text-inverse` | ink for filled surfaces |
| `--text-lg` | type rung: lg |
| `--text-md` | type rung: md |
| `--text-muted` | muted ink |
| `--text-primary` | primary ink |
| `--text-secondary` | secondary ink |
| `--text-sm` | type rung: sm |
| `--text-xl` | type rung: xl |
| `--text-xs` | type rung: xs |
| `--theme-color` | the accent — every paint rung reads it |
| `--theme-color-hover` | accent hover state |
| `--transin-1` | enter-transition duration rung 1 |
| `--transin-2` | enter-transition duration rung 2 |
| `--transin-3` | enter-transition duration rung 3 |
| `--transout-1` | exit-transition duration rung 1 |
| `--transout-2` | exit-transition duration rung 2 |
| `--transout-3` | exit-transition duration rung 3 |
| `--warning` | status color: warning |
| `--z-modal` | z-index: modal layer |
| `--z-raised` | z-index: raised layer |
| `--z-sticky` | z-index: sticky layer |

---

## 1. config

`config.sass`

Compile-time configuration only — !default knobs (breakpoint, ladders, scales) and nothing that emits. Override at @use time or by editing an ejected copy; nothing here is a class.

---

## 2. base

`base.sass`

Element resets for the bare tags — typography rhythm, link ink, list resets. System buttons are composed with .btn on top of the native reset.

### Element selectors (18)

| Name | Meaning |
| --- | --- |
| `*` | universal box-sizing/margin reset |
| `a` | links: theme color, no underline decoration by default |
| `blockquote` | quoted block with a partition rule |
| `body` | page body: background, ink, font |
| `button` | native button reset — compose buttons with .btn |
| `h1` | heading rhythm |
| `h2` | heading rhythm |
| `h3` | heading rhythm |
| `h4` | heading rhythm |
| `h5` | heading rhythm |
| `h6` | heading rhythm |
| `html` | root: font, color-scheme, mode attribute wiring |
| `li` | list item |
| `ol` | list reset |
| `p` | paragraph rhythm |
| `small` | smaller text |
| `svg` | svg display block |
| `ul` | list reset |

---

## 3. dimensions

`dimensions.sass`

The generated half of the registry: 17 space families, radius, and size, each emitted in three bands (bare, -mob below 769px, -desk at 769px+, Contract 7). Step rungs (gp-md) ride the tokens and respect the density knobs --gap-scale / --pad-scale; numeric rungs (gp-32) are px literals for exact requirements. Radius channel rungs follow the shape axis; radius literals never do.

### Classes (923)


**gaps**

_gp is the everyday gap; rgp/cgp split the axes when rows and columns must breathe differently. All scale with --gap-scale._

| Name | Meaning |
| --- | --- |
| `.cgp-0` | column-gap: 0px (literal — ignores the density knobs) |
| `.cgp-0-desk` | column-gap: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.cgp-0-mob` | column-gap: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.cgp-16` | column-gap: 16px (literal — ignores the density knobs) |
| `.cgp-16-desk` | column-gap: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.cgp-16-mob` | column-gap: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.cgp-2xl` | column-gap: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.cgp-2xl-desk` | column-gap: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-2xl-mob` | column-gap: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-32` | column-gap: 32px (literal — ignores the density knobs) |
| `.cgp-32-desk` | column-gap: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.cgp-32-mob` | column-gap: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.cgp-3xl` | column-gap: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.cgp-3xl-desk` | column-gap: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-3xl-mob` | column-gap: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-4` | column-gap: 4px (literal — ignores the density knobs) |
| `.cgp-4-desk` | column-gap: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.cgp-4-mob` | column-gap: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.cgp-4xl` | column-gap: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.cgp-4xl-desk` | column-gap: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-4xl-mob` | column-gap: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-5xl` | column-gap: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.cgp-5xl-desk` | column-gap: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-5xl-mob` | column-gap: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-64` | column-gap: 64px (literal — ignores the density knobs) |
| `.cgp-64-desk` | column-gap: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.cgp-64-mob` | column-gap: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.cgp-8` | column-gap: 8px (literal — ignores the density knobs) |
| `.cgp-8-desk` | column-gap: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.cgp-8-mob` | column-gap: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.cgp-bs` | column-gap: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.cgp-bs-desk` | column-gap: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-bs-mob` | column-gap: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-lg` | column-gap: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.cgp-lg-desk` | column-gap: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-lg-mob` | column-gap: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-md` | column-gap: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.cgp-md-desk` | column-gap: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-md-mob` | column-gap: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-sm` | column-gap: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.cgp-sm-desk` | column-gap: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-sm-mob` | column-gap: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-xl` | column-gap: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.cgp-xl-desk` | column-gap: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-xl-mob` | column-gap: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.cgp-xs` | column-gap: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.cgp-xs-desk` | column-gap: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.cgp-xs-mob` | column-gap: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-0` | gap (both axes): 0px (literal — ignores the density knobs) |
| `.gp-0-desk` | gap (both axes): 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.gp-0-mob` | gap (both axes): 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.gp-16` | gap (both axes): 16px (literal — ignores the density knobs) |
| `.gp-16-desk` | gap (both axes): 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.gp-16-mob` | gap (both axes): 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.gp-2xl` | gap (both axes): var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.gp-2xl-desk` | gap (both axes): var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-2xl-mob` | gap (both axes): var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-32` | gap (both axes): 32px (literal — ignores the density knobs) |
| `.gp-32-desk` | gap (both axes): 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.gp-32-mob` | gap (both axes): 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.gp-3xl` | gap (both axes): var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.gp-3xl-desk` | gap (both axes): var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-3xl-mob` | gap (both axes): var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-4` | gap (both axes): 4px (literal — ignores the density knobs) |
| `.gp-4-desk` | gap (both axes): 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.gp-4-mob` | gap (both axes): 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.gp-4xl` | gap (both axes): var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.gp-4xl-desk` | gap (both axes): var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-4xl-mob` | gap (both axes): var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-5xl` | gap (both axes): var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.gp-5xl-desk` | gap (both axes): var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-5xl-mob` | gap (both axes): var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-64` | gap (both axes): 64px (literal — ignores the density knobs) |
| `.gp-64-desk` | gap (both axes): 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.gp-64-mob` | gap (both axes): 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.gp-8` | gap (both axes): 8px (literal — ignores the density knobs) |
| `.gp-8-desk` | gap (both axes): 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.gp-8-mob` | gap (both axes): 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.gp-bs` | gap (both axes): var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.gp-bs-desk` | gap (both axes): var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-bs-mob` | gap (both axes): var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-lg` | gap (both axes): var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.gp-lg-desk` | gap (both axes): var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-lg-mob` | gap (both axes): var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-md` | gap (both axes): var(--space-md) × --gap-scale — token-routed, density-aware |
| `.gp-md-desk` | gap (both axes): var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-md-mob` | gap (both axes): var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-sm` | gap (both axes): var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.gp-sm-desk` | gap (both axes): var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-sm-mob` | gap (both axes): var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-xl` | gap (both axes): var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.gp-xl-desk` | gap (both axes): var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-xl-mob` | gap (both axes): var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.gp-xs` | gap (both axes): var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.gp-xs-desk` | gap (both axes): var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.gp-xs-mob` | gap (both axes): var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-0` | row-gap: 0px (literal — ignores the density knobs) |
| `.rgp-0-desk` | row-gap: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.rgp-0-mob` | row-gap: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.rgp-16` | row-gap: 16px (literal — ignores the density knobs) |
| `.rgp-16-desk` | row-gap: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.rgp-16-mob` | row-gap: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.rgp-2xl` | row-gap: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.rgp-2xl-desk` | row-gap: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-2xl-mob` | row-gap: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-32` | row-gap: 32px (literal — ignores the density knobs) |
| `.rgp-32-desk` | row-gap: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.rgp-32-mob` | row-gap: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.rgp-3xl` | row-gap: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.rgp-3xl-desk` | row-gap: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-3xl-mob` | row-gap: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-4` | row-gap: 4px (literal — ignores the density knobs) |
| `.rgp-4-desk` | row-gap: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.rgp-4-mob` | row-gap: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.rgp-4xl` | row-gap: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.rgp-4xl-desk` | row-gap: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-4xl-mob` | row-gap: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-5xl` | row-gap: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.rgp-5xl-desk` | row-gap: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-5xl-mob` | row-gap: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-64` | row-gap: 64px (literal — ignores the density knobs) |
| `.rgp-64-desk` | row-gap: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.rgp-64-mob` | row-gap: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.rgp-8` | row-gap: 8px (literal — ignores the density knobs) |
| `.rgp-8-desk` | row-gap: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.rgp-8-mob` | row-gap: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.rgp-bs` | row-gap: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.rgp-bs-desk` | row-gap: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-bs-mob` | row-gap: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-lg` | row-gap: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.rgp-lg-desk` | row-gap: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-lg-mob` | row-gap: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-md` | row-gap: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.rgp-md-desk` | row-gap: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-md-mob` | row-gap: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-sm` | row-gap: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.rgp-sm-desk` | row-gap: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-sm-mob` | row-gap: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-xl` | row-gap: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.rgp-xl-desk` | row-gap: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-xl-mob` | row-gap: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.rgp-xs` | row-gap: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.rgp-xs-desk` | row-gap: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.rgp-xs-mob` | row-gap: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |

**pads**

_The container's breathing — scales with --pad-scale, so density presets reshape padding without touching content spacing._

| Name | Meaning |
| --- | --- |
| `.pad-0` | padding (all sides): 0px (literal — ignores the density knobs) |
| `.pad-0-desk` | padding (all sides): 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pad-0-mob` | padding (all sides): 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pad-16` | padding (all sides): 16px (literal — ignores the density knobs) |
| `.pad-16-desk` | padding (all sides): 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pad-16-mob` | padding (all sides): 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pad-2xl` | padding (all sides): var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.pad-2xl-desk` | padding (all sides): var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-2xl-mob` | padding (all sides): var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-32` | padding (all sides): 32px (literal — ignores the density knobs) |
| `.pad-32-desk` | padding (all sides): 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pad-32-mob` | padding (all sides): 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pad-3xl` | padding (all sides): var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.pad-3xl-desk` | padding (all sides): var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-3xl-mob` | padding (all sides): var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-4` | padding (all sides): 4px (literal — ignores the density knobs) |
| `.pad-4-desk` | padding (all sides): 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pad-4-mob` | padding (all sides): 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pad-4xl` | padding (all sides): var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.pad-4xl-desk` | padding (all sides): var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-4xl-mob` | padding (all sides): var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-5xl` | padding (all sides): var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.pad-5xl-desk` | padding (all sides): var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-5xl-mob` | padding (all sides): var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-64` | padding (all sides): 64px (literal — ignores the density knobs) |
| `.pad-64-desk` | padding (all sides): 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pad-64-mob` | padding (all sides): 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pad-8` | padding (all sides): 8px (literal — ignores the density knobs) |
| `.pad-8-desk` | padding (all sides): 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pad-8-mob` | padding (all sides): 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pad-bs` | padding (all sides): var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.pad-bs-desk` | padding (all sides): var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-bs-mob` | padding (all sides): var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-lg` | padding (all sides): var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.pad-lg-desk` | padding (all sides): var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-lg-mob` | padding (all sides): var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-md` | padding (all sides): var(--space-md) × --pad-scale — token-routed, density-aware |
| `.pad-md-desk` | padding (all sides): var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-md-mob` | padding (all sides): var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-sm` | padding (all sides): var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.pad-sm-desk` | padding (all sides): var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-sm-mob` | padding (all sides): var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-xl` | padding (all sides): var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.pad-xl-desk` | padding (all sides): var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-xl-mob` | padding (all sides): var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pad-xs` | padding (all sides): var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.pad-xs-desk` | padding (all sides): var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pad-xs-mob` | padding (all sides): var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-0` | padding-bottom: 0px (literal — ignores the density knobs) |
| `.pb-0-desk` | padding-bottom: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pb-0-mob` | padding-bottom: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pb-16` | padding-bottom: 16px (literal — ignores the density knobs) |
| `.pb-16-desk` | padding-bottom: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pb-16-mob` | padding-bottom: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pb-2xl` | padding-bottom: var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.pb-2xl-desk` | padding-bottom: var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-2xl-mob` | padding-bottom: var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-32` | padding-bottom: 32px (literal — ignores the density knobs) |
| `.pb-32-desk` | padding-bottom: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pb-32-mob` | padding-bottom: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pb-3xl` | padding-bottom: var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.pb-3xl-desk` | padding-bottom: var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-3xl-mob` | padding-bottom: var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-4` | padding-bottom: 4px (literal — ignores the density knobs) |
| `.pb-4-desk` | padding-bottom: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pb-4-mob` | padding-bottom: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pb-4xl` | padding-bottom: var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.pb-4xl-desk` | padding-bottom: var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-4xl-mob` | padding-bottom: var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-5xl` | padding-bottom: var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.pb-5xl-desk` | padding-bottom: var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-5xl-mob` | padding-bottom: var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-64` | padding-bottom: 64px (literal — ignores the density knobs) |
| `.pb-64-desk` | padding-bottom: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pb-64-mob` | padding-bottom: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pb-8` | padding-bottom: 8px (literal — ignores the density knobs) |
| `.pb-8-desk` | padding-bottom: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pb-8-mob` | padding-bottom: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pb-bs` | padding-bottom: var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.pb-bs-desk` | padding-bottom: var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-bs-mob` | padding-bottom: var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-lg` | padding-bottom: var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.pb-lg-desk` | padding-bottom: var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-lg-mob` | padding-bottom: var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-md` | padding-bottom: var(--space-md) × --pad-scale — token-routed, density-aware |
| `.pb-md-desk` | padding-bottom: var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-md-mob` | padding-bottom: var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-sm` | padding-bottom: var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.pb-sm-desk` | padding-bottom: var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-sm-mob` | padding-bottom: var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-xl` | padding-bottom: var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.pb-xl-desk` | padding-bottom: var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-xl-mob` | padding-bottom: var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pb-xs` | padding-bottom: var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.pb-xs-desk` | padding-bottom: var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pb-xs-mob` | padding-bottom: var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-0` | padding-left: 0px (literal — ignores the density knobs) |
| `.pl-0-desk` | padding-left: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pl-0-mob` | padding-left: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pl-16` | padding-left: 16px (literal — ignores the density knobs) |
| `.pl-16-desk` | padding-left: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pl-16-mob` | padding-left: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pl-2xl` | padding-left: var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.pl-2xl-desk` | padding-left: var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-2xl-mob` | padding-left: var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-32` | padding-left: 32px (literal — ignores the density knobs) |
| `.pl-32-desk` | padding-left: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pl-32-mob` | padding-left: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pl-3xl` | padding-left: var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.pl-3xl-desk` | padding-left: var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-3xl-mob` | padding-left: var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-4` | padding-left: 4px (literal — ignores the density knobs) |
| `.pl-4-desk` | padding-left: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pl-4-mob` | padding-left: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pl-4xl` | padding-left: var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.pl-4xl-desk` | padding-left: var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-4xl-mob` | padding-left: var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-5xl` | padding-left: var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.pl-5xl-desk` | padding-left: var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-5xl-mob` | padding-left: var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-64` | padding-left: 64px (literal — ignores the density knobs) |
| `.pl-64-desk` | padding-left: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pl-64-mob` | padding-left: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pl-8` | padding-left: 8px (literal — ignores the density knobs) |
| `.pl-8-desk` | padding-left: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pl-8-mob` | padding-left: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pl-bs` | padding-left: var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.pl-bs-desk` | padding-left: var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-bs-mob` | padding-left: var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-lg` | padding-left: var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.pl-lg-desk` | padding-left: var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-lg-mob` | padding-left: var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-md` | padding-left: var(--space-md) × --pad-scale — token-routed, density-aware |
| `.pl-md-desk` | padding-left: var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-md-mob` | padding-left: var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-sm` | padding-left: var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.pl-sm-desk` | padding-left: var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-sm-mob` | padding-left: var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-xl` | padding-left: var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.pl-xl-desk` | padding-left: var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-xl-mob` | padding-left: var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pl-xs` | padding-left: var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.pl-xs-desk` | padding-left: var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pl-xs-mob` | padding-left: var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-0` | padding-right: 0px (literal — ignores the density knobs) |
| `.pr-0-desk` | padding-right: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pr-0-mob` | padding-right: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pr-16` | padding-right: 16px (literal — ignores the density knobs) |
| `.pr-16-desk` | padding-right: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pr-16-mob` | padding-right: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pr-2xl` | padding-right: var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.pr-2xl-desk` | padding-right: var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-2xl-mob` | padding-right: var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-32` | padding-right: 32px (literal — ignores the density knobs) |
| `.pr-32-desk` | padding-right: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pr-32-mob` | padding-right: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pr-3xl` | padding-right: var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.pr-3xl-desk` | padding-right: var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-3xl-mob` | padding-right: var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-4` | padding-right: 4px (literal — ignores the density knobs) |
| `.pr-4-desk` | padding-right: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pr-4-mob` | padding-right: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pr-4xl` | padding-right: var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.pr-4xl-desk` | padding-right: var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-4xl-mob` | padding-right: var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-5xl` | padding-right: var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.pr-5xl-desk` | padding-right: var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-5xl-mob` | padding-right: var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-64` | padding-right: 64px (literal — ignores the density knobs) |
| `.pr-64-desk` | padding-right: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pr-64-mob` | padding-right: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pr-8` | padding-right: 8px (literal — ignores the density knobs) |
| `.pr-8-desk` | padding-right: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pr-8-mob` | padding-right: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pr-bs` | padding-right: var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.pr-bs-desk` | padding-right: var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-bs-mob` | padding-right: var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-lg` | padding-right: var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.pr-lg-desk` | padding-right: var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-lg-mob` | padding-right: var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-md` | padding-right: var(--space-md) × --pad-scale — token-routed, density-aware |
| `.pr-md-desk` | padding-right: var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-md-mob` | padding-right: var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-sm` | padding-right: var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.pr-sm-desk` | padding-right: var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-sm-mob` | padding-right: var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-xl` | padding-right: var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.pr-xl-desk` | padding-right: var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-xl-mob` | padding-right: var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pr-xs` | padding-right: var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.pr-xs-desk` | padding-right: var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pr-xs-mob` | padding-right: var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-0` | padding-top: 0px (literal — ignores the density knobs) |
| `.pt-0-desk` | padding-top: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pt-0-mob` | padding-top: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pt-16` | padding-top: 16px (literal — ignores the density knobs) |
| `.pt-16-desk` | padding-top: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pt-16-mob` | padding-top: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pt-2xl` | padding-top: var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.pt-2xl-desk` | padding-top: var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-2xl-mob` | padding-top: var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-32` | padding-top: 32px (literal — ignores the density knobs) |
| `.pt-32-desk` | padding-top: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pt-32-mob` | padding-top: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pt-3xl` | padding-top: var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.pt-3xl-desk` | padding-top: var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-3xl-mob` | padding-top: var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-4` | padding-top: 4px (literal — ignores the density knobs) |
| `.pt-4-desk` | padding-top: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pt-4-mob` | padding-top: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pt-4xl` | padding-top: var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.pt-4xl-desk` | padding-top: var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-4xl-mob` | padding-top: var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-5xl` | padding-top: var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.pt-5xl-desk` | padding-top: var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-5xl-mob` | padding-top: var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-64` | padding-top: 64px (literal — ignores the density knobs) |
| `.pt-64-desk` | padding-top: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pt-64-mob` | padding-top: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pt-8` | padding-top: 8px (literal — ignores the density knobs) |
| `.pt-8-desk` | padding-top: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.pt-8-mob` | padding-top: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.pt-bs` | padding-top: var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.pt-bs-desk` | padding-top: var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-bs-mob` | padding-top: var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-lg` | padding-top: var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.pt-lg-desk` | padding-top: var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-lg-mob` | padding-top: var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-md` | padding-top: var(--space-md) × --pad-scale — token-routed, density-aware |
| `.pt-md-desk` | padding-top: var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-md-mob` | padding-top: var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-sm` | padding-top: var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.pt-sm-desk` | padding-top: var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-sm-mob` | padding-top: var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-xl` | padding-top: var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.pt-xl-desk` | padding-top: var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-xl-mob` | padding-top: var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.pt-xs` | padding-top: var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.pt-xs-desk` | padding-top: var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.pt-xs-mob` | padding-top: var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-0` | padding-inline: 0px (literal — ignores the density knobs) |
| `.px-0-desk` | padding-inline: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.px-0-mob` | padding-inline: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.px-16` | padding-inline: 16px (literal — ignores the density knobs) |
| `.px-16-desk` | padding-inline: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.px-16-mob` | padding-inline: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.px-2xl` | padding-inline: var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.px-2xl-desk` | padding-inline: var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-2xl-mob` | padding-inline: var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-32` | padding-inline: 32px (literal — ignores the density knobs) |
| `.px-32-desk` | padding-inline: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.px-32-mob` | padding-inline: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.px-3xl` | padding-inline: var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.px-3xl-desk` | padding-inline: var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-3xl-mob` | padding-inline: var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-4` | padding-inline: 4px (literal — ignores the density knobs) |
| `.px-4-desk` | padding-inline: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.px-4-mob` | padding-inline: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.px-4xl` | padding-inline: var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.px-4xl-desk` | padding-inline: var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-4xl-mob` | padding-inline: var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-5xl` | padding-inline: var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.px-5xl-desk` | padding-inline: var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-5xl-mob` | padding-inline: var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-64` | padding-inline: 64px (literal — ignores the density knobs) |
| `.px-64-desk` | padding-inline: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.px-64-mob` | padding-inline: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.px-8` | padding-inline: 8px (literal — ignores the density knobs) |
| `.px-8-desk` | padding-inline: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.px-8-mob` | padding-inline: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.px-bs` | padding-inline: var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.px-bs-desk` | padding-inline: var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-bs-mob` | padding-inline: var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-lg` | padding-inline: var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.px-lg-desk` | padding-inline: var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-lg-mob` | padding-inline: var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-md` | padding-inline: var(--space-md) × --pad-scale — token-routed, density-aware |
| `.px-md-desk` | padding-inline: var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-md-mob` | padding-inline: var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-sm` | padding-inline: var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.px-sm-desk` | padding-inline: var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-sm-mob` | padding-inline: var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-xl` | padding-inline: var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.px-xl-desk` | padding-inline: var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-xl-mob` | padding-inline: var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.px-xs` | padding-inline: var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.px-xs-desk` | padding-inline: var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.px-xs-mob` | padding-inline: var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-0` | padding-block: 0px (literal — ignores the density knobs) |
| `.py-0-desk` | padding-block: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.py-0-mob` | padding-block: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.py-16` | padding-block: 16px (literal — ignores the density knobs) |
| `.py-16-desk` | padding-block: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.py-16-mob` | padding-block: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.py-2xl` | padding-block: var(--space-2xl) × --pad-scale — token-routed, density-aware |
| `.py-2xl-desk` | padding-block: var(--space-2xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-2xl-mob` | padding-block: var(--space-2xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-32` | padding-block: 32px (literal — ignores the density knobs) |
| `.py-32-desk` | padding-block: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.py-32-mob` | padding-block: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.py-3xl` | padding-block: var(--space-3xl) × --pad-scale — token-routed, density-aware |
| `.py-3xl-desk` | padding-block: var(--space-3xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-3xl-mob` | padding-block: var(--space-3xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-4` | padding-block: 4px (literal — ignores the density knobs) |
| `.py-4-desk` | padding-block: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.py-4-mob` | padding-block: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.py-4xl` | padding-block: var(--space-4xl) × --pad-scale — token-routed, density-aware |
| `.py-4xl-desk` | padding-block: var(--space-4xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-4xl-mob` | padding-block: var(--space-4xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-5xl` | padding-block: var(--space-5xl) × --pad-scale — token-routed, density-aware |
| `.py-5xl-desk` | padding-block: var(--space-5xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-5xl-mob` | padding-block: var(--space-5xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-64` | padding-block: 64px (literal — ignores the density knobs) |
| `.py-64-desk` | padding-block: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.py-64-mob` | padding-block: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.py-8` | padding-block: 8px (literal — ignores the density knobs) |
| `.py-8-desk` | padding-block: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.py-8-mob` | padding-block: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.py-bs` | padding-block: var(--space-bs) × --pad-scale — token-routed, density-aware |
| `.py-bs-desk` | padding-block: var(--space-bs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-bs-mob` | padding-block: var(--space-bs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-lg` | padding-block: var(--space-lg) × --pad-scale — token-routed, density-aware |
| `.py-lg-desk` | padding-block: var(--space-lg) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-lg-mob` | padding-block: var(--space-lg) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-md` | padding-block: var(--space-md) × --pad-scale — token-routed, density-aware |
| `.py-md-desk` | padding-block: var(--space-md) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-md-mob` | padding-block: var(--space-md) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-sm` | padding-block: var(--space-sm) × --pad-scale — token-routed, density-aware |
| `.py-sm-desk` | padding-block: var(--space-sm) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-sm-mob` | padding-block: var(--space-sm) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-xl` | padding-block: var(--space-xl) × --pad-scale — token-routed, density-aware |
| `.py-xl-desk` | padding-block: var(--space-xl) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-xl-mob` | padding-block: var(--space-xl) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.py-xs` | padding-block: var(--space-xs) × --pad-scale — token-routed, density-aware |
| `.py-xs-desk` | padding-block: var(--space-xs) × --pad-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.py-xs-mob` | padding-block: var(--space-xs) × --pad-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |

**margins**

_mar/mx/my/mt/mr/mb/ml push content around; the mn* twins are their negative forms (pulls, overlaps, full-bleed escapes). Scale with --gap-scale._

| Name | Meaning |
| --- | --- |
| `.mar-0` | margin (all sides): 0px (literal — ignores the density knobs) |
| `.mar-0-desk` | margin (all sides): 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mar-0-mob` | margin (all sides): 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mar-16` | margin (all sides): 16px (literal — ignores the density knobs) |
| `.mar-16-desk` | margin (all sides): 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mar-16-mob` | margin (all sides): 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mar-2xl` | margin (all sides): var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.mar-2xl-desk` | margin (all sides): var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-2xl-mob` | margin (all sides): var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-32` | margin (all sides): 32px (literal — ignores the density knobs) |
| `.mar-32-desk` | margin (all sides): 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mar-32-mob` | margin (all sides): 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mar-3xl` | margin (all sides): var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.mar-3xl-desk` | margin (all sides): var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-3xl-mob` | margin (all sides): var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-4` | margin (all sides): 4px (literal — ignores the density knobs) |
| `.mar-4-desk` | margin (all sides): 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mar-4-mob` | margin (all sides): 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mar-4xl` | margin (all sides): var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.mar-4xl-desk` | margin (all sides): var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-4xl-mob` | margin (all sides): var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-5xl` | margin (all sides): var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.mar-5xl-desk` | margin (all sides): var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-5xl-mob` | margin (all sides): var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-64` | margin (all sides): 64px (literal — ignores the density knobs) |
| `.mar-64-desk` | margin (all sides): 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mar-64-mob` | margin (all sides): 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mar-8` | margin (all sides): 8px (literal — ignores the density knobs) |
| `.mar-8-desk` | margin (all sides): 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mar-8-mob` | margin (all sides): 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mar-bs` | margin (all sides): var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.mar-bs-desk` | margin (all sides): var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-bs-mob` | margin (all sides): var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-lg` | margin (all sides): var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.mar-lg-desk` | margin (all sides): var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-lg-mob` | margin (all sides): var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-md` | margin (all sides): var(--space-md) × --gap-scale — token-routed, density-aware |
| `.mar-md-desk` | margin (all sides): var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-md-mob` | margin (all sides): var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-sm` | margin (all sides): var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.mar-sm-desk` | margin (all sides): var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-sm-mob` | margin (all sides): var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-xl` | margin (all sides): var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.mar-xl-desk` | margin (all sides): var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-xl-mob` | margin (all sides): var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mar-xs` | margin (all sides): var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.mar-xs-desk` | margin (all sides): var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mar-xs-mob` | margin (all sides): var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-0` | margin-bottom: 0px (literal — ignores the density knobs) |
| `.mb-0-desk` | margin-bottom: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mb-0-mob` | margin-bottom: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mb-16` | margin-bottom: 16px (literal — ignores the density knobs) |
| `.mb-16-desk` | margin-bottom: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mb-16-mob` | margin-bottom: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mb-2xl` | margin-bottom: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.mb-2xl-desk` | margin-bottom: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-2xl-mob` | margin-bottom: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-32` | margin-bottom: 32px (literal — ignores the density knobs) |
| `.mb-32-desk` | margin-bottom: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mb-32-mob` | margin-bottom: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mb-3xl` | margin-bottom: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.mb-3xl-desk` | margin-bottom: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-3xl-mob` | margin-bottom: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-4` | margin-bottom: 4px (literal — ignores the density knobs) |
| `.mb-4-desk` | margin-bottom: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mb-4-mob` | margin-bottom: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mb-4xl` | margin-bottom: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.mb-4xl-desk` | margin-bottom: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-4xl-mob` | margin-bottom: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-5xl` | margin-bottom: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.mb-5xl-desk` | margin-bottom: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-5xl-mob` | margin-bottom: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-64` | margin-bottom: 64px (literal — ignores the density knobs) |
| `.mb-64-desk` | margin-bottom: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mb-64-mob` | margin-bottom: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mb-8` | margin-bottom: 8px (literal — ignores the density knobs) |
| `.mb-8-desk` | margin-bottom: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mb-8-mob` | margin-bottom: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mb-bs` | margin-bottom: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.mb-bs-desk` | margin-bottom: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-bs-mob` | margin-bottom: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-lg` | margin-bottom: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.mb-lg-desk` | margin-bottom: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-lg-mob` | margin-bottom: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-md` | margin-bottom: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.mb-md-desk` | margin-bottom: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-md-mob` | margin-bottom: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-sm` | margin-bottom: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.mb-sm-desk` | margin-bottom: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-sm-mob` | margin-bottom: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-xl` | margin-bottom: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.mb-xl-desk` | margin-bottom: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-xl-mob` | margin-bottom: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mb-xs` | margin-bottom: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.mb-xs-desk` | margin-bottom: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mb-xs-mob` | margin-bottom: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-0` | margin-left: 0px (literal — ignores the density knobs) |
| `.ml-0-desk` | margin-left: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.ml-0-mob` | margin-left: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.ml-16` | margin-left: 16px (literal — ignores the density knobs) |
| `.ml-16-desk` | margin-left: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.ml-16-mob` | margin-left: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.ml-2xl` | margin-left: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.ml-2xl-desk` | margin-left: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-2xl-mob` | margin-left: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-32` | margin-left: 32px (literal — ignores the density knobs) |
| `.ml-32-desk` | margin-left: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.ml-32-mob` | margin-left: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.ml-3xl` | margin-left: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.ml-3xl-desk` | margin-left: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-3xl-mob` | margin-left: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-4` | margin-left: 4px (literal — ignores the density knobs) |
| `.ml-4-desk` | margin-left: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.ml-4-mob` | margin-left: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.ml-4xl` | margin-left: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.ml-4xl-desk` | margin-left: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-4xl-mob` | margin-left: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-5xl` | margin-left: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.ml-5xl-desk` | margin-left: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-5xl-mob` | margin-left: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-64` | margin-left: 64px (literal — ignores the density knobs) |
| `.ml-64-desk` | margin-left: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.ml-64-mob` | margin-left: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.ml-8` | margin-left: 8px (literal — ignores the density knobs) |
| `.ml-8-desk` | margin-left: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.ml-8-mob` | margin-left: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.ml-bs` | margin-left: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.ml-bs-desk` | margin-left: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-bs-mob` | margin-left: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-lg` | margin-left: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.ml-lg-desk` | margin-left: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-lg-mob` | margin-left: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-md` | margin-left: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.ml-md-desk` | margin-left: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-md-mob` | margin-left: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-sm` | margin-left: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.ml-sm-desk` | margin-left: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-sm-mob` | margin-left: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-xl` | margin-left: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.ml-xl-desk` | margin-left: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-xl-mob` | margin-left: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.ml-xs` | margin-left: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.ml-xs-desk` | margin-left: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.ml-xs-mob` | margin-left: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-0` | margin-right: 0px (literal — ignores the density knobs) |
| `.mr-0-desk` | margin-right: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mr-0-mob` | margin-right: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mr-16` | margin-right: 16px (literal — ignores the density knobs) |
| `.mr-16-desk` | margin-right: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mr-16-mob` | margin-right: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mr-2xl` | margin-right: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.mr-2xl-desk` | margin-right: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-2xl-mob` | margin-right: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-32` | margin-right: 32px (literal — ignores the density knobs) |
| `.mr-32-desk` | margin-right: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mr-32-mob` | margin-right: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mr-3xl` | margin-right: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.mr-3xl-desk` | margin-right: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-3xl-mob` | margin-right: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-4` | margin-right: 4px (literal — ignores the density knobs) |
| `.mr-4-desk` | margin-right: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mr-4-mob` | margin-right: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mr-4xl` | margin-right: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.mr-4xl-desk` | margin-right: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-4xl-mob` | margin-right: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-5xl` | margin-right: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.mr-5xl-desk` | margin-right: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-5xl-mob` | margin-right: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-64` | margin-right: 64px (literal — ignores the density knobs) |
| `.mr-64-desk` | margin-right: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mr-64-mob` | margin-right: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mr-8` | margin-right: 8px (literal — ignores the density knobs) |
| `.mr-8-desk` | margin-right: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mr-8-mob` | margin-right: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mr-bs` | margin-right: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.mr-bs-desk` | margin-right: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-bs-mob` | margin-right: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-lg` | margin-right: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.mr-lg-desk` | margin-right: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-lg-mob` | margin-right: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-md` | margin-right: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.mr-md-desk` | margin-right: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-md-mob` | margin-right: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-sm` | margin-right: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.mr-sm-desk` | margin-right: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-sm-mob` | margin-right: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-xl` | margin-right: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.mr-xl-desk` | margin-right: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-xl-mob` | margin-right: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mr-xs` | margin-right: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.mr-xs-desk` | margin-right: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mr-xs-mob` | margin-right: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-0` | margin-top: 0px (literal — ignores the density knobs) |
| `.mt-0-desk` | margin-top: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mt-0-mob` | margin-top: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mt-16` | margin-top: 16px (literal — ignores the density knobs) |
| `.mt-16-desk` | margin-top: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mt-16-mob` | margin-top: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mt-2xl` | margin-top: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.mt-2xl-desk` | margin-top: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-2xl-mob` | margin-top: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-32` | margin-top: 32px (literal — ignores the density knobs) |
| `.mt-32-desk` | margin-top: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mt-32-mob` | margin-top: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mt-3xl` | margin-top: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.mt-3xl-desk` | margin-top: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-3xl-mob` | margin-top: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-4` | margin-top: 4px (literal — ignores the density knobs) |
| `.mt-4-desk` | margin-top: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mt-4-mob` | margin-top: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mt-4xl` | margin-top: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.mt-4xl-desk` | margin-top: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-4xl-mob` | margin-top: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-5xl` | margin-top: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.mt-5xl-desk` | margin-top: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-5xl-mob` | margin-top: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-64` | margin-top: 64px (literal — ignores the density knobs) |
| `.mt-64-desk` | margin-top: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mt-64-mob` | margin-top: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mt-8` | margin-top: 8px (literal — ignores the density knobs) |
| `.mt-8-desk` | margin-top: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mt-8-mob` | margin-top: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mt-bs` | margin-top: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.mt-bs-desk` | margin-top: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-bs-mob` | margin-top: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-lg` | margin-top: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.mt-lg-desk` | margin-top: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-lg-mob` | margin-top: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-md` | margin-top: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.mt-md-desk` | margin-top: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-md-mob` | margin-top: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-sm` | margin-top: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.mt-sm-desk` | margin-top: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-sm-mob` | margin-top: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-xl` | margin-top: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.mt-xl-desk` | margin-top: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-xl-mob` | margin-top: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mt-xs` | margin-top: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.mt-xs-desk` | margin-top: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mt-xs-mob` | margin-top: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-0` | margin-inline: 0px (literal — ignores the density knobs) |
| `.mx-0-desk` | margin-inline: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mx-0-mob` | margin-inline: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mx-16` | margin-inline: 16px (literal — ignores the density knobs) |
| `.mx-16-desk` | margin-inline: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mx-16-mob` | margin-inline: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mx-2xl` | margin-inline: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.mx-2xl-desk` | margin-inline: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-2xl-mob` | margin-inline: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-32` | margin-inline: 32px (literal — ignores the density knobs) |
| `.mx-32-desk` | margin-inline: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mx-32-mob` | margin-inline: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mx-3xl` | margin-inline: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.mx-3xl-desk` | margin-inline: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-3xl-mob` | margin-inline: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-4` | margin-inline: 4px (literal — ignores the density knobs) |
| `.mx-4-desk` | margin-inline: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mx-4-mob` | margin-inline: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mx-4xl` | margin-inline: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.mx-4xl-desk` | margin-inline: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-4xl-mob` | margin-inline: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-5xl` | margin-inline: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.mx-5xl-desk` | margin-inline: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-5xl-mob` | margin-inline: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-64` | margin-inline: 64px (literal — ignores the density knobs) |
| `.mx-64-desk` | margin-inline: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mx-64-mob` | margin-inline: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mx-8` | margin-inline: 8px (literal — ignores the density knobs) |
| `.mx-8-desk` | margin-inline: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.mx-8-mob` | margin-inline: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.mx-bs` | margin-inline: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.mx-bs-desk` | margin-inline: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-bs-mob` | margin-inline: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-lg` | margin-inline: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.mx-lg-desk` | margin-inline: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-lg-mob` | margin-inline: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-md` | margin-inline: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.mx-md-desk` | margin-inline: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-md-mob` | margin-inline: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-sm` | margin-inline: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.mx-sm-desk` | margin-inline: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-sm-mob` | margin-inline: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-xl` | margin-inline: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.mx-xl-desk` | margin-inline: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-xl-mob` | margin-inline: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.mx-xs` | margin-inline: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.mx-xs-desk` | margin-inline: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.mx-xs-mob` | margin-inline: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-0` | margin-block: 0px (literal — ignores the density knobs) |
| `.my-0-desk` | margin-block: 0px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.my-0-mob` | margin-block: 0px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.my-16` | margin-block: 16px (literal — ignores the density knobs) |
| `.my-16-desk` | margin-block: 16px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.my-16-mob` | margin-block: 16px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.my-2xl` | margin-block: var(--space-2xl) × --gap-scale — token-routed, density-aware |
| `.my-2xl-desk` | margin-block: var(--space-2xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-2xl-mob` | margin-block: var(--space-2xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-32` | margin-block: 32px (literal — ignores the density knobs) |
| `.my-32-desk` | margin-block: 32px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.my-32-mob` | margin-block: 32px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.my-3xl` | margin-block: var(--space-3xl) × --gap-scale — token-routed, density-aware |
| `.my-3xl-desk` | margin-block: var(--space-3xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-3xl-mob` | margin-block: var(--space-3xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-4` | margin-block: 4px (literal — ignores the density knobs) |
| `.my-4-desk` | margin-block: 4px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.my-4-mob` | margin-block: 4px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.my-4xl` | margin-block: var(--space-4xl) × --gap-scale — token-routed, density-aware |
| `.my-4xl-desk` | margin-block: var(--space-4xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-4xl-mob` | margin-block: var(--space-4xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-5xl` | margin-block: var(--space-5xl) × --gap-scale — token-routed, density-aware |
| `.my-5xl-desk` | margin-block: var(--space-5xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-5xl-mob` | margin-block: var(--space-5xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-64` | margin-block: 64px (literal — ignores the density knobs) |
| `.my-64-desk` | margin-block: 64px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.my-64-mob` | margin-block: 64px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.my-8` | margin-block: 8px (literal — ignores the density knobs) |
| `.my-8-desk` | margin-block: 8px (literal — ignores the density knobs) — at the desktop breakpoint and up (769px default) |
| `.my-8-mob` | margin-block: 8px (literal — ignores the density knobs) — below the mobile breakpoint (769px default) |
| `.my-bs` | margin-block: var(--space-bs) × --gap-scale — token-routed, density-aware |
| `.my-bs-desk` | margin-block: var(--space-bs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-bs-mob` | margin-block: var(--space-bs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-lg` | margin-block: var(--space-lg) × --gap-scale — token-routed, density-aware |
| `.my-lg-desk` | margin-block: var(--space-lg) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-lg-mob` | margin-block: var(--space-lg) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-md` | margin-block: var(--space-md) × --gap-scale — token-routed, density-aware |
| `.my-md-desk` | margin-block: var(--space-md) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-md-mob` | margin-block: var(--space-md) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-sm` | margin-block: var(--space-sm) × --gap-scale — token-routed, density-aware |
| `.my-sm-desk` | margin-block: var(--space-sm) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-sm-mob` | margin-block: var(--space-sm) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-xl` | margin-block: var(--space-xl) × --gap-scale — token-routed, density-aware |
| `.my-xl-desk` | margin-block: var(--space-xl) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-xl-mob` | margin-block: var(--space-xl) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |
| `.my-xs` | margin-block: var(--space-xs) × --gap-scale — token-routed, density-aware |
| `.my-xs-desk` | margin-block: var(--space-xs) × --gap-scale — token-routed, density-aware — at the desktop breakpoint and up (769px default) |
| `.my-xs-mob` | margin-block: var(--space-xs) × --gap-scale — token-routed, density-aware — below the mobile breakpoint (769px default) |

**radius**

_Channel rungs (radius-md) follow the shape axis — reach for these first; the numeric literals are for exact requirements only._

| Name | Meaning |
| --- | --- |
| `.radius-0` | border-radius: 0px (literal — never rides the shape axis) |
| `.radius-0-desk` | border-radius: 0px (literal — never rides the shape axis) — at the desktop breakpoint and up (769px default) |
| `.radius-0-mob` | border-radius: 0px (literal — never rides the shape axis) — below the mobile breakpoint (769px default) |
| `.radius-16` | border-radius: 16px (literal — never rides the shape axis) |
| `.radius-16-desk` | border-radius: 16px (literal — never rides the shape axis) — at the desktop breakpoint and up (769px default) |
| `.radius-16-mob` | border-radius: 16px (literal — never rides the shape axis) — below the mobile breakpoint (769px default) |
| `.radius-32` | border-radius: 32px (literal — never rides the shape axis) |
| `.radius-32-desk` | border-radius: 32px (literal — never rides the shape axis) — at the desktop breakpoint and up (769px default) |
| `.radius-32-mob` | border-radius: 32px (literal — never rides the shape axis) — below the mobile breakpoint (769px default) |
| `.radius-4` | border-radius: 4px (literal — never rides the shape axis) |
| `.radius-4-desk` | border-radius: 4px (literal — never rides the shape axis) — at the desktop breakpoint and up (769px default) |
| `.radius-4-mob` | border-radius: 4px (literal — never rides the shape axis) — below the mobile breakpoint (769px default) |
| `.radius-8` | border-radius: 8px (literal — never rides the shape axis) |
| `.radius-8-desk` | border-radius: 8px (literal — never rides the shape axis) — at the desktop breakpoint and up (769px default) |
| `.radius-8-mob` | border-radius: 8px (literal — never rides the shape axis) — below the mobile breakpoint (769px default) |
| `.radius-bs` | border-radius: var(--radius-bs) — rides the shape axis (data-shape) |
| `.radius-bs-desk` | border-radius: var(--radius-bs) — rides the shape axis (data-shape) — at the desktop breakpoint and up (769px default) |
| `.radius-bs-mob` | border-radius: var(--radius-bs) — rides the shape axis (data-shape) — below the mobile breakpoint (769px default) |
| `.radius-full` | border-radius: var(--radius-xl) — the full round |
| `.radius-full-desk` | border-radius: var(--radius-xl) — the full round — at the desktop breakpoint and up (769px default) |
| `.radius-full-mob` | border-radius: var(--radius-xl) — the full round — below the mobile breakpoint (769px default) |
| `.radius-lg` | border-radius: var(--radius-lg) — rides the shape axis (data-shape) |
| `.radius-lg-desk` | border-radius: var(--radius-lg) — rides the shape axis (data-shape) — at the desktop breakpoint and up (769px default) |
| `.radius-lg-mob` | border-radius: var(--radius-lg) — rides the shape axis (data-shape) — below the mobile breakpoint (769px default) |
| `.radius-md` | border-radius: var(--radius-md) — rides the shape axis (data-shape) |
| `.radius-md-desk` | border-radius: var(--radius-md) — rides the shape axis (data-shape) — at the desktop breakpoint and up (769px default) |
| `.radius-md-mob` | border-radius: var(--radius-md) — rides the shape axis (data-shape) — below the mobile breakpoint (769px default) |
| `.radius-sm` | border-radius: var(--radius-sm) — rides the shape axis (data-shape) |
| `.radius-sm-desk` | border-radius: var(--radius-sm) — rides the shape axis (data-shape) — at the desktop breakpoint and up (769px default) |
| `.radius-sm-mob` | border-radius: var(--radius-sm) — rides the shape axis (data-shape) — below the mobile breakpoint (769px default) |
| `.radius-xl` | border-radius: var(--radius-xl) — rides the shape axis (data-shape) |
| `.radius-xl-desk` | border-radius: var(--radius-xl) — rides the shape axis (data-shape) — at the desktop breakpoint and up (769px default) |
| `.radius-xl-mob` | border-radius: var(--radius-xl) — rides the shape axis (data-shape) — below the mobile breakpoint (769px default) |

**size (height & width)**

_Fixed px sizes, full-bleed helpers, min- resets for flex/grid shrinking, and viewport-height blocks (hfull-vh-fitted subtracts the chrome)._

| Name | Meaning |
| --- | --- |
| `.full` | width: 100% and height: 100% |
| `.full-desk` | width: 100% and height: 100% — at the desktop breakpoint and up (769px default) |
| `.full-mob` | width: 100% and height: 100% — below the mobile breakpoint (769px default) |
| `.h-0` | height: 0px (literal) |
| `.h-0-desk` | height: 0px (literal) — at the desktop breakpoint and up (769px default) |
| `.h-0-mob` | height: 0px (literal) — below the mobile breakpoint (769px default) |
| `.h-16` | height: 16px (literal) |
| `.h-16-desk` | height: 16px (literal) — at the desktop breakpoint and up (769px default) |
| `.h-16-mob` | height: 16px (literal) — below the mobile breakpoint (769px default) |
| `.h-32` | height: 32px (literal) |
| `.h-32-desk` | height: 32px (literal) — at the desktop breakpoint and up (769px default) |
| `.h-32-mob` | height: 32px (literal) — below the mobile breakpoint (769px default) |
| `.h-4` | height: 4px (literal) |
| `.h-4-desk` | height: 4px (literal) — at the desktop breakpoint and up (769px default) |
| `.h-4-mob` | height: 4px (literal) — below the mobile breakpoint (769px default) |
| `.h-64` | height: 64px (literal) |
| `.h-64-desk` | height: 64px (literal) — at the desktop breakpoint and up (769px default) |
| `.h-64-mob` | height: 64px (literal) — below the mobile breakpoint (769px default) |
| `.h-8` | height: 8px (literal) |
| `.h-8-desk` | height: 8px (literal) — at the desktop breakpoint and up (769px default) |
| `.h-8-mob` | height: 8px (literal) — below the mobile breakpoint (769px default) |
| `.h88-vh` | min-height: 88vh |
| `.hfull` | height: 100% |
| `.hfull-desk` | height: 100% — at the desktop breakpoint and up (769px default) |
| `.hfull-mob` | height: 100% — below the mobile breakpoint (769px default) |
| `.hfull-vh` | min-height: 100vh |
| `.hfull-vh-desk` | min-height: 100vh — at the desktop breakpoint and up (769px default) |
| `.hfull-vh-fitted` | min-height: 100vh minus header/footer chrome — a normal-flow block that fills the screen |
| `.hfull-vh-fitted-desk` | min-height: 100vh minus header/footer chrome — a normal-flow block that fills the screen — at the desktop breakpoint and up (769px default) |
| `.hfull-vh-fitted-mob` | min-height: 100vh minus header/footer chrome — a normal-flow block that fills the screen — below the mobile breakpoint (769px default) |
| `.hfull-vh-mob` | min-height: 100vh — below the mobile breakpoint (769px default) |
| `.min-h0` | min-height: 0 — lets a flex/grid child shrink below content size |
| `.min-w0` | min-width: 0 — lets a flex/grid child shrink below content size |
| `.min0-desk` | min-width: 0 and min-height: 0 — lets a flex/grid child shrink below content size — at the desktop breakpoint and up (769px default) |
| `.min0-mob` | min-width: 0 and min-height: 0 — lets a flex/grid child shrink below content size — below the mobile breakpoint (769px default) |
| `.square-0` | width and height: 0px (literal) |
| `.square-0-desk` | width and height: 0px (literal) — at the desktop breakpoint and up (769px default) |
| `.square-0-mob` | width and height: 0px (literal) — below the mobile breakpoint (769px default) |
| `.square-16` | width and height: 16px (literal) |
| `.square-16-desk` | width and height: 16px (literal) — at the desktop breakpoint and up (769px default) |
| `.square-16-mob` | width and height: 16px (literal) — below the mobile breakpoint (769px default) |
| `.square-32` | width and height: 32px (literal) |
| `.square-32-desk` | width and height: 32px (literal) — at the desktop breakpoint and up (769px default) |
| `.square-32-mob` | width and height: 32px (literal) — below the mobile breakpoint (769px default) |
| `.square-4` | width and height: 4px (literal) |
| `.square-4-desk` | width and height: 4px (literal) — at the desktop breakpoint and up (769px default) |
| `.square-4-mob` | width and height: 4px (literal) — below the mobile breakpoint (769px default) |
| `.square-64` | width and height: 64px (literal) |
| `.square-64-desk` | width and height: 64px (literal) — at the desktop breakpoint and up (769px default) |
| `.square-64-mob` | width and height: 64px (literal) — below the mobile breakpoint (769px default) |
| `.square-8` | width and height: 8px (literal) |
| `.square-8-desk` | width and height: 8px (literal) — at the desktop breakpoint and up (769px default) |
| `.square-8-mob` | width and height: 8px (literal) — below the mobile breakpoint (769px default) |
| `.w-0` | width: 0px (literal) |
| `.w-0-desk` | width: 0px (literal) — at the desktop breakpoint and up (769px default) |
| `.w-0-mob` | width: 0px (literal) — below the mobile breakpoint (769px default) |
| `.w-16` | width: 16px (literal) |
| `.w-16-desk` | width: 16px (literal) — at the desktop breakpoint and up (769px default) |
| `.w-16-mob` | width: 16px (literal) — below the mobile breakpoint (769px default) |
| `.w-32` | width: 32px (literal) |
| `.w-32-desk` | width: 32px (literal) — at the desktop breakpoint and up (769px default) |
| `.w-32-mob` | width: 32px (literal) — below the mobile breakpoint (769px default) |
| `.w-4` | width: 4px (literal) |
| `.w-4-desk` | width: 4px (literal) — at the desktop breakpoint and up (769px default) |
| `.w-4-mob` | width: 4px (literal) — below the mobile breakpoint (769px default) |
| `.w-64` | width: 64px (literal) |
| `.w-64-desk` | width: 64px (literal) — at the desktop breakpoint and up (769px default) |
| `.w-64-mob` | width: 64px (literal) — below the mobile breakpoint (769px default) |
| `.w-8` | width: 8px (literal) |
| `.w-8-desk` | width: 8px (literal) — at the desktop breakpoint and up (769px default) |
| `.w-8-mob` | width: 8px (literal) — below the mobile breakpoint (769px default) |
| `.wfull` | width: 100% |
| `.wfull-desk` | width: 100% — at the desktop breakpoint and up (769px default) |
| `.wfull-mob` | width: 100% — below the mobile breakpoint (769px default) |

---

## 4. containers

`containers.sass`

Containers and the alignment universe. .box / .row / .grid are the three bases; the x*/y* modifiers are NESTED under a base (never standalone) and always physical axes (x = left/right, y = top/bottom — Contract 4), never logical properties.

### Classes (25)

| Name | Meaning |
| --- | --- |
| `.absolute` | position: absolute |
| `.box` | flex column container — pairs with the y*/x* alignment modifiers below |
| `.center` | place-items: center (under .grid) |
| `.fixed` | position: fixed |
| `.grid` | grid container — pairs with the x*/y* alignment modifiers below |
| `.grow` | flex: 1 1 0% — take the remaining space |
| `.relative` | position: relative |
| `.row` | flex row container — pairs with the x*/y* alignment modifiers below |
| `.shrink-0` | flex-shrink: 0 — never shrink below content size |
| `.sticky` | position: sticky |
| `.wrap` | flex-wrap: wrap |
| `.xaround` | space-around along the x axis |
| `.xbetween` | space-between along the x axis |
| `.xcenter` | center along the inline axis (+ text-align under .box/.grid) |
| `.xevenly` | space-evenly along the x axis |
| `.xleft` | align/justify toward the start — physical left, always (Contract 4) |
| `.xright` | align/justify toward the end — physical right, always |
| `.xstretch` | stretch items along the x axis (grid) |
| `.yaround` | space-around along the y axis |
| `.ybetween` | space-between along the y axis |
| `.ybot` | align/justify toward the bottom |
| `.ycenter` | center along the y axis |
| `.yevenly` | space-evenly along the y axis |
| `.ystretch` | stretch items along the y axis (grid) |
| `.ytop` | align/justify toward the top — physical axes, never logical |

---

## 5. layouts

`layouts.sass`

Layout presets. Grids are pure stepping — no default gap, compose one with .gp-* (self-sufficiency: a default gap is an opinion the system does not hold). The gridding golden rules: 3 items → 3→1, 4 or a multiple of 4 → 4→2→1, 6 → 6→3→2→1.

### Classes (18)

| Name | Meaning |
| --- | --- |
| `.auto-grid` | auto-fit flexible tracks — column count negotiates itself |
| `.card-grid` | auto-fit grid of repeatable cards, min track from config |
| `.center-item` | centers a single item on both axes |
| `.content-clamp` | clamps content width to --content-clamp |
| `.frame-1-1` | aspect-ratio media box, 1:1 |
| `.frame-16-9` | aspect-ratio media box, 16:9 |
| `.frame-2-3` | aspect-ratio media box, 2:3 |
| `.frame-3-2` | aspect-ratio media box, 3:2 |
| `.frame-3-4` | aspect-ratio media box, 3:4 |
| `.frame-4-3` | aspect-ratio media box, 4:3 |
| `.frame-9-16` | aspect-ratio media box, 9:16 |
| `.grid-1` | one-column grid |
| `.grid-2` | two-column grid (collapses responsively per the gridding golden rules) |
| `.grid-3` | three-column grid — 3→1, never 2+1 |
| `.grid-4` | four-column grid — 4→2→1, never 3+1 |
| `.grid-6` | six-column grid — 6→3→2→1 |
| `.prose` | the reading measure (≤ --prose-clamp) + typographic rhythm for long-form text |
| `.reel` | scroll-snap filmstrip rail — human-driven horizontal scroll |

---

## 6. shells

`shells.sass`

Canonical markups — every class here implements a registered markup shape (the app-shell frame, role-bound rails, tabs, overlays, accordions). Overlays show via .open and their triggers carry native ARIA. Left rail = nav, right rail = TOC; below their breakpoints they collapse into the drawer and .mobile-toc.

### Classes (44)

| Name | Meaning |
| --- | --- |
| `.accordion` | disclosure group (grid-rows animation, no JS height math) |
| `.accordion-content` | the collapsible region |
| `.accordion-item` | one disclosure entry |
| `.accordion-panel` | inner padding wrapper of the region |
| `.accordion-trigger` | the disclosure button (native aria-expanded) |
| `.active` | state class: the current tab / selected item |
| `.app-footer` | footer band of the app-shell canon |
| `.app-header` | top bar of the app-shell canon (owns --header-height) |
| `.app-main` | the app-shell scroll region between header and footer |
| `.app-shell` | the app frame canon: header + main + footer |
| `.content-section` | full-width page section; the narrow-* modifiers shrink it to a measure |
| `.dialog` | modal overlay — shown via .open |
| `.drawer` | off-canvas overlay panel — shown via .open |
| `.hero` | documented sugar for .box.ycenter + gap-lg + pad-y-xl |
| `.main-section` | flex:1 block content region of the app-shell |
| `.mobile-toc` | <details> TOC dropdown standing in for the right rail below xl |
| `.narrow-full` | content-section modifier: narrow-measure column, centered |
| `.narrow-half` | content-section modifier: ~half-measure column, centered |
| `.narrow-wide` | content-section modifier: wide-measure column, centered |
| `.nav-header` | sticky header link of the app-shell canon (sits at --header-height) |
| `.nav-l1` | nav tree top-level link (also a button for collapsible groups) |
| `.nav-l2` | nav tree second-level link |
| `.nav-label` | flat, non-collapsible nav group label |
| `.navtree` | left-rail navigation tree |
| `.navtree-sub` | nav tree nested subgroup |
| `.navtree-title` | nav tree group title |
| `.null` | content-section modifier: strip the section padding |
| `.open` | state class: shows an overlay (.drawer/.dialog/.popover) or expands an accordion; also resurrects .sidebar-left as a drawer |
| `.page-main` | content column of .page-split (min-width: 0, --page-gutter padding) |
| `.page-shell` | page frame with padding ownership rules — use when chrome is not full-bleed |
| `.page-sidebar` | sticky sidebar column of .page-split (hidden below md) |
| `.page-split` | grid page frame: sticky .page-sidebar beside .page-main, sidebar appears ≥ md |
| `.pop-main` | padding body of a popup page |
| `.pop-shell` | popup-page variant of the frame: 100vh minus header/footer |
| `.popover` | anchored overlay — shown via .open |
| `.sidebar-left` | left rail — nav, visible ≥ lg; below, .open on .app-shell turns it into an off-canvas drawer |
| `.sidebar-right` | right rail — TOC, visible ≥ xl; below, its content lives in .mobile-toc |
| `.tab-list` | tab strip — triggers carry native aria-selected |
| `.tab-trigger` | one tab; current one carries .active |
| `.toc` | right-rail table of contents |
| `.toc-footer` | TOC footer slot |
| `.toc-link` | TOC link |
| `.toc-list` | TOC link list |
| `.toc-title` | TOC heading |

---

## 7. visuals

`visuals.sass`

The dress layer: bare backgrounds (one declaration each), ink, status fills, partition lines, typography, shadows, and small compositions (avatar, kbd, field, switch). All compositions read the --radius-* channels so the shape axis reaches them. Components own their hover states — there is no standalone .hover.

### Classes (86)

| Name | Meaning |
| --- | --- |
| `.avatar` | square-cropped circular image slot sized by --avatar-size |
| `.bb` | partition border on the bottom |
| `.bb-desk` | partition border on the bottom — at the desktop breakpoint and up (769px default) |
| `.bb-mob` | partition border on the bottom — below the mobile breakpoint (769px default) |
| `.bg` | background: var(--bg) — the page background |
| `.bg-danger` | status fill: danger |
| `.bg-info` | status fill: info |
| `.bg-success` | status fill: success — chips and dots |
| `.bg-warning` | status fill: warning |
| `.bl` | partition border on the left |
| `.bl-desk` | partition border on the left — at the desktop breakpoint and up (769px default) |
| `.bl-mob` | partition border on the left — below the mobile breakpoint (769px default) |
| `.bold` | font-weight: 700 |
| `.border` | 1px solid var(--border) on all sides |
| `.border-desk` | 1px solid var(--border) on all sides — at the desktop breakpoint and up (769px default) |
| `.border-mob` | 1px solid var(--border) on all sides — below the mobile breakpoint (769px default) |
| `.border-strong` | 1px solid var(--border-strong) on all sides |
| `.border-subtle` | 1px solid var(--border-subtle) on all sides |
| `.br` | partition border on the right |
| `.br-desk` | partition border on the right — at the desktop breakpoint and up (769px default) |
| `.br-mob` | partition border on the right — below the mobile breakpoint (769px default) |
| `.bt` | partition border on top: 1px solid var(--border) |
| `.bt-desk` | partition border on top: 1px solid var(--border) — at the desktop breakpoint and up (769px default) |
| `.bt-mob` | partition border on top: 1px solid var(--border) — below the mobile breakpoint (769px default) |
| `.canvas` | background: var(--bg-canvas) — the canvas behind everything |
| `.checked` | state class: checked switch |
| `.clamp-1` | clamp to 1 line, then ellipsis |
| `.clamp-2` | clamp to 2 lines, then ellipsis |
| `.clamp-3` | clamp to 3 lines, then ellipsis |
| `.divider` | horizontal rule with breathing room |
| `.field` | form field wrapper: label + control stacked with scale gap |
| `.field-error` | small danger-colored error line |
| `.field-label` | small secondary label |
| `.footer` | background: var(--bg-footer) — the footer band |
| `.hide-desktop` | hidden at the desktop breakpoint and up |
| `.hide-mobile` | hidden below the mobile breakpoint |
| `.italic` | font-style: italic |
| `.kbd` | keyboard-key chip |
| `.mono` | font-family: var(--font-mono) |
| `.only-mobile` | hidden at the desktop breakpoint and up (i.e. only shows on mobile) |
| `.panel` | background: var(--bg-panel) — inset panels |
| `.raised` | background: var(--bg-raised) — cards, chips, poppers |
| `.sans` | font-family: var(--font-sans) |
| `.shadow-bs` | box-shadow: var(--shadow-bs) — the subtle default |
| `.shadow-bs-desk` | box-shadow: var(--shadow-bs) — the subtle default — at the desktop breakpoint and up (769px default) |
| `.shadow-bs-mob` | box-shadow: var(--shadow-bs) — the subtle default — below the mobile breakpoint (769px default) |
| `.shadow-lg` | box-shadow: var(--shadow-lg) — the elevated lift |
| `.shadow-lg-desk` | box-shadow: var(--shadow-lg) — the elevated lift — at the desktop breakpoint and up (769px default) |
| `.shadow-lg-mob` | box-shadow: var(--shadow-lg) — the elevated lift — below the mobile breakpoint (769px default) |
| `.shadow-md` | box-shadow: var(--shadow-md) |
| `.shadow-md-desk` | box-shadow: var(--shadow-md) — at the desktop breakpoint and up (769px default) |
| `.shadow-md-mob` | box-shadow: var(--shadow-md) — below the mobile breakpoint (769px default) |
| `.surface` | background: var(--bg-surface) — one step above the page |
| `.switch-thumb` | toggle knob |
| `.switch-track` | toggle track (aria-checked or .checked flips it) |
| `.ta-c` | text-align: center |
| `.terminal` | background: var(--bg-terminal) — dark code/terminal block |
| `.text-2xl` | font-size: var(--text-2xl), line-height 1.2 |
| `.text-3xl` | font-size: var(--text-3xl), line-height 1.1 |
| `.text-4xl` | font-size: var(--text-4xl), line-height 1.1 |
| `.text-5xl` | font-size: var(--text-5xl), line-height 1.1 |
| `.text-bs` | font-size: var(--text-bs) — the body size |
| `.text-danger` | status ink: danger |
| `.text-info` | status ink: info |
| `.text-inverse` | ink that reads on filled surfaces |
| `.text-lg` | font-size: var(--text-lg) |
| `.text-md` | font-size: var(--text-md) |
| `.text-muted` | muted text ink |
| `.text-primary` | primary text ink |
| `.text-secondary` | secondary text ink |
| `.text-sm` | font-size: var(--text-sm) |
| `.text-success` | status ink: success |
| `.text-theme` | theme-colored ink |
| `.text-theme-hover` | theme-colored ink on hover |
| `.text-warning` | status ink: warning |
| `.text-xl` | font-size: var(--text-xl), line-height 1.2 |
| `.text-xs` | font-size: var(--text-xs) |
| `.truncate` | single-line ellipsis |
| `.tt-c` | text-transform: capitalize |
| `.tt-u` | text-transform: uppercase |
| `.weight-300` | font-weight: 300 |
| `.weight-400` | font-weight: 400 |
| `.weight-500` | font-weight: 500 |
| `.weight-600` | font-weight: 600 |
| `.weight-700` | font-weight: 700 |
| `.weight-800` | font-weight: 800 |

---

## 8. interactions

`interactions.sass`

One shared vocabulary of three ORTHOGONAL axes for every interactive surface: paint (primary/outline/soft/ghost/danger), metrics (sm/bs/lg on the shared control-height channel), corners (round/square/curved). The rungs compose because each is a single self-contained class: "btn primary lg curved". Every rung also ships -mob and -desk bands.

### Classes (38)


**components**

_The interactive roster: btn, link, pill, card, badge. Adding a surface to $interaction-components is the whole of extending it._

| Name | Meaning |
| --- | --- |
| `.badge` | interactive surface base — composes with the paint / size / shape axes |
| `.btn` | interactive surface base — composes with the paint / size / shape axes |
| `.card` | interactive surface base — composes with the paint / size / shape axes |
| `.link` | interactive surface base — composes with the paint / size / shape axes |
| `.pill` | interactive surface base — composes with the paint / size / shape axes |

**variants (paint)**

_Paint rungs. outline and ghost carry an explicit background: none so a rung is authoritative, not merely silent._

| Name | Meaning |
| --- | --- |
| `.ghost` | paint rung: no fill until hover |
| `.ghost-desk` | paint rung: no fill until hover — at the desktop breakpoint and up (769px default) |
| `.ghost-mob` | paint rung: no fill until hover — below the mobile breakpoint (769px default) |
| `.outline` | paint rung: border only, explicit background: none |
| `.outline-desk` | paint rung: border only, explicit background: none — at the desktop breakpoint and up (769px default) |
| `.outline-mob` | paint rung: border only, explicit background: none — below the mobile breakpoint (769px default) |
| `.primary` | paint rung: theme-colored fill |
| `.primary-desk` | paint rung: theme-colored fill — at the desktop breakpoint and up (769px default) |
| `.primary-mob` | paint rung: theme-colored fill — below the mobile breakpoint (769px default) |
| `.soft` | paint rung: soft tinted fill |
| `.soft-desk` | paint rung: soft tinted fill — at the desktop breakpoint and up (769px default) |
| `.soft-mob` | paint rung: soft tinted fill — below the mobile breakpoint (769px default) |

**sizes (metrics)**

_Metric rungs on the shared control-height channel — keeps sm/bs/lg on one baseline across buttons, pills and badges. Padding rides --pad-scale._

| Name | Meaning |
| --- | --- |
| `.bs` | size rung: default metrics on the shared control-height channel |
| `.bs-desk` | size rung: default metrics on the shared control-height channel — at the desktop breakpoint and up (769px default) |
| `.bs-mob` | size rung: default metrics on the shared control-height channel — below the mobile breakpoint (769px default) |
| `.lg` | size rung: large metrics on the shared control-height channel |
| `.lg-desk` | size rung: large metrics on the shared control-height channel — at the desktop breakpoint and up (769px default) |
| `.lg-mob` | size rung: large metrics on the shared control-height channel — below the mobile breakpoint (769px default) |
| `.sm` | size rung: compact metrics on the shared control-height channel |
| `.sm-desk` | size rung: compact metrics on the shared control-height channel — at the desktop breakpoint and up (769px default) |
| `.sm-mob` | size rung: compact metrics on the shared control-height channel — below the mobile breakpoint (769px default) |

**shapes (corners)**

_round and curved read the radius channels (they follow data-shape); square is the literal sharp reset._

| Name | Meaning |
| --- | --- |
| `.curved` | shape rung: curved via the radius channels (follows data-shape) |
| `.curved-desk` | shape rung: curved via the radius channels (follows data-shape) — at the desktop breakpoint and up (769px default) |
| `.curved-mob` | shape rung: curved via the radius channels (follows data-shape) — below the mobile breakpoint (769px default) |
| `.round` | shape rung: full round via the radius channels (follows data-shape) |
| `.round-desk` | shape rung: full round via the radius channels (follows data-shape) — at the desktop breakpoint and up (769px default) |
| `.round-mob` | shape rung: full round via the radius channels (follows data-shape) — below the mobile breakpoint (769px default) |
| `.square` | shape rung: sharp corners (literal reset) |
| `.square-desk` | shape rung: sharp corners (literal reset) — at the desktop breakpoint and up (769px default) |
| `.square-mob` | shape rung: sharp corners (literal reset) — below the mobile breakpoint (769px default) |

**other**

| Name | Meaning |
| --- | --- |
| `.danger` | paint rung: status-colored fill (var(--danger)) |
| `.danger-desk` | paint rung: status-colored fill (var(--danger)) — at the desktop breakpoint and up (769px default) |
| `.danger-mob` | paint rung: status-colored fill (var(--danger)) — below the mobile breakpoint (769px default) |

---

## 9. own

`own.sass`

The sanctioned extension point — classes a project declares for itself. Its contents are per-project and deliberately NOT part of the package API: eject seeds it empty, and this layer is where ft-lint expects your additions. Nothing listed for this layer travels with the package.

---

## 10. modifiers

`modifiers.sass`

The variant axes as pure token remaps (ported from affedo): data-shape / data-radius / .radius-* sets rewrite the radius ladder, data-density / .density-* rewrite space + control heights, data-scale shifts the root font size. Set on <html> for the whole page or any subtree for a scope; every component skin that consumes the rungs follows instantly. Per-component shape/density props are the consumer side of this contract.

### Classes (11)

| Name | Meaning |
| --- | --- |
| `.density-comfort` | density set: airy spacing and control heights (~1.4×); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.density-normal` | density set: the default ladder; set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.density-tight` | density set: compact spacing and control heights (~0.65×); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.radius-modern` | corner-geometry set: modern radii (2–16px); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.radius-pill` | corner-geometry set: everything fully round (9999px); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.radius-round` | corner-geometry set: generous radii (4–36px); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.radius-square` | corner-geometry set: all radii 0 (sharp); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.radius-subtle` | corner-geometry set: gentle radii (1–8px); set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.scale-compact` | font-scale set: 87.5% root font-size; set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.scale-expanded` | font-scale set: 112.5% root font-size; set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |
| `.scale-normal` | font-scale set: 100% root font-size; set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree |

