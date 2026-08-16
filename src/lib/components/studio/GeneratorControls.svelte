<script lang="ts">
	import { studioState } from '../../state/studio.svelte.js';
	import { COLOURWAY_PRESETS, type ColourwayPreset } from '../../data/colourways.js';
	import { ARRANGEMENT_PRESETS, type ArrangementPreset } from '../../data/arrangements.js';
	import ColourwayWheel from './ColourwayWheel.svelte';
	import SilhouetteGrid from './SilhouetteGrid.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const categories = [
		{ id: 'fields', label: 'Fields', engines: ['flow', 'sky', 'aurora', 'mesh', 'still', 'retro', 'ios'] },
		{ id: 'stripes', label: 'Stripes', engines: ['linear', 'stripes', 'bars', 'columns', 'prism', 'waves', 'lines'] },
		{ id: 'objects', label: 'Objects', engines: ['rings', 'pixel', 'blocks', 'beehive', 'balls', 'radial', 'conic'] },
		{ id: 'forms', label: 'Forms (24)', engines: ['forms'] }
	] as const;

	function selectEngine(category: 'fields' | 'stripes' | 'objects' | 'forms', engine: string) {
		studioState.setEngine(engine, category);
	}

	const activeArrangements = $derived.by(() => {
		return ARRANGEMENT_PRESETS.filter(a => a.engineType === studioState.recipe.engineType);
	});
</script>

