# Data Model: Bilingual Personal Portfolio

**Feature**: Bilingual Personal Portfolio
**Date**: 2026-07-19

## Entities

### Project

Represents a portfolio project displayed on the Projects page.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (slug) |
| title | string | Project title |
| description | string | Short description for card display |
| content | string | Full project description (Markdown) |
| technologies | string[] | Array of technology names |
| category | string | Project category for filtering |
| externalLink | string | URL to external project/demo |
| image | string | Optional project image path |
| date | Date | Project date or publication date |

**Validation rules**:
- `title` is required and non-empty
- `description` is required and non-empty
- `technologies` is required and must contain at least one item
- `category` is required and non-empty
- `externalLink` is required and must be a valid URL

**State transitions**: N/A (content entity)

---

### Blog Article

Represents a blog post displayed on the Blog page.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (slug) |
| title | string | Article title |
| date | Date | Publication date |
| summary | string | Short summary for list view |
| content | string | Full article content (Markdown) |
| tags | string[] | Array of tags |
| image | string | Optional featured image path |

**Validation rules**:
- `title` is required and non-empty
- `date` is required and must be a valid date
- `summary` is required and non-empty
- `content` is required and non-empty
- `tags` is optional but must be an array of strings if provided

**State transitions**: N/A (content entity)

---

### Leadership Experience

Represents a leadership or mentoring experience displayed on the Leadership page.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (slug) |
| organization | string | Organization name |
| role | string | Role or position title |
| description | string | Description of responsibilities and impact |
| startDate | Date | Start date |
| endDate | Date | End date (or null for current) |
| impact | string | Focus on human impact metrics/outcomes |
| image | string | Optional organization logo or photo |

**Validation rules**:
- `organization` is required and non-empty
- `role` is required and non-empty
- `description` is required and non-empty
- `startDate` is required and must be a valid date
- `endDate` is optional but must be a valid date if provided
- `impact` is required and non-empty

**State transitions**: N/A (content entity)

---

### Profile Facet

Represents one of the three profile facets on the Home page.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Facet title (e.g., "STEM Educator") |
| summary | string | Short summary of this facet |
| linkTarget | string | Target section or page slug |
| icon | string | Optional icon name or path |

**Validation rules**:
- `title` is required and non-empty
- `summary` is required and non-empty
- `linkTarget` is required and non-empty

**State transitions**: N/A (configuration entity)

---

### CV

Represents a CV PDF file available for download.

| Field | Type | Description |
|-------|------|-------------|
| language | string | Language code (`fr` or `en`) |
| filePath | string | Path to PDF file in `/public/cv/` |
| fileName | string | Display name for download |
| updatedAt | Date | Last update date |

**Validation rules**:
- `language` must be either `fr` or `en`
- `filePath` is required and must point to an existing PDF
- `fileName` is required and non-empty

**State transitions**: N/A (asset entity)

---

## Relationships

```
Project --(1:N)--> Category
Blog Article --(N:M)--> Tag
Leadership Experience --(1:1)--> Organization
Profile Facet --(1:1)--> Link Target
CV --(1:1)--> Language
```

## Content Collection Schemas

### projects (Astro Content Collection)

```typescript
{
  id: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  category: string;
  externalLink: string;
  image?: string;
  date: Date;
}
```

### blog (Astro Content Collection)

```typescript
{
  id: string;
  title: string;
  date: Date;
  summary: string;
  content: string;
  tags: string[];
  image?: string;
}
```

### leadership (Astro Content Collection)

```typescript
{
  id: string;
  organization: string;
  role: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  impact: string;
  image?: string;
}
```

## i18n Strategy

- Content collections are duplicated per language: `/src/content/fr/projects/`, `/src/content/en/projects/`
- Each content item has the same `id` across languages for pairing
- UI labels are stored in `/src/i18n/fr.json` and `/src/i18n/en.json`
- Language is determined by URL prefix (`/fr/` or `/en/`)
- Fallback to French if translation is missing
