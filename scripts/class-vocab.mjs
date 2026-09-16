// =============================================================================
// class-vocab — turns the registry inventory into a readable class API.
//
// The registry knows WHAT exists (name, kind, layer); this module knows what
// each entry MEANS. Two sources, by design:
//
//   1. Decoders — mechanical, derived from the generator loops in the layers
//      (configvocab.sass, _02_dimensions' ladders, _07's axes). Every generated
//      class decodes; a new family is visible the moment the registry sees it.
//   2. Curated intros — one paragraph per layer and per family group, written
//      from the layer headers, explaining intent (when to reach for what).
//
// Consumers:
//   scripts/build-registry.mjs  → emits src/lib/data/registry.api.md
//   lint/cli.mjs `browser`      → emits the standalone registry browser page
//
// Zero dependencies, no Sass — it reads the finished registry.
// =============================================================================

/** Step rungs of the numeric scale (configvocab.sass $steps). */
const STEPS = new Set(['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']);

/** Radius channel rungs ride the shape axis; literals do not. */
const RADIUS_STEPS = new Set(['xs', 'sm', 'md', 'bs', 'lg', 'xl']);

/** @type {Record<string, string>} Space families → CSS property. Gaps/margins scale with --gap-scale (content spacing); pads with --pad-scale (container breathing). */
const GAP_PROPS = { gp: 'gap (both axes)', rgp: 'row-gap', cgp: 'column-gap' };
/** @type {Record<string, string>} */
const PAD_PROPS = {
	pad: 'padding (all sides)',
	px: 'padding-inline',
	py: 'padding-block',
	pt: 'padding-top',
	pr: 'padding-right',
	pb: 'padding-bottom',
	pl: 'padding-left'
};
/** @type {Record<string, string>} */
const MAR_PROPS = {
	mar: 'margin (all sides)',
	mx: 'margin-inline',
	my: 'margin-block',
	mt: 'margin-top',
	mr: 'margin-right',
	mb: 'margin-bottom',
	ml: 'margin-left'
};
/** @type {Record<string, string>} */
const NEG_MAR_PROPS = {
	mn: 'negative margin (all sides)',
	mnx: 'negative margin-inline',
	mny: 'negative margin-block',
	mnt: 'negative margin-top',
	mnr: 'negative margin-right',
	mnb: 'negative margin-bottom',
	mnl: 'negative margin-left'
};

/** @type {Record<string, string>} */
const BAND_NOTE = {
	mob: ' — below the mobile breakpoint (769px default)',
	desk: ' — at the desktop breakpoint and up (769px default)'
};

/**
 * Split a trailing responsive band (-mob / -desk, Contract 7) off a bare name.
 *
 * @param {string} bare class name without the leading dot
 * @returns {[string, string]} [name without band, band note or '']
 */
function splitBand(bare) {
	for (const [mode, note] of Object.entries(BAND_NOTE)) {
		if (bare.endsWith(`-${mode}`)) return [bare.slice(0, -(mode.length + 1)), note];
	}
	return [bare, ''];
}

/** Value → phrase for a space family rung.
 *
 * @param {string} value
 * @param {string} scale
 */
function spaceValue(value, scale) {
	if (/^\d+$/.test(value)) return `${value}px (literal — ignores the density knobs)`;
	if (STEPS.has(value)) return `var(--space-${value}) × --${scale} — token-routed, density-aware`;
	return value;
}

/** Longest-match family lookup (mx must not shadow mnx).
 *
 * @param {string} bare
 * @param {Record<string, string>} table
 * @returns {[string, string] | [null, string]} [family, remainder]
 */
function matchFamily(bare, table) {
	const names = Object.keys(table).sort((a, b) => b.length - a.length);
	for (const family of names) {
		if (bare === family) return [family, ''];
		if (bare.startsWith(`${family}-`)) return [family, bare.slice(family.length + 1)];
	}
	return [null, ''];
}

// --- Per-layer decoders ------------------------------------------------------

