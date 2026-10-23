# FAASL.org v3 — Brand notes

Working brand decisions for the design phase. Related: [`brief.md`](./brief.md) §5.3 (colors) and §5.4 (SEO guardrails).

## Names

| Name | Use |
|---|---|
| **Portuguese Band of San Leandro** | **Leads everywhere**: headings, titles, the logo lockup. The site targets English speakers. |
| **Filarmónica Artista Amadora de San Leandro** | The official name, **with the accent**. The board wants it on the site: in the footer, About, Impact, legal lines and structured data. |
| **FAASL** | Members' shorthand, little known outside the membership. Avoid on public pages, except where the name is explained (About) and in member-facing places (Musicians page, quotes from members). |

Translation: "Band of Amateur Artists of San Leandro".

## Logos

- **Minimalist logo** (`src/assets/logo.svg`): a gold lyre in a circle. Used now for the header and favicon.
- **Favicon and app icons:** the gold lyre on hunter green: a disc for browser tabs (`public/favicon.svg`, `favicon.ico`), a square for phone home screens (`apple-touch-icon.png`) and for search engines' organization logo (`logo.png`, 512 px). Never gold on transparent: it nearly disappears on white.
- **Share image** (`public/share.png`, 1200×630): what links show when shared on social media and in messages. The lyre, both names and the tagline in a hunter-green box with a gold border, floating over alternating rosette and staff tiles. The box is a square of 6 × 6 tiles, centered on grout lines and inset by half the grout, so the gap around it matches the gap between tiles and no tile is cut; its gold border sits inside a green margin, apart from the tiles' gold corners. Being square, it survives the square crops some messaging apps make (a wide box lost the ends of the name). Used by every page without its own image; later, pages can use a real band photo. To update it, open `/design/share/1200x630` on beta and screenshot it at exactly 1200×630.
- **Icons:** [Lucide](https://lucide.dev), a free open-source set; simple line icons that match the line-drawn patterns. Drawn in hunter green or white, never gold.
- **Uniform crest:** worn on the uniforms, but there's no good vector file, so it's not on the site yet. Getting a vector is on `todo.md`.
- The **bass drum head** reads "Filarmónica Artista Amadora · 1980 · San Leandro Cal." in a classic circular lettering, a nice reference for heritage styling.

## The uniform (our most recognizable look)

White pants, shoes, socks, dress shirts and belts; **green tie and jacket**; **white military-band style hats**.
Design cue: green and white dominate, with gold as the accent (the lyre). When a daylight photo of a jacket is available, tune the site green to match it.

## Colors

- **Hunter green `#355749` is the brand color** (the jacket and tie): buttons, links, headings, dark bands.
- **Gold `#F3DD3E` is only for the lyre and small uniform-like accents** (thin lines, trim, dots). Never text, buttons or backgrounds.
- White `#FFFFFF`, off-white `#F0F0F0` and ink `#333333` for backgrounds, surfaces and text.
- **Retired:** FAASL green `#00A079` (not a good representation) and light gold `#FFEB5B`.
- **Text rule:** only pairs at **4.5:1 or better** (WCAG 2.2 AA at any size) are allowed: ink, hunter green on white or off-white; white or off-white on hunter green. Everything else is not allowed, even where WCAG would permit large text. The brand guide page (`/design/brand` on beta) shows each pair with its ratio.

## Typography

✅ **Font set B:** **Barlow Condensed** for headings and **Barlow** for text, free and self-hosted (`@fontsource`). Applied site-wide through `--font-heading` and `--font-body` in `src/styles/tokens.css`.

## Portuguese motifs

Left out in the past because they clashed with the brand colors or the inclusive message. Now welcome in moderation.
- Traditional tiles are blue on white and rarely geometric, so a recolored geometric tile looked wrong and was dropped.
- **Direction: tile patterns built from musical motifs** (staff lines, notes, sharps, fermatas) in hunter green on white, gold only as a small accent.
- ✅ **Rosette tile (chosen):** beamed eighth notes turned four times around a gold ring. `<TilePattern variant="rosette" />`.
  - Built like a tiled wall: square tiles with square corners, separated by plain grout (off-white). Corner motifs (a quarter ring and a gold quarter circle) stay on each tile; nothing is drawn in the grout or crosses it. Four tiles complete the corner ring by eye.
  - Notes are written correctly: stems up on the right of the notehead, heads tilted. **Never flags on a figure that's turned around a center:** rotated flags read as a pinwheel or swastika. Use beams, or notes without flags.
- **Staff tile, for horizontal bands:** a half note, two beamed eighth notes and a quarter note on a staff (no key signature, no fermata), built the same way as the rosette so they sit together. Used one tile high: under a page header, between sections, above the footer, or as the border of a tile panel around rosettes. Examples on the brand guide. `<TilePattern variant="staff" tile={48} height="48px" frame={false} />`.
- **Checker** (`variant="checker"`): rosette and staff tiles alternating, for walls and banners. The rosette leads and the staff recedes; never rotate the staff tile.
- **Tile sizes and spacing** (from a design-theory review, Oct 2026):
  - Render tiles at multiples of 32 px (48, 64, 96, 128) so the grout and lines land on whole pixels and stay crisp. Bands: 48 px on phones, 64 px on desktop. Walls and banners: 64 px on phones, 96–128 px on desktop. Never below 56 px for rosettes (the notes merge) or 40 px for anything.
  - One band size and one wall size per page section.
  - Center the grid (`center="x"` for bands, `"both"` for walls) so cut tiles are equal on both sides.
  - Line weights match across tiles (stems render at 1.6, beams at 4); the face outline is inset so it never reaches the grout, and stays: white against the grout alone is too faint to separate tiles.
  - Text never sits on wall tiles directly: put it in a solid box, or use the faint staff field instead.
  - No more gold than the corners and the rosette ring.
- **Staff line** (`variant="line"`): one long staff with a written melody (eight different 4/4 measures of whole, half, quarter and eighth notes, beamed or flagged, with bar lines), for section breaks.
- **Staff field** (`variant="field"`): the same melody on closely packed staves, each starting at a different measure, very faint, for backgrounds (page headers, calls to action, testimonials, numbers strips, the footer). White on hunter green.
- **Contrast with the field behind text** (checked Oct 2026, worst case: text over a filled notehead): ink on white 9.8:1, ink on off-white 8.7:1, hunter on off-white 5.6:1, white on hunter 5.3:1. All pass the 4.5:1 rule. Keep the field at 16% or fainter behind text; at about 25%, white on hunter drops below 4.5:1. The staff line (35%) is for breaks only, never behind text.
- The melodies live in `src/lib/staff.ts`, which also writes the notation (stem direction and side, flags to the right, beams).
- Use as accents (dividers, backgrounds, heritage sections), not the main look. No religious symbols unless specifically wanted.

## Voice

- **Pivot to trustworthy:** confident, factual and clear, especially on Give and Impact. Still warm and welcoming on Lessons and Join.
- **English first:** "festival" for *festa*, "band" for *filarmónica*. Portuguese for food names (*sopas*, *linguiça*) and where it adds flavor.
- **Don't list the free perks** of membership or of playing in the band; the board prefers to leave those out.
- Copy will be refined page by page; the owner adjusts as needed.

## Taglines

✅ **Main line for now: "Where generations play together."** (pending the board; in `src/content/site.yaml`)

Kept in our pocket:
- "We're committed to impacting lives through music education and mentorship." (previous tagline)
- "Dedicated to bringing free music education and public performance opportunities to the greater East Bay." (2018 brochure)
- "Free music lessons and live music for our community, since 1980."

Dropped: "Music for every age. Free since 1980." (weak)

## Photography

Recent photos exist; plan to share them through the organization's Google Workspace (Google Drive), connected later (`todo.md`). Until then, the v2 photos stand in.

## Old printed materials

Found in the repo's git history: the tri-fold brochure (InDesign, about 2018; lyre emblem, green/teal/gold, Mr Eaves and Monarcha fonts; lists an old address, 857 'B' Alvarado St.) and scans and templates under the old `www/materials/` folder. All due to be replaced (see the brochure project in `todo.md`).
