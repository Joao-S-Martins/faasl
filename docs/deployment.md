# FAASL.org v3 — Build & deployment plan

How code gets from GitHub to **beta** automatically and to the **live site** only with your approval. This is built in Phase 1 (`todo.md`).
Related: [`architecture.md`](./architecture.md) · [`todo.md`](./todo.md)

## Summary

| | Beta | Live (production) |
|---|---|---|
| Address | `beta.faasl.org` (until DNS moves: a free `*.workers.dev` address) | `www.faasl.org` |
| Deployed by | GitHub Actions, **automatically** on every push to the beta branch, once checks pass | GitHub Actions, **only after you approve** a specific release |
| Search engines | Blocked (`noindex`, `robots.txt`, `X-Robots-Tag`) | Allowed |
| Cloudflare credential | Stored in the GitHub `beta` environment | Stored **only** in the protected GitHub `production` environment |
| Rollback | Re-run an older deploy | One command or one click in the Cloudflare dashboard |

```
push to v3 ──► CI checks (type check, lint, build, tests)
                 │ pass
                 ▼
          Deploy to BETA (automatic) ──► beta.faasl.org
                 
create a release (tag) ──► CI checks ──► ⏸ waits for YOUR approval in GitHub
                                              │ approved
                                              ▼
                                  Deploy to PRODUCTION ──► www.faasl.org
```

## 1. Cloudflare setup

- **A dedicated FAASL Cloudflare account**, separate from your personal one (blog, side projects). Rule of thumb: one Cloudflare account per *owner*, not per site.
  - Create it with an faasl.org address (e.g. `web@faasl.org`), then invite your personal login as **Super Administrator**. You manage both from one dashboard with the account switcher.
  - Why: it can be handed over or shared with a board member without exposing your personal sites; a leaked FAASL deploy token can only touch FAASL resources; limits, billing and activity logs stay separate.