/** @type {Record<string, (bare: string) => string | undefined>} */
const DECODERS = {
	'02_dimensions'(bare) {
		const [name, band] = splitBand(bare);

		// Radius: literal ladder, the channel rungs, and .radius-full.
		if (name === 'radius-full') return `border-radius: var(--radius-xl) — the full round${band}`;
		if (name.startsWith('radius-')) {
			const value = name.slice('radius-'.length);
			if (RADIUS_STEPS.has(value))
				return `border-radius: var(--radius-${value}) — rides the shape axis (data-shape)${band}`;
			if (/^\d+$/.test(value)) return `border-radius: ${value}px (literal — never rides the shape axis)${band}`;
			return;
		}

		// Size: px ladder, full-bleed, min- resets, viewport heights.
		/** @type {Record<string, string>} */
		const sizeValueless = {
			wfull: 'width: 100%',
			hfull: 'height: 100%',
			full: 'width: 100% and height: 100%',
			'min-h0': 'min-height: 0 — lets a flex/grid child shrink below content size',
			'min-w0': 'min-width: 0 — lets a flex/grid child shrink below content size',
			min0: 'min-width: 0 and min-height: 0 — lets a flex/grid child shrink below content size',
			'hfull-vh': 'min-height: 100vh',
			'hfull-vh-fitted':
				'min-height: 100vh minus header/footer chrome — a normal-flow block that fills the screen',
			'h88-vh': 'min-height: 88vh'
		};
		if (sizeValueless[name]) return `${sizeValueless[name]}${band}`;
		for (const [family, phrase] of [
			['w', 'width'],
			['h', 'height'],
			['square', 'width and height']
		]) {
			if (name.startsWith(`${family}-`) && /^\d+$/.test(name.slice(family.length + 1)))
				return `${phrase}: ${name.slice(family.length + 1)}px (literal)${band}`;
		}

		// Space families: gaps, pads, margins, negative margins.
		/** @type {[Record<string, string>, string][]} */
		const spaceTables = [
			[GAP_PROPS, 'gap-scale'],
			[PAD_PROPS, 'pad-scale'],
			[MAR_PROPS, 'gap-scale'],
			[NEG_MAR_PROPS, 'gap-scale']
		];
		for (const [table, scale] of spaceTables) {
			const [family, value] = matchFamily(name, table);
			if (family) return `${table[family]}: ${spaceValue(value, scale)}${band}`;
		}
		return;
	},

	'07_interactions'(bare) {
		const [name, band] = splitBand(bare);
		const [family, value] = matchFamily(name, {
			btn: 'interactive surface base',
			link: 'interactive surface base',
			pill: 'interactive surface base',
			card: 'interactive surface base',
			badge: 'interactive surface base'
		});
		if (family && !value)
			return `interactive surface base — composes with the paint / size / shape axes${band}`;
		if (!value) {
			/** @type {Record<string, string>} */
			const axes = {
				primary: 'paint rung: theme-colored fill',
				outline: 'paint rung: border only, explicit background: none',
				soft: 'paint rung: soft tinted fill',
				ghost: 'paint rung: no fill until hover',
				danger: 'paint rung: status-colored fill (var(--danger))',
				sm: 'size rung: compact metrics on the shared control-height channel',
				bs: 'size rung: default metrics on the shared control-height channel',
				lg: 'size rung: large metrics on the shared control-height channel',
				round: 'shape rung: full round via the radius channels (follows data-shape)',
				curved: 'shape rung: curved via the radius channels (follows data-shape)',
				square: 'shape rung: sharp corners (literal reset)'
			};
			if (axes[name]) return `${axes[name]}${band}`;
		}
		return;
	},

	'09_modifiers'(bare) {
		/** @type {Record<string, string>} */
		const sets = {
			'radius-square': 'corner-geometry set: all radii 0 (sharp)',
			'radius-subtle': 'corner-geometry set: gentle radii (1–8px)',
			'radius-modern': 'corner-geometry set: modern radii (2–16px)',
			'radius-round': 'corner-geometry set: generous radii (4–36px)',
			'radius-pill': 'corner-geometry set: everything fully round (9999px)',
			'density-tight': 'density set: compact spacing and control heights (~0.65×)',
			'density-normal': 'density set: the default ladder',
			'density-comfort': 'density set: airy spacing and control heights (~1.4×)',
			'scale-compact': 'font-scale set: 87.5% root font-size',
			'scale-normal': 'font-scale set: 100% root font-size',
			'scale-expanded': 'font-scale set: 112.5% root font-size'
		};
		if (sets[bare]) return `${sets[bare]}; set it (or the data-shape/data-density/data-scale attribute) on <html> or any subtree`;
		return;
	}
};

// --- Curated dictionaries ----------------------------------------------------

