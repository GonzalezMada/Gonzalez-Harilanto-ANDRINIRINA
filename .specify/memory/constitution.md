<!--
Sync Impact Report
==================
Version change: (none, template) → 1.0.0
Rationale: Initial ratification of the project constitution — first concrete
set of governing principles for this repository (previously template
placeholders only). Treated as MINOR→MAJOR baseline per semver-for-governance
convention: initial adoption of a complete principle set is versioned 1.0.0.

Modified principles: N/A (first fill of template placeholders)

Added sections:
- Core Principles I–VI (Bilingual Content Parity, Content as Data, Performance
  & Core Web Vitals, Accessibility, Type Safety & Testing Discipline, Cohesive
  Professional Design Identity)
- Deployment & Delivery
- Development Workflow & Quality Gates
- Governance

Removed sections: none (template placeholders only)

Templates requiring updates:
- .specify/templates/plan-template.md → ✅ no change needed (Constitution
  Check section is generic and reads gates dynamically from this file)
- .specify/templates/spec-template.md → ✅ no change needed (no
  principle-specific placeholders)
- .specify/templates/tasks-template.md → ✅ no change needed (task
  categorization is generic; principle-driven task types — i18n parity,
  a11y, Lighthouse, typecheck/test — are added per-feature by /speckit-tasks)
- .claude/skills/speckit-*/SKILL.md → ✅ reviewed, no edits needed (vendored,
  generic command definitions; no project-specific or CLAUDE-only references
  found)

Follow-up TODOs: none
-->

# Portfolio Gonzalez Harilanto ANDRINIRINA Constitution

## Core Principles

### I. Bilingual Content Parity (FR/EN)

The site MUST be available in French and English. Every page, project entry,
and blog post MUST exist in both languages with equivalent depth and
substance — a translated stub is not parity. Content MUST NOT ship in only
one language except during an explicitly flagged, time-boxed draft state.
Language switching MUST preserve the current page/route context (no
redirect-to-homepage on locale switch).

**Rationale**: The portfolio targets both French-speaking and international
(English-speaking) audiences (recruiters, researchers, collaborators); an
incomplete translation undermines credibility with either audience.

### II. Content as Data (No-Code Content Authoring)

Projects and blog posts MUST be authorable and editable via Markdown files
(with frontmatter for metadata), without modifying application code or
component logic. Adding, editing, or removing a project/post MUST NOT require
a code change, a rebuild of components, or a schema migration for the common
case. Content structure changes (new frontmatter fields, new content types)
MAY require code changes, but routine content updates MUST NOT.

**Rationale**: Keeps the content pipeline sustainable long-term and lets
non-engineering updates (new project, new post) happen without touching
TypeScript/component code.

### III. Performance & Core Web Vitals

Every shipped page MUST achieve a Lighthouse score ≥ 90 for Performance,
Accessibility, and SEO categories, measured in CI against production build
output. A pull request that regresses any page below this threshold MUST NOT
be merged without an explicit, documented exception and a remediation
follow-up.

**Rationale**: Performance is both a UX requirement and a proxy for
engineering discipline (image optimization, bundle size, render strategy);
regressions compound silently if not gated.

### IV. Accessibility (WCAG AA)

All pages and interactive components MUST meet WCAG 2.1 AA at minimum:
sufficient color contrast, keyboard navigability, semantic HTML/ARIA labeling,
visible focus states, and correct heading structure in both languages.
Accessibility is verified the same way for FR and EN content — parity applies
to accessibility, not just text.

**Rationale**: A portfolio aimed at a technical/research audience must be
usable by everyone, including via assistive technology; AA is the accepted
baseline for professional public sites.

### V. Type Safety & Testing Discipline

All application code MUST be written in TypeScript with `strict` mode
enabled — no new `any` escapes without justification in review. Components
MUST have unit tests covering their logic/behavior and visual
(snapshot/regression) tests covering their rendered appearance. A component
without both is not considered complete.

**Rationale**: Strict typing and dual-layer testing catch both logic
regressions and unintended visual drift, which matters most for a
design-forward, portfolio-grade UI where appearance IS the product.

### VI. Cohesive Professional Design Identity

The visual identity (color palette, typography, professional photo, spacing
and layout system, motion language) MUST be defined exactly once — as a
design system/tokens source of truth — and reused across every page and
component. No page may introduce ad hoc colors, fonts, or one-off layout
patterns outside that system. Design decisions (palette, typography, layout,
motion) MUST be informed by the `ui-ux-pro-max` skill to ensure a
professional, research/tech-appropriate result rather than a generic
template look.

**Rationale**: Consistency across FR/EN and across all pages is what makes
the portfolio read as a single professional identity rather than a stitched
together template; centralizing tokens is also what makes principle I
(bilingual parity) and III (performance) tractable to maintain.

## Deployment & Delivery

Deployment to production MUST be fully automated via GitHub Actions,
targeting GitHub Pages. Every merge to the default branch MUST trigger a
pipeline that, at minimum: type-checks (TypeScript strict), runs unit and
visual tests, builds the site, and runs a Lighthouse check per Principle III
before publishing. A failing pipeline MUST block deployment — no manual
override to push a red build to production.

## Development Workflow & Quality Gates

- Every pull request touching content MUST include both FR and EN versions
  of the change (Principle I), or be explicitly scoped and labeled as a
  language-specific fix.
- Every pull request touching UI MUST reference the shared design
  tokens/system (Principle VI) rather than introducing new ad hoc styles, and
  SHOULD note which `ui-ux-pro-max` guidance informed the decision when a new
  UI pattern is introduced.
- Every pull request touching components MUST include or update unit and
  visual tests (Principle V) and MUST pass `tsc --strict` with no new type
  errors.
- CI MUST run and pass (typecheck, tests, Lighthouse, accessibility checks)
  before a pull request is eligible to merge.

## Governance

This constitution supersedes ad hoc practices and prior undocumented
conventions for this project. All pull requests and reviews MUST verify
compliance with the Core Principles above; any deviation MUST be called out
explicitly in the PR description with a rationale and, where applicable, a
follow-up task.

Amendments to this constitution are made by editing this file directly and
MUST include an updated Sync Impact Report (as the HTML comment at the top of
this file) describing what changed and why. Versioning follows semantic
versioning applied to governance:

- **MAJOR**: Backward-incompatible principle removal or redefinition (e.g.,
  dropping bilingual parity, lowering the accessibility bar).
- **MINOR**: A new principle or materially expanded section is added.
- **PATCH**: Wording, clarification, or non-semantic fixes.

Complexity or deviation from these principles (e.g., a page shipped
English-only, a component without visual tests) MUST be justified in the
relevant plan's Complexity Tracking section and tracked to resolution — it
MUST NOT simply be left unaddressed.

**Version**: 1.0.0 | **Ratified**: 2026-07-20 | **Last Amended**: 2026-07-20
