# Phase 1 Data Model: Bilingual Portfolio Site

Source: entities identified in [spec.md](./spec.md) Key Entities, refined with the content
mechanism chosen in [research.md](./research.md) (§2 Content modeling). All content-backed
entities are Astro Content Collection entries validated by a Zod schema at build time — an
invalid or missing required field fails the build rather than shipping broken content, which is
how Principle V (type safety) is enforced for content, not just code.

## Shared conventions

- Every content-backed entity carries a `translationKey: string` — a stable identifier shared by
  the FR entry and its EN counterpart, used to compute the "equivalent content" link required by
  spec FR-003 (language switch preserves context). Two entries in different language collections
  with the same `translationKey` are considered translations of each other.
- Every content-backed entity carries `lang: 'fr' | 'en'`, derived automatically from its
  collection directory (not hand-authored) to avoid drift.
- Dates are ISO 8601 (`YYYY-MM-DD`).

## Entities

### Project

Backed by content collections `content/fr/projects/*.md` and `content/en/projects/*.md`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Card/heading title |
| `description` | string | yes | Short description shown on the card (spec FR-010) |
| `technologies` | string[] | yes | Displayed as tags on the card |
| `externalLink` | string (URL) | yes | Outbound project link (spec FR-010) |
| `category` | string | yes | Drives the Projects filter (spec FR-011); content-driven, not a fixed enum (per spec Assumptions) |
| `translationKey` | string | yes | Links FR ↔ EN counterpart |
| `order` | number | no | Optional manual sort weight; defaults to publish/creation order |

**Validation rules**: `title`, `description` non-empty; `externalLink` must be a well-formed URL;
`technologies` non-empty array; `category` non-empty string.

**Relationships**: Many Projects share a `category` (used purely for filtering, not a separate
entity — no dedicated Category entity is needed since categories are just distinct string values
across Project entries).

### Blog Article

Backed by content collections `content/fr/blog/*.md` and `content/en/blog/*.md`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | List + detail page heading |
| `date` | date (ISO 8601) | yes | Publication date (spec FR-013) |
| `summary` | string | yes | Shown in the list (spec FR-013) |
| `tags` | string[] | yes | Shown in the list (spec FR-013) |
| `translationKey` | string | yes | Links FR ↔ EN counterpart |
| body | Markdown content | yes | Full article content, rendered on the article's own page (spec FR-014) |

**Validation rules**: `title`, `summary` non-empty; `date` valid ISO date; `tags` non-empty array.

**Relationships**: None beyond its own `translationKey` link.

### Leadership Experience

Backed by content collections `content/fr/leadership/*.md` and `content/en/leadership/*.md` (see
research.md §2 for why this is a Content Collection like Projects/Blog rather than hardcoded).

| Field | Type | Required | Notes |
|---|---|---|---|
| `organization` | string | yes | e.g., "YALI RLC SA", "Fablab EnR-out", "Technovation Girls", "STEM for Good" (spec FR-016) |
| `role` | string | yes | Role/title description |
| `period` | string | no | Free-text date range (e.g., "2023–2024"); not used for sorting-critical logic |
| `impact` | string | yes | Human-impact narrative, distinct from `role` (spec FR-017 requires this be present and substantive, not just a title) |
| `translationKey` | string | yes | Links FR ↔ EN counterpart |
| body | Markdown content | no | Optional extended narrative beyond the `impact` summary |

**Validation rules**: `organization`, `role`, `impact` non-empty. A content-lint rule (enforced by
Zod `min` length, not just presence) requires `impact` to be a substantive sentence (minimum
length threshold) so a placeholder one-word value can't silently satisfy FR-017.

**Relationships**: None. Exactly 4 entries are required at launch (YALI RLC SA, Fablab EnR-out,
Technovation Girls, STEM for Good per spec FR-016), but the collection itself is not capped —
more can be added later without a code change, consistent with Principle II.

### Profile Facet

**Not** a Content Collection — a small, fixed, structurally-tied-to-layout set (exactly 3 entries
per spec FR-005, each wired to a specific site section/route). Modeled as a typed literal array in
a single source-of-truth module (e.g., `src/data/facets.ts`) with per-locale label/summary pulled
from the i18n dictionary (research.md §3), so adding a 4th facet would be a deliberate structural
change — appropriately requiring a code touch, unlike Projects/Blog/Leadership which must stay
code-free to extend.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | `'stem-educator' \| 'ai-engineer' \| 'cv-researcher'` | yes | Fixed set (spec FR-005) |
| `labelKey` | string | yes | i18n dictionary key for the facet name |
| `summaryKey` | string | yes | i18n dictionary key for the short summary |
| `linkTarget` | route path | yes | Section/page this facet links to (spec FR-006) |

### CV Document

**Not** a Content Collection — a static binary asset per spec FR-007/FR-008, referenced by a
small typed lookup (`{ fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' }`) rather than content
frontmatter, since a PDF has no structured metadata to validate beyond "does the file exist for
this locale."

| Field | Type | Required | Notes |
|---|---|---|---|
| `lang` | `'fr' \| 'en'` | yes | Selects which file is offered (spec FR-008) |
| `filePath` | string (path under `public/`) | yes | e.g., `/cv/cv-fr.pdf` |

**Validation rule**: Build-time check (or CI asset-presence check) that both `cv-fr.pdf` and
`cv-en.pdf` exist under `public/cv/`, so a missing CV fails CI rather than 404ing for a recruiter
in production (supports spec Edge Case: CV temporarily unavailable → must communicate, not silently
fail — the build-time check prevents the most common cause of that state).

## i18n UI Dictionary

Not a "content entity" in the Projects/Blog/Leadership sense, but a data structure with its own
shape contract — see [contracts/i18n-dictionary.md](./contracts/i18n-dictionary.md).

## Cross-entity integrity rules

1. **Bilingual parity (spec FR-018)**: for every `translationKey` present in the `fr` side of a
   collection, a matching entry SHOULD exist in the `en` side of the same collection, and vice
   versa. This is enforced as a CI content-lint check (not a Zod schema rule, since Zod validates
   one entry at a time) — see [quickstart.md](./quickstart.md).
2. **Category consistency**: a `category` value used in an `fr` Project SHOULD have a corresponding
   `en` Project using an equivalent (translated) category value for the filter UI to present
   comparable filter options in both locales — checked by the same content-lint step.
