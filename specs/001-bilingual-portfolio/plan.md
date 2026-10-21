# Implementation Plan: Bilingual Personal Portfolio

**Branch**: `001-bilingual-portfolio` | **Date**: 2026-07-19 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-bilingual-portfolio/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command; its definition describes the execution workflow.

## Summary

Build a bilingual (FR/EN) personal portfolio using Astro + TypeScript + Tailwind CSS with Content Collections for Markdown-based content. The site will have 4 main pages (Home, Projects, Blog, Leadership), a CV download feature, and a persistent language selector. All content is stored in `/src/content/{fr,en}/{projects,blog}/*.md` with i18n routing via `/fr/` and `/en/` prefixes. Components follow Atomic Design principles. CI enforces lint, typecheck, tests, Lighthouse CI, and automated deployment to GitHub Pages.

## Technical Context

**Language/Version**: TypeScript 5.x with strict mode (`strict: true`)

**Primary Dependencies**: Astro 4+, Tailwind CSS 3+, Vitest, Testing Library, Playwright

**Storage**: Astro Content Collections (Markdown files in `/src/content/fr/` and `/src/content/en/`); assets in `/public/`

**Testing**: Vitest + Testing Library (unit/component), Playwright (visual regression + E2E), axe-core (accessibility), Lighthouse CI (performance)

**Target Platform**: Static site deployed to GitHub Pages (SSG)

**Project Type**: Static site generator (SSG) web application

**Performance Goals**: Lighthouse performance score ≥ 90 on all pages; FCP < 1.5s, LCP < 2.5s, CLS < 0.1

**Constraints**: WCAG 2.1 AA compliance; bundle size < 200KB gzipped; TypeScript strict mode; no hardcoded design values

**Scale/Scope**: Personal portfolio with extensible content (projects, blog articles, leadership experiences)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Bilingual Content Parity**: Feature supports FR/EN content parity via Content Collections with paired language folders and prefix routing
- [x] **II. Content-Driven Architecture**: Feature does not require code changes for content updates; content remains in Markdown via Astro Content Collections
- [x] **III. Performance & Accessibility**: Feature maintains Lighthouse ≥ 90 and WCAG 2.1 AA compliance via CI gates and Tailwind accessibility utilities
- [x] **IV. TypeScript Strict & Tested Components**: Feature uses TypeScript strict mode; tests planned for all new components (Vitest + Testing Library + Playwright)
- [x] **V. Automated Deployment & Design Consistency**: Feature uses centralized design tokens via Tailwind CSS config; GitHub Actions configured for automated deployment

## Project Structure

### Documentation (this feature)

```text
specs/001-bilingual-portfolio/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── content/
│   ├── fr/
│   │   ├── projects/
│   │   │   └── *.md
│   │   └── blog/
│   │       └── *.md
│   └── en/
│       ├── projects/
│       │   └── *.md
│       └── blog/
│           └── *.md
├── styles/
│   └── tokens.css       # Tailwind design tokens
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── layouts/
├── pages/
│   ├── fr/
│   │   ├── index.astro
│   │   ├── projects.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── leadership.astro
│   └── en/
│       ├── index.astro
│       ├── projects.astro
│       ├── blog/
│       │   ├── index.astro
│       │   └── [slug].astro
│       └── leadership.astro
├── i18n/
│   ├── fr.json          # UI label dictionary
│   └── en.json
├── utils/
│   └── i18n.ts          # Language switching utilities
├── types/
│   └── content.ts       # Content collection type definitions
└── env.d.ts

public/
├── cv/
│   ├── cv-fr.pdf
│   └── cv-en.pdf
└── photo/
    └── profile.jpg

tests/
├── unit/
├── integration/
└── e2e/

astro.config.mjs
tailwind.config.mjs
tsconfig.json
```

**Structure Decision**: Astro SSG with Content Collections for Markdown content, prefix-based i18n routing (`/fr/`, `/en/`), Atomic Design component organization, Tailwind CSS for styling with centralized design tokens, assets in `/public/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations. All principles are satisfied by the chosen architecture.
