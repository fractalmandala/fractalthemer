<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let activeTool = 'move';

  const tools = [
    { id: 'move',   key: 'V', title: 'Move',   icon: 'M5 9 2 12 5 15 M9 5 12 2 15 5 M15 19 12 22 9 19 M19 9 22 12 19 15 M2 12 22 12 M12 2 12 22' },
    { id: 'frame',  key: 'F', title: 'Frame',  icon: 'M3 3h18v18H3z M3 9h21 M9 21V9' },
    { id: 'rect',   key: 'R', title: 'Rectangle', icon: 'M3 3h18v18H3z' },
    { id: 'ellipse', key: 'O', title: 'Ellipse', icon: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0' },
    { id: 'line',   key: 'L', title: 'Line',   icon: 'M5 19L19 5' },
    { id: 'pen',    key: 'P', title: 'Pen',    icon: 'M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586 M11 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0' },
    { id: 'text',   key: 'T', title: 'Text',   icon: 'M4 7 4 4 20 4 20 7 M9 20 15 20 M12 4 12 20' },
  ];

  const handTool = { id: 'hand', key: 'H', title: 'Hand' };
  const zoomTool = { id: 'zoom', key: 'Z', title: 'Zoom' };

  function select(id) {
    activeTool = id;
    dispatch('change', id);
  }
</script>

<aside class="toolbar">
  {#each tools as tool}
    <button
      class="tool-btn"
      class:active={activeTool === tool.id}
      title="{tool.title} ({tool.key})"
      on:click={() => select(tool.id)}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d={tool.icon}/>
      </svg>
      <span class="shortcut">{tool.key}</span>
    </button>
  {/each}

  <div class="tool-sep"></div>

  <button
    class="tool-btn"
    class:active={activeTool === handTool.id}
    title="{handTool.title} ({handTool.key})"
    on:click={() => select(handTool.id)}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 11V6a2 2 0 0 0-4 0v1"/>
      <path d="M14 10V4a2 2 0 0 0-4 0v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
    <span class="shortcut">{handTool.key}</span>
  </button>

  <button
    class="tool-btn"
    class:active={activeTool === zoomTool.id}
    title="{zoomTool.title} ({zoomTool.key})"
    on:click={() => select(zoomTool.id)}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
    <span class="shortcut">{zoomTool.key}</span>
  </button>
</aside>