<div class="studio-sidebar {className}">
	<!-- 1. Generator Paradigm / Category -->
	<div class="engine-category-group">
		<span class="engine-category-label">Category</span>
		<div class="engine-type-chips">
			{#each categories as cat}
				<button
					type="button"
					class="engine-type-chip"
					class:active={studioState.activeCategory === cat.id}
					onclick={() => {
						selectEngine(cat.id as any, cat.engines[0]);
					}}
				>
					{cat.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- 2. Engine Algorithms in Selected Category -->
	{#if studioState.activeCategory !== 'forms'}
		<div class="engine-category-group">
			<span class="engine-category-label">Engine Type</span>
			<div class="engine-type-chips">
				{#each (categories.find(c => c.id === studioState.activeCategory)?.engines || []) as eng}
					<button
						type="button"
						class="engine-type-chip"
						class:active={studioState.recipe.engineType === eng}
						onclick={() => selectEngine(studioState.activeCategory as any, eng)}
					>
						{eng.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- 3. 24 SVG Silhouette Forms Grid (when Forms category active) -->
	{#if studioState.recipe.engineType === 'forms' || studioState.activeCategory === 'forms'}
		<div class="engine-category-group">
			<span class="engine-category-label">Silhouettes (from SVG Set)</span>
			<SilhouetteGrid
				selectedId={studioState.recipe.activeSilhouette}
				onSelect={(shape) => studioState.selectSilhouette(shape.id)}
			/>
		</div>
	{/if}

	<!-- 4. Arrangement Presets (if available for engine) -->
	{#if activeArrangements.length > 0}
		<div class="engine-category-group">
			<span class="engine-category-label">Arrangements</span>
			<div class="engine-type-chips">
				{#each activeArrangements as arr (arr.id)}
					<button
						type="button"
						class="engine-type-chip"
						class:active={studioState.recipe.activeArrangement === arr.id}
						onclick={() => studioState.selectArrangement(arr)}
					>
						{arr.name}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- 5. 12 Preset Colourway Pie Wheels -->
	<div class="engine-category-group">
		<div class="studio-param-header">
			<span class="engine-category-label">Colourways</span>
			<span style="font-size: 11px; color: var(--text-muted);">{COLOURWAY_PRESETS.length}</span>
		</div>
		<div class="colourways-grid">
			{#each COLOURWAY_PRESETS as cw (cw.id)}
				<ColourwayWheel
					colourway={cw}
					active={studioState.recipe.activeColourway === cw.id}
					onSelect={(c) => studioState.selectColourway(c)}
				/>
			{/each}
		</div>
	</div>

	<!-- 6. Engine-Specific Parameter Sliders -->
	<div class="engine-category-group">
		<span class="engine-category-label">Engine Parameters</span>

		{#if studioState.recipe.engineType === 'flow' || studioState.recipe.engineType === 'mesh'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Scale</span>
					<span>{studioState.recipe.parameters.scale || 50}%</span>
				</div>
				<input
					type="range"
					min="10"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.scale}
				/>
			</div>
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Distortion</span>
					<span>{studioState.recipe.parameters.distortion || 40}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.distortion}
				/>
			</div>
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Swirl</span>
					<span>{studioState.recipe.parameters.swirl || 10}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.swirl}
				/>
			</div>
		{/if}

		{#if studioState.recipe.engineType === 'sky'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Elevation</span>
					<span>{studioState.recipe.parameters.elevation || 30}°</span>
				</div>
				<input
					type="range"
					min="0"
					max="90"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.elevation}
				/>
			</div>
		{/if}

		{#if studioState.recipe.engineType === 'aurora'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Lights Intensity</span>
					<span>{studioState.recipe.parameters.lights || 50}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.lights}
				/>
			</div>
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Fold</span>
					<span>{studioState.recipe.parameters.fold || 50}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.fold}
				/>
			</div>
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Spread</span>
					<span>{studioState.recipe.parameters.spread || 60}%</span>
				</div>
				<input
					type="range"
					min="10"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.spread}
				/>
			</div>
		{/if}

		{#if studioState.recipe.engineType === 'bars' || studioState.recipe.engineType === 'stripes' || studioState.recipe.engineType === 'columns'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Count</span>
					<span>{studioState.recipe.parameters.count || 24}</span>
				</div>
				<input
					type="range"
					min="4"
					max="64"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.count}
				/>
			</div>
		{/if}

		{#if studioState.recipe.engineType === 'lines'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Thickness</span>
					<span>{studioState.recipe.parameters.thickness || 24}px</span>
				</div>
				<input
					type="range"
					min="6"
					max="64"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.thickness}
				/>
			</div>
		{/if}

		{#if studioState.recipe.engineType === 'beehive' || studioState.recipe.engineType === 'blocks' || studioState.recipe.engineType === 'pixel'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Cell Size</span>
					<span>{studioState.recipe.parameters.cellSize || 40}px</span>
				</div>
				<input
					type="range"
					min="16"
					max="80"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.cellSize}
				/>
			</div>
		{/if}

		{#if studioState.recipe.engineType === 'linear' || studioState.recipe.engineType === 'conic'}
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Angle</span>
					<span>{studioState.recipe.parameters.angle || 45}°</span>
				</div>
				<input
					type="range"
					min="0"
					max="360"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.angle}
				/>
			</div>
		{/if}
	</div>

	<!-- 7. Active Swatches / Color Spots -->
	<div class="studio-swatches-section">
		<div class="studio-param-header">
			<span class="engine-category-label">Color Spots ({studioState.recipe.pins.length})</span>
			<div style="display: flex; gap: 6px;">
				<button type="button" class="engine-type-chip" onclick={() => studioState.shuffleColors()}>
					🎲 Shuffle
				</button>
				<button type="button" class="engine-type-chip" onclick={() => studioState.addPin()}>
					+ Add
				</button>
			</div>
		</div>

		{#each studioState.recipe.pins as pin (pin.id)}
			<div class="studio-swatch-item">
				<div class="studio-swatch-left">
					<input
						type="color"
						value={pin.color}
						class="studio-swatch-dot"
						style="background-color: {pin.color}; cursor: pointer;"
						oninput={(e) => studioState.updatePin(pin.id, { color: e.currentTarget.value })}
					/>
					<span class="studio-swatch-hex">{pin.color}</span>
				</div>
				<button
					type="button"
					class="engine-type-chip"
					style="padding: 2px 6px; font-size: 10px;"
					disabled={studioState.recipe.pins.length <= 2}
					onclick={() => studioState.removePin(pin.id)}
				>
					✕
				</button>
			</div>
		{/each}
	</div>

	<!-- 8. Finish & Texture -->
	<div class="engine-category-group">
		<span class="engine-category-label">Finish & Texture</span>
		<div class="studio-param-row">
			<div class="studio-param-header">
				<span>Soften (Blur)</span>
				<span>{studioState.recipe.soften}px</span>
			</div>
			<input
				type="range"
				min="0"
				max="60"
				class="studio-param-slider"
				bind:value={studioState.recipe.soften}
			/>
		</div>
		<div class="studio-param-row">
			<div class="studio-param-header">
				<span>Noise (Grain)</span>
				<span>{studioState.recipe.noise}%</span>
			</div>
			<input
				type="range"
				min="0"
				max="20"
				class="studio-param-slider"
				bind:value={studioState.recipe.noise}
			/>
		</div>
	</div>
</div>

<style>
	.colourways-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}
</style>
