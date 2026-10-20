# FAASL.org v3 — To-do & roadmap

The plan for the v3 relaunch, in phases. Review it, reorder it, cross things out.
Related: [`brief.md`](./brief.md) (requirements & decisions) · [`strategy.md`](./strategy.md) (goals, audiences & landing pages) · [`content.md`](./content.md) · [`architecture.md`](./architecture.md) · [`astro-extensibility.md`](./astro-extensibility.md)
(The old `www/todo.md` is the v2 list and will be retired along with `www/`.)

**Owner key:** 🧑 you · 🤖 me (Claude) · 🤝 together

| Phase | What | Gate before moving on |
|---|---|---|
| 0 | Brief & decisions | You've reviewed `brief.md` and `strategy.md` |
| 1 | Infrastructure & test page | Test page live on a Cloudflare preview URL; CI green |
| 2 | Section planning | Each section has an agreed outline and content model |
| 3 | **⏸ Design (pause)** | Layout and visual direction approved, mobile first |
| 4 | Build sections | Each section reviewed on a preview URL |
| 5 | Pre-launch | Launch checklist complete |
| 6 | **Beta** for stakeholders | Feedback gathered and addressed |
| 7 | Launch & follow-up | Live on www.faasl.org |
| — | Content gathering | Runs alongside every phase |

---

## Phase 0 — Brief & decisions

- [ ] 🧑 Review `brief.md` and `strategy.md`: goals order, audiences, landing pages, requirements, constraints
- [ ] 🧑 Collect inspirations (`brief.md` §3). Needed before Phase 3.
- [x] Main address: `www.faasl.org`
- [x] No launch date
- [x] CSS framework decided in the design phase
- [ ] 🧑 **Decide the contact form service** (💡 Web3Forms or Formspree free tiers). Needed by Phase 4.
- [ ] 🧑 Confirm the existing photo consent form covers publishing on the website (`brief.md` §5.1)
- [ ] 🧑 Decide the copyright & license statement for content and code (`brief.md` §5.2)

## Phase 1 — Infrastructure & test page

Goal: prove the whole pipeline end to end (code → CI → Cloudflare preview) with one throwaway page, before any real design.

### Project setup
- [x] 🤖 Scaffold Astro at the repo root (TypeScript strict); leave `www/` untouched
- [x] 🤖 Pin Node LTS (`.nvmrc` / `engines`) and lock dependencies
- [x] 🤖 Add integrations: React, MDX, sitemap
- [x] 🤖 Prettier + ESLint (with Astro plugins), `astro check`
- [x] 🤖 `.gitignore`, `.editorconfig`, and a README section: how to run, build, preview, add content

### Foundations
- [x] 🤖 `BaseLayout` with an SEO head component: title, description, canonical, Open Graph/Twitter, JSON-LD organization
- [x] 🤖 Content collections skeleton with schemas: `site` (org facts), `people`, `tags`
- [x] 🤖 Seed content: org facts from `content.md` §1, plus Edgard's stub entry (marked unpublished)
- [x] 🤖 Base CSS: reset, design-token placeholders (colors, type scale, spacing), mobile-first breakpoints
- [x] 🤖 `public/robots.txt` that blocks indexing on preview URLs (and a launch-time switch to allow it)
- [x] 🤖 `_headers` (security headers, noindex outside production)
- [ ] 🤖 `_redirects` for old URLs (once the new pages exist, Phase 4)

### Test page
- [x] 🤖 One `noindex` test page that exercises everything:
  - an optimized responsive photo (from `www/img`)
  - a `PersonCard` rendered from the `people` collection
  - a tiny React island (e.g. a counter or the instrument picker prototype)
  - SEO head output (title, meta, JSON-LD) to inspect
- [ ] 🤝 Check it on a real phone

