---

description: "Task list for Bilingual Portfolio Site"
---

# Tasks: Bilingual Portfolio Site

**Input**: Design documents from `/specs/001-bilingual-portfolio-site/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Included — unit tests and Playwright tests (navigation, visual regression, CV flow,
accessibility) were explicitly requested by the user for this feature.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Every task includes an exact file path

## Path Conventions

Single Astro project at the repository root (per [plan.md](./plan.md) Project Structure):
`src/`, `public/`, `tests/unit/`, `tests/playwright/{e2e,visual}/`, `.github/workflows/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling

- [X] T001 Initialize the Astro project (TypeScript strict template) with the Tailwind CSS
      integration at the repository root (`astro.config.mjs`, `tsconfig.json` with
      `"strict": true`)
- [X] T002 [P] Configure ESLint + Prettier for Astro/TypeScript in `eslint.config.js` and
      `.prettierrc` at the repository root
- [X] T003 [P] Configure Vitest with Testing Library support in `vitest.config.ts` at the
      repository root
- [X] T004 [P] Configure Playwright in `playwright.config.ts` at the repository root, with
      separate projects/directories for the `e2e` and `visual` suites
- [X] T005 [P] Add npm scripts (`dev`, `build`, `preview`, `lint`, `typecheck`, `test:unit`,
      `test:e2e`, `lint:content`) to `package.json` per [quickstart.md](./quickstart.md)
- [X] T006 [P] Define Tailwind design tokens (color palette, typography scale, spacing) in
      `tailwind.config.mjs` as the single design-token source (constitution Principle VI,
      informed by `ui-ux-pro-max` palette/typography/layout guidance)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Define the i18n dictionary key-shape type in `src/i18n/schema.ts` per
      [contracts/i18n-dictionary.md](./contracts/i18n-dictionary.md)
- [X] T008 [P] Create `src/i18n/fr.json` and `src/i18n/en.json` with initial nav/common keys (nav
      labels, CV download label, language-switcher label) conforming to `src/i18n/schema.ts`
- [X] T009 Implement the locale/`t()` accessor helper in `src/lib/i18n.ts` (depends on T007, T008)
- [X] T010 [P] Unit test `src/lib/i18n.ts`: resolves existing keys per locale and fails/warns on a
      key missing from either locale, in `tests/unit/i18n.test.ts` (depends on T009)
- [X] T011 Create `src/content/config.ts` with Zod schemas for the `projects`, `blog`, and
      `leadership` collections per [contracts/content-collections.md](./contracts/content-collections.md)
      and [data-model.md](./data-model.md)
- [X] T012 Implement the counterpart-path resolution helper in `src/lib/routing.ts` per
      [contracts/routing.md](./contracts/routing.md) — list-page swap logic (detail-page fallback
      logic is added in the US2 phase)
- [X] T013 Create the base HTML layout in `src/layouts/BaseLayout.astro` (doctype, head/meta,
      `lang` attribute bound to the current locale, `<slot />`)
- [X] T014 [P] Create Header atoms in `src/components/atoms/Logo.astro`,
      `src/components/atoms/NavLink.astro`, and `src/components/atoms/Button.astro`, using the
      Tailwind tokens from T006
- [X] T015 [P] Create the LanguageSwitcher molecule in
      `src/components/molecules/LanguageSwitcher.astro`, using `src/lib/routing.ts` (T012) to
      compute FR/EN link targets
- [X] T016 [P] Create the CvDownloadButton molecule in
      `src/components/molecules/CvDownloadButton.astro`, resolving `/cv/cv-{lang}.pdf` from the
      current locale
- [X] T017 Create the Header organism in `src/components/organisms/Header.astro` combining nav
      (T014), LanguageSwitcher (T015), and CvDownloadButton (T016)
- [X] T018 [P] Create the Footer organism in `src/components/organisms/Footer.astro`
- [X] T019 Create the SiteLayout template in `src/components/templates/SiteLayout.astro`
      composing BaseLayout (T013) + Header (T017) + Footer (T018)
- [X] T020 Create the `[lang]` dynamic route skeleton: `src/pages/[lang]/index.astro` (placeholder
      using SiteLayout) with `getStaticPaths()` returning `fr`/`en`, plus a root redirect in
      `src/pages/index.astro` → `/fr/`
