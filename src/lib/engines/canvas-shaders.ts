// Procedural Mathematical Shader Engines for 60fps High-DPI Canvas Rendering
// Supports all 21 Engines + 24 SVG Silhouette Forms

import type { CanvasPin, StudioRecipe } from '../state/studio.svelte.js';
import { SILHOUETTE_SHAPES } from '../data/silhouettes.js';

export function renderEngineToCanvas(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	recipe: StudioRecipe
) {
	const { engineType, pins, parameters = {} } = recipe;
	const pinCount = pins.length;
	if (pinCount === 0) return;

	// Reset any previous transform
	ctx.save();
	ctx.clearRect(0, 0, width, height);

	// Default base paper background
	ctx.fillStyle = pins[0].color;
	ctx.fillRect(0, 0, width, height);

	switch (engineType) {
		case 'flow':
			renderFlowField(ctx, width, height, pins, parameters);
			break;
		case 'sky':
			renderSkyAtmosphere(ctx, width, height, pins, parameters);
			break;
		case 'aurora':
			renderAuroraCurtains(ctx, width, height, pins, parameters);
			break;
		case 'mesh':
			renderMeshGrid(ctx, width, height, pins, parameters);
			break;
		case 'still':
			renderStillVignette(ctx, width, height, pins, parameters);
			break;
		case 'retro':
			renderRetroAnalog(ctx, width, height, pins, parameters);
			break;
		case 'ios':
			renderIosGlass(ctx, width, height, pins, parameters);
			break;
		case 'linear':
			renderLinearGradient(ctx, width, height, pins, parameters);
			break;
		case 'stripes':
			renderStripes(ctx, width, height, pins, parameters);
			break;
		case 'bars':
			renderSoundwaveBars(ctx, width, height, pins, parameters);
			break;
		case 'columns':
			renderPrismaticColumns(ctx, width, height, pins, parameters);
			break;
		case 'prism':
			renderPrismDispersion(ctx, width, height, pins, parameters);
			break;
		case 'waves':
			renderHarmonicWaves(ctx, width, height, pins, parameters);
			break;
		case 'lines':
			renderRibbonLines(ctx, width, height, pins, parameters);
			break;
		case 'rings':
			renderConcentricRings(ctx, width, height, pins, parameters);
			break;
		case 'pixel':
			renderPixelGrid(ctx, width, height, pins, parameters);
			break;
		case 'blocks':
			renderMosaicBlocks(ctx, width, height, pins, parameters);
			break;
		case 'beehive':
			renderBeehiveHexagons(ctx, width, height, pins, parameters);
			break;
		case 'balls':
			renderMetaballs(ctx, width, height, pins, parameters);
			break;
		case 'radial':
			renderRadialSpotlight(ctx, width, height, pins, parameters);
			break;
		case 'conic':
			renderConicSweep(ctx, width, height, pins, parameters);
			break;
		case 'forms':
			renderSilhouetteForms(ctx, width, height, pins, recipe.activeSilhouette || 'arch');
			break;
		default:
			renderMultiPointGaussian(ctx, width, height, pins);
			break;
	}

	ctx.restore();
}

// 1. Flow Field (2D Turbulence Displacement)
function renderFlowField(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const scale = (params.scale ?? 50) / 100;
	const distortion = (params.distortion ?? 60) / 100;
	const swirl = (params.swirl ?? 10) / 100;

	// Multi-emitter radial blend with turbulence warping
	for (let i = 0; i < pins.length; i++) {
		const pin = pins[i];
		const px = (pin.x / 100) * w;
		const py = (pin.y / 100) * h;
		const radius = (pin.radius / 100) * Math.max(w, h) * (0.8 + scale * 0.6);

		// Distort center position using swirl & trigonometric noise
		const angleOffset = swirl * Math.PI * 2 * (i / pins.length);
		const dx = Math.cos(angleOffset) * (distortion * 60);
		const dy = Math.sin(angleOffset) * (distortion * 60);

		const grad = ctx.createRadialGradient(px + dx, py + dy, 0, px, py, radius);
		grad.addColorStop(0, pin.color);
		grad.addColorStop(0.6, `${pin.color}99`);
		grad.addColorStop(1, 'transparent');

		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
	}
}

