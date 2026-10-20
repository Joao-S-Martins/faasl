#!/usr/bin/env node
// Prints the events listed in built pages: a quick end-to-end check of the
// calendar pipeline (used by CI). Usage: node scripts/list-built-events.mjs dist/events.html …
import { readFile } from 'node:fs/promises';

for (const path of process.argv.slice(2)) {
  const html = await readFile(path, 'utf8');
  const lists = [...html.matchAll(/<ol class="events"[^>]*>([\s\S]*?)<\/ol>/g)];
  const titles = lists.flatMap(([, list]) =>
    [...list.matchAll(/<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\S]*?<time datetime="([^"]+)"/g)].map(
      ([, title, start]) => `${start}  ${title.replace(/<[^>]+>/g, '').trim()}`,
    ),
  );
  const empty = [...html.matchAll(/No (?:fundraisers|performances) are scheduled right now/g)]
    .length;
  console.log(`${path}: ${titles.length} events listed${empty ? `, ${empty} empty list(s)` : ''}`);
  for (const line of titles) console.log(`  ${line}`);
}
