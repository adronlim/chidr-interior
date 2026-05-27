# CH iDesign & Renovation — Project Context

> This document is the single source of truth for the CH iDesign & Renovation web revamp project. It captures the client brief, tech stack decisions, architecture, data models, and development roadmap. Reference this file at the start of every new development session.

***

## Project Overview

| Field | Detail |
|---|---|
| **Project Name** | CH iDesign & Renovation — Website Revamp |
| **Client** | Interior Designer / Renovation Studio |
| **Location** | Batu Kawan, Penang, Malaysia |
| **Existing Website** | https://www.chidr.com.my/ |
| **Design Reference** | https://decoria.steelthemes.com/demo/home-1-modern-interiors/ |
| **Developer** | ReactJS Web Developer |
| **Package Manager** | Yarn |
| **Stage** | Phase 1 — Frontend with Dummy Data |

***

## Business Goals

The client wants to replace the existing static website with a modern, self-managed portfolio platform. The core goals are:

- Showcase completed interior design and renovation projects with images
- Allow the client (interior designer) to log in and manage project content without a developer
- Display essential company information: name, logo, contact details, address, and business hours
- Provide a contact/enquiry form for potential clients

***

## Site Structure

### Public Website

| Section | Description |
|---|---|
| **Navigation** | Fixed top bar — logo, nav links, theme toggle (dark/light), CTA button, Admin login |
| **Hero** | Split layout — editorial headline + CTA left, hero image with stat cards right |
| **About** | Company intro, tagline, 3 service pillars |
| **Projects** | Filterable masonry grid — categories: All, Living Room, Kitchen, Bedroom, Commercial |
| **Process** | 4-step design process — Discovery → Concept → Refinement → Build |
| **Testimonials** | Client reviews on dark editorial background |
| **Contact** | Company info block + enquiry form |
| **Footer** | Brand, navigation, services, contact columns |

### Admin CMS Panel (Protected Route)

| View | Description |
|---|---|
| **Dashboard** | KPI widgets (total, published, drafts) + recent projects table |
| **Projects** | Full CRUD table — view, edit, delete all projects |
| **Upload Project** | Form with drag-and-drop image upload, category, area, year, description, publish toggle |
| **Settings** | Edit company name, phone, email, address, tagline, about text |

***

## Design System

### Art Direction

> Luxury interior design studio — warm, editorial, spatial.

| Token | Value |
|---|---|
| **Palette** | Warm cream/stone surfaces (`#f8f5f0`), gold accent (`#8b6914`), deep charcoal dark (`#2c2417`) |
| **Display Font** | Cormorant Garamond (Google Fonts) — serif, editorial |
| **Body Font** | DM Sans (Google Fonts) — clean sans-serif |
| **Border Radius** | `sm: 4px`, `md: 8px`, `lg: 12px`, `xl: 16px` |
| **Dark Mode** | Full support via `data-theme` attribute + `prefers-color-scheme` |
| **Spacing** | 4px base unit scale |

### CSS Custom Properties (Core)

```css
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-body: 'DM Sans', 'Helvetica Neue', sans-serif;
--color-primary: #8b6914;         /* light mode gold */
--color-primary: #c8952a;         /* dark mode gold */
--color-bg: #f8f5f0;              /* warm cream */
--color-accent-dark: #2c2417;     /* footer / testimonials bg */
```

***

## Tech Stack

### Frontend (Phase 1 — Current)

| Tool | Version | Purpose |
|---|---|---|
| **Node.js** | 22 LTS (22.12+) | Runtime — required by Vite 7 |
| **Vite** | 7.x | Build tool & dev server |
| **React** | 19.x | UI framework |
| **react-router-dom** | 7.x | Client-side routing |
| **Tailwind CSS** | v4 (via `@tailwindcss/vite`) | Utility-first styling |
| **Yarn** | 1.22.x | Package manager |

### Backend (Phase 2 — Planned)

| Tool | Purpose |
|---|---|
| **Firebase Auth** | Admin login (email/password) |
| **Firebase Firestore** | Project data, company settings |
| **Cloudinary** | Image uploads and CDN delivery (replaces Firebase Storage — free tier) |
| **Firebase Hosting** | Static site deployment |

> **Note:** Firebase Storage is NOT on the free Spark plan. Cloudinary's free tier (25 credits/month) is used for image hosting instead.

***

## Project Scaffold

```
chidr-interior/
├── public/
│   └── logo.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectGrid.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectLightbox.jsx
│   │   └── ContactForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ProjectsTable.jsx
│   │       └── UploadProject.jsx
│   ├── data/
│   │   └── projects.js        ← dummy data (Phase 1)
│   ├── context/
│   │   └── ProjectsContext.jsx ← global state (swap to Firestore in Phase 2)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .nvmrc                     ← pinned to Node 22
├── vite.config.js
└── package.json
```

