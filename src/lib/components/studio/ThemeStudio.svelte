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
	let toastMessage = $state<string | null>(null);
	let toastTimeout: any;

	function showToast(msg: string) {
		toastMessage = msg;
		if (toastTimeout) clearTimeout(toastTimeout);
		toastTimeout = setTimeout(() => {
			toastMessage = null;
		}, 2500);
	}

	function close() {
		if (onClose) {
			onClose();
		}
	}

	function handleSave() {
		const result = studioState.saveCurrentRecipe();
		showToast(result.status === 'updated' ? `Updated "${result.title}"!` : `Saved "${result.title}"!`);
	}

	function share() {
		const json = JSON.stringify(studioState.recipe);
		const base64 = btoa(encodeURIComponent(json));
		if (typeof window !== 'undefined') {
			const url = `${window.location.origin}${window.location.pathname}#gradient=${base64}`;
			navigator.clipboard.writeText(url);
			showToast('Link copied to clipboard!');
		}
	}

	onMount(() => {
		studioState.init();
	});
</script>

{#if open}
	<div class="theme-studio-root">
		<!-- Top Toast Banner -->
		{#if toastMessage}
			<div class="studio-toast-banner" role="status">
				{toastMessage}
			</div>
		{/if}

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

			<!-- Fixed Studio Action Controls (Top Header Area) -->
			{#if studioState.activeView === 'studio'}
				<div class="studio-header-recipe-controls">
					<span class="studio-recipe-title-chip">
						{studioState.recipe.title} • {studioState.recipe.engineType.toUpperCase()}
					</span>
					<button type="button" class="engine-type-chip" onclick={handleSave}>
						💾 Save
					</button>
					<button type="button" class="engine-type-chip" onclick={share}>
						🔗 Share
					</button>
					<button
						type="button"
						class="engine-type-chip"
						class:active={studioState.previewMode}
						onclick={() => (studioState.previewMode = !studioState.previewMode)}
					>
						{studioState.previewMode ? 'Exit Preview' : '👁 Preview'}
					</button>
					<button type="button" class="engine-type-chip active" onclick={() => (showExportModal = true)}>
						📦 Export
					</button>
				</div>
			{/if}

			<!-- Header Utility Actions -->
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
