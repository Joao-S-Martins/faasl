# FAASL.org v3: Design system

**Status:** approved plan, revised after a front-end engineering review and a web design review (Oct 2026). Direction C (`/design/c/home`, `/design/c/lessons`) is the approved design; this turns its pieces into the site's component system.
Related: [`brand.md`](./brand.md) (colors, type, patterns, voice) · [`brief.md`](./brief.md) §3.1 (design rules) and §5.4 (SEO guardrails)

## Goals

1. **Change a look in one place.** A style lives in one component or token; pages never restyle things.
2. **Build pages by stacking sections.** A page reads as a short list of sections.
3. **Mix and match through a few options** with the same names everywhere.
4. **Plain CSS, structured and componentized.** No CSS framework. Simple, semantic HTML.
5. **A catalog like the Bootstrap or Tailwind docs**, beta only.
6. **The agreed rules hold:** 4.5:1 text contrast, gold only for the lyre and trim, whole-pixel tile sizes, mobile first, SEO guardrails, reduced motion.

Written guidelines, not code: "bold green is one tool among several, rarely twice in a row" stays a guideline, because exceptions may come.

## 1. Structure

```
src/styles/
  tokens.css      every named value
  base.css        reset, element defaults, contrast context
  utilities.css   a handful of helper classes
src/components/
  blocks/         layout pieces that don't know about content (Surface, MediaFeature, StatGrid…)
  content/        render a collection (PeopleList, EventCards, FaqList, StoreList…)
  layout/         header, footer, Donate button
  patterns/       TilePattern, WallTile (tile and staff art)
src/sections/     sections used on two or more pages (rule of two); one-off sections stay inline in the page
src/pages/        page metadata plus a list of sections
```

### CSS layers

`@layer reset, base, components, utilities;` is declared first thing in `<head>` (an inline style in `BaseLayout`), so the order never depends on how Astro bundles files.

