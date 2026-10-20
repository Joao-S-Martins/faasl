# FAASL.org

Website of the **Portuguese Band of San Leandro** (Filarmonica Artista Amadora de San Leandro), a non-profit focused on music education and mentorship in the East Bay.

## v3 (in progress)

The v3 site is built with [Astro](https://astro.build) and hosted on Cloudflare Workers. Planning docs are in [`docs/`](docs/): start with [`todo.md`](docs/todo.md) and [`brief.md`](docs/brief.md). The v2 site in `www/` stays untouched until launch.

### Run it locally
Requires Node 22.22+ (CI uses the version in `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:4321
npm run verify     # type check, lint, format check and build (same as CI)
```

### Where things live
| Path | What |
|---|---|
| `src/content/` | Site content: organization facts (`site.yaml`), people, tags, instruments. Schemas are in `src/content.config.ts`. |
| `src/pages/` | Routes (file path = URL) |
| `src/components/`, `src/layouts/` | Astro and React components |
| `src/styles/tokens.css` | Design tokens (brand colors from `docs/brief.md` §5.3) |
| `src/integrations/site-headers.mjs` | Writes `robots.txt` and `_headers`; non-production builds are hidden from search engines |
| `wrangler.jsonc` | Cloudflare Workers config (`faasl-beta` and `faasl`) |
| `.github/workflows/` | CI and deploys (see [`docs/deployment.md`](docs/deployment.md)) |

### Deploys
- **Beta:** every push to `v3` is checked and deployed automatically (once Cloudflare is connected).
- **Production:** publish a GitHub Release; the deploy waits for the owner's approval.

---

## v2 (legacy, `www/`)

#### FAASL & faasl.org
__The Portuguese Band of San Leandro, a non-profit focused on music education and mentorship for underserved youth in the East Bay__
Items belonging to the FAA of San Leandro (FAASL), specifically the website. Some old text and stuff available at 
https://raw.githubusercontent.com/Joao-S-Martins/faasl/2ff063883ad4375ded4df185773da429bcad5ac4/www/static/index.html

##TODO
- [ ] Migrate to a static site generator
  - [x] Choose a generator
  - [x] Reproduce all the pages
  - [x] Implement reusable homepage items
  - [x] Proof content
  - [ ] Restructure repo
- [x] Upgrade to a responsive site
  - [x] Include Bootstrap 3 LESS
  - [x] Implement Bootstrap elements
  - [x] Change layout to work for all screen sizes, starting with xs
  - [x] Update events table
- [ ] Improve performance
  - [x] Implement Grunt gh-pages deploy task
  - [x] Printing CSS
  - [ ] Refactor LESS & JS
  - [ ] Swap Bluetrip icons for Bootstraps
  - [x] Add CSS pruning and minification
  - [x] Add image embedding
  - [x] Add CSS/LESS linting & validation
  - [ ] Review css3files.com & create mixins
  - [ ] Add JS linting
  - [x] Pre-require JS
  - [x] Minify JS
  - [x] Add HTML processing & resource replacing
  - [x] Add HTML minification
  - [ ] Add HTML5 validation
  - [ ] Get advanced optimizations working
- [ ] Improve content
  - [ ] Add gallery
  - [ ] Add blog
  - [ ] Favicon
  - [x] Robots.txt
  - [x] Humans.txt
  - [x] Sitemap & submission
  - [x] Update Google Analytics
  - [ ] PageSpeed, Pingdom, and others
  - [ ] High-res images
  - [ ] Error/maintenance page
  - [x] Improve printing
  - [x] Beautify the events page
- [ ] Post-rona expansion
  - [ ] Fix contact form inconsistencies
  - [ ] Printable covid policies
  - [ ] Printable new member docs
  - [ ] Fix CSS build tasks
  - [ ] Fix watch task
  - [x] Fix favicons

## Install
Use Node 14
`npm install`
Create `alias grunt=./node_modules/.bin/grunt`
Directions for creating the FTP password file https://github.com/inossidabile/grunt-ftpush#authentication-parameters

## Dev
`grunt run` to build into the `dev` folder and run server.
`grunt watch` to update `dev` folder for JS, CSS, and HTML changes.

## Beta & Release
`grunt beta-build` & `grunt connect:dist` to build a beta candidate into the `dist` folder for local testing.
`grunt beta` to build and push a beta to `beta.faasl.org`.
`grunt release` to push a public website update and commit changes.

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">FAASL.org</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.faasl.org/volunteer.html" property="cc:attributionName" rel="cc:attributionURL">FAASL Volunteers</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.github.com/joao-s-martins/faasl/issues" rel="cc:morePermissions">http://www.github.com/joao-s-martins/faasl/issues</a>.

Not all content here is original to the FAASL