/** @type {Record<string, string>} */
const CONTAINER_CLASSES = {
	box: 'flex column container — pairs with the y*/x* alignment modifiers below',
	row: 'flex row container — pairs with the x*/y* alignment modifiers below',
	grid: 'grid container — pairs with the x*/y* alignment modifiers below',
	wrap: 'flex-wrap: wrap',
	grow: 'flex: 1 1 0% — take the remaining space',
	'shrink-0': 'flex-shrink: 0 — never shrink below content size',
	relative: 'position: relative',
	absolute: 'position: absolute',
	fixed: 'position: fixed',
	sticky: 'position: sticky',
	center: 'place-items: center (under .grid)',
	xleft: 'align/justify toward the start — physical left, always (Contract 4)',
	xcenter: 'center along the inline axis (+ text-align under .box/.grid)',
	xright: 'align/justify toward the end — physical right, always',
	xbetween: 'space-between along the x axis',
	xevenly: 'space-evenly along the x axis',
	xaround: 'space-around along the x axis',
	xstretch: 'stretch items along the x axis (grid)',
	ytop: 'align/justify toward the top — physical axes, never logical',
	ycenter: 'center along the y axis',
	ybot: 'align/justify toward the bottom',
	ybetween: 'space-between along the y axis',
	yevenly: 'space-evenly along the y axis',
	yaround: 'space-around along the y axis',
	ystretch: 'stretch items along the y axis (grid)'
};

/** @type {Record<string, string>} */
const LAYOUT_CLASSES = {
	'grid-1': 'one-column grid',
	'grid-2': 'two-column grid (collapses responsively per the gridding golden rules)',
	'grid-3': 'three-column grid — 3→1, never 2+1',
	'grid-4': 'four-column grid — 4→2→1, never 3+1',
	'grid-6': 'six-column grid — 6→3→2→1',
	'card-grid': 'auto-fit grid of repeatable cards, min track from config',
	'auto-grid': 'auto-fit flexible tracks — column count negotiates itself',
	prose: 'the reading measure (≤ --prose-clamp) + typographic rhythm for long-form text',
	'content-clamp': 'clamps content width to --content-clamp',
	'frame-1-1': 'aspect-ratio media box, 1:1',
	'frame-16-9': 'aspect-ratio media box, 16:9',
	'frame-2-3': 'aspect-ratio media box, 2:3',
	'frame-3-2': 'aspect-ratio media box, 3:2',
	'frame-3-4': 'aspect-ratio media box, 3:4',
	'frame-4-3': 'aspect-ratio media box, 4:3',
	'frame-9-16': 'aspect-ratio media box, 9:16',
	reel: 'scroll-snap filmstrip rail — human-driven horizontal scroll',
	'center-item': 'centers a single item on both axes'
};

/** @type {Record<string, string>} */
const SHELL_CLASSES = {
	'app-shell': 'the app frame canon: header + main + footer',
	'app-header': 'top bar of the app-shell canon (owns --header-height)',
	'app-main': 'the app-shell scroll region between header and footer',
	'app-footer': 'footer band of the app-shell canon',
	'pop-shell': 'popup-page variant of the frame: 100vh minus header/footer',
	'pop-main': 'padding body of a popup page',
	'main-section': 'flex:1 block content region of the app-shell',
	'content-section': 'full-width page section; the narrow-* modifiers shrink it to a measure',
	null: 'content-section modifier: strip the section padding',
	'narrow-half': 'content-section modifier: ~half-measure column, centered',
	'narrow-wide': 'content-section modifier: wide-measure column, centered',
	'narrow-full': 'content-section modifier: narrow-measure column, centered',
	'sidebar-left': 'left rail — nav, visible ≥ lg; below, .open on .app-shell turns it into an off-canvas drawer',
	'sidebar-right': 'right rail — TOC, visible ≥ xl; below, its content lives in .mobile-toc',
	'mobile-toc': '<details> TOC dropdown standing in for the right rail below xl',
	navtree: 'left-rail navigation tree',
	'navtree-title': 'nav tree group title',
	'navtree-sub': 'nav tree nested subgroup',
	'nav-l1': 'nav tree top-level link (also a button for collapsible groups)',
	'nav-l2': 'nav tree second-level link',
	'nav-label': 'flat, non-collapsible nav group label',
	toc: 'right-rail table of contents',
	'toc-title': 'TOC heading',
	'toc-list': 'TOC link list',
	'toc-link': 'TOC link',
	'toc-footer': 'TOC footer slot',
	'nav-header': 'sticky header link of the app-shell canon (sits at --header-height)',
	'page-shell': 'page frame with padding ownership rules — use when chrome is not full-bleed',
	'page-split': 'grid page frame: sticky .page-sidebar beside .page-main, sidebar appears ≥ md',
	'page-main': 'content column of .page-split (min-width: 0, --page-gutter padding)',
	'page-sidebar': 'sticky sidebar column of .page-split (hidden below md)',
	'tab-list': 'tab strip — triggers carry native aria-selected',
	'tab-trigger': 'one tab; current one carries .active',
	active: 'state class: the current tab / selected item',
	open: 'state class: shows an overlay (.drawer/.dialog/.popover) or expands an accordion; also resurrects .sidebar-left as a drawer',
	drawer: 'off-canvas overlay panel — shown via .open',
	dialog: 'modal overlay — shown via .open',
	popover: 'anchored overlay — shown via .open',
	accordion: 'disclosure group (grid-rows animation, no JS height math)',
	'accordion-item': 'one disclosure entry',
	'accordion-trigger': 'the disclosure button (native aria-expanded)',
	'accordion-content': 'the collapsible region',
	'accordion-panel': 'inner padding wrapper of the region',
	hero: 'documented sugar for .box.ycenter + gap-lg + pad-y-xl'
};

