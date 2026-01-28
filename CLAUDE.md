# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyLittleCloudStation (前端云小站) is a Vue 3 + Vite educational frontend platform for learning and documenting frontend concepts. It uses JavaScript (no TypeScript build), Element Plus for UI, Pinia for state, and highlight.js for code syntax highlighting.

**Node requirement:** `^20.19.0 || >=22.12.0`

## Commands

```sh
npm run dev        # Start dev server (opens browser automatically)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint with autofix and caching
```

No test runner is configured. Verify changes manually via `npm run dev`.

## Architecture

### Configuration-Driven Routing

Routes are generated from `src/common/config/asideConfig.js`, which defines the sidebar navigation tree. Each entry specifies `name`, `path`, `component` (relative path), and optional `children` (anchor links within the page).

`src/router/index.js` reads this config and builds routes dynamically using `import.meta.glob()` for lazy loading. To add a new content page:
1. Create the `.vue` file under `src/components/<topic>/`
2. Add an entry to `asideConfig.js` with `path` and `component`
3. The route and sidebar menu item are generated automatically

### Directory Layout

- `src/views/` — Page-level components: main layout (`index.vue`), home (`HomeView.vue`), sidebar (`aside.vue`)
- `src/components/` — Content pages organized by topic (Vue3, jsBasic, cssBasic, TypeScriptSeries, webAPI, agorithmBasic, forTest)
- `src/common/components/` — Shared reusable UI components (MyInput, codeBlock, MyDictSelect, anchorComponents)
- `src/common/config/` — Centralized configuration (asideConfig.js drives routing and navigation)
- `src/common/tools/` — Utility functions (debounce)
- `src/stores/` — Pinia stores (menuItemName.js tracks sidebar state and DOM refs)

### Key Patterns

- **Vue SFC with `<script setup>`** is the standard component style; JSX (`.jsx`) is used in some components for advanced wrapping patterns
- **Path alias:** `@/` maps to `./src/` (configured in both vite.config.js and jsconfig.json)
- **Syntax highlighting:** Custom `v-highlight` directive registered in `main.js` using highlight.js; used via the `codeBlock.vue` wrapper component
- **Styling:** SCSS (sass-embedded) with component-scoped styles; Element Plus provides the base UI framework

## Coding Conventions

- PascalCase for component files, camelCase for utilities, `useThing.js` for composables
- Import order: `vue` → third-party → local `@/...` paths
- 2-space indentation, shallow SCSS nesting, CSS variables at component roots
- ESLint v9 flat config (`eslint.config.js`) with `@eslint/js` recommended + `eslint-plugin-vue` essential rules
- Conventional Commits: `feat:`, `fix:`, `docs:`, etc.

## Known Technical Debt

See `CODE_REVIEW.md` for detailed issues including:
- Scroll event listener memory leak in HomeView (debounced ref not preserved across mount/unmount)
- Fixed viewport coordinates (`elementFromPoint(840, 300)`) break on small screens
- DOM-based menu control via `.click()` instead of reactive state
- Duplicate highlight.js integrations (vue-highlightjs, @highlightjs/vue-plugin, and custom directive all present)

## Build Configuration

- Vite with Vue 3, Vue JSX, and Vue DevTools plugins
- Production: Terser minification with console/debugger stripping, ES2015 target, no sourcemaps
- Chunk size warning limit: 1000KB
