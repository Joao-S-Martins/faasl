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

## 6. Scheduled content refresh (weekly)

Events come from the public Google Calendars **when the site is built**, so the site must be rebuilt for new events to appear. A scheduled workflow does this automatically.

| | Beta | Production |
|---|---|---|
| When | Weekly (e.g. Monday ~5 am Pacific) + a manual "Refresh now" button | Same schedule + manual button |
| What it builds | The latest `v3` (later `main`) commit | **The latest approved release**, unchanged, with fresh calendar data |
| Approval | None | None needed: no new code ships, only the last release you already approved |

How it stays safe:
- **No unapproved code reaches production.** The refresh rebuilds the exact tag of the latest published release. New code still needs a release and your approval (§3).
- It uses a separate GitHub environment, `production-refresh`, limited to release tags, holding the same least-privilege Cloudflare token. The approval gate on `production` stays as is.
- **If Google Calendar can't be reached or returns bad data, the build fails and nothing is deployed:** the site keeps last week's events, and GitHub emails you about the failed run.
- **Between rebuilds,** a few lines of JavaScript hide events whose date has passed, so the list never shows stale events for a week.

Things to know:
- **Scheduled workflows only run from the default branch** (`main`). Until `v3` is merged at launch, use the manual button for beta refreshes (the beta doesn't need real events yet anyway).
- **GitHub pauses scheduled workflows in public repos after 60 days with no repository activity.** It emails a warning first; re-enabling is one click (*Actions → workflow → Enable*). Any commit resets the clock.
- Schedules run in UTC and can start a few minutes late at busy times. Weekly is plenty; daily would also be free if events change often.
- This environment can't reach Google Calendar, so the calendar loader gets tested with a sample feed here and for real in GitHub Actions.

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
