# Rick and Morty Explorer

A small, production-quality single-page app for browsing and searching characters from the
[Rick and Morty API](https://rickandmortyapi.com/), built with **Angular 22**.

## Highlights

- **Zoneless change detection** — no `zone.js`, powered entirely by Angular signals.
- **Signal-based store** (`CharacterStore`) using `httpResource` for declarative, reactive
  data fetching — the API is re-queried automatically whenever the page or filters change.
- **Standalone components** with `ChangeDetectionStrategy.OnPush` throughout; no `NgModule`s.
- **Modern control flow** (`@if` / `@for` / `@let`) and the signal-based `input()` / `output()` APIs.
- **Lazy-loaded routes** with typed route parameter binding (`withComponentInputBinding`).
- **Angular Material 3** theming with automatic light/dark support.
- Tooling: **ESLint** (angular-eslint), **Prettier**, and **Karma/Jasmine** unit tests.

## Project structure

```
src/app
├── core
│   ├── models           # Typed API contracts (Character, PageInfo, filters)
│   └── services         # CharacterStore — signal-based state + data fetching
├── features
│   ├── characters       # Character list page (filter + grid + pagination)
│   └── character-detail # Single character page
└── shared
    └── components        # Reusable UI: header, character-card, character-filter, pagination
```

## Getting started

```bash
npm install
npm start          # dev server at http://localhost:4200
```

## Available scripts

| Script            | Description                                |
| ----------------- | ------------------------------------------ |
| `npm start`       | Run the development server.                |
| `npm run build`   | Production build into `dist/`.             |
| `npm test`        | Run unit tests (Karma + Jasmine).          |
| `npm run test:ci` | Run unit tests once in headless Chrome.    |
| `npm run lint`    | Lint TypeScript and templates with ESLint. |
| `npm run format`  | Format the codebase with Prettier.         |

## API

Data is served by the public [Rick and Morty API](https://rickandmortyapi.com/documentation).
The base URL is configured per environment in `src/environments/`.
