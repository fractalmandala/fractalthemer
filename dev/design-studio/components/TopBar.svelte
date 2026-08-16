<script>
  /** @type {'design'|'motion'|'grid'|'flex'} */
  export let activeView = 'design';

  const tabs = [
    { id: 'design', label: 'Design' },
    { id: 'motion', label: 'Motion' },
    { id: 'grid',   label: 'Grid' },
    { id: 'flex',   label: 'Flexbox' },
  ];

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function selectView(id) {
    activeView = id;
    dispatch('change', id);
  }
</script>

<header class="topbar">
  <div class="topbar-logo">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
      <line x1="12" y1="22" x2="12" y2="15.5"/>
      <polyline points="22 8.5 12 15.5 2 8.5"/>
    </svg>
    Studio
  </div>

  <div class="topbar-tabs">
    {#each tabs as tab}
      <button
        class="topbar-tab"
        class:active={activeView === tab.id}
        on:click={() => selectView(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div class="topbar-spacer"></div>

  <div class="topbar-actions">
    <div class="zoom-display">100%</div>

    <button class="topbar-btn" title="Undo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
      </svg>
    </button>

    <button class="topbar-btn" title="Redo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/>
      </svg>
    </button>

    <button class="topbar-btn" title="Share">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>

    <button class="topbar-btn topbar-btn-primary" title="Export">
      Export
    </button>
  </div>
</header>