/** @type {Record<string, string>} */
const VISUAL_CLASSES = {
	// Bare backgrounds
	bg: 'background: var(--bg) — the page background',
	surface: 'background: var(--bg-surface) — one step above the page',
	raised: 'background: var(--bg-raised) — cards, chips, poppers',
	panel: 'background: var(--bg-panel) — inset panels',
	footer: 'background: var(--bg-footer) — the footer band',
	canvas: 'background: var(--bg-canvas) — the canvas behind everything',
	terminal: 'background: var(--bg-terminal) — dark code/terminal block',
	// Ink
	'text-primary': 'primary text ink',
	'text-secondary': 'secondary text ink',
	'text-muted': 'muted text ink',
	'text-inverse': 'ink that reads on filled surfaces',
	'text-theme': 'theme-colored ink',
	'text-theme-hover': 'theme-colored ink on hover',
	'text-success': 'status ink: success',
	'text-warning': 'status ink: warning',
	'text-danger': 'status ink: danger',
	'text-info': 'status ink: info',
	// Status fills
	'bg-success': 'status fill: success — chips and dots',
	'bg-warning': 'status fill: warning',
	'bg-danger': 'status fill: danger',
	'bg-info': 'status fill: info',
	// Lines (the partition-law set)
	border: '1px solid var(--border) on all sides',
	'border-subtle': '1px solid var(--border-subtle) on all sides',
	'border-strong': '1px solid var(--border-strong) on all sides',
	bt: 'partition border on top: 1px solid var(--border)',
	br: 'partition border on the right',
	bb: 'partition border on the bottom',
	bl: 'partition border on the left',
	// Typography
	'text-xs': 'font-size: var(--text-xs)',
	'text-sm': 'font-size: var(--text-sm)',
	'text-md': 'font-size: var(--text-md)',
	'text-bs': 'font-size: var(--text-bs) — the body size',
	'text-lg': 'font-size: var(--text-lg)',
	'text-xl': 'font-size: var(--text-xl), line-height 1.2',
	'text-2xl': 'font-size: var(--text-2xl), line-height 1.2',
	'text-3xl': 'font-size: var(--text-3xl), line-height 1.1',
	'text-4xl': 'font-size: var(--text-4xl), line-height 1.1',
	'text-5xl': 'font-size: var(--text-5xl), line-height 1.1',
	bold: 'font-weight: 700',
	italic: 'font-style: italic',
	sans: 'font-family: var(--font-sans)',
	mono: 'font-family: var(--font-mono)',
	'tt-u': 'text-transform: uppercase',
	'tt-c': 'text-transform: capitalize',
	'ta-c': 'text-align: center',
	truncate: 'single-line ellipsis',
	'clamp-1': 'clamp to 1 line, then ellipsis',
	'clamp-2': 'clamp to 2 lines, then ellipsis',
	'clamp-3': 'clamp to 3 lines, then ellipsis',
	// Weights
	'weight-300': 'font-weight: 300',
	'weight-400': 'font-weight: 400',
	'weight-500': 'font-weight: 500',
	'weight-600': 'font-weight: 600',
	'weight-700': 'font-weight: 700',
	'weight-800': 'font-weight: 800',
	// Compositions
	avatar: 'square-cropped circular image slot sized by --avatar-size',
	divider: 'horizontal rule with breathing room',
	kbd: 'keyboard-key chip',
	field: 'form field wrapper: label + control stacked with scale gap',
	'field-label': 'small secondary label',
	'field-error': 'small danger-colored error line',
	'switch-track': 'toggle track (aria-checked or .checked flips it)',
	'switch-thumb': 'toggle knob',
	checked: 'state class: checked switch',
	// Responsive visibility
	'hide-mobile': 'hidden below the mobile breakpoint',
	'hide-desktop': 'hidden at the desktop breakpoint and up',
	'only-mobile': 'hidden at the desktop breakpoint and up (i.e. only shows on mobile)',
	// Shadows
	'shadow-bs': 'box-shadow: var(--shadow-bs) — the subtle default',
	'shadow-md': 'box-shadow: var(--shadow-md)',
	'shadow-lg': 'box-shadow: var(--shadow-lg) — the elevated lift'
};

