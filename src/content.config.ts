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
      // Year the person took on their current title, for "for X years" copy.
      roleSince: z.number().int().optional(),
      order: z.number().default(100),
      // Drafts show on beta with a "Draft" badge and are left out of production.
      draft: z.boolean().default(false),
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

// Music stores for the Lessons page; only "open" stores are shown (src/content/stores.yaml).
const stores = defineCollection({
  loader: file('src/content/stores.yaml'),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['local', 'online']),
    city: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    url: z.url(),
    status: z.enum(['open', 'closed', 'unverified']),
    lastChecked: z.coerce.date(),
    notes: z.string().optional(),
  }),
});

// Public Google Calendars (src/content/calendars.yaml).
const calendars = defineCollection({
  loader: file('src/content/calendars.yaml'),
  schema: z.object({
    name: z.string(),
    calendarId: z.string(),
  }),
});

// Lessons FAQ (src/content/faqs.yaml).
const faqs = defineCollection({
  loader: file('src/content/faqs.yaml'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    link: z
      .object({
        label: z.string(),
        href: z.string().optional(),
        calendar: reference('calendars').optional(),
      })
      .optional(),
    order: z.number(),
  }),
});

// Facts about the free lesson program (src/content/lessons.yaml).
const lessons = defineCollection({
  loader: file('src/content/lessons.yaml'),
  schema: z.object({
    cost: z.string(),
    minimumAge: z.number().int(),
    day: z.string(),
    classes: z.array(z.object({ name: z.string(), time: z.string().regex(/^\d{2}:\d{2}$/) })),
    durationMinutes: z.number().int(),
    bandRehearsal: z.object({
      durationMinutes: z.number().int(),
      note: z.string(),
      day: z.string(),
      time: z.string().regex(/^\d{2}:\d{2}$/),
    }),
    methodBook: z.object({ title: z.string(), note: z.string() }),
    accessories: z.array(z.object({ instruments: z.string(), items: z.string() })),
    demoVideoId: z.string(),
    remind: z.object({ url: z.url(), instructions: z.string() }).optional(),
  }),
});

// Member stories. Each story's quote doubles as a testimonial snippet on the
// pages for its audiences.
const stories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.enum(['student', 'parent', 'musician', 'board', 'volunteer', 'partner']),
      quote: z.string(),
      audiences: z.array(z.enum(['students', 'families', 'musicians', 'donors', 'funders'])),
      photo: image().optional(),
      externalUrl: z.url().optional(),
      // Drafts show on beta with a "Draft" badge and are left out of production.
      draft: z.boolean().default(false),
      tags: z.array(reference('tags')).default([]),
    }),
});

// Printable onboarding forms for the Members page (src/content/member-forms.yaml).
const memberForms = defineCollection({
  loader: file('src/content/member-forms.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Path under public/, e.g. /forms/uniform-agreement.pdf
    file: z.string().startsWith('/forms/').optional(),
    order: z.number(),
  }),
});

export const collections = {
  site,
  tags,
  people,
  instruments,
  stores,
  calendars,
  faqs,
  lessons,
  stories,
  memberForms,
};
