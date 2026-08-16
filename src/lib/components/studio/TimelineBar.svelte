<script lang="ts">
	import { studioState, type CanvasPin } from '../../state/studio.svelte.js';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	function selectPin(pin: CanvasPin) {
		studioState.activePinId = pin.id;
	}
</script>

<div class="timeline-bar-container {className}">
	<div class="timeline-hint">
		Bands set how far each colour reaches · the rings on the canvas place it
	</div>

	<div class="timeline-track">
		{#each studioState.recipe.pins as pin (pin.id)}
			<button
				type="button"
				class="timeline-segment"
				class:active={studioState.activePinId === pin.id}
				style="flex: {pin.radius}; background-color: {pin.color};"
				onclick={() => selectPin(pin)}
				title="Select {pin.color} (Radius: {pin.radius}%)"
				aria-label="Select color {pin.color}"
			>
				<span class="timeline-segment-dot" style="background-color: {pin.color};"></span>
			</button>
		{/each}
	</div>
</div>

<style>
	.timeline-bar-container {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		padding: 8px 14px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}
	.timeline-hint {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.75);
		text-align: left;
	}
	.timeline-track {
		display: flex;
		height: 18px;
		border-radius: 9999px;
		overflow: hidden;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
	}
	.timeline-segment {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: flex 0.15s ease, opacity 0.15s ease;
		position: relative;
	}
	.timeline-segment:hover {
		opacity: 0.9;
	}
	.timeline-segment.active {
		box-shadow: inset 0 0 0 2px #FFFFFF;
	}
	.timeline-segment-dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.8);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
	}
</style>
