<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let cols = 3;
  let rows = 2;
  let colGap = 8;
  let rowGap = 8;
  let colSize = '1fr';
  let rowSize = '1fr';
  let justifyItems = 'stretch';
  let alignItems = 'stretch';

  $: colTemplate = buildTemplate(cols, colSize);
  $: rowTemplate = buildTemplate(rows, rowSize);
  $: cssOutput = buildCSS(colTemplate, rowTemplate, colGap, rowGap, justifyItems, alignItems);

  function buildTemplate(count, sizing) {
    if (sizing === '1fr') return `repeat(${count}, 1fr)`;
    if (sizing === 'auto') return `repeat(${count}, auto)`;
    if (sizing === 'minmax') return `repeat(${count}, minmax(100px, 1fr))`;
    return `repeat(${count}, 120px)`;
  }

  function buildCSS(cols, rows, cg, rg, ji, ai) {
    return `.container {
  display: grid;
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};
  gap: ${cg}px ${rg}px;
  justify-items: ${ji};
  align-items: ${ai};
}`;
  }

  function setJustifyItems(val) {
    justifyItems = val;
    dispatch('update', { justifyItems });
  }

  function setAlignItems(val) {
    alignItems = val;
    dispatch('update', { alignItems });
  }

  const justifyBtns = [
    { val: 'stretch', label: 'Stretch' },
    { val: 'start',   label: 'Start' },
    { val: 'center',  label: 'Center' },
    { val: 'end',     label: 'End' },
  ];

  const alignBtns = [
    { val: 'stretch', label: 'Stretch' },
    { val: 'start',   label: 'Start' },
    { val: 'center',  label: 'Center' },
    { val: 'end',     label: 'End' },
  ];
</script>

<div class="view-panel">
  <div class="canvas-toolbar">
    <div class="canvas-toolbar-group">
      <span style="font-size:11px; color:var(--fg-secondary);">CSS Grid Layout Generator</span>
    </div>
  </div>

  <div class="grid-canvas-wrap">
    <div
      class="grid-preview"
      style="grid-template-columns: {colTemplate}; grid-template-rows: {rowTemplate}; column-gap:{colGap}px; row-gap:{rowGap}px; justify-items:{justifyItems}; align-items:{alignItems};"
    >
      <div class="grid-cell filled" style="grid-column: 1 / 3; grid-row: 1;">1 / 3</div>
      <div class="grid-cell">3</div>
      <div class="grid-cell">4</div>
      <div class="grid-cell" style="grid-column: 2 / 4;">5 / 6</div>
    </div>
  </div>

  <div class="grid-controls">
    <div class="grid-control-group">
      <label>Columns</label>
      <input type="number" bind:value={cols} min="1" max="12">
    </div>
    <div class="grid-control-group">
      <label>Rows</label>
      <input type="number" bind:value={rows} min="1" max="12">
    </div>
    <div class="grid-control-group">
      <label>Column Gap</label>
      <input type="range" bind:value={colGap} min="0" max="48">
      <div class="grid-control-value">{colGap}px</div>
    </div>
    <div class="grid-control-group">
      <label>Row Gap</label>
      <input type="range" bind:value={rowGap} min="0" max="48">
      <div class="grid-control-value">{rowGap}px</div>
    </div>
    <div class="grid-control-group">
      <label>Column Sizing</label>
      <select bind:value={colSize}>
        <option value="1fr">1fr (equal)</option>
        <option value="auto">auto</option>
        <option value="minmax">minmax(100px, 1fr)</option>
        <option value="fixed">fixed (px)</option>
      </select>
    </div>
    <div class="grid-control-group">
      <label>Row Sizing</label>
      <select bind:value={rowSize}>
        <option value="1fr">1fr (equal)</option>
        <option value="auto">auto</option>
        <option value="minmax">minmax(80px, 1fr)</option>
        <option value="fixed">fixed (px)</option>
      </select>
    </div>
    <div class="grid-control-group">
      <label>Justify Items</label>
      <div class="flex-btn-group">
        {#each justifyBtns as btn}
          <button
            class="flex-btn"
            class:active={justifyItems === btn.val}
            on:click={() => setJustifyItems(btn.val)}
          >{btn.label}</button>
        {/each}
      </div>
    </div>
    <div class="grid-control-group">
      <label>Align Items</label>
      <div class="flex-btn-group">
        {#each alignBtns as btn}
          <button
            class="flex-btn"
            class:active={alignItems === btn.val}
            on:click={() => setAlignItems(btn.val)}
          >{btn.label}</button>
        {/each}
      </div>
    </div>
  </div>

  <div class="grid-css-output">
    <pre>{cssOutput}</pre>
  </div>
</div>
