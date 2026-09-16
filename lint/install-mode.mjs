// =============================================================================
// install-mode — the "install the mode toggle" option.
//
//   npx fractalthemer mode [dir]
//
// Copies the complete dark/light mode feature into YOUR project as editable
// source, mirroring the canonical layout so the $lib imports inside the files
// resolve unchanged in any SvelteKit project:
//
//   src/lib/motion/transitions.ts   the View Transitions engine (wipe/slide/
//                                   fade/circle) + easing.ts + transition.css
//   src/lib/state/mode.svelte.ts    the ModeStore (three-state mode, system
//                                   follow, persistence, modeScript for <head>)
//   src/lib/mode/ModeToggle.svelte  the button (toggle() defaults to the wipe)
//   src/lib/icons/Sun|Moon.svelte   the two glyphs it renders
//
// After this the feature is yours to edit — the npm dependency is only needed
// for the styles, not for the toggle. Setup steps are printed at the end and
// documented in the README ("Install the mode toggle").
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// source file (relative to PKG_ROOT) → destination (relative to target).
const FILES = [
	'src/lib/motion/transitions.ts',
	'src/lib/motion/easing.ts',
	'src/lib/motion/transition.css',
	'src/lib/state/mode.svelte.ts',
	'src/lib/mode/ModeToggle.svelte',
	'src/lib/icons/Sun.svelte',
	'src/lib/icons/Moon.svelte'
];

export async function runModeInstall(argv = []) {
	const force = argv.includes('--force');
	const positional = argv.find((a, i) => !a.startsWith('--') && (i === 0 || argv[i - 1] !== '--force'));
	const target = path.resolve(positional || process.cwd());

	const missing = FILES.filter((f) => !fs.existsSync(path.join(PKG_ROOT, f)));
	if (missing.length > 0) {
		console.error(`[mode] missing ${missing.join(', ')} — the package appears incomplete.`);
		process.exit(2);
	}

	console.log(`[mode] target: ${target}`);

	const copied = [];
	const skipped = [];
	for (const file of FILES) {
		const dest = path.join(target, file);
		fs.mkdirSync(path.dirname(dest), { recursive: true });
		if (fs.existsSync(dest) && !force) {
			skipped.push(file);
			continue;
		}
		fs.copyFileSync(path.join(PKG_ROOT, file), dest);
		copied.push(file);
	}

	console.log(`[mode] ${copied.length} file(s) copied, ${skipped.length} already present${skipped.length ? ' (use --force to overwrite)' : ''}`);

	console.log(`
[mode] Done. Wire it up (root layout):

  1. Import the transition reset ONCE — without it the wipe arrives smeared
     with the UA cross-fade (this is the step people miss):

     import '$lib/motion/transition.css';

  2. Stamp the mode before first paint, in <svelte:head>:

     <script lang="ts">
       import { modeScript } from '$lib/state/mode.svelte.js';
     </script>
     <svelte:head>
       {@html \`<script>\${modeScript()}<\\/script>\`}
     </svelte:head>

  3. Drop the button anywhere:

     import ModeToggle from '$lib/mode/ModeToggle.svelte';
     <ModeToggle />

[mode] The toggle defaults to the 520ms wipe (dark falls from the top, light
rises from the bottom). Pass a spec to steer it —
  store.toggle({ kind: 'circle', origin: { x: e.clientX, y: e.clientY } })
— and it falls back to an instant flip under prefers-reduced-motion or where
the View Transitions API is missing. The files are yours to edit.`);
}
