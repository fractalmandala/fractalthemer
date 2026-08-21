---

## id: tokens-and-css-contract
title: Semantic Theme Color Tokens Contract
type: design
tags: \[tokens, css-variables, design-system, colors, themes\]
summary: Contract specifications for semantic color tokens, tiered surfaces, text contrast, borders, and interactive state colors.
relates\_to: \[architecture-overview, theme-catalog\]
updated: 2026-08-16

# 🎨 Semantic Theme Color Tokens Contract

`fractalthemer` focuses strictly on theme colors and contrast. It purposefully does **not** export global font scales or spacing scales, leaving typography sizing and layout spacing completely under your application's control.

All 41 themes supply the complete semantic token contract defined in [`_tokens.sass`](../../src/lib/styles/_tokens.sass) and [`_themes.sass`](../../src/lib/styles/_themes.sass).

---

## 🏛 1. Layered Surface Tokens

Every theme provides tiered background surfaces to maintain distinct visual hierarchy and elevation without heavy border lines:

```
+-------------------------------------------------------------+
| --bg (Deepest Canvas Backdrop)                              |
|  +-------------------------------------------------------+  |
|  | --bg-panel (Sidebars, Toolbars, Drawer Panels)        |  |
|  |  +-------------------------------------------------+  |  |
|  |  | --bg-surface (Cards, Content Containers)        |  |  |
|  |  |  +-------------------------------------------+  |  |  |
|  |  |  | --bg-raised (Elevated Badges, Dropdowns)  |  |  |  |
|  |  |  +-------------------------------------------+  |  |  |
|  |  +-------------------------------------------------+  |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```


| Token           | Category | Description                                           |
| --------------- | -------- | ----------------------------------------------------- |
| `--bg`          | Surface  | Deepest canvas backdrop                               |
| `--bg-surface`  | Surface  | Primary card and article body background              |
| `--bg-raised`   | Surface  | Raised header elements, dropdowns, floating surfaces  |
| `--bg-panel`    | Surface  | Lateral sidebars, navigation panels, drawer container |
| `--bg-footer`   | Surface  | Bottom footer surface                                 |
| `--bg-popover`  | Surface  | Context menus, popup dialogs, drawer interior         |
| `--bg-dialog`   | Surface  | Modal backdrop and dialog cards                       |
| `--bg-terminal` | Surface  | Code blocks, command line, and monospace terminal     |
| `--bg-input`    | Surface  | Text inputs, textareas, and select menus              |
| `--bg-canvas`   | Surface  | Viewport canvas background                            |


---

## 🖋 2. Text &amp; Typography Contrast Tokens


| Token              | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `--text-primary`   | Main high-contrast titles, headers, bold body         |
| `--text-secondary` | Paragraphs, descriptions, secondary metadata          |
| `--text-muted`     | Faint timestamps, captions, disabled labels           |
| `--text-inverse`   | Contrast text rendered on top of brand accent buttons |


---

## 🔲 3. Borders &amp; Dividers


| Token             | Description                                  |
| ----------------- | -------------------------------------------- |
| `--border`        | Primary separator and card outline border    |
| `--border-subtle` | Subtle divider lines and inner table borders |


---

## 🎯 4. Brand Accent &amp; Theme Colors


| Token               | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `--theme-color`     | Primary brand accent color (buttons, active badges, highlights) |
| `--theme-color-alt` | Hover and focus state for brand accent buttons                  |
| `--theme`           | Alias pointing to `--theme-color`                               |


---

## 💫 5. Interactive State &amp; Feedback Tokens


| Token                  | Description                              |
| ---------------------- | ---------------------------------------- |
| `--state-hover`        | Neutral hover background tint            |
| `--state-hover-subtle` | Gentle list-item hover tint              |
| `--state-selected`     | Active tab, selected item highlight      |
| `--feedback-error`     | Validation errors and destructive alerts |


---

## 💅 Example Usage in Your Application CSS

```css
/* Card Container */
.card {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}

.card:hover {
  background-color: var(--state-hover);
}

/* Primary Action Button */
.btn-primary {
  background-color: var(--theme-color);
  color: var(--text-inverse);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--theme-color-alt);
}

/* Secondary Muted Text */
.card-caption {
  color: var(--text-muted);
  font-size: 12px;
}
```
