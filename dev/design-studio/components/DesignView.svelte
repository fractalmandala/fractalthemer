<script>
  import { onMount } from 'svelte';

  let mouseX = 0;
  let mouseY = 0;

  const cards = [
    { title: 'Design tokens', desc: 'Centralized variables for colors, spacing, and type.' },
    { title: 'Component library', desc: 'Pre-built, accessible components ready to ship.' },
    { title: 'Documentation', desc: 'Usage guides and API references for every component.' },
  ];
</script>

<div class="view-panel active">
  <div class="canvas-toolbar">
    <div class="canvas-toolbar-group">
      <label>X</label>
      <input type="number" value="120">
      <label>Y</label>
      <input type="number" value="80">
    </div>
    <div class="canvas-toolbar-sep"></div>
    <div class="canvas-toolbar-group">
      <label>W</label>
      <input type="number" value="440">
      <label>H</label>
      <input type="number" value="320">
    </div>
    <div class="canvas-toolbar-sep"></div>
    <div class="canvas-toolbar-group">
      <label>R</label>
      <input type="number" value="6">
    </div>
    <div class="canvas-toolbar-sep"></div>
    <div class="canvas-toolbar-group">
      <label>Opacity</label>
      <input type="number" value="100" min="0" max="100">
    </div>
  </div>

  <div class="canvas-viewport design-canvas" bind:this={viewportEl}>
    <div class="canvas-artboard">
      <div class="design-text heading" style="position:absolute; top:32px; left:32px; right:32px;">
        Build faster, ship sooner
      </div>

      <div class="design-text subtext" style="position:absolute; top:64px; left:32px; right:100px;">
        A design system that scales with your team.
      </div>

      <div class="design-btn" style="position:absolute; top:104px; left:32px;">
        Get started
      </div>

      <div class="design-btn design-btn-secondary" style="position:absolute; top:104px; left:132px;">
        Learn more
      </div>

      <div class="design-img-placeholder" style="position:absolute; top:24px; right:24px; width:140px; height:100px; border-radius:8px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>

      <div style="position:absolute; bottom:24px; left:24px; right:24px; display:flex; gap:12px;">
        {#each cards as card}
          <div style="flex:1; background:oklch(24% 0.012 255); border:1px solid var(--border-subtle); border-radius:6px; padding:14px;">
            <div style="font-size:11px; font-weight:600; color:var(--fg); margin-bottom:4px;">{card.title}</div>
            <div style="font-size:10px; color:var(--fg-muted); line-height:1.4;">{card.desc}</div>
          </div>
        {/each}
      </div>

      <div class="selection-handles">
        <div class="selection-handle tl"></div>
        <div class="selection-handle tr"></div>
        <div class="selection-handle bl"></div>
        <div class="selection-handle br"></div>
        <div class="selection-handle tm"></div>
        <div class="selection-handle bm"></div>
        <div class="selection-handle ml"></div>
        <div class="selection-handle mr"></div>
      </div>
    </div>
  </div>
</div>
