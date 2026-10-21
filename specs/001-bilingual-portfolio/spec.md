# Feature Specification: Bilingual Personal Portfolio

**Feature Branch**: `001-bilingual-portfolio`

**Created**: 2026-07-19

**Status**: Draft

**Input**: User description: "Créer un portfolio personnel bilingue FR/EN avec 4 pages : Accueil, Projets, Blog, Leadership, plus un accès de téléchargement du CV (PDF FR et EN séparés). La page Accueil présente une photo professionnelle et trois facettes de profil (Éducateur STEM, Ingénieur/Développeur IA, Étudiant-chercheur en vision artificielle), chacune avec un résumé court et un lien vers la section correspondante. La page Projets affiche une liste extensible de projets sous forme de cartes (titre, description courte, technologies, lien externe), filtrable par catégorie. La page Blog affiche une liste extensible d'articles (titre, date, résumé, tags), chaque article accessible individuellement. La page Leadership présente les expériences d'encadrement et de mentorat (YALI RLC SA, Fablab EnR-out, Technovation Girls, STEM for Good) avec un focus sur l'impact humain. Un sélecteur de langue FR/EN doit être visible sur toutes les pages et conserver la page courante lors du changement de langue."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Visit & Language Selection (Priority: P1)

A visitor lands on the portfolio for the first time. They see the Home page with a professional photo, three profile facets, and a language selector. They can switch between French and English at any time, and the page content updates accordingly while staying on the same page.

**Why this priority**: This is the entry point for all users. Without proper bilingual support and navigation, the portfolio fails its core purpose.

**Independent Test**: Navigate to the home page, switch language from FR to EN, verify all content updates and the URL/page state is preserved.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Home page in French, **When** they select English, **Then** all text content switches to English and they remain on the Home page.
2. **Given** a visitor is on the Projects page in English, **When** they select French, **Then** all text content switches to French and they remain on the Projects page.
3. **Given** a visitor has not selected a language, **When** they first load the site, **Then** the default language is displayed with a visible language selector.

---

### User Story 2 - Explore Projects (Priority: P2)

A visitor wants to learn about the portfolio owner's work. They navigate to the Projects page, see project cards with titles, descriptions, technologies, and external links. They can filter projects by category to find relevant work.

**Why this priority**: Projects are the core showcase of technical skills and experience.

**Independent Test**: Navigate to Projects page, verify cards display correctly, apply a category filter, verify only matching projects are shown.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Projects page, **When** they view the page, **Then** they see all projects displayed as cards with title, description, technologies, and external link.
2. **Given** a visitor is on the Projects page, **When** they select a category filter, **Then** only projects in that category are displayed.
3. **Given** a visitor clicks a project's external link, **When** the link opens, **Then** it opens in a new tab and the portfolio remains accessible.

---

### User Story 3 - Read Blog Articles (Priority: P2)

A visitor wants to read blog posts. They navigate to the Blog page, see a list of articles with titles, dates, summaries, and tags. They can click an article to read the full content.

**Why this priority**: Blog content demonstrates thought leadership and communication skills.

**Independent Test**: Navigate to Blog page, verify article list displays, click an article, verify full content loads and language is preserved.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Blog page, **When** they view the page, **Then** they see all articles listed with title, date, summary, and tags.
2. **Given** a visitor clicks an article, **When** the article page loads, **Then** the full article content is displayed in the current language.
3. **Given** a visitor is reading an article in French, **When** they switch to English, **Then** the same article is displayed in English.

---

### User Story 4 - View Leadership Experience (Priority: P3)

A visitor wants to understand the portfolio owner's leadership and mentoring experience. They navigate to the Leadership page and see experiences with YALI RLC SA, Fablab EnR-out, Technovation Girls, and STEM for Good, with a focus on human impact.

**Why this priority**: Leadership experience differentiates the portfolio owner and shows soft skills.

**Independent Test**: Navigate to Leadership page, verify all experiences are listed with descriptions and impact focus.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Leadership page, **When** they view the page, **Then** they see all leadership experiences listed with organization name, role, and impact description.
2. **Given** a visitor views a leadership experience, **When** they read the description, **Then** the focus on human impact is clearly communicated.

---

### User Story 5 - Download CV (Priority: P3)

