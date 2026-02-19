# Frappe Modern Theme

> A minimal, modern UI theme for Frappe/ERPNext featuring a clean green-tinted palette, smooth animations, and polished interactive elements.

---

## Table of Contents

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Theme Features](#theme-features)
6. [File Structure](#file-structure)
7. [Customization Guide](#customization-guide)
8. [Known Limitations](#known-limitations)
9. [Roadmap](#roadmap)

---

## Overview

**App Name:** `frappe_modern_theme`  
**Version:** `0.0.1`  
**Publisher:** Yanky  
**License:** MIT  

`frappe_modern_theme` is a custom Frappe app that injects a modern, minimal theme into the Frappe Desk UI. It targets the **light theme only** (`[data-theme="light"]`), leaving the dark theme untouched, and applies a cohesive green-tinted color system with subtle hover animations and typography upgrades.

Think of it as giving ERPNext a design refresh — because the default UI needed it.

---

## Requirements

- **Frappe Framework:** v14 or v15
- **Python:** 3.10+
- **Node / Yarn:** Required for asset building (`bench build`)

---

## Installation

### 1. Get the app

```bash
bench get-app https://github.com/your-username/frappe_modern_theme
```

### 2. Install on your site

```bash
bench --site your-site.local install-app frappe_modern_theme
```

### 3. Build assets

```bash
bench build --app frappe_modern_theme
```

### 4. Restart bench

```bash
bench restart
```

After installation, navigate to your Frappe Desk, ensure the **Light Theme** is active (via your profile settings), and the theme will be applied automatically.

---

## Configuration

No additional configuration is required after installation. The theme is injected globally via the `app_include_css` hook in `hooks.py`:

```python
app_include_css = "/assets/frappe_modern_theme/css/modern_theme.css"
```

This means the stylesheet is loaded on every Desk page automatically.

> **Important:** The theme only activates under `[data-theme="light"]`. If the user has selected the dark theme in their Frappe profile, this theme will have no effect — by design.

---

## Theme Features

### Color Palette

The theme uses CSS custom properties scoped to `:root[data-theme="light"]`:

| Variable | Value | Usage |
|---|---|---|
| `--bg-color` | `#efffec` | Page & body background |
| `--card-bg` | `#efffec` | Cards, modals, sidebar, navbar |
| `--hover-bg` | `#e0ffdb` | Inputs, hover states, toolbar backgrounds |

All colors follow a soft green-mint palette — easy on the eyes, professional enough for an ERP.

### Typography

- **Font:** [Nunito](https://fonts.google.com/specimen/Nunito) (weights: 400, 600, 700) loaded via Google Fonts
- Applied globally to `body`, `input`, `button`, `select`, and `textarea`

### Hover & Animation Effects

Interactive elements receive a smooth lift effect on hover:

- **Elements affected:** `.list-row`, `.desk-sidebar-item`, `.widget`, `.card`, `.recent-item`
- **Effect:** `translateY(-3px) scale(1.005)` with a `box-shadow` boost
- **Transition:** `cubic-bezier(0.25, 0.8, 0.25, 1)` over `0.3s`

> Edit mode widgets (`.widget.shortcut.edit-mode`) are explicitly excluded from hover effects to avoid visual chaos while rearranging the workspace.

### Primary Button Styling

The `.btn-primary` is restyled to match the green palette:

- **Default:** `#2f855a` background, white text, subtle shadow
- **Hover:** Darkens to `#276749`, slight upward lift
- **Active:** `scale(0.95)` press effect

### Form Controls & Inputs

- `.form-control`, `.input-with-feedback`, `.control-value`, `.link-btn` all use `--hover-bg` as their background
- The Quill rich text editor (`.ql-editor`, `.ql-toolbar`) is themed consistently
- ACE code editor background is also overridden

### Dropdowns & Autocomplete

Dropdowns (`.dropdown-menu`, `.popover`, `.awesomplete > ul`) receive:
- Green-tinted background (`#e0ffdb`)
- Subtle green border (`#c6f6d5`)
- `border-radius: 12px` and layered `box-shadow`
- Hover/selected items highlight with `#2f855a` and white text
- Nested `a`, `span`, and `b` tags inside hovered list items are explicitly forced to white to prevent text bleed-through

---

## File Structure

```
frappe_modern_theme/
├── __init__.py                        # App version declaration
├── hooks.py                           # Frappe hooks (CSS injection)
├── modules.txt                        # Module registration
├── patches.txt                        # DB migration patches (empty)
├── config/
│   └── __init__.py
├── frappe_modern_theme/
│   └── __init__.py
├── public/
│   ├── .gitkeep
│   └── css/
│       └── modern_theme.css           # The main theme stylesheet
└── templates/
    ├── __init__.py
    └── pages/
        └── __init__.py
```

---

## Customization Guide

### Changing the Color Palette

All colors are controlled via CSS variables in `modern_theme.css`. To change the base color, update the `:root[data-theme="light"]` block:

```css
:root[data-theme="light"] {
  --bg-color: #your-color !important;
  --card-bg: #your-color !important;
  --hover-bg: #your-slightly-darker-color !important;
}
```

After any CSS change, rebuild assets:

```bash
bench build --app frappe_modern_theme
```

### Changing the Font

Replace the Google Fonts import URL at the top of `modern_theme.css` and update the `font-family` declaration:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

[data-theme="light"] body, input, button, select, textarea {
  font-family: 'Inter', sans-serif !important;
}
```

### Applying Theme to Dark Mode

Currently the theme is scoped to `[data-theme="light"]` only. To extend it to dark mode, add a parallel block:

```css
[data-theme="dark"] {
  /* your dark overrides here */
}
```

---

## Known Limitations

- **Light theme only** — dark mode is intentionally unsupported in `v0.0.1`
- Uses `!important` extensively to override Frappe's own specificity — this is a necessary evil when theming Frappe from an external app
- Google Fonts are loaded from an external CDN; offline/intranet deployments may need to self-host the font files
- No DocType-based settings UI yet (planned for a future release)

---

## Roadmap

- [ ] Dark mode variant
- [ ] `Modern Theme Settings` DocType for color/font configuration via the UI
- [ ] Custom logo and favicon support
- [ ] SCSS source files for easier variable management
- [ ] Per-role theme overrides

---

## License

MIT — do whatever you want, just don't blame the developer if your manager suddenly wants "more green."