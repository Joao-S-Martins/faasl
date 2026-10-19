# Deep dive: Astro vs. Docusaurus vs. TanStack Start

A closer look at the three frameworks for the FAASL v3 site. This builds on the comparison tables in [`architecture.md`](./architecture.md) §1. Facts are as of **19 Oct 2026**.

## At a glance

| | **Astro** | **Docusaurus** | **TanStack Start** |
|---|---|---|---|
| What it's built for | Content-driven websites | Documentation sites (docs, blog, a few pages) | Full-stack React **apps** |
| Mental model | HTML templates with optional React "islands" | A React app with a fixed theme that you configure and customize | A React app with type-safe routing, data loaders and server functions |
| Current version | 7.4 (Astro 7 added a Rust compiler and faster builds) | 3.10, the **last 3.x release**; v4 is next (opt-in `future.v4` flags today) | 1.169 (very frequent releases) |
| Releases, last 12 months | 153 | 222 | 387 |
| Backing | Cloudflare (since Jan 2026), MIT-licensed | Meta, MIT-licensed | TanStack (independent, sponsor-funded), MIT-licensed |
| Static output | ✔ default | ✔ default | ✔ opt-in `prerender` (with link crawling) |
| JS shipped on a content page | ~0 KB unless you add an island | Full React app (hydrates every page) | Full React app (hydrates every page) |
| Content layer | ✔ Content collections (Markdown/MDX/YAML/JSON + schemas) | ✔ Docs + blog plugins (sidebars, versioning, tags) | ✘ none; add a library (e.g. Content Collections, Velite) |
| Image optimization | ✔ built in (`<Image>`, `<Picture>`) | ⚠ plugin (`plugin-ideal-image`) | ✘ none; add a library |
| Layout freedom | Total: you write every layout | Limited: the theme owns the layout; change it by "swizzling" | Total: you write every component |
| Fit for FAASL | ★★★★★ | ★★ | ★★ |

---

## 1. Astro

### How it works
- Pages live in `src/pages/` (file = URL). An `.astro` file has a code fence at the top (runs at build time) and an HTML template below with JSX-style `{expressions}`.
- Layouts are ordinary components that use `<slot />` for the page content. There's no theme imposing structure.
- React components are added with the official `@astrojs/react` integration. They render to HTML at build time and **only ship JavaScript if you ask** with a directive: `client:load`, `client:idle` or `client:visible` (load when scrolled into view).
- **Content collections:** you point a collection at a folder of Markdown/YAML files and give it a schema (Zod). Every file is validated at build time and fully typed in your templates. A missing photo or a typo in a field name fails the build instead of shipping a broken page.
- **Images:** `astro:assets` resizes, converts to WebP/AVIF, sets width/height (no layout shift) and lazy-loads. Images referenced from content collections are checked and optimized too.
- MDX is supported, so you *can* drop React components inside Markdown when you want.

### What a FAASL teacher looks like in Astro

`src/content/people/edgard-gonzalez.md`
```md
---
name: Edgard Gonzalez
role: Music Teacher
group: teachers
photo: ./edgard-gonzalez.jpg
order: 1
---
Edgard teaches our beginner and intermediate classes…
```

`src/content.config.ts`
```ts
const people = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/people' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['leadership', 'teachers']),
    photo: image(),
    order: z.number(),
  }),
});
```

`src/components/PersonCard.astro`
```astro
---
import { Image } from 'astro:assets';
import { render } from 'astro:content';
const { person } = Astro.props;
const { Content } = await render(person);
---
<article class="card">
  <Image src={person.data.photo} alt={`Portrait of ${person.data.name}`} width={300} height={300} />
  <h3>{person.data.name}</h3>
  <p class="role">{person.data.role}</p>
  <Content />
</article>
```

An interactive React piece, such as the instrument video picker, is one line in a page: `<InstrumentPicker client:visible instruments={instruments} />`.

### Strengths for FAASL
- Output is plain, fast HTML: the best starting point for SEO and Core Web Vitals.
- Content collections fit `content.md` exactly: pages, people, FAQs, instruments, stores, events.
- Built-in image pipeline fixes the current site's biggest performance problem.
- You design every pixel. No theme to fight.
- Official sitemap integration; per-page `<head>` and JSON-LD are just markup in the layout.
- Runs on any static host; no lock-in to Cloudflare despite the ownership.

### Weaknesses
- `.astro` is a new syntax to learn (small step from JSX, but different: no hooks or state in `.astro` files; state lives in islands).
- Sharing state between separate islands takes a small extra library (e.g. nanostores). FAASL doesn't need this.
- Fast-moving: two major versions (6 and 7) in 2026. Upgrades have been smooth, but plan for one per year.

### If you like Docusaurus's organization
Astro's official docs theme, **Starlight**, gives you Docusaurus-style sidebars, search and docs structure *inside* an Astro site. It's an option for your personal project too: you'd keep the organization and gain Astro's layout freedom.

---

## 2. Docusaurus

### How it works
- Built from **plugins** (`docs`, `blog`, `pages`) and a **theme** (`theme-classic`, styled with the Infima CSS framework).
- Content is Markdown/MDX organized into docs with **sidebars**, versioning, tags and i18n. This is the organizational strength you like.
- Custom pages are React components in `src/pages/`.
- Every page is pre-rendered to HTML, then **hydrates into a React single-page app**, so all pages ship the React runtime and theme code.
- Changing the look beyond CSS variables means **swizzling**: copying ("ejecting") or wrapping internal theme components into your project. Many components are marked *unsafe* to swizzle because their internals can change between versions.