A visitor wants to download the portfolio owner's CV. They find a CV download link (available on all pages) and can download either the French or English PDF version.

**Why this priority**: CV download is a key conversion action for recruiters and collaborators.

**Independent Test**: From any page, click CV download, select language, verify PDF downloads correctly.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they click the CV download link, **Then** they can choose between French and English PDF versions.
2. **Given** a visitor selects French CV, **When** the download completes, **Then** a French PDF file is downloaded.
3. **Given** a visitor selects English CV, **When** the download completes, **Then** an English PDF file is downloaded.

---

### User Story 6 - View Profile Facets (Priority: P1)

A visitor lands on the Home page and sees a professional photo plus three profile facets: STEM Educator, AI Engineer/Developer, and AI Vision Researcher. Each facet has a short summary and a link to the corresponding section.

**Why this priority**: The profile facets immediately communicate the portfolio owner's multifaceted identity.

**Independent Test**: Navigate to Home page, verify photo and three facets display, click each facet link, verify navigation to correct section.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Home page, **When** they view the page, **Then** they see a professional photo and three profile facets with summaries and links.
2. **Given** a visitor clicks the STEM Educator facet link, **When** they navigate, **Then** they are taken to the relevant section.
3. **Given** a visitor clicks the AI Engineer/Developer facet link, **When** they navigate, **Then** they are taken to the relevant section.
4. **Given** a visitor clicks the AI Vision Researcher facet link, **When** they navigate, **Then** they are taken to the relevant section.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when a user bookmarks a page in one language and returns later?
- How does the site handle missing translations for new content?
- What happens when a user has JavaScript disabled?
- How does the language selector behave on the blog article detail page?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a professional photo on the Home page
- **FR-002**: System MUST display three profile facets on the Home page: STEM Educator, AI Engineer/Developer, AI Vision Researcher
- **FR-003**: Each profile facet MUST include a short summary and a link to the corresponding section
- **FR-004**: System MUST provide a Projects page with extensible project cards (title, description, technologies, external link)
- **FR-005**: Projects MUST be filterable by category
- **FR-006**: System MUST provide a Blog page with extensible article list (title, date, summary, tags)
- **FR-007**: Each blog article MUST be accessible individually via a detail page
- **FR-008**: System MUST provide a Leadership page displaying mentoring experiences (YALI RLC SA, Fablab EnR-out, Technovation Girls, STEM for Good)
- **FR-009**: Leadership page MUST focus on human impact in descriptions
- **FR-010**: System MUST provide CV download access for both French and English PDF versions
- **FR-011**: System MUST display a language selector (FR/EN) visible on all pages
- **FR-012**: Language selector MUST preserve the current page when switching languages
- **FR-013**: All content MUST be available in both French and English with equivalent meaning
- **FR-014**: System MUST store content (projects, blog articles) as Markdown files in a dedicated content directory
- **FR-015**: Adding or updating content MUST NOT require code changes

### Key Entities

- **Project**: Title, description, technologies array, category, external link, language versions (FR/EN)
- **Blog Article**: Title, date, summary, tags array, full content, language versions (FR/EN)
- **Leadership Experience**: Organization name, role, description, impact focus, language versions (FR/EN)
- **Profile Facet**: Title, summary, link target, language versions (FR/EN)
- **CV**: PDF file for each language (FR and EN)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can navigate between all 4 main pages (Home, Projects, Blog, Leadership) within 3 clicks
- **SC-002**: Language switch completes within 200ms and preserves current page
- **SC-003**: All content (projects, blog, leadership) is available in both FR and EN with no missing translations
- **SC-004**: CV download for either language completes within 2 seconds
- **SC-005**: Project category filter updates visible results within 300ms
- **SC-006**: Blog article detail page loads within 1 second
- **SC-007**: Portfolio achieves Lighthouse performance score ≥ 90 on all pages
- **SC-008**: Portfolio meets WCAG 2.1 AA accessibility standards on all pages

## Assumptions

- Users have modern browsers with JavaScript enabled
- CV PDFs are provided by the portfolio owner and stored in the repository
- Initial content (projects, blog articles, leadership experiences) is provided by the portfolio owner
- Professional photo is provided by the portfolio owner
- Default language is French (can be configured)
- Content directory structure supports both FR and EN versions of each content item