### CI & deploys
Full plan: [`deployment.md`](./deployment.md). GitHub Actions does every build and deploy; beta deploys automatically, production only with your approval.
- [x] 🤖 `ci.yml`: on every push and PR: install → `astro check` → lint → build
- [ ] 🧑 **Create a dedicated FAASL Cloudflare account** (free plan) with an faasl.org email (e.g. `web@faasl.org`); enable two-factor login. Keep personal sites in your personal account (`deployment.md` §1).
- [ ] 🧑 Invite your personal Cloudflare login to the FAASL account as Super Administrator
- [ ] 🧑 In the FAASL account: choose the `workers.dev` subdomain; create the API token ("Edit Cloudflare Workers" template, limited to the FAASL account); note the account ID
- [ ] 🧑 GitHub: create environments `beta` and `production`; add the token and account ID as environment secrets; make yourself the required reviewer on `production`, limited to `main` and release tags
- [ ] 🧑 GitHub: branch protection on `main` (pull requests, CI must pass, no force-push)
- [x] 🤖 `wrangler.jsonc` with two Workers (`faasl-beta`, `faasl`) and beta mode (`noindex`, robots block)
- [x] 🤖 `deploy-beta.yml`: on push to `v3` after CI passes → build in beta mode → deploy to `faasl-beta`
- [x] 🤖 `deploy-production.yml`: on a published GitHub Release or manual start → waits for your approval → deploy to `faasl` (disabled until launch)
- [ ] 🤝 First beta deploy of the test page to its `*.workers.dev` address; check it on a real phone
- [ ] 🤝 💡 Move faasl.org DNS to Cloudflare early (copy every record, especially MX/TXT; `www` keeps pointing at the old host), then attach `beta.faasl.org`. Can happen any time before the stakeholder beta.
- [ ] 🤖 Google Calendar fetch script: Performances and Social events → `src/content/events/*.json` (tested with a sample feed; real feed in CI); past events hidden by a tiny script
- [ ] 🤝 Decide the refresh approach (`deployment.md` §6; 💡 B: automatic content releases with patch tags)
- [ ] 🤖 `refresh.yml`: weekly + manual; fetch events → commit if changed → tag next patch → deploy (data-only changes skip approval)
- [ ] 🧑 GitHub: `production-refresh` environment + a narrow credential allowed to commit event data to `main`
- [ ] 🤖 Lighthouse check in CI (report only for now; budgets once the design exists)

## Phase 2 — Section planning

Draft plans for every page are in [`sections.md`](./sections.md), ready for review. Structured content files for them are in `src/content/`.

- [x] 🤖 Move structured content into content files with schemas: stores, FAQ, calendars, lessons program, announcements, stories, member forms
- [ ] 🧑 Review `sections.md` and answer its ❓ questions
- [ ] 🤖 Move long page copy from `content.md` into Markdown page files

- [ ] 🤝 Information architecture: confirm the site map (`strategy.md` §7), the **hybrid long home page**, and launch priority
- [ ] 🤝 Global: header & mobile nav, footer, announcement banner, SEO defaults, 404 page
- [ ] 🤝 Home (long scrolling story + "I want to…" audience router)
- [ ] 🤝 Lessons: about, instruments + demo video, materials & stores, FAQ, Remind sign-up
- [ ] 🤝 Join the band (general invitation to skilled and aspiring musicians: repertoire, conductor, sit-in invite)
- [ ] 🤝 Give (community donors: donate, honor/memorial gifts, dinners, other ways to help; a short "Businesses" section with matching gifts and a contact line)
- [ ] 🤝 Impact (funders & agencies: mission, numbers, governance, documents, verification links)
- [ ] 🤝 About: history & heritage, leadership, teachers, short "Get involved" note
- [ ] 🤝 Events: upcoming (from Google Calendar), fundraiser dinners, subscribe links; past write-ups later
- [ ] 🤝 Contact: form, address, phone, map, socials
- [ ] 🤝 Members (unlisted): onboarding forms, Remind, calendars, RSVP, practice playlist, special contacts (`content.md` §6b). Include a switch to list it publicly later with the practice playlist hidden.
- [ ] 🤝 Later sections, so the content model leaves room for them: stories, event deep dives, galleries, volunteer bios, tags, search

## Phase 3 — ⏸ Design (pause before building sections)

- [ ] 🧑 Inspirations collected (`brief.md` §4)
- [ ] 🤝 Brand decisions: logo, colors, fonts, icons, motion, photo style
- [ ] 🤖 2–3 visual directions as quick mockups (mobile first) for you to pick from
- [ ] 🤖 Wireframes for the home page and one inner page (phone → tablet → desktop)
- [ ] 🤝 Design tokens finalized (colors, type scale, spacing, radii, shadows)
- [ ] 🤖 Core component set: buttons/CTAs, cards, section headers, nav, footer, banner, FAQ accordion
- [ ] 🧑 Approve the design → unlocks Phase 4

## Phase 4 — Build sections

Built in this order, each reviewed on a preview URL:
- [ ] 🤖 Global layout (header, nav, footer, banner)
- [ ] 🤖 Home
- [ ] 🤖 Lessons
- [ ] 🤖 About (leadership + teachers)
- [ ] 🤖 Join
- [ ] 🤖 Give
- [ ] 🤖 Impact
- [ ] 🤖 Contact (+ form service)
- [ ] 🤖 Events (calendar loader)
- [ ] 🤖 Members
- [ ] 🤖 404 page, print styles

## Phase 5 — Pre-launch

