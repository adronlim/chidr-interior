# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

**CH iDesign & Renovation** — website revamp for an interior design / renovation
studio in Batu Kawan, Penang. A React single-page portfolio with a public site
and an admin CMS. Currently **Phase 1: frontend with dummy data** (no backend yet).

The full client brief, design system, data models, and phase roadmap live in
[context.md](context.md). Read it at the start of a session for product context.
**This file describes the code as it actually is; `context.md` describes the
plan — where they disagree, the code is the source of truth.**

Phase reports (Markdown source + generated PDF deliverable) live in
[docs/](docs/) — see [docs/README.md](docs/README.md).

## Commands

The package manager is **Yarn** (`yarn.lock` is committed). Node 22 (`.nvmrc`).

```bash
yarn install      # install deps
yarn dev          # dev server → http://localhost:5173
yarn build        # production build → dist/
yarn preview      # serve the production build
yarn lint         # ESLint over the repo
```

There is no test suite yet.

## Stack

- **Vite 8** build tool / dev server
- **React 19** (function components, hooks)
- **react-router-dom 7** for routing
- **Tailwind CSS v4** via `@tailwindcss/vite` — config-less; `src/index.css`
  is just `@import "tailwindcss";`. Use utility classes, not separate CSS files.

## Layout

```
src/
  App.jsx              providers + routes
  main.jsx             entry
  index.css            Tailwind import + @theme tokens + dark-mode variant
  context/
    ThemeContext.jsx   light/dark theme (data-theme attr, localStorage)
    ProjectsContext.jsx in-memory projects + settings store, CRUD, demo auth
  components/          Navbar, Hero, About, ProjectGrid, ProjectCard,
                       ProjectLightbox, Process, Testimonials, ContactForm, Footer
  pages/
    Home.jsx           public portfolio (composes the section components)
    admin/             Login, RequireAuth, AdminLayout, Dashboard,
                       ProjectsTable, UploadProject, Settings
  data/
    projects.js        dummy project data + category list (Phase 1)
    settings.js        company settings, demo credentials, testimonials,
                       services, process steps
```

### Routes (see [src/App.jsx](src/App.jsx))

- `/` → `Home`
- `/admin/login` → `Login` (public)
- `/admin` → `AdminLayout`, wrapped in `RequireAuth` (nested):
  - index → `Dashboard`
  - `projects` → `ProjectsTable`
  - `upload` → `UploadProject`
  - `settings` → `Settings`

Admin routes are guarded by `RequireAuth`, a **Phase 1 demo gate** — credentials
are hardcoded (`admin@chidr.com.my` / `password`, in [src/data/settings.js](src/data/settings.js))
and the session lives in `sessionStorage`. This is a stand-in for Firebase Auth,
not real security; Phase 2 replaces it.

## State

Global state lives in two React contexts (Phase 1 — swapped for Firestore in
Phase 2):

- **`ThemeContext`** — `theme` + `toggleTheme`; sets `data-theme` on `<html>`,
  persists to `localStorage`, defaults to `prefers-color-scheme`.
- **`ProjectsContext`** — seeded from `data/`. Exposes `projects`, `published`
  (status filter), `settings`, `isAuthed`, and the mutators `addProject`,
  `updateProject`, `deleteProject`, `updateSettings`, `login`, `logout`. The
  CRUD surface is shaped like a future API client. State is in-memory, so it
  resets on full reload.

## Data shape

Projects come from [src/data/projects.js](src/data/projects.js). The live shape is:

```js
{
  id: 1,                       // number (Firestore: auto doc id)
  name: 'The Serenity Residence',
  cat: 'living',               // 'living' | 'kitchen' | 'bedroom' | 'commercial'
  catLabel: 'Living Room',     // display label for `cat`
  area: '1,800 sqft',
  year: '2024',                // string
  status: 'published',         // 'published' | 'draft'
  img: 'https://...',          // cover image URL
  images: ['https://...'],     // gallery URLs
  desc: '...',
}
```

The public site shows only `published` projects; the admin sees all. Category
filter options are exported as `categories` from the same file. This now matches
the shape documented in `context.md`.

## Conventions

- ES modules, `.jsx` for components, default exports for components/pages.
- Functional components and hooks only.
- Style with Tailwind utility classes inline; avoid adding bespoke CSS files.
  Brand tokens (`cream`, `gold`, `gold-light`, `charcoal`, `font-display`,
  `font-body`) are defined in `@theme` in [src/index.css](src/index.css) and
  used as normal utilities; dark mode is the `dark:` variant (class-based, keyed
  to `data-theme="dark"`).
- Keep the project data shape flat so it maps cleanly onto a future API/CMS
  (Phase 2 plans Firebase Firestore + Auth and Cloudinary for images — see
  context.md, but none of that exists yet).

## When making changes

- Run `yarn lint` after edits.
- Don't introduce a backend, auth, or image-upload service unless asked — Phase 1
  is intentionally frontend-only with dummy data.
- If you change the project data shape or routing, update this file and
  `context.md` so they stay in sync.
