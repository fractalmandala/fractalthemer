---
id: palette-generator-guide
title: 9-Column Semantic Theme Palette Generator Guide
type: guide
tags: [palette, colors, harmony, locking, semantic-tokens, wcag, thematic]
summary: Guide to creating custom theme suites using the 9-column semantic palette generator, per-swatch color locking, interactive color pickers, 9 harmony algorithms (including Thematic), and persistent custom theme saving.
relates_to: [palette-generator-component, tokens-and-css-contract, custom-themes]
updated: 2026-08-16
---

# 🌈 9-Column Semantic Theme Palette Generator Guide

The **Palette Generator** generates complete, accessible, and mathematically harmonious color suites mapped directly to the 9 core semantic tokens of the `fractalthemer` CSS contract.

---

## 🎨 1. The 9 Semantic Columns

Every generated palette directly controls the 9 core semantic variables:

| Column | Token | Semantic Role |
|---|---|---|
| 1 | `--bg` | Deepest application canvas backdrop |
| 2 | `--bg-surface` | Card and content container surface |
| 3 | `--bg-panel` | Lateral sidebar and toolbar panel |
| 4 | `--bg-raised` | Elevated modal dialogs and dropdowns |
| 5 | `--state-hover` | Neutral hover background tint |
| 6 | `--state-hover-subtle` | Gentle list-item and row hover tint |
| 7 | `--border` | Primary separator and card outline border |
| 8 | `--theme-color` | Primary brand action and accent color (BASE) |
| 9 | `--theme-color-alt` | Accent hover/focus button state |

---

## 🎯 2. Interactive Column Color Pickers

Every column card footer is an interactive color popover:
- **Click anywhere on a column footer card** (`--bg`, `--bg-surface`, `--theme-color`, etc.) to open the native color picker.
- Selecting a new color updates the hex, HSL, and WCAG contrast ratings in real time.
- The edited column is automatically locked, and all other unlocked columns dynamically re-harmonize around your chosen hue!

---

## 🔒 3. Per-Color Locking Invariant

The Palette Generator supports full **per-color locking**:
- Click the Lock icon (`🔒` / `🔓`) in the header of any column to freeze that exact color.
- When you click **🎲 Randomize**, **↺ Reset**, or switch harmony modes, **all locked colors remain 100% untouched**.
- Unlocked columns automatically harmonize around the locked anchors.
- You can lock anywhere from 0 to 9 colors simultaneously.

---

## 🔮 4. The 9 Color Harmony Algorithms

Select any of the 9 mathematical harmony modes:
1. **Thematic** (*Recommended*): 
   - **Light Mode**: 7 delicate variations of tinted whites, off-whites, and soft neutrals ($S \approx 7\% - 14\%$, $L \approx 99\% \to 84\%$) + 2 vibrant brand accents.
   - **Dark Mode**: 7 rich variations of tinted darks, near-blacks, and charcoal surfaces ($S \approx 12\% - 18\%$, $L \approx 7\% \to 25\%$) + 2 vibrant brand accents.
2. **Monochromatic**: Steps luminance and saturation curves across a uniform hue.
3. **Analogous**: Harmonic adjacent spectral hues ($H \pm 15^\circ, \pm 30^\circ$).
4. **Complementary**: Exact $180^\circ$ opposite hue pairings for brand and hover tokens.
5. **Split-Complementary**: Base hue paired with $150^\circ$ and $210^\circ$ complements.
6. **Triadic**: Balanced $120^\circ$ equilateral triangle hues ($H, H + 120^\circ, H + 240^\circ$).
7. **Tetradic**: $90^\circ$ rectangular dual-complementary pairs ($H, H + 90^\circ, H + 180^\circ, H + 270^\circ$).
8. **Shades**: Stepped dark luminance decay calibrated for dark mode surfaces.
9. **Tints**: Stepped pastel luminance lightening calibrated for light mode surfaces.

---

## 👁 5. Live WCAG Contrast Auditing

Each column displays real-time contrast scores:
- `W: <ratio>`: Contrast ratio against pure white (`#FFFFFF`).
- `B: <ratio>`: Contrast ratio against pure black (`#000000`).

---

## 💾 6. Persistent Theme Saving & Drawer Integration

1. Click **"✦ Save as Theme"** in the top action bar.
2. Enter a name for your theme (e.g. *“Amber Velvet”* or *“Emerald Sunset”*).
3. The theme is saved into `localStorage['customThemes']` and applied immediately to `:root`.
4. Your theme instantly appears under the **Custom** tab in `<ThemePicker />` with live color swatches and delete actions.
