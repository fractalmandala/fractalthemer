// =============================================================================
// eject — the "own the files" install option.
//
// Two ways to consume fractalthemer:
//
//   install and use   — import 'fractalthemer/styles'; upgrades track npm.
//   eject             — npx fractalthemer eject copies every styles layer +
//                       the palette modules + the registry builder into YOUR
//                       project. The files become yours: edit any layer,
//                       flip the !default knobs in place, no `@use with`.
//
// Ejection copies:
//   dist/styles/*.sass      → <target>/src/lib/styles/
//   dist/palette/*.sass     → <target>/src/lib/palette/
//   scripts/build-registry.mjs → <target>/scripts/
//
// and seeds an EMPTY _08_own.sass — layer 08 is project-local by definition,
// so the system's own copy is deliberately NOT copied (it carries this
// repo's personal classes). If the target already has one, it is left alone.
//
// The copied build-registry.mjs lets the ejected project generate its OWN
// registry.json (needs `sass` installed), which keeps ft-lint fully
// enforcing the contract against their edited copy:
//
//   node scripts/build-registry.mjs
//   npx fractalthemer lint src/
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function copySassFiles(srcDir, destDir, { skip = [], force = false } = {}) {
	const copied = [];
	const skipped = [];
	fs.mkdirSync(destDir, { recursive: true });

	for (const name of fs.readdirSync(srcDir)) {
		if (!name.endsWith('.sass') || skip.includes(name)) continue;
		const dest = path.join(destDir, name);
		if (fs.existsSync(dest) && !force) {
			skipped.push(path.relative(process.cwd(), dest));
			continue;
		}
		fs.copyFileSync(path.join(srcDir, name), dest);
		copied.push(path.relative(process.cwd(), dest));
	}

	return { copied, skipped };
}

const OWN_HEADER = `// 08_own — your project's extension layer.
// Classes here are first-class: the linter allows their use everywhere in
// this project. They must NOT shadow a fractalthemer class name.
`;

export async function runEject(argv = []) {
	const force = argv.includes('--force');
	const positional = argv.find((a, i) => !a.startsWith('--') && (i === 0 || argv[i - 1] !== '--force'));
	const target = path.resolve(positional || process.cwd());

	const srcStyles = path.join(PKG_ROOT, 'dist', 'styles');
	const srcPalette = path.join(PKG_ROOT, 'dist', 'palette');
	const srcRegistryScript = path.join(PKG_ROOT, 'scripts', 'build-registry.mjs');
	const srcVocabScript = path.join(PKG_ROOT, 'scripts', 'class-vocab.mjs');

	for (const required of [srcStyles, srcPalette, srcRegistryScript, srcVocabScript]) {
		if (!fs.existsSync(required)) {
			console.error(`[eject] missing ${required} — the package appears incomplete.`);
			process.exit(2);
		}
	}

	console.log(`[eject] target: ${target}`);

	const styles = copySassFiles(srcStyles, path.join(target, 'src', 'lib', 'styles'), {
		skip: ['_08_own.sass'],
		force
	});
	const palette = copySassFiles(srcPalette, path.join(target, 'src', 'lib', 'palette'), { force });

	// Layer 08 — seed only if the target has none.
	const ownPath = path.join(target, 'src', 'lib', 'styles', '_08_own.sass');
	let ownAction = 'kept existing';
	if (!fs.existsSync(ownPath)) {
		fs.writeFileSync(ownPath, OWN_HEADER, 'utf8');
		ownAction = 'seeded empty';
	}

	// The registry builder — the ejected project's own source of truth.
	const scriptsDir = path.join(target, 'scripts');
	fs.mkdirSync(scriptsDir, { recursive: true });
	const registryDest = path.join(scriptsDir, 'build-registry.mjs');
	let registryAction = 'kept existing';
	if (!fs.existsSync(registryDest) || force) {
		fs.copyFileSync(srcRegistryScript, registryDest);
		registryAction = 'copied';
	}
	// build-registry imports class-vocab (the meanings) — it must travel too.
	const vocabDest = path.join(scriptsDir, 'class-vocab.mjs');
	let vocabAction = 'kept existing';
	if (!fs.existsSync(vocabDest) || force) {
		fs.copyFileSync(srcVocabScript, vocabDest);
		vocabAction = 'copied';
	}
	fs.mkdirSync(path.join(target, 'src', 'lib', 'data'), { recursive: true });

	console.log(`[eject] styles: ${styles.copied.length} file(s) copied, ${styles.skipped.length} already present`);
	console.log(`[eject] palette: ${palette.copied.length} file(s) copied, ${palette.skipped.length} already present`);
	console.log(`[eject] _08_own.sass: ${ownAction}`);
	console.log(`[eject] scripts/build-registry.mjs: ${registryAction}`);
	console.log(`[eject] scripts/class-vocab.mjs: ${vocabAction}`);

	// If sass is already installed, generate their registry immediately.
	if (fs.existsSync(path.join(target, 'node_modules', 'sass'))) {
		try {
			execFileSync('node', ['scripts/build-registry.mjs'], { cwd: target, stdio: 'inherit' });
			console.log('[eject] registry.json generated.');
		} catch {
			console.log('[eject] registry build failed — run "node scripts/build-registry.mjs" manually.');
		}
	} else {
		console.log('[eject] next: install sass, then run "node scripts/build-registry.mjs"');
	}

	console.log(`
[eject] Done. The styles are yours now:
  - import them relatively, e.g. import './lib/styles/index.sass'
  - configure the !default knobs by editing _01_config.sass in place
  - regenerate your registry after edits: node scripts/build-registry.mjs
    (also writes src/lib/data/registry.api.md — the human-readable class API)
  - lint against it:                       npx fractalthemer lint src/
  - browse the classes:                    npx fractalthemer browser`);
}
