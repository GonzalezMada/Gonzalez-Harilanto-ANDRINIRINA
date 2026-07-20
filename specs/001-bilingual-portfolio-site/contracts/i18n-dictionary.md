# Contract: i18n UI Dictionary

Contract between the two locale dictionaries (`src/i18n/fr.json`, `src/i18n/en.json`) and the
components that consume UI strings (navigation, buttons, empty states, filter labels, language
selector itself, etc.) — distinct from the per-content Markdown covered in
[content-collections.md](./content-collections.md).

## Location

- `src/i18n/fr.json`
- `src/i18n/en.json`
- A shared TypeScript type (e.g., `src/i18n/schema.ts`) describing the required key shape, used to
  type-check both JSON files against the same structure.

## Shape (illustrative — exact keys finalized during implementation)

```json
{
  "nav": {
    "home": "Accueil",
    "projects": "Projets",
    "blog": "Blog",
    "leadership": "Leadership",
    "downloadCv": "Télécharger le CV"
  },
  "home": {
    "facets": {
      "stemEducator": { "label": "…", "summary": "…" },
      "aiEngineer": { "label": "…", "summary": "…" },
      "cvResearcher": { "label": "…", "summary": "…" }
    }
  },
  "projects": {
    "filterAll": "Tous",
    "emptyState": "Aucun projet ne correspond à ce filtre."
  },
  "blog": {
    "emptyState": "Aucun article pour le moment."
  },
  "leadership": {
    "heading": "…"
  },
  "languageSwitcher": {
    "label": "Langue"
  }
}
```

## Guarantee (spec FR-018 — content parity)

- Both `fr.json` and `en.json` MUST satisfy the same TypeScript key shape — a key present in one
  locale and missing in the other is a **type error at build time**, not a runtime fallback to the
  wrong language or a blank string.
- No key may resolve to an empty string in either locale (checked by the same content-lint step
  referenced in [content-collections.md](./content-collections.md)).

## Consumer usage contract

- Components MUST read UI strings only through the typed dictionary accessor (e.g., a `t(key)`
  helper scoped to the current `lang` route param) — no inline hardcoded UI copy in component
  markup, so every UI string is guaranteed to exist in both locales by construction.
