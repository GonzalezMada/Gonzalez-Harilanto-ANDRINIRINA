# Gonzalez-Harilanto-ANDRINIRINA

Bilingual (FR/EN) personal portfolio built with Astro, Tailwind CSS v4 and TypeScript.

## Getting started

```bash
npm install     # install the dependencies
npm run dev     # start the dev server on http://localhost:4321
```

The site is served under the GitHub Pages base path, so the local URLs are:

- http://localhost:4321/Gonzalez-Harilanto-ANDRINIRINA/fr/
- http://localhost:4321/Gonzalez-Harilanto-ANDRINIRINA/en/

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Astro dev server |
| `npm run build` | Content check + `astro check` + static build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `astro check` (Astro + TypeScript) |
| `npm run lint:content` | FR/EN content parity and i18n dictionary parity |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Playwright (e2e, visual and accessibility suites) |

## Content

Projects, blog articles and leadership entries live in `src/content/{fr,en}/<collection>/*.md`.
Every entry needs a `translationKey` shared with its counterpart in the other locale;
`npm run lint:content` verifies that parity. The e2e suite derives its expected
card counts from those files, so adding an entry never breaks the tests.

## Visual regression baselines

The Playwright visual suite compares full-page screenshots against baselines that are
**platform specific** (`*-chromium-linux.png` / `*-chromium-win32.png`).

- On Windows, refresh the local baselines with:
  ```bash
  npx playwright test tests/playwright/visual --update-snapshots
  ```
- A Linux baseline can only be produced by Chromium running on Linux, so it has to be
  regenerated on a GitHub runner. The **Update visual baselines** workflow
  (`.github/workflows/update-visual-baselines.yml`) runs on every push to `dev`, commits
  the refreshed Linux baselines to that branch and uploads them as an artifact. The
  images show up in the pull request diff, so they can be reviewed there. It can also be
  started manually from the Actions tab for any branch.
- Because the baseline commit is authored by `github-actions[bot]`, GitHub puts the
  pull request checks of that commit in the *action required* state: approve them once
  ("Approve and run workflows") or push any new commit to restart the checks.
