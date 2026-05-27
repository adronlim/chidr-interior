# CH iDesign & Renovation — SEO Recommendations

**Search Engine Optimisation Assessment & Action Plan**

| | |
|---|---|
| **Project** | CH iDesign & Renovation — Website Revamp |
| **Document** | SEO Assessment & Action Plan |
| **Phase context** | Phase 1 complete (frontend, dummy data) → Phase 2 (Firebase, deploy) |
| **Status** | Recommendations — not yet implemented |
| **Date** | 28 May 2026 |
| **Prepared by** | Adron Lim |
| **Client** | Interior Design / Renovation Studio — Batu Kawan, Penang |

---

## 1. Executive Summary

The Phase 1 site has solid fundamentals already in place: descriptive image
`alt` text, lazy-loaded gallery images, a single semantic `<h1>`, a meaningful
`<title>`, a base meta description, and font `preconnect` hints. These are the
basics many sites get wrong, and they are correct here.

The gaps are **structural** rather than cosmetic. The site is a client-rendered
single-page application, so the HTML delivered to crawlers is an empty
container; it carries no structured data; it has no social-sharing metadata; and
it lacks the `robots.txt` / `sitemap.xml` files search engines expect. For a
**local business** competing in a specific geography (Batu Kawan / Penang),
these gaps directly limit visibility in exactly the searches that matter most.

This document grades each issue by **impact** and **effort**, then gives a
prioritised action plan. The single highest-value, lowest-cost win is adding
`LocalBusiness` structured data; the single highest-impact structural change is
build-time prerendering so crawlers see real content.

---

## 2. What Is Already Correct

Worth stating plainly so it is not undone in future work:

| Item | Status | Location |
|---|---|---|
| Descriptive `<title>` | Good | `index.html` |
| Base meta description | Good | `index.html` |
| `lang="en"` on `<html>` | Good | `index.html` |
| Responsive viewport meta | Good | `index.html` |
| Single `<h1>` per page | Good | `src/components/Hero.jsx` |
| Image `alt` text | Good | `ProjectCard.jsx`, `ProjectLightbox.jsx`, `Hero.jsx` |
| Lazy-loaded gallery images | Good | `ProjectCard.jsx`, `ProjectLightbox.jsx` |
| Hero (LCP) image loads eagerly | Good | `Hero.jsx` |
| Font `preconnect` + `display=swap` | Good | `index.html` |

---

## 3. Findings & Recommendations (Prioritised)

Priority key: **P0** = do first (high impact, low effort), **P1** = important,
**P2** = polish.

| # | Recommendation | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | Build-time prerendering of the public page | High | Medium | **P1** |
| 2 | `LocalBusiness` structured data (JSON-LD) | High | Low | **P0** |
| 3 | Open Graph + Twitter Card metadata | High | Low | **P0** |
| 4 | `robots.txt` + `sitemap.xml` | Medium | Low | **P0** |
| 5 | `noindex` admin routes | Medium | Low | **P0** |
| 6 | Fix favicon markup + add web manifest | Low | Low | **P1** |
| 7 | Canonical URL | Medium | Low | **P1** |
| 8 | Self-host & optimise project images | Medium | Medium | **P1** |
| 9 | Remove `public/.DS_Store` | Low | Low | **P2** |
| 10 | LCP hints (`fetchpriority`, dimensions) | Low | Low | **P2** |

---

## 4. Detailed Recommendations

### 4.1 (P1) Build-time prerendering — *the structural fix*

**Problem.** `index.html` ships only `<div id="root"></div>`; all content is
injected by JavaScript at runtime. Google can render JavaScript, but it does so
on a slower second pass and less reliably than static HTML. Crucially, the
crawlers behind **link previews** (Facebook, WhatsApp, LinkedIn, X) do **not**
execute JavaScript at all — so a shared link currently exposes none of the
page's real content.

**Fix.** Because the public site is effectively a **single page** (`/`), full
server-side rendering is unnecessary. Prerender at build time so `dist/index.html`
contains the fully rendered markup:

- `vite-react-ssg` or `react-snap` — minimal change, keeps the current stack; or
- migrate the public page to **Astro** — more capable, larger lift.

This change is what makes every metadata improvement below actually *visible* to
crawlers and link-preview bots. Recommended for Phase 2, alongside deployment.

### 4.2 (P0) `LocalBusiness` structured data — *highest ROI*

**Problem.** The site emits no structured data, so search engines must infer the
business type, location, and contact details from prose.

**Fix.** Add a JSON-LD `<script type="application/ld+json">` describing the
studio as an `InteriorDesign` / `LocalBusiness`. Every field already exists in
`src/data/settings.js`:

```json
{
  "@context": "https://schema.org",
  "@type": "InteriorDesign",
  "name": "CH iDesign & Renovation",
  "description": "Penang-based interior design and renovation studio.",
  "telephone": "+60 4-123 4567",
  "email": "info@chidr.com.my",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Batu Kawan",
    "addressLocality": "Bandar Cassia",
    "postalCode": "14110",
    "addressRegion": "Penang",
    "addressCountry": "MY"
  },
  "openingHours": "Mo-Sa 09:00-18:00",
  "url": "https://<your-domain>",
  "sameAs": ["<facebook>", "<instagram>"]
}
```

