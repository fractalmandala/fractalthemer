# The Registry

`src/lib/data/registry.json` is the **generated** complete inventory of what
the styles system emits. It is the reference table for the linter and the
data behind the registry browser on `/`.

**Never hand-edit it.**

```sh
pnpm registry   # regenerate on demand
```

## How it is built

`scripts/build-registry.mjs` uses **provenance by per-layer standalone
compile**. Sass will not report which source file emitted a rule, and
hand-written markers drift. Instead, each layer partial is compiled on its
own and its output harvested: every layer only `@use`s config/vocab/tokens
modules (which emit no selectors), so a layer compiled alone yields exactly
its own output. If a layer ever `@use`s another class-emitting layer,
ownership falls to whichever comes first in `index.sass` order (the ownership
pass in `buildRegistry`).

The Vite plugin in `vite.config.ts` regenerates on `buildStart` and whenever
anything under `src/lib/styles` changes — the browser page is live while you
work. The script skips writing when the payload is unchanged ("already
fresh, nothing written"), which `ft-lint` uses as its freshness check.

## Shape

```jsonc
{
  "generatedAt": "…",
  "totals": { "class": 1134, "token": 70, "element": 18, "keyframes": 0 },
  "layers": [
    {
      "id": "02_dimensions",
      "label": "dimensions",
      "file": "02_dimensions",
      "order": 2,
      "items": [
        { "name": ".gp-32", "kind": "class", "group": "gaps" }
      ],
      "groups": [ { "id": "gaps", "label": "Gaps" } ]
    }
  ]
}
```

- `kind` is one of `class | token | element | keyframes`.
- Class `name`s carry the leading dot; tokens do not (`--bg`).
- A layer can declare a sub-taxonomy (dimensions splits into gaps, pads,
  margins, radius, size, other) via `TAXONOMIES` in
  `scripts/build-registry.mjs`; buckets a layer does not fill are dropped,
  not shown empty.

## The browser page

`/` (the dev server's `+page.svelte`) renders the registry: the dimensions
rack pinned in the sidebar, section-wise (gaps / pads / margins / radius /
size / other); every other layer as filterable cards in the main section,
with Layer and Family filters.
