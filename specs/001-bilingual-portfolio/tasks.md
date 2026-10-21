# Tasks: Bilingual Personal Portfolio

**Input**: Design documents from `/specs/001-bilingual-portfolio/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: MANDATORY per Constitution Principle IV (TypeScript Strict & Tested Components).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution Alignment**: Each phase MUST verify compliance with all five constitution principles.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume Astro project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Astro project with TypeScript and Tailwind CSS
- [ ] T002 [P] Configure TypeScript strict mode in `tsconfig.json`
- [ ] T003 [P] Configure Tailwind CSS with design tokens in `tailwind.config.mjs`
- [ ] T004 [P] Configure Astro content collections in `astro.config.mjs`
- [ ] T005 [P] Set up project directory structure per plan.md
- [ ] T006 [P] Configure linting (ESLint) and formatting (Prettier)
- [ ] T007 [P] Initialize Git repository and create `.gitignore`

**Checkpoint**: Project scaffolded with TypeScript, Tailwind, and Astro configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 [P] Create i18n routing configuration in `astro.config.mjs` (prefixDefaultLocale: false)
- [ ] T009 [P] Create UI label dictionaries in `src/i18n/fr.json` and `src/i18n/en.json`
- [ ] T010 [P] Create i18n utility functions in `src/utils/i18n.ts`
- [ ] T011 [P] Define content collection schemas in `src/content/config.ts`
- [ ] T012 [P] Create base layout component in `src/layouts/BaseLayout.astro`
- [ ] T013 [P] Create global CSS with Tailwind directives in `src/styles/global.css`
- [ ] T014 [P] Set up Vitest and Testing Library configuration
- [ ] T015 [P] Set up Playwright configuration for E2E and visual regression tests
- [ ] T016 [P] Create GitHub Actions workflow skeleton in `.github/workflows/ci.yml`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - First Visit & Language Selection + Profile Facets (Priority: P1) 🎯 MVP

**Goal**: Visitor lands on Home page, sees professional photo, three profile facets, and language selector. Can switch languages while preserving page state.

**Independent Test**: Navigate to home page, switch language from FR to EN, verify all content updates and URL/page state is preserved. Verify photo and three facets display with correct links.

### Tests for User Story 1

- [ ] T017 [P] [US1] Unit test for i18n utility functions in `tests/unit/utils/i18n.test.ts`
- [ ] T018 [P] [US1] Component test for LanguageSelector in `tests/unit/components/LanguageSelector.test.ts`
- [ ] T019 [P] [US1] Component test for ProfileFacet in `tests/unit/components/ProfileFacet.test.ts`

### Implementation for User Story 1

- [ ] T020 [P] [US1] Create Header component in `src/components/organisms/Header.astro`
- [ ] T021 [P] [US1] Create Footer component in `src/components/organisms/Footer.astro`
- [ ] T022 [P] [US1] Create LanguageSelector component in `src/components/molecules/LanguageSelector.astro`
- [ ] T023 [P] [US1] Create ProfileFacet component in `src/components/molecules/ProfileFacet.astro`
- [ ] T024 [US1] Create Home page layout in `src/layouts/HomeLayout.astro`
- [ ] T025 [US1] Create French Home page in `src/pages/fr/index.astro`
- [ ] T026 [US1] Create English Home page in `src/pages/en/index.astro`
- [ ] T027 [US1] Implement language switching logic with URL preservation
- [ ] T028 [US1] Add professional photo to `public/photo/profile.jpg` and display on Home page
- [ ] T029 [US1] Create three profile facets with summaries and links

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Explore Projects (Priority: P2)

**Goal**: Visitor navigates to Projects page, sees project cards with filtering by category.

**Independent Test**: Navigate to Projects page, verify cards display correctly, apply a category filter, verify only matching projects are shown.

### Tests for User Story 2

- [ ] T030 [P] [US2] Component test for ProjectCard in `tests/unit/components/ProjectCard.test.ts`
- [ ] T031 [P] [US2] Component test for ProjectFilter in `tests/unit/components/ProjectFilter.test.ts`

### Implementation for User Story 2

- [ ] T032 [P] [US2] Create ProjectCard component in `src/components/molecules/ProjectCard.astro`
- [ ] T033 [P] [US2] Create ProjectFilter component in `src/components/molecules/ProjectFilter.astro`
- [ ] T034 [P] [US2] Create ProjectsGrid component in `src/components/organisms/ProjectsGrid.astro`
- [ ] T035 [US2] Create projects Content Collection schema in `src/content/config.ts`
- [ ] T036 [US2] Create French Projects page in `src/pages/fr/projets.astro`
- [ ] T037 [US2] Create English Projects page in `src/pages/en/projects.astro`
- [ ] T038 [US2] Implement category filtering logic
- [ ] T039 [US2] Add sample project content in `src/content/fr/projects/` and `src/content/en/projects/`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Read Blog Articles (Priority: P2)

**Goal**: Visitor navigates to Blog page, sees article list, can read individual articles.

**Independent Test**: Navigate to Blog page, verify article list displays, click an article, verify full content loads and language is preserved.

### Tests for User Story 3

- [ ] T040 [P] [US3] Component test for BlogCard in `tests/unit/components/BlogCard.test.ts`
- [ ] T041 [P] [US3] Component test for BlogArticle in `tests/unit/components/BlogArticle.test.ts`

### Implementation for User Story 3

- [ ] T042 [P] [US3] Create BlogCard component in `src/components/molecules/BlogCard.astro`
- [ ] T043 [P] [US3] Create BlogArticle component in `src/components/molecules/BlogArticle.astro`
- [ ] T044 [P] [US3] Create BlogList component in `src/components/organisms/BlogList.astro`
- [ ] T045 [US3] Create blog Content Collection schema in `src/content/config.ts`
- [ ] T046 [US3] Create French Blog list page in `src/pages/fr/blog/index.astro`
- [ ] T047 [US3] Create English Blog list page in `src/pages/en/blog/index.astro`
- [ ] T048 [US3] Create French Blog article page in `src/pages/fr/blog/[slug].astro`
- [ ] T049 [US3] Create English Blog article page in `src/pages/en/blog/[slug].astro`
- [ ] T050 [US3] Add sample blog content in `src/content/fr/blog/` and `src/content/en/blog/`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - View Leadership Experience (Priority: P3)

**Goal**: Visitor navigates to Leadership page and sees mentoring experiences with human impact focus.

**Independent Test**: Navigate to Leadership page, verify all experiences are listed with descriptions and impact focus.

### Tests for User Story 4

- [ ] T051 [P] [US4] Component test for LeadershipCard in `tests/unit/components/LeadershipCard.test.ts`

### Implementation for User Story 4

- [ ] T052 [P] [US4] Create LeadershipCard component in `src/components/molecules/LeadershipCard.astro`
- [ ] T053 [P] [US4] Create LeadershipList component in `src/components/organisms/LeadershipList.astro`
- [ ] T054 [US4] Create leadership Content Collection schema in `src/content/config.ts`
- [ ] T055 [US4] Create French Leadership page in `src/pages/fr/leadership.astro`
- [ ] T056 [US4] Create English Leadership page in `src/pages/en/leadership.astro`
- [ ] T057 [US4] Add sample leadership content in `src/content/fr/leadership/` and `src/content/en/leadership/`

**Checkpoint**: User Story 4 should be fully functional and testable independently

---

## Phase 7: User Story 5 - Download CV (Priority: P3)

**Goal**: Visitor can download CV in French or English from any page.

**Independent Test**: From any page, click CV download, select language, verify PDF downloads correctly.

### Tests for User Story 5

- [ ] T058 [P] [US5] Component test for CVDownload in `tests/unit/components/CVDownload.test.ts`

### Implementation for User Story 5

- [ ] T059 [P] [US5] Create CVDownload component in `src/components/molecules/CVDownload.astro`
- [ ] T060 [US5] Add CV PDF files to `public/cv/cv-fr.pdf` and `public/cv/cv-en.pdf`
- [ ] T061 [US5] Integrate CVDownload into Header component
- [ ] T062 [US5] Add CV download links to all pages

**Checkpoint**: User Story 5 should be fully functional and testable independently

---

## Phase 8: Constitution Alignment & Cross-Cutting Concerns

**Purpose**: Verify all principles are satisfied and apply improvements that affect multiple user stories

### Constitution Compliance Check

- [ ] T063 [P] Verify Bilingual Content Parity (Principle I): FR/EN content exists and is equivalent
- [ ] T064 [P] Verify Content-Driven Architecture (Principle II): All content in Markdown, no code changes needed for content updates
- [ ] T065 [P] Verify Performance & Accessibility (Principle III): Lighthouse ≥ 90, WCAG 2.1 AA compliance
- [ ] T066 [P] Verify TypeScript Strict & Tested Components (Principle IV): strict mode enabled, tests pass, coverage ≥ 80%
- [ ] T067 [P] Verify Automated Deployment & Design Consistency (Principle V): GitHub Actions configured, design tokens centralized

### Cross-Cutting Improvements

- [ ] T068 [P] Write unit tests for i18n utilities in `tests/unit/utils/i18n.test.ts`
- [ ] T069 [P] Write unit tests for content collection utilities in `tests/unit/utils/content.test.ts`
- [ ] T070 [P] Write Playwright E2E test for navigation in `tests/e2e/navigation.spec.ts`
- [ ] T071 [P] Write Playwright visual regression test for Home page in `tests/e2e/visual/home.spec.ts`
- [ ] T072 [P] Write Playwright visual regression test for Projects page in `tests/e2e/visual/projects.spec.ts`
- [ ] T073 [P] Write Playwright visual regression test for Blog page in `tests/e2e/visual/blog.spec.ts`
- [ ] T074 [P] Write Playwright visual regression test for Leadership page in `tests/e2e/visual/leadership.spec.ts`
- [ ] T075 [P] Write Playwright test for CV download flow in `tests/e2e/cv-download.spec.ts`
- [ ] T076 [P] Write Playwright test for language switching in `tests/e2e/language-switch.spec.ts`
- [ ] T077 Configure GitHub Actions CI workflow in `.github/workflows/ci.yml`
- [ ] T078 Configure Lighthouse CI in GitHub Actions
- [ ] T079 Configure GitHub Pages deployment in GitHub Actions
- [ ] T080 Write initial content (2-3 projects, 1-2 blog articles) in FR and EN
- [ ] T081 Run quickstart.md validation scenarios
- [ ] T082 Performance optimization (image optimization, bundle analysis)
- [ ] T083 Accessibility audit and fixes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Integrates with Header from US1

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Components before pages
- Pages before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for i18n utility functions in tests/unit/utils/i18n.test.ts"
Task: "Component test for LanguageSelector in tests/unit/components/LanguageSelector.test.ts"
Task: "Component test for ProfileFacet in tests/unit/components/ProfileFacet.test.ts"

# Launch all components for User Story 1 together:
Task: "Create Header component in src/components/organisms/Header.astro"
Task: "Create Footer component in src/components/organisms/Footer.astro"
Task: "Create LanguageSelector component in src/components/molecules/LanguageSelector.astro"
Task: "Create ProfileFacet component in src/components/molecules/ProfileFacet.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (P1)
   - Developer B: User Story 2 (P2)
   - Developer C: User Story 3 (P2)
3. Stories complete and integrate independently
4. Then:
   - Developer A: User Story 4 (P3)
   - Developer B: User Story 5 (P3)
5. Finally: Team works on Phase 8 together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Constitution Compliance**: All tasks MUST satisfy the five core principles; violations require documentation in Complexity Tracking
