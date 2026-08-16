<script>
  import { onMount } from 'svelte';

  let coords = { x: 0, y: 0 };
  let viewportEl;

  onMount(() => {
    if (!viewportEl) return;
    const handler = (e) => {
      const rect = viewportEl.getBoundingClientRect();
      coords = {
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      };
    };
    viewportEl.addEventListener('mousemove', handler);
    return () => viewportEl.removeEventListener('mousemove', handler);
  });
</script>

<footer class="statusbar">
  <div class="statusbar-dot"></div>
  <span>Ready</span>
  <span class="statusbar-spacer"></span>
  <span>Artboard 1</span>
  <span style="color:var(--border);">|</span>
  <span>{coords.x}, {coords.y}</span>
</footer>

<div bind:this={viewportEl} style="display:none;"></div>
