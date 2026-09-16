<script lang="ts">
	import { REGISTRY, type RegistryItem } from '$lib/data/registry';

	const SIDEBAR_LAYER = '02_dimensions';
	const layers = REGISTRY.layers;
	const dimsLayer = layers.find((layer) => layer.id === SIDEBAR_LAYER);

	let layerId = $state('all');
	let groupId = $state('all');

	// The dimensions rack lives permanently in the sidebar, so it takes no chip
	// in the Layer row; the Layer filter governs the main section only.
	const layerChips = $derived(layers.filter((layer) => layer.id !== SIDEBAR_LAYER));
	const mainTotal = $derived(layerChips.reduce((n, layer) => n + layer.items.length, 0));

	const activeId = $derived(layerChips.some((layer) => layer.id === layerId) ? layerId : 'all');

	// The Family row belongs to the dimensions rack — the only layer with a
	// taxonomy — and filters the sidebar, not the main section.
	const groups = dimsLayer?.groups ?? [];
	const groupCount = (id: string) =>
		dimsLayer ? dimsLayer.items.filter((item) => item.group === id).length : 0;
	const activeGroup = $derived(groups.some((group) => group.id === groupId) ? groupId : 'all');
	const groupOk = (item: RegistryItem) => activeGroup === 'all' || item.group === activeGroup;

	// The sidebar renders the dimensions rack section-wise: one block per family,
	// honoring the Family filter (a selected family hides the other blocks).
	const sidebarSections = $derived.by(() => {
		if (!dimsLayer) return [];
		const shown = dimsLayer.items.filter(groupOk);
		return (dimsLayer.groups ?? [])
			.map((group) => ({
				id: group.id,
				label: group.label,
				items: shown.filter((item) => (item.group ?? 'other') === group.id)
			}))
			.filter((section) => section.items.length > 0);
	});
	const sidebarShown = $derived(sidebarSections.reduce((n, section) => n + section.items.length, 0));

	const mainLayers = $derived(
		layers
			.filter(
				(layer) => layer.id !== SIDEBAR_LAYER && (activeId === 'all' || layer.id === activeId)
			)
			.map((layer) => ({ ...layer, shown: layer.items }))
			.filter((layer) => layer.shown.length > 0)
	);

	const chip = (active: boolean) =>
		`badge outline sm round ${active ? 'text-theme weight-600' : 'text-secondary'}`;
</script>


<aside class="sidebar-left br">
	<section class="box gp-sm">
		<span class="text-xs tt-u text-muted weight-600">{sidebarShown} shown</span>
		{#if dimsLayer}
			<article class="box gp-sm surface radius-md pad-md">
				<h2 class="row ycenter gp-xs">
					<span class="text-sm weight-600 mono">{dimsLayer.file}</span>
					<span class="text-xs weight-400 text-muted">{sidebarShown}</span>
				</h2>
				{#each sidebarSections as section (section.id)}
					<div class="box gp-xs">
						<span class="text-xs tt-u text-muted weight-600">{section.label}</span>
						<div class="row wrap gp-xs">
							{#each section.items as item (item.kind + item.name)}
								<span class="kbd" title={item.kind}>
									{item.name}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</article>
		{/if}
	</section>
</aside>
<div class="main-section py-xl">
	<section class="box gp-xs">
		<span class="text-xs tt-u text-muted weight-600">Layer</span>
		<div class="row wrap ycenter gp-xs">
			<button class={chip(activeId === 'all')} onclick={() => (layerId = 'all')}>
				all <span class="text-muted">{mainTotal}</span>
			</button>
			{#each layerChips as layer (layer.id)}
				<button
					class={chip(activeId === layer.id)}
					title={layer.file}
					onclick={() => (layerId = layer.id)}
				>
					{layer.label} <span class="text-muted">{layer.items.length}</span>
				</button>
			{/each}
		</div>
	</section>

	<section class="box gp-xs">
		<span class="text-xs tt-u text-muted weight-600">Family — {dimsLayer?.file}</span>
		<div class="row wrap ycenter gp-xs">
			<button class={chip(activeGroup === 'all')} onclick={() => (groupId = 'all')}>
				all <span class="text-muted">{dimsLayer ? dimsLayer.items.length : 0}</span>
			</button>
			{#each groups as group (group.id)}
				<button class={chip(activeGroup === group.id)} onclick={() => (groupId = group.id)}>
					{group.label} <span class="text-muted">{groupCount(group.id)}</span>
				</button>
			{/each}
		</div>
	</section>

	{#each mainLayers as layer (layer.id)}
		<article class="box gp-sm surface border radius-md pad-md">
			<h2 class="row ycenter gp-xs">
				<span class="text-sm weight-600 mono">{layer.file}</span>
				<span class="text-xs weight-400 text-muted">{layer.shown.length}</span>
			</h2>
			<div class="row wrap gp-xs">
				{#each layer.shown as item (item.kind + item.name)}
					<span class="kbd" title={item.group ? `${item.kind} · ${item.group}` : item.kind}>
						{item.name}
					</span>
				{/each}
			</div>
		</article>
	{/each}

</div>
