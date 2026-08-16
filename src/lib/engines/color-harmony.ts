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

	let hues: number[] = [];
	let satMap: number[] = [];
	let lightnessMap: number[] = [];

	switch (mode) {
		case 'monochromatic':
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h];
			satMap = isDarkTheme ? [14, 18, 22, 26, 30, 24, 20, baseHsl.s, Math.max(50, baseHsl.s - 10)] : [10, 15, 20, 15, 25, 18, 20, baseHsl.s, Math.max(50, baseHsl.s - 10)];
			lightnessMap = isDarkTheme ? [8, 12, 16, 20, 25, 18, 28, Math.max(50, baseHsl.l), Math.min(85, baseHsl.l + 12)] : [99, 96, 92, 98, 88, 93, 85, Math.min(50, baseHsl.l), Math.max(35, baseHsl.l - 10)];
			break;

		case 'analogous':
			hues = [
				(baseHsl.h - 30 + 360) % 360, // --bg
				(baseHsl.h - 15 + 360) % 360, // --bg-surface
				baseHsl.h,                    // --bg-panel
				(baseHsl.h + 15) % 360,       // --bg-raised
				(baseHsl.h + 30) % 360,       // --state-hover
				(baseHsl.h + 20) % 360,       // --state-hover-subtle
				(baseHsl.h - 15 + 360) % 360, // --border
				baseHsl.h,                    // --theme-color
				(baseHsl.h + 30) % 360        // --theme-color-alt
			];
			satMap = isDarkTheme ? [16, 20, 22, 25, 32, 26, 22, baseHsl.s, baseHsl.s] : [12, 18, 22, 18, 30, 22, 25, baseHsl.s, baseHsl.s];
			lightnessMap = isDarkTheme ? [9, 13, 17, 21, 26, 19, 30, baseHsl.l, Math.min(85, baseHsl.l + 10)] : [98, 95, 92, 97, 88, 93, 84, baseHsl.l, Math.max(30, baseHsl.l - 10)];
			break;

		case 'complementary': {
			const comp = (baseHsl.h + 180) % 360;
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, comp, comp, (comp + 15) % 360, baseHsl.h, comp];
			satMap = isDarkTheme ? [14, 18, 20, 24, 38, 28, 25, baseHsl.s, Math.max(70, baseHsl.s)] : [10, 15, 18, 15, 35, 25, 25, baseHsl.s, Math.max(70, baseHsl.s)];
			lightnessMap = isDarkTheme ? [8, 12, 16, 20, 28, 20, 32, baseHsl.l, Math.min(80, baseHsl.l + 15)] : [99, 96, 93, 98, 86, 92, 82, baseHsl.l, Math.max(32, baseHsl.l - 12)];
			break;
		}

		case 'split-comp': {
			const sc1 = (baseHsl.h + 150) % 360;
			const sc2 = (baseHsl.h + 210) % 360;
			hues = [baseHsl.h, baseHsl.h, (baseHsl.h + 20) % 360, baseHsl.h, sc1, sc2, (sc1 + 10) % 360, baseHsl.h, sc2];
			satMap = isDarkTheme ? [15, 18, 22, 25, 35, 30, 24, baseHsl.s, Math.max(65, baseHsl.s)] : [12, 16, 20, 16, 32, 26, 22, baseHsl.s, Math.max(65, baseHsl.s)];
			lightnessMap = isDarkTheme ? [9, 13, 17, 22, 27, 21, 30, baseHsl.l, Math.min(82, baseHsl.l + 12)] : [98, 95, 92, 97, 87, 93, 84, baseHsl.l, Math.max(30, baseHsl.l - 10)];
			break;
		}

		case 'triadic': {
			const t1 = (baseHsl.h + 120) % 360;
			const t2 = (baseHsl.h + 240) % 360;
			hues = [baseHsl.h, (baseHsl.h + 15) % 360, t1, baseHsl.h, t1, t2, t1, baseHsl.h, t2];
			satMap = isDarkTheme ? [16, 20, 24, 28, 40, 32, 28, baseHsl.s, Math.max(75, baseHsl.s)] : [12, 18, 22, 18, 38, 28, 26, baseHsl.s, Math.max(75, baseHsl.s)];
			lightnessMap = isDarkTheme ? [9, 13, 17, 22, 29, 21, 32, baseHsl.l, Math.min(82, baseHsl.l + 12)] : [98, 95, 91, 97, 86, 92, 83, baseHsl.l, Math.max(30, baseHsl.l - 12)];
			break;
		}

		case 'tetradic': {
			const tet1 = (baseHsl.h + 90) % 360;
			const tet2 = (baseHsl.h + 180) % 360;
			const tet3 = (baseHsl.h + 270) % 360;
			hues = [baseHsl.h, tet1, tet2, baseHsl.h, tet1, tet2, tet3, baseHsl.h, tet3];
			satMap = isDarkTheme ? [18, 22, 26, 30, 42, 34, 30, baseHsl.s, Math.max(75, baseHsl.s)] : [14, 20, 25, 20, 40, 30, 28, baseHsl.s, Math.max(75, baseHsl.s)];
			lightnessMap = isDarkTheme ? [10, 14, 18, 23, 30, 22, 34, baseHsl.l, Math.min(84, baseHsl.l + 14)] : [97, 94, 90, 96, 85, 91, 82, baseHsl.l, Math.max(28, baseHsl.l - 14)];
			break;
		}

		case 'shades':
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h];
			satMap = [baseHsl.s, baseHsl.s, baseHsl.s, baseHsl.s, baseHsl.s, baseHsl.s, baseHsl.s, baseHsl.s, baseHsl.s];
			lightnessMap = isDarkTheme
				? [6, 10, 14, 18, 24, 30, 38, 48, 58]
				: [88, 78, 68, 58, 48, 38, 30, 22, 14];
			break;

		case 'tints':
			hues = [baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h, baseHsl.h];
			satMap = [baseHsl.s * 0.5, baseHsl.s * 0.6, baseHsl.s * 0.7, baseHsl.s * 0.75, baseHsl.s * 0.8, baseHsl.s * 0.85, baseHsl.s * 0.9, baseHsl.s, baseHsl.s];
			lightnessMap = isDarkTheme
				? [14, 20, 28, 36, 46, 56, 66, 76, 88]
				: [99, 97, 94, 90, 85, 80, 74, 66, 55];
			break;
	}

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

		const h = hues[idx] ?? baseHsl.h;
		const s = satMap[idx] ?? baseHsl.s;
		const l = lightnessMap[idx] ?? baseHsl.l;

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
