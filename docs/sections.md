# FAASL.org v3 — Section plans (Phase 2)

One short plan per page: who it's for, what's on it (top to bottom, phone first), where the content comes from, and how it should show up in search. **Draft for review:** edit anything, especially the page outlines and the ❓ questions. Layout and visuals are decided in the design phase (Phase 3); these plans only fix *what* goes on each page and in what order.

Related: [`strategy.md`](./strategy.md) (audiences & site map) · [`content.md`](./content.md) (the copy) · [`brief.md`](./brief.md)

**Content sources:** names in `code` are content files in `src/content/` (already created, with schemas that catch mistakes at build time). "Copy" means prose that will move from `content.md` into Markdown page files.

## Site map

| URL | Page | Primary audience | In v3 launch |
|---|---|---|---|
| `/` | Home | Everyone (router) | ✅ |
| `/lessons` | Free music lessons | Students & families | ✅ |
| `/join` | Play with the band | Skilled & aspiring musicians | ✅ |
| `/give` | Support the band | Community donors, businesses | ✅ |
| `/impact` | Our impact | Government & grant funders | ✅ |
| `/about` | About us | Everyone, especially donors and funders | ✅ |
| `/events` | Events | Community, members | ✅ |
| `/contact` | Contact | Everyone | ✅ |
| `/members` | Members (unlisted) | Current members & families | ✅ |
| `/stories` | Member stories | Everyone | After launch (snippets appear from day one) |
| `/sponsor`, `/volunteer` | | Businesses, organizational talent | v3.1 |
| `/pt/...` | Portuguese pages | Portuguese community | v3.1 |

---

## 0. Global (every page)

**Header**
- Logo + "Portuguese Band of San Leandro" (links home)
- Navigation: Lessons · Join · Give · Impact · About · Events · Contact
- Persistent **Donate** button (goes to `/give`)
- Phone pattern ❓ (design phase): hamburger menu, bottom bar, or sticky Donate

**Announcement banner:** none (dropped for good).

**Footer**
- Short mission line + 501(c)(3) statement + EIN
- Clubhouse address, mailing address, phone, info@faasl.org (`site`)
- Social links (`site`)
- Copyright line (wording pending the ownership decision, `brief.md` §5.2)
- No long subdomain list (those move to `/members` or are simply redirects)

**Search & sharing defaults** (built: `SeoHead`)
- Title pattern: "Page title | Portuguese Band of San Leandro"
- Unique description per page; canonical `https://www.faasl.org/...`; share image per page
- Organization data (NGO + MusicGroup) on every page

**404 page:** short apology, links to Home, Lessons, Contact.

---

## 1. Home `/`

**Job:** tell the story in one scroll and send each visitor to their page.

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Hero | Photo + "We've built a community around music, and you're invited to join us" + short intro | Copy (`content.md` §3.1), photo |
| 2 | **"I want to…" router** | Learn an instrument → `/lessons` · Play in the band → `/join` · Give → `/give` | Fixed links |
| 3 | Our story | Founded 1980 by Portuguese immigrants; name explained; "X years" calculated | Copy §3.1, `site` |
| 4 | Learn | Free lessons for ages 8+, credentialed teacher, what students learn → CTA `/lessons` | Copy §3.2, `lessons` |
| 5 | Grow | Mixed-age band; **testimonial snippet** → CTA `/join` | Copy §3.2, `stories` |
| 6 | Perform | Parades, festivals, city events, caroling; dinners → CTA `/events` | Copy §3.2 |
| 7 | Upcoming events | Next 3 performances/social events → `/events` | Google Calendar (build time) |
| 8 | Support | Short appeal + Donate → `/give`; link to `/impact` | New copy |
| 9 | Leadership preview | 3 leader cards → `/about` | `people` |
| 10 | Contact strip | Address, phone, email → `/contact` | `site` |

**Search:** title "Portuguese Band of San Leandro | Free music lessons & community band". Description from the mission statement (pending review). Keywords: Portuguese band San Leandro, filarmónica, community band East Bay.

❓ Is the order of Learn / Grow / Perform / Support right for the pivot towards fundraising? (Support could move up, right after the story.)

