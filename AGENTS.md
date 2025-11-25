# Repository Guidelines

## Project Structure & Module Organization
The Vite + Vue 3 app boots through `src/main.js`, mounts `App.vue`, and wires navigation via `src/router`. Views that mirror routes live in `src/views`, while re-usable UI goes inside `src/components` and shared helpers in `src/common`. Pinia stores belong in `src/stores`, and static assets or stylesheets stay under `src/assets` using the `@/assets/...` alias. Files placed in `public/` ship verbatim, so reserve that directory for pre-built icons, fonts, or mock JSON.

## Build, Test, and Development Commands
- `npm run dev` — Launches Vite with hot-module replacement; use when iterating locally.
- `npm run build` — Produces the optimized `dist/` bundle; run before tagging a release.
- `npm run preview` — Serves the production build to sanity-check routing and lazy chunks.
- `npm run lint` — Executes ESLint (flat config) with caching and autofix; commit with a clean run.

## Coding Style & Naming Conventions
Follow Vue SFCs using `<script setup>` and two-space indentation. Component files remain PascalCase (`WeatherPanel.vue`), composables use `useThing.js`, and utility modules inside `src/common` stay in camelCase. SCSS blocks should keep nested selectors shallow and prefer CSS variables defined near component roots. ESLint (with `@eslint/js` and `eslint-plugin-vue` essential rules) is the source of truth; fix warnings immediately rather than suppressing them. Keep imports ordered `vue`, third-party, then local alias `@/...` paths.

## Testing Guidelines
Automated tests are not wired up yet, so thoroughly exercise new flows in the browser via `npm run dev` and capture the steps in your PR. When you introduce regression coverage, place Vitest suites inside `src/__tests__` or alongside components as `Component.spec.js`, assert Pinia store mutations, and target at least 80% statement coverage for the touched modules. Always verify responsive breakpoints in `src/views` because most UI relies on Element Plus grid utilities.

## Commit & Pull Request Guidelines
Adopt Conventional Commits as seen in history (`feat: add cloud cards`, `fix: correct router guard`). Keep subject lines under 72 characters and mention affected scopes when relevant. Each PR should describe the change, link any issue or task ID, and include screenshots or recordings for UX updates. Note manual test steps and lint/build status in the PR body so reviewers can replay them quickly.
