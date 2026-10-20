# FAASL.org v3 — Architecture Proposal

Status: **Astro + Cloudflare decided** (Oct 2026). Goals, requirements and open decisions are in [`brief.md`](./brief.md); the plan is in [`todo.md`](./todo.md). Content lives in [`content.md`](./content.md).

## Goals (from your brief)

1. **Simple:** no database, no server to maintain.
2. **Free (or nearly free) hosting.**
3. **Great SEO going forward.**
4. **Builds on your React skills**, with room to learn something new.
5. Easy for you (and eventually other volunteers) to update content.

## TL;DR recommendation

| Layer | Pick | Why |
|---|---|---|
| Site framework | **Astro** | Outputs plain static HTML (ideal for SEO). You can write components in React when you want to, with zero JS shipped by default. Markdown content and image optimization are built in. Very active, and funded by Cloudflare since 2026. See §1. |
| Hosting | **Cloudflare** (Pages / Workers static assets), free plan | Free, fast global CDN. Also handles **DNS and all the vanity-subdomain redirects** in one dashboard, which replaces `.htaccess`. |
| Contact form | **Web3Forms** or **Formspree** free tier (or a Cloudflare Pages Function later) | No server; submissions emailed to info@faasl.org. Spam check via honeypot + Cloudflare Turnstile. |
| Events | Google Calendar (unchanged) **plus** a build-time fetch of the Performances calendar | Events render as real HTML with `Event` structured data, so Google can show them. |
| Newsletter | Mailchimp (unchanged) | Already works. |
| Analytics | Cloudflare Web Analytics (free, cookieless) + Google Search Console | The old Google Analytics (UA) tag is dead; no cookie banner needed. |
| Deploys | GitHub Actions → Cloudflare Workers | Beta deploys automatically; production only after your approval in GitHub. See [`deployment.md`](./deployment.md). |

Monthly cost: **$0** (you keep paying for the domain registration only).

---

## 1. Framework options

Every option below can output a fully static site, so none needs a server or database. Data was gathered on **19 Oct 2026**: GitHub stars from each repo page, release counts and dates from the npm registry. Popularity and satisfaction figures come from the [State of JS 2025 meta-frameworks survey](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/).

### 1.1 Features

| | **Astro** | **Next.js** (static export) | **React Router v7** (framework mode, pre-render) | **TanStack Start** (pre-render) | **Docusaurus** | **Gatsby** | **Eleventy / Build Awesome** |
|---|---|---|---|---|---|---|---|
| Page templates | `.astro` (HTML + JSX-like syntax), Markdown, MDX | React (JSX) | React (JSX) | React (JSX) | React + MDX | React (JSX) | Nunjucks, Liquid, WebC, Markdown, etc. |
| React components | ✔ first-class "islands": only interactive parts ship JS | ✔ whole site is React | ✔ whole site is React | ✔ whole site is React | ✔ whole site is React | ✔ whole site is React | ⚠ not first-class (DIY bundling, or via plugins) |
| JS shipped on a content page | **~0 KB** by default | React runtime + page data | React runtime + page data | React runtime + page data | React runtime | React runtime | ~0 KB |
| Content / Markdown | ✔ **Content collections** with typed schemas | ⚠ bring your own (MDX plugin, Velite, etc.) | ⚠ bring your own | ⚠ bring your own | ✔ docs/blog/pages built in (docs-shaped) | ✔ GraphQL data layer (complex) | ✔ data cascade + Markdown built in |
| Image optimization | ✔ built in (`astro:assets`: responsive, WebP/AVIF, lazy-load) | ⚠ `next/image` needs a custom loader or is disabled in static export | ✘ none built in | ✘ none built in | ⚠ plugin (`plugin-ideal-image`) | ✔ `gatsby-plugin-image` (excellent) | ✔ `eleventy-img` (excellent) |
| Sitemap / SEO helpers | ✔ official sitemap integration; easy per-page head | ✔ Metadata API, sitemap | ⚠ manual `meta` exports | ⚠ manual head management | ✔ built in | ✔ plugins | ⚠ plugins / manual |
| Best fit | Content sites, marketing sites, blogs | Web apps, large sites | Web apps | Web apps | Documentation sites | (legacy) content sites | Content sites without React |
| Fit for FAASL | ★★★★★ | ★★★ | ★★ | ★★ | ★★ | ★ | ★★★ |

