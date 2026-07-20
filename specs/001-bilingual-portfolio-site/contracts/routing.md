# Contract: Page Routing & Language-Switch Links

Contract describing the URL structure every page must produce and the counterpart-link behavior
required by spec FR-003. This is the "UI contract" for a static site with no external API surface.

## URL structure

| Page | Route pattern | Example (FR) | Example (EN) |
|---|---|---|---|
| Home | `/{lang}/` | `/fr/` | `/en/` |
| Projects list | `/{lang}/projects/` | `/fr/projects/` | `/en/projects/` |
| Blog list | `/{lang}/blog/` | `/fr/blog/` | `/en/blog/` |
| Blog article | `/{lang}/blog/{slug}/` | `/fr/blog/mon-article/` | `/en/blog/my-article/` |
| Leadership | `/{lang}/leadership/` | `/fr/leadership/` | `/en/leadership/` |
| Root redirect | `/` | → `/fr/` (see data-model.md / research.md default-locale note) | — |

`{lang}` is restricted to exactly `fr` \| `en`; any other value 404s. `{slug}` is the Blog
article's own slug (independent per locale — FR and EN slugs for the same article are not required
to match textually, only to share a `translationKey`).

## Language-switch counterpart resolution (spec FR-003)

Given the current route and, for detail pages, the current entry's `translationKey`:

1. **List pages** (Home, Projects, Blog, Leadership): counterpart path is the same route pattern
   with `{lang}` swapped. Always resolvable — these pages always exist in both locales.
2. **Blog article detail**: look up the `blog` collection entry in the target locale whose
   `translationKey` matches the current entry's `translationKey`.
   - **If found**: counterpart path is that entry's own route (`/{targetLang}/blog/{itsSlug}/`).
   - **If not found** (per spec Edge Cases — translation not yet published): counterpart path
     falls back to `/{targetLang}/blog/` (the list page), and the language selector MUST indicate
     this is a fallback (e.g., no silent mismatch — implementation detail deferred to tasks, but
     the fallback-not-silent requirement is part of this contract).

## Language selector contract

- Rendered on every page (spec FR-002).
- Exposes exactly two options: `FR`, `EN`.
- Indicates which is currently active.
- Each option's link target is the counterpart path computed per the rules above — never a
  hardcoded `/{lang}/` root link (that would violate FR-003).

## Persistent navigation contract (spec FR-019)

- Every page exposes navigation links to Projects, Blog, and Leadership (and Home), all within the
  current `{lang}`.
- The CV download control (spec FR-009) is reachable from this same persistent navigation, not
  buried on a single page.
