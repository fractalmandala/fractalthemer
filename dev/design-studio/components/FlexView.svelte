<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let flexDirection = 'row';
  let justifyContent = 'flex-end';
  let alignItemsVal = 'stretch';
  let flexWrap = 'nowrap';
  let gap = 8;

  $: cssOutput = buildCSS(flexDirection, justifyContent, alignItemsVal, flexWrap, gap);

  function buildCSS(dir, justify, align, wrap, g) {
    return `.container {
  display: flex;
  flex-direction: ${dir};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${g}px;
}`;
  }

  function setControl(prop, val) {
    if (prop === 'flex-direction') flexDirection = val;
    if (prop === 'justify-content') justifyContent = val;
    if (prop === 'align-items') alignItemsVal = val;
    if (prop === 'flex-wrap') flexWrap = val;
    dispatch('update', { [prop]: val });
  }

  const controls = [
    {
      prop: 'flex-direction',
      label: 'Direction',
      buttons: [
        { val: 'row',            label: 'Row' },
        { val: 'row-reverse',    label: 'Row Rev' },
        { val: 'column',         label: 'Col' },
        { val: 'column-reverse', label: 'Col Rev' },
      ],
    },
    {
      prop: 'justify-content',
      label: 'Justify Content',
      buttons: [
        { val: 'flex-start',    label: 'Start' },
        { val: 'flex-end',      label: 'End' },
        { val: 'center',        label: 'Center' },
        { val: 'space-between', label: 'Between' },
        { val: 'space-around',  label: 'Around' },
      ],
    },
    {
      prop: 'align-items',
      label: 'Align Items',
      buttons: [
        { val: 'stretch',    label: 'Stretch' },
        { val: 'flex-start', label: 'Start' },
        { val: 'center',     label: 'Center' },
        { val: 'flex-end',   label: 'End' },
      ],
    },
    {
      prop: 'flex-wrap',
      label: 'Wrap',
      buttons: [
        { val: 'nowrap',       label: 'No Wrap' },
        { val: 'wrap',         label: 'Wrap' },
        { val: 'wrap-reverse', label: 'Wrap Rev' },
      ],
    },
  ];

  function getActiveVal(prop) {
    if (prop === 'flex-direction') return flexDirection;
    if (prop === 'justify-content') return justifyContent;
    if (prop === 'align-items') return alignItemsVal;
    if (prop === 'flex-wrap') return flexWrap;
    return '';
  }
</script>

<div class="view-panel">
  <div class="canvas-toolbar">
    <div class="canvas-toolbar-group">
      <span style="font-size:11px; color:var(--fg-secondary);">CSS Flexbox Layout Generator</span>
    </div>
  </div>

  <div class="flex-canvas-wrap">
    <div
      class="flex-preview"
      style="flex-direction:{flexDirection}; justify-content:{justifyContent}; align-items:{alignItemsVal}; flex-wrap:{flexWrap}; gap:{gap}px;"
    >
      <div class="flex-item fi-1">1</div>
      <div class="flex-item fi-2">2</div>
      <div class="flex-item fi-3">3</div>
      <div class="flex-item fi-4">4</div>
    </div>
  </div>

  <div class="flex-controls">
    {#each controls as ctrl}
      <div class="flex-control-group">
        <label>{ctrl.label}</label>
        <div class="flex-btn-group">
          {#each ctrl.buttons as btn}
            <button
              class="flex-btn"
              class:active={getActiveVal(ctrl.prop) === btn.val}
              on:click={() => setControl(ctrl.prop, btn.val)}
            >{btn.label}</button>
          {/each}
        </div>
      </div>
    {/each}

    <div class="flex-control-group">
      <label>Gap</label>
      <input type="range" bind:value={gap} min="0" max="48">
      <div class="grid-control-value">{gap}px</div>
    </div>
  </div>

  <div class="flex-css-output">
    <pre>{cssOutput}</pre>
  </div>
</div>
