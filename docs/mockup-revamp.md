# CH iDesign & Renovation — Mockup Revamp Log

**Editorial direction pass and new sections (v2 mockup)**

| | |
|---|---|
| **Project** | CH iDesign & Renovation — Website Revamp |
| **Operation** | UI revamp toward an editorial portfolio direction |
| **Status** | Complete (frontend only — Phase 1 data layer unchanged) |
| **Date** | 28 May 2026 |
| **Prepared by** | Adron Lim |
| **Commits** | `53d9f65` (direction pass), `4a8776a` (new sections) on `main` |

---

## 1. Summary

The public site was reworked in two passes toward a more editorial,
portfolio-led visual direction in keeping with the genre of high-end
interior-design studio sites. The change is purely presentational — no
routes, data shapes, contexts, or admin surfaces were altered, and the
admin CMS continues to operate against the same in-memory store described
in the Phase 1 report.

Two commits compose the work:

| Commit | Subject | Scope |
|---|---|---|
| `53d9f65` | Revamp public site to editorial direction | Restyle of all 6 existing public sections + Navbar/Footer container alignment |
| `4a8776a` | Add Studio, FeaturedProject, Marquee, Press, InlineCta sections | 5 new sections + supporting dummy data and one minor refactor (lightbox state lifted) |

Both build cleanly. The bundle grew from ~273 KB JS / 41 KB CSS to
~290 KB JS / 47 KB CSS, a modest cost for the new components.

---

## 2. Scope and Constraints

### 2.1 Direction reference

The client supplied a ThemeForest live-preview URL as a vibe reference for
the desired aesthetic neighbourhood (oversized serif type, full-bleed
imagery, asymmetric grids, generous whitespace, numbered editorial
chapter marks).

**The reference template was not reproduced.** No images, copy, layouts,
unique design elements, or other creative expressions were lifted from
the template kit. The work below uses only widely-used genre conventions
common across the high-end interior-design portfolio category, and all
copy throughout the site is original — written from scratch in the
client's existing brand voice (Penang, Batu Kawan, the cream/gold/
charcoal palette already established in Phase 1).

### 2.2 What stayed put

- All routes (`/`, `/admin/*`)
- Routing config in `src/App.jsx`
- `ThemeContext`, `ProjectsContext`, admin pages, lightbox, demo auth gate
- The project data shape in `src/data/projects.js` (a single field,
  `services[].items[]`, was added to `settings.js` — see §6.3)
- Brand palette and font choices (Cormorant Garamond + DM Sans)
- The light/dark theme system

### 2.3 What the direction was

Five concrete moves were applied consistently across the site:

1. **Oversized display type.** Hero headline up to `lg:text-9xl`; section
   H2s up one notch (`md:text-5xl` → `md:text-6xl`).
2. **Numbered editorial eyebrows.** Each section carries `01 — Section
   name` through `07 — Get in touch`, replacing visual divider lines.
3. **Asymmetric grids.** The project grid uses a 2-column layout where
   every fifth item spans full width as a cinematic feature tile.
4. **Sharper edges.** `rounded-xl` curves removed from cards and image
   containers in favour of flush rectangles, in keeping with editorial
   print conventions.
5. **Wider container, more breathing room.** All public sections moved to
   `max-w-7xl` + `md:px-10` and `py-24 md:py-36` vertical padding.

---

## 3. Phase A — Editorial Direction Pass

Commit `53d9f65` restyles every public section in place. The data and
component contracts are unchanged; only the JSX/Tailwind classes were
touched.

### 3.1 Hero

- Switched from a 2-column split (text left / image right) to a full-bleed
  treatment: a tall image (`h-[88vh] min-h-[600px]`) as the backdrop, a
  gradient overlay for type contrast, and the headline floating over it.
- Eyebrow anchored top-left, headline + supporting copy + CTAs anchored
  bottom-left.
- The two stat cards previously overlaid on the image were promoted to a
  dedicated 2-column strip below the image with hairline dividers.

### 3.2 ProjectGrid

- Masonry-style CSS columns replaced with a deterministic 2-column grid
  where every 5th project gets `md:col-span-2` (full width).
- Pill-style filter buttons replaced with text-link filters that animate
  an underline indicator on selection.

### 3.3 ProjectCard

- Rounded corners removed.
- Category badge (previously an overlay pill on the image) moved to a
  small-caps eyebrow above the project title.
- Hover effect changed from a colour swap to a left-to-right underline
  grow on the project name (CSS `bg-[length]` transition trick).
- Accepts a new `featured` prop; featured tiles use `aspect-[16/9]`
  (cinematic), default tiles use `aspect-[4/5]` (portrait).

### 3.4 About

- Headline + intro copy rearranged into a 12-column grid (7/5 split).
- Service cards switched from `rounded-xl` boxes to flush-edged tiles
  separated by hairline dividers (a `gap-px` + background trick).

