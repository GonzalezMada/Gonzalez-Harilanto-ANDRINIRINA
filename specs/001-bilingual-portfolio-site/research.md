# Phase 0 Research: Bilingual Portfolio Site

**Input**: Technical Context from [plan.md](./plan.md), stack constraints supplied by user, and
[constitution.md](../../.specify/memory/constitution.md).

All items below were fully specified by the user's stack input; this document records the
decision, rationale, and alternatives considered so the choice doesn't need to be re-litigated
during implementation. No `NEEDS CLARIFICATION` markers remain.

## 1. Framework & rendering strategy

- **Decision**: Astro (latest stable 4.x line), static output (`output: 'static'`), TypeScript in
  `strict` mode, Tailwind CSS via `@astrojs/tailwind`.
- **Rationale**: Astro ships zero JS by default and is purpose-built for content-heavy,
  mostly-static sites like a portfolio — directly supports Principle III (Performance & Core Web
  Vitals, Lighthouse ≥ 90) with far less effort than a client-rendered SPA framework. Static
  output matches the GitHub Pages deployment target (no server runtime available).
  Tailwind gives utility-first styling that pairs cleanly with a centralized design-token
  approach (Principle VI) via `tailwind.config` theme extension.
- **Alternatives considered**: Next.js (heavier client JS baseline, SSR/ISR features unneeded for
  a static personal site), plain Vite + React (would require hand-rolling content collections and
  static routing that Astro provides natively).

## 2. Content modeling (projects, blog, leadership)

- **Decision**: Astro Content Collections, one collection per content type, split by language
  directory: `src/content/{fr,en}/projects/*.md`, `src/content/{fr,en}/blog/*.md`, and — added in
  this plan to satisfy spec Principle-driven extensibility (FR-016/FR-017) — `src/content/{fr,en}/leadership/*.md`.
  Each collection has a Zod schema in `src/content/config.ts` validating required frontmatter per
  content type.
- **Rationale**: The user's input explicitly specified this collection/folder layout for
  `projects` and `blog`. The spec (FR-016) requires Leadership entries with the same bilingual
  parity and structured-content properties as Projects/Blog; Leadership is not called out in the
  user's stack description as a distinct Content Collection, but the constitution's "Content as
  Data" principle (Principle II) applies to it just the same, and reusing the identical per-language
  collection pattern is the simplest way to satisfy that principle without inventing a second
  content mechanism. Zod schemas make missing/malformed frontmatter a build-time error instead of
  a silent content bug — directly supports Principle V (type safety).
- **Alternatives considered**: A single collection with a `type` discriminator field (rejected —
  loses per-content-type schema validation); hardcoding Leadership entries as TSX/Astro
  components (rejected — violates Principle II, would require a code change to add a 5th
  leadership experience).

## 3. Internationalization (routing + UI strings)

- **Decision**: URL-prefix routing (`/fr/...`, `/en/...`) implemented via a single dynamic
  `[lang]` route segment under `src/pages/[lang]/...` with `getStaticPaths()` generating both
  locales from the same page templates, plus a root `src/pages/index.astro` that redirects to a
  default locale (`/fr/` — see Assumption below). UI chrome strings (nav labels, buttons, empty
  states, etc.) live in a JSON dictionary per locale: `src/i18n/fr.json`, `src/i18n/en.json`, both
  validated against the same TypeScript key shape so a missing EN or FR key is a type error.
- **Rationale**: A single parametrized route template (rather than duplicated `src/pages/fr/` and
  `src/pages/en/` trees) avoids drift between locales — directly supports Principle I (bilingual
  parity) and the "content as data" spirit by keeping structure in one place. Typed dictionaries
  give a compile-time guarantee that both locales define the same UI keys, catching parity
  violations from spec FR-018 before runtime.
- **Alternatives considered**: `astro-i18next` / `@astrojs/i18n`-style routing integrations
  (rejected — the user specified a plain prefix + JSON dictionary approach, and Astro's built-in
  `i18n` config plus a manual dictionary is sufficient at this scale, avoiding an extra
  dependency).

## 4. Language-switch context preservation (spec FR-003)

- **Decision**: Every route template computes its "counterpart path" (same page type, same slug
  where applicable) in the other locale at render time, using the shared route param and, for
  detail pages (blog article, project — if ever given detail pages), the content collection's
  `translationKey` frontmatter field (a stable ID shared by a FR entry and its EN counterpart).
  The language selector links directly to that computed counterpart path. If no counterpart entry
  exists for a detail page, the selector falls back to that section's list page in the target
  language (per spec Edge Cases).