- [X] T021 [P] Add placeholder binary assets: `public/cv/cv-fr.pdf`, `public/cv/cv-en.pdf`,
      `public/images/profile.jpg` (replaced with real content in the Polish phase)

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Discover the professional identity on Home (Priority: P1) 🎯 MVP slice 1

**Goal**: Home page shows a professional photo and three profile facets, each linking to its
corresponding section.

**Independent Test**: Load the Home page and verify the photo, the three facets with summaries,
and that each facet link navigates to the correct section.

- [X] T022 [P] [US1] Define the fixed Profile Facet data (3 entries: STEM Educator → `/leadership`,
      AI Engineer/Developer → `/projects`, Computer Vision Research Student → `/blog`) in
      `src/data/facets.ts` per [data-model.md](./data-model.md)
- [X] T023 [P] [US1] Define Home-page timeline milestone data (education/career milestones) in
      `src/data/timeline.ts`
- [X] T024 [P] [US1] Add Home-page i18n keys (hero title/subtitle, CTA label, facet
      labels/summaries, timeline entry labels) to `src/i18n/fr.json` and `src/i18n/en.json`
- [X] T025 [P] [US1] Create the Hero organism in `src/components/organisms/Hero.astro`
      (professional photo, name/intro, primary CTA button linking to Projects)
- [X] T026 [P] [US1] Create the FacetCard molecule in `src/components/molecules/FacetCard.astro`
      (label, short summary, link)
- [X] T027 [US1] Create the FacetsSection organism in
      `src/components/organisms/FacetsSection.astro` rendering the 3 FacetCards (T026) from
      `src/data/facets.ts` (T022)
- [X] T028 [US1] Create the Timeline organism in `src/components/organisms/Timeline.astro`
      rendering entries from `src/data/timeline.ts` (T023)
- [X] T029 [US1] Assemble the Home page in `src/pages/[lang]/index.astro` using SiteLayout, Hero
      (T025), FacetsSection (T027), and Timeline (T028)
- [X] T030 [US1] [P] Unit test `src/data/facets.ts` shape and link targets in
      `tests/unit/facets.test.ts`
- [X] T031 [US1] [P] Playwright e2e test: Home renders the photo + exactly 3 facets + CTA, and
      each facet link navigates to its corresponding page, in
      `tests/playwright/e2e/home.spec.ts`

**Checkpoint**: Home page fully functional and independently testable/demoable.

---

## Phase 4: User Story 2 - Switch language without losing context (Priority: P1)

**Goal**: The language selector, visible on every page, keeps the visitor on equivalent content
when switching FR↔EN.

**Independent Test**: On the Home page (already built), switch language via the selector and
verify the visitor stays on Home in the target language.

- [X] T032 [US2] Extend `src/lib/routing.ts` counterpart resolution with detail-page fallback:
      when no `translationKey` match exists in the target locale, resolve to that section's list
      page instead (depends on T012)
- [X] T033 [US2] Wire an active-locale indicator into the LanguageSwitcher/Header (highlight the
      current language) in `src/components/molecules/LanguageSwitcher.astro` (depends on T015,
      T017)
- [X] T034 [US2] [P] Unit test `src/lib/routing.ts` counterpart resolution, including the
      missing-translation fallback case, in `tests/unit/routing.test.ts` (depends on T032)
- [X] T035 [US2] [P] Playwright e2e test: on the Home page, switching FR↔EN keeps the visitor on
      Home in the target language and the selector shows the active language, in
      `tests/playwright/e2e/language-switch.spec.ts`

**Checkpoint**: Language-switch mechanism verified; each later page story extends coverage to its
own page.

---

## Phase 5: User Story 3 - Download the CV in the right language (Priority: P1)

**Goal**: The CV download control offers the PDF matching the currently selected site language,
from any page.

**Independent Test**: Locate the CV download control in each language and verify it downloads the
PDF matching the active locale.

- [X] T036 [US3] Wire real CV asset paths and add a build-time existence check for both locale
      PDFs in `scripts/check-cv-assets.mjs`, run from `npm run build` (depends on T016, T021)
