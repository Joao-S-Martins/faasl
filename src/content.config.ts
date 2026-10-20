import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Organization facts used across the site (src/content/site.yaml).
const site = defineCollection({
  loader: file('src/content/site.yaml'),
  schema: z.object({
    name: z.string(),
    legalName: z.string(),
    alternateName: z.string(),
    nameTranslation: z.string(),
    tagline: z.string(),
    foundingYear: z.number().int(),
    ein: z.string(),
    email: z.email(),
    phone: z.string(),
    mailingAddress: z.object({
      street: z.string(),
      city: z.string(),
      region: z.string(),
      postalCode: z.string(),
    }),
    clubhouse: z.object({
      street: z.string(),
      city: z.string(),
      region: z.string(),
      postalCode: z.string(),
    }),
    social: z.array(z.object({ name: z.string(), handle: z.string().optional(), url: z.url() })),
  }),
});

// Shared tags used by every section (src/content/tags.yaml).
const tags = defineCollection({
  loader: file('src/content/tags.yaml'),
  schema: z.object({
    label: z.string(),
    description: z.string(),
  }),
});

// Leaders, teachers and (later) volunteers: one Markdown file per person.
const people = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/people' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      roles: z.array(z.enum(['leadership', 'teacher', 'conductor', 'volunteer', 'musician'])),
      photo: image().optional(),
      instruments: z.array(z.string()).default([]),
      memberSince: z.number().int().optional(),
      order: z.number().default(100),
      published: z.boolean().default(true),
      tags: z.array(reference('tags')).default([]),
    }),
});

// Instruments taught, with timestamps in the demo video (src/content/instruments.yaml).
const instruments = defineCollection({
  loader: file('src/content/instruments.yaml'),
  schema: z.object({
    name: z.string(),
    family: z.enum(['woodwind', 'brass', 'percussion']),
    beginnerFriendly: z.boolean().default(false),
    demoStartSeconds: z.number().int().nonnegative().optional(),
  }),
});

export const collections = { site, tags, people, instruments };