- **Rationale**: This satisfies FR-003 without client-side state — pure static routing, so it
  works with zero JS and stays inside the Performance principle's budget.
- **Alternatives considered**: Client-side language toggle that reloads via JS routing table
  (rejected — adds JS for something static routing already solves, and risks a flash/redirect that
  hurts perceived performance).

## 5. Component architecture

- **Decision**: Atomic Design folders under `src/components/`: `atoms/`, `molecules/`,
  `organisms/`, `templates/`, each `.astro` (or `.tsx` only where interactivity is required,
  e.g., the Projects category filter).
- **Rationale**: Matches the user's explicit instruction and gives a predictable place to enforce
  Principle VI (single design-token source reused everywhere) — atoms consume design tokens
  directly, everything above composes atoms rather than redefining styles.
- **Alternatives considered**: Feature-folder organization (grouping by page instead of by
  component granularity) — rejected because the user specified Atomic Design explicitly.

## 6. Testing strategy

- **Decision**:
  - Unit/component tests: Vitest + Testing Library (`@testing-library/dom` or the Astro
    container API for `.astro` component testing), covering component logic/behavior per
    Principle V.
  - Visual regression + end-to-end: Playwright, with a `tests/playwright/e2e/` suite (user flows:
    navigate, filter projects, switch language, download CV) and a `tests/playwright/visual/`
    suite (screenshot comparisons per page/locale) per Principle V and Principle VI (visual
    consistency).
  - Accessibility: `@axe-core/playwright` integrated into the Playwright E2E suite, asserting zero
    critical/serious violations per page — this is an addition beyond the user's literal list,
    made because Lighthouse's Accessibility category (covered separately, see §7) is a useful
    signal but does not by itself guarantee WCAG 2.1 AA (Principle IV); an axe scan closes that
    gap using the same tool (Playwright) already in the stack, at no new-dependency cost beyond one
    plugin.
- **Rationale**: Directly satisfies Principle V's "unit tests + visual tests" requirement and
  closes the accessibility verification gap left by Lighthouse-only checks.
- **Alternatives considered**: Cypress for E2E (rejected — user specified Playwright); Percy/Chromatic
  for visual diffing (rejected — Playwright's built-in screenshot assertions are sufficient at this
  scale and avoid a paid third-party service).

## 7. CI/CD pipeline

- **Decision**: GitHub Actions workflow with sequential/parallel jobs: `lint` (ESLint), `typecheck`
  (`astro check` + `tsc --noEmit`), `unit-tests` (Vitest), `e2e-and-visual-tests` (Playwright,
  against a local preview build), `build` (`astro build`), `lighthouse-ci` (`@lhci/cli` against the
  built static output, asserting Performance/Accessibility/SEO ≥ 90 per Principle III), then
  `deploy` (GitHub Pages) gated on all prior jobs succeeding, triggered on merge to the default
  branch.
- **Rationale**: Matches the user's specified pipeline steps (lint, typecheck, tests, build,
  Lighthouse CI, deploy) while satisfying the constitution's Deployment & Delivery section
  (automated pipeline, failing pipeline blocks deploy, no manual override).
- **Alternatives considered**: Running Lighthouse CI against a deployed preview URL instead of the
  local build (rejected for the default flow — asserting on the local static build keeps the gate
  fast and deterministic; a deployed-preview check is not precluded later but isn't required to
  meet the current requirements).

## 8. Assets (photo, CV PDFs)

- **Decision**: Static binary assets (professional photo, `cv-fr.pdf`, `cv-en.pdf`) live under
  `public/`, referenced by absolute site paths from content/components — matches user's explicit
  instruction.
- **Rationale**: `public/` assets are copied verbatim by Astro's build with no processing needed,
  appropriate for a PDF download and a photo that doesn't need Astro's image-optimization pipeline
  applied identically across locales (same photo for both languages).
- **Alternatives considered**: Astro's `src/assets` + `<Image />` optimization pipeline for the
  photo (viable, deferred to implementation-time choice for the photo specifically; CV PDFs are
  not images so `public/` is the only option for them regardless).

## Outstanding items

None. All Technical Context fields are resolved; no `NEEDS CLARIFICATION` markers remain.
