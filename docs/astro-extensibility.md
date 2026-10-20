# Astro: extensibility, galleries, content organization & tagging

How Astro handles FAASL's current needs and likely future ones: photo galleries, volunteer bios, event deep dives, and tags that cut across sections. Builds on [`architecture.md`](./architecture.md) and [`framework-deep-dive.md`](./framework-deep-dive.md).

## 1. How Astro is extended

There are four layers, from least to most effort:

| Layer | What it is | FAASL examples |
|---|---|---|
| **Official integrations** | Installed with one command (`npx astro add react`), configured in `astro.config.mjs` | `@astrojs/react`, `@astrojs/mdx` (components inside Markdown), `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/cloudflare` (only if we ever need server routes) |
| **Any npm library** | Astro is built on Vite, so most JS/React libraries just work, either in build-time code or inside a React island | PhotoSwipe (lightbox), `yet-another-react-lightbox`, Pagefind (site search), `ical.js` (calendar feed), date libraries |
| **Your own components** | `.astro` components (zero JS) and React components (islands) | `PersonCard`, `Gallery`, `EventCard`, `TagList`, `FaqList` |
| **Custom content loaders** | A small function that pulls data from anywhere into a content collection at build time | Google Calendar → `events`; a shared photo album → `galleries`; Mailchimp archive → `newsletters` |

The important part: **new sections don't need new plugins.** A section is a content collection (folder + schema) and a couple of page templates. Astro doesn't care whether it's "volunteers", "events" or "uniform history".

---

## 2. Photos & interactive galleries

### What's built in
- `<Image>` / `<Picture>` resize, convert to WebP/AVIF, generate `srcset` for each screen size, set width/height (no layout jumping) and lazy-load. Responsive image layouts can be set once for the whole site.
- `getImage()` produces an optimized URL in code, useful for a lightbox's full-size version.
- Images referenced from content (a Markdown front-matter field, or a folder of photos) are validated: a missing file fails the build.

### What isn't built in
A **lightbox** (click a photo, view it full-screen, swipe through). That's a small amount of JavaScript, so it's an island. Options:

| Library | Type | Notes |
|---|---|---|
| **PhotoSwipe v5** | Plain JS, ~15 KB | Touch/swipe, zoom, keyboard, accessible. Works on top of plain HTML links, so the gallery still works (and is crawlable) without JS. **Recommended.** |
| `yet-another-react-lightbox` | React | Nice if you want everything in React; plugins for captions, thumbnails, slideshow, video. Ships React to the gallery page. |
| GLightbox | Plain JS | Simple; also handles video. |

### How a gallery would work

Photos sit next to the event they belong to:

```
src/content/events/2026-pentecost-festa/
├── index.mdx            ← the write-up
├── cover.jpg
└── photos/
    ├── 01-parade-start.jpg
    ├── 02-brass-section.jpg
    └── …
```

`Gallery.astro` (renders thumbnails as plain HTML; PhotoSwipe adds the lightbox)
```astro
---
import { Image, getImage } from 'astro:assets';
const { photos, id } = Astro.props; // photos: [{ src, alt, caption }]
const items = await Promise.all(photos.map(async (p) => ({
  ...p, full: await getImage({ src: p.src, width: 1920, format: 'webp' }),
})));
---
<div class="gallery" id={id}>
  {items.map((p) => (
    <a href={p.full.src} data-pswp-width={p.full.attributes.width} data-pswp-height={p.full.attributes.height}>
      <Image src={p.src} alt={p.alt} width={400} />
    </a>
  ))}
</div>
<script>
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';
  document.querySelectorAll('.gallery').forEach((el) =>
    new PhotoSwipeLightbox({ gallery: el, children: 'a', pswpModule: () => import('photoswipe') }).init());
</script>
```

In an event write-up (MDX), it's one line: `<Gallery id="festa-2026" photos={frontmatter.photos} />`. The same component powers a standalone `/gallery` page that collects photos from every event.