### 3.5 Process

- Now sits on a tinted `bg-stone/40` band for visual separation, since
  the cross-cutting removal of `border-t` dividers needed something to
  delineate the section.
- Step numerals enlarged and faded into the background as a large
  decorative mark, in the style of editorial chapter marks.

### 3.6 Testimonials

- Quote bodies promoted from `text-lg` sans-serif to serif display
  (`text-2xl md:text-[1.65rem]`), reading like magazine pull-quotes.
- Author roles now small-caps eyebrows, separated from the name with a
  hairline.

### 3.7 ContactForm

- Boxed input fields replaced with underline-only inputs (no border on
  the sides or top), which is a common editorial form treatment.
- Contact details (phone, email, studio, hours) rendered in serif
  display rather than sans-serif body.

### 3.8 Navbar and Footer

- Container widths bumped from `max-w-6xl` to `max-w-7xl` with
  `md:px-10` to align with the new section rhythm. No other changes;
  this was purely a visual-alignment fix.

---

## 4. Phase B — New Sections Added

Commit `4a8776a` adds five new sections and renumbers the existing
editorial eyebrows to fit the new ordering. The new section composition
in `src/pages/Home.jsx` is:

```
Navbar
  Hero
  Marquee
  About            (01 — About the studio)
  Studio           (02 — The people)
  InlineCta
  FeaturedProject  (03 — Signature project)
  ProjectGrid      (04 — Selected work)
  Process          (05 — How we work)
  Press
  Testimonials     (06 — Kind words)
  ContactForm      (07 — Get in touch)
Footer
ProjectLightbox    (now owned by Home)
```

### 4.1 Marquee — `src/components/Marquee.jsx`

A slow horizontal ticker rendered between Hero and About. Accepts an
optional `items` prop and falls back to a default set of short brand
phrases ("Interior Design", "Renovation", "Batu Kawan · Penang", etc.).
Items are duplicated so the `translateX(-50%)` keyframe loops seamlessly.
The keyframe itself lives in `src/index.css`:

```css
@theme {
  --animate-marquee: marquee 36s linear infinite;
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}
```

This registers an `animate-marquee` utility for use in any component.

### 4.2 Studio — `src/components/Studio.jsx`

A 3-up team grid showcasing fictional studio members (see §6.1). Uses a
12-column header (7/5 split for the heading and intro copy) and a
3-column body for the team cards. Sits on a tinted `bg-stone/40` band
to visually pair it with the existing Process section.

### 4.3 InlineCta — `src/components/InlineCta.jsx`

