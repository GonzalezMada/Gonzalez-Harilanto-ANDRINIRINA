import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Generates a clean `{lang}/{slug}` id from a path like `fr/projects/my-project.md`,
 * so `lang` never has to be hand-authored in frontmatter (data-model.md).
 */
function generateLangSlugId({ entry }: { entry: string }): string {
  const segments = entry.split('/');
  const lang = segments[0];
  const filename = segments[segments.length - 1]?.replace(/\.mdx?$/, '') ?? '';
  return `${lang}/${filename}`;
}

const projects = defineCollection({
  loader: glob({
    base: './src/content',
    pattern: ['fr/projects/*.md', 'en/projects/*.md'],
    generateId: generateLangSlugId,
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    technologies: z.array(z.string().min(1)).min(1),
    externalLink: z.url(),
    category: z.string().min(1),
    translationKey: z.string().min(1),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({
    base: './src/content',
    pattern: ['fr/blog/*.md', 'en/blog/*.md'],
    generateId: generateLangSlugId,
  }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    translationKey: z.string().min(1),
  }),
});

const leadership = defineCollection({
  loader: glob({
    base: './src/content',
    pattern: ['fr/leadership/*.md', 'en/leadership/*.md'],
    generateId: generateLangSlugId,
  }),
  schema: z.object({
    organization: z.string().min(1),
    role: z.string().min(1),
    // Substantive length requirement so a placeholder word can't silently
    // satisfy spec FR-017's "human impact" requirement (data-model.md).
    impact: z.string().min(40),
    period: z.string().optional(),
    translationKey: z.string().min(1),
  }),
});

export const collections = { projects, blog, leadership };
