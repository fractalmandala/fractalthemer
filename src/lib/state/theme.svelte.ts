import {
	THEMES,
	DEFAULT_THEME_ID,
	type ThemeInfo,
	type BgStyle
} from '../data/themes.js';
import { CORE_TOKENS } from '../data/tokens.js';
import { AURA_PRESETS, type AuraLayer, type AuraPreset } from '../data/auras.js';
import { GRADIENT_PRESETS, type GradientPreset } from '../data/gradients.js';

export class ThemeState {
	current = $state<string>(DEFAULT_THEME_ID);
	bgStyle = $state<BgStyle>('plain');
	activeGradient = $state<string | null>(null);
	activeAura = $state<string | null>(null);
	isOpen = $state<boolean>(false);
	customThemes = $state<ThemeInfo[]>([]);
	activeCustomOverrides = $state<Record<string, string> | null>(null);
	activeCustomAuraLayers = $state<AuraLayer[] | null>(null);

	get allThemes(): ThemeInfo[] {
		return [...THEMES, ...this.customThemes];
	}

	get allGradients(): GradientPreset[] {
		return GRADIENT_PRESETS;
	}

	get allAuras(): AuraPreset[] {
		return AURA_PRESETS;
	}

	get currentTheme(): ThemeInfo {
		return this.allThemes.find((t) => t.id === this.current) ?? THEMES[0];
	}

	get isDark(): boolean {
		return this.currentTheme.mode === 'dark';
	}

	get isAura(): boolean {
		return this.bgStyle === 'aura';
	}

	get isGradient(): boolean {
		return this.bgStyle === 'gradient';
	}

	get activeGradientPreset(): GradientPreset | null {
		return GRADIENT_PRESETS.find((g) => g.id === this.activeGradient) ?? null;
	}

	get activeAuraPreset(): AuraPreset | null {
		return AURA_PRESETS.find((a) => a.id === this.activeAura) ?? null;
	}

	init() {
		if (typeof window === 'undefined') return;

		// Load custom themes from localStorage
		try {
			const savedCustom = localStorage.getItem('customThemes');
			if (savedCustom) {
				const parsed = JSON.parse(savedCustom);
				if (Array.isArray(parsed)) {
					this.customThemes = parsed;
				}
			}
		} catch {
			this.customThemes = [];
		}

		const savedTheme = localStorage.getItem('theme');
		if (savedTheme && this.allThemes.some((t) => t.id === savedTheme)) {
			this.current = savedTheme;
		} else {
			this.current = DEFAULT_THEME_ID;
		}

		const savedGradient = localStorage.getItem('gradient');
		if (savedGradient && GRADIENT_PRESETS.some((g) => g.id === savedGradient)) {
			this.activeGradient = savedGradient;
		}

		const savedAura = localStorage.getItem('aura');
		if (savedAura) {
			const preset = AURA_PRESETS.find((a) => a.id === savedAura);
			if (preset) {
				this.activeAura = savedAura;
				this.activeCustomAuraLayers = preset.layers;
			}
		}

		const savedBgStyle = localStorage.getItem('bgStyle') as BgStyle | null;
		if (savedBgStyle === 'aura' || savedBgStyle === 'plain' || savedBgStyle === 'gradient') {
			this.bgStyle = savedBgStyle;
		} else {
			this.bgStyle = 'plain';
		}

		this.apply(this.current, this.bgStyle);
	}

