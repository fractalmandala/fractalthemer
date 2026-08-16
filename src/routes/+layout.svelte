<script lang="ts">
	import '$lib/styles/index.sass';
	import AuraBackground from '$lib/components/AuraBackground.svelte';
	import ThemePicker from '$lib/components/ThemePicker.svelte';
	import { themeState } from '$lib/state/theme.svelte';

	let { children } = $props();
</script>

<AuraBackground />

<div class="themer-app">
	<header class="themer-header">
		<div class="themer-header-left">
			<a href="/" class="themer-brand-link">
				<span class="themer-logo">✨</span>
				<span class="themer-title">fractalthemer</span>
			</a>
			<span class="themer-badge">v0.1.6</span>

			<nav class="themer-nav-links">
				<a href="/" class="themer-nav-link">Showcase</a>
				<a href="/dev" class="themer-nav-link">🛠️ Dev Builder</a>
			</nav>
		</div>

		<div class="themer-header-right">
			<ThemePicker showStudioLink={false} />
		</div>
	</header>

	<main class="themer-main">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
		background-color: var(--bg);
		color: var(--text-primary);
		min-height: 100vh;
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	.themer-app {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.themer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24px;
		height: 60px;
		background: var(--bg-surface);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.themer-header-left {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.themer-logo {
		font-size: 20px;
	}

	.themer-title {
		font-weight: 700;
		font-size: 16px;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	.themer-brand-link {
		display: flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
		color: var(--text-primary);
	}

	.themer-nav-links {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-left: 16px;
	}

	.themer-nav-link {
		padding: 6px 12px;
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		color: var(--text-secondary);
		border-radius: 6px;
		transition: all 0.15s ease;
	}

	.themer-nav-link:hover {
		color: var(--text-primary);
		background: var(--state-hover);
	}

	.themer-header-right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.themer-main {
		flex: 1;
		max-width: 1080px;
		width: 100%;
		margin: 0 auto;
		padding: 40px 24px;
		box-sizing: border-box;
	}
</style>