/** @type {Record<string, string>} */
const TOKEN_NOTES = {
	'--avatar-size': 'avatar edge length',
	'--bg': 'page background',
	'--bg-muted': 'muted surface background',
	'--bg-primary': 'primary surface background',
	'--bg-secondary': 'secondary surface background',
	'--border': 'default border color',
	'--border-strong': 'emphasized border color',
	'--border-subtle': 'quiet border color',
	'--content-clamp': 'max width for clamped content',
	'--prose-clamp': 'max width for long-form reading',
	'--control-h-sm': 'compact control height (buttons, inputs)',
	'--control-h-bs': 'default control height',
	'--control-h-lg': 'large control height',
	'--danger': 'status color: danger (light -9 / dark -5 rung)',
	'--success': 'status color: success',
	'--warning': 'status color: warning',
	'--info': 'status color: info',
	'--ease-out': 'shared deceleration curve',
	'--ease-spring': 'shared overshoot curve',
	'--motion-base': 'standard motion duration',
	'--motion-fast': 'fast motion duration (hovers, toggles)',
	'--motion-slow': 'slow motion duration (large surfaces)',
	'--font-mono': 'monospace family',
	'--font-sans': 'sans family',
	'--footer-height': 'app-shell footer height (0 = no footer)',
	'--header-height': 'app-shell header height',
	'--sidebar-width': 'app-shell rail width',
	'--radius-xs': 'radius channel, smallest rung — the shape axis rewrites these',
	'--radius-sm': 'radius channel rung',
	'--radius-md': 'radius channel rung — the common corner',
	'--radius-bs': 'radius channel rung',
	'--radius-lg': 'radius channel rung',
	'--radius-xl': 'radius channel, largest rung (full round)',
	'--shadow-bs': 'subtle shadow',
	'--shadow-md': 'medium shadow',
	'--shadow-lg': 'elevated shadow',
	'--space-xs': 'space rung (density axes rewrite these)',
	'--space-sm': 'space rung',
	'--space-md': 'space rung',
	'--space-bs': 'space rung — the body spacing',
	'--space-lg': 'space rung',
	'--space-xl': 'space rung',
	'--speed-0': 'motion speed preset 0',
	'--speed-1': 'motion speed preset 1',
	'--speed-2': 'motion speed preset 2',
	'--speed-3': 'motion speed preset 3',
	'--switch-h': 'toggle track height',
	'--switch-thumb': 'toggle knob size',
	'--switch-w': 'toggle track width',
	'--text-inverse': 'ink for filled surfaces',
	'--text-muted': 'muted ink',
	'--text-primary': 'primary ink',
	'--text-secondary': 'secondary ink',
	'--theme-color': 'the accent — every paint rung reads it',
	'--theme-color-hover': 'accent hover state',
	'--transin-1': 'enter-transition duration rung 1',
	'--transin-2': 'enter-transition duration rung 2',
	'--transin-3': 'enter-transition duration rung 3',
	'--transout-1': 'exit-transition duration rung 1',
	'--transout-2': 'exit-transition duration rung 2',
	'--transout-3': 'exit-transition duration rung 3',
	'--z-modal': 'z-index: modal layer',
	'--z-raised': 'z-index: raised layer',
	'--z-sticky': 'z-index: sticky layer'
};

/** @type {Record<string, string>} */
const TEXT_SIZE_TOKENS = {
	'--text-xs': 'type rung: xs',
	'--text-sm': 'type rung: sm',
	'--text-md': 'type rung: md',
	'--text-bs': 'type rung: body',
	'--text-lg': 'type rung: lg',
	'--text-xl': 'type rung: xl',
	'--text-2xl': 'type rung: 2xl',
	'--text-3xl': 'type rung: 3xl (display)',
	'--text-4xl': 'type rung: 4xl (display)',
	'--text-5xl': 'type rung: 5xl (display)'
};

