<script lang="ts">
	import type { ColourwayPreset } from '../../data/colourways.js';

	interface Props {
		colourway: ColourwayPreset;
		active?: boolean;
		onSelect: (colourway: ColourwayPreset) => void;
	}

	let { colourway, active = false, onSelect }: Props = $props();

	function getSlicePath(index: number, total: number): string {
		const startAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
		const endAngle = ((index + 1) / total) * 2 * Math.PI - Math.PI / 2;
		const r = 18;
		const cx = 20;
		const cy = 20;

		const x1 = cx + r * Math.cos(startAngle);
		const y1 = cy + r * Math.sin(startAngle);
		const x2 = cx + r * Math.cos(endAngle);
		const y2 = cy + r * Math.sin(endAngle);

		const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

		return `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
	}
</script>

<button
	type="button"
	class="colourway-wheel-card"
	class:active
	onclick={() => onSelect(colourway)}
	title="{colourway.name}: {colourway.colors.join(', ')}"
>
	<svg class="colourway-wheel-svg" viewBox="0 0 40 40" width="36" height="36">
		{#each colourway.colors as color, idx (idx)}
			<path d={getSlicePath(idx, colourway.colors.length)} fill={color} />
		{/each}
	</svg>
	<span class="colourway-wheel-label">{colourway.name}</span>
</button>

<style>
	.colourway-wheel-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		background: var(--bg-panel);
		border: 1px solid var(--border-subtle);
		border-radius: 8px;
		padding: 8px 4px;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.colourway-wheel-card:hover {
		background: var(--bg-raised);
		border-color: var(--theme-color);
		transform: translateY(-1px);
	}
	.colourway-wheel-card.active {
		border-color: var(--theme-color);
		background: var(--bg-surface);
		box-shadow: 0 0 0 2px var(--theme-color)33;
	}
	.colourway-wheel-svg {
		border-radius: 9999px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
	}
	.colourway-wheel-label {
		font-size: 10px;
		font-weight: 600;
		color: var(--text-secondary);
	}
</style>
