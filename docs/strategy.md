# FAASL.org v3 — Goals, audiences & site strategy

Draft for discussion. It turns your direction into goals, audiences, landing pages and a domain plan.
Related: [`brief.md`](./brief.md) · [`todo.md`](./todo.md)

## 1. Where FAASL is now

- **Gigs:** enough already. The site doesn't need to sell performances.
- **Pipeline:** students and amateur musicians are coming in. It needs **nurturing**, not a hard sell.
- **The pivot:**
  1. **Fundraising:** community donors (especially the Portuguese community), corporate donors and sponsors, and government / grant funders
  2. **Better talent, musically:** stronger, more experienced players
  3. **Better talent, organizationally:** board members and skilled volunteers (finance, grants, events, marketing)

## 2. Goals (proposed order)

| # | Goal | What success looks like |
|---|---|---|
| 1 | **Fund the mission:** community, corporate and public funding | Online gifts; sponsorship enquiries; grant applications that link to the site as proof |
| 2 | **Build credibility** with funders and public agencies | An Impact page with numbers, documents and governance that a grant reviewer can check in 5 minutes |
| 3 | **Attract organizational talent** (board and skilled volunteers) | General "get involved" enquiries. No open roles are advertised in v3; a dedicated page waits for v3.1. |
| 4 | **Attract musical talent** (skilled and aspiring musicians) | Enquiries from skilled and aspiring musicians |
| 5 | **Nurture the pipeline** (students, families, amateurs) | Lesson enquiries before February; families on the Remind list; students moving up to the band |
| 6 | **Celebrate community & heritage** | Content that Portuguese-community members share; supports goal 1 |

Goals 1–2 drive the most new work. Goal 5 is mostly the content we already have, made clearer.

## 3. Audiences and what each one needs

| Audience | What convinces them | Their landing page | Main action |
|---|---|---|---|
| **Prospective students & their families** | Free, safe, welcoming, credentialed teacher (Edgard), clear schedule and costs (instrument + book) | `/lessons` | Enquire / join Remind |
| **Prospective musicians** (aspiring → skilled) | Quality of the band, repertoire, conductor, performance calendar, a friendly "come sit in" invite | `/join` | Visit a rehearsal |
| **Organizational talent** (board, skilled volunteers) | A well-run organization, the people they'd work with | v3: a short "Get involved" note on `/about` · v3.1: `/volunteer` | Contact us |
| **Portuguese-community donors** | Heritage, tradition, familiar faces and festas, multi-generation families, honoring loved ones | `/give` | Donate, attend a dinner, honor/memorial gift |
| **Corporate donors & sponsors** | Measurable community impact (youth served, free education), visibility for their brand, employee engagement | v3: "Businesses" section on `/give` · v3.1: `/sponsor` | Matching gift / talk to us |
| **Government & grant funders** scouting non-profits | Mission, programs, outcomes, service area, governance, financial transparency, legal status | `/impact` | Contact; download documents |
| Current members & families | Onboarding forms (emergency, uniform, photo consent), Remind, calendars, special contacts, practice playlist | `/members` (unlisted; may be listed later without the practice playlist) | Complete onboarding; stay in the loop |

### Home page as a router
The long scrolling home page tells the whole story once, then sends each audience to its page:
- An "**I want to…**" strip near the top: *Learn an instrument* · *Play in the band* · *Give* (*Partner with us* and *Volunteer or lead* join in v3.1)
- Each story section (Learn → Grow → Perform → Community → Impact) ends with the matching call to action
- A persistent **Donate** button in the header (most non-profits put it there)

## 4. What each audience page needs

### `/lessons` (students & families): mostly existing content
- Everything in `content.md` §5, plus Edgard's bio, Remind instructions, and a **pathway**: beginner → intermediate → volunteer band
- An alumni success story. **Geronimo is the perfect example:** a middle-school student in the program who is now its conductor.

### `/join` (musical talent): new
- What the band plays (concert and marching repertoire, festas, festivals) with video clips
- Geronimo's bio as conductor; rehearsal day and time
- A general, standing invitation to **skilled and aspiring musicians** (no specific open chairs listed)
- Opportunities for strong players: section leading, solos, mentoring students, chamber groups (if true)
- Low-friction first step: "Come sit in at a rehearsal", with no audition to start (if true)

### `/volunteer` (organizational talent): v3.1
Not in v3, since no roles are being advertised. For v3, a short "Get involved" note on `/about` invites people to contact us. When roles exist:
- Specific open roles, each with a short description and time commitment: board seats, treasurer/bookkeeping, grant writer, event & dinner coordinator, social media & photography, parent volunteers
- Why it's worth it: skills, leadership experience, community impact, resume value
- Board and volunteer bios (the `people` collection), showing who they'd work with
- Cross-post roles to LinkedIn (you already have a page) and volunteer-matching sites