- [X] T037 [US3] [P] Unit test that CvDownloadButton resolves `/cv/cv-fr.pdf` and
      `/cv/cv-en.pdf` correctly per locale in `tests/unit/cv-download.test.ts`
- [X] T038 [US3] [P] Playwright e2e test: the CV download control (reachable from Home) offers
      the French PDF when locale is FR and the English PDF when locale is EN, in
      `tests/playwright/e2e/cv-download.spec.ts`

**Checkpoint**: Full P1 slice complete — Home + language switch + CV download (MVP).

---

## Phase 6: User Story 4 - Browse and filter Projects (Priority: P2)

**Goal**: Projects page lists projects as cards and lets visitors filter by category.

**Independent Test**: Load the Projects page, verify card content and links, apply a category
filter, and verify only matching projects remain.

- [X] T039 [P] [US4] Add Projects-page i18n keys (filter "all" label, empty-state message) to
      `src/i18n/fr.json` and `src/i18n/en.json`
- [X] T040 [P] [US4] Create the ProjectCard molecule in
      `src/components/molecules/ProjectCard.astro` (title, short description, technologies tags,
      external link) consuming a `projects` collection entry per
      [contracts/content-collections.md](./contracts/content-collections.md)
- [X] T041 [P] [US4] Create the CategoryFilter molecule (client-side, single-select) in
      `src/components/molecules/CategoryFilter.astro`
- [X] T042 [US4] Create the ProjectsGrid organism in
      `src/components/organisms/ProjectsGrid.astro` combining CategoryFilter (T041) and
      ProjectCard (T040) list, with an empty-result state
- [X] T043 [US4] Assemble the Projects page in `src/pages/[lang]/projects/index.astro`, reading
      the `projects` collection (T011) filtered by current locale into ProjectsGrid (T042)
- [X] T044 [US4] [P] Unit test category-filter narrow/clear logic in
      `tests/unit/project-filter.test.ts`
- [X] T045 [US4] [P] Playwright e2e test: Projects page renders cards, filtering narrows results,
      clearing restores the full list, a no-match filter shows the empty state, and language
      switch keeps the visitor on the Projects list, in
      `tests/playwright/e2e/projects.spec.ts`
- [X] T046 [US4] [P] Playwright visual regression test for the Projects page (FR and EN) in
      `tests/playwright/visual/projects.spec.ts`

**Checkpoint**: Projects browsing and filtering functional and independently testable.

---

## Phase 7: User Story 5 - Explore Leadership experiences (Priority: P2)

**Goal**: Leadership page presents the four named mentoring/leadership experiences with a
human-impact focus.

**Independent Test**: Load the Leadership page and verify all four named experiences are present
with impact-focused descriptions.

- [X] T047 [P] [US5] Add Leadership-page i18n keys (heading, intro copy) to `src/i18n/fr.json`
      and `src/i18n/en.json`
- [X] T048 [P] [US5] Create the LeadershipCard molecule in
      `src/components/molecules/LeadershipCard.astro` (organization, role, impact narrative,
      period) consuming a `leadership` collection entry
- [X] T049 [US5] Create the LeadershipList organism in
      `src/components/organisms/LeadershipList.astro` rendering LeadershipCard (T048) entries
- [X] T050 [US5] Assemble the Leadership page in `src/pages/[lang]/leadership/index.astro`,
      reading the `leadership` collection (T011) filtered by current locale into LeadershipList
      (T049)
- [X] T051 [US5] [P] Playwright e2e test: Leadership page shows all four named entries (YALI RLC
      SA, Fablab EnR-out, Technovation Girls, STEM for Good) with non-empty impact text, and
      language switch keeps the visitor on the Leadership list, in
      `tests/playwright/e2e/leadership.spec.ts`
- [X] T052 [US5] [P] Playwright visual regression test for the Leadership page (FR and EN) in
      `tests/playwright/visual/leadership.spec.ts`

**Checkpoint**: Leadership page functional and independently testable.

---

## Phase 8: User Story 6 - Read Blog articles (Priority: P3)

**Goal**: Blog list shows articles with title/date/summary/tags; each article opens on its own
page with full content.

**Independent Test**: Load the Blog page, verify list entries, open one article, and confirm it
renders at its own page.

