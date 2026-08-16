<script lang="ts">
	import { onMount } from 'svelte';
	import { studioState } from '../../state/studio.svelte.js';
	import { themeState } from '../../state/theme.svelte.js';
	import GradientCanvas from './GradientCanvas.svelte';
	import GeneratorControls from './GeneratorControls.svelte';
	import GalleryView from './GalleryView.svelte';
	import PaletteCatalog from './PaletteCatalog.svelte';
	import SavedView from './SavedView.svelte';
	import PaletteGenerator from './PaletteGenerator.svelte';
	import ExportModal from './ExportModal.svelte';

	interface Props {
		open?: boolean;
		onClose?: () => void;
	}

	let { open = true, onClose }: Props = $props();

	let showExportModal = $state(false);
	let shareToast = $state(false);

	function close() {
		if (onClose) {
			onClose();
		}
	}

	function share() {
		const json = JSON.stringify(studioState.recipe);
		const base64 = btoa(encodeURIComponent(json));
		if (typeof window !== 'undefined') {
			const url = `${window.location.origin}${window.location.pathname}#gradient=${base64}`;
			navigator.clipboard.writeText(url);
			shareToast = true;
			setTimeout(() => {
				shareToast = false;
			}, 2000);
		}
	}

	onMount(() => {
		studioState.init();
	});
</script>

{#if open}
	<div class="theme-studio-root">
		<!-- Top Studio Header -->
		<header class="studio-header">
			<div class="studio-brand">
				<span>🎨</span>
				<span>Gradient Studio & Themer</span>
			</div>

			<!-- 5 Primary Navigation Tabs -->
			<nav class="studio-nav-tabs">
				<button
					type="button"
					class="studio-nav-btn"
					class:active={studioState.activeView === 'studio'}
					onclick={() => (studioState.activeView = 'studio')}
				>
					Studio
				</button>
				<button
					type="button"
					class="studio-nav-btn"
					class:active={studioState.activeView === 'gallery'}
					onclick={() => (studioState.activeView = 'gallery')}
				>
					Gallery ({studioState.galleryPresets.length})
				</button>
				<button
					type="button"
					class="studio-nav-btn"
					class:active={studioState.activeView === 'palette'}
					onclick={() => (studioState.activeView = 'palette')}
				>
					Palette
				</button>
				<button
					type="button"
					class="studio-nav-btn"
					class:active={studioState.activeView === 'palette-gen'}
					onclick={() => (studioState.activeView = 'palette-gen')}
				>
					✨ Theme Generator
				</button>
				<button
					type="button"
					class="studio-nav-btn"
					class:active={studioState.activeView === 'saved'}
					onclick={() => (studioState.activeView = 'saved')}
				>
					Saved ({studioState.savedRecipes.length})
				</button>
			</nav>

			<!-- Header Actions -->
			<div class="studio-header-actions">
				<button
					type="button"
					class="engine-type-chip"
					onclick={() => themeState.toggleMode()}
					title="Toggle Mode"
				>
					{themeState.isDark ? '☀️ Light' : '🌙 Dark'}
				</button>
				<button
					type="button"
					class="engine-type-chip"
					onclick={close}
					title="Close Studio"
				>
					✕
				</button>
			</div>
		</header>

		<!-- Main Studio View Body -->
		<div class="studio-body">
			{#if studioState.activeView === 'studio'}
				<div class="studio-workbench">
					<!-- Left Sidebar Generator Controls -->
					<GeneratorControls />

					<!-- Center Live Canvas Viewport -->
					<div class="studio-canvas-container">
						<GradientCanvas />
					</div>
				</div>

				<!-- Floating Bottom Action Bar -->
				<div class="studio-floating-bar">
					<span class="studio-bar-title">{studioState.recipe.title} • {studioState.recipe.engineType.toUpperCase()}</span>
					<button type="button" class="engine-type-chip" onclick={() => studioState.saveCurrentRecipe()}>
						💾 Save
					</button>
					<button type="button" class="engine-type-chip" onclick={share}>
						{shareToast ? '✓ Link Copied!' : '🔗 Share'}
					</button>
					<button type="button" class="engine-type-chip" onclick={() => (studioState.previewMode = !studioState.previewMode)}>
						{studioState.previewMode ? 'Exit Preview' : '👁 Preview'}
					</button>
					<button type="button" class="engine-type-chip active" onclick={() => (showExportModal = true)}>
						📦 Export
					</button>
				</div>
			{:else if studioState.activeView === 'gallery'}
				<GalleryView />
			{:else if studioState.activeView === 'palette'}
				<PaletteCatalog />
			{:else if studioState.activeView === 'palette-gen'}
				<div style="flex: 1; padding: 24px; overflow-y: auto;">
					<PaletteGenerator />
				</div>
			{:else if studioState.activeView === 'saved'}
				<SavedView />
			{/if}
		</div>

		<!-- Export Dialog -->
		{#if showExportModal}
			<ExportModal onClose={() => (showExportModal = false)} />
		{/if}
	</div>
{/if}