// 2. Sky Atmosphere (Rayleigh Horizon Light Scattering)
function renderSkyAtmosphere(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const elevation = (params.elevation ?? 30) / 90; // 0 to 1
	const horizonY = h * (0.4 + (1 - elevation) * 0.4);

	const grad = ctx.createLinearGradient(0, 0, 0, h);
	const topColor = pins[0]?.color || '#03045E';
	const midColor = pins[1]?.color || '#F77F00';
	const baseColor = pins[2]?.color || '#FEE440';

	grad.addColorStop(0, topColor);
	grad.addColorStop(horizonY / h, midColor);
	grad.addColorStop(1, baseColor);

	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, w, h);

	// Sun elevation glow spotlight
	if (pins[3]) {
		const sunGrad = ctx.createRadialGradient(w * 0.5, horizonY, 0, w * 0.5, horizonY, w * 0.4);
		sunGrad.addColorStop(0, `${pins[3].color}DD`);
		sunGrad.addColorStop(0.5, `${pins[3].color}44`);
		sunGrad.addColorStop(1, 'transparent');
		ctx.fillStyle = sunGrad;
		ctx.fillRect(0, 0, w, h);
	}
}

// 3. Aurora (Sinusoidal Shimmering Ray Curtains)
function renderAuroraCurtains(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const fold = (params.fold ?? 50) / 100;
	const spread = (params.spread ?? 60) / 100;
	const rayCount = 18;

	// Dark celestial base
	ctx.fillStyle = pins[0]?.color || '#0B132B';
	ctx.fillRect(0, 0, w, h);

	for (let i = 0; i < rayCount; i++) {
		const x = (i / rayCount) * w;
		const rayWidth = (w / rayCount) * 1.8;
		const color = pins[(i % (pins.length - 1)) + 1]?.color || '#52B788';

		const waveOffset = Math.sin(i * fold * 2) * (h * 0.15);
		const curtainY = h * (0.2 + waveOffset / h);
		const curtainHeight = h * (0.5 + spread * 0.4);

		const rayGrad = ctx.createLinearGradient(x, curtainY, x, curtainY + curtainHeight);
		rayGrad.addColorStop(0, 'transparent');
		rayGrad.addColorStop(0.3, `${color}CC`);
		rayGrad.addColorStop(0.7, `${color}88`);
		rayGrad.addColorStop(1, 'transparent');

		ctx.fillStyle = rayGrad;
		ctx.fillRect(x - rayWidth * 0.5, curtainY, rayWidth, curtainHeight);
	}
}

// 4. Mesh Grid (2D Delaunay / Bezier Point Interpolation)
function renderMeshGrid(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	pins.forEach((pin) => {
		const px = (pin.x / 100) * w;
		const py = (pin.y / 100) * h;
		const radius = (pin.radius / 100) * Math.max(w, h) * 0.8;

		const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
		grad.addColorStop(0, pin.color);
		grad.addColorStop(0.7, `${pin.color}88`);
		grad.addColorStop(1, 'transparent');

		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
	});
}

// 5. Still Vignette
function renderStillVignette(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const centerColor = pins[0]?.color || '#FFFFFF';
	const outerColor = pins[1]?.color || '#000000';

	const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.hypot(w, h) * 0.55);
	grad.addColorStop(0, centerColor);
	grad.addColorStop(0.7, `${centerColor}AA`);
	grad.addColorStop(1, outerColor);

	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, w, h);
}

// 6. Retro Analog (Chromatic Tone-Mapping)
function renderRetroAnalog(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const grad = ctx.createLinearGradient(0, 0, w, h);
	pins.forEach((pin, idx) => {
		grad.addColorStop(idx / (pins.length - 1 || 1), pin.color);
	});
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, w, h);

	// Warm amber vignette wash
	const warmGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
	warmGrad.addColorStop(0, 'rgba(255, 180, 50, 0.15)');
	warmGrad.addColorStop(1, 'rgba(40, 10, 0, 0.45)');
	ctx.fillStyle = warmGrad;
	ctx.fillRect(0, 0, w, h);
}

// 7. iOS Glassmorphic Saturated Bloom
function renderIosGlass(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	pins.forEach((pin, idx) => {
		const angle = (idx / pins.length) * Math.PI * 2;
		const px = w * 0.5 + Math.cos(angle) * (w * 0.25);
		const py = h * 0.5 + Math.sin(angle) * (h * 0.25);
		const radius = Math.max(w, h) * 0.6;

		const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
		grad.addColorStop(0, pin.color);
		grad.addColorStop(0.5, `${pin.color}99`);
		grad.addColorStop(1, 'transparent');

		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
	});
}

