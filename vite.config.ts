import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, type Plugin } from 'vite';
import { buildRegistry } from './scripts/build-registry.mjs';

// Keeps the class registry fresh while you work: any change under
// src/lib/styles regenerates src/lib/data/registry.json (debounced, and only
// written when something actually changed), which Vite then HMRs into the
// registry page. Builds regenerate it once up front so the data can never ship
// stale.
function registry(): Plugin {
	let timer: ReturnType<typeof setTimeout> | undefined;

	const run = async (reason: string) => {
		try {
			const result = await buildRegistry({ quiet: true });
			if (result.changed) {
				console.log(`[registry] ${reason} — ${result.layers.length} layers, ${result.total} items`);
			}
		} catch (error) {
			console.warn(`[registry] ${reason} failed:`, error);
		}
	};

	const schedule = (reason: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => void run(reason), 100);
	};

	const isLayer = (file: string) => file.endsWith('.sass') && file.includes('/src/lib/styles/');

	return {
		name: 'fractalthemer-registry',
		async buildStart() {
			await run('initial build');
		},
		configureServer(server) {
			for (const event of ['change', 'add', 'unlink'] as const) {
				server.watcher.on(event, (file: string) => {
					if (isLayer(file)) schedule('styles changed');
				});
			}
		}
	};
}

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: vitePreprocess()
		}),
		registry()
	]
});