- [X] T053 [P] [US6] Add Blog-page i18n keys (heading, empty-state message, "read more" label) to
      `src/i18n/fr.json` and `src/i18n/en.json`
- [X] T054 [P] [US6] Create the BlogCard molecule in `src/components/molecules/BlogCard.astro`
      (title, date, summary, tags) consuming a `blog` collection entry
- [X] T055 [US6] Create the BlogList organism in `src/components/organisms/BlogList.astro`
      rendering BlogCard (T054) entries sorted by date descending, with an empty-state message
- [X] T056 [US6] Assemble the Blog list page in `src/pages/[lang]/blog/index.astro`, reading the
      `blog` collection (T011) filtered by current locale into BlogList (T055)
- [X] T057 [US6] Create the Blog article template in
      `src/components/templates/BlogArticleLayout.astro` (title, date, tags, rendered Markdown
      body)
- [X] T058 [US6] Assemble the Blog article page in `src/pages/[lang]/blog/[slug].astro` with
      `getStaticPaths()` over the `blog` collection per locale, using BlogArticleLayout (T057)
      and `routing.ts` (T032) for the translation-fallback link (depends on T032, T057)
- [X] T059 [US6] [P] Unit test blog-list date-sort and empty-state logic in
      `tests/unit/blog-list.test.ts`
- [X] T060 [US6] [P] Playwright e2e test: Blog list shows title/date/summary/tags, opening an
      article reaches its own page with full content, and language switch on both list and
      article follows the fallback rule, in `tests/playwright/e2e/blog.spec.ts`
- [X] T061 [US6] [P] Playwright visual regression test for the Blog list and an article page (FR
      and EN) in `tests/playwright/visual/blog.spec.ts`

**Checkpoint**: All six user stories independently functional.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Automated quality gates, CI/CD, and real content — improvements that affect the
whole site rather than one story

- [X] T062 [P] Implement the content-lint script (`translationKey` FR/EN coverage per collection,
      category-value consistency, i18n dictionary key parity) in `scripts/lint-content.mjs`,
      wired to `npm run lint:content` per [quickstart.md](./quickstart.md)
- [X] T063 [P] Add an `@axe-core/playwright` accessibility scan across all pages × locales,
      asserting zero critical/serious violations, in
      `tests/playwright/e2e/accessibility.spec.ts` per [research.md](./research.md) §6
- [X] T064 [P] Configure Lighthouse CI (`lighthouserc.cjs`) asserting
      Performance/Accessibility/SEO ≥ 90 on every page against the built static output
- [X] T065 Configure the GitHub Actions workflow in `.github/workflows/ci.yml` with jobs
      `lint` → `typecheck` → `unit-tests` → `build` → `e2e-and-visual-tests` →
      `lighthouse-ci` → `deploy` (GitHub Pages), deploy gated on all prior jobs succeeding,
      triggered on merge to the default branch
- [X] T066 [P] Author real Home content (professional photo, hero copy, facet summaries, timeline
      entries), replacing placeholders in `src/i18n/fr.json`, `src/i18n/en.json`,
      `src/data/facets.ts`, `src/data/timeline.ts`, and `public/images/profile.jpg`
- [X] T067 [P] Author 2-3 real Project entries with shared `translationKey` values in
      `src/content/fr/projects/*.md` and `src/content/en/projects/*.md`
- [X] T068 [P] Author 1-2 real Blog articles with shared `translationKey` values in
      `src/content/fr/blog/*.md` and `src/content/en/blog/*.md`
- [X] T069 [P] Author the 4 real Leadership entries (YALI RLC SA, Fablab EnR-out, Technovation
      Girls, STEM for Good) with shared `translationKey` values in
      `src/content/fr/leadership/*.md` and `src/content/en/leadership/*.md`
- [ ] T070 [P] Replace the placeholder CV PDFs with the real French and English CVs in
      `public/cv/cv-fr.pdf` and `public/cv/cv-en.pdf` — `cv-fr.pdf` replaced with the real French
      CV; `cv-en.pdf` still a placeholder, pending an up-to-date English CV from the user
