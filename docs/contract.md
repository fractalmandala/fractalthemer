# The Contract

The rules that make the system behave as one system. They are enforced in
three places: the layer headers (source), `AGENTS.md` (agent prose), and
`ft-lint` (exit codes — see [lint.md](./lint.md)).

## Core ruling

> You cannot add ad-hoc CSS anywhere. Styles are added ONLY inside the
> system's designated files (`src/lib/styles`). No scoped `<style>` blocks
> anywhere, including components. No inline `style=` attributes.

If you find yourself using styling not in the system, either you are being
careless, or the system needs to grow a class — file that as a feature, never
a patch. In consumer projects the sanctioned growth path is `_08_own.sass`.

## Contracts

**Contract 4 — physical axes.** `x`/`y` are physical axes, always. Alignment
and directional classes never flip with writing direction.

**Contract 5 — bare dress before compositions.** Within the visuals layer,
bare skin (single declarations) is emitted before compositions that combine
them, so compositions win by source order, not specificity.

**Contract 7 — three bands.** Every loop-generated class exists in a base
band plus `-mob` (below `$breakpoint`, default 769px) and `-desk` (at or
above). There is no media-query fourth band; responsive selection is a class
choice.

## Golden rules

- **Grids are pure stepping** — no default gap. Compose `.gp-*` explicitly; a
  default gap is an opinion the system does not hold.
- **Alignment classes are nested under their base** — never standalone.
  `.box` owns `.xcenter`, `.xleft`, …
- **No-default-gap self-sufficiency** — a container must look correct with
  nothing but its own classes.
- **Interactive axes compose.** `.btn .primary .lg .curved` — paint, metrics
  and corner are orthogonal single-declaration rungs; a component opts into
  an axis alongside its base class.

## Configuration

Every knob in `_01_config.sass` is `!default`: overridable at compile time,
never edited in place. `!default` means assign-if-undefined — a `@use … with
(…)` sets the value once; without `!default` that configuration would be a
compile error.

The numbered filename is not a valid Sass identifier, so a consumer must
namespace the configuring load:

```sass
@use 'fractalthemer/styles/01_config' as cfg with ($literal-max: 256)
@use 'fractalthemer/styles' as *
```

Configure before anything else loads `01_config`, or Sass rejects it.

Key knobs:

| Knob | Default | Meaning |
| --- | --- | --- |
| `$breakpoint` | `769px` | The `-mob` / `-desk` seam |
| `$literal-fine` | `0 4 8 16 32 64` | The fine px ladder (always emitted) |
| `$literal-step` / `$literal-max` | `64` / `64` | Coarse ladder step and cap; step = max turns the coarse ladder off (guard: Sass `@for` counts *downward* when `from` > `through`) |
| `$literal-space-max` | `64` | Truncation for space families |
| `$literal-radius-max` | `32` | Truncation for radius |
| `$breakpoints` | `sm 640 / md 768 / bs 1024 / lg 1280 / xl 1440` | Layout grid seams |

## The extension contract

Consumer projects extend the system in exactly one place: their own
`_08_own.sass` (by convention `src/lib/styles/_08_own.sass`, overridable via
`--own` on the linter).

- Classes declared there are first-class: the linter allows their use
  everywhere in the project.
- A declared class **must not collide with a registry class name**. Layer 08
  extends the system; it never shadows it — a shadow would silently fork the
  meaning of a system class. This is flagged as `ft/own-conflict`.
- The file is privileged for token purity (its own values are the project's
  sanctioned own), exactly as the system layers are privileged in-repo.
