// Color conversion & contrast ratio utilities
// Supports Hex, RGB, HSL, and WCAG 2.1 relative luminance / contrast calculations

export interface HSL {
	h: number; // 0 to 360
	s: number; // 0 to 100
	l: number; // 0 to 100
}

export interface RGB {
	r: number; // 0 to 255
	g: number; // 0 to 255
	b: number; // 0 to 255
}

/**
 * Normalizes any 3, 4, 6, or 8 digit hex string to 6-digit uppercase hex
 */
export function normalizeHex(hex: string): string {
	let clean = hex.trim().replace(/^#/, '');
	if (clean.length === 3) {
		clean = clean.split('').map(c => c + c).join('');
	} else if (clean.length === 4) {
		clean = clean.slice(0, 3).split('').map(c => c + c).join('');
	} else if (clean.length > 6) {
		clean = clean.slice(0, 6);
	}
	if (!/^[0-9A-Fa-f]{6}$/.test(clean)) {
		return '#000000';
	}
	return `#${clean.toUpperCase()}`;
}

/**
 * Converts Hex string to RGB
 */
export function hexToRgb(hex: string): RGB {
	const normalized = normalizeHex(hex).replace('#', '');
	const num = parseInt(normalized, 16);
	return {
		r: (num >> 16) & 255,
		g: (num >> 8) & 255,
		b: num & 255
	};
}

/**
 * Converts RGB to Hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
	const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
	const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	};
}

/**
 * Converts HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
	h = ((h % 360) + 360) % 360;
	s = Math.max(0, Math.min(100, s)) / 100;
	l = Math.max(0, Math.min(100, l)) / 100;

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;
	let r1 = 0, g1 = 0, b1 = 0;

	if (h < 60) {
		r1 = c; g1 = x; b1 = 0;
	} else if (h < 120) {
		r1 = x; g1 = c; b1 = 0;
	} else if (h < 180) {
		r1 = 0; g1 = c; b1 = x;
	} else if (h < 240) {
		r1 = 0; g1 = x; b1 = c;
	} else if (h < 300) {
		r1 = x; g1 = 0; b1 = c;
	} else {
		r1 = c; g1 = 0; b1 = x;
	}

	return {
		r: Math.round((r1 + m) * 255),
		g: Math.round((g1 + m) * 255),
		b: Math.round((b1 + m) * 255)
	};
}

/**
 * Converts Hex string to HSL
 */
export function hexToHsl(hex: string): HSL {
	const rgb = hexToRgb(hex);
	return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Converts HSL to Hex
 */
export function hslToHex(h: number, s: number, l: number): string {
	const rgb = hslToRgb(h, s, l);
	return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Calculates WCAG 2.1 relative luminance for an sRGB color
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map(val => {
		const s = val / 255;
		return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two hex colors (returns 1.0 to 21.0)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
	const rgb1 = hexToRgb(hex1);
	const rgb2 = hexToRgb(hex2);
	const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
	const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);
	const ratio = (brightest + 0.05) / (darkest + 0.05);
	return Math.round(ratio * 100) / 100;
}