This makes the studio eligible for the local pack and rich results — the
single most valuable SEO feature for a geographically-focused business.

### 4.3 (P0) Open Graph + Twitter Card metadata

**Problem.** There are no `og:*` or `twitter:*` tags, so links shared on social
and messaging apps render as bare URLs with no title, description, or image.

**Fix.** Add to the document head:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="CH iDesign & Renovation — Interior Design Studio, Penang" />
<meta property="og:description" content="Spaces that inspire the way you live. Interior design & renovation in Batu Kawan, Penang." />
<meta property="og:image" content="https://<your-domain>/CHIR.png" />
<meta property="og:url" content="https://<your-domain>/" />
<meta name="twitter:card" content="summary_large_image" />
```

React 19 hoists `<title>` and `<meta>` rendered inside components, so these can
be managed per-route without a helmet library once the site grows.

### 4.4 (P0) `robots.txt` + `sitemap.xml`

**Problem.** Neither file exists. Search engines have no sitemap to crawl and no
crawl directives.

**Fix.** Add both to `public/` (Vite copies `public/` to the build root):

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://<your-domain>/sitemap.xml
```

```xml
<!-- public/sitemap.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://<your-domain>/</loc></url>
</urlset>
```

### 4.5 (P0) `noindex` the admin area

**Problem.** The `/admin` routes are crawlable. The demo gate is cosmetic, so
nothing stops the admin UI from being indexed.

**Fix.** Two layers: `Disallow: /admin` in `robots.txt` (above), and a
`<meta name="robots" content="noindex, nofollow">` rendered on admin pages
(e.g. in `AdminLayout` / `Login`).

### 4.6 (P1) Favicon markup + web manifest

**Problem.** `index.html` declares `type="image/svg+xml"` while pointing at
`favicon.ico` — a mismatch. The repo already contains `favicon.svg`, a
`favicons/` folder, and `logo.svg` that are not fully wired up.

**Fix.** Reference the SVG favicon correctly, add an `apple-touch-icon`, and add
a `site.webmanifest` for installability and richer mobile/search presentation.

### 4.7 (P1) Canonical URL

**Problem.** No `<link rel="canonical">`, which risks duplicate-URL dilution
(e.g. with/without trailing slash, `www` vs apex) once deployed.

**Fix.** Add `<link rel="canonical" href="https://<your-domain>/" />` once the
production domain is fixed.

### 4.8 (P1) Self-host & optimise project images

**Problem.** Project covers are remote Unsplash URLs. They depend on a third
party, are not format-optimised, and contribute to Largest Contentful Paint —
a Core Web Vitals ranking signal.

**Fix.** In Phase 2, store optimised WebP/AVIF via the planned Cloudinary
pipeline, serve responsive sizes, and keep dimensions explicit to avoid layout
shift (CLS).

### 4.9 (P2) Remove `public/.DS_Store`

**Problem.** `public/.DS_Store` is a macOS artefact that Vite will copy into the
deployed build.

**Fix.** Delete it and add `.DS_Store` to `.gitignore`.

### 4.10 (P2) LCP hints

**Problem.** The hero image is the Largest Contentful Paint element but carries
no priority hint or explicit dimensions.

**Fix.** Add `fetchpriority="high"` and explicit `width`/`height` (or an aspect
ratio) to the hero `<img>` in `Hero.jsx`.

---

## 5. Suggested Sequencing

**Now (Phase 1 polish — no rendering changes, ~1 hour):**

- `LocalBusiness` JSON-LD (§4.2)
- Open Graph + Twitter tags (§4.3)
- `robots.txt` + `sitemap.xml` (§4.4)
- `noindex` admin (§4.5)
- Favicon + manifest (§4.6)
- Remove `.DS_Store` (§4.9)
- LCP hints (§4.10)

**Phase 2 (with deployment & Firebase):**

- Build-time prerendering (§4.1) — depends on a known production setup
- Canonical URL (§4.7) — depends on a fixed domain
- Self-hosted / optimised images via Cloudinary (§4.8)

---

## 6. Measuring Success

After deployment, verify and monitor with:

| Tool | Checks |
|---|---|
| Google Search Console | Indexing, queries, sitemap submission, rich-result eligibility |
| Rich Results Test | Validates `LocalBusiness` JSON-LD |
| PageSpeed Insights / Lighthouse | Core Web Vitals (LCP, CLS, INP), SEO score |
| Facebook Sharing Debugger / X Card Validator | Open Graph / Twitter preview rendering |
| Google Business Profile | Local pack presence (complements on-site SEO) |

> **Note:** On-site SEO is necessary but not sufficient for a local studio. A
> verified, complete **Google Business Profile** — with the same name, address,
> and phone as the JSON-LD above — typically drives more local enquiries than
> any single on-page change. Keep the two consistent.

---

*CH iDesign & Renovation — SEO Recommendations · Generated 28 May 2026*
