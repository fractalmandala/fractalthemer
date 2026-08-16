<script lang="ts">
	import { studioState, type StudioRecipe } from '../../state/studio.svelte.js';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	function loadRecipe(recipe: StudioRecipe) {
		studioState.recipe = JSON.parse(JSON.stringify(recipe));
		studioState.activeCategory = recipe.category;
		studioState.activeView = 'studio';
	}
</script>

<div class="saved-view-container {className}">
	{#if studioState.savedRecipes.length === 0}
		<div class="saved-empty-state">
			<div class="saved-empty-icon">🎨</div>
			<h3>No saved blends yet</h3>
			<p>Save blends from the studio or the gallery and they'll wait here.</p>
			<button
				type="button"
				class="engine-type-chip active"
				style="padding: 8px 16px; margin-top: 12px;"
				onclick={() => (studioState.activeView = 'studio')}
			>
				Open Studio
			</button>
		</div>
	{:else}
		<div class="gallery-grid">
			{#each studioState.savedRecipes as recipe (recipe.id)}
				<div class="gallery-card">
					<button
						type="button"
						style="background: transparent; border: none; padding: 0; width: 100%; text-align: left; cursor: pointer;"
						onclick={() => loadRecipe(recipe)}
					>
						<div
							class="gallery-card-preview"
							style="background: linear-gradient(135deg, {recipe.pins.map(p => p.color).join(', ')});"
						></div>
					</button>
					<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
						<span class="gallery-card-title">{recipe.title}</span>
						<button
							type="button"
							class="engine-type-chip"
							style="padding: 2px 6px; font-size: 10px;"
							onclick={() => studioState.deleteSavedRecipe(recipe.id)}
						>
							✕
						</button>
					</div>
					<span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">
						{recipe.engineType} • {recipe.pins.length} Colors
					</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.saved-view-container {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}
	.saved-empty-state {
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 320px;
		gap: 8px;
		color: var(--text-muted);
	}
	.saved-empty-icon {
		font-size: 48px;
		margin-bottom: 8px;
	}
	.saved-empty-state h3 {
		font-size: 16px;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}
	.saved-empty-state p {
		font-size: 13px;
		margin: 0;
	}
</style>