- **Cloudflare Workers with static assets.** Third-party write-ups (unconfirmed against Cloudflare's own docs) say Cloudflare now recommends this for new projects over the older Pages product. It serves our static Astro build for free, supports `_headers` and `_redirects` files, and keeps version history for instant rollbacks.
- **Two separate Workers from one config file** (`wrangler.jsonc` with a `beta` and a `production` environment): `faasl-beta` and `faasl`. Beta can never overwrite production by accident, because they're different deployments with different addresses.
- **No Cloudflare Git integration.** Cloudflare can also build directly from GitHub, but then any push to the production branch goes live with no approval step. With GitHub Actions doing all deploys, there's one path to production, and it has a gate.

## 2. GitHub Actions workflows

| Workflow | Runs when | What it does |
|---|---|---|
| `ci.yml` | Every push and pull request | Install → `astro check` → lint → build → tests (redirect and link checks later) |
| `deploy-beta.yml` | Push to `v3` (after launch: push to `main`), once CI passes | Build in beta mode → deploy to `faasl-beta` |
| `deploy-production.yml` | You publish a GitHub **Release** (e.g. `v3.0.0`), or start it manually | Build that exact release → **wait for approval** → deploy to `faasl` |

Production deploys are disabled until launch (Phase 7).

### Sketch of the production workflow

```yaml
# .github/workflows/deploy-production.yml (sketch)
name: Deploy production
on:
  release:
    types: [published]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production          # protected: requires your approval
      url: https://www.faasl.org
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version-file: .nvmrc, cache: npm }
      - run: npm ci
      - run: npm run check && npm run build
        env: { SITE_ENV: production }
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}   # exists only in the production environment
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy --env production
```

(Action versions get pinned to exact releases when it's built.)

## 3. How production is protected

Several layers, each cheap to set up:

1. **GitHub environment `production` with a required reviewer (you).** Every production deploy pauses until you click *Approve* in GitHub, and you can see exactly which release is being deployed. The repo is public, so this is free.
2. **Deployment restricted to releases from `main`.** The production environment only accepts the `main` branch and release tags. A deploy can't be started from a random branch.
3. **The production credential lives only in the production environment.** The beta workflow can't see it, and nothing runs with it until you approve.
4. **Branch protection on `main`:** changes arrive by pull request, CI must pass, no force-pushes, no deleting the branch.
5. **Least-privilege Cloudflare API token:** only "edit Workers" for the FAASL account, nothing else (no DNS, no billing). Two-factor login on your Cloudflare and GitHub accounts.
6. **Releases are the record of what's live.** Each production deploy matches a tagged release with notes, so you always know what changed.
7. **Rollback:** `wrangler rollback`, or *Deployments → Rollback* in the Cloudflare dashboard. It takes seconds and doesn't need a rebuild.

## 4. Beta mode

The same code builds slightly differently when `SITE_ENV=beta`:
- `robots.txt` blocks everything and every page gets `noindex` (plus an `X-Robots-Tag` header), so the beta never competes with the live site in Google
- Canonical URLs still point at `www.faasl.org`

## 5. Domains and the DNS question

- A Worker's custom domain (like `beta.faasl.org`) needs faasl.org's DNS to be managed by Cloudflare. Until then, beta lives at its free `faasl-beta.<account>.workers.dev` address, which is fine for internal testing.
- 💡 **Move DNS to Cloudflare early (before the stakeholder beta), not at launch.** Moving DNS doesn't move the website: the `www` record keeps pointing at the old shared host, and email keeps working as long as every record (especially MX/TXT) is copied exactly. Benefits:
  - `beta.faasl.org` works right away
  - The shortcut-subdomain redirects can move to Cloudflare and be tested early
  - Launch day becomes a single, reversible change (point `www` at the new site)

## 6. Scheduled content refresh (weekly) — ✅ decided: B

Events come from the public Google Calendars, so the site needs rebuilding for new events to appear. Three ways to do it:

| | A. Scheduled rebuild | **B. Automatic content release** (recommended) | C. Cloudflare cron Worker |
|---|---|---|---|
| How | GitHub Actions rebuilds the latest approved release weekly with fresh calendar data and redeploys | GitHub Actions fetches the calendars, **commits the event data to the repo**, tags a **patch release** (e.g. `v3.0.2` → `v3.0.3`) and deploys it | A small Worker runs on a Cloudflare cron trigger, stores events in Workers KV, and the site reads them when pages are requested |
| Every live version has a tag | ✘ (refreshes reuse the last tag) | ✅ | ✘ |
| Event history in git (who/what/when, easy rollback) | ✘ | ✅ | ✘ |
| Builds are reproducible (don't depend on Google at deploy time) | ✘ | ✅ | n/a |
| Stays a purely static site | ✅ | ✅ | ✘ code runs on every request |
| Freshness | Weekly | Weekly (or daily, free) | Hourly or better |
| Moving parts | Fewest | Moderate | Most (runtime code, KV, cron) |

**Why not a Cloudflare-native process (C)?** Cloudflare's own Git builds can rebuild on a push, but they have no approval step, which would bypass the production gate (§3). A cron Worker with KV keeps events always fresh, but turns the static site into one with code running on every request, which is more to maintain and against the "no server" goal. Worth revisiting only if weekly freshness ever isn't enough.

### Decided: B, automatic content releases

```
weekly schedule (or "Refresh now" button)
   │
   ├─ fetch Performances + Social events from Google Calendar
   ├─ write src/content/events/*.json  ── no change? stop here (no release)
   ├─ commit "content: refresh events" to main
   ├─ check: does the change touch ONLY src/content/events/**?
   │      no  → stop; a human release is needed
   ├─ tag the next patch version (v3.0.2 → v3.0.3) + GitHub Release "Content refresh"
   └─ build that tag → deploy to production (no approval: data only)
```

**Versioning (semver):** you tag normal releases yourself: `v3.1.0` for new features, `v3.0.x` for fixes. Automatic content refreshes always bump the **patch** number, so every live state still has a tag. Releases are labelled "Content refresh" vs. your own release notes, so the history stays readable.

**Approval rules:**
- **Your releases** (code changes) → `production` environment → waits for your approval (unchanged).
- **Content refreshes** → `production-refresh` environment → no approval, but only allowed when the diff since the previous release touches *nothing but* `src/content/events/`. Anything else stops the run.

**Branch protection:** `main` requires pull requests, so the refresh job needs a narrow exception to commit event data directly. That's done with a dedicated credential (a deploy key or GitHub App token) that's allowed to bypass the rule, stored only in the `production-refresh` environment. We'll confirm the exact GitHub setting during setup.

**Things to know:**
- A release is only made when events actually changed, so quiet weeks create no noise.
- If Google Calendar fails or returns bad data, nothing is committed or deployed; the site keeps last week's events and GitHub emails you.
- No JavaScript to hide past events: an event that ends between refreshes stays listed until the next weekly refresh.
- Scheduled workflows only run from the default branch (`main`), so this switches on at launch. Before then, the "Refresh now" button works for beta.
- GitHub pauses schedules in public repos after 60 days with no commits. Content refreshes count as commits, but a quiet winter could still hit it; GitHub emails first, and re-enabling is one click.
- Beta keeps the simpler approach: rebuild the latest `v3`/`main` commit on the same schedule.
- This environment can't reach Google Calendar, so the loader is tested with a sample feed here and for real in GitHub Actions.

## 7. Optional later: pull-request previews

Each pull request can get its own temporary preview address (Workers "versions" upload without deploying), posted as a comment on the PR. Useful if others start contributing; not needed for v3.

## 7. Setup checklist (also in `todo.md`, Phase 1)

- 🧑 Create the **FAASL** Cloudflare account with an faasl.org email; turn on two-factor login
- 🧑 Invite your personal Cloudflare login to it as Super Administrator
- 🧑 Inside the FAASL account: choose the `workers.dev` subdomain, create the API token ("Edit Cloudflare Workers" template, limited to the FAASL account) and copy the account ID
- 🧑 In GitHub: create environments `beta` and `production`; add the token and account ID as environment secrets; set yourself as required reviewer on `production`, limited to `main` and release tags
- 🧑 In GitHub: branch protection on `main`
- 🤖 `wrangler.jsonc`, the three workflows, beta mode, README instructions
- 🤝 First beta deploy from `v3` to the `workers.dev` address
- 🤝 Later: move DNS to Cloudflare, attach `beta.faasl.org`
