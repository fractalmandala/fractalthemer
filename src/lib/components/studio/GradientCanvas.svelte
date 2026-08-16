<script lang="ts">
	import { onMount } from 'svelte';
	import { studioState, type CanvasPin } from '../../state/studio.svelte.js';
	import TimelineBar from './TimelineBar.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	let canvasEl: HTMLCanvasElement | null = $state(null);
	let containerEl: HTMLDivElement | null = $state(null);
	let draggingPinId: string | null = $state(null);
	let draggingRingPinId: string | null = $state(null);
	let sampleText = $state('Tranquil');

	function startDragPin(e: PointerEvent, pinId: string) {
		e.stopPropagation();
		draggingPinId = pinId;
		studioState.activePinId = pinId;
		(e.currentTarget as HTMLElement)?.setPointerCapture(e.pointerId);
	}

	function startDragRing(e: PointerEvent, pinId: string) {
		e.stopPropagation();
		draggingRingPinId = pinId;
		studioState.activePinId = pinId;
		(e.currentTarget as HTMLElement)?.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const px = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
		const py = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

		if (draggingPinId) {
			studioState.updatePin(draggingPinId, { x: Math.round(px), y: Math.round(py) });
		} else if (draggingRingPinId) {
			const pin = studioState.recipe.pins.find(p => p.id === draggingRingPinId);
			if (pin) {
				const dx = ((px - pin.x) / 100) * rect.width;
				const dy = ((py - pin.y) / 100) * rect.height;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const radiusPct = Math.max(10, Math.min(100, Math.round((dist / (rect.width * 0.5)) * 100)));
				studioState.updatePin(draggingRingPinId, { radius: radiusPct });
			}
		}
	}

	function onPointerUp(e: PointerEvent) {
		draggingPinId = null;
		draggingRingPinId = null;
	}

	// 60fps Procedural Multi-Engine Renderer
	function renderCanvas() {
		if (!canvasEl || !containerEl) return;
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const width = canvasEl.width;
		const height = canvasEl.height;
		ctx.clearRect(0, 0, width, height);

		const { pins, engineType, parameters, soften } = studioState.recipe;
		if (pins.length === 0) return;

		// Render based on generator engine type
		switch (engineType) {
			case 'linear': {
				const angle = Number(parameters.angle || 45) * (Math.PI / 180);
				const x1 = width / 2 - Math.cos(angle) * (width / 2);
				const y1 = height / 2 - Math.sin(angle) * (height / 2);
				const x2 = width / 2 + Math.cos(angle) * (width / 2);
				const y2 = height / 2 + Math.sin(angle) * (height / 2);
				const grad = ctx.createLinearGradient(x1, y1, x2, y2);
				pins.forEach((p, idx) => {
					grad.addColorStop(idx / Math.max(1, pins.length - 1), p.color);
				});
				ctx.fillStyle = grad;
				ctx.fillRect(0, 0, width, height);
				break;
			}
			case 'radial':
			case 'rings': {
				ctx.fillStyle = pins[pins.length - 1]?.color || '#000';
				ctx.fillRect(0, 0, width, height);
				pins.forEach((p) => {
					const cx = (p.x / 100) * width;
					const cy = (p.y / 100) * height;
					const r = (p.radius / 100) * Math.min(width, height) * 0.8;
					const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(10, r));
					radGrad.addColorStop(0, p.color);
					radGrad.addColorStop(1, 'transparent');
					ctx.fillStyle = radGrad;
					ctx.fillRect(0, 0, width, height);
				});
				break;
			}
			case 'conic': {
				const cx = width / 2;
				const cy = height / 2;
				const conic = ctx.createConicGradient(0, cx, cy);
				pins.forEach((p, idx) => {
					conic.addColorStop(idx / Math.max(1, pins.length - 1), p.color);
				});
				ctx.fillStyle = conic;
				ctx.fillRect(0, 0, width, height);
				break;
			}
			case 'bars': {
				const count = Math.max(4, Math.min(64, Number(parameters.count || 24)));
				const barWidth = width / count;
				ctx.fillStyle = pins[0]?.color || '#111';
				ctx.fillRect(0, 0, width, height);
				for (let i = 0; i < count; i++) {
					const t = i / count;
					const pinIdx = Math.min(pins.length - 1, Math.floor(t * pins.length));
					const pin = pins[pinIdx];
					const hRatio = Math.sin(t * Math.PI) * 0.7 + 0.2;
					const barH = height * hRatio;
					ctx.fillStyle = pin.color;
					ctx.fillRect(i * barWidth, height - barH, barWidth - 2, barH);
				}
				break;
			}
			case 'beehive':
			case 'blocks': {
				const cellSize = Math.max(16, Math.min(80, Number(parameters.cellSize || 40)));
				for (let x = 0; x < width; x += cellSize) {
					for (let y = 0; y < height; y += cellSize) {
						const dist = Math.sqrt(Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2));
						const pinIdx = Math.floor((dist / Math.max(width, height)) * pins.length) % pins.length;
						ctx.fillStyle = pins[pinIdx].color;
						ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
					}
				}
				break;
			}
			default: {
				// Flow / Aurora / Mesh / Sky / Still / Retro / iOS: Multi-Point Radial Gaussian Simulation
				ctx.fillStyle = pins[pins.length - 1]?.color || '#0d0d0d';
				ctx.fillRect(0, 0, width, height);
				pins.forEach((p) => {
					const cx = (p.x / 100) * width;
					const cy = (p.y / 100) * height;
					const r = (p.radius / 100) * Math.max(width, height) * 0.9;
					const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(20, r));
					grad.addColorStop(0, p.color);
					grad.addColorStop(0.7, p.color + 'AA');
					grad.addColorStop(1, 'transparent');
					ctx.fillStyle = grad;
					ctx.fillRect(0, 0, width, height);
				});
				break;
			}
		}
	}

	$effect(() => {
		// Re-render when pins or parameters update
		const _ = studioState.recipe.pins.length + studioState.recipe.engineType + studioState.recipe.soften;
		renderCanvas();
	});

	onMount(() => {
		if (canvasEl && containerEl) {
			canvasEl.width = containerEl.clientWidth || 800;
			canvasEl.height = containerEl.clientHeight || 500;
			renderCanvas();
		}
	});