- [ ] 🧑 Confirm where faasl.org email lives and who controls the domain registration
- [ ] 🤝 Contact form service set up and tested to info@faasl.org
- [ ] 🤝 Cloudflare Web Analytics on
- [ ] 🤖 Accessibility audit (WCAG 2.2 AA) and fixes
- [ ] 🤖 SEO audit: titles, descriptions, structured data validation, sitemap, social share images
- [ ] 🤖 Performance budgets enforced in CI
- [ ] 🤖 Automated tests: every shortcut subdomain and old URL redirects to the expected target
- [ ] 🧑 Final content proofread

## Phase 6 — Beta for stakeholders

- [ ] 🤝 Beta address: 💡 `beta.faasl.org` (the old site used it for betas). It can point at the Cloudflare project with one DNS record at the current DNS host, before any full DNS move. Fallback: the free `*.pages.dev` address.
- [x] 🤖 Beta is hidden from search engines (`noindex`, `robots.txt`, `X-Robots-Tag`). No beta banner.
- [ ] 🧑 Stakeholder list: board, Edgard, Geronimo, key volunteers, a few parents and members, maybe a friendly donor
- [ ] 🧑 Share the beta with a short note: what to look at, how to send feedback (e.g. reply by email), by when
- [ ] 🤝 Triage feedback → fix → second look if needed

## Phase 7 — Launch & follow-up

- [ ] 🤝 Add faasl.org to Cloudflare; **verify every DNS record (especially MX/TXT for email)** against the current host
- [ ] 🤝 Switch nameservers; attach `www.faasl.org` (and redirect `faasl.org` → `www`); production branch → `main` (merge `v3`)
- [ ] 🤝 Shortcut subdomain redirect rules live; run the redirect tests against production
- [ ] 🤖 Allow indexing (`robots.txt`), submit the sitemap
- [ ] 🧑 Google Search Console + Bing Webmaster Tools verified
- [ ] 🧑 Google Business Profile for the clubhouse
- [ ] 🤖 Remove `www/` (stays in git history)
- [ ] 🧑 Retire the shared host about 30 days after launch

---

## Content gathering (runs alongside all phases)

### New headshots 🧑
- [ ] Lorenza D.L.G. Tomaz (President of the Board)
- [ ] Geronimo Rojas (Band Conductor)
- [ ] João "John" Martins (Director of Stuff & Things)
- [ ] Edgard Gonzalez (Music Teacher)

**Recommended specs** (the site will crop and resize automatically, so bigger is fine):
- **Square, at least 1200 × 1200 px** (800 × 800 px is the minimum). The original uncropped phone photo is even better; send that if you have it.
- JPG (or HEIC straight from the phone), high quality, not screenshots or images saved from social media
- Head and shoulders, face roughly centered with some space around the head (circle crops cut the corners)
- Soft, even light; plain or blurred background
- Same style for everyone (similar framing, background and tone) so the cards look like a set

### Other photos (nice to have) 🧑
- [ ] Recent performance photos (current uniforms, wide and close-up)
- [ ] Students in a lesson with Edgard (with photo permission from parents)

### Dates & ages to update
- [ ] 🤖 "Over 35 years later" → years since 1980, calculated automatically
- [ ] 🧑 Lorenza's bio: "has served as the president for over five years now" → give a start year so it can be calculated
- [ ] 🤖 Copyright line "© 2007–{year}": calculated automatically
- [ ] 🧑 Beginner age range ("ages 8+", "ages 8 to 108"): confirm still accurate
- [ ] 🧑 "Starting each February": confirm the beginner class still starts in February
- [ ] 🧑 Review any other bio that counts years ("for several years", "since he was a young middle school student")

### Shortcut subdomains
Every `*.faasl.org` shortcut in `content.md` §7 must keep working.
- [ ] 🧑 Confirm the destination for each one (some point at old Google Forms / Adobe Express)
- [ ] 🤖 Write the redirect rules and the automated tests (Phase 5)
- [ ] 🤝 Test every shortcut and old page URL after launch (Phase 7)
- [ ] `hall.faasl.org` / `rental.faasl.org` point to Home for now (revisit in v3.1)
- [ ] 🧑 Pick new campaign shortcuts for the audience pages (💡 `give.`, `join.`, `impact.`, `lessons.`), optionally tagged for analytics (`strategy.md` §5)

### Proof assets for funders & talent (`strategy.md` §6) 🧑
- [ ] Yearly numbers: students taught, musicians in the band, performances per year (no volunteer hours)
- [ ] Annual report or financial summary; IRS determination letter; recent Form 990
- [ ] Claim / update the Candid (GuideStar) profile; check California Attorney General Registry of Charities status
- [ ] Suggested gift amounts tied to real costs (method book, instrument repair, etc.)
- [ ] 1–2 short performance videos

