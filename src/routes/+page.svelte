<script lang="ts">
	import {
		themeState,
		THEMES,
		LIGHT_THEMES,
		DARK_THEMES,
		CORE_TOKENS,
		GRADIENT_PRESETS,
		AURA_PRESETS,
		PATTERNS,
	} from "$lib";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";

	let copied = $state(false);
	let gradientSearch = $state("");
	let gradientType = $state("themes");

	function setGradient(newGradient: string) {
		gradientType = newGradient;
	}

	const filteredGradients = $derived.by(() => {
		if (!gradientSearch.trim()) return GRADIENT_PRESETS;
		const q = gradientSearch.toLowerCase().trim();
		return GRADIENT_PRESETS.filter(
			(g) =>
				g.name.toLowerCase().includes(q) ||
				g.id.toLowerCase().includes(q),
		);
	});

	function copyInstall() {
		navigator.clipboard.writeText("pnpm add fractalthemer");
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="showcase">
	<div class="tabs">
		<button class="is-tab" onclick={() => setGradient("themes")}>
			Themes
		</button>
		<button class="is-tab" onclick={() => setGradient("gradients")}>
			Gradients
		</button>
		<button class="is-tab" onclick={() => setGradient("aura")}>
			Aura Gradients
		</button>
		<button class="is-tab" onclick={() => setGradient("patterns")}>
			Patterns
		</button>
		<button class="is-tab" onclick={() => setGradient("tokens")}>
			Tokens
		</button>
	</div>
	<div class="box">
		{#if gradientType === "themes"}
			<div class="themes-showcase-grid">
				{#each THEMES as theme (theme.id)}
					<button
						type="button"
						class="preview-card"
						class:active={themeState.current === theme.id}
						onclick={() => themeState.setTheme(theme.id)}
					>
						<div class="card-head">
							<span class="card-name">{theme.name}</span>
							<span class="mode-pill {theme.mode}"
								>{theme.mode}</span
							>
						</div>
						<div
							class="card-swatches"
							style="background-color: {theme.bgColor};"
						>
							<span
								class="swatch"
								style="background-color: {theme.accentColor};"
								title="Accent: {theme.accentColor}"
							></span>
							<span
								class="swatch"
								style="background-color: {theme.textColor};"
								title="Text: {theme.textColor}"
							></span>
						</div>
						<div class="card-meta">
							<span class="aura-title">✨ {theme.auraName}</span>
						</div>
					</button>
				{/each}
			</div>
		{:else if gradientType === "gradients"}
			<div class="themes-showcase-grid">
				{#each filteredGradients as grad (grad.id)}
					<button
						type="button"
						class="gradient-preview-card"
						class:active={themeState.isGradient &&
							themeState.activeGradient === grad.id}
						onclick={() => themeState.setGradient(grad.id)}
					>
						<div
							class="gradient-preview-bar"
							style:background={grad.css}
						>
							<div class="grad-color-dots">
								{#each grad.colors as col}
									<span
										class="grad-dot"
										style:background-color={col}
										title={col}
									></span>
								{/each}
							</div>
						</div>
						<div class="card-head">
							<span class="card-name">{grad.name}</span>
							<span class="mode-pill">{grad.colors.length}c</span>
						</div>
					</button>
				{/each}
			</div>
		{:else if gradientType === "tokens"}
			<div class="themes-showcase-grid">
				{#each CORE_TOKENS as token (token.key)}
					<div class="gradient-preview-card">
						<code
							>--{token.key} - {themeState.currentTheme.tokens[
								token.key
							] || token.defaultVal}</code
						>
						<div class="token-val-cell">
							<span
								class="token-swatch"
								style="background-color: var(--{token.key});"
							></span>
						</div>
						<span>{token.description}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.showcase {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.hero-card {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-12, 12px);
		padding: 36px;
		box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.06));
	}

	.hero-badge {
		display: inline-block;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 4px 10px;
		border-radius: var(--radius-full, 9999px);
		background: var(--bg-badge, rgba(4, 130, 91, 0.1));
		color: var(--theme-color);
		margin-bottom: 16px;
	}

	.hero-title {
		margin: 0 0 12px 0;
		font-size: var(--text-3xl, 32px);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-primary);
		line-height: 1.2;
	}

	.hero-desc {
		margin: 0 0 24px 0;
		font-size: var(--text-bs, 16px);
		color: var(--text-secondary);
		max-width: 720px;
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 24px;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 18px;
		background: var(--theme-color);
		color: var(--text-inverse, #ffffff);
		font-size: var(--text-sm, 13px);
		font-weight: 600;
		border: none;
		border-radius: var(--radius-6, 6px);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			transform 0.1s ease;
	}

	.btn-primary:hover {
		background: var(--theme-color-alt);
	}

	.btn-primary:active {
		transform: scale(0.98);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		background: var(--bg-raised);
		color: var(--text-primary);
		font-size: var(--text-sm, 13px);
		font-weight: 500;
		border: 1px solid var(--border);
		border-radius: var(--radius-6, 6px);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.btn-secondary:hover {
		background: var(--state-hover);
		border-color: var(--theme-color);
	}

	.active-status-bar {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 12px;
		padding: 16px;
		border-radius: var(--radius-8, 8px);
		background: var(--bg-panel);
		border: 1px solid var(--border-subtle);
	}

	.status-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.status-label {
		font-size: 11px;
		text-transform: uppercase;
		color: var(--text-muted);
		font-weight: 600;
	}

	.status-value {
		font-size: var(--text-sm, 13px);
		font-weight: 600;
		color: var(--text-primary);
	}

	.doc-card {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-12, 12px);
		padding: 32px;
	}


	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.count-badge {
		font-size: 11px;
		font-weight: 600;
		padding: 3px 8px;
		border-radius: var(--radius-full, 9999px);
		background: var(--bg-panel);
		color: var(--text-muted);
		border: 1px solid var(--border-subtle);
	}

	.section-desc {
		margin: 0 0 20px 0;
		font-size: var(--text-sm, 13px);
		color: var(--text-secondary);
	}

	.code-block-wrapper {
		border: 1px solid var(--border);
		border-radius: var(--radius-8, 8px);
		overflow: hidden;
		background: var(--bg-terminal, #0f172a);
		color: #f8fafc;
		margin: 12px 0 20px 0;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.05);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 11px;
		font-family: var(--font-mono, monospace);
		color: #94a3b8;
	}

	.copy-btn {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #f8fafc;
		font-size: 11px;
		padding: 2px 8px;
		border-radius: 4px;
		cursor: pointer;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}


	.code-sample {
		background: var(--bg-panel);
		color: var(--text-primary);
		border: 1px solid var(--border);
		border-radius: var(--radius-8, 8px);
		padding: 14px 16px;
		overflow-x: auto;
	}

	.themes-showcase-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		gap: 12px;
	}

	.preview-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
		background: var(--bg-panel);
		border: 1px solid var(--border);
		border-radius: var(--radius-8, 8px);
		text-align: left;
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			transform 0.1s ease;
	}

	.preview-card:hover {
		border-color: var(--theme-color);
		transform: translateY(-2px);
	}

	.preview-card.active {
		border-color: var(--theme-color);
		background: var(--state-selected);
		box-shadow: 0 0 0 2px var(--theme-color);
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}

	.card-name {
		font-size: var(--text-sm, 13px);
		font-weight: 600;
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mode-pill {
		font-size: 9px;
		text-transform: uppercase;
		font-weight: 700;
		padding: 2px 5px;
		border-radius: 4px;
	}

	.mode-pill.light {
		background: #fef08a;
		color: #854d0e;
	}

	.mode-pill.dark {
		background: #1e293b;
		color: #94a3b8;
	}

	.card-swatches {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		border-radius: 6px;
		border: 1px solid var(--border);
	}

	.swatch {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.card-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.aura-title {
		font-size: 11px;
		color: var(--text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tokens-table-wrapper {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: var(--radius-8, 8px);
	}

	.tokens-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm, 13px);
		text-align: left;
	}
	.category-pill {
		font-size: 10px;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 4px;
		background: var(--bg-panel);
		color: var(--text-secondary);
	}

	.token-val-cell {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono, monospace);
		font-size: 12px;
	}

	.token-swatch {
		width: 14px;
		height: 14px;
		border-radius: 3px;
		border: 1px solid var(--border);
		flex-shrink: 0;
	}

	.gradient-showcase-input {
		width: 100%;
		max-width: 480px;
		padding: 10px 14px;
		font-size: var(--text-sm, 13px);
		border-radius: var(--radius-6, 6px);
		border: 1px solid var(--border);
		background: var(--bg-panel);
		color: var(--text-primary);
		outline: none;
		transition: border-color 0.15s ease;
	}

	.gradient-showcase-input:focus {
		border-color: var(--theme-color);
	}

	.gradients-showcase-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		gap: 12px;
		max-height: 480px;
		overflow-y: auto;
		padding: 4px;
	}

	.gradient-preview-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px;
		background: var(--bg-panel);
		border: 1px solid var(--border);
		border-radius: var(--radius-8, 8px);
		text-align: left;
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			transform 0.1s ease;
	}

	.gradient-preview-card:hover {
		border-color: var(--theme-color);
		transform: translateY(-2px);
	}

	.gradient-preview-card.active {
		border-color: var(--theme-color);
		background: var(--state-selected);
		box-shadow: 0 0 0 2px var(--theme-color);
	}

	.gradient-preview-bar {
		height: 40px;
		border-radius: var(--radius-6, 6px);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.15),
			0 2px 8px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 4px 6px;
	}

	.grad-color-dots {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.grad-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1.5px solid rgba(255, 255, 255, 0.85);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}
</style>
