# Contracts: Content Collections & Page Routes

**Feature**: Bilingual Personal Portfolio
**Date**: 2026-07-19

## Content Collection Schemas

### projects

**Path**: `/src/content/{fr,en}/projects/*.md`

**Frontmatter schema**:

```yaml
---
id: string          # Unique slug (e.g., "my-awesome-project")
title: string       # Project title
description: string # Short description for card display
date: string        # ISO date (e.g., "2024-01-15")
technologies:       # Array of technology names
  - string
category: string    # Category for filtering (e.g., "AI", "Web", "Mobile")
externalLink: string # URL to external project/demo
image?: string      # Optional image path relative to /public
---
```

**Content body**: Markdown with full project description.

---

### blog

**Path**: `/src/content/{fr,en}/blog/*.md`

**Frontmatter schema**:

```yaml
---
id: string       # Unique slug (e.g., "my-first-post")
title: string    # Article title
date: string     # ISO date (e.g., "2024-01-15")
summary: string  # Short summary for list view
tags:            # Array of tags
  - string
image?: string   # Optional featured image path relative to /public
---
```

**Content body**: Markdown with full article content.

---

### leadership

**Path**: `/src/content/{fr,en}/leadership/*.md`

**Frontmatter schema**:

```yaml
---
id: string          # Unique slug (e.g., "yali-rlc-sa")
organization: string # Organization name
role: string        # Role or position title
startDate: string   # ISO date (e.g., "2023-01-01")
endDate?: string    # ISO date or null for current position
impact: string      # Focus on human impact metrics/outcomes
image?: string      # Optional image path relative to /public
---
```

**Content body**: Markdown with description of responsibilities and impact.

---

## Page Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/fr/` (default locale) |
| `/fr/` | Home page (French) |
| `/en/` | Home page (English) |
| `/fr/projets/` | Projects page (French) |
| `/en/projects/` | Projects page (English) |
| `/fr/blog/` | Blog list page (French) |
| `/en/blog/` | Blog list page (English) |
| `/fr/blog/[slug]/` | Blog article detail (French) |
| `/en/blog/[slug]/` | Blog article detail (English) |
| `/fr/leadership/` | Leadership page (French) |
| `/en/leadership/` | Leadership page (English) |

### Asset Routes

| Route | Description |
|-------|-------------|
| `/cv/cv-fr.pdf` | French CV PDF |
| `/cv/cv-en.pdf` | English CV PDF |
| `/photo/profile.jpg` | Professional photo |

## UI Label Dictionary

**Path**: `/src/i18n/{fr,en}.json`

**Structure**:

```json
{
  "nav": {
    "home": "Accueil",
    "projects": "Projets",
    "blog": "Blog",
    "leadership": "Leadership",
    "cv": "CV"
  },
  "language": {
    "selector": "Langue",
    "fr": "Français",
    "en": "English"
  },
  "home": {
    "profile": {
      "educator": {
        "title": "Éducateur STEM",
        "summary": "..."
      },
      "engineer": {
        "title": "Ingénieur/Développeur IA",
        "summary": "..."
      },
      "researcher": {
        "title": "Étudiant-chercheur en vision artificielle",
        "summary": "..."
      }
    }
  },
  "projects": {
    "title": "Projets",
    "filter": "Filtrer par catégorie",
    "all": "Tous",
    "viewMore": "Voir plus",
    "viewLess": "Voir moins"
  },
  "blog": {
    "title": "Blog",
    "readMore": "Lire la suite",
    "tags": "Tags",
    "publishedOn": "Publié le"
  },
  "leadership": {
    "title": "Leadership",
    "impact": "Impact humain"
  },
  "cv": {
    "download": "Télécharger le CV",
    "selectLanguage": "Sélectionner la langue"
  }
}
```

## Component Contracts

### LanguageSelector

**Props**:
- `currentLang`: `'fr' | 'en'`
- `currentPath`: `string`

**Behavior**:
- Renders a toggle or dropdown to switch between FR and EN
- On change, navigates to the same page in the selected language
- Preserves query parameters

### ProjectCard

**Props**:
- `project`: `Project` (from data model)
- `lang`: `'fr' | 'en'`

**Behavior**:
- Displays project title, description, technologies, and external link
- Technologies rendered as tags/badges
- External link opens in new tab with `rel="noopener noreferrer"`

### BlogCard

**Props**:
- `article`: `BlogArticle` (from data model)
- `lang`: `'fr' | 'en'`

**Behavior**:
- Displays article title, date, summary, and tags
- Links to article detail page

### LeadershipCard

**Props**:
- `experience`: `LeadershipExperience` (from data model)
- `lang`: `'fr' | 'en'`

**Behavior**:
- Displays organization, role, description, and impact focus
- Dates formatted according to locale
