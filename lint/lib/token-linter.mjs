// Token-purity linter — ported from affedo scripts/lib/token-linter.mjs and
// INVERTED for the fractalthemer boundary.
//
// In affedo the linted files are generated consumers of a token contract; here
// the styles system IS the contract, so the privileged files (the layer
// partials, the consumer's own _08_own.sass) are exempt and the rules bite on
// everything else: raw hex, the >2px budget, and var() uses that resolve to
// neither a registry token nor a custom property defined in the scanned
// project. The reference table is NOT a createui.json — it is registry.json
// (kind: token) unioned with locally-defined custom properties.

import { findClosestMatches } from './fuzzy.mjs';

const PX_BUDGET = 2; // 1–2px stays legal: borders, outlines, hairlines.

export class TokenLinter {
	/**
	 * @param {string} rootDir Directory diagnostics are reported relative to.
	 * @param {{ tokens: Set<string> }} opts Registry tokens (e.g. "--bg").
	 */
	constructor(rootDir, opts) {
		this.rootDir = rootDir;
		this.validTokens = new Set(opts.tokens);
	}

	/**
	 * Scan one stylesheet (SASS or CSS). `relPath` is used as reported.
	 * Lines containing `//` comments are stripped first (SASS style).
	 */
	lintFile(relPath, content) {
		const diagnostics = [];
		const lines = content.split('\n');

		lines.forEach((line, idx) => {
			const lineNum = idx + 1;
			const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '').trim();
			if (!cleanLine) return;

			// Rule 1: no raw hex. All color flows through tokens — that is what
			// makes light/dark and every theme reach everything.
			for (const m of cleanLine.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
				diagnostics.push({
					rule: 'ft/token-purity',
					severity: 'error',
					file: relPath,
					line: lineNum,
					column: m.index + 1,
					found: m[0],
					rationale:
						'Raw hex colors bypass theming. Every color must resolve through a system token (var(--bg), var(--text-primary), …) so light/dark and all themes reach it.',
					suggestion: `Replace "${m[0]}" with the semantic color token it expresses, or request the token as a system feature.`
				});
			}

			// Rule 2: the px budget. Values >2px must come from the dimension
			// ladder or a token; arbitrary pixels break density and the scale.
			for (const m of cleanLine.matchAll(/(?<![0-9a-zA-Z_.-])(-?\d+)px\b/g)) {
				const px = parseInt(m[1], 10);
				if (Math.abs(px) <= PX_BUDGET) continue;
				diagnostics.push({
					rule: 'ft/token-purity',
					severity: 'error',
					file: relPath,
					line: lineNum,
					column: m.index + 1,
					found: m[0],
					rationale:
						'Arbitrary pixel dimensions bypass the dimension ladder and the token scale. Only 1–2px (borders, outlines, hairlines) may be literal.',
					suggestion: `Replace "${m[0]}" with the nearest system class (e.g. .gap-16, .pad-sm, .w-64) or a spacing/radius token.`
				});
			}

			// Rule 3: unmapped variables. A var() must resolve to a registry
			// token or to a custom property defined somewhere in the scanned
			// project (locally-defined names were collected by the caller).
			for (const vm of cleanLine.matchAll(/var\((--[a-zA-Z0-9_-]+)/g)) {
				const varName = vm[1];
				if (this.validTokens.has(varName)) continue;
				const closest = findClosestMatches(varName, this.validTokens, 3, 5);
				const suggestion =
					closest.length > 0
						? `Did you mean one of these?\n  - ${closest.map((t) => `var(${t})`).join('\n  - ')}`
						: `Token "${varName}" is not in the system contract. Use an existing token, define the property in _08_own.sass, or request it as a system feature.`;
				diagnostics.push({
					rule: 'ft/token-purity',
					severity: 'error',
					file: relPath,
					line: lineNum,
					column: vm.index + 1,
					found: vm[0],
					rationale: `The custom property "${varName}" resolves to nothing the system defines.`,
					suggestion
				});
			}
		});

		return diagnostics;
	}

	/** Collect custom property definitions so Rule 3 knows what is local. */
	static collectDefinedProps(content, into) {
		for (const m of content.matchAll(/(^|[\s;{])(--[a-zA-Z0-9_-]+)\s*:/g)) {
			into.add(m[2]);
		}
		return into;
	}
}