### Why the templating feels confining
That's by design. Docusaurus is a documentation **product**, not a general site builder. The layout (navbar, sidebar, footer, doc page, blog page) belongs to the theme. You configure it, restyle it, and swizzle the pieces you must change. Every swizzled component becomes yours to maintain, and v4 is coming with breaking changes. A marketing-style site (big photo heroes, custom sections, cards) means fighting the theme on almost every page.

### What a FAASL teacher looks like in Docusaurus
There's no built-in "collection" for people. Options:
- Hard-code an array in a React page (`src/pages/about.tsx`), or
- Put people in a JSON/YAML file and import it, or
- Write a custom plugin (`loadContent` / `contentLoaded`) to read a folder of Markdown files and expose them as data. That's possible, but it's real framework-plugin work.

Images in that data aren't optimized unless you wire up `plugin-ideal-image` for each one.

### Strengths
- Excellent for docs: sidebars, versioning, search (Algolia), i18n, admonitions, code blocks.
- Mature, stable, backed by Meta, big community.
- 100% React, so no new syntax.
- Good SEO defaults: metadata, sitemap plugin, canonical URLs.

### Weaknesses for FAASL
- Theme-driven layout fights a photo-heavy, design-led community site.
- Ships a full React app to every page: heavier than needed.
- No content model for people, FAQs, instruments, events without custom plugin work.
- v4 migration ahead (3.10 is the last 3.x), plus maintenance of anything swizzled.

**Verdict:** the right tool for your personal docs-style project, the wrong one for faasl.org.

---

## 3. TanStack Start

### How it works
- A full-stack React framework built on **TanStack Router** and Vite. File-based routes in `src/routes/` with **end-to-end type safety**: links, URL params and search params are all type-checked.
- Each route can have a `loader` (fetch data before render) and a `head()` function for title/meta tags.
- **Server functions** (`createServerFn`) let you write backend code next to your components. This is its headline feature, but it needs a server or edge runtime.
- **Static prerendering** is an opt-in setting on the Vite plugin. It renders listed routes (or crawls links) to HTML at build time, so the output can go on any static host.
- Pages hydrate into a full React app (with TanStack Router's client-side navigation).

### What a FAASL teacher looks like in TanStack Start
There's no content layer. You'd add a library such as **Content Collections** (which has a TanStack Start integration) or **Velite** to turn Markdown into typed data, then render it in a route component. For images, add something like `vite-imagetools` or `unpic`. It all works, but you assemble and maintain the stack yourself.

### Strengths
- Best-in-class type safety and data loading, if you're building an *app*.
- Pure React, which you already know, with modern tooling (Vite).
- Server functions give you an easy path to dynamic features later (sign-ups, member portal), on a host with a runtime (Cloudflare Workers, Netlify, Vercel).
- Very active development; growing quickly.

### Weaknesses for FAASL
- Built for apps; static content sites are a secondary use case.
- No content layer, no image optimization, no sitemap built in: you'd add and wire up 3–4 libraries.
- Ships React to every page.
- Very fast-moving (≈1 release every day). Younger API, more churn to keep up with.
- Smaller community and fewer content-site examples than Astro or Docusaurus.

**Verdict:** a great thing to learn for your next React *app*. For faasl.org you'd spend most of your time rebuilding what Astro gives you out of the box.

---

## 4. Scored against FAASL's needs

Weights reflect your brief (simplicity and SEO first). Score 1–5.

| Need | Weight | Astro | Docusaurus | TanStack Start |
|---|---|---|---|---|
| SEO & page speed (static HTML, little JS) | ×3 | 5 | 3 | 3 |
| Simplicity: no server, little to maintain | ×3 | 5 | 3 | 2 |
| Content model (people, FAQs, instruments, events from Markdown) | ×2 | 5 | 2 | 2 |
| Image optimization built in | ×2 | 5 | 2 | 1 |
| Design freedom for a photo-led community site | ×2 | 5 | 2 | 5 |
| Uses your React skills | ×1 | 4 | 5 | 5 |
| Long-term outlook / backing | ×2 | 5 | 4 | 4 |
| Non-developer editing later (Git-based CMS on Markdown) | ×1 | 5 | 4 | 3 |
| **Weighted total (max 80)** | | **79** | **47** | **47** |

## 5. Recommendation

**Astro** for faasl.org. It's the only one of the three designed for exactly this kind of site. It gives you Docusaurus's "content in organized Markdown files" strength without the theme cage, and you can still use React wherever you want it.

Ways to use the other two:
- **Docusaurus:** keep it for your personal project, or try moving that project to Astro + Starlight if the templating keeps bothering you.
- **TanStack Start:** a good candidate if FAASL later needs a real app (member portal, attendance, uniform sign-out). That could live on a subdomain beside the Astro site.

## Sources
- [Astro: what's new, June 2026](https://astro.build/blog/whats-new-june-2026/) and [July 2026](https://astro.build/blog/whats-new-july-2026)
- [Cloudflare acquires Astro (Business Wire, Jan 2026)](https://secure.businesswire.com/news/home/20260116386991/en/Cloudflare-Acquires-Astro-to-Accelerate-the-Future-of-High-Performance-Web-Development)
- [Docusaurus 3.10 release notes](https://docusaurus.io/blog/releases/3.10) and [changelog](https://docusaurus.io/changelog)
- [TanStack Start SEO guide](https://tanstack.com/start/latest/docs/framework/react/guide/seo)
- [Cloudflare changelog: TanStack Start prerendering (Dec 2025)](https://developers.cloudflare.com/changelog/2025-12-19-tanstack-start-prerendering)
- [State of JS 2025: meta-frameworks](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/)
- Release counts and dates: npm registry (`astro`, `@docusaurus/core`, `@tanstack/react-start`), 19 Oct 2026