/** @type {Record<string, string>} */
const ELEMENT_NOTES = {
	'*': 'universal box-sizing/margin reset',
	html: 'root: font, color-scheme, mode attribute wiring',
	body: 'page body: background, ink, font',
	a: 'links: theme color, no underline decoration by default',
	p: 'paragraph rhythm',
	small: 'smaller text',
	blockquote: 'quoted block with a partition rule',
	button: 'native button reset — compose buttons with .btn',
	h1: 'heading rhythm',
	h2: 'heading rhythm',
	h3: 'heading rhythm',
	h4: 'heading rhythm',
	h5: 'heading rhythm',
	h6: 'heading rhythm',
	ul: 'list reset',
	ol: 'list reset',
	li: 'list item',
	svg: 'svg display block'
};

// --- Curated layer intros ----------------------------------------------------

/** @type {Record<string, string>} */
export const LAYER_INTROS = {
	'00_tokens':
		'Custom properties — every value the system owns. Themes stamp them under [data-mode] (light/dark have opinions only here); components and utilities only consume them. Never hard-code a value the ladder already has.',
	'01_config':
		'Compile-time configuration only — !default knobs (breakpoint, ladders, scales) and nothing that emits. Override at @use time or by editing an ejected copy; nothing here is a class.',
	'01_base':
		'Element resets for the bare tags — typography rhythm, link ink, list resets. System buttons are composed with .btn on top of the native reset.',
	'02_dimensions':
		'The generated half of the registry: 17 space families, radius, and size, each emitted in three bands (bare, -mob below 769px, -desk at 769px+, Contract 7). Step rungs (gp-md) ride the tokens and respect the density knobs --gap-scale / --pad-scale; numeric rungs (gp-32) are px literals for exact requirements. Radius channel rungs follow the shape axis; radius literals never do.',
	'03_containers':
		'Containers and the alignment universe. .box / .row / .grid are the three bases; the x*/y* modifiers are NESTED under a base (never standalone) and always physical axes (x = left/right, y = top/bottom — Contract 4), never logical properties.',
	'04_layouts':
		'Layout presets. Grids are pure stepping — no default gap, compose one with .gp-* (self-sufficiency: a default gap is an opinion the system does not hold). The gridding golden rules: 3 items → 3→1, 4 or a multiple of 4 → 4→2→1, 6 → 6→3→2→1.',
	'05_shells':
		'Canonical markups — every class here implements a registered markup shape (the app-shell frame, role-bound rails, tabs, overlays, accordions). Overlays show via .open and their triggers carry native ARIA. Left rail = nav, right rail = TOC; below their breakpoints they collapse into the drawer and .mobile-toc.',
	'06_visuals':
		'The dress layer: bare backgrounds (one declaration each), ink, status fills, partition lines, typography, shadows, and small compositions (avatar, kbd, field, switch). All compositions read the --radius-* channels so the shape axis reaches them. Components own their hover states — there is no standalone .hover.',
	'07_interactions':
		'One shared vocabulary of three ORTHOGONAL axes for every interactive surface: paint (primary/outline/soft/ghost/danger), metrics (sm/bs/lg on the shared control-height channel), corners (round/square/curved). The rungs compose because each is a single self-contained class: "btn primary lg curved". Every rung also ships -mob and -desk bands.',
	'08_own':
		'The sanctioned extension point — classes a project declares for itself. Its contents are per-project and deliberately NOT part of the package API: eject seeds it empty, and this layer is where ft-lint expects your additions. Nothing listed for this layer travels with the package.',
	'09_modifiers':
		'The variant axes as pure token remaps (ported from affedo): data-shape / data-radius / .radius-* sets rewrite the radius ladder, data-density / .density-* rewrite space + control heights, data-scale shifts the root font size. Set on <html> for the whole page or any subtree for a scope; every component skin that consumes the rungs follows instantly. Per-component shape/density props are the consumer side of this contract.'
};

/** Group chips → one curated line each (rendered above a group's table).
 *
 * @type {Record<string, string>}
 */