	setTheme(id: string) {
		const target = this.allThemes.find((t) => t.id === id);
		if (!target) return;

		this.current = id;
		if (target.isCustom && target.tokens) {
			this.activeCustomOverrides = target.tokens;
			if (target.customAura?.layers) {
				this.activeCustomAuraLayers = target.customAura.layers;
			}
		} else if (!this.activeAura) {
			this.activeCustomOverrides = null;
			this.activeCustomAuraLayers = null;
		}

		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('theme', id);
			} catch {}
			this.apply(id, this.bgStyle);
		}
	}

	setBgStyle(style: BgStyle) {
		this.bgStyle = style;
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('bgStyle', style);
			} catch {}
			this.apply(this.current, style);
		}
	}

	setAura(id: string) {
		const target = AURA_PRESETS.find((a) => a.id === id);
		if (!target) return;
		this.activeAura = id;
		this.activeCustomAuraLayers = target.layers;
		this.bgStyle = 'aura';
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('aura', id);
				localStorage.setItem('bgStyle', 'aura');
			} catch {}
			this.apply(this.current, 'aura');
		}
	}

	clearAura() {
		this.activeAura = null;
		this.activeCustomAuraLayers = null;
		if (typeof window !== 'undefined') {
			try {
				localStorage.removeItem('aura');
			} catch {}
			this.apply(this.current, this.bgStyle);
		}
	}

	setGradient(id: string) {
		const target = GRADIENT_PRESETS.find((g) => g.id === id);
		if (!target) return;
		this.activeGradient = id;
		this.bgStyle = 'gradient';
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('gradient', id);
				localStorage.setItem('bgStyle', 'gradient');
			} catch {}
			this.apply(this.current, 'gradient');
		}
	}

	clearGradient() {
		this.activeGradient = null;
		if (typeof window !== 'undefined') {
			try {
				localStorage.removeItem('gradient');
			} catch {}
		}
		if (this.bgStyle === 'gradient') {
			this.setBgStyle('aura');
		}
	}

	toggleBgStyle() {
		if (this.bgStyle === 'plain') {
			this.setBgStyle('aura');
		} else if (this.bgStyle === 'aura') {
			if (this.activeGradient) {
				this.setBgStyle('gradient');
			} else {
				this.setBgStyle('plain');
			}
		} else {
			this.setBgStyle('plain');
		}
	}

	toggleMode() {
		const targetMode = this.isDark ? 'light' : 'dark';
		const matching = this.allThemes.filter((t) => t.mode === targetMode);
		if (targetMode === 'light') {
			this.setTheme(DEFAULT_THEME_ID);
		} else {
			const candidate = matching.find((t) => t.id === 'theme-night-dark') ?? matching[0];
			if (candidate) this.setTheme(candidate.id);
		}
	}

	cycleNext() {
		const list = this.allThemes;
		const idx = list.findIndex((t) => t.id === this.current);
		const nextIdx = (idx + 1) % list.length;
		this.setTheme(list[nextIdx].id);
	}

	cycleRandom() {
		const pool = this.allThemes.filter((t) => t.id !== this.current);
		const randomTheme = pool[Math.floor(Math.random() * pool.length)];
		if (randomTheme) {
			this.setTheme(randomTheme.id);
		}
	}

	resetDefault() {
		this.activeCustomOverrides = null;
		this.activeCustomAuraLayers = null;
		this.activeGradient = null;
		if (typeof window !== 'undefined') {
			try {
				localStorage.removeItem('gradient');
			} catch {}
		}
		this.clearCustomOverrides();
		this.setTheme(DEFAULT_THEME_ID);
		this.setBgStyle('plain');
	}

	togglePicker() {
		this.isOpen = !this.isOpen;
	}

	closePicker() {
		this.isOpen = false;
	}

	openPicker() {
		this.isOpen = true;
	}

	saveCustomTheme(custom: {
		id?: string;
		name: string;
		mode: 'light' | 'dark';
		description?: string;
		tokens: Record<string, string>;
		aura?: { id: string; name: string; description: string; layers: AuraLayer[] };
	}): ThemeInfo {
		const id = custom.id || ('custom-' + Date.now().toString(36));
		const themeInfo: ThemeInfo = {
			id,
			name: custom.name,
			mode: custom.mode,
			accentColor: custom.tokens['theme-color'] || '#04825B',
			bgColor: custom.tokens['bg'] || (custom.mode === 'dark' ? '#0F172A' : '#FFFFFF'),
			textColor: custom.tokens['text-primary'] || (custom.mode === 'dark' ? '#F8FAFC' : '#0F172A'),
			description: custom.description || 'User created custom theme',
			auraId: custom.aura?.id || 'custom-aura',
			auraName: custom.aura?.name || 'Custom Aura',
			auraDescription: custom.aura?.description || 'Custom crafted gradient bloom',
			tokens: custom.tokens,
			isCustom: true,
			customAura: custom.aura
		};

		const existingIdx = this.customThemes.findIndex((t) => t.id === id);
		if (existingIdx >= 0) {
			this.customThemes[existingIdx] = themeInfo;
		} else {
			this.customThemes = [...this.customThemes, themeInfo];
		}

		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('customThemes', JSON.stringify(this.customThemes));
			} catch {}
		}

		this.setTheme(id);
		return themeInfo;
	}

	deleteCustomTheme(id: string) {
		this.customThemes = this.customThemes.filter((t) => t.id !== id);
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('customThemes', JSON.stringify(this.customThemes));
			} catch {}
		}
		if (this.current === id) {
			this.resetDefault();
		}
	}

	setCustomTokens(tokens: Record<string, string>) {
		this.applyCustomOverrides(tokens);
	}

	applyCustomOverrides(tokens: Record<string, string>, auraLayers?: AuraLayer[]) {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		this.activeCustomOverrides = tokens;
		if (auraLayers) this.activeCustomAuraLayers = auraLayers;

		for (const [key, val] of Object.entries(tokens)) {
			root.style.setProperty('--' + key, val);
		}
	}

	clearCustomOverrides() {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		this.activeCustomOverrides = null;
		this.activeCustomAuraLayers = null;

		for (const token of CORE_TOKENS) {
			root.style.removeProperty('--' + token.key);
		}
	}

	apply(id: string, style?: BgStyle) {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		const currentStyle = style ?? this.bgStyle;

		// Clear inline token properties first
		this.clearCustomOverrides();

		// Remove all theme classes
		for (const theme of this.allThemes) {
			root.classList.remove(theme.id);
		}

		// Apply target theme class
		root.classList.add(id);

		const theme = this.allThemes.find((t) => t.id === id);
		if (theme) {
			root.setAttribute('data-theme', theme.id);
			root.setAttribute('data-mode', theme.mode);
			root.setAttribute('data-bg-style', currentStyle);
			root.style.colorScheme = theme.mode;

			if (currentStyle === 'gradient' && this.activeGradientPreset) {
				root.style.setProperty('--bg-gradient', this.activeGradientPreset.css);
			} else {
				root.style.removeProperty('--bg-gradient');
			}

			if (theme.isCustom && theme.tokens) {
				this.applyCustomOverrides(theme.tokens, theme.customAura?.layers);
			}
		}
	}
}

export const themeState = new ThemeState();
