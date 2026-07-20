# Contract: Content Collection Schemas

This is the contract between **content authors** (adding/editing Markdown files) and the
**rendering layer** (Astro components consuming collection entries). It is what makes Principle II
("Content as Data") safe: an author can add a file without touching code, and a malformed file
fails the build instead of shipping broken content.

## Location

- Schema definitions: `src/content/config.ts`
- Content files: `src/content/{fr,en}/{projects,blog,leadership}/*.md`

## `projects` collection

Frontmatter shape (see [data-model.md](../data-model.md) for field-level rules):

```yaml
---
title: string          # required, non-empty
description: string    # required, non-empty
technologies: string[] # required, non-empty
externalLink: string   # required, valid URL
category: string       # required, non-empty
translationKey: string # required, matches the FR/EN counterpart entry
order: number           # optional
---
Markdown body is not required for Projects (card-based display); if present it is not rendered
on the Projects list page.
```

**Consumer guarantee**: Any component that reads a `projects` entry can rely on `title`,
`description`, `technologies`, `externalLink`, `category`, and `translationKey` always being
present and non-empty — the Zod schema rejects the build otherwise.

## `blog` collection

```yaml
---
title: string           # required, non-empty
date: date               # required, ISO 8601
summary: string          # required, non-empty
tags: string[]            # required, non-empty
translationKey: string    # required, matches the FR/EN counterpart entry
---
Markdown body IS required and is rendered as the full article on its detail page.
```

**Consumer guarantee**: `title`, `date`, `summary`, `tags`, `translationKey`, and a non-empty
rendered body are always present.

## `leadership` collection

```yaml
---
organization: string    # required, non-empty
role: string              # required, non-empty
impact: string             # required, minimum length enforced (substantive, not a placeholder)
period: string              # optional, free text
translationKey: string       # required, matches the FR/EN counterpart entry
---
Markdown body is optional (extended narrative beyond the `impact` field).
```

**Consumer guarantee**: `organization`, `role`, `impact`, `translationKey` are always present;
`impact` is guaranteed non-trivial length (see data-model.md validation rule) so the Leadership
page can rely on it to satisfy spec FR-017 without additional runtime checks.

## Build-time enforcement

- Malformed/missing required frontmatter field → **build fails** (Zod schema violation reported
  with file path).
- Cross-entry rules that Zod cannot express alone (FR/EN parity by `translationKey`, category
  consistency across locales) → enforced by a separate content-lint script run in CI (see
  [quickstart.md](../quickstart.md)), not by the schema.
