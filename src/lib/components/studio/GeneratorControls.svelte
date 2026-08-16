<script lang="ts">
	import { studioState } from '../../state/studio.svelte.js';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const categories = [
		{ id: 'fields', label: 'Fields (7)', engines: ['flow', 'sky', 'aurora', 'mesh', 'still', 'retro', 'ios'] },
		{ id: 'stripes', label: 'Stripes (7)', engines: ['linear', 'stripes', 'bars', 'columns', 'prism', 'waves', 'lines'] },
		{ id: 'objects', label: 'Objects (7)', engines: ['rings', 'pixel', 'blocks', 'beehive', 'balls', 'radial', 'conic'] }
	] as const;

	function selectEngine(category: 'fields' | 'stripes' | 'objects', engine: string) {
		studioState.setEngine(engine, category);
	}
</script>

<div class="studio-sidebar {className}">
	<!-- Category Selector -->
	<div class="engine-category-group">
		<span class="engine-category-label">Generator Paradigm</span>
		<div class="engine-type-chips">
			{#each categories as cat}
				<button
					type="button"
					class="engine-type-chip"
					class:active={studioState.activeCategory === cat.id}
					onclick={() => (studioState.activeCategory = cat.id)}
				>
					{cat.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Engine Types in Selected Category -->
	<div class="engine-category-group">
		<span class="engine-category-label">Engine Algorithm</span>
		<div class="engine-type-chips">
			{#each (categories.find(c => c.id === studioState.activeCategory)?.engines || []) as eng}
				<button
					type="button"
					class="engine-type-chip"
					class:active={studioState.recipe.engineType === eng}
					onclick={() => selectEngine(studioState.activeCategory, eng)}
				>
					{eng.toUpperCase()}
				</button>
			{/each}
		</div>
	</div>

	<!-- Engine Parameters Panel -->
	<div class="engine-category-group">
		<span class="engine-category-label">Parameters</span>

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
					<span>Drift</span>
					<span>{studioState.recipe.parameters.drift || 40}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.drift}
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
			<div class="studio-param-row">
				<div class="studio-param-header">
					<span>Speed</span>
					<span>{studioState.recipe.parameters.speed || 40}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					class="studio-param-slider"
					bind:value={studioState.recipe.parameters.speed}
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

	<!-- Swatches & Color Controls -->
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

	<!-- Finish Controls (Soften & Noise) -->
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