### Things to plan for
- **Repo size.** Hundreds of full-resolution photos make the git repo heavy. For a few galleries a year, keeping photos in the repo is fine (optimize originals to ~2500 px before committing). If galleries grow large, keep originals in a photo host (Cloudflare R2 / Images, a public Google Photos or Flickr album) and pull them in with a custom loader. Astro can optimize remote images too.
- **Build time.** Image processing is the slowest part of a build. Astro caches processed images between builds; we'll keep that cache in the deploy pipeline.
- **Captions & consent.** Captions and alt text live in front-matter. Add a field to mark photos with minors whose parents haven't given consent, so they're never published by accident.

---

## 3. Content organization

### Proposed structure

```
src/
├── content.config.ts        ← every collection and its schema, in one file
├── content/
│   ├── site.yaml            ← org facts: name, address, phone, EIN, socials
│   ├── tags.yaml            ← the shared tag list (see §4)
│   ├── people/              ← one .md per person: leaders, teachers, volunteers
│   │   ├── edgard-gonzalez.md
│   │   └── edgard-gonzalez.jpg
│   ├── events/              ← one folder per performance / event deep dive (MDX + photos)
│   ├── stories/             ← member stories
│   ├── pages/               ← long-form copy for Home, Lessons, About, Join…
│   ├── faqs.yaml
│   ├── instruments.yaml
│   └── stores.yaml
├── components/              ← PersonCard, Gallery, EventCard, TagList, Hero…
├── layouts/                 ← BaseLayout (SEO head, nav, footer), ArticleLayout
└── pages/                   ← routes (file path = URL)
    ├── index.astro
    ├── lessons.astro
    ├── about.astro
    ├── people/[slug].astro  ← one page per person (optional per group)
    ├── events/index.astro   ← upcoming (from Google Calendar) + past write-ups
    ├── events/[slug].astro
    ├── stories/[slug].astro
    ├── gallery.astro
    └── tags/[tag].astro     ← everything with a given tag, across sections
```

Rules of thumb:
- **Content and code are separate.** Volunteers editing `src/content/` never touch components. Designers changing components never touch copy.
- **One file per thing** for people, events and stories (easy to add, review and delete). **One file per list** for small lists (FAQs, instruments, stores).
- **Media lives next to its content** (a person's photo beside their bio, an event's photos in its folder), so nothing gets orphaned.
- `content.md` maps directly onto this: each section of it becomes one of these files.

### Schemas keep everyone consistent

```ts
// src/content.config.ts (abridged)
const tags = defineCollection({
  loader: file('src/content/tags.yaml'),
  schema: z.object({ label: z.string(), description: z.string() }),
});

const people = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/people' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    roles: z.array(z.enum(['leadership', 'teacher', 'conductor', 'volunteer', 'musician'])),
    title: z.string(),                 // "President of the Board"
    photo: image().optional(),
    instruments: z.array(z.string()).default([]),
    memberSince: z.number().optional(), // lets the site compute "for X years"
    tags: z.array(reference('tags')).default([]),
    published: z.boolean().default(true),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/events' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    cover: image(),
    performers: z.array(reference('people')).default([]),   // links to bios
    photos: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
    tags: z.array(reference('tags')).default([]),
  }),
});
```

What this gives you:
- **Volunteer bios** are just more `people` entries with `roles: [volunteer]`. The About page shows leadership + teachers; a `/volunteers` page shows volunteers. No new code beyond one page template.
- **Event deep dives** are MDX files: write-up, gallery, embedded video, list of performers (linked to their bios), map, and `Event` structured data for Google, all generated from front-matter.
- `memberSince` and the founding year in `site.yaml` let the site **calculate** "X years" text, which fixes the stale-dates problem for good.
- **Mistakes fail the build**, not the live site: a misspelled tag, a missing photo, a performer who doesn't exist, a date in the wrong format.

---

## 4. Tagging & cross-section relationships

### Tags shared by every section

One list of tags (`tags.yaml`), used by people, events, stories and galleries:

