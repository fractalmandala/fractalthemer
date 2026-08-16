# Specification: Real Procedural Generator Engines, Silhouette Form Sets & Preset Colourways

- **Document:** `docs/specs/2026-08-16-engines-and-presets-spec.md`
- **Feature Name:** Real Procedural Generator Engines, Silhouette Form Sets & Preset Colourways
- **Created Date:** 2026-08-16
- **Status:** Approved Spec

---

## 1. Summary

This specification defines the exact user-facing behavior, mathematical visual outputs, preset arrangements, and interactive colourway mechanics for all 21 gradient generator engines in `fractalthemer`. Every engine features its own distinct procedural rendering algorithm on the live canvas, a dedicated grid of arrangement presets (or 24 SVG silhouette forms), and a 12-preset circular segmented colourway matrix.

---

## 2. Problem

A generic radial fallback does not provide the rich, atmospheric, and dimensional variety demonstrated in the reference design (`feralui.dev/gradients`). Each generator paradigm has a distinct visual identity: `flow` requires fluid turbulence distortion, `aurora` requires shimmering ray curtain folding, `lines` requires dimensional ribbon tubes, `waves` requires harmonic sinusoidal layering, `balls` requires metaball gravitational liquid fusion, and `forms` requires vector silhouette masking. Furthermore, users require one-click preset arrangements and pie-wheel colourways directly in the control sidebar.

---

## 3. Goals & Non-goals

### Goals
- Implement distinct, authentic procedural visual outputs for all 13 targeted engines:
  - **7 Fields**: `flow`, `sky`, `aurora`, `mesh`, `still`, `retro`, `ios`.
  - **5 Stripes**: `stripes`, `columns`, `prism`, `waves`, `lines`.
  - **1 Objects**: `balls` (metaballs).
- Provide a dedicated **24 SVG Silhouette Forms Set** for the `forms` engine.
- Provide a **12-Colourway Circular Pie-Wheel Matrix** under each engine that recolors the active blend with one click.
- Provide dedicated **Arrangement Preset Cards** per engine (e.g. for Lines: *Snake, Drops, Loops, Ribbon, Doodle, Wander, Waves, Echo*).
- Maintain 60fps high-DPI canvas rendering with draggable color spots and ring reach handles.

### Non-goals
- Server-side rendering of canvas simulations (all math runs in client Canvas2D/WebGL buffers).

---

## 4. Behavior & Numbered Invariants

### 4.1. Generator Engine Architecture & Visual Invariants

#### 1. `flow` (Fluid Turbulence Simulation)
1. The canvas renders a fluid organic field distorted by continuous 2D turbulence noise.
2. Adjusting `Scale` (10%–100%) alters the spatial frequency of the noise field; low scale produces broad calm currents, high scale produces dense ripples.
3. Adjusting `Distortion` (0%–100%) increases turbulent displacement, warping color emitter boundaries into fluid filaments.
4. Adjusting `Swirl` (0%–100%) introduces rotational vortices around color emitter centers.
5. Dragging any canvas color spot moves the fluid emitter origin `(x, y)` in real-time.
6. Dragging the outer ring handle changes that emitter's radial influence radius.

#### 2. `sky` (Rayleigh Horizon Atmosphere)
1. The canvas renders an atmospheric horizon with natural light scattering.
2. Adjusting `Elevation` (0°–90°) shifts the sun/light origin from the horizon (twilight sunset) to the zenith (noon sky).
3. Adjusting `Diffusion` (0%–100%) modulates the soft glow transition between sky zenith and ground horizon.
4. Selecting sky colourways re-tints the atmosphere from dawn gold to deep nautical twilight.

#### 3. `aurora` (Sinusoidal Shimmering Ray Curtains)
1. The canvas renders vertical atmospheric light rays with shimmering curtain pleats.
2. Adjusting `Lights` (0%–100%) controls the emission luminescence and core brightness of the rays.
3. Adjusting `Fold` (0%–100%) modulates the pleat frequency and sinusoidal curtain folding.
4. Adjusting `Drift` (0%–100%) shifts the horizontal drift velocity of the light waves.
5. Adjusting `Spread` (0%–100%) expands the vertical height and dispersion of the ray crowns.
6. Selecting `Direction` (`Up`, `Right`, `Down`, `Left`) orients the ray emission angle.

#### 4. `mesh` (Multi-Node Bezier Grid)
1. The canvas renders a network of draggable color nodes connected via smooth Bezier curve gradients.
2. Dragging any node recalculates the 2D gradient mesh deformation dynamically.
3. Clicking `Shuffle` repositions mesh nodes randomly while preserving selected colors.
4. Clicking `Reset` realigns mesh nodes to an equidistant grid.

#### 5. `still` (Optical Depth Wash & Vignette)
1. The canvas renders a motionless, atmospheric depth wash with subtle quadratic vignette falloff.
2. Adjusting `Softness` controls the dissipation curve between color stops.

#### 6. `retro` (Analog Chromatic Diffusion)
1. The canvas renders a warm vintage analog wash with chromatic separation and filmic tone-mapping.
2. Injects a calibrated warm grain dither that prevents digital banding.

