# Quickstart: Bilingual Personal Portfolio

**Feature**: Bilingual Personal Portfolio
**Date**: 2026-07-19

## Purpose

This document provides runnable validation scenarios that prove the feature works end-to-end. It references the data model and contracts for detailed specifications.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm installed
- Git installed
- CV PDF files (`cv-fr.pdf`, `cv-en.pdf`) available
- Professional photo (`profile.jpg`) available

## Setup

```bash
# Clone repository (if not already done)
git clone <repository-url>
cd portfolio-Gonz

# Install dependencies
npm install

# Copy assets to public directory
mkdir -p public/cv public/photo
cp /path/to/cv-fr.pdf public/cv/
cp /path/to/cv-en.pdf public/cv/
cp /path/to/profile.jpg public/photo/

# Create initial content (see data-model.md for schemas)
# Add sample projects, blog articles, and leadership experiences
# to /src/content/fr/ and /src/content/en/
```

## Validation Scenarios

### Scenario 1: Language Switching Preserves Page

**Steps**:
1. Run `npm run dev`
2. Open `http://localhost:4321/fr/`
3. Click the language selector and switch to English
4. Verify URL changes to `/en/` and content is in English
5. Navigate to `/fr/projets/`
6. Switch to English
7. Verify URL changes to `/en/projects/` and content is in English

**Expected outcome**: Language switch completes within 200ms, page content updates, and URL reflects the new language prefix.

**References**: [data-model.md](data-model.md) for content structure, [contracts/content-collections.md](contracts/content-collections.md) for page routes.

---

### Scenario 2: Projects Page with Category Filtering

**Steps**:
1. Navigate to `/fr/projets/`
2. Verify all project cards are displayed with title, description, technologies, and external link
3. Select a category filter
4. Verify only projects in that category are displayed
5. Click an external link
6. Verify it opens in a new tab

**Expected outcome**: Project cards render correctly, filter updates within 300ms, external links open in new tabs.

**References**: [data-model.md](data-model.md) for Project entity, [contracts/content-collections.md](contracts/content-collections.md) for projects collection schema.

---

### Scenario 3: Blog Article Reading

**Steps**:
1. Navigate to `/fr/blog/`
2. Verify article list displays with title, date, summary, and tags
3. Click an article
4. Verify full content loads in French
5. Switch language to English
6. Verify the same article displays in English

**Expected outcome**: Article list and detail pages render correctly, language switching preserves article context.

**References**: [data-model.md](data-model.md) for BlogArticle entity, [contracts/content-collections.md](contracts/content-collections.md) for blog collection schema.

---

### Scenario 4: Leadership Page

**Steps**:
1. Navigate to `/fr/leadership/`
2. Verify all leadership experiences are listed
3. Verify each experience shows organization, role, description, and impact focus
4. Switch to English
5. Verify all content is available in English

**Expected outcome**: Leadership experiences display with human impact focus, bilingual content is complete.

**References**: [data-model.md](data-model.md) for LeadershipExperience entity, [contracts/content-collections.md](contracts/content-collections.md) for leadership collection schema.

---

### Scenario 5: CV Download

**Steps**:
1. From any page, click the CV download link
2. Select French
3. Verify `cv-fr.pdf` downloads
4. Select English
5. Verify `cv-en.pdf` downloads

**Expected outcome**: CV download completes within 2 seconds, correct language file is downloaded.

**References**: [contracts/content-collections.md](contracts/content-collections.md) for asset routes.

---

### Scenario 6: Home Page Profile Facets

**Steps**:
1. Navigate to `/fr/`
2. Verify professional photo is displayed
3. Verify three profile facets are shown: STEM Educator, AI Engineer/Developer, AI Vision Researcher
4. Verify each facet has a summary and link
5. Click each facet link
6. Verify navigation to the corresponding section

**Expected outcome**: Profile facets render correctly, links navigate to appropriate sections.

**References**: [data-model.md](data-model.md) for ProfileFacet entity.

---

### Scenario 7: Performance & Accessibility

**Steps**:
1. Run `npm run build`
2. Run `npm run preview`
3. Open Chrome DevTools and run Lighthouse audit on all pages
4. Verify performance score ≥ 90
5. Verify accessibility score ≥ 90 (WCAG 2.1 AA)
6. Run `npm run test:a11y` (axe-core tests)
7. Verify all accessibility tests pass

**Expected outcome**: All pages meet Lighthouse ≥ 90 and WCAG 2.1 AA standards.

**References**: [plan.md](../plan.md) for performance budgets, [.specify/memory/constitution.md](../.specify/memory/constitution.md) for constitution requirements.

---

## Test Commands

```bash
# Unit tests
npm run test

# Component tests
npm run test:components

# E2E tests
npm run test:e2e

# Visual regression tests
npm run test:visual

# Accessibility tests
npm run test:a11y

# Lighthouse CI
npm run test:lighthouse

# Lint
npm run lint

# Type check
npm run typecheck

# Build
npm run build
```

## CI Pipeline

The GitHub Actions workflow runs the following checks on every PR:
1. Lint (`npm run lint`)
2. Type check (`npm run typecheck`)
3. Unit tests (`npm run test`)
4. Build (`npm run build`)
5. Lighthouse CI (`npm run test:lighthouse`)
6. Deploy to GitHub Pages (on merge to main)

## Notes

- This quickstart focuses on validation, not implementation details.
- Implementation code belongs in `tasks.md` and the implementation phase.
- Content creation follows the process in [.specify/memory/constitution.md](../.specify/memory/constitution.md).
