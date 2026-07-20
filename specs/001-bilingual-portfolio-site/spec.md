# Feature Specification: Bilingual Portfolio Site

**Feature Branch**: `001-bilingual-portfolio-site`

**Created**: 2026-07-20

**Status**: Draft

**Input**: User description: "Créer un portfolio personnel bilingue FR/EN avec 4 pages : Accueil, Projets, Blog, Leadership, plus un accès de téléchargement du CV (PDF FR et EN séparés). La page Accueil présente une photo professionnelle et trois facettes de profil (Éducateur STEM, Ingénieur/Développeur IA, Étudiant-chercheur en vision artificielle), chacune avec un résumé court et un lien vers la section correspondante. La page Projets affiche une liste extensible de projets sous forme de cartes (titre, description courte, technologies, lien externe), filtrable par catégorie. La page Blog affiche une liste extensible d'articles (titre, date, résumé, tags), chaque article accessible individuellement. La page Leadership présente les expériences d'encadrement et de mentorat (YALI RLC SA, Fablab EnR-out, Technovation Girls, STEM for Good) avec un focus sur l'impact humain. Un sélecteur de langue FR/EN doit être visible sur toutes les pages et conserver la page courante lors du changement de langue."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the professional identity on Home (Priority: P1)

A first-time visitor (recruiter, collaborator, researcher) lands on the Home
page, sees a professional photo and three distinct professional facets
(STEM Educator, AI Engineer/Developer, Computer Vision Research Student),
each with a short summary, and can jump straight to the section that matches
their interest.

**Why this priority**: The Home page is the entry point for every visitor
and is what determines whether they continue exploring the site at all. It
must work standalone as the site's first impression.

**Independent Test**: Can be fully tested by loading the Home page and
verifying the photo, the three facets with their summaries, and that each
facet's link navigates to its corresponding section — independent of
Projects/Blog/Leadership content being complete.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site, **When** the Home page loads, **Then**
   a professional photo and exactly three profile facets (STEM Educator, AI
   Engineer/Developer, Computer Vision Research Student) are displayed, each
   with a short summary.
2. **Given** the Home page is displayed, **When** the visitor activates a
   facet's link, **Then** they are taken to the section/page that
   corresponds to that facet.

---

### User Story 2 - Switch language without losing context (Priority: P1)

A visitor browsing any page switches the site language between French and
English using a selector that is visible on every page, and stays on the
equivalent content of the page they were viewing rather than being sent back
to Home.

**Why this priority**: Bilingual parity is a non-negotiable project
requirement; if switching language loses the visitor's place, the bilingual
experience is effectively broken regardless of how good the translations
are.

**Independent Test**: Can be fully tested by visiting any page in one
language, switching language via the selector, and verifying the visitor
remains on the equivalent content in the new language.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page in French, **When** they select
   English from the language selector, **Then** the same page (and, for
   detail pages, the same item) is shown in English.
2. **Given** a visitor is on any page, **When** the page has loaded, **Then**
   the language selector is visible and indicates the current language.

---

### User Story 3 - Download the CV in the right language (Priority: P1)

A visitor (typically a recruiter) locates and downloads the CV as a PDF, and
the version offered matches the language currently selected on the site.

**Why this priority**: Downloading the CV is a primary conversion action for
a portfolio site; recruiters often want the CV before reading anything else.

**Independent Test**: Can be fully tested by locating the CV download
control in each language and verifying it downloads a PDF whose language
matches the site's currently selected language.

**Acceptance Scenarios**:

1. **Given** the site is displayed in French, **When** the visitor
   activates the CV download control, **Then** the French-language CV PDF is
   downloaded.
2. **Given** the site is displayed in English, **When** the visitor
   activates the CV download control, **Then** the English-language CV PDF
   is downloaded.
3. **Given** the visitor is on any page, **When** they look for the CV
   download control, **Then** it is reachable without leaving the current
   page's site navigation.

---

### User Story 4 - Browse and filter Projects (Priority: P2)

