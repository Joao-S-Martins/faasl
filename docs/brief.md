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

- [x] **[awesomeorchestra.com](https://awesomeorchestra.com)**: mainly its **organization**: structure and clear messaging. The design is nice, but the organization is what to learn from. Not to copy its design or text.
- [x] 2–4 more websites you like (any topic): what do you like about each? (reviewed Oct 2026, see §3.1)
  - Candidates to look at (Oct 2026): music and youth programs: musicwill.org, sphinxmusic.org, elsistemausa.org, laphil.com/learn/yola, sfsymphony.org (youth orchestra pages), dallaswinds.org, marineband.marines.mil · nonprofits: 826valencia.org, accfb.org, charitywater.org, habitat.org, codeforamerica.org · information design: gov.uk, nps.gov (a park's "Plan your visit"), khanacademy.org
- [ ] 1–2 other community bands, youth music programs or filarmónicas, as peers
- [ ] 1–2 non-profit sites with donation and sponsor pages you find convincing
- [ ] Anything you specifically **don't** want
- [ ] Mood words. 💡 From the brand notes: *spirited, fun, generous, creative*. Maybe also: *proud, welcoming, trustworthy, traditional-meets-modern*?

### 3.1 What we learned from the inspirations (Oct 2026)

Your notes on the sites above, turned into design rules. The full list of sites reviewed is in §3.

**Header and navigation**
- The header and logo **start large over the landing image, then shrink** to a compact bar once you scroll past it. *(Music Will takes too much header space; this fixes that.)*
- A **small Donate button that stays available** near the bottom of the screen: present, never pushy. **No donate pop-ups.** *(Music Will is too forceful; ACCFB's modal is hated.)*
- A **hamburger menu** on phones, short and clearly grouped. *(Sphinx, 826 Valencia and El Sistema work; the Dallas Winds menu is too long.)* **No sideways-scrolling link rows** at the top. *(Code for America)*
- A slim utility strip above the menu is fine, but only where there's no big image under it. *(ACCFB)*

**Landing page**
- **Long enough to tell the story, no longer.** *(Sphinx is about right on desktop; Music Will runs long.)*
- A **video hero** (a short, silent loop) is preferred over an embedded YouTube player. *(YOLA, SF Symphony)* Embedded videos are fine further down the page.
- The banner must still work on a **sideways phone**; Music Will's gets too thin.
- **Partners and sponsors** may appear on the home page. *(Dallas Winds; to decide)*

**Layout and shapes**
- Content lives in **floating boxes**, *(Music Will, ACCFB)* **mixing rounded and sharp corners**: a box's corners sharpen where it meets or butts against another box or band, especially on phones, and stay rounded where it floats free.
- **Boxes overlap** images or cross background colors, so an image looks shaped around the text. *(Sphinx's "Support our work" box, charity: water)*
- On desktop, **image and text alternate sides** as you scroll. *(Music Will)*
- **Vary the design assets as you scroll** (tiles, staff, photos, color bands). *(Music Will does this well.)* **Bold color backgrounds and dividers are one tool among several**, used now and then, never one after another and never the default. *(Dallas Winds is relentless.)* The old site's bold color changes shouldn't come back as they were; our tile and staff patterns can do part of that job.
- **Full-width background images** behind testimonials or the Give page, with bold color separators. *(Sphinx performing artists)*
- **Generous margins on phones** *(NPS, ACCFB)*, and **overlays stay on phones** instead of disappearing. *(NPS)*
- **Collapse long lists on phones** (accordions). *(gov.uk doesn't.)*
- A **sideways-scrolling row** works for a set of cards, e.g. events or stories. *(charity: water)*
- Imagery can be **lighter on phones** than on desktop. *(826 Valencia)*

**Numbers**
- **Bold, big stats** (musicians, students, years, performances), **each with imagery: a large icon or graphic beside or above the number.** *(El Sistema)* Never a plain list. *(YOLA is boring.)*

**Motion**
- **Little motion, and it moves whole content blocks together**, never small pieces separately. *(El Sistema)*
- **Nothing slow:** no slow loading and no long animations. Content is in the page from the start (also what search engines need), and any animation is short (about 0.3 s or less). *(Sphinx felt slow on both counts.)*
- **One or two repeating touches at most** *(charity: water's "100%")*. **No whimsy, nothing distracting.** *(826 Valencia, Dallas Winds)*
- Always honors reduced-motion settings.

**Tone**
- **Not too clean or plain** *(SF Symphony, gov.uk, Code for America on phones)*. With a limited palette, the **tiles, staff and photos** have to add the life that Khan Academy gets from its colors.
- **Not crowded** with news and donation asks. *(YOLA, Habitat)*
- **Phrases to play with:** "Your support is instrumental" *(YOLA)* and "Your gifts make concerts possible" *(SF Symphony)*, as in "make community happen" or "make smiles happen".
- **Hate:** cut-out photos of people with instruments. *(El Sistema)*

**Maybe later:** a shop. *(826 Valencia)*

**SEO and speed guardrails for these ideas**
- ⚠ **Video hero:** a big video can slow the first screen, which Google measures. So: a small, silent, compressed loop with a still image shown first; the still image, not the video, is what loads first. The video is skipped on reduced-motion settings and on slow connections.
- ⚠ **Content that appears as you scroll:** it must be in the page from the start and only *animate* in. Content that loads late can be missed by search engines and makes the page jump.
- ⚠ **Shrinking header:** it must not push the page content around as it shrinks. Google measures page jumps.
- ⚠ **Sideways-scrolling rows:** every card stays in the page; nothing is loaded only when scrolled to.

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
  - Footer: "© 2007–{year} Filarmónica Artista Amadora de San Leandro. All rights reserved."
  - README / `LICENSE.md`: "FAASL.org by **FAASL Volunteers**", licensed CC BY-NC-SA 4.0 (and `www/package.json` says CC-BY-NC-ND-4.0)
- ❓ Decide who the site's content and code belong to, and state it consistently. 💡 Common pattern: **content and photos © the organization** (footer), **site code** under your name or an open-source license in `LICENSE.md`. Worth a quick conversation with the board; this isn't legal advice.

### 5.3 Brand colors

See [`brand.md`](./brand.md) (Colors). Hunter green `#355749` leads; gold `#F3DD3E` only for the lyre and small accents; white, off-white and ink for the rest. FAASL green and light gold are retired. Text only uses pairs at 4.5:1 or better.

## 5.4 SEO guardrails

**Standing rule:** anything proposed that could hurt search ranking gets flagged with a warning before it's built.

Known guardrails:
- **Event search data only on single-event pages.** Google's event results only support pages about one event, each with its own URL; list and schedule pages aren't eligible, and misleading event markup can cost the whole site its rich results. So lists (Events, Home, Give, Lessons, Musicians) carry **no** Event data. Each performance and fundraiser has its own page (`/events/<date>-<name>`) with Event data, only when confirmed and with a location.
- **No Event data for weekly lessons and rehearsals.** A standing weekly schedule reads to Google like opening hours, which its guidelines exclude, and 50+ near-identical weekly entries risk looking like spam. They're shown as plain text on Lessons and Musicians instead.
- **Tentative/TBD events** never get Event data until they're confirmed.
- **No thin or duplicate pages** (e.g. one page per weekly class); each page should have unique, useful content.
- **Past event pages** are removed at the next refresh (the 404 page points to upcoming events) unless a write-up keeps them. Removing expired event pages is normal and doesn't hurt ranking.
- **One canonical address** (`www.faasl.org`), beta always hidden from search.

## 6. Decisions to make

### Structure & navigation
- 💡 **Hybrid long page:** a long, scrolling home page that tells the whole story and routes each audience, with dedicated pages for depth (`strategy.md` §3). Pure one-page sites only rank for one set of keywords.
- ❓ Final site map. 💡 `strategy.md` §7.
- ❓ Mobile navigation pattern: hamburger menu, bottom tab bar, or sticky "Donate" button? (design phase)

### Brand & visual design (design phase)
- ✅ **Logo:** keep the gold lyre (`src/assets/logo.svg`); the uniform crest waits for a vector (`brand.md`)
- ❓ **CSS framework** (e.g. Tailwind) vs. plain CSS: decide after seeing the designs
- ✅ **Typography:** font set B, Barlow Condensed and Barlow, self-hosted (`brand.md`)
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
