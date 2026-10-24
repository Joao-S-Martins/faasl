# FAASL.org v3: Design system plan

**Status:** plan, for review before building (Oct 2026). Direction C is approved (`/design/c/home`, `/design/c/lessons`); this plan turns its pieces into the site's real component system.
Related: [`brand.md`](./brand.md) (colors, type, patterns, voice) · [`brief.md`](./brief.md) §3.1 (design rules from the inspirations) · [`architecture.md`](./architecture.md)

## Goals

1. **Change a look in one place.** A style lives in exactly one component or token; pages never restyle things.
2. **Build pages by stacking sections.** A page is a short, readable list of sections; reordering or reusing a section is moving lines.
3. **Mix and match through a small set of options** with the same names everywhere, not through class names.
4. **Plain CSS, structured and componentized.** No CSS framework. Simple, semantic HTML.
5. **A catalog like Bootstrap's or Tailwind's docs**, beta only, documenting every token and component with live examples, options and usage notes.
6. **The agreed rules hold:** WCAG 4.5:1 text contrast, gold only for the lyre and trim, tile sizes in whole pixels, mobile first, SEO guardrails (content in the page from the start, no layout shift), reduced motion respected.

Not a goal: enforcing layout rules in code. "Bold green is one tool among several, never twice in a row" stays a written guideline, because there may be an exception some day.

## 1. Layers

