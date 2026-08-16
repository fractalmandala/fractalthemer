<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { themeState } from '../state/theme.svelte.js';
	import { LIGHT_THEMES, DARK_THEMES, type ThemeInfo } from '../data/themes.js';
	import { AURA_PRESETS, type AuraPreset } from '../data/auras.js';
	import { GRADIENT_PRESETS, type GradientPreset } from '../data/gradients.js';
	import { PATTERNS, PATTERN_CATEGORIES, type Pattern, type PatternCategory } from '../data/patterns.js';
	import Sun from '../icons/Sun.svelte';
	import Moon from '../icons/Moon.svelte';
	import Palette from '../icons/Palette.svelte';
	import Close from '../icons/Close.svelte';
	import { studioState } from '../state/studio.svelte.js';
	import ThemeStudio from './studio/ThemeStudio.svelte';

	interface Props {
		studioHref?: string;
		showStudioLink?: boolean;
		showModeToggle?: boolean;
		triggerButton?: Snippet;
	}

	let {
		studioHref = '/studio',
		showStudioLink = false,
		showModeToggle = true,
		triggerButton
	}: Props = $props();

	let currentView = $state<'plain' | 'aura' | 'gradient' | 'pattern'>('plain');
	let themeSubFilter = $state<'all' | 'light' | 'dark' | 'custom'>('all');
	let searchFilter = $state<string>('');
	let pickerEl = $state<HTMLDivElement | null>(null);
	let showStudioModal = $state<boolean>(false);

	function patternStyleToCss(style: Record<string, string | number | undefined> | undefined): string {
		if (!style) return '';
		return Object.entries(style)
			.filter(([_, v]) => v !== undefined && v !== '')
			.map(([k, v]) => {
				const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
				return `${cssKey}: ${v};`;
			})
			.join(' ');
	}

	onMount(() => {
		themeState.init();
		if (themeState.bgStyle === 'aura') currentView = 'aura';
		else if (themeState.bgStyle === 'gradient') currentView = 'gradient';
		else if (themeState.bgStyle === 'pattern') currentView = 'pattern';
		else currentView = 'plain';

		function handleClickOutside(e: MouseEvent) {
			if (themeState.isOpen && pickerEl && !pickerEl.contains(e.target as Node)) {
				themeState.closePicker();
			}
		}

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape' && themeState.isOpen) {
				themeState.closePicker();
			}
		}

		window.addEventListener('click', handleClickOutside);
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('click', handleClickOutside);
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	const filteredThemes = $derived.by(() => {
		let list: ThemeInfo[] = [];
		if (themeSubFilter === 'light') {
			list = LIGHT_THEMES;
		} else if (themeSubFilter === 'dark') {
			list = DARK_THEMES;
		} else if (themeSubFilter === 'custom') {
			list = themeState.customThemes;
		} else {
			list = themeState.allThemes;
		}

		if (!searchFilter.trim()) return list;

		const q = searchFilter.toLowerCase().trim();
		return list.filter(
			(t) =>
				t.name.toLowerCase().includes(q) ||
				t.id.toLowerCase().includes(q) ||
				t.auraName.toLowerCase().includes(q) ||
				t.description.toLowerCase().includes(q)
		);
	});

	const filteredAuras = $derived.by(() => {
		let list = AURA_PRESETS;
		if (!searchFilter.trim()) return list;

		const q = searchFilter.toLowerCase().trim();
		return list.filter(
			(a) =>
				a.name.toLowerCase().includes(q) ||
				a.id.toLowerCase().includes(q) ||
				a.category.toLowerCase().includes(q) ||
				a.mood.toLowerCase().includes(q) ||
				a.description.toLowerCase().includes(q)
		);
	});

	const filteredGradients = $derived.by(() => {
		if (!searchFilter.trim()) return GRADIENT_PRESETS;
		const q = searchFilter.toLowerCase().trim();
		return GRADIENT_PRESETS.filter(
			(g) => g.name.toLowerCase().includes(q) || g.id.toLowerCase().includes(q)
		);
	});

	const filteredPatterns = $derived.by(() => {
		let list = PATTERNS;
		if (!searchFilter.trim()) return list;

		const q = searchFilter.toLowerCase().trim();
		return list.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.id.toLowerCase().includes(q) ||
				p.category.toLowerCase().includes(q) ||
				(p.description && p.description.toLowerCase().includes(q))
		);
	});
</script>