---

## 2. Lessons `/lessons` — ✅ copy reviewed (`content.md` §5)

**Job:** a parent on a phone finds out it's free, who it's for, when and where, what to buy, and how to start, in that order.

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Intro | "Free music lessons" + ages 8 to 108 + start any time of year + CTA "Contact us" | Copy §5.1, `lessons` |
| 2 | Key facts | Cost: free · Ages: 8 to 108 · When: Fridays, beginner 6:30, intermediate 7:15 · Where: 844 Alvarado St. | `lessons`, `site` |
| 3 | How it works | Group lessons, 45 minutes; beginner → intermediate → volunteer band pathway | Copy §5.1 |
| 4 | Your teacher | Edgard Gonzalez card (once his details arrive) | `people` |
| 5 | What students learn | 4 bullet points + "practice at home" tip | Copy §5.1 |
| 6 | Choose an instrument | Instrument picker with demo video; beginner instruments marked; "no strings or piano" | `instruments`, `lessons` |
| 7 | What to buy | Method book + accessories by instrument | `lessons` |
| 8 | Where to rent or buy | Open local stores + online shops + **store map** (Google My Maps embed, loaded on tap so the page stays fast) | `stores`, map |
| 9 | Stay in the loop | Remind sign-up instructions + lessons calendar | `lessons` (Remind TODO), `calendars` |
| 10 | FAQ | 5 questions | `faqs` |
| 11 | Testimonial | A student or parent quote | `stories` |
| 12 | CTA | Contact us to start | `/contact` |

**Search:** title "Free Music Lessons in San Leandro". Description: "Free group band lessons for ages 8 and up in San Leandro, CA. Woodwinds, brass and percussion. Start any time of year." Structured data: `FAQPage`, `Course` ❓.

✅ Keep the store map. It lives in your Google account, so the A & G Music pin needs removing there (`todo.md`).

---

## 3. Join the band `/join` — ✅ copy reviewed (`content.md` §5b)

**Job:** a skilled or aspiring musician decides to come to a rehearsal.

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Intro | General invitation to skilled and aspiring musicians; mixed ages and levels | New copy, based on §3.2 "Grow" |
| 2 | What we play | Concert and marching music; festas, parades, festivals, caroling | Copy §3.2 "Perform" |
| 4 | Our conductors | Geronimo + Edgard (assistant conductor) cards | `people` |
| 5 | Rehearsals | Fridays 8 pm, 2 hours with a break; place | `lessons` (`bandRehearsal`), `site` |
| 6 | Testimonial | Musician quote (Aubury Freed) | `stories` |
| 7 | Returning players | "Played in school? Come back to music." (from the old Remote Restart idea) | New copy |
| 8 | CTA | "Just show up": no audition, no sign-up, extra sheet music on hand | `/contact` for questions |

**Search:** title "Join a Community Band in the East Bay". Keywords: community band San Leandro, adult band, marching band Bay Area.

✅ Fridays at 8 pm, 2 hours with a break. No auditions or official expectations; just show up (extra sheet music on hand).

---

## 4. Give `/give`

**Job:** a community donor gives, and knows it's tax-deductible and well used.

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Appeal | Why giving matters: free music education since 1980 | New copy |
| 2 | Donate | Donate button/embed (provider ❓) + suggested amounts tied to real costs ❓ | `todo.md` |
| 3 | Honor & memorial gifts | Give in someone's name | New copy |
| 4 | Dinners & events | Upcoming fundraisers | Google Calendar (social) |
| 5 | Other ways to help | Donate an instrument, attend, volunteer | New copy |
| 6 | Businesses | Employer matching gifts how-to + "Contact us to support as a business" | New copy |
| 7 | Testimonial | Parent or donor quote | `stories` |
| 8 | Legal line | 501(c)(3), EIN, tax-deductibility statement | `site` |

**Search:** title "Support Free Music Education in San Leandro". Keywords: donate music education East Bay, Portuguese community nonprofit.

❓ Donation provider and suggested amounts (both in `todo.md`).

---

## 5. Impact `/impact`

