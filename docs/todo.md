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
- [ ] 🤖 **Compare contact form services** (e.g. Web3Forms, Formspree free tiers: limits, spam protection, custom subject with the topic) → 🧑 decide. Needed by Phase 4.
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
- [x] 🤖 Google Calendar fetch script (`npm run events`): Performances and Social events, with descriptions (call times, ticket prices, dress code), recurring/moved/cancelled/all-day events → `src/content/events.json`. Sample feeds include a fake raffle (`npm run events:sample`); CI prints a live report (`npm run events:report`)
- [x] 🤝 Refresh approach: B, automatic content releases with patch tags (`deployment.md` §6)
- [ ] 🤖 `refresh.yml`: weekly + manual; fetch events → commit if changed → tag next patch → deploy (data-only changes skip approval)
- [ ] 🧑 GitHub: `production-refresh` environment + a narrow credential allowed to commit event data to `main`
- [ ] 🤖 Lighthouse check in CI (report only for now; budgets once the design exists)

## Phase 2 — Section planning

Draft plans for every page are in [`sections.md`](./sections.md), ready for review. Structured content files for them are in `src/content/`.

- [x] 🤖 Move structured content into content files with schemas: stores, FAQ, calendars, lessons program, stories, member forms
- [x] 🧑 Review `sections.md` (confirmed)
- [x] 🤖 Build every v3 page from the reviewed copy: simple semantic HTML on shared components (`src/components/`), facts from content files, TODOs and drafts visible on beta

- [ ] 🤝 Information architecture: confirm the site map (`strategy.md` §7), the **hybrid long home page**, and launch priority
- [ ] 🤝 Global: header & mobile nav, footer, SEO defaults, 404 page
- [ ] 🤝 Home (long scrolling story + "I want to…" audience router)
- [ ] 🤝 Lessons: about, instruments + demo video, materials & stores, FAQ, Remind sign-up
- [ ] 🤝 Join the band (general invitation to skilled and aspiring musicians: repertoire, conductor, sit-in invite)
- [ ] 🤝 Give (community donors: donate, honor/memorial gifts, dinners, other ways to help; a short "Businesses" section with matching gifts and a contact line)
- [ ] 🤝 Impact (funders & agencies: mission, numbers, governance, documents, verification links)
- [ ] 🤝 About: history & heritage, leadership, teachers, short "Get involved" note
- [ ] 🤝 Events: upcoming (from Google Calendar), fundraiser dinners, subscribe links; past write-ups later
- [ ] 🤝 Contact: form, address, phone, map, socials
- [x] 🤝 Musicians (was Members): onboarding forms, BAND app, Remind, calendars, play-along playlist, contacts (`content.md` §6b); footer link, kept out of search
- [ ] 🤝 Later sections, so the content model leaves room for them: stories, event deep dives, galleries, volunteer bios, tags, search

## Phase 3 — ⏸ Design (pause before building sections)

- [ ] 🧑 Inspirations collected (`brief.md` §4)
- [ ] 🤝 Brand decisions: logo, colors, fonts, icons, motion, photo style
- [ ] 🤖 2–3 visual directions as quick mockups (mobile first) for you to pick from
- [ ] 🤖 Wireframes for the home page and one inner page (phone → tablet → desktop)
- [ ] 🤝 Design tokens finalized (colors, type scale, spacing, radii, shadows)
- [ ] 🤖 Core component set: buttons/CTAs, cards, section headers, nav, footer, FAQ accordion
- [ ] 🧑 Approve the design → unlocks Phase 4

## Phase 4 — Build sections

Built in this order, each reviewed on a preview URL:
- [ ] 🤖 Global layout (header, nav, footer)
- [ ] 🤖 Home
- [ ] 🤖 Lessons
- [ ] 🤖 About (leadership + teachers)
- [ ] 🤖 Join
- [ ] 🤖 Give
- [ ] 🤖 Impact
- [ ] 🤖 Contact (+ form service)
- [ ] 🤖 Events (calendar loader)
- [ ] 🤖 Musicians
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

- [ ] 🤝 **Review all page copy and SEO during beta:** titles, descriptions, headings and body text on every page. Make them specific to FAASL: name the instruments we actually play and the dishes we actually serve at dinners (not generic "instruments" and "Portuguese meals"), and work in the neighboring cities (`strategy.md` §4, Local search).
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
- [ ] 🧑 Lorenza's bio: give the year she became president so "for over five years" can be calculated, and **re-evaluate the rest of her bio** later
- [ ] 🤖 Copyright line "© 2007–{year}": calculated automatically
- [x] 🧑 Beginner age range: ages 8 to 108, confirmed
- [x] 🧑 "Starting each February": no longer true. Students start any time of year (copy updated).
- [ ] 🧑 Review any other bio that counts years ("for several years", "since he was a young middle school student")

