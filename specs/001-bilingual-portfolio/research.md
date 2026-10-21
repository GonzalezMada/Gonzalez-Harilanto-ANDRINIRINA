# Research: Bilingual Personal Portfolio

**Feature**: Bilingual Personal Portfolio
**Date**: 2026-07-19

## Research Tasks

### 1. Astro Content Collections for i18n

**Decision**: Use Astro Content Collections with separate `fr` and `en` folders under `/src/content/`.

**Rationale**: Astro Content Collections provide type-safe content management with built-in Markdown processing. Separate language folders enable clean separation of content while sharing the same collection schemas. This aligns with the constitution's Content-Driven Architecture principle.

**Alternatives considered**:
- Single collection with `lang` field: Rejected because it mixes languages in one folder, making content management harder for non-technical users.
- External CMS: Rejected because it violates the principle of content being stored as Markdown files in the repository.

### 2. Astro i18n Routing

**Decision**: Use Astro's built-in i18n routing with `prefixDefaultLocale: false` and `fallbackType: "redirect"`.

**Rationale**: Astro's i18n routing provides automatic language detection, prefix-based URLs (`/fr/`, `/en/`), and fallback handling. This satisfies the requirement for a language selector that preserves the current page.

**Alternatives considered**:
- Manual routing with dynamic segments: Rejected because it requires more boilerplate and loses Astro's built-in i18n features.
- Query parameter-based language (`?lang=fr`): Rejected because it's less SEO-friendly and doesn't preserve clean URLs.

### 3. Tailwind CSS Design Tokens

**Decision**: Define design tokens in `tailwind.config.mjs` using CSS variables for colors, typography, and spacing.

**Rationale**: Tailwind CSS supports CSS variables for design tokens, enabling centralized configuration that propagates to all components. This satisfies the constitution's Design Consistency principle.

**Alternatives considered**:
- CSS-in-JS (styled-components): Rejected because it adds runtime overhead and complexity.
- Plain CSS with custom properties: Rejected because it loses Tailwind's utility-first benefits.

### 4. Playwright Visual Regression Testing

**Decision**: Use Playwright with `@playwright/test` and `@playwright/visual-regression` for visual regression testing.

**Rationale**: Playwright provides cross-browser visual regression testing with built-in screenshot comparison. It integrates well with Astro's dev server and CI pipelines.

**Alternatives considered**:
- Chromatic: Rejected because it's a paid service and adds external dependency.
- Percy: Rejected for similar reasons as Chromatic.

### 5. Lighthouse CI Configuration

**Decision**: Use `@lhci/cli` with GitHub Actions, running on every PR and deploy.

**Rationale**: Lighthouse CI integrates seamlessly with GitHub Actions and can enforce performance budgets. It provides detailed reports and can block merges if scores fall below thresholds.

**Alternatives considered**:
- Manual Lighthouse runs: Rejected because it's error-prone and doesn't scale.
- WebPageTest: Rejected because it's slower and less integrated with CI.

### 6. Missing Translations Handling

**Decision**: Implement graceful fallback to default language (French) when a translation is missing.

**Rationale**: This ensures the site remains functional even if some content hasn't been translated yet. It satisfies the edge case of missing translations while maintaining a good user experience.

**Alternatives considered**:
- Block rendering until all translations exist: Rejected because it would make the site fragile.
- Show placeholder text: Rejected because it degrades user experience.

### 7. JavaScript Disabled Behavior

**Decision**: Use Astro's SSR/SSG capabilities to render pages server-side, ensuring content is visible without JavaScript.

**Rationale**: Astro's default zero-JS approach means the site works without JavaScript. Language switching can use progressive enhancement with `<form>` submission as a fallback.

**Alternatives considered**:
- Client-side only rendering: Rejected because it violates accessibility and performance principles.
- Static HTML with JS enhancement: Already the default Astro behavior.

## Unresolved Items

All unknowns from the Technical Context have been resolved. No remaining NEEDS CLARIFICATION items.
