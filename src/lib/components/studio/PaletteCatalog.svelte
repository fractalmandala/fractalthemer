<script lang="ts">
	import { studioState } from '../../state/studio.svelte.js';
	import type { ArtisanColor } from '../../data/artisan-colors.js';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const categories = ['all', 'grey', 'red', 'yellow', 'green', 'blue', 'purple', 'brown'];
	let copiedHex = $state<string | null>(null);

	const filteredColors = $derived.by(() => {
		let list = [...studioState.artisanColors];

		// Category filter
		if (studioState.paletteCategory !== 'all') {
			list = list.filter(c => c.category === studioState.paletteCategory);
		}

		// Search filter
		if (studioState.paletteSearch.trim()) {
			const q = studioState.paletteSearch.toLowerCase().trim();
			list = list.filter(c => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q));
		}

		// Sort
		if (studioState.paletteSort === 'light-dark') {
			list.sort((a, b) => b.contrastBlack - a.contrastBlack);
		} else if (studioState.paletteSort === 'dark-light') {
			list.sort((a, b) => a.contrastBlack - b.contrastBlack);
		}

		return list;
	});

	function copyColor(color: ArtisanColor) {
		navigator.clipboard.writeText(color.hex);
		copiedHex = color.hex;
		setTimeout(() => {
			copiedHex = null;
		}, 1800);
	}
</script>

<div class="palette-catalog-container {className}">
	<!-- Search & Filter Controls -->
	<div class="palette-catalog-toolbar">
		<input
			type="text"
			class="palette-catalog-search"
			placeholder="Search names or hex..."
			bind:value={studioState.paletteSearch}
		/>

		<div class="engine-type-chips">
			{#each categories as cat}
				<button
					type="button"
					class="engine-type-chip"
					class:active={studioState.paletteCategory === cat}
					onclick={() => (studioState.paletteCategory = cat)}
				>
					{cat.toUpperCase()}
				</button>
			{/each}
		</div>

		<div class="palette-sort-group">
			<button
				type="button"
				class="engine-type-chip"
				class:active={studioState.paletteSort === 'hue'}
				onclick={() => (studioState.paletteSort = 'hue')}
			>
				Hue
			</button>
			<button
				type="button"
				class="engine-type-chip"
				class:active={studioState.paletteSort === 'light-dark'}
				onclick={() => (studioState.paletteSort = 'light-dark')}
			>
				Light to dark
			</button>
			<button
				type="button"
				class="engine-type-chip"
				class:active={studioState.paletteSort === 'dark-light'}
				onclick={() => (studioState.paletteSort = 'dark-light')}
			>
				Dark to light
			</button>
		</div>
	</div>

	<!-- Swatches Grid -->
	<div class="palette-catalog-grid">
		{#each filteredColors as color (color.hex)}
			<button type="button" class="palette-catalog-card" onclick={() => copyColor(color)}>
				<div class="palette-catalog-swatch" style="background-color: {color.hex};">
					{#if copiedHex === color.hex}
						<span class="palette-copied-pill">Copied!</span>
					{/if}
				</div>
				<div class="palette-catalog-info">
					<span class="palette-catalog-name">{color.name}</span>
					<span class="palette-catalog-hex">{color.hex}</span>
					<span class="palette-catalog-badge">
						{color.contrastBlack >= 7 ? 'AAA' : color.contrastBlack >= 4.5 ? 'AA' : 'A'}
					</span>
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.palette-catalog-container {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.palette-catalog-toolbar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: space-between;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--border-subtle);
	}
	.palette-catalog-search {
		width: 240px;
		height: 34px;
		padding: 6px 12px;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--bg-surface);
		color: var(--text-primary);
		font-size: 13px;
		outline: none;
	}
	.palette-catalog-search:focus {
		border-color: var(--theme-color);
	}
	.palette-sort-group {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.palette-catalog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 12px;
	}
	.palette-catalog-card {
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--border);
		background: var(--bg-surface);
		cursor: pointer;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}
	.palette-catalog-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
	}
	.palette-catalog-swatch {
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.palette-copied-pill {
		padding: 2px 8px;
		background: rgba(0, 0, 0, 0.7);
		color: #FFFFFF;
		font-size: 11px;
		font-weight: 700;
		border-radius: 9999px;
	}
	.palette-catalog-info {
		padding: 8px 10px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.palette-catalog-name {
		font-size: 12px;
		font-weight: 600;
		color: var(--text-primary);
	}
	.palette-catalog-hex {
		font-size: 11px;
		font-family: monospace;
		color: var(--text-muted);
	}
	.palette-catalog-badge {
		font-size: 9px;
		font-weight: 700;
		color: var(--theme-color);
		align-self: flex-start;
		margin-top: 2px;
	}
</style>
