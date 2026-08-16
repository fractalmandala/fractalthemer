<script>
  import { onMount, onDestroy } from 'svelte';

  let playing = true;
  let animTime = 0;
  let animInterval;
  let timeDisplay = '0:00.00';
  let previewBox;

  const tracks = [
    {
      name: 'Scale',
      icon: 'M3 3h18v18H3z',
      bars: [
        { color: 'kf-blue', left: '2%', width: '18%' },
        { color: 'kf-blue', left: '22%', width: '18%' },
        { color: 'kf-blue', left: '42%', width: '18%' },
        { color: 'kf-blue', left: '62%', width: '18%' },
      ],
    },
    {
      name: 'Position',
      icon: 'M5 9 2 12 5 15 M9 5 12 2 15 5',
      bars: [
        { color: 'kf-green', left: '10%', width: '30%' },
        { color: 'kf-green', left: '50%', width: '30%' },
      ],
    },
    {
      name: 'Rotation',
      icon: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M12 6v6l4 2',
      bars: [
        { color: 'kf-orange', left: '5%', width: '40%' },
        { color: 'kf-orange', left: '55%', width: '40%' },
      ],
    },
    {
      name: 'Opacity',
      icon: 'M12 2v10l4.7 2.7 M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0',
      dots: [
        { color: 'kf-dot-blue', left: '25%' },
        { color: 'kf-dot-blue', left: '50%' },
        { color: 'kf-dot-blue', left: '75%' },
      ],
    },
    {
      name: 'Border Radius',
      icon: 'M3 3h18v18H3z M3 9h18 M9 21V9',
      dots: [
        { color: 'kf-dot-green', left: '0%' },
        { color: 'kf-dot-green', left: '50%' },
        { color: 'kf-dot-green', left: '100%' },
      ],
    },
  ];

  const rulerMarks = [
    { pos: '0%',   label: '0s', major: true },
    { pos: '10%',  label: '0.2s' },
    { pos: '20%',  label: '0.4s' },
    { pos: '30%',  label: '0.6s' },
    { pos: '40%',  label: '0.8s', major: true },
    { pos: '50%',  label: '1.0s' },
    { pos: '60%',  label: '1.2s' },
    { pos: '70%',  label: '1.4s' },
    { pos: '80%',  label: '1.6s', major: true },
    { pos: '90%',  label: '1.8s' },
    { pos: '100%', label: '2.0s', major: true },
  ];

  function togglePlay() {
    playing = !playing;
    if (playing) {
      previewBox?.classList.add('animating');
      animInterval = setInterval(() => {
        animTime += 0.05;
        if (animTime > 2) animTime = 0;
        const mins = Math.floor(animTime / 60);
        const secs = (animTime % 60).toFixed(2).padStart(5, '0');
        timeDisplay = `${mins}:${secs}`;
      }, 50);
    } else {
      previewBox?.classList.remove('animating');
      clearInterval(animInterval);
    }
  }

  onMount(() => {
    previewBox?.classList.add('animating');
    animInterval = setInterval(() => {
      animTime += 0.05;
      if (animTime > 2) animTime = 0;
      const mins = Math.floor(animTime / 60);
      const secs = (animTime % 60).toFixed(2).padStart(5, '0');
      timeDisplay = `${mins}:${secs}`;
    }, 50);
  });

  onDestroy(() => clearInterval(animInterval));
</script>

<div class="view-panel">
  <div class="canvas-toolbar">
    <div class="canvas-toolbar-group">
      <label>Duration</label>
      <input type="number" value="2.0" step="0.1" min="0.1">
      <span style="font-size:10px; color:var(--fg-muted);">s</span>
    </div>
    <div class="canvas-toolbar-sep"></div>
    <div class="canvas-toolbar-group">
      <label>Easing</label>
      <select style="background:var(--surface); border:1px solid var(--border-subtle); border-radius:3px; color:var(--fg); font-size:11px; padding:2px 6px; height:22px;">
        <option>ease-in-out</option>
        <option>ease-in</option>
        <option>ease-out</option>
        <option>linear</option>
        <option>cubic-bezier(0.34, 1.56, 0.64, 1)</option>
      </select>
    </div>
    <div class="canvas-toolbar-sep"></div>
    <div class="canvas-toolbar-group">
      <label>Repeat</label>
      <select style="background:var(--surface); border:1px solid var(--border-subtle); border-radius:3px; color:var(--fg); font-size:11px; padding:2px 6px; height:22px;">
        <option>Infinite</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>5</option>
      </select>
    </div>
  </div>

  <div class="motion-canvas-wrap">
    <div class="motion-preview-box animating" bind:this={previewBox}></div>
  </div>

  <div class="timeline">
    <div class="timeline-controls">
      <button class="timeline-btn" title="Skip to start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="19 20 9 12 19 4 19 20"/>
          <line x1="5" y1="19" x2="5" y2="5"/>
        </svg>
      </button>
      <button class="timeline-btn play-btn" title="Play / Pause" on:click={togglePlay}>
        {#if playing}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
        {/if}
      </button>
      <button class="timeline-btn" title="Skip to end">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 4 15 12 5 20 5 4"/>
          <line x1="19" y1="5" x2="19" y2="19"/>
        </svg>
      </button>
      <span class="timeline-time">{timeDisplay}</span>
      <span class="timeline-duration">Duration: 2.00s</span>
    </div>

    <div class="timeline-scrubber">
      <div class="timeline-ruler">
        {#each rulerMarks as mark}
          <span
            class="timeline-ruler-mark"
            class:major={mark.major}
            style="left:{mark.pos}"
          >{mark.label}</span>
        {/each}
      </div>
      <div class="timeline-playhead"></div>
    </div>

    <div class="timeline-tracks">
      {#each tracks as track}
        <div class="timeline-track">
          <div class="timeline-track-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d={track.icon}/>
            </svg>
            {track.name}
          </div>
          <div class="timeline-track-content">
            {#if track.bars}
              {#each track.bars as bar}
                <div
                  class="timeline-keyframe-bar {bar.color}"
                  style="left:{bar.left}; width:{bar.width};"
                ></div>
              {/each}
            {/if}
            {#if track.dots}
              {#each track.dots as dot}
                <div
                  class="timeline-keyframe-dot {dot.color}"
                  style="left:{dot.left};"
                ></div>
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