A visitor browses the Projects page, sees each project as a card (title,
short description, technologies, external link), and narrows the list using
a category filter.

**Why this priority**: Projects are core evidence of technical work, but the
site is still functional as a portfolio (identity + CV) without this page
being polished on day one.

**Independent Test**: Can be fully tested by loading the Projects page,
verifying card content and external links, then applying a category filter
and verifying only matching projects remain visible.

**Acceptance Scenarios**:

1. **Given** the Projects page is loaded, **When** it renders, **Then**
   every project is shown as a card with title, short description,
   technologies, and a working external link.
2. **Given** the Projects page is loaded, **When** the visitor selects a
   category filter, **Then** only projects belonging to that category remain
   visible.
3. **Given** a category filter is active, **When** the visitor clears it,
   **Then** all projects are shown again.

---

### User Story 5 - Explore Leadership experiences (Priority: P2)

A visitor reads about the person's mentoring and leadership experience
(YALI RLC SA, Fablab EnR-out, Technovation Girls, STEM for Good) with an
emphasis on the human impact of that involvement, not just role titles.

**Why this priority**: Leadership content differentiates the profile but is
supporting evidence rather than the primary conversion path (identity, CV,
projects).

**Independent Test**: Can be fully tested by loading the Leadership page and
verifying each of the four named experiences is present with a description
that conveys impact on people/communities, not only a title and date range.

**Acceptance Scenarios**:

1. **Given** the Leadership page is loaded, **When** it renders, **Then**
   entries for YALI RLC SA, Fablab EnR-out, Technovation Girls, and STEM for
   Good are all present.
2. **Given** a Leadership entry is displayed, **When** the visitor reads it,
   **Then** it communicates the human impact of the experience (who was
   helped/mentored and what changed), not only a role title.

---

### User Story 6 - Read Blog articles (Priority: P3)

A visitor browses a list of blog articles (title, date, summary, tags) and
opens an individual article to read it in full.

**Why this priority**: Blog content builds credibility over time but is the
least time-sensitive piece of the initial launch compared to identity, CV,
and projects.

**Independent Test**: Can be fully tested by loading the Blog page,
verifying list entries show title/date/summary/tags, and opening one article
to confirm it renders at its own accessible page.

**Acceptance Scenarios**:

1. **Given** the Blog page is loaded, **When** it renders, **Then** each
   article in the list shows a title, publication date, summary, and tags.
2. **Given** the Blog list is displayed, **When** the visitor opens an
   article, **Then** they reach that article's own page showing its full
   content.

---

### Edge Cases

- What happens when the Projects or Blog list has zero entries (e.g., before
  any content has been added)? The page MUST still render its layout,
  navigation, and language selector, showing an empty/placeholder state
  instead of erroring.
- What happens when a category filter on Projects matches no project? The
  page MUST show an explicit empty-result state rather than an empty blank
  area.
- What happens when a visitor switches language while viewing a Blog article
  or Project that has no equivalent translated content yet? The site MUST
  fall back gracefully (e.g., to the equivalent list page in the target
  language) rather than showing a broken or empty page.
- What happens when an external project link is unreachable? The link MUST
  still be presented as provided; validating third-party link availability
  is outside this feature's scope.
- What happens when the CV file for the currently selected language is
  temporarily unavailable? The download control MUST communicate that the
  file is unavailable rather than silently failing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST provide four primary pages — Home, Projects,
  Blog, and Leadership — each available in both French and English with
  equivalent content depth between the two languages.
- **FR-002**: The site MUST provide a language selector that is visible on
  every page and indicates the currently selected language.
- **FR-003**: When a visitor switches language, the site MUST keep them on
  the equivalent content of the page they were viewing (same page type and,
  for detail pages, the same item where a translation exists) rather than
  redirecting to the Home page.
- **FR-004**: The Home page MUST display a professional photo.
- **FR-005**: The Home page MUST display exactly three profile facets: STEM
  Educator, AI Engineer/Developer, and Computer Vision Research Student.
- **FR-006**: Each profile facet MUST include a short summary and a link
  that navigates to the section/page corresponding to that facet.