<div class="theme-controls" bind:this={pickerEl}>
	<!-- Quick Mode Flip (Sun/Moon) -->
	{#if showModeToggle}
		<button
			type="button"
			class="is-icon"
			title={themeState.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
			aria-label={themeState.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
			onclick={() => themeState.toggleMode()}
		>
			{#if themeState.isDark}
				<Sun/>
			{:else}
				<Moon />
			{/if}
		</button>
	{/if}

	<!-- Theme Drawer Trigger -->
	{#if triggerButton}
		{@render triggerButton()}
	{:else}
		<button
			type="button"
			class="is-icon"
			aria-haspopup="dialog"
			aria-expanded={themeState.isOpen}
			title="Choose theme and aura background"
			onclick={(e) => {
				e.stopPropagation();
				if (!themeState.isOpen) {
					if (themeState.bgStyle === 'aura') currentView = 'aura';
					else if (themeState.bgStyle === 'gradient') currentView = 'gradient';
					else if (themeState.bgStyle === 'pattern') currentView = 'pattern';
					else currentView = 'plain';
				}
				themeState.togglePicker();
			}}
		>
			<Palette />
		</button>
	{/if}

	{#if themeState.isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="theme-drawer-backdrop"
			onclick={() => themeState.closePicker()}
			aria-hidden="true"
		></div>

		<div class="theme-popover" role="dialog" aria-label="Theme and Background Switcher">
			<!-- 1 Unified System Top Header (Plain vs Aura vs Gradient vs Pattern) -->
			<div class="theme-style-switcher">
				<div class="theme-style-toggle-group">
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={currentView === 'plain'}
						onclick={() => (currentView = 'plain')}
						title="Explore 42 curated and custom color themes"
					>
						<span>◻</span> Plain
					</button>
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={currentView === 'aura'}
						onclick={() => (currentView = 'aura')}
						title="Explore 203 atmospheric aura gradients"
					>
						<span>✨</span> Aura
					</button>
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={currentView === 'gradient'}
						onclick={() => (currentView = 'gradient')}
						title="Explore plain gradient background presets"
					>
						<span>🌈</span> Gradient
					</button>
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={currentView === 'pattern'}
						onclick={() => (currentView = 'pattern')}
						title="Explore 257 CSS background patterns"
					>
						<span>📐</span> Pattern
					</button>
				</div>

				<div style="display: flex; align-items: center; gap: 6px;">
					{#if showStudioLink}
						<a
							href={studioHref}
							class="theme-tab-btn"
							style="text-decoration: none; font-weight: 600; color: var(--theme-color);"
							onclick={() => themeState.closePicker()}
							title="Open interactive Theme & Aura Studio"
						>
							🎨 Studio
						</a>
					{/if}

					<button
						type="button"
						class="theme-icon-btn"
						aria-label="Close theme menu"
						onclick={() => themeState.closePicker()}
					>
						<Close />
					</button>
				</div>
			</div>

			<!-- Secondary Sub-Filter Row: Only for Plain Themes -->
			{#if currentView === 'plain'}
				<div class="theme-tabs" style="display: flex; justify-content: space-between; align-items: center;">
					<div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
						<button
							type="button"
							class="theme-tab-btn"
							class:active={themeSubFilter === 'all'}
							onclick={() => (themeSubFilter = 'all')}
						>
							All ({themeState.allThemes.length})
						</button>
						<button
							type="button"
							class="theme-tab-btn"
							class:active={themeSubFilter === 'light'}
							onclick={() => (themeSubFilter = 'light')}
						>
							Light ({LIGHT_THEMES.length})
						</button>
						<button
							type="button"
							class="theme-tab-btn"
							class:active={themeSubFilter === 'dark'}
							onclick={() => (themeSubFilter = 'dark')}
						>
							Dark ({DARK_THEMES.length})
						</button>
						<button
							type="button"
							class="theme-tab-btn"
							class:active={themeSubFilter === 'custom'}
							onclick={() => (themeSubFilter = 'custom')}
						>
							Custom ({themeState.customThemes.length})
						</button>
					</div>

					<button
						type="button"
						class="theme-tab-btn"
						title="Cycle to next theme"
						aria-label="Cycle to next theme"
						onclick={() => themeState.cycleNext()}
					>
						NEXT
					</button>
				</div>
			{/if}

			<!-- Search Bar -->
			<div class="theme-search-bar">
				<input
					type="text"
					class="theme-search-input"
					placeholder={currentView === 'plain' ? 'Search 42 themes...' : currentView === 'aura' ? 'Search 203 aura gradients...' : currentView === 'gradient' ? 'Search gradients...' : 'Search 257 CSS patterns...'}
					bind:value={searchFilter}
				/>
			</div>

			<!-- Card Grids -->
			<div class="theme-grid-container">
				{#if currentView === 'plain'}
					{#if themeSubFilter === 'custom'}
						<button
							type="button"
							class="theme-card"
							style="border-style: dashed; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 110px; background: var(--bg-surface);"
							onclick={() => (showStudioModal = true)}
							title="Open Studio to create and save custom themes"
						>
							<span style="font-size: 24px;">➕</span>
							<span style="font-size: 11px; font-weight: 600; color: var(--theme-color);">New in Studio</span>
						</button>
					{/if}

					{#each filteredThemes as theme (theme.id)}
						<div
							class="theme-card"
							class:active={themeState.bgStyle === 'plain' && themeState.current === theme.id}
							role="button"
							tabindex="0"
							title="{theme.name} — {theme.description}"
							onclick={() => {
								themeState.setTheme(theme.id);
								themeState.setBgStyle('plain');
							}}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									themeState.setTheme(theme.id);
									themeState.setBgStyle('plain');
								}
							}}
						>
							{#if theme.isCustom}
								<button
									type="button"
									class="theme-card-delete-btn"
									title="Delete custom theme {theme.name}"
									aria-label="Delete custom theme {theme.name}"
									onclick={(e) => {
										e.stopPropagation();
										themeState.deleteCustomTheme(theme.id);
									}}
								>
									✕
								</button>
							{/if}

							<div class="theme-card-header">
								<span class="theme-card-name">{theme.name}</span>
								<span class="theme-card-badge">{theme.mode}</span>
							</div>

							<div
								class="theme-card-preview"
								style="background-color: {theme.bgColor}; color: {theme.textColor}; border-color: {theme.accentColor}33"
							>
								<span class="theme-preview-dot" style="background-color: {theme.accentColor}"></span>
								<span class="theme-preview-dot" style="background-color: {theme.textColor}"></span>
							</div>

							<span class="theme-aura-tag">
								{theme.isCustom ? '🎨 Custom' : `✨ ${theme.auraName}`}
							</span>
						</div>
					{/each}

				{:else if currentView === 'aura'}
					{#each filteredAuras as aura (aura.id)}
						<button
							type="button"
							class="theme-aura-card"
							class:active={themeState.isAura && themeState.activeAura === aura.id}
							title="{aura.name} — {aura.description} ({aura.category})"
							onclick={() => {
								themeState.setAura(aura.id);
							}}
						>
							<div class="aura-card-preview" style="background-color: {aura.baseColor}; pointer-events: none !important;">
								{#each aura.layers as layer, idx (idx)}
									<div
										class="aura-card-layer"
										style:background={layer.background}
										style:mix-blend-mode={layer.blendMode || 'normal'}
										style:filter={`blur(${Math.min(layer.blur || 18, 22)}px)`}
										style:opacity={layer.opacity !== undefined ? layer.opacity : 1}
										style:pointer-events="none !important"
									></div>
								{/each}
							</div>
							<div class="theme-card-header">
								<span class="theme-card-name">{aura.name}</span>
								<span class="theme-card-badge">{aura.category}</span>
							</div>
							{#if aura.mood || aura.description}
								<span class="theme-card-sub">{aura.mood} • {aura.layersCount} layers</span>
							{/if}
						</button>
					{/each}

				{:else if currentView === 'gradient'}
					{#each filteredGradients as grad (grad.id)}
						<button
							type="button"
							class="theme-gradient-card"
							class:active={themeState.isGradient && themeState.activeGradient === grad.id}
							title="{grad.name} — {grad.colors.join(', ')}"
							onclick={() => {
								themeState.setGradient(grad.id);
							}}
						>
							<div class="gradient-card-bar" style:background={grad.css} style:pointer-events="none !important">
								<div class="gradient-card-colors">
									{#each grad.colors as col}
										<span class="gradient-dot" style:background-color={col}></span>
									{/each}
								</div>
							</div>
							<div class="theme-card-header">
								<span class="theme-card-name">{grad.name}</span>
								<span class="theme-card-badge">{grad.colors.length}c</span>
							</div>
						</button>
					{/each}

				{:else if currentView === 'pattern'}
					{#each filteredPatterns as pat (pat.id)}
						<button
							type="button"
							class="theme-aura-card"
							class:active={themeState.isPattern && themeState.activePattern === pat.id}
							title="{pat.name} ({pat.category}) — {pat.description || ''}"
							onclick={() => themeState.setPattern(pat.id)}
						>
							<div class="aura-card-preview" style="background-color: var(--bg); position: relative; overflow: hidden; pointer-events: none !important;">
								<div
									style="position: absolute; inset: 0; pointer-events: none !important; {patternStyleToCss(pat.style)}"
								></div>
							</div>
							<div class="theme-card-header">
								<span class="theme-card-name">{pat.name}</span>
								<span class="theme-card-badge">{pat.category}</span>
							</div>
							{#if pat.description}
								<span class="theme-card-sub">{pat.description}</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>

			<!-- Popover Footer -->
			<div class="theme-popover-footer">
				<button
					type="button"
					class="theme-footer-btn"
					onclick={() => (showStudioModal = true)}
					title="Open Theme Studio & Gradient Generator"
				>
					🎨 Studio
				</button>
				<button
					type="button"
					class="is-icon"
					onclick={() => themeState.resetDefault()}
					title="Set default theme (.theme-light-default)"
				>
					Reset
				</button>
				<button
					type="button"
					class="is-icon"
					onclick={() => themeState.cycleRandom()}
					title="Pick a random theme"
				>
					🎲 Random
				</button>
			</div>
		</div>
	{/if}

	{#if showStudioModal}
		<ThemeStudio open={showStudioModal} onClose={() => (showStudioModal = false)} />
	{/if}
</div>