```yaml
# src/content/tags.yaml
- id: holy-ghost-festas
  label: Holy Ghost Festas
  description: Parades and festas hosted by Portuguese communities across California.
- id: cherry-festival
  label: San Leandro Cherry Festival
  description: Our hometown parade every June.
- id: youth
  label: Youth musicians
  description: Students and young members of the band.
- id: brass
  label: Brass
  description: Trumpets, horns, trombones, euphoniums and tubas.
```

Because tags are a collection, not loose strings:
- Every tag has a **label and description**, so `/tags/holy-ghost-festas` is a real page with intro text. That's good for SEO, unlike a bare list of links.
- A typo (`holy-ghost-festa`) **fails the build**. No more "Parade" vs. "parades" drift.
- Renaming a tag's label changes it everywhere at once.

### One tag page across all sections

```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const tags = await getCollection('tags');
  const sections = ['events', 'people', 'stories'] as const;
  const all = (await Promise.all(sections.map((s) => getCollection(s)))).flat();
  return tags.map((tag) => ({
    params: { tag: tag.id },
    props: { tag, items: all.filter((e) => e.data.tags.some((t) => t.id === tag.id)) },
  }));
}
const { tag, items } = Astro.props;
---
<h1>{tag.data.label}</h1>
<p>{tag.data.description}</p>
<!-- grouped by section: Events, People, Stories -->
```

A visitor on `/tags/cherry-festival` sees every Cherry Festival write-up from every year, the gallery photos, and stories that mention it.

### Relationships beyond tags

`reference()` links entries directly. Links work in both directions:
- An **event** lists its performers → each name links to their bio.
- A **person's page** finds every event that references them → "Performances with Geronimo" appears automatically, with no extra data entry.
- A **story** can reference its author (a person) and related events.

### Search across everything
**Pagefind** indexes the built site and adds a search box with no server or service. It runs entirely in the browser, and it can filter by tag or section.

---

## 5. Future expansion: how each idea fits

| Future idea | How it fits in Astro | Effort |
|---|---|---|
| Volunteer bios | More `people` entries + one page template | Small |
| Event deep dives with galleries | `events` collection (MDX) + `Gallery` component | Small–medium (once) |
| Site-wide photo gallery | Page that collects `photos` from all events, filterable by tag | Small |
| Upcoming events from Google Calendar | Custom loader reading the public iCal feed at build; daily scheduled rebuild | Medium (once) |
| Member stories & testimonials | `stories` collection, cross-tagged. Each story has a `quote` (short pull quote) and an `audiences` field, so a `Testimonial` component can show matching snippets on Home, Lessons, Join, Give and Impact, each linking to the full story | Small |
| Tags across sections | `tags` collection + `/tags/[tag]` page | Small (once) |
| Site search | Pagefind integration | Small |
| Portuguese translation | Built-in i18n routing (`/pt/...`), translated content files | Medium |
| News / announcements + RSS | `news` collection + `@astrojs/rss` | Small |
| Video (performance clips) | YouTube embeds as lightweight components (facade loads the player on click) | Small |
| Auto-generated brochure PDF | Print-styled page from the same collections, rendered to PDF in the deploy pipeline | Medium (separate project) |
| Non-developer editing | Git-based CMS (Pages CMS / Decap / TinaCMS) reading the same schemas, including photo uploads | Medium |
| Member-only or dynamic features (sign-ups, attendance) | Astro can run individual server routes on Cloudflare with an adapter, without changing the rest of the site. Or a separate app on a subdomain. | Medium–large |

### Honest limits
- **Very heavy interactivity** (a full app-like member portal) is better as a separate app, or as larger React islands. Astro's strength is pages that are mostly content.
- **Sharing state between islands** needs a small library (nanostores). Not needed for anything above.
- **Large photo volumes in git** eventually need an external photo store (see §2).
- **Breaking upgrades:** Astro ships a major version about once a year. So far they've had upgrade guides and modest changes, but budget an hour or two each year.

## Sources
- [Astro 5.10: live content collections and responsive images](https://astro.build/blog/astro-5100/)
- [Astro 2025 year in review](https://astro.build/blog/year-in-review-2025)
- [Content Collections API reference](https://docs.astro.build/de/reference/modules/astro-content)
