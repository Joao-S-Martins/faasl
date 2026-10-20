# FAASL.org — Site Content (v3)

This file holds all the content from the current site (v2), audited and gathered in one place for the v3 redesign. Edit it freely. Once you approve it, the new site gets built from it.

**How to read this file**

- Normal text is **site content**: what visitors will read.
- Lines starting with `> [!NOTE]` / `> [!WARNING]` are **review notes** from the audit. They're not content. Delete each one once you've dealt with it.
- `TODO:` marks content that's missing and needs writing.
- `🖼️` lines describe the image used in that spot. Image filenames are in `www/img/` (higher-res `@2x` versions sit next to them).
- `[link text](url)` is a link. Vanity subdomains like `events.faasl.org` are listed in [Section 7](#7-vanity-subdomains--redirects).
- Obvious typos were fixed inline. Each fix is listed in [Section 10](#10-audit-log-edits-made-while-transcribing) so you can check them.

**Where this came from:** `www/html/*.html`, `www/html/tmpl/*`, `www/html/blocks/*`, `www/.htaccess.bak`, `www/meta/*` and `branding/` on `main` at commit `68faca3`. I also checked git history for content that was removed or reverted.

---

## 1. Organization facts

These details show up across many pages, so the new site will store them once.

| Field | Value |
|---|---|
| Common name | Portuguese Band of San Leandro |
| Official name | Filarmonica Artista Amadora de San Leandro |
| Abbreviation | FAASL ("the FAASL") |
| Name translation | Band of Amateur Artists of San Leandro |
| Founded | 1980 |
| Tagline | We're committed to impacting lives through music education and mentorship. |
| One-line description (README) | A non-profit focused on music education and mentorship for underserved youth in the East Bay. |
| Legal status | 501(c)(3) non-profit organization |
| EIN | 94-2930722 |
| Mailing address | P.O. Box 2354, San Leandro, CA 94577-0235 |
| Clubhouse / rehearsal hall | 844 Alvarado St., San Leandro, CA 94577 |
| Phone | (510) 357-1449 |
| General email | info@faasl.org |
| Hall rental email (removed page) | rental@faasl.org |
| Copyright line | © 2007–{current year} Filarmonica Artista Amadora de San Leandro. All rights reserved. |
| Brand color | Green — Pantone Green CP, HEX `#00A079`, RGB 0 160 121, CMYK 93 0 63 0 |
| Secondary color (favicon/tile) | `#355749` |
| Full palette | Greens, golds and whites from v2 are the official v3 palette; see `brief.md` §5.3 |
| Logo | `www/img/Logo.svg` |

> [!NOTE]
> The README's "underserved youth in the East Bay" wording doesn't appear anywhere on the site. Reviewing the mission statement is tracked in `todo.md`.

### Social accounts

| Network | Handle | URL |
|---|---|---|
| Facebook | @the.faasl | https://facebook.com/the.faasl |
| Instagram | @the.faasl | https://instagram.com/the.faasl |
| Twitter / X | @faasl | https://twitter.com/faasl |
| YouTube | — | https://www.youtube.com/channel/UCIWQ1_SGK9Ql4D9fzNE56cw |
| LinkedIn | — | https://www.linkedin.com/company/faasl/ |
| Newsletter (Mailchimp) archive | — | https://us13.campaign-archive.com/home/?u=f22bc0566c10786141f983313&id=d0d21800a2 |
| Newsletter sign-up | — | https://eepurl.com/bU0fQf |

> [!NOTE]
> All of these are treated as active. A SoundCloud link was commented out in the footer and is left out.

### Brand values & persona (from `branding/readme.md`)

These are internal notes, not site copy, but they're useful for voice and tone.

- **Values:** Music threads everyone's daily lives together. Kids are the future of our community. Finances shouldn't get in the way of music education.
- **Drivers:** FAASL gives my family an activity that keeps us physically active and supports our academic growth. FAASL gives me a creative outlet to express myself musically for an attentive audience.
- **Persona:** Spirited, Fun, Generous, Creative.

---

## 2. Site-wide elements

### Header / hero (every page)

- **Heading (H1):** Portuguese Band *of* San Leandro
- **Hero:** rotating photo carousel (6 s interval)
  - 🖼️ `home_slide_1.jpg`: full uniformed band posed on church steps, flags and instruments laid out in front
  - 🖼️ `home_slide_2.jpg`: tuba and saxophone players in white uniforms, close up
  - 🖼️ `home_slide_3.jpg`: band in green uniforms performing inside a church
  - 🖼️ `home_slide_4.jpg`: concert band rehearsing in a gym with the conductor on a podium
  - 🖼️ `students_slide_1.jpg`: students rehearsing with a conductor (used as the Students page hero)
- **Primary nav button:** "Subscribe" → newsletter sign-up
- A "Donate" nav button was commented out (it pointed to `help.faasl.org`).

> [!NOTE]
> A **Donate** button is tracked in `todo.md`. For a 501(c)(3) it's usually the second most important call to action.

### Announcement banner (Home and Students)

> ## New music lessons start soon!
> [Click here to learn more](/lessons)

> [!NOTE]
> In v3 this should be an easy-to-toggle announcement with an optional expiry date, so it doesn't stay up for years.

### Footer

- Social icons: Facebook, Instagram, Twitter, YouTube, LinkedIn
- Quick links: see [Section 7](#7-vanity-subdomains--redirects). The footer listed every vanity subdomain.
- Copyright line and 501(c)(3) statement:
  > The Filarmonica Artista Amadora de San Leandro is a [501(c)(3) non-profit](https://apps.irs.gov/app/eos/) organization. EIN: 94-2930722

> [!NOTE]
> I'd suggest a shorter footer in v3: nav links, social icons, address/phone/email and the non-profit line. The long subdomain list is useful to members but adds clutter for new visitors. A "Members" page could hold those links instead (see Section 7).

---

## 3. Home page (`/`)

**Page title:** Portuguese Band of San Leandro – Filarmonica Artista Amadora de San Leandro
**Meta description:** We're committed to impacting lives through music education and mentorship.
**Social share image:** 🖼️ `img/social/index.jpg`

### 3.1 Intro

## We've built a community around music
#### and you're invited to join us

Our group was founded in 1980 by amateur musicians who wanted to enrich their community through music. Over 35 years later, *our goal remains the same*. We remain committed to impacting lives through music education and mentorship opportunities. We firmly believe in supporting musicians of all walks and stages of life. A love for music bonds us all and we want to share it with you.

> 💡 Officially the *Filarmonica Artista Amadora de San Leandro*, our name translates to the *Band of Amateur Artists of San Leandro*.
> — aka the FAASL

Our founders were mostly Portuguese immigrants with varying musical experience; some with no experience at all. They pooled their knowledge and resources to help each other and create this band. Today, our all-volunteer organization has grown into a heterogeneous group representing many different social classes and backgrounds. We each pool our abilities to invest in each other and elevate our lives.

> [!WARNING]
> "Over 35 years later" is out of date: 2026 is 46 years. Suggest "More than 45 years later" or calculating it automatically from 1980.

### 3.2 What a musical community looks like

#### Learn — New musicians are guided every step of the way
##### by credentialed music teachers

🖼️ `students.jpg`: two young members posed and smiling, holding a clarinet and a flag

A community has to make a priority of providing for its future generations. We do this with our *free* beginner and intermediate programs. All lessons are taught in a group setting, with all the same amenities of our volunteer band. The beginner class introduces new musicians, aged 8+, to their instruments and written music. Students can start any time of year. The intermediate class is a transitional program whereby students rehearse and perform with our volunteer band, but also have a separate weekly lesson to focus on excerpts and musical theory.

In our programs, students learn:
- How to play and maintain their instruments
- How to read music and keep time
- Common scales, musical keys, and notations
- Musical etiquette and how to practice at home

**Call to action:** [Learn with us](/lessons)

#### Grow — Novice musicians growing
##### together with experienced musicians

🖼️ `growing_together.jpg`: many uniformed musicians of different ages lined up and playing together

A community must nourish its core. For us, this is our volunteer band. This mixed-age group of new and experienced musicians are dedicated to improving one another as much as improving themselves. Younger musicians play alongside older musicians, learning in a manner that simply can't be replicated in a peer-aged group. Experienced musicians take pride in helping a future generation of musicians while expanding on their own skills with a challenging and changing repertoire.

> "After joining FAASL, I think I've grown as a musician because I have the opportunity to play with more experienced musicians."
> — Aubury Freed

**Secondary link:** [More stories](https://stories.faasl.org) (currently an Adobe Express page)
**Call to action:** [Grow with us](/lessons)

> [!NOTE]
> The "Grow with us" and "Have fun with us" buttons both go to the Students page, but their tooltips say "Jump to our contact form". For adult and experienced musicians, a **Join the band** page or a contact link probably fits better than the beginner lessons page.

> [!NOTE]
> **Stories:** the member stories live on an external Adobe Express page. Rewriting them as a Stories page on faasl.org is tracked in `todo.md`. Original, human content on your own domain is a real SEO win.
>
> **Testimonials are snippets of stories.** Each story has a short pull quote that can appear on other pages (like the Aubury Freed quote here). The full story lives on `/stories`; each snippet links to it. Aubury's quote becomes the first entry.

#### Perform — Public performances
##### and social events

🖼️ `performing.jpg`: band marching at a carnival / street fair

A community thrives when it shares its talents with others. We work with our contacts in neighboring communities to maintain a robust performance schedule that takes us around the SF Bay and into the Central Valley every year. These performances give our musicians both a sense of accomplishment and a drive to improve. We host many dinners during the year, organized by the board for the benefit of our music programs. These fundraisers bring classic Portuguese meals to our tables, as well as some American staples. Breaking bread together reaffirms our commitment to our community.

Common performances each year:
- **Holy Ghost parades:** Many parades are hosted by Portuguese organizations each year
- **Music festivals:** Similar bands host us for concerts just as we host our own
- **City events:** Cherry Festival parade and others
- **Caroling:** Bringing cheer to the holiday season

**Call to action:** [Have fun with us](/lessons)

### 3.3 Meet our community (calendar)

## Meet our community

Embedded Google Calendar showing three calendars:

| Calendar | Public "add to your calendar" link |
|---|---|
| Lessons & rehearsals | https://calendar.google.com/calendar/embed?src=faasl.org_an3en78k4a54qotghed951bdfg%40group.calendar.google.com&ctz=America/Los_Angeles |
| Performances | https://calendar.google.com/calendar/embed?src=faasl.org_92pmmquc4hv1bku5n9qq67gf0g%40group.calendar.google.com&ctz=America/Los_Angeles |
| Social events | https://calendar.google.com/calendar/embed?src=faasl.org_13dt8l4l6cc6s7fea0nq9lg2og%40group.calendar.google.com&ctz=America/Los_Angeles |

Sub-heading above the links: **Add our calendars to yours**
Print-only text: "Visit events.faasl.org for our upcoming events. Hope to see you soon!"

> [!NOTE]
> **SEO idea:** an embedded Google Calendar is invisible to search engines. v3 can fetch the public Performances calendar when the site builds and render upcoming events as real HTML with `Event` structured data. That can get your performances shown directly in Google results. No database needed; see `docs/architecture.md`.

### 3.4 Our leadership team

**Lorenza D.L.G. Tomaz** — *President of the Board*
🖼️ `leader_lorenza.jpg` (new headshot needed, see `todo.md`)
Lorenza raised her son in our program years ago. She actively volunteered in non-musician roles and has served as the president for over five years now.

> [!NOTE]
> "for over five years now" needs updating (tracked in `todo.md`).

**Geronimo Rojas** — *Band Conductor*
🖼️ `leader_geronimo.jpg`
Geronimo has been a member of our volunteer band since he was a young middle school student. His love of music has earned him scholarships and taken him traveling. Now he leads the band that supported his journey.

**João "John" Martins** — *Director of Stuff & Things*
🖼️ `leader_joao.jpg`
John was born into our program, pushed in his stroller as his father volunteered musically. He learned to play as a child and continues to help develop the program in new and innovative ways.

> [!NOTE]
> New, higher-resolution headshots are tracked in `todo.md`.

---

## 4. Teachers (new section)

> [!NOTE]
> The current site has no Teachers section, but the home page promises "credentialed music teachers". Giving each teacher a short bio (name, instruments, credentials) supports that claim, and is good for SEO and for parents' trust. Should this live on the Lessons page, the About page, or both?

**Edgard Gonzalez** — *Music Teacher* (TODO: confirm exact title)
🖼️ TODO: headshot (see `todo.md`)
TODO: Bio, 2–3 sentences. Suggested points: instruments taught, education / credentials, teaching background, how he's connected to the FAASL, something personal.
- **Teaches:** TODO (e.g. beginner class, woodwinds, brass, percussion)
- **Credentials:** TODO
- **Joined FAASL:** TODO (year)

---

## 5. Lessons page (`/lessons`, was `/students.html`)

**Page title:** TODO, e.g. "Free Music Lessons in San Leandro | Portuguese Band of San Leandro"
**Meta description:** TODO, e.g. "Free group band lessons for ages 8 and up in San Leandro, CA. Woodwinds, brass and percussion. Students can start any time of year."
**Social share image:** 🖼️ `img/social/students.jpg`
**Hero:** 🖼️ `students_slide_1.jpg`

> [!NOTE]
> The old pages all shared one generic title and description. Unique, keyword-rich titles per page ("free music lessons San Leandro") are one of the quickest SEO wins. The suggestions above are placeholders for you to edit.

### 5.1 About our free lessons

## About our free lessons
#### and how to get started

When we say *free lessons*, we really mean it. We have a large backing of volunteers and donors who help us operate this program without needing to charge our students a cent. With that said, we cannot provide new students with instruments and method books. We do have recommendations for renting-to-own or outright purchasing instruments as well as the very inexpensive books.

Our free lessons are taught in a group session once a week. These lessons are 30 minutes and are comparable and complementary to many public school programs. From beginners to those with a few years of experience, you're welcome to start any time of year. It's always a great time to learn, from ages 8 to 108. [Contact us](#contact) to discuss how we can start helping you today!

In our programs, students learn:
- How to play and maintain their instruments
- How to read music and keep time
- Common scales, musical keys, and notations
- Musical etiquette and how to practice at home

> 💡 Building a regular practice routine at home is the core of succeeding in music.
> — Every successful musician, ever!

Our program is built around concert band and marching music. Because of this, we only teach instruments that are common to those types of music. This includes woodwinds, brass, and some percussion, but excludes strings (violins, guitars) and keyed instruments (piano).

### 5.2 Choose an instrument

## Choose an instrument
#### and fall head-over-heels in love

Click to play the video or select an instrument to jump directly to its demo.

**Demo video:** YouTube `CCTeSjpDsIs` (https://youtu.be/CCTeSjpDsIs)

Instruments marked ★ are the most common for beginners.

| Instrument | Beginner-friendly | Demo timestamp |
|---|---|---|
| Flute | ★ | 0:17 |
| Piccolo | | — |
| Oboe | | 1:27 |
| Clarinet | ★ | 3:23 |
| Bass clarinet | | — |
| E-flat clarinet | | — |
| Alto saxophone | ★ | 5:30 |
| Tenor saxophone | | — |
| Baritone saxophone | | — |
| Trumpet | ★ | 8:25 |
| French horn | | 10:11 |
| Trombone | ★ | 12:47 |
| Euphonium | | 15:16 |
| Tuba | | 17:06 |
| Snare drum | ★ | 18:43 |
| Pitched percussion | | 19:38 |

> [!NOTE]
> Is the instrument list still accurate? Each instrument could get its own short section ("What is it like to play the clarinet?"). That would be great long-tail SEO content for parents, but it's optional.

### 5.3 Educational materials and recommended stores

## Educational materials
#### and recommended stores

Each student will need a copy of the red instructional method book, *"Standard of Excellence, Book 1"*.

🖼️ `standards-of-excel-001.jpg`: a short stack of the red method books (image credit: drumsonsale.com)

> ⚠️ Purchase the version of the book that is written for your chosen instrument.

Additionally, here is a list of items that your instrument will regularly need:
- **Most woodwinds:** Extra reeds (size 2.5), a swab & cork grease
- **Flutes:** Cleaning cloth or swab
- **Most brass:** Valve oil & slide grease
- **Trombones:** Slide oil
- **Drums:** An extra pair of sticks

Our musicians have been happy to work with these local music shops through the years:
- [Music Unlimited, San Leandro](https://www.facebook.com/MusicUnlimitedSanLeandro/)
- [ABC Music, Castro Valley](https://www.facebook.com/abcmusiccastrovalley/)
- [JAMS Music, Dublin](https://www.jamsmusicdublin.com/)
- [Allegro Music, Fremont](http://www.allegromusic.net/)

[Woodwind & Brasswind](https://www.wwbw.com) and [Musician's Friend](https://www.musiciansfriend.com) are popular online shops, but we recommend visiting a local store with knowledgeable staff when possible.

**Map:** Google My Maps embed of the stores (`mid=1Rf94gdKG8Bf4opaiKifwnX2ZrOpaziRa`)

> [!NOTE]
> **Stores checked 2026-10-20** by web search (details and sources in `src/content/stores.yaml`):
> - **A & G Music, Oakland: closed.** Yelp and MapQuest list it as permanently closed (a forum post says June 2024). Removed.
> - **Music Unlimited, San Leandro:** appears open, operating as the showroom for the Instrumentpro online store. No website found.
> - **ABC Music, Castro Valley:** open (Yelp updated September 2026). Its old website link was swapped for its Facebook page.
> - **JAMS Music, Dublin:** open; own website current, with school band rentals.
> - **Allegro Music, Fremont:** probably open (directory listings, a February 2026 review); website not verified.
> - **Woodwind & Brasswind:** merged into Music & Arts in 2024; wwbw.com still operates. **Musician's Friend:** relaunched in May 2026 as an off-price outlet, less suited to beginners. 💡 Consider listing **Music & Arts** instead (Bay Area stores and band rental programs).
>
> A phone call is the only sure check; worth doing for Music Unlimited and Allegro before launch. The image credit for the method books should also be confirmed, or the photo swapped for your own.

### 5.4 FAQs

> [!NOTE]
> v3 will mark these up as `FAQPage` structured data, so keeping them as clear question/answer pairs helps search.

**When are lessons?**
Typically Friday nights at 6:30 and 7:15. Check the calendar for updates. Each lesson is punctual and runs a half hour.
[Lessons & rehearsals calendar](https://calendar.google.com/calendar/embed?src=faasl.org_an3en78k4a54qotghed951bdfg%40group.calendar.google.com&ctz=America/Los_Angeles)

**How long are lessons?**
30 minutes for the instructional time. Intermediate students will also participate in the volunteer band rehearsal, which runs about 90 minutes.

**What if we're late?**
Please notify Edgard ASAP if you're running late or have to miss a lesson entirely. When arriving late, enter quietly.

**Where are lessons?**
Lessons are taught in the same hall where our volunteer band rehearses.
844 Alvarado St., San Leandro, CA 94577

**Anything else?**
Students should arrive 10 minutes early to assemble their instruments and warm up. Parents are welcome to sit near the class so long as they are completely silent. Parents can also talk in the clubhouse.

> [!WARNING]
> "Notify Steve" was changed to Edgard. How families reach him is part of gathering Edgard's details in `todo.md`.

**How do I get lesson updates?**
TODO: Instructions and link for joining the Remind notifications list for lessons (tracked in `todo.md`).

---

## 6. Contact (shared section, used on Home and Lessons)

## Contact us today!

**Contact form fields**

| Field | Required | Notes |
|---|---|---|
| Full name | ✔ | |
| Email | ✔ | |
| Phone number | | placeholder "(510) 555-1212" |
| May we text this number? | | Yes / No |
| Message | ✔ | placeholder "Questions and comments" |
| Anti-spam math question | ✔ | always adds up to 22 |

Submissions are emailed to **info@faasl.org** with the subject "FAASL.org: Contact from {name} using a form at {page}".

Messages shown after submitting:
- **Success:** Thanks for contacting us. We will get back to you soon.
- **Invalid:** There is a problem with the form. Correct it and submit again.
- **Failure:** There was a technical problem submitting the form. Try again later.

### Stay connected

- **Mail:** P.O. Box 2354, San Leandro, CA 94577-0235
- **Clubhouse:** 844 Alvarado St., San Leandro, CA 94577
- **Phone:** [(510) 357-1449](tel:+15103571449)
- **Newsletter:** [newsletter.faasl.org](https://newsletter.faasl.org)
- **Facebook:** [@the.faasl](https://facebook.faasl.org)
- **Instagram:** [@the.faasl](https://instagram.faasl.org)
- **Twitter:** [@faasl](https://twitter.faasl.org)
- **Webmaster:** John Martins — info@faasl.org

> [!NOTE]
> The current form uses a PHP script on the shared host. That goes away in v3; `docs/architecture.md` lists server-free replacements. The math question can be replaced with an invisible spam check (honeypot / Cloudflare Turnstile).

---

## 6b. Members page (`/members`, unlisted)

For current members, students and families. **Unlisted** for now: not in the menu and hidden from search engines, but anyone with the link can open it (no login). It may be listed publicly later, **without the practice playlist** (the "music link"). The site will have a switch for that, so listing it is a one-line change.

> [!WARNING]
> Because anyone with the link can see this page, it must only hold **blank** forms and general information. Completed forms (emergency contacts, medical info, signatures) never go on the website; they're returned on paper, by email, or through a Google Form that only the board can see. The same goes for personal phone numbers (see "Special contacts" below).

### New member onboarding
Everything a new student, family or musician needs to get started, in order:

Forms are **printable PDFs** to download, fill in and return.

1. **Emergency contact & medical form** — TODO: current document (PDF)
2. **Uniform agreement** — TODO: current document (PDF)
3. **Photo consent form** — TODO: current document (PDF; must cover publishing on the website; see `brief.md` §5.1)
4. TODO: anything else in the current new-member packet (code of conduct? instrument loan agreement? membership dues?)
5. Where to return completed forms: TODO (in person to whom / email address)

### Stay in the loop
- **Remind:** TODO: how to join the lessons Remind list (same instructions as the Lessons page)
- **Calendars:** subscribe links for Lessons & rehearsals, Performances, Social events (see §3.3)
- **RSVP form** (`rsvp.faasl.org`)
- **Volunteer form** (`volunteer.faasl.org`)

### Practice
- **Practice playlist** (`practice.faasl.org`, YouTube). ⚠ Hidden if the page is ever listed publicly.

### Special contacts
TODO: who to contact for what, e.g. absences and lateness (Edgard?), uniforms, music and folders, general questions (info@faasl.org).

> [!NOTE]
> 💡 Prefer **role-based email addresses** (e.g. uniforms@faasl.org forwarding to the right volunteer) or "message us on Remind" over personal phone numbers. They survive volunteers changing roles and keep personal numbers off a public page.

---

## 7. Vanity subdomains & redirects

These currently live in `www/.htaccess.bak` on the shared host. They're printed in brochures and handed out at events, so **they must keep working** after the move. `docs/architecture.md` covers how. Testing every one is tracked in `todo.md`.

| Subdomain | Currently goes to | In footer? | v3 target |
|---|---|---|---|
| `stories.faasl.org` | Adobe Express page (`new.express.adobe.com/webpage/QA4cx0phRdfoF`) | ✔ | TODO |
| `facebook.faasl.org` | facebook.com/the.faasl | ✔ | TODO |
| `instagram.faasl.org` | instagram.com/the.faasl | ✔ | TODO |
| `twitter.faasl.org` | twitter.com/faasl | ✔ | TODO |
| `youtube.faasl.org` | YouTube channel `UCIWQ1_SGK9Ql4D9fzNE56cw` | (icon) | TODO |
| `linkedin.faasl.org` | linkedin.com/company/faasl | (icon) | TODO |
| `events.faasl.org` | Google Calendar (all 3 calendars) | ✔ | `/events` |
| `newsletter.faasl.org` | Mailchimp campaign archive | ✔ | TODO |
| `subscribe.faasl.org` | Mailchimp sign-up (`eepurl.com/bU0fQf`) | ✔ | TODO |
| `brochure.faasl.org` | `/downloads/tri-fold_brochure.pdf` | ✔ | Brochure project (see `todo.md`). PDF isn't in the repo. |
| `contact.faasl.org` | Home page `#contact` | ✔ | `/contact` |
| `log.faasl.org` | Google Form: volunteer hours log | ✔ | Keep the redirect; not linked from the v3 site |
| `practice.faasl.org` | YouTube practice playlist `PLUc6RuyKwWdnL192YgHQ5P-VH8CVN3MEU` | ✔ | TODO |
| `volunteer.faasl.org` | Google Form `1T5RKcQmOUZ2LyR4nkhu5rbxMQllpn0ePETf_H_88RIs` | ✔ | TODO |
| `students.faasl.org` | `/students.html` | ✔ | `/lessons` |
| `covid.faasl.org` | `/covid.html` | ✔ | Home (program ended) |
| `enter.faasl.org` | Google Form: COVID check-in | ✔ | Home (program ended) |
| `remote.faasl.org` | Home page | | Home (program ended) |
| `donate.faasl.org` | `/donate.html` (⚠️ this page doesn't exist) | | `/support` |
| `hall.faasl.org` | `/hall.html` (removed) | | Home for now; revisit in v3.1 |
| `rental.faasl.org` | `/hall.html` (removed) | | Home for now; revisit in v3.1 |
| `rsvp.faasl.org` | Google Form (RSVP) | | TODO |
| `survey.faasl.org` | SurveyMonkey `V6C86KL` | (commented out) | TODO |
| `calendar.faasl.org` | (not in `.htaccess`; commented out in footer) | | `/events` |
| `drive.`, `mail.`, `uniform.`, `help.`, `soundcloud.` | (commented out in footer; no redirect rule) | | not set up today; skip |

Also: old page URLs (`/index.html`, `/students.html`, `/covid.html`, `/remote.html`, `/hall.html`) should get permanent (301) redirects to their v3 equivalents (`/covid.html` and `/remote.html` → Home), so existing Google rankings and bookmarks carry over.

> [!NOTE]
> **Members page idea:** the member-only links (practice playlist, RSVP, calendars, volunteer form) could go on one unlisted `/members` page rather than in the public footer. The volunteer hours log is no longer featured.

---

## 8. Removed / historical content

### Hall rental page (removed June 2024)

The Hall page and its banner were removed in commit `68faca3` ("Removed hall info"), so they're **not** carried into v3. A summary is kept in case you want it back:

> Welcome to our new multi-purpose, sound-treated facility and make it yours for a day. Our new, multipurpose hall was just built in 2021 and is ready to serve the community for all of its needs. Reach out to us about hosting your upcoming corporate and family events.
> Features: 150 seating capacity · approximately 2,000 sq ft · full catering kitchen · round and rectangular tables with padded folding chairs · acoustical treatments.
> Download our contract and rates (`www/pdf/FAASL_RENTAL_PACKAGE_10.22.pdf`). Send questions to rental@faasl.org.
> 🖼️ `rental_01.jpg` – `rental_06.jpg`: banquet setups and an evening concert in the hall

> [!NOTE]
> The hall and rental content is up for debate and deferred to v3.1 (see `todo.md`).

### COVID-19 policies and Remote Restart pages (dropped in v3)

Both programs have ended, so `/covid.html` and `/remote.html` aren't carried over; their old URLs and subdomains redirect to Home. Their full text remains in git history (`www/html/covid.html`, `www/html/remote.html`). The "Played in school? Come back to music" idea from Remote Restart may still fit on the `/join` page.

### Old site text

The README points to an even older static page (commit `2ff0638`). It isn't carried over.

---

## 9. Image inventory

All in `www/img/`. "@2x" means a double-resolution copy exists.

| File | Size (largest) | Subject | Used on v2 | Suggested v3 use |
|---|---|---|---|---|
| `Logo.svg` | vector | FAASL logo | nav | logo, favicon source |
| `home_slide_1.jpg` | 1731×940 @2x | full band on church steps with flags | home hero | hero / About |
| `home_slide_2.jpg` | 1440×1442 @2x | tuba and sax players, white uniforms | home hero | Perform |
| `home_slide_3.jpg` | 1334×860 @2x | band in green uniforms inside a church | home hero | Perform |
| `home_slide_4.jpg` | 1732×1039 @2x | concert band in gym with conductor | home + students hero | Join the band |
| `students_slide_1.jpg` | 3814×2204 @2x | students rehearsing with conductor | students hero | Lessons hero |
| `students.jpg` | 1280×1200 @2x | two young members with clarinet and flag | home "Learn" | Lessons |
| `growing_together.jpg` | 1280×1200 @2x | mixed-age band marching | home "Grow" | Home |
| `performing.jpg` | 1280×1280 @2x | band marching at a carnival | home "Perform" | Performances |
| `standards-of-excel-001.jpg` | 900×900 | method books (third-party photo) | students | Lessons (or replace) |
| `leader_*.jpg` (geronimo, joao, lorenza) | 280×280 @2x | headshots | leadership | to be replaced (see `todo.md`) |
| `leader_luci.jpg`, `leader_steve.jpg` | 280×280 @2x | former leader / instructor | no | not used in v3 |
| `rental_01`–`06.jpg` | 1008×1344 max | hall events | removed hall page | About / fundraisers |
| `social/index.jpg`, `social/students.jpg` | — | social share cards | meta tags | regenerate per page |
| `www/favicons/*` | — | favicon set | all | regenerate from `Logo.svg` |

> [!NOTE]
> Fresh photos would help the most: recent performances, students with their teachers (including Edgard), and new headshots (in `todo.md`). Do you have a shared album to pull from?

---

## 10. Audit log: edits made while transcribing

Fixed inline (original → new):
- "learning in a **manor**" → "manner"
- "play **along side**" → "alongside"
- "**neighbouring**" → "neighboring" (US spelling, consistent with the rest of the site)
- "comparable and **complimentary**" → "complementary"
- "prior **begining** students" → "beginning"
- "**warm-up**" (verb) → "warm up"
- "150 **sitting** capacity" → "seating"; "just **build** in 2021" → "built"
- "Musician's Friend" link was missing `https://` (broken relative link) → fixed

Content decisions applied (October 2026 review):
- President: Lorenza D.L.G. Tomaz (the Luci entry was removed)
- Teacher: Edgard Gonzalez (Steve removed; the FAQ's "notify Steve" now says Edgard)
- Conductor: Geronimo Rojas, titled "Band Conductor"
- John Martins stays on the leadership team
- Address confirmed: 844 Alvarado St., San Leandro
- Lessons: Friday 6:30 and 7:15
- All social accounts treated as active
- COVID-19 and Remote Restart pages dropped

Not changed yet:
- "Over 35 years later" and "president for over five years now" (date updates are in `todo.md`)
- Store list (review tracked in `todo.md`)
- Image alt text that said "Portrait of Lorenzo Tomaz". The new site will write fresh alt text.
