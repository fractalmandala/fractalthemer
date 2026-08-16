<script>
  let fill = 'oklch(92% 0.008 250)';
  let fillOpacity = 100;
  let stroke = 'oklch(28% 0.012 255)';
  let strokeWidth = 1;
  let strokeStyle = 'Solid';
  let radiusTL = 6;
  let radiusTR = 6;
  let radiusBL = 6;
  let radiusBR = 6;
  let shadowX = 0;
  let shadowY = 4;
  let shadowBlur = 24;
  let shadowSpread = 0;
  let exportFormat = 'PNG';
  let exportScale = '1x';

  const strokeStyles = ['Solid', 'Dashed', 'Dotted'];
  const exportFormats = ['PNG', 'SVG', 'PDF', 'JPEG', 'WebP'];
  const exportScales = ['1x', '2x', '3x'];
</script>

<aside class="inspector">
  <!-- Position -->
  <div class="inspector-section">
    <div class="inspector-section-title">Position</div>
    <div class="inspector-row">
      <span class="inspector-label">X</span>
      <input type="number" class="inspector-input" value="120">
      <span class="inspector-label">Y</span>
      <input type="number" class="inspector-input" value="80">
    </div>
  </div>

  <!-- Size -->
  <div class="inspector-section">
    <div class="inspector-section-title">Size</div>
    <div class="inspector-row">
      <span class="inspector-label">W</span>
      <input type="number" class="inspector-input" value="440">
      <span class="inspector-label">H</span>
      <input type="number" class="inspector-input" value="320">
    </div>
    <div class="inspector-row" style="margin-top:4px;">
      <span class="inspector-label" title="Lock aspect ratio">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px; height:12px;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </span>
      <span style="font-size:10px; color:var(--fg-muted);">Locked</span>
    </div>
  </div>

  <!-- Fill -->
  <div class="inspector-section">
    <div class="inspector-section-title">
      Fill
      <button class="sidebar-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px; height:12px;">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
    <div class="inspector-row">
      <div class="color-swatch" style="background:{fill};"></div>
      <input type="text" class="inspector-input" bind:value={fill} style="font-size:10px;">
    </div>
    <div class="inspector-row">
      <span class="inspector-label">A</span>
      <input type="number" class="inspector-input" bind:value={fillOpacity} min="0" max="100">
      <span style="font-size:10px; color:var(--fg-muted);">%</span>
    </div>
  </div>

  <!-- Stroke -->
  <div class="inspector-section">
    <div class="inspector-section-title">
      Stroke
      <button class="sidebar-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px; height:12px;">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
    <div class="inspector-row">
      <div class="color-swatch" style="background:{stroke};"></div>
      <input type="text" class="inspector-input" bind:value={stroke} style="font-size:10px;">
    </div>
    <div class="inspector-row">
      <span class="inspector-label">W</span>
      <input type="number" class="inspector-input" bind:value={strokeWidth} min="0" step="0.5">
    </div>
    <div class="inspector-row">
      <span class="inspector-label">Style</span>
      <select class="inspector-select" bind:value={strokeStyle}>
        {#each strokeStyles as style}
          <option>{style}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Corners -->
  <div class="inspector-section">
    <div class="inspector-section-title">Corners</div>
    <div class="inspector-row">
      <div class="inspector-input-group">
        <span class="input-label">TL</span>
        <input type="number" class="inspector-input" bind:value={radiusTL}>
        <span class="input-label">TR</span>
        <input type="number" class="inspector-input" bind:value={radiusTR}>
      </div>
    </div>
    <div class="inspector-row">
      <div class="inspector-input-group">
        <span class="input-label">BL</span>
        <input type="number" class="inspector-input" bind:value={radiusBL}>
        <span class="input-label">BR</span>
        <input type="number" class="inspector-input" bind:value={radiusBR}>
      </div>
    </div>
  </div>

  <!-- Effects -->
  <div class="inspector-section">
    <div class="inspector-section-title">
      Effects
      <button class="sidebar-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px; height:12px;">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
    <div class="inspector-row">
      <div style="flex:1; display:flex; align-items:center; gap:6px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px; height:12px; color:var(--fg-muted);">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
        </svg>
        <span style="font-size:11px; color:var(--fg-secondary);">Drop Shadow</span>
      </div>
      <button class="sidebar-action" style="opacity:1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:10px; height:10px;">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="inspector-row" style="padding-left:18px;">
      <span class="inspector-label" style="width:16px;">X</span>
      <input type="number" class="inspector-input" bind:value={shadowX}>
      <span class="inspector-label" style="width:16px;">Y</span>
      <input type="number" class="inspector-input" bind:value={shadowY}>
    </div>
    <div class="inspector-row" style="padding-left:18px;">
      <span class="inspector-label" style="width:16px;">B</span>
      <input type="number" class="inspector-input" bind:value={shadowBlur}>
      <span class="inspector-label" style="width:16px;">S</span>
      <input type="number" class="inspector-input" bind:value={shadowSpread}>
    </div>
    <div class="inspector-row">
      <div style="flex:1; display:flex; align-items:center; gap:6px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px; height:12px; color:var(--fg-muted);">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span style="font-size:11px; color:var(--fg-secondary);">Blur</span>
      </div>
      <button class="sidebar-action" style="opacity:1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:10px; height:10px;">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Export -->
  <div class="inspector-section">
    <div class="inspector-section-title">Export</div>
    <div class="inspector-row">
      <select class="inspector-select" bind:value={exportFormat}>
        {#each exportFormats as fmt}
          <option>{fmt}</option>
        {/each}
      </select>
    </div>
    <div class="inspector-row">
      <span class="inspector-label">Scale</span>
      <select class="inspector-select" bind:value={exportScale}>
        {#each exportScales as s}
          <option>{s}</option>
        {/each}
      </select>
    </div>
    <div class="inspector-row" style="margin-top:4px;">
      <button style="flex:1; height:28px; background:var(--accent); color:oklch(98% 0 0); border:none; border-radius:var(--radius-sm); font-size:11px; font-weight:600; cursor:pointer; letter-spacing:0.02em;">
        Export Selection
      </button>
    </div>
  </div>
</aside>
