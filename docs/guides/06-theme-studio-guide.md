---
id: theme-studio-guide
title: Theme Studio & Gradient Generator Guide
type: guide
tags: [studio, gradients, procedural-shaders, generator-engines, export]
summary: In-depth guide to using the Theme Studio, configuring the 21 generator engines, manipulating canvas pins, and exporting assets.
relates_to: [theme-studio-component, 21-generator-engines, export-modal]
updated: 2026-08-16
---

# 🎨 Theme Studio & Gradient Generator Guide

The **Theme Studio** is an interactive, visual environment for synthesizing, calibrating, and exporting dynamic gradients and custom theme suites.

---

## 🚀 1. Opening the Theme Studio

You can invoke the Theme Studio in two ways:

### Method A: From the Theme Drawer (`<ThemePicker />`)
Click the **🎨 Studio** button in the footer of the theme drawer.

### Method B: Dedicated Standalone Page
```svelte
<!-- src/routes/studio/+page.svelte -->
<script lang="ts">
  import { ThemeStudio } from 'fractalthemer';
</script>

<ThemeStudio open={true} />
```

---

## ⚡ 2. The 21 Generator Engines

Engines are organized into 3 primary categories:

### A. Fields (Fluid & Atmospheric)
- **Flow**: Multi-emitter organic fluid field. Drag pins to move color sources; drag rings to change reach.
- **Sky**: High-altitude atmospheric horizon wash with elevation angle control.
- **Aurora**: Shimmering Northern Lights ray curtains with `Lights`, `Fold`, `Drift`, and `Spread`.
- **Mesh**: Interpolated multi-node Bezier mesh with draggable canvas anchor points.
- **Still**: Motionless ambient depth wash with subtle vignette falloff.
- **Retro**: Analog vintage chromatic wash with warm tone-mapping.
- **iOS**: Frosted glassmorphic optical blur backdrop with saturated ambient glow.

### B. Stripes (Spectral & Geometric Waves)
- **Linear**: Multi-stop directional linear gradients with 0–360° angle control.
- **Stripes**: Parallel spectral bands with duty-cycle and angle rotation.
- **Bars**: Soundwave equalizer with `Envelope` (`Curve`, `Flat`, `Ramp`), bar `Count` (4–64), and draggable bar height handles.
- **Columns**: Prismatic vertical light sweeps.
- **Prism**: Spectral chromatic dispersion.
- **Waves**: Harmonic undulating wave layers.
- **Lines**: Flowing dimensional ribbon tubes.

### C. Objects (Geometric Shapes & Ripples)
- **Rings**: Concentric circular acoustic ripples with exponential decay.
- **Pixel**: Modular retro 8-bit quantized pixel grid with dither density.
- **Blocks**: Structured polygonal grid cells with edge bevel softness.
- **Beehive**: Hexagonal honeycomb cell matrix.
- **Balls**: Floating radial metaballs with liquid gravitational blending.
- **Radial**: Multi-point radial spotlight emitters.
- **Conic**: 360° angular conic sweeps around a central focal point.

---

## 🎯 3. Direct Canvas Ergonomics

1. **Draggable Color Pins**: Click and drag any color pin on the canvas to reposition its emitter coordinates in real-time.
2. **Ring Reach Handles**: Click and drag the dashed ring surrounding a pin to expand or contract its radial influence falloff.
3. **Multi-Band Timeline**: Drag divider handles along the bottom timeline bar to rebalance color dominance across the viewport.
4. **Finish Sliders**:
   - `Soften`: Adjusts Gaussian blur in pixels.
   - `Noise`: Injects procedural grain dither to eliminate 8-bit color banding.

---

## 📦 4. Exporting Assets & Code

Click **📦 Export** in the bottom action bar to open the export dialog:
- **CSS**: Pure vanilla CSS (`linear-gradient`, `radial-gradient`, `@keyframes`).
- **SASS**: Single-tab indented SASS `$variables` and `@mixin`.
- **SVG**: Vector file with embedded `<defs>` linear/radial filters.
- **JSON**: Serialized recipe for database or file storage.
- **PNG**: 1x, 2x, 4x retina raster snapshot.
