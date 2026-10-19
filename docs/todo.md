# FAASL.org v3 — To-do & roadmap

The plan for the v3 relaunch, in phases. Review it, reorder it, cross things out.
Related: [`brief.md`](./brief.md) (goals & decisions) · [`content.md`](./content.md) · [`architecture.md`](./architecture.md) · [`astro-extensibility.md`](./astro-extensibility.md)
(The old `www/todo.md` is the v2 list and will be retired along with `www/`.)

**Owner key:** 🧑 you · 🤖 me (Claude) · 🤝 together

| Phase | What | Gate before moving on |
|---|---|---|
| 0 | Brief & decisions | You've reviewed `brief.md` |
| 1 | Infrastructure & test page | Test page live on a Cloudflare preview URL; CI green |
| 2 | Section planning | Each section has an agreed outline and content model |
| 3 | **⏸ Design (pause)** | Layout and visual direction approved, mobile first |
| 4 | Build sections | Each section reviewed on a preview URL |
| 5 | Pre-launch | Launch checklist complete |
| 6 | Launch & follow-up | Live on faasl.org |
| — | Content gathering | Runs alongside every phase |

---

## Phase 0 — Brief & decisions

- [ ] 🧑 Review `brief.md`: goals order, audiences, requirements, constraints
- [ ] 🧑 Answer the ❓ decisions that block Phase 1:
  - [ ] Who owns the Cloudflare account (💡 an organization account on an faasl.org email)
  - [ ] Plain CSS vs. Tailwind
  - [ ] `faasl.org` vs. `www.faasl.org` as the main address (only needed before launch, but good to settle early)
- [ ] 🧑 Target launch date (💡 early January, before February lesson recruitment)
- [ ] 🧑 Collect inspirations (`brief.md` §4). Needed before Phase 3.

## Phase 1 — Infrastructure & test page

Goal: prove the whole pipeline end to end (code → CI → Cloudflare preview) with one throwaway page, before any real design.

### Project setup
- [ ] 🤖 Scaffold Astro at the repo root (TypeScript strict); leave `www/` untouched
- [ ] 🤖 Pin Node LTS (`.nvmrc` / `engines`) and lock dependencies
- [ ] 🤖 Add integrations: React, MDX, sitemap
- [ ] 🤖 Prettier + ESLint (with Astro plugins), `astro check`
- [ ] 🤖 `.gitignore`, `.editorconfig`, and a README section: how to run, build, preview, add content

### Foundations
- [ ] 🤖 `BaseLayout` with an SEO head component: title, description, canonical, Open Graph/Twitter, JSON-LD organization
- [ ] 🤖 Content collections skeleton with schemas: `site` (org facts), `people`, `tags`
- [ ] 🤖 Seed content: org facts from `content.md` §1, plus Edgard's stub entry (marked unpublished)
- [ ] 🤖 Base CSS: reset, design-token placeholders (colors, type scale, spacing), mobile-first breakpoints
- [ ] 🤖 `public/robots.txt` that blocks indexing on preview URLs (and a launch-time switch to allow it)
- [ ] 🤖 `_redirects` / `_headers` skeletons (old URLs → new, security headers)

### Test page
- [ ] 🤖 One `noindex` test page that exercises everything:
  - an optimized responsive photo (from `www/img`)
  - a `PersonCard` rendered from the `people` collection
  - a tiny React island (e.g. a counter or the instrument picker prototype)
  - SEO head output (title, meta, JSON-LD) to inspect
- [ ] 🤝 Check it on a real phone

### CI & deploys
- [ ] 🤖 GitHub Actions on every push and PR: install → `astro check` → lint → build
- [ ] 🧑 Create the Cloudflare account / project; connect the GitHub repo (needs your login)
- [ ] 🤝 Configure the Cloudflare project: build command, output folder, Node version; production branch = `v3` until launch; previews for other branches
- [ ] 🤝 Confirm a preview URL deploys on push
- [ ] 🤖 Lighthouse check in CI (report only for now; budgets once the design exists)

## Phase 2 — Section planning

For each section, agree on: **purpose & audience · URL · content fields (schema) · components · SEO target (title, keywords, structured data) · open content questions.** I'll draft each as a short spec for you to review.

- [ ] 🤝 Information architecture: confirm the site map and the **hybrid long home page** approach (`brief.md` §7)
- [ ] 🤝 Global: header & mobile nav, footer, announcement banner, SEO defaults, 404 page
- [ ] 🤝 Home (long scrolling story: intro → learn → grow → perform → events → leadership → contact)
- [ ] 🤝 Lessons: about, instruments + demo video, materials & stores, FAQ, Remind sign-up
- [ ] 🤝 Join the band (adults / returning / experienced players)
- [ ] 🤝 About: history & name, leadership, teachers
- [ ] 🤝 Events: upcoming (from Google Calendar), subscribe links; past write-ups later
- [ ] 🤝 Support: donate, volunteer, 501(c)(3) info
- [ ] 🤝 Contact: form, address, phone, map, socials
- [ ] 🤝 Members (unlisted): calendars, hours log, practice playlist, RSVP
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
- [ ] 🤖 Contact (+ form service)
- [ ] 🤖 Events (calendar loader)
- [ ] 🤖 Join, Support, Members
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

## Phase 6 — Launch & follow-up

- [ ] 🤝 Add faasl.org to Cloudflare; **verify every DNS record (especially MX/TXT for email)** against the current host
- [ ] 🤝 Switch nameservers; attach the custom domain; production branch → `main` (merge `v3`)
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
- [ ] 🤝 Test every shortcut and old page URL after launch (Phase 6)
- [ ] `hall.faasl.org` / `rental.faasl.org` point to Home for now (revisit in v3.1)

### Content items 🧑
- [ ] **Gather Edgard Gonzalez's details:** exact title, 2–3 sentence bio, instruments, credentials, year joined, headshot, and how families should contact him (for the "What if we're late?" FAQ)
- [ ] **Review the music stores:** check each shop on the Lessons page is still open, confirm links, and add or remove shops
- [ ] **Remind notifications:** link and step-by-step instructions for joining the Remind list for lesson updates
- [ ] **Review the mission statement:** decide on official wording (the README uses "music education and mentorship for underserved youth in the East Bay")
- [ ] **Donate button:** decide yes/no and the provider (PayPal, Givebutter, Zeffy…), then point `donate.faasl.org` at it
- [ ] **Rewrite the Stories page:** bring member stories over from Adobe Express as a Stories page on faasl.org, then point `stories.faasl.org` at it
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

### Hall & rental
Whether the hall appears on the site at all is up for debate. Return to it after launch.
- [ ] Decide whether the hall gets a mention (e.g. "Our home" on `/about`) or a rental page again
- [ ] If rentals return: update the rental package (`www/pdf/FAASL_RENTAL_PACKAGE_10.22.pdf`), rates and rental@faasl.org contact
- [ ] Decide whether to use the hall photos (`rental_01`–`06`)
- [ ] Re-point `hall.faasl.org` and `rental.faasl.org` (Home until then)