### Shortcut subdomains
Every `*.faasl.org` shortcut in `content.md` §7 must keep working.
- [ ] 🧑 Confirm the destination for each one (some point at old Google Forms / Adobe Express)
- [ ] 🤖 Write the redirect rules and the automated tests (Phase 5)
- [ ] 🤝 Test every shortcut and old page URL after launch (Phase 7)
- [ ] `hall.faasl.org` / `rental.faasl.org` point to Home for now (revisit in v3.1)
- [ ] 🧑 Pick new campaign shortcuts for the audience pages (💡 `give.`, `join.`, `impact.`, `lessons.`), optionally tagged for analytics (`strategy.md` §5)

### Proof assets for funders & talent (`strategy.md` §6) 🧑
- [x] Yearly numbers: 35+ band musicians; 2 classes of 12+ regulars (about 20 each per year); about 12 parades and 6 concerts
- [ ] Annual report or financial summary; IRS determination letter; recent Form 990
- [ ] Prices for the Give page's "What your gift does": sheet music for a new piece (whole band), band dinner after rehearsal, a typical instrument repair, a uniform, carpool support for a performance

### Musicians page 🧑 (`content.md` §6b)
- [ ] Current emergency contact / medical form (blank)
- [ ] Current uniform agreement (blank)
- [ ] Current photo consent form (blank); confirm it covers the website
- [ ] Anything else in the new-member packet (code of conduct, instrument loan, dues?)
- [x] Forms are printable (PDF downloads)
- [x] Completed forms go to Geronimo for now
- [x] Special contacts: Edgard for lessons; Geronimo for forms, uniforms, music and folders (to be replaced); info@faasl.org for everything else

### Content items 🧑
- [ ] **Keep the public Google Calendars up to date.** Live check (2026-10-20, next 12 months):
  - **Lessons & rehearsals:** healthy. 17 recurring series, 156 upcoming occurrences (beginner, intermediate, rehearsal every Friday), all with location and description.
  - **Performances:** 129 past events since 2017, but only **1** upcoming ("[Tentative] Festival das Filarmónicas 2026", Nov 7, no location or description). New performances need adding, with location and a description (call time, dress code).
  - **Social events:** 40 events, the most recent in **August 2022**. Fundraisers since then were never added.
- [x] Lessons and Musicians pages list the next three weeks of lessons and rehearsals from the lessons calendar (date, time, title; not on Events, not in search data)
- [ ] **BAND app** (band messages and RSVPs): install links for iPhone and Android, and step-by-step instructions to join our group, for the Musicians page
- [ ] **Play-along playlist:** revive and update the YouTube play-along playlist (`practice.faasl.org`) for the Musicians page
- [ ] **Replace Geronimo as the default contact** for forms, uniforms, music and folders (💡 a role-based address such as members@faasl.org)
- [ ] **Annual membership:** amount and what members receive, for the "Become a member" section on Give
- [ ] **Impact page** (`content.md` §5e):
  - [ ] **Governance: research how funds are used** before publishing any claim beyond what's confirmed (confirmed: board is unpaid; money goes to the building and musical needs). Check the Form 990 and budget, and agree wording with the board.
  - [ ] Revisit "Who we serve" later, with local search in mind: San Leandro, Castro Valley, San Lorenzo, Hayward, Oakland
  - [ ] Board members and officers (names and roles)
  - [ ] Documents to publish: IRS determination letter, most recent Form 990, annual report or financial summary
  - [ ] Claim/update the Candid (GuideStar) profile; confirm California Attorney General registry status
  - [ ] Grant and partnership contact (a person, or info@faasl.org)
  - [ ] Update the yearly numbers each year (`src/content/impact.yaml`)
- [ ] **Edgard Gonzalez, Music Teacher & Assistant Conductor:** 2–3 sentence bio that **mentions he teaches music for San Leandro schools**, instruments, credentials, year joined, headshot, and how families should contact him (for the "What if we're late?" FAQ). He appears on Lessons, Join and About; shown on beta as a **Draft** until done.
- [x] **Review the music stores:** web-searched 2026-10-20 (`content.md` §5.3, `src/content/stores.yaml`). A & G Music (Oakland) has closed and is removed.
  - [ ] Call Music Unlimited and Allegro Music to confirm they're open and still rent band instruments
  - [x] Replaced Musician's Friend with Music & Arts
  - [ ] Any new shops to add?
  - [ ] Update the Google My Maps store map: remove A & G Music, check the other pins
- [ ] **Remind notifications:** get the Remind sign-up link/code and step-by-step instructions for joining the lessons list
- [ ] **Mission statement:** work out final wording with the board (working draft in `content.md` §5e)
- [ ] **Donate button:** no online giving yet. Pick a provider (💡 compare free nonprofit options such as Zeffy, Givebutter, PayPal by fees and ease of use), add honor/memorial gift support, then point `donate.faasl.org` at it
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

### Paid membership page
- [ ] New `/members` page focused on paid membership: annual fee, benefits, how to join and renew
- [ ] Link it from Give ("Become a member") and decide whether membership is paid through the donation provider
- [ ] `members.faasl.org` shortcut

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

### Videos
- [ ] 1–2 short performance videos on the Join page (and Events)

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
