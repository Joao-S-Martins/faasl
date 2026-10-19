# FAASL.org v3 — Project brief

Goals, audiences, requirements, constraints and the decisions still to make. This is the reference for design and build. Edit freely.
Related: [`todo.md`](./todo.md) (the plan) · [`content.md`](./content.md) · [`architecture.md`](./architecture.md)

**Status key:** ✅ decided · 💡 my recommendation, needs your OK · ❓ open

---

## 1. Decided so far

- ✅ **Stack:** Astro (static output) + Cloudflare (hosting, DNS, redirects)
- ✅ **No database, no server** to maintain
- ✅ **SEO is a top priority**
- ✅ **Mobile first:** designed for phones, then scaled up
- ✅ **Content:** most current copy stays (see `content.md`); COVID and Remote Restart pages are dropped; hall/rental deferred to v3.1
- ✅ **All existing `*.faasl.org` shortcuts keep working**
- ✅ **Photos can be reused;** nothing else from v2 needs to stay

---

## 2. Goals

What the site is for, in priority order. 💡 Please reorder or edit.

1. **Recruit beginner students** (ages 8+) for the free lessons, especially ahead of the February start
2. **Recruit musicians** (adults, returning players, experienced players) into the volunteer band
3. **Show the community what we do:** performances, festas, events, so the band gets invited and supported
4. **Raise support:** donations, fundraiser dinners, volunteers
5. **Serve current members and families:** schedule, Remind list, calendars, practice playlist, forms
6. **Preserve and share our story:** history, Portuguese heritage, member stories

### Success measures 💡
- Contact-form and lesson enquiries per month (especially Nov–Feb)
- Ranking for searches like "free music lessons San Leandro", "Portuguese band", "community band East Bay"
- Lighthouse scores of 95+ for performance, accessibility, best practices and SEO on mobile
- Keeping content current: no stale dates; schedule and leadership reviewed each year

---

## 3. Audiences

| Audience | What they need fast (on a phone) | Primary action |
|---|---|---|
| **Parents of prospective students** | Is it really free? What ages? When and where? What instrument and book do we buy? | Contact / sign up for lessons |
| **Prospective adult musicians** | Can I join? What level? When are rehearsals? | Contact / come to a rehearsal |
| **Current students & families** | Schedule changes, Remind list, what to bring, calendar | Join Remind, check calendar |
| **Current band members & volunteers** | Calendars, hours log, practice playlist, RSVP forms | Quick links (members page) |
| **Event organizers** (festas, parades, cities) | Who are you, what do you play, how do we book you? | Contact |
| **Donors & community supporters** | Are you legitimate? What does my money do? | Donate |
| **Portuguese community** | Heritage, festas, familiar faces | Follow / attend |

---

## 4. Inspirations ❓

Please collect a few examples. Even "I like the photos on X" or "I hate the menu on Y" is useful.

- [ ] 3–5 websites you like (any topic): what do you like about each?
- [ ] 1–2 other community bands, youth music programs or filarmónicas, as peers or competitors
- [ ] Anything you specifically **don't** want
- [ ] Mood words. 💡 From the brand notes: *spirited, fun, generous, creative*. Maybe also: *proud, welcoming, traditional-meets-modern*?

---

## 5. Requirements

### Functional
- [ ] Mobile-first responsive layout: works from 320 px phones up to large desktops
- [ ] Clear, persistent **calls to action**: Join lessons · Join the band · Donate · Contact
- [ ] Contact form, no server (form service), spam-protected, emails info@faasl.org
- [ ] Upcoming events, pulled from the public Google Calendar at build time, plus subscribe links
- [ ] Teacher and leadership bios
- [ ] Instrument picker with demo video
- [ ] Lessons FAQ, materials list, store list, Remind instructions
- [ ] Toggleable announcement banner with an expiry date ("New lessons start soon!")
- [ ] Shortcut subdomains and old URLs redirect correctly
- [ ] Prints cleanly (the lessons page especially; the old site had print styles)
- [ ] Later: galleries, event write-ups, stories, volunteer bios, tags, search (see `astro-extensibility.md`)

### Quality (non-functional)
- [ ] **SEO:** unique titles and descriptions, structured data (organization, events, FAQ, people), sitemap, canonical URLs, social share images
- [ ] **Performance:** near-zero JS on content pages; optimized images; mobile Core Web Vitals in the "good" range
- [ ] **Accessibility:** WCAG 2.2 AA. Contrast, keyboard navigation, alt text, reduced-motion support, pinch-zoom allowed.
- [ ] **Privacy:** cookieless analytics; no tracking pixels; a short privacy note
- [ ] **Maintainability:** content in Markdown/YAML with schemas; CI checks every change; documented workflow

