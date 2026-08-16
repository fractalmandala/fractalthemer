<script lang="ts">
	import {
		ThemeStudio,
		PaletteGenerator,
		ThemePicker,
		ThemeToggle,
		themeState,
		studioState,
		CORE_TOKENS
	} from '$lib';

	let activeDevTab = $state<'studio' | 'palette-gen' | 'components' | 'tokens'>('studio');
</script>

<svelte:head>
	<title>fractalthemer • Dev Workbench & Theme Builder</title>
</svelte:head>

<div class="dev-workbench">
	<!-- Dev Toolbar -->
	<div class="dev-nav-bar">
		<div class="dev-nav-title">
			<span style="font-size: 18px;">🛠️</span>
			<strong>Theme Builder & Component Workbench</strong>
		</div>

		<div class="dev-nav-tabs">
			<button
				type="button"
				class="dev-tab-btn"
				class:active={activeDevTab === 'studio'}
				onclick={() => (activeDevTab = 'studio')}
			>
				🎨 Theme Studio
			</button>
			<button
				type="button"
				class="dev-tab-btn"
				class:active={activeDevTab === 'palette-gen'}
				onclick={() => (activeDevTab = 'palette-gen')}
			>
				✨ Palette Generator
			</button>
			<button
				type="button"
				class="dev-tab-btn"
				class:active={activeDevTab === 'components'}
				onclick={() => (activeDevTab = 'components')}
			>
				🧩 Live UI Components
			</button>
			<button
				type="button"
				class="dev-tab-btn"
				class:active={activeDevTab === 'tokens'}
				onclick={() => (activeDevTab = 'tokens')}
			>
				🔍 Active Tokens ({CORE_TOKENS.length})
			</button>
		</div>

		<div style="display: flex; align-items: center; gap: 8px;">
			<ThemeToggle />
		</div>
	</div>

	<!-- Main Workbench Body -->
	<div class="dev-content-area">
		{#if activeDevTab === 'studio'}
			<div class="dev-card" style="height: 760px; padding: 0; overflow: hidden;">
				<ThemeStudio open={true} />
			</div>
		{:else if activeDevTab === 'palette-gen'}
			<div class="dev-card">
				<PaletteGenerator />
			</div>
		{:else if activeDevTab === 'components'}
			<!-- Live Component Verification & Styling Suite -->
			<div class="dev-components-grid">
				<!-- 1. Typography & Contrast Card -->
				<div class="dev-card">
					<span class="dev-card-label">Typography & Headings</span>
					<h1>Heading Level 1</h1>
					<h2>Heading Level 2</h2>
					<h3>Heading Level 3</h3>
					<p style="color: var(--text-primary);">
						This is primary body copy styled with <code>var(--text-primary)</code>. It should have crisp contrast against the application background.
					</p>
					<p style="color: var(--text-secondary); font-size: 13px;">
						This is secondary supporting copy styled with <code>var(--text-secondary)</code>.
					</p>
					<p style="color: var(--text-muted); font-size: 12px;">
						This is muted metadata text styled with <code>var(--text-muted)</code>.
					</p>
				</div>

				<!-- 2. Buttons & Actions Card -->
				<div class="dev-card">
					<span class="dev-card-label">Buttons & State Variables</span>
					<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;">
						<button
							type="button"
							style="background: var(--theme-color); color: var(--text-inverse, #FFF); border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;"
						>
							Primary Brand Button
						</button>
						<button
							type="button"
							style="background: var(--theme-color-alt); color: var(--text-inverse, #FFF); border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;"
						>
							Accent Button
						</button>
						<button
							type="button"
							style="background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border); padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer;"
						>
							Surface Button
						</button>
					</div>

					<div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<div style="padding: 10px; border-radius: 6px; background: var(--state-hover); border: 1px solid var(--border-subtle);">
							<code>var(--state-hover)</code> Container
						</div>
						<div style="padding: 10px; border-radius: 6px; background: var(--state-selected); border: 1px solid var(--border);">
							<code>var(--state-selected)</code> Selected Container
						</div>
					</div>
				</div>

				<!-- 3. Form Inputs & Interactive Controls -->
				<div class="dev-card">
					<span class="dev-card-label">Form Inputs & Controls</span>
					<div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
						<label style="font-size: 12px; font-weight: 600;">
							Input Field
							<input
								type="text"
								placeholder="Type something here..."
								style="width: 100%; margin-top: 4px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-surface); color: var(--text-primary); outline: none;"
							/>
						</label>

						<label style="font-size: 12px; font-weight: 600;">
							Range Slider
							<input type="range" style="width: 100%; accent-color: var(--theme-color);" />
						</label>
					</div>
				</div>

				<!-- 4. Surface Layering & Elevation -->
				<div class="dev-card">
					<span class="dev-card-label">Surface Layering & Depth</span>
					<div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 16px; border-radius: 8px; margin-top: 12px;">
						<strong>var(--bg-surface)</strong>
						<div style="background: var(--bg-raised); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 6px; margin-top: 8px;">
							<strong>var(--bg-raised) Modal Surface</strong>
							<div style="background: var(--bg-panel); border: 1px solid var(--border); padding: 8px; border-radius: 4px; margin-top: 8px; font-size: 12px;">
								<strong>var(--bg-panel) Sidebar / Tooltip</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else if activeDevTab === 'tokens'}
			<!-- 4. Token Inspector -->
			<div class="dev-card">
				<span class="dev-card-label">Active CSS Custom Properties Contract</span>
				<div class="tokens-table-wrapper">
					<table class="tokens-table">
						<thead>
							<tr>
								<th>Token</th>
								<th>Category</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{#each CORE_TOKENS as token}
								<tr>
									<td>
										<div style="display: flex; align-items: center; gap: 8px;">
											<span
												style="width: 16px; height: 16px; border-radius: 4px; border: 1px solid var(--border); background-color: var(--{token.key}); display: inline-block;"
											></span>
											<code>--{token.key}</code>
										</div>
									</td>
									<td><span class="token-cat-badge">{token.category}</span></td>
									<td>{token.description}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.dev-workbench {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
	}

	.dev-nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 10px;
		flex-wrap: wrap;
		gap: 12px;
	}

	.dev-nav-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: var(--text-primary);
	}

	.dev-nav-tabs {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--bg-raised);
		padding: 3px;
		border-radius: 8px;
		border: 1px solid var(--border-subtle);
	}

	.dev-tab-btn {
		padding: 6px 12px;
		font-size: 12px;
		font-weight: 500;
		color: var(--text-secondary);
		background: transparent;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.dev-tab-btn:hover {
		color: var(--text-primary);
	}

	.dev-tab-btn.active {
		background: var(--bg-panel);
		color: var(--theme-color);
		font-weight: 600;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
	}

	.dev-content-area {
		width: 100%;
	}

	.dev-card {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
		position: relative;
	}

	.dev-card-label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-muted);
		display: block;
		margin-bottom: 12px;
	}

	.dev-components-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 16px;
	}

	.tokens-table-wrapper {
		overflow-x: auto;
		margin-top: 8px;
	}

	.tokens-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}

	.tokens-table th,
	.tokens-table td {
		padding: 10px 12px;
		text-align: left;
		border-bottom: 1px solid var(--border-subtle);
	}

	.tokens-table th {
		font-size: 11px;
		text-transform: uppercase;
		color: var(--text-muted);
		background: var(--bg-raised);
	}

	.token-cat-badge {
		font-size: 10px;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 4px;
		background: var(--bg-panel);
		color: var(--text-muted);
		border: 1px solid var(--border-subtle);
	}
</style>