A quiet gold full-width band placed between Studio and FeaturedProject.
Renders an eyebrow ("Now booking"), a serif headline ("Currently taking
on Q4 2026 projects."), and a single text link to the `#contact`
anchor. Provides a mid-page conversion point without overloading the
hero.

### 4.4 FeaturedProject — `src/components/FeaturedProject.jsx`

A cinematic single-project block presented above the rest of the
catalogue. It receives a `project` prop (Home passes `published[0]`) and
an `onOpen` callback. Layout:

- Heading row: numbered eyebrow + project name on the left, Type / Area /
  Year metadata as a 3-column `dl` on the right.
- A 21:9 image; clicking opens the same lightbox the grid uses (see §7.1).
- A 12-column footer block with the project description in serif display
  on the left and a "See the full archive" link on the right.

### 4.5 Press — `src/components/Press.jsx`

A short recognition strip between Process and Testimonials. Renders
"Featured & recognised in" + a flex-wrapped list of publication marks in
muted serif. Five fictional items live in `src/data/settings.js` (see
§6.2) — these are placeholders to be replaced with real mentions when
available.

---

## 5. Files Touched

| Area | File | Phase A | Phase B |
|---|---|---|---|
| Public sections | `src/components/Hero.jsx` | restyle | type bump |
| | `src/components/About.jsx` | restyle | render `items[]` |
| | `src/components/ProjectGrid.jsx` | restyle, lift filter UI | renumber, lift lightbox state |
| | `src/components/ProjectCard.jsx` | restyle, `featured` prop | — |
| | `src/components/Process.jsx` | restyle | renumber |
| | `src/components/Testimonials.jsx` | restyle | renumber |
| | `src/components/ContactForm.jsx` | restyle | renumber |
| New sections | `src/components/Marquee.jsx` | — | new |
| | `src/components/Studio.jsx` | — | new |
| | `src/components/InlineCta.jsx` | — | new |
| | `src/components/FeaturedProject.jsx` | — | new |
| | `src/components/Press.jsx` | — | new |
| Shell | `src/components/Navbar.jsx` | container width | — |
| | `src/components/Footer.jsx` | container width | — |
| | `src/pages/Home.jsx` | — | compose new sections, own lightbox state |
| Tokens | `src/index.css` | — | register marquee animation |
| Data | `src/data/settings.js` | — | `team[]`, `press[]`, `services[].items[]` |

Nothing in `src/context/`, `src/pages/admin/`, `src/data/projects.js`,
`vite.config.js`, `index.html`, or the routing setup was touched.

---

## 6. Data Additions

All values below are placeholders, written from scratch. They are not
drawn from real people, real publications, or any external source, and
are intended to be replaced before the site is treated as
production-facing.

### 6.1 `team[]` — 3 fictional studio members

| Field | Notes |
|---|---|
| `name` | Plausible Malaysian-Chinese / Indian-Malaysian names for Penang |
| `role` | Founder & Lead Designer · Project Architect · Site & Build Lead |
| `bio` | One sentence each, in brand voice |
| `img` | Unsplash portrait URLs — interchangeable |

### 6.2 `press[]` — 5 fictional recognition marks

| Mark |
|---|
| Habitat & Form |
| Studio Quarterly |
| Penang Design Week '24 |
| Asia Renovation Awards |
| Spaces SEA |

These read as plausible regional design publications and awards without
impersonating any specific real outlet. Real mentions can be slotted in
by editing the `press` array.

### 6.3 `services[].items[]` — sub-task lists

Each of the three services (Interior Design / Renovation / Styling &
Furnishing) gains an `items[]` array of five short sub-tasks rendered
under the existing description in the About section. This extends the
data shape and is reflected in the rendered service cards.

---

## 7. Technical Notes

### 7.1 Lightbox state lifted to Home

Previously, `ProjectGrid` owned the `active` lightbox state and rendered
`<ProjectLightbox>` inline. After Phase B, `FeaturedProject` also needs to
open the same lightbox. To avoid each section managing its own modal,
`active` state and the `<ProjectLightbox>` instance were moved up to
`Home`, and both `ProjectGrid` and `FeaturedProject` now receive an
`onSelect` / `onOpen` prop. This is the textbook "lift state up" refactor.

### 7.2 Vite bin shim repaired

During the first `yarn build` attempt for Phase A, the build failed with:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
'/.../node_modules/dist/node/cli.js' imported from
'/.../node_modules/.bin/vite'
```

The cause: `node_modules/.bin/vite` had been installed as a regular file
(a copy of vite's bin script) rather than as a symlink to
`../vite/bin/vite.js`. Because the script uses
`import('../dist/node/cli.js')`, the relative path resolved to
`node_modules/dist/node/cli.js` — which does not exist (the real file is
at `node_modules/vite/dist/node/cli.js`). The likely trigger is the space
in the working-directory path (`Github new`) tripping up yarn 1's
symlinking step on macOS.

Fix:

```bash
rm node_modules/.bin/vite
ln -s ../vite/bin/vite.js node_modules/.bin/vite
```

This was an environmental repair, not a code change, and it is not part
of either commit. It will need to be re-applied if `node_modules` is
nuked and re-installed in the same working directory. Renaming the
working directory to one without a space (e.g.
`Github/chidr-interior-mockupv2`) should make the issue not recur.

### 7.3 Marquee animation registration

Tailwind v4 reads custom animations from `@theme` rules. The
`--animate-marquee: marquee 36s linear infinite` line in
`src/index.css` registers an `animate-marquee` utility; the
`@keyframes marquee` block defines the actual frames. This is the
documented Tailwind v4 pattern; no plugin is required.

---

## 8. Caveats and Follow-Ups

- **Reference traceability.** The ThemeForest URL the client shared as a
  vibe reference is *not* embedded in the codebase or this document.
  It exists in the client's own records. No part of the implementation
  derives from it; the work is genre-direction only.
- **Dummy data is dummy data.** The studio team members and press
  mentions are placeholders (§6.1, §6.2). Treat the site as
  pre-production until these are replaced with real people and real
  recognition.
- **Lint command is broken-by-environment.** `yarn lint` currently fails
  with the same MODULE_NOT_FOUND error that affected `yarn build` before
  the bin repair (§7.2). The repair fixed the build but the eslint binary
  needs an equivalent investigation if linting in CI/locally is desired.
- **Doc drift.** `context.md` describes the project structure as it was
  at the start of Phase 1 and has not been updated to reflect the new
  section roster. A documentation refresh is a sensible follow-up if the
  v2 mockup is being promoted to a milestone state.
- **No CI for the bundled build.** `.github/workflows/static.yml` runs
  on pushes to `github-static-deploy`. Until either `main` is merged into
  that branch or the workflow is updated to also build from `main`, the
  deployed site at `https://adronlim.github.io/chidr-interior-mockupv2/`
  will not reflect these commits.

---

*This document is a point-in-time record of the v2 mockup revamp. The
canonical source of the design is the code on `main` at the commits
listed in §1.*