</script>

<div
	class="gradient-canvas-viewport {className}"
	bind:this={containerEl}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
>
	<!-- Live Rendered Canvas -->
	<canvas
		bind:this={canvasEl}
		class="gradient-canvas-buffer"
		style="filter: blur({studioState.recipe.soften}px);"
	></canvas>

	<!-- Noise Dither Overlay -->
	{#if studioState.recipe.noise > 0}
		<div
			class="gradient-noise-overlay"
			style="opacity: {studioState.recipe.noise / 100};"
		></div>
	{/if}

	<!-- Top Utility Bar -->
	<div class="canvas-top-bar">
		<button
			type="button"
			class="canvas-util-btn"
			class:active={studioState.hideTags}
			onclick={() => (studioState.hideTags = !studioState.hideTags)}
		>
			{studioState.hideTags ? 'Show tags' : 'Hide tags'}
		</button>
		<button
			type="button"
			class="canvas-util-btn"
			class:active={studioState.contrastOverlay}
			onclick={() => (studioState.contrastOverlay = !studioState.contrastOverlay)}
		>
			Contrast
		</button>
	</div>

	<!-- Center Typography Preview -->
	<div class="canvas-center-typography" class:contrast-check={studioState.contrastOverlay}>
		<h1 contenteditable="true" bind:innerText={sampleText} spellcheck="false">
			{sampleText}
		</h1>
	</div>

	<!-- Interactive Draggable Pins Layer -->
	{#if !studioState.hideTags && !studioState.previewMode}
		<div class="canvas-pins-layer">
			{#each studioState.recipe.pins as pin (pin.id)}
				<div
					class="canvas-pin"
					class:active={studioState.activePinId === pin.id}
					style="left: {pin.x}%; top: {pin.y}%;"
					onpointerdown={(e) => startDragPin(e, pin.id)}
				>
					<!-- Inner Core Pin -->
					<div
						class="canvas-pin-dot"
						style="background-color: {pin.color};"
					></div>

					<!-- Outer Reach Ring -->
					<div
						class="canvas-pin-ring"
						style="width: {pin.radius * 2.2}px; height: {pin.radius * 2.2}px;"
						onpointerdown={(e) => startDragRing(e, pin.id)}
					></div>

					<!-- Color Tag / Label -->
					<span class="canvas-pin-tag">
						{pin.color}
					</span>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Bottom Timeline Bar -->
	{#if !studioState.previewMode}
		<div class="canvas-bottom-timeline">
			<TimelineBar />
		</div>
	{/if}
</div>

<style>
	.gradient-canvas-viewport {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 480px;
		border-radius: 12px;
		overflow: hidden;
		background: #000000;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		user-select: none;
		touch-action: none;
	}
	.gradient-canvas-buffer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: filter 0.15s ease;
	}
	.gradient-noise-overlay {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		pointer-events: none;
	}
	.canvas-top-bar {
		position: absolute;
		top: 14px;
		left: 14px;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.canvas-util-btn {
		padding: 4px 10px;
		font-size: 11px;
		font-weight: 600;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: rgba(0, 0, 0, 0.35);
		color: #FFFFFF;
		backdrop-filter: blur(6px);
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.canvas-util-btn:hover {
		background: rgba(0, 0, 0, 0.6);
	}
	.canvas-util-btn.active {
		background: #FFFFFF;
		color: #000000;
	}
	.canvas-center-typography {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 5;
	}
	.canvas-center-typography h1 {
		font-size: 56px;
		font-weight: 700;
		color: #FFFFFF;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
		outline: none;
		pointer-events: auto;
		cursor: text;
		margin: 0;
		font-family: serif;
	}
	.canvas-center-typography.contrast-check h1 {
		background: rgba(0, 0, 0, 0.7);
		padding: 8px 24px;
		border-radius: 8px;
		box-shadow: 0 0 0 2px #52B788;
	}
	.canvas-pins-layer {
		position: absolute;
		inset: 0;
		z-index: 15;
		pointer-events: none;
	}
	.canvas-pin {
		position: absolute;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: auto;
		cursor: grab;
	}
	.canvas-pin:active {
		cursor: grabbing;
	}
	.canvas-pin-dot {
		width: 16px;
		height: 16px;
		border-radius: 9999px;
		border: 2px solid #FFFFFF;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		z-index: 2;
	}
	.canvas-pin-ring {
		position: absolute;
		border-radius: 9999px;
		border: 1.5px dashed rgba(255, 255, 255, 0.6);
		pointer-events: auto;
		cursor: nwse-resize;
		transition: border-color 0.15s ease;
	}
	.canvas-pin-ring:hover {
		border-color: #FFFFFF;
	}
	.canvas-pin-tag {
		position: absolute;
		top: 18px;
		font-size: 10px;
		font-weight: 700;
		font-family: monospace;
		padding: 2px 6px;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.65);
		color: #FFFFFF;
		backdrop-filter: blur(4px);
		white-space: nowrap;
	}
	.canvas-bottom-timeline {
		position: absolute;
		bottom: 14px;
		left: 14px;
		right: 14px;
		z-index: 10;
	}
</style>
