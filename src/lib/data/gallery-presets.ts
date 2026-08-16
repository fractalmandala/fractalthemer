// 70+ Curated Gradient Studies & Presets for Gallery and Studio
export interface GalleryPreset {
	id: string;
	title: string;
	category: 'fields' | 'stripes' | 'objects';
	engineType: string;
	tags: string[];
	colors: string[];
	parameters?: Record<string, number | string | boolean>;
	soften?: number;
	noise?: number;
}

export const GALLERY_PRESETS: GalleryPreset[] = [
	// --- FIELDS (Flow, Sky, Aurora, Mesh, Still, Retro, iOS) ---
	{ id: 'f-01', title: 'Wisteria Night', category: 'fields', engineType: 'flow', tags: ['Flow', 'Dark', 'Purple'], colors: ['#7209B7', '#3A0CA3', '#1C1D21'], parameters: { scale: 65, distortion: 48 }, soften: 8, noise: 5 },
	{ id: 'f-02', title: 'Moon Haze', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Light', 'Blue'], colors: ['#ADE8F4', '#E0AAFF', '#F8F9FA', '#0096C7'], parameters: { scale: 50, distortion: 30 }, soften: 12, noise: 4 },
	{ id: 'f-03', title: 'Night Purple', category: 'fields', engineType: 'aurora', tags: ['Aurora', 'Dark', 'Purple'], colors: ['#0B132B', '#560BAD', '#B5179E', '#7209B7'], parameters: { lights: 65, fold: 55, drift: 40, spread: 50, direction: 'up' }, soften: 6, noise: 6 },
	{ id: 'f-04', title: 'Plum Smoke', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Dark', 'Purple'], colors: ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7'], parameters: { scale: 45, distortion: 60 }, soften: 10, noise: 5 },
	{ id: 'f-05', title: 'Cork Tree Mist', category: 'fields', engineType: 'still', tags: ['Still', 'Light', 'Yellow'], colors: ['#E09F3E', '#FFF3B0', '#F8F9FA'], parameters: { scale: 70, distortion: 20 }, soften: 14, noise: 3 },
	{ id: 'f-06', title: 'Indigo Depth', category: 'fields', engineType: 'flow', tags: ['Flow', 'Dark', 'Blue'], colors: ['#03045E', '#023E8A', '#0077B6', '#0096C7'], parameters: { scale: 58, distortion: 52 }, soften: 8, noise: 4 },
	{ id: 'f-07', title: 'Hanada Sky', category: 'fields', engineType: 'sky', tags: ['Sky', 'Light', 'Blue'], colors: ['#00B4D8', '#ADE8F4', '#FEFAE0'], parameters: { elevation: 45, diffusion: 60 }, soften: 12, noise: 3 },
	{ id: 'f-08', title: 'Cherry Haze', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Light', 'Red'], colors: ['#FFB7B2', '#F28482', '#F8F9FA', '#FFF3B0'], parameters: { scale: 50, distortion: 35 }, soften: 10, noise: 4 },
	{ id: 'f-09', title: 'Spring Celadon', category: 'fields', engineType: 'flow', tags: ['Flow', 'Light', 'Green'], colors: ['#74C69D', '#D8F3DC', '#2D6A4F', '#081C15'], parameters: { scale: 55, distortion: 44 }, soften: 8, noise: 5 },
	{ id: 'f-10', title: 'Northern Lights', category: 'fields', engineType: 'aurora', tags: ['Aurora', 'Dark', 'Green'], colors: ['#081C15', '#1B4332', '#52B788', '#95D5B2'], parameters: { lights: 75, fold: 62, drift: 48, spread: 60, direction: 'up' }, soften: 6, noise: 6 },
	{ id: 'f-11', title: 'Polar Dawn', category: 'fields', engineType: 'aurora', tags: ['Aurora', 'Dark', 'Blue'], colors: ['#03045E', '#00B4D8', '#ADE8F4', '#F8F9FA'], parameters: { lights: 60, fold: 50, drift: 40, spread: 55, direction: 'up' }, soften: 8, noise: 5 },
	{ id: 'f-12', title: 'Solar Flare Field', category: 'fields', engineType: 'flow', tags: ['Flow', 'Dark', 'Yellow'], colors: ['#800E13', '#E63946', '#F77F00', '#FCBF49'], parameters: { scale: 60, distortion: 55 }, soften: 8, noise: 6 },
	{ id: 'f-13', title: 'Emerald Rays', category: 'fields', engineType: 'aurora', tags: ['Aurora', 'Dark', 'Green'], colors: ['#081C15', '#2D6A4F', '#74C69D', '#D8F3DC'], parameters: { lights: 70, fold: 58, drift: 45, spread: 52, direction: 'up' }, soften: 7, noise: 5 },
	{ id: 'f-14', title: 'Ice Storm', category: 'fields', engineType: 'aurora', tags: ['Aurora', 'Dark', 'Blue'], colors: ['#0B132B', '#1C2541', '#00B4D8', '#F8F9FA'], parameters: { lights: 55, fold: 48, drift: 35, spread: 45, direction: 'up' }, soften: 6, noise: 5 },
	{ id: 'f-15', title: 'Ghost Light', category: 'fields', engineType: 'aurora', tags: ['Aurora', 'Dark', 'Purple'], colors: ['#22223B', '#7209B7', '#E0AAFF', '#F8F9FA'], parameters: { lights: 50, fold: 42, drift: 30, spread: 40, direction: 'up' }, soften: 9, noise: 5 },
	{ id: 'f-16', title: 'Coral Dream', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Light', 'Red'], colors: ['#F28482', '#FFD166', '#FFB7B2', '#F8F9FA'], parameters: { scale: 48, distortion: 40 }, soften: 11, noise: 4 },
	{ id: 'f-17', title: 'Matcha Air', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Light', 'Green'], colors: ['#606C38', '#D8F3DC', '#95D5B2', '#FEFAE0'], parameters: { scale: 52, distortion: 36 }, soften: 12, noise: 4 },
	{ id: 'f-18', title: 'Peach Smoke', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Light', 'Red'], colors: ['#F77F00', '#FFB7B2', '#FEFAE0', '#F8F9FA'], parameters: { scale: 50, distortion: 42 }, soften: 10, noise: 4 },
	{ id: 'f-19', title: 'Deep Sea Mist', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Dark', 'Blue'], colors: ['#03045E', '#0077B6', '#081C15', '#2D6A4F'], parameters: { scale: 45, distortion: 50 }, soften: 9, noise: 5 },
	{ id: 'f-20', title: 'Vintage Sunset', category: 'fields', engineType: 'retro', tags: ['Retro', 'Light', 'Yellow'], colors: ['#C08552', '#E09F3E', '#F28482', '#FFF3B0'], parameters: { scale: 65, softness: 75 }, soften: 10, noise: 7 },
	{ id: 'f-21', title: 'Sunkissed Analog', category: 'fields', engineType: 'retro', tags: ['Retro', 'Light', 'Red'], colors: ['#E56B6F', '#FFD166', '#FEFAE0', '#6D2E46'], parameters: { scale: 60, softness: 70 }, soften: 11, noise: 8 },
	{ id: 'f-22', title: 'Old Photograph', category: 'fields', engineType: 'retro', tags: ['Retro', 'Light', 'Brown'], colors: ['#895737', '#DAB49D', '#FEFAE0', '#38220F'], parameters: { scale: 70, softness: 80 }, soften: 12, noise: 8 },
	{ id: 'f-23', title: 'Frosted Glass Blue', category: 'fields', engineType: 'ios', tags: ['iOS', 'Light', 'Blue'], colors: ['#00B4D8', '#ADE8F4', '#F8F9FA', '#7209B7'], parameters: { blur: 80, saturation: 90 }, soften: 16, noise: 3 },
	{ id: 'f-24', title: 'Silk Sky Atmosphere', category: 'fields', engineType: 'ios', tags: ['iOS', 'Light', 'Purple'], colors: ['#B5179E', '#E0AAFF', '#ADE8F4', '#F8F9FA'], parameters: { blur: 85, saturation: 85 }, soften: 18, noise: 3 },

	// --- STRIPES (Linear, Stripes, Bars, Columns, Prism, Waves, Lines) ---
	{ id: 's-01', title: 'Soundwave Bars', category: 'stripes', engineType: 'bars', tags: ['Bars', 'Dark', 'Blue'], colors: ['#1C1D21', '#03045E', '#0077B6', '#00B4D8', '#52B788'], parameters: { envelope: 'ramp', count: 24, spread: 15, speed: 76 }, soften: 0, noise: 4 },
	{ id: 's-02', title: 'Morning Haze Columns', category: 'stripes', engineType: 'columns', tags: ['Columns', 'Light', 'Purple'], colors: ['#E0AAFF', '#FFB7B2', '#ADE8F4', '#FEFAE0'], parameters: { count: 8, speed: 34 }, soften: 4, noise: 3 },
	{ id: 's-03', title: 'Ultraviolet Prism', category: 'stripes', engineType: 'prism', tags: ['Prism', 'Dark', 'Purple'], colors: ['#00B4D8', '#3A0CA3', '#7209B7', '#560BAD'], parameters: { count: 11, speed: 48 }, soften: 3, noise: 4 },
	{ id: 's-04', title: 'Neon Dusk Stripes', category: 'stripes', engineType: 'stripes', tags: ['Stripes', 'Dark', 'Red'], colors: ['#1C1D21', '#E63946', '#F72585', '#7209B7'], parameters: { count: 16, angle: 45, width: 50 }, soften: 2, noise: 4 },
	{ id: 's-05', title: 'Blue Ocean Waves', category: 'stripes', engineType: 'waves', tags: ['Waves', 'Light', 'Blue'], colors: ['#03045E', '#0077B6', '#00B4D8', '#D8F3DC'], parameters: { count: 6, frequency: 30, speed: 45 }, soften: 5, noise: 4 },
	{ id: 's-06', title: 'Dusk Waves', category: 'stripes', engineType: 'waves', tags: ['Waves', 'Dark', 'Red'], colors: ['#0B132B', '#6D2E46', '#E56B6F', '#FCBF49'], parameters: { count: 5, frequency: 25, speed: 40 }, soften: 6, noise: 5 },
	{ id: 's-07', title: 'Flowing Tubes', category: 'stripes', engineType: 'lines', tags: ['Lines', 'Light', 'Blue'], colors: ['#03045E', '#00B4D8', '#F8F9FA'], parameters: { tension: 60, thickness: 40, speed: 50 }, soften: 4, noise: 4 },
	{ id: 's-08', title: 'Snake Ribbon', category: 'stripes', engineType: 'lines', tags: ['Lines', 'Dark', 'Blue'], colors: ['#1C2541', '#0077B6', '#F8F9FA'], parameters: { tension: 75, thickness: 50, speed: 60 }, soften: 3, noise: 5 },
	{ id: 's-09', title: 'Red Alert Soundwave', category: 'stripes', engineType: 'bars', tags: ['Bars', 'Dark', 'Red'], colors: ['#1C1D21', '#800E13', '#E63946', '#FFD166'], parameters: { envelope: 'curve', count: 32, spread: -20, speed: 85 }, soften: 0, noise: 4 },
	{ id: 's-10', title: 'Pulse Equalizer', category: 'stripes', engineType: 'bars', tags: ['Bars', 'Dark', 'Green'], colors: ['#081C15', '#2D6A4F', '#74C69D', '#D8F3DC'], parameters: { envelope: 'flat', count: 18, spread: 0, speed: 65 }, soften: 0, noise: 3 },
	{ id: 's-11', title: 'Reverb Bars', category: 'stripes', engineType: 'bars', tags: ['Bars', 'Dark', 'Purple'], colors: ['#22223B', '#560BAD', '#B5179E', '#E0AAFF'], parameters: { envelope: 'curve', count: 20, spread: 10, speed: 70 }, soften: 0, noise: 4 },
	{ id: 's-12', title: 'Ice Pillars Columns', category: 'stripes', engineType: 'columns', tags: ['Columns', 'Light', 'Blue'], colors: ['#ADE8F4', '#00B4D8', '#F8F9FA', '#0077B6'], parameters: { count: 12, speed: 30 }, soften: 4, noise: 3 },
	{ id: 's-13', title: 'Peacock Spectrum', category: 'stripes', engineType: 'prism', tags: ['Prism', 'Dark', 'Green'], colors: ['#081C15', '#2D6A4F', '#0096C7', '#7209B7'], parameters: { count: 9, speed: 50 }, soften: 3, noise: 5 },
	{ id: 's-14', title: 'Festival Prism', category: 'stripes', engineType: 'prism', tags: ['Prism', 'Light', 'Red'], colors: ['#F72585', '#7209B7', '#FFD166', '#00B4D8'], parameters: { count: 14, speed: 60 }, soften: 2, noise: 4 },
	{ id: 's-15', title: 'Aurora Borealis Wave', category: 'stripes', engineType: 'waves', tags: ['Waves', 'Dark', 'Green'], colors: ['#081C15', '#1B4332', '#74C69D', '#ADE8F4'], parameters: { count: 7, frequency: 35, speed: 55 }, soften: 5, noise: 5 },
	{ id: 's-16', title: 'Sunset Linear', category: 'stripes', engineType: 'linear', tags: ['Linear', 'Light', 'Yellow'], colors: ['#E56B6F', '#FCBF49', '#FEFAE0'], parameters: { angle: 135 }, soften: 0, noise: 2 },
	{ id: 's-17', title: 'Evening Glow Linear', category: 'stripes', engineType: 'linear', tags: ['Linear', 'Dark', 'Red'], colors: ['#22223B', '#E56B6F', '#F77F00'], parameters: { angle: 45 }, soften: 0, noise: 3 },
	{ id: 's-18', title: 'Desert Mirage Linear', category: 'stripes', engineType: 'linear', tags: ['Linear', 'Light', 'Brown'], colors: ['#895737', '#E09F3E', '#FFF3B0', '#F8F9FA'], parameters: { angle: 90 }, soften: 0, noise: 2 },
	{ id: 's-19', title: 'Nordic Clean Linear', category: 'stripes', engineType: 'linear', tags: ['Linear', 'Light', 'Grey'], colors: ['#6C757D', '#E0E1DD', '#FFFFFF'], parameters: { angle: 180 }, soften: 0, noise: 1 },
	{ id: 's-20', title: 'Dark Cyber Linear', category: 'stripes', engineType: 'linear', tags: ['Linear', 'Dark', 'Blue'], colors: ['#0B132B', '#1C2541', '#00B4D8'], parameters: { angle: 225 }, soften: 0, noise: 3 },
	{ id: 's-21', title: 'Candy Weave', category: 'stripes', engineType: 'lines', tags: ['Lines', 'Light', 'Red'], colors: ['#F72585', '#FFD166', '#ADE8F4'], parameters: { tension: 70, thickness: 35, speed: 55 }, soften: 3, noise: 3 },
	{ id: 's-22', title: 'Minimalist Mono Wave', category: 'stripes', engineType: 'waves', tags: ['Waves', 'Light', 'Mono'], colors: ['#000000', '#6C757D', '#E0E1DD', '#FFFFFF'], parameters: { count: 4, frequency: 20, speed: 30 }, soften: 4, noise: 2 },
	{ id: 's-23', title: 'Dark Mono Linear', category: 'stripes', engineType: 'linear', tags: ['Linear', 'Dark', 'Mono'], colors: ['#000000', '#1C1D21', '#4A4E69'], parameters: { angle: 90 }, soften: 0, noise: 3 },

	// --- OBJECTS (Rings, Pixel, Blocks, Beehive, Balls, Radial, Conic) ---
	{ id: 'o-01', title: 'Honeycomb Beehive', category: 'objects', engineType: 'beehive', tags: ['Beehive', 'Light', 'Yellow'], colors: ['#FEFAE0', '#FCBF49', '#E63946', '#38220F'], parameters: { cellSize: 50, edge: 50 }, soften: 0, noise: 4 },
	{ id: 'o-02', title: 'Coral Comb', category: 'objects', engineType: 'beehive', tags: ['Beehive', 'Light', 'Red'], colors: ['#FFF3B0', '#F28482', '#6D2E46', '#22223B'], parameters: { cellSize: 45, edge: 40 }, soften: 0, noise: 4 },
	{ id: 'o-03', title: 'Jade Comb', category: 'objects', engineType: 'beehive', tags: ['Beehive', 'Dark', 'Green'], colors: ['#D8F3DC', '#52B788', '#1B4332', '#081C15'], parameters: { cellSize: 55, edge: 60 }, soften: 0, noise: 5 },
	{ id: 'o-04', title: 'Moonlight Radial', category: 'objects', engineType: 'radial', tags: ['Radial', 'Dark', 'Blue'], colors: ['#F8F9FA', '#ADE8F4', '#0077B6', '#03045E'], parameters: { originX: 50, originY: 50, radius: 60 }, soften: 12, noise: 4 },
	{ id: 'o-05', title: 'Rising Sun Radial', category: 'objects', engineType: 'radial', tags: ['Radial', 'Light', 'Red'], colors: ['#FFF3B0', '#FCBF49', '#E63946', '#800E13'], parameters: { originX: 50, originY: 80, radius: 75 }, soften: 14, noise: 4 },
	{ id: 'o-06', title: 'Cherry Orb Radial', category: 'objects', engineType: 'radial', tags: ['Radial', 'Light', 'Red'], colors: ['#FFB7B2', '#F72585', '#7209B7', '#22223B'], parameters: { originX: 40, originY: 40, radius: 55 }, soften: 10, noise: 4 },
	{ id: 'o-07', title: 'Lapis Blocks', category: 'objects', engineType: 'blocks', tags: ['Blocks', 'Dark', 'Blue'], colors: ['#0077B6', '#023E8A', '#03045E', '#1C2541'], parameters: { cellSize: 40, steps: 4, edge: 30 }, soften: 1, noise: 4 },
	{ id: 'o-08', title: 'Dusk Temple Blocks', category: 'objects', engineType: 'blocks', tags: ['Blocks', 'Dark', 'Brown'], colors: ['#FCBF49', '#C08552', '#634832', '#22223B'], parameters: { cellSize: 48, steps: 5, edge: 40 }, soften: 2, noise: 5 },
	{ id: 'o-09', title: 'Pixel Duck Grid', category: 'objects', engineType: 'pixel', tags: ['Pixel', 'Light', 'Yellow'], colors: ['#FCBF49', '#F77F00', '#0077B6', '#081C15'], parameters: { pixelSize: 24, dither: 60 }, soften: 0, noise: 6 },
	{ id: 'o-10', title: 'Retro 8-Bit Sunset', category: 'objects', engineType: 'pixel', tags: ['Pixel', 'Dark', 'Red'], colors: ['#800E13', '#E63946', '#FCBF49', '#22223B'], parameters: { pixelSize: 20, dither: 70 }, soften: 0, noise: 7 },
	{ id: 'o-11', title: 'Acoustic Ripple Rings', category: 'objects', engineType: 'rings', tags: ['Rings', 'Light', 'Blue'], colors: ['#00B4D8', '#ADE8F4', '#F8F9FA', '#03045E'], parameters: { ringCount: 8, decay: 45 }, soften: 6, noise: 4 },
	{ id: 'o-12', title: 'Sonic Echo Rings', category: 'objects', engineType: 'rings', tags: ['Rings', 'Dark', 'Purple'], colors: ['#7209B7', '#B5179E', '#E0AAFF', '#1C1D21'], parameters: { ringCount: 12, decay: 60 }, soften: 8, noise: 5 },
	{ id: 'o-13', title: 'Floating Metaballs', category: 'objects', engineType: 'balls', tags: ['Balls', 'Light', 'Red'], colors: ['#F72585', '#7209B7', '#FFD166', '#00B4D8'], parameters: { ballCount: 6, speed: 45 }, soften: 14, noise: 4 },
	{ id: 'o-14', title: 'Deep Sea Lava Balls', category: 'objects', engineType: 'balls', tags: ['Balls', 'Dark', 'Blue'], colors: ['#03045E', '#0077B6', '#52B788', '#081C15'], parameters: { ballCount: 5, speed: 40 }, soften: 16, noise: 5 },
	{ id: 'o-15', title: 'Rainbow Wheel Conic', category: 'objects', engineType: 'conic', tags: ['Conic', 'Light', 'Yellow'], colors: ['#E63946', '#F77F00', '#FFD166', '#52B788', '#00B4D8', '#7209B7', '#E63946'], parameters: { angle: 0 }, soften: 0, noise: 3 },
	{ id: 'o-16', title: 'Starry Night Conic', category: 'objects', engineType: 'conic', tags: ['Conic', 'Dark', 'Blue'], colors: ['#0B132B', '#03045E', '#FCBF49', '#0B132B'], parameters: { angle: 90 }, soften: 4, noise: 4 },
	{ id: 'o-17', title: 'Cinnamon Duck Conic', category: 'objects', engineType: 'conic', tags: ['Conic', 'Light', 'Brown'], colors: ['#9C6644', '#E09F3E', '#FFF3B0', '#9C6644'], parameters: { angle: 45 }, soften: 2, noise: 3 },
	{ id: 'o-18', title: 'Sunset Pop Retro Rings', category: 'objects', engineType: 'rings', tags: ['Rings', 'Light', 'Red'], colors: ['#E63946', '#FFD166', '#F8F9FA'], parameters: { ringCount: 6, decay: 50 }, soften: 4, noise: 4 },
	{ id: 'o-19', title: 'Celadon Water Rings', category: 'objects', engineType: 'rings', tags: ['Rings', 'Light', 'Green'], colors: ['#74C69D', '#D8F3DC', '#2D6A4F', '#F8F9FA'], parameters: { ringCount: 9, decay: 40 }, soften: 5, noise: 3 },
	{ id: 'o-20', title: 'Navy Gate Mosaic', category: 'objects', engineType: 'blocks', tags: ['Blocks', 'Dark', 'Blue'], colors: ['#1C2541', '#0B132B', '#0077B6', '#E0E1DD'], parameters: { cellSize: 36, steps: 3, edge: 25 }, soften: 1, noise: 4 },
	{ id: 'o-21', title: 'Madder Sun Radial', category: 'objects', engineType: 'radial', tags: ['Radial', 'Dark', 'Red'], colors: ['#FFF3B0', '#E63946', '#800E13', '#1C1D21'], parameters: { originX: 50, originY: 50, radius: 70 }, soften: 12, noise: 5 },
	{ id: 'o-22', title: 'Stardust Dream Mesh', category: 'fields', engineType: 'mesh', tags: ['Mesh', 'Dark', 'Purple'], colors: ['#0B132B', '#3A0CA3', '#B5179E', '#E0AAFF'], parameters: { scale: 50, distortion: 45 }, soften: 12, noise: 5 },
	{ id: 'o-23', title: 'Cosmic Nebula Flow', category: 'fields', engineType: 'flow', tags: ['Flow', 'Dark', 'Purple'], colors: ['#0B132B', '#7209B7', '#00B4D8', '#F72585'], parameters: { scale: 62, distortion: 56 }, soften: 9, noise: 6 }
];