---

## 6. Constraints

- **Budget:** $0/month (domain renewal only). Every service must have a free tier that comfortably covers us.
- **People:** one volunteer developer (you), others possibly editing content later. The site must be maintainable in occasional spare hours.
- **Simplicity:** no database or server; prefer few dependencies.
- **Content and photos depend on volunteers:** headshots, bios, the Remind link. Build so missing pieces degrade gracefully.
- **Minors:** many photos show children. Publish only with parental consent; no names attached to minors' photos.
- **Email must not break** during the DNS move.
- **Timing:** ❓ is there a target launch date? 💡 Aim for **early January** so the site is live for the February beginner recruitment.

---

## 7. Decisions to make

### Structure & navigation
- ❓ **One long page vs. multiple pages.** You like the long page.
  💡 **Hybrid:** a long, scrolling **home page** that tells the whole story (intro → learn → grow → perform → events → leadership → contact), where each section links to a **dedicated page** for depth (`/lessons`, `/about`, `/events`…). You keep the one-page feel on phones, and Google gets one focused URL per topic. Pure one-page sites rank for only one set of keywords.
- ❓ Final site map. 💡 Start from `architecture.md` §4: Home, Lessons, Join, About, Events, Stories, Support, Contact, plus an unlisted Members page.
- ❓ Mobile navigation pattern: hamburger menu, bottom tab bar, or sticky "Join / Donate" button?

### Brand & visual design
- ❓ **Logo:** keep `Logo.svg` as is, or refresh?
- ❓ **Colors:** keep green `#00A079` as the main brand color? The old site also used gold and `#355749` (dark green). 💡 Green + gold + white, matching the uniforms.
- ❓ **Typography:** the old site used Adobe Typekit. 💡 Switch to self-hosted open-source fonts (faster, free, no third-party requests).
- ❓ Icon set. 💡 A small open-source set (e.g. Lucide or Phosphor) instead of Font Awesome.
- ❓ Animations: the old site slid sections in on scroll. Keep subtle motion, or none?
- ❓ Dark mode: support it, or light only? 💡 Light only for v3 (simpler; photo-led sites usually look best on light backgrounds).

### Content & voice
- ❓ Mission statement wording (in `todo.md`)
- ❓ Tone: 💡 warm, plain, welcoming; short sentences for phone readers; explain Portuguese terms (festa, filarmónica)
- ❓ **Portuguese language version?** Not for v3 launch, but should we plan URLs for it (`/pt/`)? 💡 Plan for it, don't build it yet.
- ❓ Photo policy: consent for minors, captions, credits

### Accounts & ownership
- ❓ **Who owns the Cloudflare account?** 💡 An organization account using an faasl.org email (e.g. web@faasl.org), with you and at least one board member as members. Avoids losing access if a volunteer leaves.
- ❓ Same question for the GitHub repo. It currently lives under your personal account. 💡 Consider a free GitHub organization for FAASL later.
- ❓ Where does faasl.org email live today? Who controls the domain registration?
- ❓ Who besides you edits content? (Decides whether we need a CMS in v3 or later.)

### Domain & URLs
- ❓ `www.faasl.org` or `faasl.org` as the main address? 💡 `faasl.org` (shorter), with `www` redirecting. Either is fine for SEO as long as it's consistent.
- ❓ URL style: 💡 lowercase, no `.html`, no trailing slash (`/lessons`)

### Services
- ❓ Contact form provider: 💡 Web3Forms or Formspree (free tiers); decide during infrastructure setup
- ❓ Donations provider (in `todo.md`)
- ❓ Analytics: 💡 Cloudflare Web Analytics (free, cookieless) + Google Search Console
- ❓ Newsletter: keep Mailchimp? (Free-tier limits have tightened over the years. Check the list size.)

### Tooling (I'll propose; you approve)
- 💡 TypeScript (strict), npm, Node LTS pinned in the repo
- 💡 Prettier + ESLint, `astro check` for type errors
- 💡 GitHub Actions CI on every push: type check, lint, build, link check, redirect tests
- 💡 Plain CSS with custom properties (design tokens), or Tailwind? ❓ Your preference? 💡 Plain modern CSS for v3 (fewer dependencies), unless you'd like to learn Tailwind.
- 💡 Build the v3 site at the **repo root**, leaving `www/` untouched until launch and deleting it afterwards (it stays in git history)
