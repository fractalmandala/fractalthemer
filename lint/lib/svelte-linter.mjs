// Svelte contract scanner — the fractalthemer counterpart of affedo's
// scripts/lib/svelte-ast-linter.mjs, reduced to regex scanning so the linter
// stays zero-dependency and can run via `npx` inside consumer projects where
// the Svelte compiler may not be installed. It enforces:
//
//   ft/no-in-component-styles — no scoped <style> block. Styles live in the
//       system layers (or the consumer's _08_own.sass), never in a component.
//   ft/no-inline-styles       — no style="…" attributes. Styling variation is
//       expressed as classes; an inline style is ad-hoc CSS by definition.
//
// plus class harvesting for the registry check (static class="…" values and
// class:name directives; dynamic class={expr} is skipped — document that).

const CLASS_ATTR = /\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
const CLASS_DIRECTIVE = /\sclass:([a-zA-Z0-9_-]+)/g;
const STYLE_BLOCK = /<style[\s>]/;
const STYLE_ATTR = /\sstyle\s*=/;

/**
 * @param {string} relPath
 * @param {string} source File content.
 * @returns {{ diagnostics: Array, classes: Set<string> }}
 */
export function lintSvelteFile(relPath, source) {
	const diagnostics = [];
	const classes = new Set();

	if (STYLE_BLOCK.test(source)) {
		const line = source.slice(0, source.search(STYLE_BLOCK)).split('\n').length;
		diagnostics.push({
			rule: 'ft/no-in-component-styles',
			severity: 'error',
			file: relPath,
			line,
			found: '<style> block detected',
			rationale:
				'Components must remain pure markup & logic. Scoped styles block global theme switching and fragment the single source of styling truth.',
			suggestion:
				'Move the styles into the system (src/lib/styles, single-tab indented SASS) — or, in a consumer project, into your _08_own.sass — and reference them via classes.'
		});
	}

	// Strip <script> content first so a `style =` assignment in code does not
	// read as an attribute. The class harvest keeps script code out too.
	const scriptStart = source.indexOf('<script');
	let markup = source;
	if (scriptStart !== -1) {
		const scriptEnd = source.indexOf('</script>', scriptStart);
		if (scriptEnd !== -1) {
			markup = source.slice(0, scriptStart) + source.slice(scriptEnd + '</script>'.length);
		}
	}

	if (STYLE_ATTR.test(markup)) {
		const match = markup.match(STYLE_ATTR);
		const line = markup.slice(0, match.index).split('\n').length;
		diagnostics.push({
			rule: 'ft/no-inline-styles',
			severity: 'error',
			file: relPath,
			line,
			found: match[0].trim(),
			rationale:
				'Inline styles are ad-hoc CSS: invisible to the registry, unreachable by themes, and unaccountable to the system.',
			suggestion:
				'Express the intent as a system class. If no class covers it, extend the system (or your _08_own.sass) instead of patching the element.'
		});
	}

	for (const m of markup.matchAll(CLASS_ATTR)) {
		const value = m[1] ?? m[2] ?? '';
		for (const name of value.split(/\s+/)) {
			// Skip interpolated fragments (class="x {expr} y") — dynamic parts
			// cannot be statically verified.
			if (name && !/[{()}]/.test(name)) classes.add(name);
		}
	}
	for (const m of markup.matchAll(CLASS_DIRECTIVE)) {
		classes.add(m[1]);
	}

	return { diagnostics, classes };
}
