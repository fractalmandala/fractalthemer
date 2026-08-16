// Components
export { default as ThemePicker } from './components/ThemePicker.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as AuraBackground } from './components/AuraBackground.svelte';
export { default as ThemeScript } from './components/ThemeScript.svelte';
export { default as ThemeStudio } from './components/studio/ThemeStudio.svelte';
export { default as PaletteGenerator } from './components/studio/PaletteGenerator.svelte';

// State & Runes
export { themeState, ThemeState } from './state/theme.svelte.js';
export { studioState } from './state/studio.svelte.js';

// Data & Constants
export {
	THEMES,
	LIGHT_THEMES,
	DARK_THEMES,
	DEFAULT_THEME_ID,
	type ThemeInfo,
	type BgStyle
} from './data/themes.js';

export { CORE_TOKENS, type TokenMeta } from './data/tokens.js';
export { AURA_PRESETS, type AuraLayer, type AuraPreset } from './data/auras.js';
export { GRADIENT_PRESETS, type GradientPreset } from './data/gradients.js';
export { GALLERY_PRESETS, type GalleryPreset } from './data/gallery-presets.js';
export { ARTISAN_COLORS, type ArtisanColor } from './data/artisan-colors.js';
export { COLOURWAY_PRESETS, type ColourwayPreset } from './data/colourways.js';
export { SILHOUETTE_SHAPES, type SilhouetteShape } from './data/silhouettes.js';
export { ARRANGEMENT_PRESETS, type ArrangementPreset } from './data/arrangements.js';

// Engines & Calculations
export { renderEngineToCanvas } from './engines/canvas-shaders.js';
export {
	generateSemanticPalette,
	getRandomBaseColor,
	type HarmonyMode,
	type PaletteColumn
} from './engines/color-harmony.js';
export {
	hexToRgb,
	rgbToHex,
	hexToHsl,
	hslToHex,
	getContrastRatio,
	getRelativeLuminance
} from './engines/color-converter.js';

// Utilities
export { getAntiFlickerScript } from './utils/anti-flicker.js';