### Members page 🧑 (`content.md` §6b)
- [ ] Current emergency contact / medical form (blank)
- [ ] Current uniform agreement (blank)
- [ ] Current photo consent form (blank); confirm it covers the website
- [ ] Anything else in the new-member packet (code of conduct, instrument loan, dues?)
- [x] Forms are printable (PDF downloads)
- [ ] Where do completed forms go (in person to whom / email)?
- [ ] Special contacts: who handles what (absences, uniforms, music, general). 💡 Role-based emails (e.g. uniforms@faasl.org) instead of personal numbers.

### Content items 🧑
- [ ] **Gather Edgard Gonzalez's details:** exact title, 2–3 sentence bio, instruments, credentials, year joined, headshot, and how families should contact him (for the "What if we're late?" FAQ)
- [x] **Review the music stores:** web-searched 2026-10-20 (`content.md` §5.3, `src/content/stores.yaml`). A & G Music (Oakland) has closed and is removed.
  - [ ] Call Music Unlimited and Allegro Music to confirm they're open and still rent band instruments
  - [ ] Decide: replace Musician's Friend (now an off-price outlet) with Music & Arts?
  - [ ] Any new shops to add?
  - [ ] Update the Google My Maps store map: remove A & G Music, check the other pins
- [ ] **Remind notifications:** link and step-by-step instructions for joining the Remind list for lesson updates
- [ ] **Review the mission statement:** decide on official wording (the README uses "music education and mentorship for underserved youth in the East Bay")
- [ ] **Donate button:** decide yes/no and the provider (PayPal, Givebutter, Zeffy…), then point `donate.faasl.org` at it
- [ ] **Rewrite the Stories page:** stories double as testimonials, shown as short snippets on several pages (Home, Lessons, Join, Give, Impact). For each story, pick a one- or two-sentence pull quote. Collect **new** member stories / testimonials (a parent, a student, an experienced musician, a board member, a community partner), using the old Adobe Express stories as a starting point; publish them on faasl.org and point `stories.faasl.org` at it
- [ ] Instrument list: any changes?
- [ ] "Grow with us" / "Have fun with us" buttons: link to a Join page instead of beginner lessons?

---

## Separate project: brochure
Goal: a brochure that **regenerates itself from the site's content**, with nothing to design or upload by hand each year.
- [ ] Find the current tri-fold brochure (it's not in the repo) as a design reference
- [ ] Build the brochure as a print-designed page from the same content files (contact info, lessons, leadership, schedule)
- [ ] Have the deploy pipeline render it to PDF automatically (headless browser) on every content change
- [ ] Serve it at `brochure.faasl.org` (always the latest), and keep a dated copy per year if wanted
- [ ] Optional: a QR code on the brochure pointing to `/lessons`

---

## v3.1

Follow-up work after the v3 launch.

### Portuguese language
- [ ] Portuguese version of key pages (Home, Lessons, Give, About) under `/pt/`, using Astro's built-in i18n routing
- [ ] Who translates and reviews? (a community volunteer?)

### Sponsorship program
No program or tiers exist yet. Define it, then build the page.
- [ ] Define the program: goals, what sponsors fund (e.g. lessons, instruments, uniforms, a concert season), who manages sponsor relationships
- [ ] Draft tiers with clear benefits (e.g. recognition on the site and at concerts, logo on banners/programs, a performance at a company event, employee volunteer opportunities); board approval
- [ ] Sponsor agreement / acknowledgment letter template (and tax-receipt wording)
- [ ] `/sponsor` page with tiers, impact, matching gifts and a contact path
- [ ] Sponsor packet PDF generated from site content (same approach as the brochure)
- [ ] `sponsor.faasl.org` shortcut; sponsor logos on the site once there are sponsors

### Volunteer & board roles
- [ ] When roles are being advertised: `/volunteer` page with specific roles and time commitments
- [ ] Re-point `volunteer.faasl.org` (currently a Google Form) at it; consider volunteer bios

### Newsletter
- [ ] Decide whether to restart a newsletter, and on which service (Mailchimp or another)
- [ ] Until then, `newsletter.faasl.org` and `subscribe.faasl.org` keep redirecting to the old Mailchimp pages

### Hall & rental
Whether the hall appears on the site at all is up for debate. Return to it after launch.
- [ ] Decide whether the hall gets a mention (e.g. "Our home" on `/about`) or a rental page again
- [ ] If rentals return: update the rental package (`www/pdf/FAASL_RENTAL_PACKAGE_10.22.pdf`), rates and rental@faasl.org contact
- [ ] Decide whether to use the hall photos (`rental_01`–`06`)
- [ ] Re-point `hall.faasl.org` and `rental.faasl.org` (Home until then)
