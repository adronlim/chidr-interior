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
  App.jsx              routes
  main.jsx             entry
  index.css            Tailwind import
  components/          Navbar, Hero, ProjectGrid, ProjectCard, ProjectLightbox, ContactForm
  pages/
    Home.jsx           public portfolio (composes the section components)
    admin/             AdminLayout, Dashboard, ProjectsTable, UploadProject
  data/projects.js     dummy project data (Phase 1)
```

### Routes (see [src/App.jsx](src/App.jsx))

- `/` → `Home`
- `/admin` → `AdminLayout` (nested):
  - index → `Dashboard`
  - `projects` → `ProjectsTable`
  - `upload` → `UploadProject`

Admin routes are **not** auth-guarded in Phase 1.

## Data shape

Projects come from [src/data/projects.js](src/data/projects.js). The live shape is:

```js
{
  id: 'modern-loft',          // string slug
  title: 'Modern Loft',
  category: 'Residential',    // 'Residential' | 'Commercial' (free-form for now)
  location: 'Singapore',
  year: 2024,                 // number
  cover: 'https://...',       // single cover image URL
  images: ['https://...'],    // gallery URLs
  description: '...',
}
```

Note: `context.md` documents a different, older shape (`name`, `cat`, `area`,
`status`, `img`). The code above is what's real — follow it.

## Conventions

- ES modules, `.jsx` for components, default exports for components/pages.
- Functional components and hooks only.
- Style with Tailwind utility classes inline; avoid adding bespoke CSS files.
- Keep the project data shape flat so it maps cleanly onto a future API/CMS
  (Phase 2 plans Firebase Firestore + Auth and Cloudinary for images — see
  context.md, but none of that exists yet).

## When making changes

- Run `yarn lint` after edits.
- Don't introduce a backend, auth, or image-upload service unless asked — Phase 1
  is intentionally frontend-only with dummy data.
- If you change the project data shape or routing, update this file and
  `context.md` so they stay in sync.