- [X] T071 Run the full [quickstart.md](./quickstart.md) validation sequence locally and fix any
      failures before the first deploy

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–8)**: All depend on Foundational completion
  - US1 (Home) has no dependency on other stories
  - US2 (Language switch) depends on US1 only for its e2e test target (Home must exist); its own
    library work (T032–T034) only depends on Foundational
  - US3 (CV download) depends on Foundational only (CvDownloadButton already exists from T016);
    independent of US1/US2
  - US4 (Projects), US5 (Leadership), US6 (Blog) each depend on Foundational only and are
    independent of each other and of US1–US3
- **Polish (Phase 9)**: Depends on all six user stories being complete (content-lint and CI
  validate every collection; content-authoring tasks fill every collection)

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependencies on other stories
- **US2 (P1)**: Can start after Foundational; its Playwright test (T035) exercises the Home page
  built in US1, so run T031 (US1) before T035 (US2) if executing strictly in sequence
- **US3 (P1)**: Can start after Foundational — independent of US1/US2
- **US4 (P2)**: Can start after Foundational — independent of US1/US2/US3
- **US5 (P2)**: Can start after Foundational — independent of all other stories
- **US6 (P3)**: Can start after Foundational — independent of all other stories

### Within Each User Story

- Data/content-schema tasks before component tasks
- Molecules before organisms before page assembly
- Page assembly before its own tests
- Unit tests and Playwright tests can run in parallel with each other once the page they cover is
  assembled

### Parallel Opportunities

- All Setup tasks marked [P] (T002–T006) can run in parallel after T001
- Within Foundational, T008, T010, T014, T015, T016, T018, T021 are marked [P] and can run in
  parallel once their own listed dependencies are done
- Once Foundational (Phase 2) completes, **US1, US3, US4, US5, US6 can all start in parallel**
  (different files, no cross-story dependency); US2's library work (T032–T034) can also start in
  parallel, with only its Playwright test (T035) waiting on US1's Home page
- All content-authoring tasks in Polish (T066–T070) are marked [P] and can run in parallel

---

## Parallel Example: User Story 1 (Home)

```bash
# Launch data + i18n + component tasks for User Story 1 together:
Task: "Define fixed Profile Facet data in src/data/facets.ts"
Task: "Define Home-page timeline milestone data in src/data/timeline.ts"
Task: "Add Home-page i18n keys to src/i18n/fr.json and src/i18n/en.json"
Task: "Create the Hero organism in src/components/organisms/Hero.astro"
Task: "Create the FacetCard molecule in src/components/molecules/FacetCard.astro"
```

---

## Implementation Strategy

### MVP First (User Stories 1–3, all P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: US1 (Home)
4. Complete Phase 4: US2 (Language switch)
5. Complete Phase 5: US3 (CV download)
6. **STOP and VALIDATE**: run `tests/playwright/e2e/home.spec.ts`,
   `language-switch.spec.ts`, `cv-download.spec.ts` — this is the smallest deployable,
   demoable slice (identity + bilingual + CV)
7. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 + US2 + US3 → MVP (Home, language switch, CV download) → deploy/demo
3. Add US4 (Projects) → test independently → deploy/demo
4. Add US5 (Leadership) → test independently → deploy/demo
5. Add US6 (Blog) → test independently → deploy/demo
6. Polish (Phase 9): content-lint, accessibility scan, Lighthouse CI, GitHub Actions, real content
   → first production-ready deploy

### Parallel Team Strategy

With multiple developers, once Foundational is done:

- Developer A: US1 (Home) then US2 (Language switch)
- Developer B: US3 (CV download) then US4 (Projects)
- Developer C: US5 (Leadership) then US6 (Blog)
- Any developer: Polish tasks (T062–T065 tooling/CI) as soon as at least one story's pages exist
  to validate against; content-authoring tasks (T066–T070) once their respective story is done

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps a task to its user story for traceability
- Verify Playwright/unit tests fail before the corresponding implementation task, if practicing
  TDD — tests are listed after implementation tasks here for readability, but can be written
  first
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
- `leadership` was added as a third Content Collection (alongside `projects` and `blog`) per
  [research.md](./research.md) §2, even though the user's stack description only named
  `projects`/`blog` collections explicitly — needed to satisfy spec FR-016/FR-017 without a
  code change per future Leadership entry
