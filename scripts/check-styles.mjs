// Style rules from docs/design-system.md, checked on every build:
// - every <style> and .css file in src/ declares a cascade layer (unlayered
//   CSS would beat every layer); tokens.css is exempt (custom properties only)
// - media queries use only the two breakpoints (40rem, 64rem), mobile first
// - no !important outside the reduced-motion reset in base.css
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (/\.(astro|css)$/.test(entry.name)) yield path;
  }
}

const problems = [];
for await (const file of files('src')) {
  const text = await readFile(file, 'utf8');
  const styles = file.endsWith('.css')
    ? [text]
    : [...text.matchAll(/<style(?![^>]*is:inline)[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  for (const css of styles) {
    if (!file.endsWith('tokens.css') && !/@layer\s+[\w-]+\s*\{/.test(css)) {
      problems.push(`${file}: styles must be inside a cascade layer (@layer components { … })`);
    }
    for (const [query] of css.matchAll(/@media[^{]+/g)) {
      const widths = [
        ...query.matchAll(/(min-width|max-width|width\s*[<>]=?)\s*:?\s*([\d.]+\w+)/g),
      ];
      for (const [, kind, value] of widths) {
        if (
          !/^width\s*>=$/.test(kind.replace(/\s+/g, ' ').trim()) ||
          !['40rem', '64rem'].includes(value)
        ) {
          problems.push(`${file}: use (width >= 40rem) or (width >= 64rem), not "${query.trim()}"`);
        }
      }
    }
    if (!file.endsWith('base.css') && css.includes('!important')) {
      problems.push(`${file}: no !important (use the cascade layers instead)`);
    }
  }
}

if (problems.length) {
  console.error([...new Set(problems)].join('\n'));
  process.exit(1);
}
console.log('Styles OK: layered, two breakpoints, no !important');
