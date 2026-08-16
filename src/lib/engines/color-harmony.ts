// 9-Column Semantic Theme Palette Engine with Per-Color Locking & Harmonies
import { hexToHsl, hslToHex, getContrastRatio, normalizeHex, type HSL } from './color-converter.js';

export type HarmonyMode =
	| 'monochromatic'
	| 'analogous'
	| 'complementary'
	| 'split-comp'
	| 'triadic'
	| 'tetradic'
	| 'shades'
	| 'tints';

export interface PaletteColumn {
	token: string;
	label: string;
	hex: string;
	hsl: HSL;
	locked: boolean;
	contrastWhite: number; // e.g. 1.22
	contrastBlack: number; // e.g. 17.24
}

export const PALETTE_TOKENS = [
	{ token: '--bg', label: 'App Canvas' },
	{ token: '--bg-surface', label: 'Card Surface' },
	{ token: '--bg-panel', label: 'Sidebar / Panel' },
	{ token: '--bg-raised', label: 'Raised Modal' },
	{ token: '--state-hover', label: 'Hover Tint' },
	{ token: '--state-hover-subtle', label: 'Subtle Hover' },
	{ token: '--border', label: 'Border Divider' },
	{ token: '--theme-color', label: 'Brand Accent' },
	{ token: '--theme-color-alt', label: 'Accent Alternate' }
] as const;

/**
 * Generates a random vibrant base color hex
 */
export function getRandomBaseColor(): string {
	const h = Math.floor(Math.random() * 360);
	const s = Math.floor(Math.random() * 40) + 55; // 55% - 95%
	const l = Math.floor(Math.random() * 30) + 40; // 40% - 70%
	return hslToHex(h, s, l);
}

/**
 * Generates 9 harmonic color columns for a given base hex and harmony mode.
 * If existingColumns contains locked items, their hex values will be preserved.
 */
export function generateSemanticPalette(
	baseHex: string,
	mode: HarmonyMode,
	isDarkTheme: boolean = false,
	existingColumns?: PaletteColumn[]
): PaletteColumn[] {
	const normalizedBase = normalizeHex(baseHex);
	const baseHsl = hexToHsl(normalizedBase);

	// Compute base hue variations according to harmony mode
	let hues: number[] = [];
	switch (mode) {
		case 'monochromatic':
		case 'shades':
		case 'tints':
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h];
			break;
		case 'analogous':
			hues = [
				(baseHsl.h - 30 + 360) % 360,
				(baseHsl.h - 15 + 360) % 360,
				baseHsl.h,
				(baseHsl.h + 15) % 360,
				(baseHsl.h + 30) % 360,
				(baseHsl.h + 45) % 360,
				(baseHsl.h - 45 + 360) % 360,
				baseHsl.h,
				(baseHsl.h + 20) % 360
			];
			break;
		case 'complementary':
			const comp = (baseHsl.h + 180) % 360;
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, comp, comp, baseHsl.h, comp, (comp + 15) % 360];
			break;
		case 'split-comp':
			const sc1 = (baseHsl.h + 150) % 360;
			const sc2 = (baseHsl.h + 210) % 360;
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, sc1, sc2, baseHsl.h, sc1, sc2];
			break;
		case 'triadic':
			const t1 = (baseHsl.h + 120) % 360;
			const t2 = (baseHsl.h + 240) % 360;
			hues = [baseHsl.h, baseHsl.h, t1, t1, t2, t2, baseHsl.h, t1, t2];
			break;
		case 'tetradic':
			const tet1 = (baseHsl.h + 90) % 360;
			const tet2 = (baseHsl.h + 180) % 360;
			const tet3 = (baseHsl.h + 270) % 360;
			hues = [baseHsl.h, tet1, tet2, tet3, tet1, tet2, baseHsl.h, tet1, tet3];
			break;
	}

	// Compute semantic luminance and saturation curves for the 9 tokens
	// 0: --bg, 1: --bg-surface, 2: --bg-panel, 3: --bg-raised, 4: --state-hover, 5: --state-hover-subtle, 6: --border, 7: --theme-color, 8: --theme-color-alt
	const lightnessMap = isDarkTheme
		? [9, 13, 16, 20, 24, 18, 28, Math.max(45, baseHsl.l), Math.min(85, baseHsl.l + 10)]
		: [100, 97, 94, 98, 91, 95, 87, Math.min(50, baseHsl.l), Math.max(35, baseHsl.l - 8)];

	const satMap = isDarkTheme
		? [14, 16, 18, 22, 25, 20, 20, Math.max(65, baseHsl.s), Math.max(60, baseHsl.s)]
		: [0, 8, 12, 10, 15, 12, 16, Math.max(70, baseHsl.s), Math.max(75, baseHsl.s)];

	return PALETTE_TOKENS.map((item, idx) => {
		const existing = existingColumns?.[idx];
		// If locked, preserve existing color completely
		if (existing && existing.locked) {
			return {
				...existing,
				contrastWhite: getContrastRatio(existing.hex, '#FFFFFF'),
				contrastBlack: getContrastRatio(existing.hex, '#000000')
			};
		}

		let h = hues[idx] ?? baseHsl.h;
		let s = satMap[idx] ?? baseHsl.s;
		let l = lightnessMap[idx] ?? baseHsl.l;

		// For brand tokens (7 & 8), preserve vibrant base tone
		if (idx === 7) {
			h = baseHsl.h;
			s = baseHsl.s;
			l = baseHsl.l;
		} else if (idx === 8) {
			h = (baseHsl.h + 10) % 360;
			s = Math.min(100, baseHsl.s + 5);
			l = isDarkTheme ? Math.min(80, baseHsl.l + 10) : Math.max(25, baseHsl.l - 8);
		}

		const hex = hslToHex(h, s, l);
		return {
			token: item.token,
			label: item.label,
			hex,
			hsl: { h, s, l },
			locked: existing ? existing.locked : false,
			contrastWhite: getContrastRatio(hex, '#FFFFFF'),
			contrastBlack: getContrastRatio(hex, '#000000')
		};
	});
}
