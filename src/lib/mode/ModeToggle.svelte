<script lang="ts">
	import { mode } from '$lib/state/mode.svelte.js';
	import Sun from '$lib/icons/Sun.svelte'
	import Moon from '$lib/icons/Moon.svelte'

	let { class: className = '' }: { class?: string; } =
		$props();

	// The one mode engine. toggle() defaults to the swipe — the incoming theme
	// wipes over the old one (dark falls from the top, light rises from the
	// bottom, 520ms), and falls back to an instant flip under reduced motion or
	// where view transitions are missing.
	const store = mode();
	const dark = $derived(store.resolved === 'dark');
</script>

<button
	type="button"
	class={className}
	aria-pressed={dark}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={dark ? 'Light mode' : 'Dark mode'}
	onclick={() => store.toggle()}
>
	<svg width="20" height="20" viewBox="0 0 19 19" aria-hidden="true">
		{#if dark}
			<Sun/>
		{:else}
			<Moon/>
		{/if}
	</svg>
</button>
