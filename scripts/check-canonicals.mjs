// Fails when a built page's canonical link doesn't match its sitemap entry.
// Search engines get mixed signals if the two disagree (docs/brief.md §5.4).
// Usage: node scripts/check-canonicals.mjs [dist]
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const sitemap = await readFile(join(dist, 'sitemap-0.xml'), 'utf8');
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url));

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const problems = [];
const canonicals = new Set();
for await (const file of htmlFiles(dist)) {
  const canonical = (await readFile(file, 'utf8')).match(
    /<link rel="canonical" href="([^"]+)"/,
  )?.[1];
  if (!canonical) continue;
  canonicals.add(canonical);
  if (canonical.endsWith('.html')) {
    problems.push(`${relative(dist, file)}: canonical ends in .html (${canonical})`);
  }
}
// Every sitemap address must be some page's canonical. (Pages left out of the
// sitemap on purpose, UNLISTED in astro.config.mjs, are fine.)
for (const url of listed) {
  if (!canonicals.has(url))
    problems.push(`sitemap lists ${url}, but no page has it as its canonical`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Canonical links OK: ${canonicals.size} pages, ${listed.size} sitemap entries`);
