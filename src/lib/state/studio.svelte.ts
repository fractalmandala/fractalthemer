// Reactive Svelte 5 Runes State for Gradient Studio & Palette Generator
import { GALLERY_PRESETS, type GalleryPreset } from '../data/gallery-presets.js';
import { ARTISAN_COLORS, type ArtisanColor } from '../data/artisan-colors.js';

export interface CanvasPin {
	id: string;
	color: string;
	x: number; // 0 to 100 percentage
	y: number; // 0 to 100 percentage
	radius: number; // 10 to 100 percentage
	locked?: boolean;
}

export interface StudioRecipe {
	id: string;
	title: string;
	category: 'fields' | 'stripes' | 'objects';
	engineType: string;
	pins: CanvasPin[];
	parameters: Record<string, number | string | boolean>;
	soften: number; // 0 to 100px
	noise: number;  // 0 to 20%
}

class StudioState {
	// Top-level Navigation
	activeView = $state<'studio' | 'gallery' | 'palette' | 'saved' | 'whats-new' | 'palette-gen'>('studio');
	activeCategory = $state<'fields' | 'stripes' | 'objects'>('fields');
	
	// Active Recipe
	recipe = $state<StudioRecipe>({
		id: 'custom-01',
		title: 'Tranquil Blend',
		category: 'fields',
		engineType: 'flow',
		pins: [
			{ id: 'pin-1', color: '#74C69D', x: 25, y: 30, radius: 45 },
			{ id: 'pin-2', color: '#D8F3DC', x: 75, y: 25, radius: 40 },
			{ id: 'pin-3', color: '#2D6A4F', x: 40, y: 75, radius: 50 },
			{ id: 'pin-4', color: '#081C15', x: 80, y: 80, radius: 35 }
		],
		parameters: {
			scale: 56,
			distortion: 44,
			lights: 50,
			fold: 50,
			drift: 40,
			spread: 50,
			direction: 'up',
			envelope: 'ramp',
			count: 18,
			speed: 40,
			cellSize: 50,
			edge: 40,
			angle: 45
		},
		soften: 8,
		noise: 5
	});

	// UI Overlays & Toggles
	hideTags = $state(false);
	contrastOverlay = $state(false);
	previewMode = $state(false);
	activePinId = $state<string | null>(null);

	// Saved Recipes (Persisted in localStorage)
	savedRecipes = $state<StudioRecipe[]>([]);

	// Gallery & Palette Data
	galleryPresets = $state<GalleryPreset[]>(GALLERY_PRESETS);
	artisanColors = $state<ArtisanColor[]>(ARTISAN_COLORS);
	galleryFilter = $state('all');
	paletteSearch = $state('');
	paletteCategory = $state('all');
	paletteSort = $state<'hue' | 'light-dark' | 'dark-light'>('hue');

	init() {
		if (typeof window !== 'undefined') {
			try {
				const saved = localStorage.getItem('fractalthemer:saved_studio_recipes');
				if (saved) {
					this.savedRecipes = JSON.parse(saved);
				}
			} catch (e) {
				console.error('Failed to load saved recipes from localStorage:', e);
			}
		}
	}

	loadPreset(preset: GalleryPreset) {
		this.activeCategory = preset.category;
		const pinCount = preset.colors.length;
		const pins: CanvasPin[] = preset.colors.map((color, idx) => {
			const angle = (idx / pinCount) * 2 * Math.PI;
			return {
				id: `pin-${idx + 1}`,
				color,
				x: Math.round(50 + Math.cos(angle) * 30),
				y: Math.round(50 + Math.sin(angle) * 30),
				radius: 40
			};
		});

		this.recipe = {
			id: preset.id,
			title: preset.title,
			category: preset.category,
			engineType: preset.engineType,
			pins,
			parameters: {
				...this.recipe.parameters,
				...(preset.parameters || {})
			},
			soften: preset.soften ?? 8,
			noise: preset.noise ?? 5
		};
		this.activeView = 'studio';
	}

	setEngine(engineType: string, category: 'fields' | 'stripes' | 'objects') {
		this.recipe.engineType = engineType;
		this.recipe.category = category;
		this.activeCategory = category;
	}

	addPin(color: string = '#FCBF49') {
		const id = `pin-${Date.now()}`;
		const x = Math.floor(Math.random() * 60) + 20;
		const y = Math.floor(Math.random() * 60) + 20;
		this.recipe.pins = [...this.recipe.pins, { id, color, x, y, radius: 40 }];
		this.activePinId = id;
	}

	removePin(id: string) {
		if (this.recipe.pins.length <= 2) return; // Maintain minimum 2 colors
		this.recipe.pins = this.recipe.pins.filter(p => p.id !== id);
		if (this.activePinId === id) {
			this.activePinId = this.recipe.pins[0]?.id || null;
		}
	}

	updatePin(id: string, updates: Partial<CanvasPin>) {
		this.recipe.pins = this.recipe.pins.map(p => (p.id === id ? { ...p, ...updates } : p));
	}

	shuffleColors() {
		const colors = this.artisanColors.map(c => c.hex);
		this.recipe.pins = this.recipe.pins.map(p => {
			if (p.locked) return p;
			const randomColor = colors[Math.floor(Math.random() * colors.length)];
			return { ...p, color: randomColor };
		});
	}

	saveCurrentRecipe() {
		const copy: StudioRecipe = JSON.parse(JSON.stringify(this.recipe));
		copy.id = `saved-${Date.now()}`;
		this.savedRecipes = [copy, ...this.savedRecipes];
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('fractalthemer:saved_studio_recipes', JSON.stringify(this.savedRecipes));
			} catch (e) {
				console.error('Failed to save to localStorage:', e);
			}
		}
	}

	deleteSavedRecipe(id: string) {
		this.savedRecipes = this.savedRecipes.filter(r => r.id !== id);
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('fractalthemer:saved_studio_recipes', JSON.stringify(this.savedRecipes));
			} catch (e) {
				console.error('Failed to update localStorage:', e);
			}
		}
	}
}

export const studioState = new StudioState();
