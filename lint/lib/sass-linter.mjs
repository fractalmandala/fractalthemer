// Sass-declaration linters — the two rules born from the fractalsvelte
// component build, where both failure modes actually shipped once:
//
// 1. ft/sass-interpolation — Sass parses custom-property values LITERALLY.
//    A declaration like `--radius-xs: list.nth($vals, 1)` does not call the
//    function; it emits the source text verbatim into the CSS. Only a value
//    wrapped in `#{…}` is evaluated. The rule flags Sass function calls left
//    outside interpolation in any `--name: value` declaration. It applies
//    EVERYWHERE — including the privileged system layers and _08_own.sass —
//    because a literally-emitted function call is never legitimate.
//
//    CSS pass-through functions are fine un-interpolated (calc(), var(),
//    rgb()/rgba(), min()/max()/clamp(), env(), attr(), url()) — the browser
//    evaluates them; Sass would evaluate nothing different.
//
// 2. ft/hardcoded-radius — consumer skins must shape corners through the
//    radius ladder (`var(--radius-xs…xl)`), never literals. The ladder is
//    what the 09_modifiers shape axis rewrites; a literal border-radius is a
//    corner the shape axis can never reach (and one the density axis cannot
//    scale). Applies to consumer stylesheets only: the system layers
//    legitimately own literal radii (the px ladder in 02_dimensions,
//    `.square`'s 0), and _08_own.sass is the project's sanctioned own.

// Sass-only function calls that would land verbatim inside a custom-property
// value. Namespaced module calls first; then the core/legacy function names
// that have no CSS equivalent. NOT listed: anything CSS evaluates natively.
const SASS_NAMESPACED = /\b(?:map|list|math|color|string|meta|selector|sass)\.[a-z-]+\s*\(/;
const SASS_CORE =
	/\b(?:if|nth|append|join|zip|index|list-separator|is-bracketed|length|set-nth|unit|unitless|percentage|floor|ceil|abs|random|quote|unquote|str-length|str-insert|str-index|str-slice|to-upper-case|to-lower-case|type-of|comparable|call|get-function|inspect|variable-exists|function-exists|global-variable-exists|feature-exists|keywords|mix|lighten|darken|saturate|desaturate|grayscale|invert|opacify|fade-in|transparentize|fade-out|adjust-hue|scale-color|change-color|adjust-color|ie-hex-str|red|green|blue|hue|saturation|lightness|alpha|opacity)\s*\(/;

export function lintUninterpolatedFunctions(relPath, content) {
	const diagnostics = [];
	content.split('\n').forEach((line, idx) => {
		const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '');
		// A custom-property declaration only (the literal-parse bug lives here);
		// ordinary Sass property lines are evaluated by the compiler and safe.
		const decl = cleanLine.match(/(^|\s)(--[a-zA-Z0-9_-]+)\s*:\s*(.+)$/);
		if (!decl) return;

		// Remove `#{…}` regions — everything in there is deliberately
		// interpolated and evaluated by Sass.
		const value = decl[3].replace(/#\{[\s\S]*?\}/g, '');

		const hit = value.match(SASS_NAMESPACED) || value.match(SASS_CORE);
		if (!hit) return;
		diagnostics.push({
			rule: 'ft/sass-interpolation',
			severity: 'error',
			file: relPath,
			line: idx + 1,
			column: line.indexOf(decl[2]) + 1,
			found: `${decl[2]}: ${decl[3].trim()}`,
			rationale:
				'Sass parses custom-property values literally: this function call is NOT evaluated — its source text ships to the browser as the value. Only #{…} interpolation is evaluated inside a custom property.',
			suggestion: `Wrap the function call in interpolation: --${decl[2].slice(2)}: #{${decl[3].trim()}} — or compute the value into a Sass variable first.`
		});
	});
	return diagnostics;
}

// Tokens a border-radius value may legally contain in a consumer skin.
// `0`/`0px` are axis-neutral (sharp corner), `inherit` follows the parent's
// reshaped corner, and var() must point at the radius ladder the shape axis
// actually rewrites.
const RADIUS_OK = /^(?:0(?:px)?|inherit|initial|unset|var\(--radius[^)]*\))$/;

export function lintHardcodedRadius(relPath, content) {
	const diagnostics = [];
	content.split('\n').forEach((line, idx) => {
		const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '');
		const decl = cleanLine.match(/(^|\s)(border-radius)\s*:\s*(.+)$/);
		if (!decl) return;

		const bad = decl[3]
			.replace(/#\{[^}]*\}/g, ' ')
			.trim()
			.split(/\s+/)
			.filter((token) => token && !RADIUS_OK.test(token));
		if (bad.length === 0) return;
		diagnostics.push({
			rule: 'ft/hardcoded-radius',
			severity: 'error',
			file: relPath,
			line: idx + 1,
			column: line.indexOf(decl[2]) + 1,
			found: `border-radius: ${decl[3].trim()}`,
			rationale:
				'Corner literals are unreachable by the shape axis: data-shape/data-radius rewrite the --radius-* ladder, and a literal corner never reads it — the variant cannot restyle this skin.',
			suggestion: `Route the corner through the ladder — var(--radius-xs/sm/md/bs/lg/xl). For a full round use var(--radius-xl) (9999px), not a literal 9999px.`
		});
	});
	return diagnostics;
}
