<script lang="ts">
	import { onMount } from 'svelte';
	import {
		generateSemanticPalette,
		getRandomBaseColor,
		type HarmonyMode,
		type PaletteColumn
	} from '../../engines/color-harmony.js';
	import { themeState } from '../../state/theme.svelte.js';

	interface Props {
		class?: string;
		onApply?: (palette: PaletteColumn[]) => void;
	}

	let { class: className = '', onApply }: Props = $props();

	let baseColor = $state('#9948E0');
	let harmonyMode = $state<HarmonyMode>('split-comp');
	let isDark = $state(false);
	let columns = $state<PaletteColumn[]>([]);
	let activeFormat = $state<'sass' | 'css' | 'tailwind' | 'hex' | 'hsl' | 'scss'>('sass');
	let copied = $state(false);

	const harmonyModes: { id: HarmonyMode; label: string }[] = [
		{ id: 'monochromatic', label: 'Monochromatic' },
		{ id: 'analogous', label: 'Analogous' },
		{ id: 'complementary', label: 'Complementary' },
		{ id: 'split-comp', label: 'Split-Comp' },
		{ id: 'triadic', label: 'Triadic' },
		{ id: 'tetradic', label: 'Tetradic' },
		{ id: 'shades', label: 'Shades' },
		{ id: 'tints', label: 'Tints' }
	];

	function updatePalette(newBase?: string, newMode?: HarmonyMode, newDark?: boolean) {
		if (newBase) baseColor = newBase;
		if (newMode) harmonyMode = newMode;
		if (newDark !== undefined) isDark = newDark;
		columns = generateSemanticPalette(baseColor, harmonyMode, isDark, columns);
	}

	function updateColumnColor(index: number, newHex: string) {
		baseColor = newHex;
		columns = columns.map((col, idx) => {
			if (idx === index) {
				return { ...col, hex: newHex, locked: true };
			}
			return col;
		});
		columns = generateSemanticPalette(baseColor, harmonyMode, isDark, columns);
	}

	function toggleMode() {
		isDark = !isDark;
		updatePalette(baseColor, harmonyMode, isDark);
	}

	function toggleLock(index: number) {
		columns = columns.map((col, idx) => {
			if (idx === index) {
				return { ...col, locked: !col.locked };
			}
			return col;
		});
	}

	function randomize() {
		const newBase = getRandomBaseColor();
		// If the brand token is locked, keep its color as base
		const brandCol = columns.find(c => c.token === '--theme-color');
		if (brandCol && brandCol.locked) {
			updatePalette(brandCol.hex);
		} else {
			updatePalette(newBase);
		}
	}

	function reset() {
		baseColor = '#9948E0';
		harmonyMode = 'split-comp';
		// Unlock all columns on explicit reset
		columns = columns.map(c => ({ ...c, locked: false }));
		updatePalette(baseColor, harmonyMode);
	}

	function applyTheme() {
		const tokenMap: Record<string, string> = {};
		columns.forEach(col => {
			tokenMap[col.token.replace(/^--/, '')] = col.hex;
		});
		themeState.setCustomTokens(tokenMap);
		if (onApply) {
			onApply(columns);
		}
	}

	const formattedCode = $derived.by(() => {
		if (columns.length === 0) return '';
		switch (activeFormat) {
			case 'sass':
				return `$palette:\n${columns.map(c => `\t${c.token.replace(/^--/, '')}: ${c.hex.toLowerCase()}`).join('\n')}`;
			case 'css':
				return `:root {\n${columns.map(c => `  ${c.token}: ${c.hex.toLowerCase()};`).join('\n')}\n}`;
			case 'scss':
				return `$theme-palette: (\n${columns.map(c => `  '${c.token.replace(/^--/, '')}': ${c.hex.toLowerCase()},`).join('\n')}\n);`;
			case 'tailwind':
				return `colors: {\n${columns.map(c => `  '${c.token.replace(/^--/, '')}': '${c.hex.toLowerCase()}',`).join('\n')}\n}`;
			case 'hex':
				return JSON.stringify(columns.map(c => c.hex), null, 2);
			case 'hsl':
				return JSON.stringify(columns.map(c => `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`), null, 2);
		}
	});

	function copyCode() {
		navigator.clipboard.writeText(formattedCode);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	onMount(() => {
		isDark = themeState.isDark;
		updatePalette(baseColor, harmonyMode);
	});
</script>

<div class="palette-generator-container {className}">
	<!-- Top Toolbar -->
	<div class="palette-toolbar">
		<div class="palette-base-input-group">
			<div class="palette-color-picker-trigger" style="background-color: {baseColor};">
				<input
					type="color"
					class="palette-color-picker-input"
					value={baseColor}
					oninput={(e) => updatePalette(e.currentTarget.value)}
				/>
			</div>
			<input
				type="text"
				class="palette-hex-input"
				value={baseColor}
				onchange={(e) => updatePalette(e.currentTarget.value)}
			/>
		</div>

		<!-- Harmony Mode Tabs -->
		<div class="palette-harmony-tabs">
			{#each harmonyModes as mode (mode.id)}
				<button
					type="button"
					class="palette-harmony-btn"
					class:active={harmonyMode === mode.id}
					onclick={() => updatePalette(undefined, mode.id)}
				>
					{mode.label}
				</button>
			{/each}
		</div>

		<!-- Actions -->
		<div class="palette-actions">
			<button type="button" class="palette-btn" onclick={toggleMode} title="Toggle Light/Dark Theme">
				{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
			</button>
			<button type="button" class="palette-btn" onclick={randomize} title="Randomize unlocked colors">
				🎲 Randomize
			</button>
			<button type="button" class="palette-btn" onclick={reset} title="Reset palette">
				↺ Reset
			</button>
			<button type="button" class="palette-btn palette-btn-primary" onclick={applyTheme} title="Apply to active theme">
				✦ Apply Theme
			</button>
		</div>
	</div>

	<!-- 9-Column Spectrum Grid -->
	<div class="palette-columns-grid">
		{#each columns as col, idx (col.token)}
			<div class="palette-col" style="background-color: {col.hex};">
				<div class="palette-col-header">
					{#if idx === 7}
						<span class="palette-base-badge">BASE</span>
					{/if}
					<button
						type="button"
						class="palette-lock-btn"
						class:locked={col.locked}
						title={col.locked ? 'Unlock color' : 'Lock color'}
						onclick={() => toggleLock(idx)}
					>
						{#if col.locked}
							🔒
						{:else}
							🔓
						{/if}
					</button>
				</div>

				<label class="palette-col-footer" style="cursor: pointer;" title="Click to change hue/color">
					<input
						type="color"
						value={col.hex}
						style="opacity: 0; width: 0; height: 0; position: absolute; pointer-events: none;"
						oninput={(e) => updateColumnColor(idx, e.currentTarget.value)}
					/>
					<span class="palette-col-token" title={col.label}>{col.token}</span>
					<span class="palette-col-hex">
						{col.hex}
					</span>
					<span class="palette-col-hsl">
						hsl({col.hsl.h}, {col.hsl.s}%, {col.hsl.l}%)
					</span>
					<div class="palette-col-contrast">
						<span>W: {col.contrastWhite}</span>
						<span>•</span>
						<span>B: {col.contrastBlack}</span>
					</div>
				</label>
			</div>
		{/each}
	</div>

	<!-- Code Export Panel -->
	<div class="palette-code-panel">
		<div class="palette-code-header">
			<div class="palette-format-tabs">
				{#each ['sass', 'css', 'scss', 'tailwind', 'hex', 'hsl'] as fmt}
					<button
						type="button"
						class="palette-format-btn"
						class:active={activeFormat === fmt}
						onclick={() => (activeFormat = fmt as any)}
					>
						{fmt}
					</button>
				{/each}
			</div>
			<button type="button" class="palette-copy-btn" onclick={copyCode}>
				{copied ? '✓ Copied' : '📋 Copy All'}
			</button>
		</div>
		<pre class="palette-code-content"><code>{formattedCode}</code></pre>
	</div>
</div>
