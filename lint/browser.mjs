// =============================================================================
// browser — `npx fractalthemer browser [dir]`
//
// Opens the class registry as a searchable browser page, so a project that
// consumes fractalthemer from npm (no eject, no dev server) can see what
// classes exist and what each one means. The page is generated on the spot
// from the resolved registry — the project's own first (ejected), the shipped
// package registry as fallback — with the class-vocabulary meanings embedded.
//
// Self-contained vanilla JS with the data inline: written to a temp file and
// opened via file://, no server, no dependencies. --out writes it somewhere
// permanent instead of opening it.
// =============================================================================

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderBrowserHtml } from '../scripts/class-vocab.mjs';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHIPPED_REGISTRY = path.join(PKG_ROOT, 'src', 'lib', 'data', 'registry.json');

function usage() {
	console.log(`Usage:
  fractalthemer browser [dir]     # open the registry browser (default: cwd)
Options:
  --registry <f>  registry.json override
  --out <file>    write the page here instead of opening it`);
}

/** Same preference order as lint consumer mode: own registry first. */
function resolveRegistry(dir, override) {
	if (override) return path.resolve(override);
	const own = path.join(dir, 'src', 'lib', 'data', 'registry.json');
	if (fs.existsSync(own)) return own;
	return SHIPPED_REGISTRY;
}

function openInBrowser(file) {
	const opener =
		process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
	const args = process.platform === 'win32' ? ['/c', 'start', '', file] : [file];
	try {
		execFileSync(opener, args, { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
}

/**
 * @param {string[]} args
 */
export async function runBrowser(args) {
	let out;
	let registryOverride;
	const positional = [];

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--out') out = args[++i];
		else if (args[i] === '--registry') registryOverride = args[++i];
		else if (args[i] === '--help' || args[i] === '-h') {
			usage();
			return;
		} else if (!args[i].startsWith('--')) positional.push(args[i]);
	}

	const dir = path.resolve(positional[0] ?? process.cwd());
	const registryFile = resolveRegistry(dir, registryOverride);

	let registry;
	try {
		registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
	} catch (error) {
		console.error(`[browser] cannot read registry at ${registryFile}: ${error.message}`);
		process.exitCode = 1;
		return;
	}

	const html = renderBrowserHtml(registry, {
		source: path.relative(dir, registryFile) || registryFile
	});

	const target =
		out ?? path.join(os.tmpdir(), `fractalthemer-registry-${process.pid}.html`);
	fs.writeFileSync(target, html, 'utf8');

	if (out) {
		console.log(`[browser] wrote ${target}`);
		return;
	}

	console.log(`[browser] registry: ${registryFile}`);
	console.log(`[browser] page: ${target}`);
	if (!openInBrowser(target)) {
		console.log('[browser] could not open a browser automatically — open the page path above.');
	}
}
