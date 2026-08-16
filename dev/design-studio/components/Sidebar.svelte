<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const layers = [
    { id: 'hero',        name: 'Hero Section',  indent: 0, icon: 'rect',  selected: true },
    { id: 'heading',     name: 'Heading',       indent: 1, icon: 'text' },
    { id: 'subtext',     name: 'Subtext',       indent: 1, icon: 'text' },
    { id: 'cta-primary', name: 'CTA Primary',   indent: 1, icon: 'rect' },
    { id: 'cta-secondary', name: 'CTA Secondary', indent: 1, icon: 'rect' },
    { id: 'image',       name: 'Image',         indent: 0, icon: 'image' },
    { id: 'card-1',      name: 'Card 1',        indent: 0, icon: 'rect' },
    { id: 'card-2',      name: 'Card 2',        indent: 0, icon: 'rect' },
    { id: 'card-3',      name: 'Card 3',        indent: 0, icon: 'rect' },
  ];

  let selectedId = 'hero';

  function select(id) {
    selectedId = id;
    dispatch('select', id);
  }

  const iconPaths = {
    rect: 'M3 3h18v18H3z',
    text: 'M4 7 4 4 20 4 20 7 M12 4 12 20',
    image: 'M3 3h18v18H3z M8.5 8.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0 M21 15 16 10 5 21',
  };

  const eyePath = 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0';
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <span class="sidebar-title">Layers</span>
    <button class="sidebar-action">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  </div>

  <div class="sidebar-content">
    {#each layers as layer}
      <div
        class="layer-item"
        class:selected={selectedId === layer.id}
        class:layer-indent={layer.indent === 1}
        class:layer-indent-2={layer.indent === 2}
        on:click={() => select(layer.id)}
        role="button"
        tabindex="0"
      >
        <div class="layer-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d={iconPaths[layer.icon] || iconPaths.rect}/>
          </svg>
        </div>
        <span class="layer-name">{layer.name}</span>
        <div class="layer-visibility">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d={eyePath}/>
          </svg>
        </div>
      </div>
    {/each}
  </div>
</aside>
