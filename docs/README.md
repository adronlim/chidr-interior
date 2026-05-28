# Documentation

Project documentation for CH iDesign & Renovation. Phase reports are kept here
as both an editable Markdown source and a generated PDF deliverable.

## Phase reports

| Phase | Source | PDF |
|---|---|---|
| Phase 1 — Frontend with Dummy Data | [phase-1-frontend.md](phase-1-frontend.md) | [phase-1-frontend.pdf](phase-1-frontend.pdf) |

## Advisory

| Document | Source | PDF |
|---|---|---|
| SEO Assessment & Action Plan | [seo-recommendations.md](seo-recommendations.md) | [seo-recommendations.pdf](seo-recommendations.pdf) |

## Operations log

| Document | Source | PDF |
|---|---|---|
| Repo Rename — `chidr-interior` → `chidr-interior-mockupv2` | [repo-rename.md](repo-rename.md) | [repo-rename.pdf](repo-rename.pdf) |

## Regenerating a PDF

The PDFs are rendered from the Markdown via a styled HTML intermediate using
headless Chrome (no extra dependencies required on macOS):

```bash
# 1. Author/update the Markdown source (docs/phase-N-*.md)
# 2. Render the matching styled HTML, then print to PDF:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="docs/phase-1-frontend.pdf" \
  "file:///absolute/path/to/phase-1-frontend.html"
```

> The Markdown file is the canonical source of truth; the PDF is a point-in-time
> deliverable for the client. See the root [context.md](../context.md) for the
> full project brief and roadmap.
