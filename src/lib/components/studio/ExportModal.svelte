<script lang="ts">
	import { studioState } from '../../state/studio.svelte.js';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	let activeTab = $state<'css' | 'sass' | 'svg' | 'json'>('css');
	let copied = $state(false);

	const cssCode = $derived.by(() => {
		const colors = studioState.recipe.pins.map(p => p.color).join(', ');
		return `/* ${studioState.recipe.title} (${studioState.recipe.engineType}) */\n.gradient-bg {\n  background: linear-gradient(135deg, ${colors});\n  filter: blur(${studioState.recipe.soften}px);\n}`;
	});

	const sassCode = $derived.by(() => {
		const colors = studioState.recipe.pins.map(p => p.color).join(', ');
		return `// ${studioState.recipe.title}\n$gradient-colors: (${colors})\n$gradient-soften: ${studioState.recipe.soften}px\n\n=gradient-backdrop\n\tbackground: linear-gradient(135deg, $gradient-colors)\n\tfilter: blur($gradient-soften)`;
	});

	const svgCode = $derived.by(() => {
		const stops = studioState.recipe.pins
			.map((p, i) => `    <stop offset="${(i / Math.max(1, studioState.recipe.pins.length - 1)) * 100}%" stop-color="${p.color}" />`)
			.join('\n');
		return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">\n  <defs>\n    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">\n${stops}\n    </linearGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#gradient)" />\n</svg>`;
	});

	const jsonCode = $derived.by(() => {
		return JSON.stringify(studioState.recipe, null, 2);
	});

	const displayedCode = $derived.by(() => {
		switch (activeTab) {
			case 'css': return cssCode;
			case 'sass': return sassCode;
			case 'svg': return svgCode;
			case 'json': return jsonCode;
		}
	});

	function copy() {
		navigator.clipboard.writeText(displayedCode);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1800);
	}

	function downloadSvg() {
		const blob = new Blob([svgCode], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${studioState.recipe.title.toLowerCase().replace(/\s+/g, '-')}.svg`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="export-backdrop" role="presentation" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()}>
	<div class="export-modal" role="dialog" aria-modal="true" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
		<div class="export-header">
			<h3>Export Blend: {studioState.recipe.title}</h3>
			<button type="button" class="export-close-btn" onclick={onClose}>✕</button>
		</div>

		<div class="export-tabs">
			{#each ['css', 'sass', 'svg', 'json'] as tab}
				<button
					type="button"
					class="engine-type-chip"
					class:active={activeTab === tab}
					onclick={() => (activeTab = tab as any)}
				>
					{tab.toUpperCase()}
				</button>
			{/each}
		</div>

		<pre class="export-code-box"><code>{displayedCode}</code></pre>

		<div class="export-footer">
			{#if activeTab === 'svg'}
				<button type="button" class="engine-type-chip active" onclick={downloadSvg}>
					⬇ Download SVG
				</button>
			{/if}
			<button type="button" class="engine-type-chip active" onclick={copy}>
				{copied ? '✓ Copied' : '📋 Copy Code'}
			</button>
		</div>
	</div>
</div>

<style>
	.export-backdrop {
		position: fixed;
		inset: 0;
		z-index: 10050;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}
	.export-modal {
		width: 100%;
		max-width: 540px;
		background: var(--bg-surface);
		border-radius: 12px;
		border: 1px solid var(--border);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.export-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 18px;
		border-bottom: 1px solid var(--border-subtle);
	}
	.export-header h3 {
		margin: 0;
		font-size: 15px;
		font-weight: 600;
		color: var(--text-primary);
	}
	.export-close-btn {
		background: transparent;
		border: none;
		font-size: 16px;
		color: var(--text-muted);
		cursor: pointer;
	}
	.export-tabs {
		display: flex;
		gap: 6px;
		padding: 12px 18px 0;
	}
	.export-code-box {
		margin: 12px 18px;
		padding: 14px;
		background: var(--bg-panel);
		border-radius: 8px;
		border: 1px solid var(--border-subtle);
		font-family: monospace;
		font-size: 12px;
		line-height: 1.5;
		color: var(--text-primary);
		max-height: 240px;
		overflow-y: auto;
	}
	.export-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		padding: 12px 18px;
		background: var(--bg-surface);
		border-top: 1px solid var(--border-subtle);
	}
</style>