- `reset` and `base` come from `base.css`; every component wraps its scoped `<style>` in `@layer components { … }`; `utilities.css` is `@layer utilities`.
- Unlayered CSS beats every layer, so **every style in `src/` declares a layer** (a `verify` check fails otherwise; the React island's CSS module is wrapped too). Inline `style=""` is only for computed values like a tile pattern's height.
- No `!important`, except the reduced-motion reset in the `reset` layer.

### Contrast context

Surfaces and boxes that paint a background set `data-on="light"` or `data-on="dark"`. That sets inherited custom properties, not descendant color rules, so the nearest painted ancestor always wins (a white card inside a green section keeps dark text):

```css
[data-on='light'] { --text: var(--color-ink); --heading: var(--color-hunter-green); --link: var(--color-hunter-green); --focus: var(--color-hunter-green); color: var(--text); }
[data-on='dark']  { --text: var(--color-white); --heading: var(--color-white); --link: var(--color-white); --focus: var(--color-white); color: var(--text); }
h1, h2, h3 { color: var(--heading); }  a { color: var(--link); }
:focus-visible { outline: 2px solid var(--focus); box-shadow: 0 0 0 4px var(--focus-halo); }
```

Focus rings stay visible on every background (white ring with a green halo on dark).

### Breakpoints

Two, written as comments in `tokens.css` (CSS can't read custom properties in media queries), mobile-first range syntax:
- `(width >= 40rem)`: tablet tweaks (wider gutters, side-by-side link rows, 3-up paths).
- `(width >= 64rem)`: desktop (photo-and-box overlaps side by side, full menu).

Tablets keep the phone layout for overlaps, with wider gutters (`clamp(1rem, 4vw, 2.5rem)`), text capped at about 65 characters and photos capped at 60% of the screen height. A lint check rejects other `min-width` values.

## 2. Shared options

| Option | Values | Meaning |
|---|---|---|
| `surface` | `plain` · `tint` · `green` | What a section sits on (white, off-white, hunter green) |
| `pattern` | `none` · `field` | The faint staff lines on top of the surface |
| `tone` | `plain` · `tint` · `green` | A box or card's own color |
| `side` | `left` · `right` | Photo side on desktop |
| `width` | `content` · `narrow` | Content width or reading width (about 65ch) |
| `well` | boolean | A sideways row sits in the recessed tray |
| `title`, `level`, `id` | | `Surface` renders the section heading itself, labels the section with it (`aria-labelledby`), and blocks inside default to `level` 3 |

Blocks derive light and dark styling from the context (no `tone="dark"` props on stats or trays).

Rules the blocks enforce: corners rounded where a box floats, square where it butts against a photo, box or section edge; tile sizes 48, 64 or 96 px with whole rows; tile walls and boxes snap to grout lines.

## 3. Tokens to add

- **Radii:** `--r-box` 8px · `--r-control` 6px · `--r-pill` 999px · `--r-tray` 16px (0 where a box meets something).
- **Shadows:** `--shadow-float` `0 8px 24px rgb(0 0 0 / 0.12)` and none; the tray's inset shadow.
- **Space:** `--space-section` `clamp(3.5rem, 8vw, 7rem)`; heading to body 1.5rem; body to buttons 2rem.
- **Gutters:** `--gutter` `clamp(1rem, 4vw, 2.5rem)`.
- **Colors** for the tray rims and hover (`--color-hunter-dark`), the focus halo, the grout and frame grays, and overlays via `color-mix()`; no raw colors in components.
- **Motion:** `--duration-fast` 0.2s.
- **Header heights** (`--header-h` large and compact) for `scroll-padding-top`.

## 4. Components (from Direction C)

| Component | Folder | Notes |
|---|---|---|
| `Surface` | blocks | `surface`, `pattern`, `width`, `title`, `level`, `id`; sets `data-on` |
| `Hero` | blocks | Photo with the text box overlapping its bottom, sitting on the next section's surface; still first, video later; `object-position` tuned for phones |
| `PageHero` | blocks | Smaller hero for inner pages |
| `PathLinks` | blocks | "I want to…" links, inside the content width, whole card clickable with an arrow; 3-up from tablet |
| `MediaFeature` | blocks | Photo with an overlapping box; `side`, `tone` |
| `PhotoBreak` | blocks | Full-width photo as a separator |
| `PhotoBand` | blocks | Full-width photo with a box over it (kept for later) |
| `StatGrid` | blocks | Icon, number, label in aligned rows; balanced label wraps |
| `FactRow` | blocks | Small label, big answer (for Lessons: cost, ages, when, how to start) |
| `StepRow` | blocks | Numbered boxes that butt together; last one emphasized |
| `CardRow` + `ScrollWell` | blocks | Sideways row on phones and tablets; focusable region for keyboard scrolling; `well` |
| `QuoteBox` | blocks | Testimonial in a box |
| `Callout` | blocks | Gold-edged note |
| `Accordion` | blocks | `<details>` group with a green chevron, 56px rows, on the page grid |
| `TileBand`, `TileWall` | blocks | Tile rule; checker wall with a box snapped to the grout |
| `Button`, `ButtonRow` | blocks | `primary` · `secondary`, adapting to the context; `ButtonRow` replaces `Actions` |
| `LinkMore` | blocks | "All events", "Meet the team": 44px tall with an arrow |
| `PeopleList`, `EventCards`, `FaqList`, `StoreList`, `Testimonial`… | content | Existing content components, restyled |
| `SiteHeader`, `SiteFooter`, `DonateButton`, `PageLayout` | layout | From C (see §5) |
| `TilePattern`, `WallTile` | patterns | Deterministic ids (no `Math.random()`) |

Retired: `Section`, `PageHeader`, old `Hero`, `RouterLinks`, `FactList`, `Actions`, the `design/` prototypes, directions A and B, `test.astro`.

## 5. Header, menu and footer fixes (from the reviews)

- **Header over photos:** a dark fade of at least 60% behind all header text (text shadow doesn't count toward contrast); the name balanced as "Portuguese Band / of San Leandro"; compact header whenever the screen is under 500px tall.
- **Header state:** pages with a landing photo render `<html data-hero="in">` from the server; pages without one start compact (no flash).
- **Phone menu:** no text shadow; scrolls when taller than the screen; closes on Escape (focus back to the button), outside tap and link tap; links in two groups (Lessons, Join, Events · Give, Impact, About, Contact); Donate as a green button at the bottom. Works without JavaScript.
- **Fixed header:** `scroll-padding-top` so anchors, skip links and focused items aren't hidden under it; bottom padding for the Donate button.
- **Donate button:** a white ring so it shows on green.
- **Desktop nav links** padded to 44px tall.
- **Footer:** no mid-word breaks in "501(c)(3)" or ZIP+4; bottom rule aligned to the grid.

## 6. Page decisions (owner, Oct 2026)

**Home:** hero on green, Learn / Play / Give, lessons feature, stats on **white with bold hunter-green numbers**, band feature, member quote on the off-white staff field, support tile wall (phone layout keeps the tiles above the box), **"Come see us" on green with the staff field** with events in the tray, parade photo, leadership in the tray, **"Visit us" kept, with a photo of the clubhouse** (TODO: photo), footer.

**Lessons:** hero, facts (small label, big answer; 4th fact "How to start"), "Plan your first visit" button, how it works (step boxes, the last "The volunteer band"), staff tile rule, teacher, what students learn, instrument picker (buttons across the full width, player under them, scrolls into view on phones; unavailable instruments in ink with a dashed border), getting ready and FAQ accordions, **"Ready to start?" on off-white with the staff field**, with **a placeholder for a different quote** (TODO: a student or family quote).

## 7. The catalog (`/design/components`, beta only)

Modeled on the Bootstrap and Tailwind docs: a sidebar of categories; one page per component with a description, live examples, an options table and usage notes; Guidelines pages generated from this document.

- **Examples are small files** beside each component (`blocks/MediaFeature/examples/right-tint.astro`), collected with `import.meta.glob` twice: once to render, once with `?raw` to show the source exactly as written (Astro's built-in `<Code>` highlights it).
- **Options tables** come from a typed `meta` export keyed by the component's `Props`, so `astro check` fails when an option is undocumented.
- **Viewport previews:** phone, tablet and desktop iframes, loaded on demand and scaled to fit.
- **Real content and images**, so the catalog can't drift from the site.
- **Never in production:** one `src/pages/design/[...path].astro` route returns no paths in production; CI checks `dist/design` doesn't exist in production builds. Beta is already noindex.
- The brand guide becomes the catalog's Tokens and Patterns pages; the share image page stays.

## 8. Checks

- Existing: `astro check`, lint, format, build, `check:seo` (canonical links match the sitemap).
- Add: every `<style>` declares a layer; only the two breakpoints; no `dist/design` in production; stable HTML between builds.
- Before calling the migration done: axe on every page at 390 and 1280; contrast of every surface × tone pair, the header over photos and focus rings; Lighthouse mobile ≥ 95 on Home and Lessons (layout shift from the header and fonts); keyboard-only pass; JavaScript off; 200% zoom; 320px wide and sideways phone; Lessons print preview.

## 9. Also from the reviews

- **Fonts:** preload the two most-used files and add size-matched fallbacks (or Astro's Fonts API) so text doesn't jump on load; drop unused weights.
- **Images:** quality about 70, smaller `sizes` for features on phones and tablets.
- **Daily rebuild:** upcoming events are filtered at build time, so a scheduled daily build keeps past events off the site (with the weekly content release in `deployment.md`).
- **Later:** the instrument picker could become a small plain-JavaScript component, dropping React.

## 10. Migration steps

1. Styles: layers, tokens, `base.css` (with the contrast context), `utilities.css`; checks.
2. Layout: header, menu, footer, Donate button and `PageLayout` from C with the §5 fixes.
3. Blocks and content components with the §2 options.
4. Home and Lessons rebuilt from blocks per §6; compare at 390, 820, 844×390, 1280 and 1600.
5. The other pages on the same blocks.
6. The catalog.
7. Remove A, B, the prototypes, old components and `test.astro`; keep a few screenshots of B's heading-over-photo idea in `docs/`.
8. The §8 checks.