### `/give` (community donors): new
- Online donation (provider to be decided), with suggested amounts tied to impact ("$X buys a method book for a student", "$Y repairs an instrument" — real numbers from you)
- Honor/memorial gifts, which matter in the Portuguese community
- Fundraiser dinners and events (from the calendar)
- Other ways to help: donate an instrument, attend, volunteer
- **Businesses** (v3, until the sponsorship program exists): employer matching gifts how-to, and "Interested in supporting FAASL as a business? Contact us."
- Legal line: 501(c)(3), EIN 94-2930722, tax-deductibility statement

### `/sponsor` (corporate): v3.1
No sponsorship program exists yet. Defining the program and its tiers is v3.1 work (see `todo.md`); the page follows once the board approves it. Planned contents:
- Why partner: youth served, free music education, multi-generational community, local reach
- Sponsorship tiers with benefits (logo on site/banner/programs, recognition at concerts, a performance at a company event, employee volunteer opportunities)
- **Employer matching gifts:** many employees can double their gift through work giving platforms; a short how-to
- A **sponsor packet PDF**, generated from site content like the brochure, so it never goes stale
- Current sponsor logos (when there are some)

### `/impact` (government & grant funders): new and the most important for credibility
- Mission statement, programs, service area (San Leandro / Alameda County), history since 1980
- **Numbers** updated yearly: students taught, ages served, musicians in the band, performances per year, years of free lessons
- Governance: board list, how decisions are made
- Documents: annual report, IRS determination letter, recent Form 990, budget summary, non-discrimination statement
- Third-party verification links: **IRS Tax Exempt Organization Search**, **Candid (GuideStar) profile** (a "Seal of Transparency" is free and widely checked by funders), **California Attorney General Registry of Charities** status
- `Organization` structured data so search engines and funders see consistent facts

## 5. Domains & subdomains

**Recommendation: one site at `www.faasl.org`, with audience pages as folders, and vanity subdomains that redirect to them.**

| Approach | SEO | Effort | Verdict |
|---|---|---|---|
| **Folders** (`www.faasl.org/give`) | ✅ All pages build one domain's authority | Low: one site | **Use for every audience page** |
| **Vanity subdomains that redirect** (`give.faasl.org` → `/give`) | ✅ Neutral; the content lives in one place | Very low: one redirect rule each | **Use for print, QR codes, campaigns** (you already do this) |
| Subdomains with separate content (`give.faasl.org` as its own site) | ⚠ Search engines treat it somewhat separately, so it splits authority | Higher: separate pages to maintain | Only for something truly separate (e.g. a members app) |
| Separate domains (`supportfaasl.org`) | ❌ Starts from zero authority; confuses donors about legitimacy | Highest | Avoid, unless a partner campaign requires it |

New vanity shortcuts to consider: `give.`, `donate.` (exists), `join.`, `impact.`, `lessons.`. Later (v3.1): `sponsor.`, and re-pointing `volunteer.` (currently a Google Form) at `/volunteer`.

**Campaign tracking bonus:** each redirect can add a tag to the URL (e.g. `?utm_source=brochure`), so analytics shows which flyer, banner or QR code brought people in. No extra tools needed.

## 6. Proof assets we'll need (content gathering)

Funders and stronger talent respond to evidence. These are mostly yours to collect; the site will display them.
- Yearly numbers (students, musicians, performances). Volunteer hours are left out: recording is spotty and only covers musicians.
- New member stories / testimonials (the old Stories page was these): a parent, a student, an experienced musician, a board member, a community partner. Each story's pull quote appears as a **testimonial snippet** on the matching audience pages, linking back to the full story.
- Recent performance photos and 1–2 short videos
- Annual report / financial summary; IRS letter; recent 990
- Candid profile; CA Attorney General registry status

## 7. How this changes the site map

| Page | Was (architecture.md §4) | Now |
|---|---|---|
| `/` | Home | Home as story + audience router |
| `/lessons` | Lessons | unchanged |
| `/join` | Join the band | **Sharpened for experienced players** |
| `/volunteer` | — | **v3.1:** organizational talent, once roles are advertised |
| `/give` | part of `/support` | **New:** community giving |
| `/sponsor` | part of `/support` | **v3.1:** corporate partners, once the sponsorship program is defined |
| `/impact` | — | **New:** credibility for funders and agencies |
| `/about` | About | history, heritage, leadership, teachers |
| `/events` | Events | unchanged (fundraiser dinners featured) |
| `/stories` | Stories | rewritten with new member stories / testimonials; feeds every audience page |
| `/contact` | Contact | unchanged |
| `/members` | Members (unlisted) | adds new-member onboarding and special contacts |

Launch priority 💡: Home, Lessons, Join, Give, Impact, About, Contact first. Then Events, Stories, galleries. Sponsor and Volunteer pages are v3.1.