**Job:** a grant reviewer or agency can verify FAASL in five minutes.

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Mission | Mission statement (pending review) | `site` (to add) |
| 2 | By the numbers | Students taught, musicians in the band, performances per year, years of free lessons (calculated) | New `impact` file (to collect) |
| 3 | Programs | Free lessons, volunteer band, community performances | Copy |
| 4 | Who we serve | Ages, San Leandro / Alameda County | New copy |
| 5 | Governance | Board list | `people` (role: leadership/board) |
| 6 | Documents | Annual report, IRS letter, Form 990 (PDFs) | To collect |
| 7 | Verify us | IRS Tax Exempt Organization Search, Candid profile, CA Attorney General registry | Links |
| 8 | Contact | Who to contact about grants | `site` |

**Search:** title "Our Impact". Structured data: NGO with founding date, address, tax ID (already on every page).

❓ Is there an annual report or financial summary we can publish? Which numbers can you provide?

---

## 6. About `/about` — 📝 copy in review (`content.md` §5c)

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Our story | Founding in 1980, Portuguese immigrants, name and translation, today's diverse membership | Copy §3.1 |
| 2 | Heritage | Festas, Holy Ghost parades, Portuguese meals at dinners | Copy §3.2 |
| 3 | Leadership | Lorenza, Geronimo, John | `people` |
| 4 | Teachers | Edgard | `people` |
| 5 | Get involved | Short note inviting skilled volunteers to contact us | New copy |
| 6 | Our home | ❓ hall mention (deferred to v3.1) | — |

**Search:** title "About the Filarmonica Artista Amadora de San Leandro". Captures searches for the official name and "FAASL".

---

## 7. Events `/events`

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Upcoming | Upcoming events as a list (date, name, place), each with `Event` structured data | Google Calendar at build time + daily rebuild |
| 2 | Calendars | Subscribe buttons for **Performances** and **Social events** | `calendars` |
| 3 | What we perform at | Parades, festivals, city events, caroling | Copy §3.2 |
| 4 | Past events | Later: event write-ups with galleries | `events` (after launch) |

**Search:** structured `Event` data can put performances directly in Google results.

✅ Calendars are separate: Performances and Social events on `/events` (and Home); Lessons & rehearsals on `/lessons` and `/members` only.

**Freshness:** event lists are rebuilt from Google Calendar **weekly** (and on demand), with no JavaScript; an event that ends mid-week stays listed until the next refresh. See `deployment.md` §6.

---

## 8. Contact `/contact`

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Form | Name, email, phone, OK to text?, message; spam protection (form service ❓) | `content.md` §6 |
| 2 | Visit | Clubhouse address + map link | `site` |
| 3 | Mail & phone | P.O. Box, phone, email | `site` |
| 4 | Follow us | Social links | `site` |

**Search:** `LocalBusiness`-style address data (already part of the organization data).

---

## 9. Members `/members` (unlisted)

As in `content.md` §6b: onboarding (printable forms from `memberForms`), where to return them, Remind, calendars, RSVP, volunteer form, practice playlist (hidden if the page is ever listed), special contacts. Hidden from search; a switch lets it be listed later without the practice playlist.

---

## 10. Content model status

| Content | File | Status |
|---|---|---|
| Organization facts | `site.yaml` | ✅ (mission statement to add) |
| People | `people/*.md` | ✅ leaders; Edgard (teacher & assistant conductor) as a draft |
| Instruments | `instruments.yaml` | ✅ |
| Lessons program | `lessons.yaml` | ✅ (Remind TODO) |
| FAQ | `faqs.yaml` | ✅ |
| Calendars | `calendars.yaml` | ✅ |
| Music stores | `stores.yaml` | ✅ checked 2026-10-20 (see `todo.md`) |
| Stories / testimonials | `stories/*.md` | ✅ Aubury's quote; new stories to collect |
| Member forms | `member-forms.yaml` | ✅ titles; PDFs to collect |
| Tags | `tags.yaml` | ✅ starter set |
| Page copy (long prose) | `pages/*.md` | Next: move from `content.md` |
| Impact numbers | `impact.yaml` | To collect |
| Upcoming events | Google Calendar | Next: build-time loader |
