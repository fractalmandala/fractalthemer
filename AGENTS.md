# AGENTS

> You cannot add ad-hoc CSS anywhere. Styles are added ONLY inside the
> system's designated files `src/lib/styles`. No scoped `<style>` blocks
> anywhere, including components. No inline `style=` attributes.

This is enforced, not advisory: `pnpm lint` (ft-lint) fails on scoped styles,
inline styles, classes outside the registry, and registry staleness. In
consumer projects the same rules ship as `npx fractalthemer lint src/`.

## Engines — one each

- **Mode**: `src/lib/state/mode.svelte.ts` (`mode()` store). Animated
  `toggle()`/`set(spec)` — do not wire ad-hoc transitions around mode flips.
- **Transitions**: `src/lib/motion/transitions.ts` (`transition()`), with
  `transition.css` imported once in the root layout.

There is no second copy of either concern. The preset-axes runtime
(`stylepresets`) is gone — variant axes belong to generation pipelines
(affedo recipes), not here.

## Extension point

Project-local classes go in `src/lib/styles/_08_own.sass` — and must not
collide with a registry class name (`ft/own-conflict`). If a needed behavior
is missing from the system, either extend `_08_own` or propose a system
class; never patch with inline styles.

## Registry

`src/lib/data/registry.json` is generated — never hand-edit. If `pnpm lint`
reports `ft/registry-stale`, run `pnpm registry` and commit the diff.

## Dev Servers

Always first check with user if they have dev server active, before starting
your own. If they do, use that. Always kill servers that you have started,
when done. Do not leave them running background.

## References

- [docs/architecture.md](./docs/architecture.md) — layer map and engines
- [docs/contract.md](./docs/contract.md) — the rules and configuration knobs
- [docs/registry.md](./docs/registry.md) — the registry and its build
- [docs/lint.md](./docs/lint.md) — linter rules, modes, allowlists
