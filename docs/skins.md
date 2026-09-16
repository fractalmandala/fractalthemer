# The skin contract

How a component skin (a consumer-side stylesheet that dresses a component —
`.fs-button`, `.fs-card`, …) attaches to the system so the variant axes reach
every corner of it. The reference implementation is the fractalsvelte
component library; every rule below was validated across its 39 skins.

Enforcement lives in `ft-lint` (see [lint.md](./lint.md)) and in the extension
contract ([contract.md](./contract.md)).

## Rules

1. **Tokens only.** Every color, space and size resolves through the
   `--*` tokens. A skin that hardcodes a value is a fork of the theme —
   light/dark, every aura, and both variant axes stop reaching it.
   (`ft/token-purity` in consumer mode.)
2. **Corners ride the radius ladder.** `border-radius` consumes
   `var(--radius-xs…xl)` — never literals. The shape axis
   (`data-shape` / `data-radius`, written by `_09_modifiers.sass`) rewrites
   exactly those rungs; a literal corner is unreachable by the axis. `0`
   (sharp), `inherit` and full-round `var(--radius-xl)` are the axis-neutral
   escapes. (`ft/hardcoded-radius`.)
3. **Interpolate Sass calls inside custom properties.** Sass parses
   custom-property values literally: `--radius-xs: list.nth($vals, 1)` ships
   the source text to the browser. Only `#{…}` is evaluated.
   (`ft/sass-interpolation` — bites everywhere, privileged files included.)
4. **Variant axes come from `_09_modifiers.sass`, not the skin.** For the
   per-instance shape/density props, the skin emits `data-shape` /
   `data-density` on the component root and scopes the shared mixins — it
   never re-declares the value tables:

   ```sass
   @use '09_modifiers' as *

   .fs-button
       // …the skin's own declarations, all token-routed…
       @each $s in $shape-sets
           &[data-shape='#{$s}']
               +shape-tokens($s)
       @each $d in $density-sets
           &[data-density='#{$d}']
               +density-tokens($d)
   ```

   A base that consumes no radius channel (square by design) wires its corner
   under the shape scope so the axis reaches it; the unset look stays
   unchanged. Page-level attributes on an ancestor propagate through
   custom-property inheritance automatically for token-consuming skins.
5. **Density coexists with the utility knobs.** The density sets rewrite the
   `--space-*` rungs and `--control-h-*` directly; the `--gap-scale` /
   `--pad-scale` utility knobs in `_02_dimensions.sass` stay untouched and
   ride on top.

## What the system owes the skin

The contract is not one-sided. A skin may assume:

- the six `--radius-*` rungs and the space/control ladders exist in every
  theme and mode;
- `_09_modifiers.sass` exports `$shape-sets`, `$density-sets`,
  `+shape-tokens()` and `+density-tokens()` as the single source of truth —
  value tables are never duplicated skin-side;
- registry classes and tokens are inventory-complete (the registry build
  scans the layers; a missing entry is a system bug, not a skin problem).

## Status

implemented — pending user evaluation
