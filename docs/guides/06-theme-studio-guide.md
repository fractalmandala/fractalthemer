---
id: theme-studio-guide
title: Theme Studio & Gradient Generator Guide
type: guide
tags: [studio, gradients, procedural-shaders, generator-engines, silhouettes, colourways, export]
summary: In-depth guide to using the Theme Studio, configuring the 21 generator engines, 24 silhouette forms, 12 colourway wheels, manipulating canvas pins, and exporting or saving as active themes.
relates_to: [theme-studio-component, 21-generator-engines, export-modal, custom-themes]
updated: 2026-08-16
---

# 🎨 Theme Studio & Gradient Generator Guide

The **Theme Studio** is an interactive, visual environment for synthesizing, calibrating, and exporting dynamic gradients, silhouette forms, and custom theme suites.

---

## 🚀 1. Opening the Theme Studio

You can invoke the Theme Studio in two ways:

### Method A: From the Theme Drawer (`<ThemePicker />`)
Click the **🎨 Studio** button in the header or footer of the theme drawer.

### Method B: Dedicated Standalone Page
```svelte
<!-- src/routes/studio/+page.svelte -->
<script lang="ts">
  import { ThemeStudio } from 'fractalthemer';
</script>

<ThemeStudio open={true} />
```

---

## ⚡ 2. The 4 Generator Categories & 21 Engines

### A. Fields (Fluid & Atmospheric Shaders)
- **Flow**: 2D Simplex turbulence displacement noise with `Scale`, `Distortion`, and `Swirl` controls.
- **Sky**: Rayleigh horizon atmospheric scattering with sun `Elevation` (0°–90°).
- **Aurora**: Shimmering Northern Lights ray curtains with `Lights`, `Fold`, and `Spread`.
- **Mesh**: Multi-node 2D Bezier grid interpolation with draggable canvas anchor points.
- **Still**: Quadratic optical vignette depth wash.
- **Retro**: Filmic analog chromatic separation and warm tone-mapping with grain dither.
- **iOS**: Saturated glassmorphic optical blur backdrop.

### B. Stripes (Spectral & Geometric Waves)
- **Linear**: Multi-stop directional linear gradients with 0–360° angle control.
- **Stripes**: Parallel spectral bands with duty-cycle and angle rotation.
- **Bars**: Equalizer bar array with bar `Count` (4–64) and speed animation.
- **Columns**: Vertical spectral partitions with crisp edge contrast.
- **Prism**: Refractive chromatic dispersion splitting white light into spectral bands.
- **Waves**: Multi-layer harmonic sinusoidal wave layers.
- **Lines**: Dimensional ribbon tubes with path presets (*Snake, Drops, Loops, Ribbon, Doodle, Wander, Waves, Echo*).

### C. Objects (Geometric Shapes & Ripples)
- **Rings**: Concentric circular acoustic ripples with exponential decay.
- **Pixel**: Modular retro 8-bit quantized pixel grid with dither density.
- **Blocks**: Structured polygonal grid cells with edge bevel softness.
- **Beehive**: Hexagonal cellular honeycomb lattice.
- **Balls**: Floating radial metaballs with liquid gravitational blending.
- **Radial**: Multi-point radial spotlight emitters.
- **Conic**: 360° angular conic sweeps around a central focal point.

### D. Forms (24 SVG Silhouettes)
- Choose from 24 vector silhouette masks (*Arch, Clover, Heart, Drapery, 4-Leaf, Sunburst, Flower, Starburst, Cross, Ring, Sparkle, Horizontal Stripes, Dome, Propeller, Squiggle, Flower-8, Teardrop, Circle, Pebble, Eye-Ring, Crescent, Star, X-Pill, Wave*) rendered with multi-stop linear gradient fills over paper canvas.

---

## 🥧 3. 12 Curated Colourway Wheels & Arrangements

- **Colourway Wheels**: 12 circular segmented SVG pie swatches (*Solar, Lagoon, Coral, Aerial, Botanic, Violet, Cobalt, Cinder, Vivid, Rainbow, Rosewater, Midnight*) to retint any active blend in 1 click without altering pin positions.
- **Arrangement Presets**: Engine-specific spatial configurations (e.g. *Snake, Loops, Ribbon, Waves* for Lines; *Iridescent cloud, Solar flare* for Flow) that re-arrange coordinates without resetting colors.

---

## 🎯 4. Direct Canvas Ergonomics

1. **Draggable Color Pins**: Click and drag any color pin on the canvas to reposition its emitter coordinates in real-time.
2. **Ring Reach Handles**: Click and drag the dashed ring surrounding a pin to expand or contract its radial influence falloff.
3. **Multi-Band Timeline**: Drag divider handles along the bottom timeline bar to rebalance color dominance across the viewport.
4. **Finish Sliders**:
   - `Soften`: Adjusts Gaussian blur in pixels.
   - `Noise`: Injects procedural grain dither to eliminate 8-bit color banding.

---

## 💾 5. Saving, Sharing & Theme Creation

The fixed top action bar provides 1-click tools:
- **`💾 Save`**: Saves the blend to `localStorage['fractalthemer:saved_studio_recipes']`. Deduplicates by title and shows toast confirmation.
- **`✦ Use in Theme`**: Packages the active blend + derived semantic tokens into a named custom theme, applies it to `:root`, and surfaces it in the Theme Drawer.
- **`🔗 Share`**: Generates a shareable URL containing the base64-encoded recipe payload.
- **`👁 Preview`**: Toggles distraction-free full-bleed preview mode.
- **`📦 Export`**: Exports clean CSS, SASS, SVG, or JSON code.