### 1.2 Health: development activity, popularity and future

| | **Astro** | **Next.js** | **React Router v7** | **TanStack Start** | **Docusaurus** | **Gatsby** | **Eleventy / Build Awesome** |
|---|---|---|---|---|---|---|---|
| GitHub stars | 63.3k | 143.1k | 56.6k | 15.2k (TanStack Router repo) | 66.5k | 55.9k | 20.0k |
| Latest release | 7.4.1 (19 Oct 2026) | 16.4.2 (15 Oct 2026) | 8.5.0 (19 Oct 2026) | 1.169.3 (16 Oct 2026) | 3.10.2 (10 Jul 2026) | 5.16.1 (10 Feb 2026) | 3.1.7 (15 Oct 2026) |
| npm releases, last 12 months | 153 | 579 | 166 | 387 | 222 | **7** | 9 |
| Developer sentiment (State of JS 2025) | **Highest satisfaction**; ~94% retention | **Highest usage** (~45% use it at work), but falling satisfaction | Long-standing, widely used router | Newer and growing quickly | Popular for docs | Lowest retention | Well-loved, niche |
| Who backs it | **Cloudflare** (acquired the Astro team Jan 2026; stays MIT-licensed with open governance) | Vercel | Shopify | TanStack (independent, sponsor-funded) | Meta | Netlify (largely dormant) | Font Awesome (renaming to "Build Awesome"; commercial "Pro" tier in progress) |
| Outlook | **Strong.** Very active, well funded, and keeps its multi-host promise | Strong, but tied to Vercel's priorities; app-focused | Strong for apps | Promising but young | Stable, but docs-focused | ⚠ **Avoid.** In maintenance mode | Stable core; some uncertainty around the rebrand and monetization |

### 1.3 Recommendation: Astro

> A closer comparison of Astro, Docusaurus and TanStack Start is in [`framework-deep-dive.md`](./framework-deep-dive.md). Galleries, content organization, tagging and future expansion are covered in [`astro-extensibility.md`](./astro-extensibility.md).

- It's the only option that is built **for content sites**, uses **templates**, and treats **React components** as a first-class add-on, while shipping almost no JavaScript. That's the best combination for SEO and page speed.
- Content collections and image optimization are built in, so `content.md` maps straight onto typed Markdown files, and your existing JPGs get resized and converted automatically.
- Very active development with the strongest developer satisfaction, and as of 2026 a large company funding it. Astro is MIT-licensed and runs on any host, so we're never locked into Cloudflare.
- The `.astro` syntax is close to JSX, so it's a small step from React. It's also a useful new skill.

**Runner-up: Next.js** if you'd rather stay 100% in React. It's the most popular and very safe long-term, but it's more machinery than an 8-page content site needs, it ships React to every page, and its image optimization doesn't work in static-export mode without extra setup.

Not recommended: **Gatsby** (dormant), **Docusaurus** (shaped for docs), **React Router / TanStack Start** (app frameworks with no built-in content or image tooling). **Eleventy** is excellent but has no first-class React, and its rebrand adds uncertainty.

