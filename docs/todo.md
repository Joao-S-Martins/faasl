# FAASL.org v3 — To-do

Work items for the v3 relaunch. Content lives in [`content.md`](./content.md); the plan is in [`architecture.md`](./architecture.md).
(The old `www/todo.md` is the v2 list and will be retired along with `www/`.)

## Photos

### New headshots
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

### Other photos (nice to have)
- [ ] Recent performance photos (current uniforms, wide and close-up)
- [ ] Students in a lesson with Edgard (with photo permission from parents)

## Dates & ages to update
- [ ] "Over 35 years later" → years since 1980. Plan: the site calculates this automatically.
- [ ] Lorenza's bio: "has served as the president for over five years now" → update or use a start year so it can be calculated
- [ ] Copyright line "© 2007–{year}": calculated automatically
- [ ] Beginner age range ("ages 8+", "ages 8 to 108"): confirm still accurate
- [ ] "Starting each February": confirm the beginner class still starts in February
- [ ] Review any other bio that counts years ("for several years", "since he was a young middle school student")

## Shortcut subdomains
Every `*.faasl.org` shortcut in `content.md` §7 must keep working.
- [ ] Confirm the destination for each one (some point at old Google Forms / Adobe Express)
- [ ] Set up redirect rules on the new host / DNS
- [ ] Test every shortcut before launch (automated check in CI: each one returns a redirect to the expected URL)
- [ ] Test every old page URL (`/index.html`, `/students.html`, `/covid.html`, `/remote.html`, `/hall.html`) after launch
- [ ] `hall.faasl.org` / `rental.faasl.org` point to Home for now (revisit in v3.1)

## Content
- [ ] **Gather Edgard Gonzalez's details:** exact title, 2–3 sentence bio, instruments, credentials, year joined, headshot, and how families should contact him (for the "What if we're late?" FAQ)
- [ ] **Review the music stores:** check each shop on the Lessons page is still open, confirm links, and add or remove shops
- [ ] **Remind notifications:** add a link and step-by-step instructions on the Lessons page for joining the Remind list for lesson updates
- [ ] **Review the mission statement:** decide on official wording (the README uses "music education and mentorship for underserved youth in the East Bay")
- [ ] **Donate button:** decide yes/no and the provider (PayPal, Givebutter, Zeffy…), then point `donate.faasl.org` at it
- [ ] **Rewrite the Stories page:** bring member stories over from Adobe Express as a Stories page on faasl.org, then point `stories.faasl.org` at it
- [ ] Instrument list: any changes?
- [ ] "Grow with us" / "Have fun with us" buttons: link to a Join page instead of beginner lessons?

## Separate project: brochure
Goal: a brochure that **regenerates itself from the site's content**, with nothing to design or upload by hand each year.
- [ ] Find the current tri-fold brochure (it's not in the repo) as a design reference
- [ ] Build the brochure as a print-designed page from the same content files (contact info, lessons, leadership, schedule)
- [ ] Have the deploy pipeline render it to PDF automatically (headless browser) on every content change
- [ ] Serve it at `brochure.faasl.org` (always the latest), and keep a dated copy per year if wanted
- [ ] Optional: a QR code on the brochure pointing to `/lessons`

## Launch checklist (from `architecture.md`)
- [ ] Choose the framework and host
- [ ] Confirm where faasl.org email lives; copy MX/TXT records before moving DNS
- [ ] Contact form service set up and tested to info@faasl.org
- [ ] Google Search Console + Bing Webmaster Tools; submit sitemap
- [ ] Google Business Profile for the clubhouse
- [ ] Retire the shared host about 30 days after launch

---

## v3.1

Follow-up work after the v3 launch.

### Hall & rental
Whether the hall appears on the site at all is up for debate. Return to it after launch.
- [ ] Decide whether the hall gets a mention (e.g. "Our home" on `/about`) or a rental page again
- [ ] If rentals return: update the rental package (`www/pdf/FAASL_RENTAL_PACKAGE_10.22.pdf`), rates and rental@faasl.org contact
- [ ] Decide whether to use the hall photos (`rental_01`–`06`)
- [ ] Re-point `hall.faasl.org` and `rental.faasl.org` (Home until then)
