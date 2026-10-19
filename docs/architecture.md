# FAASL.org v3 — Architecture Proposal

Status: **draft for discussion**. Nothing here is built yet. Content lives in [`content.md`](./content.md).

## Goals (from your brief)

1. **Simple:** no database, no server to maintain.
2. **Free (or nearly free) hosting.**
3. **Great SEO going forward.**
4. **Builds on your React skills**, with room to learn something new.
5. Easy for you (and eventually other volunteers) to update content.

## TL;DR recommendation

| Layer | Pick | Why |
|---|---|---|
| Site framework | **Astro** | Outputs plain static HTML (ideal for SEO). You can write components in React when you want to, with zero JS shipped by default. Markdown content is built in. |
| Hosting | **Cloudflare** (Pages / Workers static assets), free plan | Free, fast global CDN. Also handles **DNS and all the vanity-subdomain redirects** in one dashboard, which replaces `.htaccess`. |
| Contact form | **Web3Forms** or **Formspree** free tier (or a Cloudflare Pages Function later) | No server; submissions emailed to info@faasl.org. Spam check via honeypot + Cloudflare Turnstile. |
| Events | Google Calendar (unchanged) **plus** a build-time fetch of the Performances calendar | Events render as real HTML with `Event` structured data, so Google can show them. |
| Newsletter | Mailchimp (unchanged) | Already works. |
| Analytics | Cloudflare Web Analytics (free, cookieless) + Google Search Console | The old Google Analytics (UA) tag is dead; no cookie banner needed. |
| Deploys | `git push` → automatic build & deploy | Every branch/PR gets its own preview URL to review before going live. |

Monthly cost: **$0** (you keep paying for the domain registration only).

---

## 1. Framework options

All three below produce a static site, so none needs a server or database.

### ✅ Astro (recommended)

- **What it is:** a static-site framework built around content. Pages are `.astro` files (HTML with a JSX-like syntax that will feel familiar). You can drop in **React components** wherever you need interactivity (the instrument video picker, the contact form, a photo gallery), and only those components ship JavaScript ("islands").
- **SEO:** every page is pre-rendered HTML. It has a built-in sitemap integration, image optimization (`astro:assets` creates responsive WebP/AVIF from your JPGs), and it's easy to give every page its own title, description and structured data.
- **Content:** "content collections" read Markdown/YAML with a typed schema. `content.md` splits naturally into `src/content/pages/*.md`, `src/content/people/*.md` (leaders + teachers like Edgard), `src/content/faqs/*.md`, etc. Adding a teacher is adding one small Markdown file.
- **Learning curve:** low for a React developer. This is the "learn something new" option that doesn't throw away what you know.

### Next.js (static export)

- You already know React, so there's nothing new to learn.
- Downsides for this site: it's built for apps. Even static pages ship React's runtime and hydrate, which makes them heavier and a bit slower (Core Web Vitals affect SEO). There's more config for a site that's basically 5–8 content pages, and image optimization needs extra work in static-export mode.
- Reasonable, but more machinery than this site needs.

### Eleventy (11ty)

- The simplest of the three: Markdown + templates → HTML. Very fast, very stable.
- No component model like React's. Interactive bits are hand-written JS. Fine, but less fun for you and less reusable.

**Verdict:** Astro gives Eleventy's output (fast, plain HTML) with React's component model where you want it.

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
| Vanity subdomains | Apache `.htaccess` rewrite rules | Cloudflare Redirect Rules (see `content.md` §9 for the list) |
| Old page URLs (`/students.html`…) | — | 301 redirects in a `_redirects` file: `/students.html → /lessons`, etc. |
| Calendar | Google Calendar iframe | Keep the iframe for members **and** render upcoming performances as HTML at build time from the public iCal feed. A scheduled rebuild (e.g. daily) keeps it fresh. |
| Newsletter | Mailchimp links | unchanged |
| Deploy | Grunt + FTP with a password file | Push to GitHub, and Cloudflare builds and deploys. No credentials on anyone's laptop. |

---

## 4. Proposed site map

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
| `/members` (unlisted, `noindex`) | Hours log, practice playlist, RSVP, member calendars | — |

Pages for COVID / Remote Restart / Hall depend on your decisions in `content.md`.

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
2. You review `content.md`: answer the ⚠️ notes and fill in TODOs (Edgard's bio, leadership, links to keep)
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