| Layer | Folder | What | Changes |
|---|---|---|---|
| **Tokens** | `src/styles/tokens.css` | Every value with a name: color roles, type scale, spacing, radii, shadows, tile sizes, motion durations, breakpoints (as comments; CSS custom properties can't be used in media queries) | Rare; a change restyles the whole site |
| **Base** | `src/styles/base.css` (from `global.css`) | Reset, element defaults (headings, links, lists, focus), font loading | Rare |
| **Utilities** | `src/styles/utilities.css` | A handful of single-purpose classes: `.stack` (vertical rhythm between children), `.center`, `.lead`, `.visually-hidden`, `.measure` (reading width) | Rare; resist adding more |
| **Surfaces** | `src/components/surfaces/` | What a section sits on | Add one occasionally |
| **Blocks** | `src/components/blocks/` | Reusable layout pieces that don't know about content | The design toolbox |
| **Content components** | `src/components/content/` | Render a collection (people, events, FAQ, stores, schedule, testimonials) | When content types change |
| **Sections** | `src/sections/<page>/` and `src/sections/shared/` | Real content placed in blocks, one file per section | Once per section; reused across pages |
| **Layout** | `src/layouts/`, `src/components/layout/` | Document, header, footer, Donate button | Rare |
| **Pages** | `src/pages/` | Page metadata (title, description) plus a list of sections | Often, and trivially |

### Cascade layers

All CSS declares its layer, so priority is predictable and the "event card text turned white on green" class of bug can't recur:

```css
/* src/styles/layers.css, imported first */
@layer tokens, base, surfaces, blocks, content, sections, utilities, overrides;
```

- Astro's scoped component styles go inside the matching layer: `<style> @layer blocks { … } </style>`.
- `utilities` sits late so a utility always wins over block defaults; `overrides` is for rare, commented one-off fixes.
- Components never use `!important`.

## 2. The shared options

Every surface and block uses the same option names and meanings. These are the levers for mixing and matching.

| Option | Values | Meaning | Used by |
|---|---|---|---|
| `surface` | `plain` · `tint` · `green` · `staff` · `staff-green` · `photo` | What the section sits on | `Surface` (every section) |
| `tone` | `white` · `tint` · `green` | Color of a box or card on top of a surface | `MediaFeature`, `Card`, `Callout`, `QuoteBox` |
| `side` | `left` · `right` | Which side the photo sits on (desktop) | `MediaFeature`, `PhotoBand` |
| `width` | `content` · `narrow` | Content width or reading width | `Surface` |
| `well` | `true` · `false` | A sideways row sits in the recessed tray | `CardRow` |
| `level` | `2` · `3` | Heading level, so blocks nest correctly | Blocks with a heading |

Rules the blocks enforce themselves, so pages can't break them:
- **Contrast:** text inside a green surface or box is white; cards inside keep their own dark text (one rule in `base.css` via a `[data-on="dark"]` context attribute that surfaces and boxes set, instead of per-component fixes).
- **Corners:** boxes are rounded where they float free and square where they butt against a photo, another box or a section edge (handled inside each block, per breakpoint).
- **Tile sizes:** `TileBand` and `TileWall` accept only 48, 64 or 96 px; heights are whole rows.
- **Breakpoints:** phone layout up to 64rem (tablets included), desktop from 64rem; card grids may switch at 48rem.

## 3. Component inventory (from Direction C)

| Component | From | Notes |
|---|---|---|
| **Surfaces** | | |
| `Surface` | `design/Band.astro` | `surface`, `width`, `id`, `label`; sets heading spacing and `data-on` |
| **Blocks** | | |
| `Hero` | `HomeMock` hero C | Photo, text box overlapping its bottom, sits on the same surface as the next section (`surface` prop); `data-landing` for the header; video slot (still first, reduced-motion and slow-connection aware) |
| `PageHero` | `LessonsMock` top C | Smaller hero for inner pages |
| `PathLinks` | `HomeMock` paths | The "I want to…" blocks (icon, title, text, link) |
| `MediaFeature` | `design/Feature.astro` | Photo plus overlapping box; `side`, `tone` |
| `PhotoBand` | `design/PhotoBand.astro` | Full-width photo with a box over it (kept for later) |
| `StatGrid` | `design/StatGrid.astro` | Icon, number, label; rows aligned |
| `StepRow` | `LessonsMock` steps | Numbered boxes that butt together; last one emphasized |
| `FactRow` | `LessonsMock` facts | Icon, term, detail |
| `CardRow` | `design/EventCards` + `PeopleGrid scroll` | Sideways row on phones and tablets, grid or row on desktop; `well` |
| `ScrollWell` | `design/ScrollWell.astro` | The tray; used by `CardRow` |
| `QuoteBox` | `HomeMock` quote box | Testimonial in a box (pairs with `surface="staff"`) |
| `Callout` | `LessonsMock` callout | Gold-edged note |
| `Accordion` | `LessonsMock` accordions | `<details>` group, same look for FAQ and lists |
| `TileBand` | `TilePattern variant="staff"` | Horizontal rule of staff tiles |
| `TileWall` | `HomeMock` give-wall | Checker wall with a box cutting into it |
| `PhotoBreak` | `HomeMock` parade figure | Full-width photo as a separator |
| `Button` | `ButtonLink` + `.button-light` | `variant`: `primary` · `secondary` · `on-dark` |
| **Patterns** | `TilePattern`, `tiles/WallTile`, `lib/staff.ts` | Unchanged |
| **Layout** | `design/DesignHeader`, `DesignFooter`, `DonateButton`, `DesignLayout` | Replace `SiteHeader`, `SiteFooter`, `PageLayout` |

Retired after the move: `Section`, `PageHeader`, `Hero` (old), `RouterLinks`, `FactList`, `Actions` (becomes a utility or part of `Button` groups), `design/HomeMock`, `design/LessonsMock`, directions A and B.

## 4. Pages as section lists

```astro
---
// src/pages/index.astro
import PageLayout from '../layouts/PageLayout.astro';
import HomeHero from '../sections/home/HomeHero.astro';
import Paths from '../sections/home/Paths.astro';
import LessonsTeaser from '../sections/shared/LessonsTeaser.astro';
…
---
<PageLayout title="…" description="…">
  <HomeHero />
  <Paths />
  <LessonsTeaser side="left" />
  <CommunityStats surface="staff-green" />
  <BandTeaser side="right" />
  <MemberQuote audience="musicians" surface="staff" />
  <SupportWall />
  <UpcomingEvents surface="green" well />
  <PhotoBreak photo="parade" />
  <Leadership well />
  <Visit surface="tint" />
</PageLayout>
```

- Sections accept the shared options where it makes sense, so the same section can sit on a different surface on another page.
- Section files hold the copy (or read it from content collections) and choose blocks; they hold no layout CSS of their own beyond spacing tweaks.

## 5. The catalog (`/design/components`, beta only)

Modeled on the Bootstrap and Tailwind docs: a sidebar of categories, one page per component, each with a short description, live examples, an options table and usage notes.

- **Pages:** Overview · Tokens (colors with contrast pairs, type scale, spacing, radii, shadows, motion) · Surfaces · each Block · Patterns · Layout (header, footer, Donate) · Guidelines (green rhythm, corners, tile sizes, contrast, motion, SEO).
- **Examples live next to each component**: `Button.examples.astro` beside `Button.astro`, exporting a list of named examples (title, notes, rendered example). The catalog collects them with `import.meta.glob`, so adding a component's examples file adds its catalog page; nothing else to register.
- **Options tables** come from a small typed `meta` export in each examples file (option, values, default, description), so the docs sit with the code.
- **Viewport previews:** each example can be shown at phone, tablet and desktop widths side by side (an `<iframe>` of a bare example route at a fixed width), since many blocks change at 64rem.
- **Real content and images:** examples use the real collections and `astro:assets`, so the catalog can't drift from the site.
- **Never in production:** routes return no paths when `SITE_ENV` is production; `/design` stays in the sitemap's unlisted list and in `robots.txt` disallow on beta (beta is noindex anyway).
- **Copy-paste snippets:** each example shows the Astro usage (`<MediaFeature side="right" tone="tint">…`), generated from the example's props.

The brand guide (`/design/brand`) folds into the catalog as its Tokens and Patterns pages; the share image page stays.

## 6. Conventions

- **Naming:** components in PascalCase by what they are (`MediaFeature`), not how they look (`GreenBox`). Options are lowercase words from the table in §2.
- **Props:** typed `interface Props`, defaults in destructuring, one-line JSDoc per prop.
- **Slots:** a default slot for the main content; named slots only when a block has two content areas (`<Fragment slot="actions">`).
- **CSS inside components:** scoped `<style>` wrapped in the component's layer; tokens only (no raw colors or sizes except where documented, like tile geometry); mobile-first media queries at 48rem and 64rem.
- **No content in blocks;** no layout in content components; sections do the pairing.
- **Accessibility:** every interactive block has a keyboard path; decorative SVGs `aria-hidden`; headings follow page order (`level` prop).
- **Each component file starts with a short comment:** what it is, which options it takes, any rule it enforces.

## 7. Migration steps

1. Add `layers.css`, split `global.css` into `base.css` and `utilities.css`; wrap existing component styles in layers.
2. Expand tokens (shadows, motion, tile sizes, on-dark text) and replace raw values in the design components.
3. Move Direction C components into `surfaces/`, `blocks/` and `content/` with the §2 options; add `data-on` contrast context.
4. Replace `SiteHeader`, `SiteFooter`, `PageLayout` with C's header, footer, Donate button and layout.
5. Rebuild `index` and `lessons` from section files to match `/design/c/*`; compare screenshots at 390, 820 and 1280 px.
6. Rebuild the other pages (Join, Give, Impact, About, Events, event pages, Contact, Musicians, 404) with the same blocks.
7. Build the catalog and examples files; fold the brand guide in.
8. Remove directions A and B, the old components and `test.astro`; keep a few screenshots in `docs/` for B's heading-over-photo idea.
9. Checks: `astro check`, lint, format, build; Lighthouse on mobile for Home and Lessons (performance, accessibility, SEO ≥ 95; no layout shift from the header); keyboard pass; reduced-motion pass.

## 8. Open questions

- Breakpoints as tokens: CSS can't read custom properties in media queries. Options: document them as comments (planned), or adopt `@custom-media` through a PostCSS plugin (one small dependency).
- Whether the catalog's viewport previews should use iframes (true widths, slower) or container queries on blocks (faster, but blocks would need to respond to their container instead of the screen).
- Whether `Section` survives as a thin wrapper inside `Surface` for heading markup (`aria-labelledby`), or `Surface` takes a `title` prop itself.
