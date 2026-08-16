---
id: 21-generator-engines
title: 21 Gradient Generator Engines Catalog
type: design
tags: [engines, generators, shaders, fields, stripes, objects]
summary: Comprehensive technical reference for all 21 procedural gradient generator engines across Fields, Stripes, and Objects.
relates_to: [theme-studio, theme-studio-guide]
updated: 2026-08-16
---

# ⚡ 21 Gradient Generator Engines Catalog

`fractalthemer` provides 21 procedural gradient synthesis engines divided into 3 core paradigms:

---

## 🌊 1. Fields (7 Engines)

| Engine | Description | Primary Controls |
|---|---|---|
| `flow` | Organic fluid noise simulation with draggable color emitters. | `Scale` (10–100%), `Distortion` (0–100%) |
| `sky` | High-altitude atmospheric horizon wash with elevation angle. | `Elevation`, `Diffusion` |
| `aurora` | Shimmering Northern Lights ray curtains with multi-stage waves. | `Lights`, `Fold`, `Drift`, `Spread`, `Direction` |
| `mesh` | Interpolated multi-node Bezier mesh with draggable canvas anchor points. | `Node positions`, `Shuffle`, `Reset` |
| `still` | Clean motionless atmospheric depth wash with subtle vignette. | `Vignette`, `Softness` |
| `retro` | Vintage analog chromatic wash with warm tone-mapping. | `Warmth`, `Softness` |
| `ios` | Frosted glassmorphic optical blur backdrop with saturated ambient glow. | `Blur`, `Saturation` |

---

## 💈 2. Stripes (7 Engines)

| Engine | Description | Primary Controls |
|---|---|---|
| `linear` | High-precision multi-stop directional linear gradient. | `Angle` (0–360°) |
| `stripes` | Crisp parallel spectral bands. | `Count` (4–64), `Angle`, `Width` |
| `bars` | Procedural soundwave/equalizer with draggable bar height grabbers. | `Envelope` (`Curve`/`Flat`/`Ramp`), `Count`, `Speed` |
| `columns` | Prismatic vertical light sweeps. | `Count`, `Speed` |
| `prism` | Spectral chromatic dispersion simulating white light through glass. | `Count`, `Dispersion Speed` |
| `waves` | Sinuous undulating harmonic wave layers. | `Frequency`, `Speed`, `Count` |
| `lines` | Dimensional flowing gradient tubes and vector silhouette paths. | `Tension`, `Thickness`, `Speed` |

---

## 🔮 3. Objects (7 Engines)

| Engine | Description | Primary Controls |
|---|---|---|
| `rings` | Concentric circular acoustic ripples with exponential decay. | `Ring Count`, `Decay Rate` |
| `pixel` | Retro 8-bit quantized modular pixel grid. | `Pixel Size`, `Dither Density` |
| `blocks` | Structured polygonal and modular tiled grid cells. | `Cell Size`, `Steps`, `Edge Softness` |
| `beehive` | Hexagonal honeycomb cell matrix. | `Cell Size`, `Border Edge Contrast` |
| `balls` | Floating radial metaballs with liquid gravitational blending. | `Ball Count`, `Motion Speed` |
| `radial` | Multi-point radial spotlight emitters with circular/elliptical ratios. | `Origin X/Y`, `Radius` |
| `conic` | 360° angular conic sweeps around a central focal point. | `Angle` (0–360°) |
