# Implementation Plan: Bilingual Portfolio Site

**Branch**: `001-bilingual-portfolio-site` | **Date**: 2026-07-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-bilingual-portfolio-site/spec.md`

## Summary

A static, bilingual (FR/EN) personal portfolio with four pages (Home, Projects, Blog, Leadership)
and locale-matched CV PDF downloads, built with Astro + TypeScript + Tailwind CSS. Projects, Blog,
and Leadership content are authored as Markdown in per-language Astro Content Collections so new
entries never require a code change. Routing uses a `/fr/` `/en/` URL prefix via a single
parametrized route template (not duplicated page trees), so the language selector can always
resolve to the equivalent content on switch. Components follow Atomic Design; quality is enforced
via Vitest + Testing Library (unit/component), Playwright (E2E + visual regression + accessibility
scans), and a GitHub Actions pipeline (lint, typecheck, tests, build, Lighthouse CI ≥ 90) gating
GitHub Pages deployment.

## Technical Context

**Language/Version**: TypeScript 5.x (`strict` mode), Astro (latest stable 4.x), static output

**Primary Dependencies**: Astro, `@astrojs/tailwind` (Tailwind CSS), Astro Content Collections
(built-in), Zod (content schema validation, bundled with Astro), Vitest, `@testing-library/dom`
(or Astro container API for component tests), Playwright, `@axe-core/playwright`, `@lhci/cli`
(Lighthouse CI)

**Storage**: N/A — no database; all content is Markdown files under `src/content/`, static binary
assets (photo, CV PDFs) under `public/`

**Testing**: Vitest + Testing Library for unit/component tests; Playwright for end-to-end, visual
regression, and accessibility (axe) tests; Lighthouse CI for performance/accessibility/SEO gates

**Target Platform**: Static site hosted on GitHub Pages (no server runtime)

**Project Type**: Web — single static-site project (no separate backend; content is file-based)

**Performance Goals**: Lighthouse Performance/Accessibility/SEO ≥ 90 on every page (constitution
Principle III)

**Constraints**: WCAG 2.1 AA minimum (constitution Principle IV); TypeScript strict, no new `any`
without justification (Principle V); content additions (Projects/Blog/Leadership) MUST NOT require
a code change (Principle II); bilingual content parity FR/EN (Principle I); single design-token
source reused across all pages (Principle VI); fully automated deploy via GitHub Actions → GitHub
Pages, failing pipeline blocks deploy (Deployment & Delivery)

**Scale/Scope**: 4 page types × 2 locales, an extensible (unbounded, low-hundreds realistic) number
of Project/Blog/Leadership entries, personal-portfolio traffic scale (no concurrency/load concerns)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Initial (pre-research) | Post-design (post Phase 1) |
|---|---|---|---|
| I. Bilingual Content Parity | Every page/content type ships FR+EN with equivalent depth | PASS — routing and content collections are symmetric per locale by construction | PASS — [contracts/routing.md](./contracts/routing.md) + [contracts/i18n-dictionary.md](./contracts/i18n-dictionary.md) make asymmetry a build/CI failure, not a manual-review concern |
| II. Content as Data | Projects/Blog additions require no code change | PASS — Content Collections chosen specifically for this | PASS — extended to Leadership too (research.md §2), since spec FR-016/017 impose the same extensibility need |
| III. Performance & Core Web Vitals | Lighthouse ≥ 90 all pages | PASS — Astro static output + zero-JS-by-default is the primary lever | PASS — Lighthouse CI wired into the pipeline as a hard gate (research.md §7) |
| IV. Accessibility (WCAG AA) | AA minimum, verified | RISK — user's stack list only mentions Lighthouse CI, whose a11y category is not a full WCAG AA audit | PASS — closed by adding `@axe-core/playwright` scans per page/locale (research.md §6), no new dependency beyond a Playwright plugin |
| V. Type Safety & Testing Discipline | strict TS; unit + visual tests per component | PASS — TS strict specified; Vitest+Testing Library (unit) and Playwright (visual) both specified | PASS — confirmed via [contracts/content-collections.md](./contracts/content-collections.md) (Zod extends type-safety to content) |
| VI. Cohesive Professional Design Identity | Single design-token source, `ui-ux-pro-max`-informed | PASS — Tailwind theme config as single token source; Atomic Design enforces reuse | PASS — no change; enforcement point is `atoms/` per research.md §5 |
| Deployment & Delivery | Automated CI/CD, failing pipeline blocks deploy | PASS — matches user-specified pipeline steps | PASS — job list finalized in research.md §7 |

**Result**: No unresolved violations. The one identified risk (Accessibility, WCAG AA vs.
Lighthouse-only coverage) is resolved by a research decision (axe-core in Playwright), not by a
constitution exception — see [research.md](./research.md) §6. No entries required in Complexity
Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-bilingual-portfolio-site/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md          # Phase 1 output
├── contracts/               # Phase 1 output
│   ├── content-collections.md
│   ├── i18n-dictionary.md
│   └── routing.md
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── atoms/            # Buttons, tags, headings, icons — consume design tokens directly
│   ├── molecules/         # Facet card, project card, tag list, language selector control
│   ├── organisms/          # Nav bar (incl. language selector + CV download), projects grid+filter,
│   │                        blog list, leadership list
│   └── templates/           # Per-page layout skeletons (Home, Projects, Blog, Leadership)
├── content/
│   ├── config.ts            # Zod schemas for projects / blog / leadership collections
│   ├── fr/
│   │   ├── projects/*.md
│   │   ├── blog/*.md
│   │   └── leadership/*.md
│   └── en/
│       ├── projects/*.md
│       ├── blog/*.md
│       └── leadership/*.md
├── data/
│   └── facets.ts            # Fixed 3-entry Profile Facet definitions (see data-model.md)
├── i18n/
│   ├── schema.ts             # Shared TS type for dictionary key shape
│   ├── fr.json
│   └── en.json
├── layouts/                  # Base HTML layout(s) shared by templates
├── lib/
│   ├── i18n.ts                # t() accessor, locale helpers
│   └── routing.ts              # Counterpart-path resolution (contracts/routing.md)
├── pages/
│   ├── index.astro              # Redirects to default locale
│   └── [lang]/
│       ├── index.astro            # Home
│       ├── projects/
│       │   └── index.astro
│       ├── blog/
│       │   ├── index.astro
│       │   └── [slug].astro
│       └── leadership/
│           └── index.astro
└── styles/
    └── global.css                # Tailwind entry + design tokens (theme extension)

public/
├── images/                       # Professional photo
└── cv/
    ├── cv-fr.pdf
    └── cv-en.pdf

tests/
├── unit/                          # Vitest + Testing Library — component logic/behavior
└── playwright/
    ├── e2e/                        # User-flow tests (navigate, filter, switch language, download CV)
    └── visual/                      # Screenshot regression per page × locale

.github/
└── workflows/
    └── ci.yml                       # lint, typecheck, unit tests, build, e2e+visual, Lighthouse CI, deploy
```

**Structure Decision**: Single static-site Astro project (no separate frontend/backend split — a
static site has no backend). Content lives entirely under `src/content/` as Markdown; UI chrome
strings live under `src/i18n/`; components follow Atomic Design under `src/components/`; routing is
a single parametrized `[lang]` tree under `src/pages/` rather than duplicated `fr/`/`en/` page
trees, to keep the two locales structurally incapable of drifting apart. Tests are split by tool
(`tests/unit` for Vitest, `tests/playwright/{e2e,visual}` for Playwright) rather than by feature,
matching each tool's own runner conventions.

## Complexity Tracking

*No entries — Constitution Check reported no unresolved violations (see table above).*