Sources: [Astro on GitHub](https://github.com/withastro/astro), [Next.js on GitHub](https://github.com/vercel/next.js), [React Router on GitHub](https://github.com/remix-run/react-router), [TanStack Router on GitHub](https://github.com/TanStack/router), [Docusaurus on GitHub](https://github.com/facebook/docusaurus), [Gatsby on GitHub](https://github.com/gatsbyjs/gatsby), [Eleventy on GitHub](https://github.com/11ty/eleventy), [State of JS 2025: meta-frameworks](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/), [Cloudflare acquires Astro (Business Wire, Jan 2026)](https://secure.businesswire.com/news/home/20260116386991/en/Cloudflare-Acquires-Astro-to-Accelerate-the-Future-of-High-Performance-Web-Development), [Gatsby Cloud evolution (Netlify)](https://www.netlify.com/blog/gatsby-cloud-evolution/), [Eleventy is becoming Build Awesome](https://www.11ty.dev/blog/build-awesome/).

---

## 2. Hosting options (free tiers)

Free-plan limits change, so check the current pricing pages before committing. As of this writing, all four are comfortably free for a site this size.

| | **Cloudflare** | **Netlify** | **GitHub Pages** | **Vercel** |
|---|---|---|---|---|
| Static hosting | ✔ free, unlimited bandwidth | ✔ free (credit-based limits) | ✔ free | ✔ free (Hobby) |
| Auto deploy from GitHub | ✔ | ✔ | ✔ (via Actions) | ✔ |
| Preview URL per branch / PR | ✔ | ✔ | ✘ | ✔ |
| **Vanity subdomain redirects** (`events.faasl.org` → Google Calendar) | ✔ **Redirect Rules**, all in one place | ⚠ possible, but each subdomain must be added to the site | ✘ not supported | ⚠ possible via config |
| DNS hosting | ✔ free (move DNS to Cloudflare) | ✔ | ✘ | ✔ |
| Built-in form handling | ✘ (use a form service or a small Function) | ✔ Netlify Forms (free quota) | ✘ | ✘ |
| Non-profit OK on free plan | ✔ | ✔ | ✔ | ⚠ **Hobby plan is for personal, non-commercial use**. An organization should be on a paid plan. |
| Analytics | ✔ free, cookieless | paid add-on | ✘ | paid add-on |

**Why Cloudflare wins here:** your 20+ vanity subdomains are the trickiest part of leaving the shared host. Today they rely on Apache `.htaccess` rules. With faasl.org's DNS on Cloudflare, each subdomain becomes one Redirect Rule (or one Bulk Redirect list entry) in the same dashboard as the site. Nothing else to maintain.

**Runner-up:** Netlify. It's slightly simpler if you want the form handled by the host (Netlify Forms), but the subdomain redirects are clunkier.

### Email: don't break it

Moving DNS means copying **every existing record**, especially the **MX records** for info@faasl.org (and any TXT/SPF/DKIM records). Cloudflare imports existing records automatically when you add the domain, but we'll check them against the current host before switching nameservers. Your old TODO mentions "Point MX to Google", so confirm where faasl.org email actually lives today.

---

## 3. Replacing the server-side bits

| v2 feature | How it worked | v3 replacement (no server) |
|---|---|---|
| Contact form | `cgi/forms.php` on the shared host, using PHP `mail()` | Form posts to **Web3Forms** / **Formspree** (free tiers), which email info@faasl.org. Spam: hidden honeypot field + Cloudflare Turnstile instead of the "22" math question. *Later option:* a ~30-line Cloudflare Pages Function. |
| Vanity subdomains | Apache `.htaccess` rewrite rules | Cloudflare Redirect Rules (see `content.md` §7 for the list) |
| Old page URLs (`/students.html`…) | — | 301 redirects in a `_redirects` file: `/students.html → /lessons`, etc. |
| Calendar | Google Calendar iframe | Keep the iframe for members **and** render upcoming performances as HTML at build time from the public iCal feed. A scheduled rebuild (e.g. daily) keeps it fresh. |
| Newsletter | Mailchimp links | unchanged |
| Deploy | Grunt + FTP with a password file | Push to GitHub, and Cloudflare builds and deploys. No credentials on anyone's laptop. |

---

## 4. Proposed site map

> **Updated:** the audience-based site map in [`strategy.md`](./strategy.md) §7 replaces this table (adds Give, Sponsor, Impact and Volunteer pages). Main address is `www.faasl.org`.

Today the site is mostly one long page with in-page anchors. For SEO, **each topic people search for should have its own URL** with its own title and description.

| URL | Content (from `content.md`) | Primary search intent |
|---|---|---|
| `/` | Intro, Learn / Grow / Perform teasers, upcoming events, CTA | "Portuguese band San Leandro" |
| `/lessons` | Free lessons, instruments, materials & stores, FAQ | "free music lessons San Leandro / East Bay" |
| `/join` | Joining the volunteer band (adults, returning players, ex-Remote Restart idea) | "community band East Bay", "adult band" |
| `/about` | History, name, leadership, **teachers (Edgard Gonzalez)**, our hall | "FAASL", "Filarmonica Artista Amadora" |
| `/events` | Upcoming performances & social events, calendar subscribe links | "Holy Ghost parade band", "Cherry Festival" |
| `/stories` | Member stories (brought in from Adobe Express) | brand + trust |
| `/support` | Donate, volunteer, 501(c)(3)/EIN | "donate music education San Leandro" |
| `/contact` | Form, address, phone, social | — |
| `/members` (footer link, `noindex`) | Onboarding forms, BAND app, Remind, calendars, contacts, play-along playlist (see `content.md` §6b) | — |

The COVID-19 and Remote Restart pages are dropped (their URLs redirect to Home). Whether the hall gets a mention on `/about` is still open.

---

## 5. SEO plan

**Technical (built into the templates once, applied to every page)**
- Unique `<title>` and meta description per page, editable in each page's front-matter
- Canonical URLs, `https` only, one host (`www.faasl.org` *or* `faasl.org`, with the other redirecting)
- Auto-generated `sitemap.xml` and a sane `robots.txt` (the current one blocks `/img` and `/css`, which keeps Google from seeing your photos and styles)
- Open Graph + Twitter/X cards per page, with share images generated per page
- **Structured data (JSON-LD):**
  - `NGO` / `MusicGroup` with name, alternate name (FAASL), logo, address, phone, founding year, social `sameAs` links
  - `Event` for each upcoming performance
  - `FAQPage` for the lessons FAQ
  - `Person` for leaders and teachers
  - `BreadcrumbList`
- Real semantic HTML: one H1 per page, logical headings, descriptive alt text, real `<a>` links
- Performance: static HTML, optimized responsive images (lazy-loaded), self-hosted fonts instead of Typekit, near-zero JS. Aiming for green Core Web Vitals.
- Accessibility (WCAG AA): contrast, keyboard nav, no `user-scalable=no` (the current site blocks pinch-zoom)
- 301 redirects from every old URL

**Off-site (one-time setup, mostly by you)**
- Google Search Console + Bing Webmaster Tools: verify, submit the sitemap
- **Google Business Profile** for the clubhouse. This is probably the biggest single local-SEO lever for "music lessons near me".
- Matching name / address / phone (NAP) across Google, Facebook, Yelp, city and non-profit directories
- Ask partner organizations (festas, the Cherry Festival, the school district) to link to faasl.org

**Ongoing**
- Fresh content: event recaps, member stories, new-teacher announcements (like Edgard). Markdown files make posting quick.

---

## 6. Content editing workflow

- **Phase 1 (launch):** content in Markdown in this repo. You edit on GitHub (even from your phone), commit, and the site redeploys in about a minute. Each branch gets a preview URL.
- **Phase 2 (optional):** if other board members need to edit without touching GitHub, add a free Git-based CMS such as **Pages CMS**, **Decap CMS** or **TinaCMS**. It's a friendly form-based editor that writes the same Markdown files. Still no database.

---

## 7. Proposed repo layout (v3)

```
/
├── docs/                  ← this proposal + content.md
├── src/
│   ├── content/           ← Markdown content (pages, people, faqs, stories)
│   ├── components/        ← .astro and React components
│   ├── layouts/           ← base layout with SEO head
│   └── pages/             ← routes
├── public/                ← favicon, robots.txt, _redirects, static files
├── astro.config.mjs
└── package.json
```

The legacy `www/` folder would be removed once v3 launches (it stays in git history).

---

## 8. Migration plan

1. ✅ Audit content → `docs/content.md` *(this branch)*
2. You review `content.md` and work through `todo.md` (leadership, teacher and COVID/Remote decisions are done)
3. Agree on the architecture (this doc) and a visual direction (I can mock up 2–3 options)
4. Build v3 on this branch. Deploy previews to a free `*.pages.dev` URL for review.
5. Pre-launch: set up form service, Search Console, analytics; test every redirect
6. Launch: move DNS to Cloudflare (copying MX records), add redirect rules, switch over
7. Post-launch: submit sitemap, set up Google Business Profile, retire the shared host after ~30 days

## Open questions for you

1. Who needs to edit the site besides you? (This decides whether we need a CMS in phase 2.)
2. Is Cloudflare OK for DNS, or is DNS managed somewhere you'd rather not change?
3. Where does faasl.org email live today (shared host, Google Workspace, other)?
4. Do you want online donations on the site? Through which provider?
5. Anything you'd like to learn along the way (e.g. Astro, TypeScript, Tailwind) vs. keep familiar?