- **FR-007**: The site MUST offer downloadable CV files in PDF format, with
  a separate file maintained for French and for English.
- **FR-008**: The CV download offered to a visitor MUST correspond to the
  language currently selected on the site.
- **FR-009**: The CV download control MUST be reachable from every page.
- **FR-010**: The Projects page MUST display each project as a card showing
  a title, a short description, the technologies used, and an external
  link.
- **FR-011**: The Projects page MUST allow visitors to filter the displayed
  projects by category.
- **FR-012**: The set of projects MUST be extensible — new projects can be
  added by a content author without modifying application code.
- **FR-013**: The Blog page MUST display a list of articles, each showing a
  title, publication date, summary, and tags.
- **FR-014**: Each blog article MUST be individually accessible at its own
  page.
- **FR-015**: The set of blog articles MUST be extensible — new articles can
  be added by a content author without modifying application code.
- **FR-016**: The Leadership page MUST present the visitor's mentoring and
  leadership experiences, explicitly including YALI RLC SA, Fablab EnR-out,
  Technovation Girls, and STEM for Good.
- **FR-017**: Each Leadership entry MUST convey the human impact of the
  experience (e.g., who was mentored/helped and what outcome resulted), not
  only a role title and date range.
- **FR-018**: All content — Home facets, Projects, Blog articles, and
  Leadership entries — MUST maintain content parity between the French and
  English versions.
- **FR-019**: The site MUST provide persistent navigation to Projects, Blog,
  and Leadership from every page, in addition to the facet links on Home.

### Key Entities *(include if feature involves data)*

- **Profile Facet**: One of the three Home-page identity angles (STEM
  Educator, AI Engineer/Developer, Computer Vision Research Student);
  attributes: label, short summary, link target, language variant.
- **Project**: A portfolio project; attributes: title, short description,
  technologies list, external link, category, language variant.
- **Blog Article**: A published post; attributes: title, publication date,
  summary, tags, full body content, language variant.
- **Leadership Experience**: A mentoring/leadership engagement (e.g., YALI
  RLC SA, Fablab EnR-out, Technovation Girls, STEM for Good); attributes:
  organization/program name, role description, human-impact narrative,
  language variant.
- **CV Document**: A downloadable resume file; attributes: language (FR or
  EN), PDF file.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the three professional
  facets and reach the section matching their interest within 2 clicks from
  the Home page.
- **SC-002**: Switching language keeps the visitor on equivalent content
  100% of the time across all four pages — no language switch ever lands on
  an unrelated page or a broken state.
- **SC-003**: A visitor can locate and download the CV in their preferred
  language within 30 seconds of arriving on the site, from any starting
  page.
- **SC-004**: Applying a Projects category filter shows only matching
  projects with no perceptible delay, and clearing it restores the full
  list.
- **SC-005**: A new project or blog article can be published by a content
  author adding a content file, with no application code change required.
- **SC-006**: Every page and language pair presents equivalent content
  coverage — no page/language combination has materially less content than
  its counterpart.
- **SC-007**: A visitor can read any single Leadership entry and describe,
  in their own words, the human impact of that experience without needing
  outside context.

## Assumptions

- The person's biography, professional photo, and both CV PDFs (FR and EN)
  are supplied as ready-to-use content assets; producing or writing that
  content is outside this feature's scope.
- "Extensible list" (Projects, Blog) means content authors add entries via
  content files, consistent with the project's content-as-data principle; no
  admin UI or CMS is required.
- Project categories are content-driven (defined by whoever adds a project)
  rather than a fixed, hard-coded list; the filter operates on whatever
  categories exist in the content at a given time.
- The Projects category filter is a single-selection filter (one category,
  or "all") unless usage later shows a need for multi-select.
- A Blog article or Project may temporarily exist in only one language
  during authoring; the language-switch fallback behavior (see Edge Cases)
  covers this case, but the project's bilingual-parity principle still
  applies before content is considered published/final.
- No visitor accounts, comments, search, or CMS admin interface are in scope
  for this feature.