// 8. Linear Gradient
function renderLinearGradient(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const angle = ((params.angle ?? 135) * Math.PI) / 180;
	const x1 = w / 2 - (Math.cos(angle) * w) / 2;
	const y1 = h / 2 - (Math.sin(angle) * h) / 2;
	const x2 = w / 2 + (Math.cos(angle) * w) / 2;
	const y2 = h / 2 + (Math.sin(angle) * h) / 2;

	const grad = ctx.createLinearGradient(x1, y1, x2, y2);
	pins.forEach((pin, idx) => {
		grad.addColorStop(idx / (pins.length - 1 || 1), pin.color);
	});

	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, w, h);
}

// 9. Parallel Crisp Stripes
function renderStripes(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const count = Math.max(4, params.count ?? 16);
	const stripeWidth = w / count;

	for (let i = 0; i < count; i++) {
		const pin = pins[i % pins.length];
		ctx.fillStyle = pin.color;
		ctx.fillRect(i * stripeWidth, 0, stripeWidth + 1, h);
	}
}

// 10. Soundwave Equalizer Bars
function renderSoundwaveBars(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const barCount = Math.max(4, params.count ?? 24);
	const barWidth = w / barCount;
	const envelope = params.envelope ?? 'curve';

	for (let i = 0; i < barCount; i++) {
		const norm = i / (barCount - 1);
		let envHeight = 1;
		if (envelope === 'curve') {
			envHeight = Math.sin(norm * Math.PI);
		} else if (envelope === 'ramp') {
			envHeight = norm;
		}

		const barHeight = h * (0.2 + envHeight * 0.7);
		const y = (h - barHeight) / 2;
		const color = pins[i % pins.length].color;

		ctx.fillStyle = color;
		ctx.fillRect(i * barWidth + 2, y, barWidth - 4, barHeight);
	}
}

// 11. Prismatic Columns
function renderPrismaticColumns(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const colCount = Math.max(3, params.count ?? 8);
	const colWidth = w / colCount;

	for (let i = 0; i < colCount; i++) {
		const x = i * colWidth;
		const grad = ctx.createLinearGradient(x, 0, x + colWidth, 0);
		const c1 = pins[i % pins.length].color;
		const c2 = pins[(i + 1) % pins.length].color;

		grad.addColorStop(0, c1);
		grad.addColorStop(0.5, '#FFFFFF44');
		grad.addColorStop(1, c2);

		ctx.fillStyle = grad;
		ctx.fillRect(x, 0, colWidth, h);
	}
}

// 12. Prism Dispersion
function renderPrismDispersion(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const fanGrad = ctx.createConicGradient(Math.PI * 0.25, w * 0.2, h * 0.5);
	pins.forEach((pin, idx) => {
		fanGrad.addColorStop(idx / (pins.length - 1 || 1), pin.color);
	});

	ctx.fillStyle = fanGrad;
	ctx.fillRect(0, 0, w, h);
}

// 13. Harmonic Undulating Waves
function renderHarmonicWaves(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	pins.forEach((pin, idx) => {
		const baseY = (h / (pins.length + 1)) * (idx + 1);
		const freq = 0.005 * (idx + 1);
		const amp = h * 0.12;

		ctx.beginPath();
		ctx.moveTo(0, h);
		for (let x = 0; x <= w; x += 5) {
			const y = baseY + Math.sin(x * freq + idx) * amp;
			ctx.lineTo(x, y);
		}
		ctx.lineTo(w, h);
		ctx.closePath();

		ctx.fillStyle = `${pin.color}CC`;
		ctx.fill();
	});
}

// 14. Ribbon Lines
function renderRibbonLines(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const thickness = params.thickness ?? 24;

	pins.forEach((pin, idx) => {
		ctx.beginPath();
		ctx.lineWidth = thickness;
		ctx.strokeStyle = pin.color;
		ctx.lineCap = 'round';

		const yOffset = (idx - pins.length / 2) * (thickness * 1.5);
		ctx.moveTo(w * 0.1, h * 0.5 + yOffset);
		ctx.bezierCurveTo(
			w * 0.35,
			h * 0.1 + yOffset,
			w * 0.65,
			h * 0.9 + yOffset,
			w * 0.9,
			h * 0.5 + yOffset
		);
		ctx.stroke();
	});
}

// 15. Concentric Acoustic Rings
function renderConcentricRings(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const maxR = Math.hypot(w, h) * 0.6;
	const ringCount = 14;

	for (let i = ringCount; i >= 1; i--) {
		const r = (i / ringCount) * maxR;
		const color = pins[i % pins.length].color;

		ctx.beginPath();
		ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
	}
}