export const GROUP_INTROS = {
	gaps: 'gp is the everyday gap; rgp/cgp split the axes when rows and columns must breathe differently. All scale with --gap-scale.',
	pads: "The container's breathing — scales with --pad-scale, so density presets reshape padding without touching content spacing.",
	margins:
		'mar/mx/my/mt/mr/mb/ml push content around; the mn* twins are their negative forms (pulls, overlaps, full-bleed escapes). Scale with --gap-scale.',
	radius: 'Channel rungs (radius-md) follow the shape axis — reach for these first; the numeric literals are for exact requirements only.',
	size: 'Fixed px sizes, full-bleed helpers, min- resets for flex/grid shrinking, and viewport-height blocks (hfull-vh-fitted subtracts the chrome).',
	components: 'The interactive roster: btn, link, pill, card, badge. Adding a surface to $interaction-components is the whole of extending it.',
	variants: 'Paint rungs. outline and ghost carry an explicit background: none so a rung is authoritative, not merely silent.',
	sizes: 'Metric rungs on the shared control-height channel — keeps sm/bs/lg on one baseline across buttons, pills and badges. Padding rides --pad-scale.',
	shapes: 'round and curved read the radius channels (they follow data-shape); square is the literal sharp reset.'
};

// --- Public API --------------------------------------------------------------

/**
 * Decode one registry item into a human meaning. Returns undefined when the
 * vocabulary has no rule for it (the emitters then fall back gracefully).
 *
 * @param {{ name: string, kind: string }} item
 * @param {string} layerId
 * @returns {string | undefined}
 */
export function describe(item, layerId) {
	const { name, kind } = item;

	if (kind === 'element') return ELEMENT_NOTES[name];
	if (kind === 'token') return TOKEN_NOTES[name] ?? TEXT_SIZE_TOKENS[name];
	if (kind !== 'class') return undefined;

	const bare = name.replace(/^\./, '');
	const specific = {
		'03_containers': CONTAINER_CLASSES,
		'04_layouts': LAYOUT_CLASSES,
		'05_shells': SHELL_CLASSES,
		'06_visuals': VISUAL_CLASSES
	}[layerId];
	if (specific?.[bare]) return specific[bare];

	// Responsive twins of a known base decode through their base.
	if (specific) {
		const [root, band] = splitBand(bare);
		if (band && specific[root]) return `${specific[root]}${band}`;
	}

	return DECODERS[layerId]?.(bare);
}

// --- Emitters ----------------------------------------------------------------

/** @type {Record<string, string>} */
const KIND_TITLES = { class: 'Classes', token: 'Custom properties', element: 'Element selectors', keyframes: 'Keyframes' };

/**
 * Render the registry as a human-readable markdown API reference.
 * Deterministic: content depends only on the registry payload, so the file
 * never churns on a no-op rebuild.
 *
 * @param {import('./build-registry.mjs').RegistryFile} registry
 * @returns {string}
 */
export function renderApiMarkdown(registry) {
	const t = registry.totals;
	const lines = [
		'# fractalthemer — class API',
		'',
		'> Generated from the class registry by `scripts/build-registry.mjs` — **do not edit by hand**;',
		'> edit the layers (or `_08_own.sass`) and rebuild. Shipped in the npm package so this reference',
		'> is available offline in `node_modules/fractalthemer/src/lib/data/registry.api.md`.',
		'',
		`**${t.class}** classes · **${t.token}** custom properties · **${t.element}** element selectors in ${registry.layers.length} layers.`,
		'',
		'Every generated class decodes from its family; the intro paragraphs are the intent.',
		'Interactive surfaces compose axes: `btn primary lg curved`.'
	];

	for (const layer of registry.layers) {
		lines.push('', '---', '', `## ${layer.order}. ${layer.label}`, '', `\`${layer.file}.sass\``, '');
		lines.push(LAYER_INTROS[layer.id] ?? 'No curated description for this layer yet.');
		if (layer.id === '08_own') continue; // per-project — contents are not package API

		for (const kind of ['class', 'token', 'element', 'keyframes']) {
			const items = layer.items.filter((item) => item.kind === kind);
			if (items.length === 0) continue;

			lines.push('', `### ${KIND_TITLES[kind]} (${items.length})`, '');

			// Layers with a taxonomy get one table per group, each with its
			// curated line; everything else is a single table.
			const groups = layer.groups?.map((g) => g.id) ?? [];
			const buckets = groups.length
				? [...groups, '__none__'].map((id) => ({
						id,
						items: items.filter((item) => (item.group ?? '__none__') === id)
					}))
				: [{ id: '__all__', items }];

			for (const bucket of buckets) {
				if (bucket.items.length === 0) continue;
				if (bucket.id !== '__all__') {
					const label = layer.groups?.find((g) => g.id === bucket.id)?.label ?? bucket.id;
					lines.push('', `**${label}**`);
					if (GROUP_INTROS[bucket.id]) lines.push('', `_${GROUP_INTROS[bucket.id]}_`);
					lines.push('');
				}
				lines.push('| Name | Meaning |', '| --- | --- |');
				for (const item of bucket.items) {
					const meaning = describe(item, layer.id) ?? '—';
					lines.push(`| \`${item.name}\` | ${meaning} |`);
				}
			}
		}
	}

	lines.push('');
	return `${lines.join('\n')}\n`;
}

