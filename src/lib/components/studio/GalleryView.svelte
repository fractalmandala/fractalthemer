<script lang="ts">
	import { studioState } from '../../state/studio.svelte.js';
	import type { GalleryPreset } from '../../data/gallery-presets.js';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const filterTags = [
		'all', 'Flow', 'Mesh', 'Aurora', 'Bars', 'Columns', 'Prism', 'Waves',
		'Lines', 'Beehive', 'Blocks', 'Rings', 'Pixel', 'Radial', 'Conic',
		'Dark', 'Light', 'Mono'
	];

	const filteredPresets = $derived.by(() => {
		if (studioState.galleryFilter === 'all') {
			return studioState.galleryPresets;
		}
		return studioState.galleryPresets.filter(p =>
			p.tags.some(t => t.toLowerCase() === studioState.galleryFilter.toLowerCase()) ||
			p.engineType.toLowerCase() === studioState.galleryFilter.toLowerCase()
		);
	});

	function selectPreset(preset: GalleryPreset) {
		studioState.loadPreset(preset);
	}
</script>

<div class="gallery-container {className}">
	<!-- Category Filter Chips -->
	<div class="engine-type-chips">
		{#each filterTags as tag}
			<button
				type="button"
				class="engine-type-chip"
				class:active={studioState.galleryFilter === tag.toLowerCase()}
				onclick={() => (studioState.galleryFilter = tag.toLowerCase())}
			>
				{tag}
			</button>
		{/each}
	</div>

	<!-- Presets Grid -->
	<div class="gallery-grid">
		{#each filteredPresets as preset (preset.id)}
			<button type="button" class="gallery-card" onclick={() => selectPreset(preset)}>
				<div
					class="gallery-card-preview"
					style="background: linear-gradient(135deg, {preset.colors.join(', ')});"
				></div>
				<div class="gallery-card-title">{preset.title}</div>
				<div style="display: flex; gap: 4px;">
					{#each preset.colors as color}
						<span
							style="width: 10px; height: 10px; border-radius: 9999px; background-color: {color}; border: 1px solid rgba(0,0,0,0.1);"
						></span>
					{/each}
				</div>
			</button>
		{/each}
	</div>
</div>
