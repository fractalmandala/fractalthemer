---
id: palette-generator-guide
title: 9-Column Semantic Theme Palette Generator Guide
type: guide
tags: [palette, colors, harmony, locking, semantic-tokens, wcag]
summary: Guide to creating custom theme suites using the 9-column semantic palette generator, per-swatch color locking, and WCAG contrast checks.
relates_to: [palette-generator-component, tokens-and-css-contract]
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
| 8 | `--theme-color` | Primary brand action and accent color |
| 9 | `--theme-color-alt` | Accent hover/focus button state |

---

## 🔒 2. Per-Color Locking Invariant

The Palette Generator introduces **per-color locking**:
- Click the Lock icon (`🔒` / `🔓`) in the header of any column to freeze that exact color.
- When you click **🎲 Randomize**, **↺ Reset**, or switch harmony modes, **all locked colors remain 100% untouched**.
- Unlocked columns automatically harmonize around the locked anchors.
- You can lock anywhere from 0 to 9 colors simultaneously.

---

## 🎯 3. Color Harmony Algorithms

Select any of the 8 mathematical harmony modes:
- **Monochromatic**: Steps luminance across uniform hue.
- **Analogous**: Adjacent spectral hues ($H \pm 15^\circ, \pm 30^\circ, \pm 45^\circ$).
- **Complementary**: Exact $180^\circ$ opposite hue pairings.
- **Split-Complementary**: Base hue paired with $150^\circ$ and $210^\circ$ complements.
- **Triadic**: Balanced $120^\circ$ equilateral triangle hues.
- **Tetradic**: $90^\circ$ rectangular dual-complementary pairs.
- **Shades**: Darkened steps calibrated for dark mode surfaces.
- **Tints**: Lightened steps calibrated for light mode surfaces.

---

## 👁 4. Live WCAG Contrast Auditing

Each column displays real-time contrast scores:
- `W: <ratio>`: Contrast ratio against pure white (`#FFFFFF`).
- `B: <ratio>`: Contrast ratio against pure black (`#000000`).
- Badges indicate **AAA** ($\ge 7:1$) and **AA** ($\ge 4.5:1$) compliance.

---

## ✦ 5. Instant Theme Application

Click **✦ Apply Theme** to instantly inject the 9 generated tokens into `document.documentElement` and `themeState`. Your running application updates immediately.