/**
 * Render a self-contained, dependency-free registry browser (vanilla JS,
 * embedded data — works from file://).
 *
 * @param {import('./build-registry.mjs').RegistryFile} registry
 * @param {{ source?: string }} [meta]
 * @returns {string}
 */
export function renderBrowserHtml(registry, { source } = {}) {
	const data = registry.layers.map((layer) => ({
		id: layer.id,
		label: layer.label,
		items: layer.items.map((item) => ({
			n: item.name,
			k: item.kind,
			g: item.group ?? '',
			m: describe(item, layer.id) ?? ''
		}))
	}));

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>fractalthemer — registry browser</title>
<style>
	:root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
	body { margin: 0; padding: 24px; background: Canvas; color: CanvasText; }
	header { max-width: 1100px; margin: 0 auto 16px; }
	h1 { font-size: 20px; margin: 0 0 4px; }
	.sub { opacity: .7; font-size: 13px; }
	.controls { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
	input, select { font: inherit; padding: 6px 10px; border: 1px solid color-mix(in oklab, CanvasText 20%, Canvas); border-radius: 8px; background: Canvas; color: CanvasText; }
	input { flex: 1; min-width: 220px; }
	table { width: 100%; max-width: 1100px; margin: 0 auto; border-collapse: collapse; font-size: 14px; }
	th, td { text-align: left; padding: 6px 10px; border-bottom: 1px solid color-mix(in oklab, CanvasText 12%, Canvas); vertical-align: top; }
	th { position: sticky; top: 0; background: Canvas; }
	code { font-family: ui-monospace, monospace; font-size: 13px; }
	.m { opacity: .85; }
	.kind { opacity: .55; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
	.empty { opacity: .6; padding: 24px 0; text-align: center; }
</style>
</head>
<body>
<header>
	<h1>fractalthemer — registry browser</h1>
	<div class="sub" id="totals"></div>
	<div class="controls">
		<input id="q" type="search" placeholder="Filter classes, tokens, meanings…" autofocus>
		<select id="layer"><option value="">All layers</option></select>
		<select id="kind">
			<option value="">All kinds</option>
			<option value="class">Classes</option>
			<option value="token">Tokens</option>
			<option value="element">Elements</option>
		</select>
	</div>
</header>
<table><thead><tr><th style="width:30%">Name</th><th>Meaning</th></tr></thead><tbody id="rows"></tbody></table>
<div class="empty" id="empty" hidden>No matches.</div>
<script>
const DATA = ${JSON.stringify(data)};
const SOURCE = ${JSON.stringify(source ?? '')};
const rows = document.getElementById('rows');
const empty = document.getElementById('empty');
const q = document.getElementById('q');
const layerSel = document.getElementById('layer');
const kindSel = document.getElementById('kind');
const TOTALS = DATA.reduce((acc, l) => { for (const i of l.items) acc[i.k] = (acc[i.k] ?? 0) + 1; return acc; }, {});
document.getElementById('totals').textContent =
	\`\${TOTALS.class ?? 0} classes · \${TOTALS.token ?? 0} tokens · \${TOTALS.element ?? 0} elements\${SOURCE ? ' — from ' + SOURCE : ''}\`;
for (const l of DATA) {
	const o = document.createElement('option');
	o.value = l.id; o.textContent = l.label;
	layerSel.append(o);
}
function render() {
	const needle = q.value.trim().toLowerCase();
	const layer = layerSel.value;
	const kind = kindSel.value;
	const out = [];
	for (const l of DATA) {
		if (layer && l.id !== layer) continue;
		for (const i of l.items) {
			if (kind && i.k !== kind) continue;
			if (needle && !(i.n.toLowerCase().includes(needle) || i.m.toLowerCase().includes(needle) || i.g.includes(needle))) continue;
			out.push(\`<tr><td><code>\${i.n}</code> <span class="kind">\${i.k}\${i.g ? ' · ' + i.g : ''}</span></td><td class="m">\${i.m || '—'}</td></tr>\`);
		}
	}
	rows.innerHTML = out.join('');
	empty.hidden = out.length > 0;
}
q.addEventListener('input', render);
layerSel.addEventListener('change', render);
kindSel.addEventListener('change', render);
render();
</script>
</body>
</html>
`;
}