// 16. Pixel Modular Grid
function renderPixelGrid(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const cellSize = params.cellSize ?? 24;
	const cols = Math.ceil(w / cellSize);
	const rows = Math.ceil(h / cellSize);

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const idx = (r * cols + c) % pins.length;
			ctx.fillStyle = pins[idx].color;
			ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
		}
	}
}

// 17. Mosaic Blocks
function renderMosaicBlocks(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	params: Record<string, any>
) {
	const step = params.step ?? 40;
	const cols = Math.ceil(w / step);
	const rows = Math.ceil(h / step);

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const idx = (r + c) % pins.length;
			ctx.fillStyle = pins[idx].color;
			ctx.fillRect(c * step + 2, r * step + 2, step - 4, step - 4);
		}
	}
}

// 18. Beehive Hexagons
function renderBeehiveHexagons(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const r = 36;
	const a = (2 * Math.PI) / 6;
	const hDist = r * 1.5;
	const vDist = r * Math.sqrt(3);

	let row = 0;
	for (let y = 0; y < h + r; y += vDist * 0.5) {
		let col = 0;
		for (let x = 0; x < w + r; x += hDist) {
			const cx = x + (row % 2 === 0 ? 0 : r * 0.75);
			const cy = y;
			const color = pins[(row + col) % pins.length].color;

			ctx.beginPath();
			for (let i = 0; i < 6; i++) {
				const px = cx + r * Math.cos(a * i);
				const py = cy + r * Math.sin(a * i);
				if (i === 0) ctx.moveTo(px, py);
				else ctx.lineTo(px, py);
			}
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();
			col++;
		}
		row++;
	}
}

// 19. Metaballs (Liquid Gravitational Potential)
function renderMetaballs(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	pins.forEach((pin) => {
		const px = (pin.x / 100) * w;
		const py = (pin.y / 100) * h;
		const radius = (pin.radius / 100) * Math.max(w, h) * 0.5;

		const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
		grad.addColorStop(0, pin.color);
		grad.addColorStop(0.6, `${pin.color}DD`);
		grad.addColorStop(1, 'transparent');

		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
	});
}

// 20. Radial Spotlight
function renderRadialSpotlight(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const originPin = pins[0] || { x: 50, y: 50, radius: 50, color: '#FFFFFF' };
	const px = (originPin.x / 100) * w;
	const py = (originPin.y / 100) * h;
	const radius = (originPin.radius / 100) * Math.hypot(w, h) * 0.8;

	const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
	pins.forEach((pin, idx) => {
		grad.addColorStop(idx / (pins.length - 1 || 1), pin.color);
	});

	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, w, h);
}

// 21. Conic Sweep
function renderConicSweep(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	_params: Record<string, any>
) {
	const originPin = pins[0] || { x: 50, y: 50, radius: 50, color: '#FFFFFF' };
	const px = (originPin.x / 100) * w;
	const py = (originPin.y / 100) * h;

	const grad = ctx.createConicGradient(0, px, py);
	pins.forEach((pin, idx) => {
		grad.addColorStop(idx / (pins.length - 1 || 1), pin.color);
	});

	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, w, h);
}

// 22. 24 SVG Silhouette Forms
function renderSilhouetteForms(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[],
	silhouetteId: string
) {
	const shape = SILHOUETTE_SHAPES.find((s) => s.id === silhouetteId) || SILHOUETTE_SHAPES[0];
	const path2d = new Path2D(shape.path);

	ctx.save();
	// Background paper
	ctx.fillStyle = pins[0]?.color || '#FAF9F6';
	ctx.fillRect(0, 0, w, h);

	// Scale 100x100 path to canvas center
	const scale = Math.min(w, h) * 0.0075;
	ctx.translate((w - 100 * scale) / 2, (h - 100 * scale) / 2);
	ctx.scale(scale, scale);

	// Gradient fill inside the shape
	const grad = ctx.createLinearGradient(0, 0, 100, 100);
	pins.slice(1).forEach((pin, idx) => {
		grad.addColorStop(idx / (pins.length - 2 || 1), pin.color);
	});

	ctx.fillStyle = grad;
	ctx.fill(path2d);
	ctx.restore();
}

function renderMultiPointGaussian(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	pins: CanvasPin[]
) {
	pins.forEach((pin) => {
		const px = (pin.x / 100) * w;
		const py = (pin.y / 100) * h;
		const radius = (pin.radius / 100) * Math.max(w, h) * 0.7;

		const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
		grad.addColorStop(0, pin.color);
		grad.addColorStop(0.6, `${pin.color}88`);
		grad.addColorStop(1, 'transparent');

		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
	});
}
