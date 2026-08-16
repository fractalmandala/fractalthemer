<script lang="ts">
	import '$lib/styles/index.sass';
	import './app-shell.sass';
	import AuraBackground from '$lib/components/AuraBackground.svelte';
	import ThemePicker from '$lib/components/ThemePicker.svelte';
	import { themeState } from '$lib/state/theme.svelte';

	let { children } = $props();
</script>

<AuraBackground />

<div class="app">
	<header class="themer-header row ycenter xbetween">
		<nav class="row gap32 ycenter">
			<a class="nav-link" href="/">fractalthemer</a>
		</nav>
		<div class="row ycenter gap16">
			<a class="nav-link" href="/dev">studio</a>
			<ThemePicker showStudioLink={false} />
		</div>
	</header>

	<main class="themer-main">
		{@render children()}
	</main>
</div>

