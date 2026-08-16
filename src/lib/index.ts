// Components
export { default as ThemePicker } from './components/ThemePicker.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as AuraBackground } from './components/AuraBackground.svelte';
export { default as ThemeScript } from './components/ThemeScript.svelte';

// State & Runes
export { themeState, ThemeState } from './state/theme.svelte';

// Data & Constants
export {
	THEMES,
	LIGHT_THEMES,
	DARK_THEMES,
	DEFAULT_THEME_ID,
	type ThemeInfo,
	type BgStyle
} from './data/themes';

export { CORE_TOKENS, type TokenMeta } from './data/tokens';
export { type AuraLayer, type AuraPreset } from './data/auras';
export { GRADIENT_PRESETS, type GradientPreset } from './data/gradients';

// Utilities
export { getAntiFlickerScript } from './utils/anti-flicker';
