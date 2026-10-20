# FAASL.org — Site Content (v3)

This file holds all the content from the current site (v2), audited and gathered in one place for the v3 redesign. Edit it freely. Once you approve it, the new site gets built from it.

**How to read this file**

- Normal text is **site content**: what visitors will read.
- Lines starting with `> [!NOTE]` / `> [!WARNING]` are **review notes** from the audit. They're not content. Delete each one once you've dealt with it.
- `TODO:` marks content that's missing and needs writing.
- `🖼️` lines describe the image used in that spot. Image filenames are in `www/img/` (higher-res `@2x` versions sit next to them).
- `[link text](url)` is a link. Vanity subdomains like `events.faasl.org` are listed in [Section 7](#7-vanity-subdomains--redirects).
- `{{beginner.time}}`-style tokens mark **schedule facts** (days, times, lengths, address). They're filled in from one file, so the schedule is written in exactly one place. See [Weekly schedule](#weekly-schedule) in §1.
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

### Weekly schedule

**The only place days and times are written.** Source: `src/content/schedule.yaml`. Every page, the FAQ and the structured data read from it, so a schedule change is one edit there.

| Token prefix | What | Day | Time | Length |
|---|---|---|---|---|
| `beginner` | Beginner class | Friday | 6:30 pm | 45 minutes |
| `intermediate` | Intermediate class | Friday | 7:15 pm | 45 minutes |
| `band` | Band rehearsal | Friday | 8:00 pm | 2 hours, with a break |

**Tokens to use in copy** (anywhere on the site, including the FAQ):
- `{{beginner.time}}` → 6:30 pm · `{{beginner.days}}` → Fridays · `{{beginner.length}}` → 45 minutes (same for `intermediate` and `band`)
- `{{band.note}}` → with a break
- `{{schedule}}` → "Fridays: Beginner class 6:30 pm · Intermediate class 7:15 pm · Band rehearsal 8:00 pm"
- `{{address}}` → 844 Alvarado St., San Leandro

**Style:** times are always written "6:30 pm" (lowercase pm, with minutes); days are plural for recurring events ("Fridays"). A misspelled token stops the build, so mistakes can't reach the site.

To find every place the schedule appears, search the repo for `{{`.

### Social accounts

| Network | Handle | URL |
|---|---|---|
| Facebook | @the.faasl | https://facebook.com/the.faasl |
| Instagram | @the.faasl | https://instagram.com/the.faasl |
| X (formerly Twitter) | @faasl | https://x.com/faasl |
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

### Announcement banner

Dropped in v3 (the old "New music lessons start soon!" banner). No announcement banner on the new site.

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

A community has to make a priority of providing for its future generations. We do this with our *free* beginner and intermediate programs. All lessons are taught in a group setting, with all the same amenities of our volunteer band. The beginner class introduces new musicians, aged 8+, to their instruments and written music. Students can start any time of year. The intermediate class builds on the basics with more challenging music and music theory, and many band volunteers use it to learn a second or third instrument.

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

A community thrives when it shares its talents with others. We work with our contacts in neighboring communities to maintain a robust performance schedule that takes us around the SF Bay and Central Valley every year. These performances give our musicians both a sense of accomplishment and a drive to improve. We host many dinners during the year, organized by the board for the benefit of our music programs. These fundraisers bring classic Portuguese meals to our tables, as well as some American staples. Breaking bread together reaffirms our commitment to our community.

Common performances each year:
- **Holy Ghost parades:** Many parades are hosted by Portuguese organizations each year
- **Music festivals:** We host guest bands, or they host us
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

**Edgard Gonzalez** — *Music Teacher & Assistant Conductor*
🖼️ TODO: headshot (see `todo.md`)
TODO: Bio, 2–3 sentences. **Must mention that he teaches music for San Leandro schools.** Other points: instruments taught, education / credentials, how he's connected to the FAASL, something personal.
- **Teaches:** TODO (e.g. beginner class, woodwinds, brass, percussion)
- **Credentials:** TODO
- **Joined FAASL:** TODO (year)

---

## 5. Lessons page (`/lessons`, was `/students.html`) — ✅ reviewed

> [!NOTE]
> **Reviewed with you on 2026-10-20.** This is the final copy for the page, top to bottom. Structured parts (key facts, instruments, accessories, stores, FAQ) come from the content files in `src/content/` and are reproduced here so the whole page reads in one place. Open items: Edgard's card and the Remind sign-up (both in `todo.md`).

**Page title:** Free Music Lessons in San Leandro
**Meta description:** Free group band lessons for ages 8 to 108 in San Leandro, CA. Woodwinds, brass and percussion. Start any time of year.
**Social share image:** 🖼️ `img/social/students.jpg` (to regenerate)
**Hero:** 🖼️ `students_slide_1.jpg`

### 5.1 Intro

# Free Music Lessons
#### for ages 8 and up, in San Leandro

When we say *free lessons*, we really mean it. Our volunteers and donors make it possible to teach every student without charging a cent. From beginners to those with a few years of experience, you're welcome to start any time of year. It's always a great time to learn, from ages 8 to 108.

**No sign-up needed: just come to a class on {{beginner.days}}.** Questions first? **[Contact us](/contact)**

| | |
|---|---|
| **Cost** | Free |
| **Ages** | 8 to 108 |
| **When** | {{beginner.days}}: beginners {{beginner.time}}, intermediate {{intermediate.time}} |
| **Where** | {{address}} |

### 5.2 How it works

Lessons are taught in small groups once a week, for {{beginner.length}}. They're comparable to, and a great complement to, many public school music programs.
- **Beginner class ({{beginner.time}}):** introduces new musicians to their instruments and to reading music.
- **Intermediate class ({{intermediate.time}}):** builds on the basics with more challenging music and music theory. Many of our band volunteers also use it to learn a second or third instrument.
- **The band:** many of our musicians started in these classes. Our conductor, Geronimo, joined as a middle school student.

### 5.3 Your teacher

*[Edgard Gonzalez card: photo, title, bio. Appears once his details arrive (`todo.md`). See §4.]*

### 5.4 What students learn

- How to play and care for their instrument
- How to read music and keep time
- Common scales, musical keys and notation
- Musical etiquette, and how to practice at home

> 💡 Building a regular practice routine at home is the key to succeeding in music.
> — Every successful musician, ever!

### 5.5 Choose an instrument

Our program is built around concert band and marching music, so we teach woodwinds, brass and percussion, but not strings or piano. Tap an instrument to see and hear it. ★ marks the most common choices for beginners.

*[Instrument picker with the demo video, YouTube `CCTeSjpDsIs`; instruments and timestamps in `src/content/instruments.yaml`]*

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

### 5.6 What you'll need

Each student needs their own instrument and method book.
- **Method book:** *Standard of Excellence, Book 1* (the red one). Buy the version written for your instrument.
- **Accessories:**
  - Most woodwinds: extra reeds (size 2.5), a swab and cork grease
  - Flutes: a cleaning cloth or swab
  - Most brass: valve oil and slide grease
  - Trombones: slide oil
  - Drums: an extra pair of sticks

🖼️ `standards-of-excel-001.jpg` (third-party photo, credit drumsonsale.com; replace with our own if possible)

### 5.7 Where to rent or buy

Our musicians have been happy with these local shops:
- [Music Unlimited, San Leandro](https://www.facebook.com/MusicUnlimitedSanLeandro/)
- [ABC Music, Castro Valley](https://www.facebook.com/abcmusiccastrovalley/)
- [JAMS Music, Dublin](https://www.jamsmusicdublin.com/)
- [Allegro Music, Fremont](http://www.allegromusic.net/)

*[Store map: Google My Maps `mid=1Rf94gdKG8Bf4opaiKifwnX2ZrOpaziRa`, loaded on tap]*

Online, [Woodwind & Brasswind](https://www.wwbw.com) and [Music & Arts](https://www.musicarts.com) are popular, but we recommend a local store with knowledgeable staff when possible.

> [!NOTE]
> **Stores checked 2026-10-20** by web search (details and sources in `src/content/stores.yaml`): A & G Music (Oakland) has closed and is removed; Musician's Friend was replaced with Music & Arts. Calls to Music Unlimited and Allegro, and updating the map pins, are in `todo.md`.

### 5.8 Stay in the loop

- **Remind:** TODO: how to join the lessons list (`todo.md`)
- **Lessons & rehearsals calendar:** [Add to your calendar](https://calendar.google.com/calendar/embed?src=faasl.org_an3en78k4a54qotghed951bdfg%40group.calendar.google.com&ctz=America/Los_Angeles)

### 5.9 FAQ

Marked up as `FAQPage` structured data for search. Source: `src/content/faqs.yaml`.

**When are lessons?**
{{beginner.days}}. The beginner class is at {{beginner.time}} and the intermediate class at {{intermediate.time}}. Check the lessons calendar for changes. Lessons start on time and run {{beginner.length}}.

**How long are lessons?**
{{beginner.length}}.

**What if we're late?**
Please let Edgard know as soon as possible if you're running late or will miss a lesson. If you arrive late, come in quietly.

**Where are lessons?**
In the hall where our volunteer band rehearses: {{address}}.

**Anything else?**
Arrive 10 minutes early to assemble your instrument and warm up. Parents are welcome to sit near the class as long as they stay silent, or to chat in the clubhouse.

> [!NOTE]
> How families reach Edgard is part of gathering his details in `todo.md`.

### 5.10 Testimonial

> "After joining FAASL, I think I've grown as a musician because I have the opportunity to play with more experienced musicians."
> — Aubury Freed

### 5.11 Closing call to action

**Ready to start?** Come to the next class. Questions first? **[Contact us](/contact)**

---

## 5b. Join page (`/join`) — ✅ reviewed

**Page title:** Join the Band
**Meta description:** Join a free community band in San Leandro, CA. Experienced and aspiring musicians welcome, no audition. Concert and marching music, festas, parades and festivals.

# Join the Band
#### a community band for experienced and aspiring musicians alike

Whether you've played for decades or your instrument's been collecting dust, there's a seat for you in our volunteer band. We're a mixed-age group of new and experienced musicians, dedicated to improving one another as much as ourselves. Younger musicians play alongside older ones, learning in a way that simply can't be replicated in a peer-aged group. Experienced musicians take pride in helping the next generation while growing their own skills with a challenging and changing repertoire.

**Just show up.** There are no auditions and no sign-up. Bring your instrument to any rehearsal; we always have extra sheet music ready for you to read.

### What we play

We play concert band and marching music, and we perform around the SF Bay and Central Valley every year:
- **Holy Ghost parades:** hosted by Portuguese communities throughout the year
- **Music festivals:** we host guest bands, or they host us
- **City events:** the Cherry Festival parade and others
- **Caroling:** bringing cheer to the holiday season

### Rehearsals

| | |
|---|---|
| **When** | {{band.days}} at {{band.time}} (right after lessons) |
| **How long** | {{band.length}}, {{band.note}} |
| **Where** | {{address}} |

### Our conductors

**Geronimo Rojas** — *Band Conductor*
Geronimo has been a member of our volunteer band since he was a young middle school student. His love of music has earned him scholarships and taken him traveling. Now he leads the band that supported his journey.

**Edgard Gonzalez** — *Music Teacher & Assistant Conductor*
TODO: bio (see §4). Teaches music for San Leandro schools.

### Coming back to music, or starting fresh?

That instrument in the back of your closet still has music in it. Many of our members returned to playing after years away, and the band is a welcoming place to rediscover it. Adults are also welcome to start from scratch: our [free lessons](/lessons) teach beginners of any age, and many band members use the intermediate class to brush up or learn a second instrument.

> "After joining FAASL, I think I've grown as a musician because I have the opportunity to play with more experienced musicians."
> — Aubury Freed

**Ready to play?** Come to the next rehearsal. Questions first? **[Contact us](/contact)**

---

## 5c. About page (`/about`) — ✅ reviewed (Lorenza's bio to re-evaluate later)

**Page title:** About the Filarmonica Artista Amadora de San Leandro
**Meta description:** The Portuguese Band of San Leandro (FAASL) is an all-volunteer community band and nonprofit founded in 1980, offering free music lessons and performing across the Bay Area.

# About Us
#### a community built around music since 1980

### Our story

Our band was founded in 1980 by amateur musicians who wanted to enrich their community through music. More than {years since 1980} years later, *our goal remains the same*: impacting lives through music education and mentorship. We believe in supporting musicians of every walk and stage of life. A love for music bonds us all, and we want to share it with you.

Our founders were mostly Portuguese immigrants with varying musical experience; some had none at all. They pooled their knowledge and resources to help each other and create this band. Today, our all-volunteer organization has grown into a diverse group representing many backgrounds. We each bring our abilities to invest in each other and elevate our lives.

> 💡 Officially the *Filarmonica Artista Amadora de San Leandro*, our name translates to the *Band of Amateur Artists of San Leandro*. Most people call us the FAASL.

### Our heritage

Our Portuguese roots show up in everything we do. Each year we march in Holy Ghost parades hosted by Portuguese communities, and we host dinners that bring classic Portuguese meals to the table, along with some American staples. These fundraisers support our music programs, and breaking bread together reaffirms our commitment to our community.

### Our leadership team

**Lorenza D.L.G. Tomaz** — *President of the Board*
Lorenza raised her son in our program years ago. She actively volunteered in non-musician roles and has served as the president for over five years now.

**Geronimo Rojas** — *Band Conductor*
Geronimo has been a member of our volunteer band since he was a young middle school student. His love of music has earned him scholarships and taken him traveling. Now he leads the band that supported his journey.

**João "John" Martins** — *Director of Stuff & Things*
John was born into our program, pushed in his stroller as his father volunteered musically. He learned to play as a child and continues to help develop the program in new and innovative ways.

### Our teacher

**Edgard Gonzalez** — *Music Teacher & Assistant Conductor*
TODO: bio (see §4). Teaches music for San Leandro schools.

### Get involved

Our band runs entirely on volunteers, and there's more to it than music. Help plan our fundraiser dinners, tell our story online and in the community, photograph our performances, or keep a marching band moving between parades and festivals. If you have skills to share, we'd love to hear from you. **[Contact us](/contact)**

**Support our work:** [Give](/give) · [Our impact](/impact)

---

## 5d. Give page (`/give`) — ✅ reviewed (prices and donation provider TODO)

**Page title:** Support Free Music Education in San Leandro
**Meta description:** Donate to the Portuguese Band of San Leandro, a 501(c)(3) nonprofit offering free music lessons and free community performances since 1980. Gifts are tax-deductible.

> [!NOTE]
> **Messaging focus:** lead with the free services that improve the whole community (free lessons, mentorship, generations playing together, music at community events), not only the Portuguese heritage. This widens the appeal to businesses and the broader community as the Portuguese community shrinks.

# Support the Band
#### keep music free for our community

Since 1980, every lesson we teach has been free. Kids and adults learn an instrument at no cost, young musicians are mentored by experienced ones, and our volunteer band brings live music to parades, festivals and community events across the Bay Area. All of it runs on volunteers and on the generosity of people like you.

**[Donate]** *(provider TODO)*

### What your gift does

Prices TODO (`todo.md`):
- **$__** buys sheet music for a new piece for the whole band
- **$__** feeds the band dinner after rehearsal
- **$__** covers a typical instrument repair
- **$__** outfits a musician in our uniform
- **$__** supports the carpools that get our musicians to performances

### Give in someone's name

Honor a loved one, a teacher or a fellow musician with a gift in their name, or remember someone who shared our love of music. Just let us know who your gift honors. TODO: how (a field in the donation form, or contact us).

### Join us at a fundraiser dinner

Throughout the year we host dinners that bring classic Portuguese meals to the table, along with some American staples. Every ticket supports our free music programs. Tickets are available at the door or from any board member.

*[Upcoming social events from the calendar]*

### Other ways to help

- **Donate an instrument** you no longer play, and we'll put it back to work
- **Come hear us play** at a parade, festival or concert
- **Volunteer** your time and skills ([Get involved](/about#get-involved))
- **Spread the word:** follow us and share our events

### For businesses

Many employers match their employees' charitable gifts, often doubling them. Ask your HR or giving program whether FAASL qualifies. Interested in supporting us as a business? **[Contact us](/contact)**

> TODO: a quote from a parent or donor (from the new stories)

### The details

The Filarmonica Artista Amadora de San Leandro is a 501(c)(3) nonprofit organization, EIN 94-2930722. Donations are tax-deductible to the extent allowed by law.

---

## 5e. Impact page (`/impact`) — ✅ reviewed (mission, governance, documents and "who we serve" TODO)

**Page title:** Our Impact
**Meta description:** Free music education and community performances in San Leandro since 1980. Mission, programs, numbers, governance and documents for the Portuguese Band of San Leandro, a 501(c)(3) nonprofit.

> [!NOTE]
> Written for grant reviewers, agencies and corporate giving teams: facts first, easy to verify, nothing they have to hunt for. Every TODO is in `todo.md`.

# Our Impact
#### free music education and community music since 1980

### Our mission

TODO: final wording with the board (`todo.md`). Working draft: *"The Portuguese Band of San Leandro provides free music education and mentorship to musicians of all ages, and brings live music to our community."*

### At a glance

| | |
|---|---|
| **Founded** | 1980 ({years since 1980} years of free music education) |
| **Status** | 501(c)(3) nonprofit, EIN 94-2930722 |
| **Run by** | Volunteers |
| **Lessons** | Free, weekly, ages 8 to 108 |
| **Lesson classes** | 2 classes, each with 12+ regular students (about 20 per class over a year) |
| **Musicians in the band** | 35+ (2026) |
| **Performances per year** | About 18: around 12 parades and 6 concerts |
| **Where** | San Leandro and neighboring cities: Castro Valley, San Lorenzo, Hayward, Oakland |

### Our programs

- **Free music lessons:** weekly beginner and intermediate group classes for ages 8 to 108, taught by a music teacher who also teaches in San Leandro schools. Students can start any time of year.
- **Volunteer community band:** a mixed-age band where students play alongside experienced musicians, rehearsing weekly. No auditions, no fees.
- **Community performances:** parades, festivals, city events and holiday caroling around the SF Bay and Central Valley, free to the public.
- **Community dinners:** fundraiser dinners throughout the year that bring people together and support the programs.

### Who we serve

Students and musicians from San Leandro and neighboring communities, including Castro Valley, San Lorenzo, Hayward and Oakland, from age 8 to adults of every age. Lessons and band membership are free, so cost is never a barrier to music. TODO: revisit this section later (`todo.md`).

### Governance

FAASL is governed by a volunteer board of directors.
- **Lorenza D.L.G. Tomaz**, President of the Board
- TODO: other board members and officers (names and roles)

### Documents

TODO (PDFs):
- IRS determination letter (501(c)(3))
- Most recent Form 990
- Annual report or financial summary

### Verify us

- **IRS Tax Exempt Organization Search:** search EIN 94-2930722 (https://apps.irs.gov/app/eos/)
- **Candid (GuideStar) profile:** TODO (claim and update)
- **California Attorney General, Registry of Charitable Trusts:** TODO (confirm current status)

### Contact about grants and partnerships

TODO: name and email (or info@faasl.org)

---

## 5f. Events page (`/events`) — ✅ reviewed

**Page title:** Events
**Meta description:** Fundraiser dinners, parades and concerts with the Portuguese Band of San Leandro. Join us at a dinner or come hear us play across the SF Bay Area.

# Events
#### dinners, parades and concerts

There are two great ways to spend time with us: share a meal at one of our fundraiser dinners, or come hear us play. Our dinners keep our music lessons free, and our performances are free to enjoy.

### Fundraisers and social events

Throughout the year we host dinners that bring classic Portuguese meals to the table, along with some American staples, and from time to time other fundraisers like raffles. Every ticket supports our free music programs. Tickets are available at the door or from any board member.

*[Upcoming events from the Social events calendar: date, name, place and description (includes ticket prices and dress code). Refreshed weekly.]*
*(If none:)* No fundraisers are scheduled right now. Add our social calendar to yours to hear about the next one.

**[Add social events to your calendar]** · Can't make it? **[Support the band](/give)**

### Performances

We play about a dozen parades and half a dozen concerts every year, from Holy Ghost festas to city celebrations.

*[Upcoming events from the Performances calendar: date, name, place and description (includes musician call times). Refreshed weekly.]*
*(If none:)* No performances are scheduled right now. Add our performance calendar to yours to hear about the next one.

**[Add performances to your calendar]**

What we perform at:
- **Holy Ghost parades:** hosted by Portuguese communities throughout the year
- **Music festivals**
- **City events:** the Cherry Festival parade and others
- **Caroling:** bringing cheer to the holiday season

---

## 5g. Contact page (`/contact`) — ✅ reviewed (form service TODO)

**Page title:** Contact Us
**Meta description:** Contact the Portuguese Band of San Leandro: {{address}}, CA. Call (510) 357-1449 or email info@faasl.org.

# Contact Us
#### we'd love to hear from you

Questions about lessons, the band, giving or anything else? Send us a message and we'll get back to you soon. You're also welcome to just stop by on a Friday evening.

### Send a message

| Field | Required | Notes |
|---|---|---|
| Full name | ✔ | |
| Email | ✔ | |
| Phone | | |
| May we text this number? | | Yes / No |
| What's this about? | ✔ | Lessons · Joining the band · Giving · Something else |
| Message | ✔ | |

Invisible spam protection (replaces the old "what's 22?" question). Messages go to info@faasl.org; the topic appears in the email subject so they're easy to sort. Form service TODO (`todo.md`).

After sending: "Thanks for contacting us. We'll get back to you soon."
If sending fails: "Sorry, something went wrong. Please email us at info@faasl.org."

### Visit us

844 Alvarado St., San Leandro, CA 94577 · *[Directions]*
{{schedule}}

### Mail

P.O. Box 2354, San Leandro, CA 94577-0235

### Call or email

(510) 357-1449 (please leave a message) · info@faasl.org

### Follow us

Facebook · Instagram · X · YouTube · LinkedIn

---

## 6. Contact (v2 original; superseded by §5g)

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
| `twitter.faasl.org` | twitter.com/faasl (now x.com/faasl) | ✔ | TODO |
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
- Lessons: Friday, beginner 6:30 pm and intermediate 7:15 pm, 45 minutes each; band rehearsal 8:00 pm, 2 hours; students start any time of year (now in `src/content/schedule.yaml`)
- All social accounts treated as active
- COVID-19 and Remote Restart pages dropped

Not changed yet:
- "Over 35 years later" and "president for over five years now" (date updates are in `todo.md`)
- Store list (review tracked in `todo.md`)
- Image alt text that said "Portrait of Lorenzo Tomaz". The new site will write fresh alt text.
