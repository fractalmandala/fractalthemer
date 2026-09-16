<script lang="ts">
	import '$lib/styles/index.sass';
	import '$lib/motion/transition.css';
	import ModeToggle from '$lib/mode/ModeToggle.svelte';
	let { children } = $props();
</script>


<div class="app-shell">
	<header class="app-header bb">
		<nav class="row gp-32 ycenter">
			<a class="text-2xl logo-link weight-800" href="/"><span class="text-theme">fractal</span>themer</a>
		</nav>
		<nav>
		<ModeToggle/>
		</nav>
	</header>
	<main class="app-main">
		{@render children()}
	</main>
</div>

