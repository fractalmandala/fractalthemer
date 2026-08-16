<script lang="ts">
	import { SILHOUETTE_SHAPES, type SilhouetteShape } from '../../data/silhouettes.js';

	interface Props {
		selectedId?: string;
		onSelect: (shape: SilhouetteShape) => void;
	}

	let { selectedId = 'arch', onSelect }: Props = $props();
</script>

<div class="silhouette-grid-container">
	<div class="silhouette-grid">
		{#each SILHOUETTE_SHAPES as shape (shape.id)}
			<button
				type="button"
				class="silhouette-card"
				class:active={selectedId === shape.id}
				onclick={() => onSelect(shape)}
				title={shape.name}
			>
				<svg viewBox="0 0 100 100" class="silhouette-svg">
					<path d={shape.path} />
				</svg>
			</button>
		{/each}
	</div>
</div>

<style>
	.silhouette-grid-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.silhouette-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 6px;
	}
	.silhouette-card {
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		background: var(--bg-panel);
		border: 1px solid var(--border-subtle);
		border-radius: 8px;
		padding: 4px;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.silhouette-card:hover {
		background: var(--bg-raised);
		border-color: var(--theme-color);
		transform: scale(1.05);
	}
	.silhouette-card.active {
		background: var(--bg-surface);
		border-color: var(--theme-color);
		box-shadow: 0 0 0 2px var(--theme-color)33;
	}
	.silhouette-svg {
		width: 24px;
		height: 24px;
		fill: var(--text-primary);
	}
</style>
