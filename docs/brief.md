# FAASL.org v3 — Project brief

Goals, audiences, requirements, constraints and the decisions still to make. This is the reference for design and build. Edit freely.
Related: [`strategy.md`](./strategy.md) (goals, audiences & landing pages) · [`todo.md`](./todo.md) (the plan) · [`content.md`](./content.md) · [`architecture.md`](./architecture.md)

**Status key:** ✅ decided · 💡 my recommendation, needs your OK · ❓ open

---

## 1. Decided so far

- ✅ **Stack:** Astro (static output) + Cloudflare (hosting, DNS, redirects)
- ✅ **No database, no server** to maintain
- ✅ **SEO is a top priority**
- ✅ **Mobile first:** designed for phones, then scaled up
- ✅ **Main address: `www.faasl.org`**, with `faasl.org` redirecting to it
- ✅ **Content:** most current copy stays (see `content.md`); COVID and Remote Restart pages are dropped; hall/rental deferred to v3.1
- ✅ **All existing `*.faasl.org` shortcuts keep working**
- ✅ **Photos can be reused;** nothing else from v2 needs to stay
- ✅ **Brand colors carry over:** the current greens, golds and whites become official tokens (§5.3)
- ✅ **Beta launch** for stakeholders before the public launch
- ✅ **No launch date:** quality over deadline
- ✅ **Ownership:** you own and run the accounts (Cloudflare, GitHub, domain) for now. FAASL gets its **own** Cloudflare account on an faasl.org email, with your personal login added as Super Administrator, so it can be handed over later.
- ✅ **Deferred to v3.1:** Portuguese-language version; newsletter (Mailchimp or other); sponsorship program & `/sponsor` page; volunteer/board roles page
- ✅ **No volunteer-hours figures** on the site (recording is spotty and only covers musicians)
- ✅ **CSS framework:** decided during the design phase, after seeing designs (you lean towards using one)

---

## 2. Goals & audiences

See [`strategy.md`](./strategy.md). In short:
- **Pivot** from attracting new musicians (the pipeline now exists) towards **fundraising** (community, corporate, government/grants) and **better talent**, both musical and organizational, while continuing to **nurture** students and amateurs.
- **Audiences:** prospective musicians · students · their families · Portuguese-community donors · corporate donors · government entities and grant funders scouting non-profits
- **Approach:** one site at `www.faasl.org`, a home page that routes each audience, a dedicated landing page per audience, and vanity subdomains that redirect to those pages for print and campaigns.

### Success measures 💡
- Online gifts, business and grant enquiries, musician enquiries (skilled and aspiring), lesson enquiries
- Funders can verify FAASL (mission, numbers, documents, governance) from the Impact page alone
- Ranking for searches like "free music lessons San Leandro", "Portuguese band California", "community band East Bay"
- Lighthouse scores of 95+ for performance, accessibility, best practices and SEO on mobile
- No stale content: dates calculated; schedule, leadership and numbers reviewed yearly

---

## 3. Inspirations ❓

Please collect a few examples. Even "I like the photos on X" or "I hate the menu on Y" is useful.