#### 7. `ios` (Frosted Glassmorphic Saturated Glow)
1. The canvas renders a highly saturated ambient blur backdrop with optical diffusion.
2. Colors blend through simulated high-radius Gaussian frosted glass filters.

#### 8. `stripes` (Crisp Spectral Bands)
1. The canvas renders parallel alternating spectral stripes.
2. Parameters: `Count` (4–64), `Angle` (0–360°), and `Duty Cycle` (stripe thickness ratio).

#### 9. `columns` (Prismatic Vertical Light Sweeps)
1. The canvas renders vertical pillar bands with prismatic refractive edge highlights.
2. Adjusting `Count` changes column count; adjusting `Speed` modulates light sweep animation.

#### 10. `prism` (Chromatic Light Dispersion)
1. The canvas simulates white light splitting through a triangular prism into red, yellow, green, and violet spectrum bands.
2. Adjusting `Dispersion` modulates the optical refraction distance between color wavelengths.

#### 11. `waves` (Harmonic Sinusoidal Layering)
1. The canvas renders multiple layered undulating sine waves ($y(x) = A \sin(\omega x + \phi) + k$).
2. Each wave layer takes a color from the active palette with customizable amplitude and frequency.
3. Waves overlap with smooth alpha transparency or crisp cutout contours.

#### 12. `lines` (Dimensional Flowing Ribbon Tubes)
1. The canvas renders dimensional ribbon tubes flowing across the viewport.
2. Supports 8 preset path arrangements: *Snake, Drops, Loops, Ribbon, Doodle, Wander, Waves, Echo*.
3. Parameters: `Tension` (path curve stiffness), `Thickness` (tube stroke width), and `Flow Speed`.

#### 13. `balls` (Metaball Liquid Gravitational Blending)
1. The canvas renders floating circular metaballs that merge like liquid drops when close to each other.
2. Evaluates potential field $V(x, y) = \sum \frac{R_i^2}{(x - x_i)^2 + (y - y_i)^2} \ge 1.0$.
3. Dragging a ball node moves its center; overlapping balls produce smooth gooey liquid necks.

#### 14. `forms` (24 SVG Silhouette Mask Sets)
1. The canvas renders 24 geometric and organic vector silhouette shapes:
   - *Arch, Clover, Heart, Drapery, 4-Leaf, Sunburst, Flower, Starburst, Cross, Ring, Sparkle, Horizontal Stripes, Dome, Propeller, Squiggle, Flower-8, Teardrop, Circle, Pebble, Eye-Ring, Crescent, Star, X-Pill, Wave*.
2. The active gradient fills the shape interior with crisp or feathered boundaries over a contrasting background paper.

---

### 4.2. Preset Colourways Matrix (12 Curated Wheels)

1. Under every generator engine, the sidebar displays a **12-Colourway Grid**.
2. Each colourway is rendered as a multi-segment circular pie-wheel swatch showing its component colors.
3. Built-in colourway presets:
   - *Solar* (Gold, Orange, Violet)
   - *Lagoon* (Mint, Cyan, Azure)
   - *Coral* (Peach, Coral, Purple)
   - *Aerial* (Soft Blue, Sky, Lavender)
   - *Botanic* (Lime, Emerald, Deep Teal)
   - *Violet* (Lilac, Violet, Indigo)
   - *Cobalt* (Navy, Azure, Ice)
   - *Cinder* (Charcoal, Amber, Orange)
   - *Vivid* (Yellow, Magenta, Cyan)
   - *Rainbow* (Full Spectrum 6-stop)
   - *Rosewater* (Blush, Rose, Salmon)
   - *Midnight* (Black, Deep Violet, Neon Blue)
4. Clicking any colourway immediately re-tints the active canvas blend while preserving the current engine arrangement and slider parameters.

---

### 4.3. Arrangement Presets Per Engine

1. Clicking an arrangement preset card changes the spatial layout of color emitters without altering the user's active colors.
2. For `lines`: Presets include *Snake, Drops, Loops, Ribbon, Doodle, Wander, Waves, Echo*.
3. For `flow`: Presets include *Iridescent cloud, Opal, Lagoon, Emerald, Solar flare, Orchid, Peach glow, Electric tide, Sunset, Mint ice, Midnight bloom, Rose gold*.
4. For `bars`: Presets include *Soundwave, Red alert, Reverb, Pulse, Level, Mono wave*.
5. For `beehive`: Presets include *Honeycomb, Beehive, Coral comb, Jade comb*.

---

### 4.4. Multi-Band Timeline & Direct Canvas Interaction

1. Every active color emitter renders as a draggable pin on the canvas.
2. Hovering/dragging a pin highlights its corresponding segment in the bottom multi-band timeline.
3. Dragging divider handles on the timeline rebalances color reach across the blend in real-time.
4. Top canvas toggle `Hide tags` toggles visibility of pin hex labels for clean visual inspection.
5. Top canvas toggle `Contrast` renders a real-time WCAG readability overlay for center preview text.