***

## Routing Architecture

```
/                  → Home.jsx (public portfolio)
/admin             → AdminLayout.jsx (protected — auth guard in Phase 2)
/admin/dashboard   → Dashboard.jsx
/admin/projects    → ProjectsTable.jsx
/admin/upload      → UploadProject.jsx
/admin/settings    → Settings.jsx
```

In Phase 1, the `/admin` route is accessible directly (no auth guard). Auth guard is added in Phase 2 when Firebase Auth is integrated.

***

## Data Model

### Project

```js
// src/data/projects.js
{
  id: 1,                          // number (Firestore: auto-generated doc ID)
  name: 'The Serenity Residence', // string
  cat: 'living',                  // 'living' | 'kitchen' | 'bedroom' | 'commercial'
  catLabel: 'Living Room',        // string — display label
  area: '1,800 sqft',             // string
  year: '2024',                   // string
  status: 'published',            // 'published' | 'draft'
  img: 'https://...',             // string — Unsplash URL (Phase 1) / Cloudinary URL (Phase 2)
  desc: '',                       // string — project description
}
```

### Company Settings

```js
{
  name: 'CH iDesign & Renovation',
  tagline: 'Spaces that inspire the way you live',
  phone: '+60 4-XXX XXXX',
  email: 'info@chidr.com.my',
  address: 'Batu Kawan, Penang, Malaysia',
  hours: 'Mon–Sat, 9:00 AM – 6:00 PM',
  about: '...',
}
```

***

## Admin Login (Phase 1 — Demo)

| Field | Value |
|---|---|
| Email | `admin@chidr.com.my` |
| Password | `password` |

> In Phase 1, credentials are hardcoded for demo purposes. Phase 2 replaces this with Firebase Auth `signInWithEmailAndPassword()`.

***

## Firestore Cost Traps to Avoid (Phase 2 Planning)

These architectural decisions must be made before writing any Firestore code:

| Trap | Safe Pattern |
|---|---|
| `onSnapshot()` on full collection | Narrow scoped listeners; use `getDoc()` where real-time is not needed |
| Offset-based pagination | Cursor-based pagination with `.startAfter()` |
| Frequent `count()` aggregation | Maintain a counter document with `increment()` |
| Denormalizing frequently-changed fields | Only denormalize stable fields (e.g., category label) |
| Writing unchanged values | Guard writes with equality check before calling `updateDoc()` |
| Browsing Firebase Console in production | Use Firebase Emulator for local development |

***

## Phase Roadmap

### Phase 1 — Frontend with Dummy Data (Current)
- [x] HTML/CSS/JS prototype completed
- [x] Scaffold Vite + React + Tailwind v4 project
- [x] Create dummy data in `src/data/projects.js` (+ `settings.js`)
- [x] Build `ProjectGrid` + `ProjectCard` + `ProjectLightbox` components (filterable)
- [x] Build `Navbar` with theme toggle + mobile drawer
- [x] Build `Hero`, `About`, `Process`, `Testimonials`, `Contact`, `Footer` sections
- [x] Build `AdminLayout` + `Dashboard` + `ProjectsTable` (CRUD) + `UploadProject` + `Settings` pages
- [x] Build a demo `Login` + `RequireAuth` gate (hardcoded credentials)
- [x] Wire up `react-router-dom` routes
- [x] Wire up `ProjectsContext` for global state (add/edit/delete projects in-memory)
- [x] Wire up `ThemeContext` for dark/light mode

### Phase 2 — Firebase Integration (Planned)
- [ ] Set up Firebase project + Firestore + Auth
- [ ] Replace dummy data with Firestore reads (`getDocs`)
- [ ] Add Firebase Auth login guard on `/admin` routes
- [ ] Integrate Cloudinary for image upload in `UploadProject`
- [ ] Deploy to Firebase Hosting

***

## Setup Commands

```bash
# Install Node 22 via nvm
nvm install 22 && nvm use 22 && nvm alias default 22

# Scaffold project
yarn create vite chidr-interior --template react
cd chidr-interior
yarn install

# Install dependencies
yarn add react-router-dom
yarn add -D tailwindcss @tailwindcss/vite

# Pin Node version
echo "22" > .nvmrc

# Start dev server
yarn dev
# → http://localhost:5173
```

***

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

***

## src/index.css

```css
@import "tailwindcss";
```

***

*Last updated: Phase 1 kickoff. Update this document at the start of each new phase.*