<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { themeState } from '../state/theme.svelte.js';
	import { LIGHT_THEMES, DARK_THEMES, type ThemeInfo } from '../data/themes.js';
	import Sun from '../icons/Sun.svelte';
	import Moon from '../icons/Moon.svelte';
	import Palette from '../icons/Palette.svelte';
	import Close from '../icons/Close.svelte';

	import { GRADIENT_PRESETS, type GradientPreset } from '../data/gradients.js';

	interface Props {
		studioHref?: string;
		showStudioLink?: boolean;
		showModeToggle?: boolean;
		triggerButton?: Snippet;
	}

	let {
		studioHref = '/studio',
		showStudioLink = true,
		showModeToggle = true,
		triggerButton
	}: Props = $props();

	let activeTab = $state<'all' | 'light' | 'dark' | 'gradients' | 'custom'>('all');
	let searchFilter = $state<string>('');
	let pickerEl = $state<HTMLDivElement | null>(null);

	onMount(() => {
		themeState.init();

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
		if (activeTab === 'light') {
			list = LIGHT_THEMES;
		} else if (activeTab === 'dark') {
			list = DARK_THEMES;
		} else if (activeTab === 'custom') {
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

	const filteredGradients = $derived.by(() => {
		if (!searchFilter.trim()) return GRADIENT_PRESETS;
		const q = searchFilter.toLowerCase().trim();
		return GRADIENT_PRESETS.filter(
			(g) => g.name.toLowerCase().includes(q) || g.id.toLowerCase().includes(q)
		);
	});
</script>

<div class="theme-controls" bind:this={pickerEl}>
	<!-- Quick Mode Flip (Sun/Moon) -->
	{#if showModeToggle}
		<button
			type="button"
			class="theme-icon-btn"
			title={themeState.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
			aria-label={themeState.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
			onclick={() => themeState.toggleMode()}
		>
			{#if themeState.isDark}
				<Sun />
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
			class="theme-icon-btn"
			aria-haspopup="dialog"
			aria-expanded={themeState.isOpen}
			title="Choose theme and aura background"
			onclick={(e) => {
				e.stopPropagation();
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

		<div class="theme-popover" role="dialog" aria-label="Theme and Aura Background Switcher">
			<!-- Style Switcher (Plain vs Aura vs Gradient) -->
			<div class="theme-style-switcher">
				<div class="theme-style-toggle-group">
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={themeState.bgStyle === 'plain'}
						onclick={() => themeState.setBgStyle('plain')}
						title="Clean distraction-free flat backgrounds"
					>
						<span>◻</span> Plain
					</button>
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={themeState.bgStyle === 'aura'}
						onclick={() => themeState.setBgStyle('aura')}
						title="Atmospheric gradient blend aura"
					>
						<span>✨</span> Aura
					</button>
					<button
						type="button"
						class="theme-style-toggle-btn"
						class:active={themeState.bgStyle === 'gradient'}
						onclick={() => {
							if (!themeState.activeGradient && GRADIENT_PRESETS.length > 0) {
								themeState.setGradient(GRADIENT_PRESETS[0].id);
							} else {
								themeState.setBgStyle('gradient');
							}
						}}
						title="Vibrant gradient background presets"
					>
						<span>🌈</span> Gradient
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

			<!-- Filter Tabs -->
			<div class="theme-tabs" style="display: flex; justify-content: space-between; align-items: center;">
				<div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
					<button
						type="button"
						class="theme-tab-btn"
						class:active={activeTab === 'all'}
						onclick={() => (activeTab = 'all')}
					>
						All ({themeState.allThemes.length})
					</button>
					<button
						type="button"
						class="theme-tab-btn"
						class:active={activeTab === 'light'}
						onclick={() => (activeTab = 'light')}
					>
						Light ({LIGHT_THEMES.length})
					</button>
					<button
						type="button"
						class="theme-tab-btn"
						class:active={activeTab === 'dark'}
						onclick={() => (activeTab = 'dark')}
					>
						Dark ({DARK_THEMES.length})
					</button>
					<button
						type="button"
						class="theme-tab-btn"
						class:active={activeTab === 'gradients'}
						onclick={() => (activeTab = 'gradients')}
					>
						Gradients ({GRADIENT_PRESETS.length})
					</button>
					{#if themeState.customThemes.length > 0}
						<button
							type="button"
							class="theme-tab-btn"
							class:active={activeTab === 'custom'}
							onclick={() => (activeTab = 'custom')}
						>
							Custom ({themeState.customThemes.length})
						</button>
					{/if}
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

			<!-- Search Bar -->
			<div class="theme-search-bar">
				<input
					type="text"
					class="theme-search-input"
					placeholder={activeTab === 'gradients' ? 'Search 180+ gradients...' : 'Search themes or auras...'}
					bind:value={searchFilter}
				/>
			</div>

			<!-- Grid Container (Themes or Gradients) -->
			<div class="theme-grid-container">
				{#if activeTab === 'gradients'}
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
							<div class="gradient-card-bar" style:background={grad.css}>
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
				{:else}
					{#each filteredThemes as theme (theme.id)}
						<button
							type="button"
							class="theme-card"
							class:active={themeState.current === theme.id}
							title="{theme.name} — {theme.description} (Aura: {theme.auraName})"
							onclick={() => {
								themeState.setTheme(theme.id);
							}}
						>
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
								✨ {theme.auraName}
							</span>
						</button>
					{/each}
				{/if}
			</div>

			<!-- Popover Footer -->
			<div class="theme-popover-footer">
				<button
					type="button"
					class="theme-footer-btn"
					onclick={() => themeState.resetDefault()}
					title="Set default theme (.theme-light-default)"
				>
					Reset to Default
				</button>
				<button
					type="button"
					class="theme-footer-btn"
					onclick={() => themeState.cycleRandom()}
					title="Pick a random theme"
				>
					🎲 Random
				</button>
			</div>
		</div>
	{/if}
</div>