- [x] **[awesomeorchestra.com](https://awesomeorchestra.com)**: a fan of its design, structure and organization. Not to copy its design or text, but a model for how organized and clear our messaging can grow to be over time.
- [ ] 2–4 more websites you like (any topic): what do you like about each?
- [ ] 1–2 other community bands, youth music programs or filarmónicas, as peers
- [ ] 1–2 non-profit sites with donation and sponsor pages you find convincing
- [ ] Anything you specifically **don't** want
- [ ] Mood words. 💡 From the brand notes: *spirited, fun, generous, creative*. Maybe also: *proud, welcoming, trustworthy, traditional-meets-modern*?

---

## 4. Requirements

### Functional
- [ ] Mobile-first responsive layout: works from 320 px phones up to large desktops
- [ ] Home page that tells the story and routes each audience; dedicated audience landing pages (`strategy.md` §3)
- [ ] Persistent **Donate** button; clear calls to action per audience
- [ ] Contact form, no server (form service to be decided), spam-protected, emails info@faasl.org
- [ ] Upcoming events, pulled from the public Google Calendar at build time, plus subscribe links
- [ ] Teacher, leadership and (later) volunteer bios
- [ ] Testimonial snippets (pull quotes from member stories) on multiple pages, each linking to the full story
- [ ] Instrument picker with demo video
- [ ] Lessons FAQ, materials list, store list, Remind instructions
- [ ] Impact page with yearly numbers and downloadable documents
- [ ] Toggleable announcement banner with an expiry date ("New lessons start soon!")
- [ ] Shortcut subdomains and old URLs redirect correctly
- [ ] Prints cleanly (the lessons page especially)
- [ ] Beta site for stakeholders, hidden from search engines (no beta banner)
- [ ] Automatic deploys to beta; production deploys only with the owner's approval (`deployment.md`)
- [ ] Later: galleries, event write-ups, stories, tags, search (see `astro-extensibility.md`); Portuguese (v3.1)

### Quality (non-functional)
- [ ] **SEO:** unique titles and descriptions, structured data (organization, events, FAQ, people), sitemap, canonical URLs, social share images
- [ ] **Performance:** near-zero JS on content pages; optimized images; mobile Core Web Vitals in the "good" range
- [ ] **Accessibility:** WCAG 2.2 AA. Contrast, keyboard navigation, alt text, reduced-motion support, pinch-zoom allowed.
- [ ] **Privacy:** cookieless analytics; no tracking pixels; a short privacy note
- [ ] **Maintainability:** content in Markdown/YAML with schemas; CI checks every change; documented workflow

---

## 5. Constraints

- **Budget:** $0/month (domain renewal only). Every service must have a free tier that comfortably covers us.
- **People:** one volunteer developer and owner (you). The site must be maintainable in occasional spare hours.
- **Simplicity:** no database or server; prefer few dependencies.
- **Content and photos depend on volunteers:** headshots, bios, numbers, the Remind link. Build so missing pieces degrade gracefully.
- **Email must not break** during the DNS move.

### 5.1 Photos of minors
You already have a consent form, so **no new form is needed for the website.** Two checks:
- [ ] 🧑 Confirm the existing form covers **publishing on the website and online** (not only print or social media). If it only mentions social media, a one-line addition to next year's form fixes it.
- [ ] 🤝 Agree a simple rule for whoever adds photos, e.g. "only students with a signed form; no full names on photos of minors". The site can support this with a `consent` field on photos so an unchecked one can't be published by accident. Nothing more is required from the website itself.

### 5.2 Ownership & copyright
- You own and run the accounts for now. 💡 Keep a short private handover note (which accounts exist, where credentials are, how to deploy) so the site can be passed on later if needed.
- The current site has **two different statements**:
  - Footer: "© 2007–{year} Filarmonica Artista Amadora de San Leandro. All rights reserved."
  - README / `LICENSE.md`: "FAASL.org by **FAASL Volunteers**", licensed CC BY-NC-SA 4.0 (and `www/package.json` says CC-BY-NC-ND-4.0)
- ❓ Decide who the site's content and code belong to, and state it consistently. 💡 Common pattern: **content and photos © the organization** (footer), **site code** under your name or an open-source license in `LICENSE.md`. Worth a quick conversation with the board; this isn't legal advice.

### 5.3 Brand colors (from the current site)

These become the official palette and design tokens. Exact uses are settled in the design phase.

| Token | Hex | Where it comes from | Use it for |
|---|---|---|---|
| **Hunter green** | `#355749` | v2 primary color (links, buttons, favicon tile) | Primary text accents, buttons, headers. White text on it passes AA (8.0:1). |
| **FAASL green** | `#00A079` | Official brand color (Pantone Green CP, `branding/`) | Large headings, bands of color, icons. ⚠ White text on it only passes for large text (3.3:1). |
| **Gold** | `#F3DD3E` | v2 accent (gold buttons, header highlights) | Highlights, CTA buttons with dark text (9.2:1 with `#333`). ⚠ Never gold text on white (1.4:1). |
| **Light gold** | `#FFEB5B` | v2 backgrounds (calendar, section patterns) | Light section backgrounds, banners |
| **White** | `#FFFFFF` | v2 background | Page background |
| **Off-white** | `#F0F0F0` | v2 text on dark backgrounds | Text on dark green, subtle backgrounds |
| Dark text | `#333333` | v2 body text | Body text |

---

## 6. Decisions to make

### Structure & navigation
- 💡 **Hybrid long page:** a long, scrolling home page that tells the whole story and routes each audience, with dedicated pages for depth (`strategy.md` §3). Pure one-page sites only rank for one set of keywords.
- ❓ Final site map. 💡 `strategy.md` §7.
- ❓ Mobile navigation pattern: hamburger menu, bottom tab bar, or sticky "Donate" button? (design phase)

### Brand & visual design (design phase)
- ❓ **Logo:** keep `Logo.svg` as is, or refresh?
- ❓ **CSS framework** (e.g. Tailwind) vs. plain CSS: decide after seeing the designs
- ❓ **Typography:** the old site used Adobe Typekit. 💡 Switch to self-hosted open-source fonts (faster, free).
- ❓ Icon set. 💡 A small open-source set (e.g. Lucide or Phosphor) instead of Font Awesome.
- ❓ Animations: the old site slid sections in on scroll. Keep subtle motion, or none?
- ❓ Dark mode. 💡 Light only for v3.

### Content & voice
- ❓ Mission statement wording (in `todo.md`)
- ❓ Tone: 💡 warm, plain, welcoming for families; confident and factual on Give, Sponsor and Impact pages
- ✅ Sponsorship program and tiers: v3.1 (`todo.md`)
- ❓ Copyright & license statement (§5.2)

### Services
- ❓ **Contact form provider** (in `todo.md`). 💡 Web3Forms or Formspree free tiers.
- ❓ Donations provider (in `todo.md`)
- 💡 Analytics: Cloudflare Web Analytics (free, cookieless) + Google Search Console
- ✅ Newsletter: deferred to v3.1. The `newsletter.` and `subscribe.` shortcuts keep redirecting to the existing Mailchimp pages until then.

### Domain & URLs
- ✅ `www.faasl.org`. The choice doesn't affect the shortcut redirects (each subdomain is its own DNS record either way). `www` keeps the address the old site, printed materials and Google already use.
- 💡 URL style: lowercase, no `.html`, no trailing slash (`/lessons`)

### Tooling (I'll propose; you approve)
- 💡 TypeScript (strict), npm, Node LTS pinned in the repo
- 💡 Prettier + ESLint, `astro check` for type errors
- 💡 GitHub Actions CI on every push: type check, lint, build, link check, redirect tests
- 💡 Build the v3 site at the **repo root**, leaving `www/` untouched until launch and deleting it afterwards (it stays in git history)
