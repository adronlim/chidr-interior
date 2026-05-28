# CH iDesign & Renovation — Repo Rename Log

**Renaming `chidr-interior` → `chidr-interior-mockupv2`**

| | |
|---|---|
| **Project** | CH iDesign & Renovation — Website Revamp |
| **Operation** | GitHub repository rename + deployment realignment |
| **Status** | Complete |
| **Date** | 28 May 2026 |
| **Prepared by** | Adron Lim |
| **Commit** | `d4dead0` on `main` |

---

## 1. Summary

The GitHub repository was renamed from **`adronlim/chidr-interior`** to
**`adronlim/chidr-interior-mockupv2`** to match the local working-directory
name. All deployment-affecting configuration was updated in the same commit
so the GitHub Pages build continues to serve correctly under the new path.

The change is fully reversible (see [§7. Reversal](#7-reversal)). The
canonical Pages URL is now
`https://adronlim.github.io/chidr-interior-mockupv2/`; the previous
`/chidr-interior/` URL is no longer routable.

---

## 2. Starting State

| Item | Value |
|---|---|
| Local folder | `chidr-interior-mockupv2` |
| GitHub repository | `adronlim/chidr-interior` |
| Local git remote | `https://github.com/adronlim/chidr-interior-mockupv2` *(stale — pointed at a name that did not exist)* |
| Vite base path | `/chidr-interior/` |
| `package.json` name | `chidr-interior` |
| SEO absolute URLs | `https://adronlim.github.io/chidr-interior/` (in `index.html`, `public/sitemap.xml`, `public/robots.txt`) |

---

## 3. How the Mismatch Surfaced

A routine `git push -u origin main` from `main` failed with:

```
remote: Repository not found.
fatal: repository 'https://github.com/adronlim/chidr-interior-mockupv2/' not found
```

This is the standard 404 response GitHub returns for both **non-existent**
and **inaccessible** repositories. To disambiguate, the `gh` CLI was used:

```bash
gh repo view adronlim/chidr-interior-mockupv2
# GraphQL: Could not resolve to a Repository …

gh repo list adronlim --limit 20
# adronlim/chidr-interior   public   2026-05-27T23:15:10Z   ← actual repo
```

The repository genuinely did not exist at the local remote's URL; the actual
repository on GitHub was still named `chidr-interior`.

---

## 4. Decision

Two viable paths were considered:

| Option | Action | Trade-off |
|---|---|---|
| **A. Keep GitHub name** | Restore the local remote URL to `chidr-interior`. No code changes. | Local folder name and GitHub name remain out of sync. Live URL unchanged. |
| **B. Rename GitHub repo** | Rename GitHub repo to match local folder + update all configs. | Live URL changes (breaks bookmarks and search indexing). Local and GitHub names finally aligned. |

**Option B was chosen** to bring the GitHub repository name into line with
the local working directory.

---

## 5. Steps Performed

### 5.1 Rename the GitHub repository

```bash
gh repo rename chidr-interior-mockupv2 \
  -R adronlim/chidr-interior --yes
```

GitHub returns no output on success. Verification via
`gh repo view adronlim/chidr-interior-mockupv2 --json homepageUrl,url`
confirmed the new name.

### 5.2 Update deployment-affecting configuration

Five files reference the project slug in deployed assets:

| File | Field / location | Change |
|---|---|---|
| `vite.config.js` | `base` | `'/chidr-interior/'` → `'/chidr-interior-mockupv2/'` |
| `package.json` | `name` | `"chidr-interior"` → `"chidr-interior-mockupv2"` |
| `index.html` | 5 absolute URLs | `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url` + `image` |
| `public/sitemap.xml` | `<loc>` | Project URL |
| `public/robots.txt` | `Disallow:` + `Sitemap:` | Admin disallow path + sitemap URL |

The local git remote URL already pointed at `chidr-interior-mockupv2`
(this was the original cause of the failed push), so it required no
further change — once GitHub had been renamed, the URL was valid.

### 5.3 Commit and push

```bash
git add index.html package.json public/robots.txt \
        public/sitemap.xml vite.config.js
git commit -m "Rename project to chidr-interior-mockupv2: \
update base path and SEO URLs"
# [main d4dead0]  5 files changed, 13 insertions(+), 13 deletions(-)

git push -u origin main
# 1853baa..d4dead0  main -> main
# branch 'main' set up to track 'origin/main'.
```

### 5.4 (Later) Update the GitHub repo "homepage" field

The sidebar "homepage" link on the GitHub repository page was set via:

```bash
gh repo edit adronlim/chidr-interior-mockupv2 \
  --homepage "<chosen URL>"
```

The canonical choice for this field is the live deployment URL
(`https://adronlim.github.io/chidr-interior-mockupv2/`); any other value
will misattribute the repository when visitors click through.

---

## 6. Items Deliberately Not Changed

The following references to `chidr-interior` were left in place because
they document the historical state of the project rather than configure
its current deployment:

- `CLAUDE.md` — references to the prior project name in development guidance
- `context.md` — historical setup commands (`yarn create vite chidr-interior …`) and project-tree examples
- `docs/phase-1-frontend.md`, `docs/seo-recommendations.md` — phase reports issued at the time of the previous name

The brand domain `chidr.com.my` (in `settings.js` and `index.html` JSON-LD) is the
company's email/web domain, distinct from the repository slug, and was not
touched.

---

## 7. Reversal

The rename is fully reversible. To restore the previous state:

```bash
# 1. Rename the GitHub repository back
gh repo rename chidr-interior \
  -R adronlim/chidr-interior-mockupv2 --yes

# 2. Revert the configuration commit
git revert d4dead0
git push
```

The local folder name does not affect git or deployment and can be left as
`chidr-interior-mockupv2` or renamed independently with `mv`.

---

## 8. Caveats and Follow-Ups

- **Old GitHub Pages URL is dead.** `https://adronlim.github.io/chidr-interior/`
  no longer routes. GitHub Pages does not issue redirects for project-page
  renames. Inbound links, prior search-engine results, and any saved bookmarks
  pointing at the previous URL will return 404.
- **Pages workflow trigger.** `.github/workflows/static.yml` triggers on
  pushes to the `github-static-deploy` branch, not `main`. The configuration
  commit on `main` does not, by itself, cause a redeploy. A separate push
  or merge into `github-static-deploy` is required to publish the
  rebuilt site under the new URL.
- **Repo "homepage" field accuracy.** Whatever value is set via
  `gh repo edit --homepage` becomes the link visitors see in the GitHub
  sidebar. Keep this in line with the actual deployed URL to avoid
  misdirecting users.
- **Documentation drift.** As noted in §6, several documentation files
  still reference the previous name. These can be updated in a follow-up
  pass if a clean documentation cut is desired — they have no effect on
  the build, deployment, or SEO.

---

*This document is a point-in-time record of the rename operation. The
canonical configuration is whatever is currently checked in to `main`.*
