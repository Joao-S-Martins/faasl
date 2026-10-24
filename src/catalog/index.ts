// Collects every catalog entry: metas, rendered examples and their source.
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { AnyMeta, Group } from './meta';

const metas = import.meta.glob<AnyMeta>('./*/meta.ts', { eager: true, import: 'default' });
const examples = import.meta.glob<AstroComponentFactory>('./*/*.astro', {
  eager: true,
  import: 'default',
});
const sources = import.meta.glob<string>('./*/*.astro', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const GROUPS: Group[] = ['Blocks', 'Content', 'Layout', 'Patterns'];

export interface Entry {
  slug: string;
  meta: AnyMeta;
  examples: {
    file: string;
    title: string;
    notes?: string;
    viewports?: boolean;
    Component: AstroComponentFactory;
    source: string;
  }[];
}

export const entries: Entry[] = Object.entries(metas)
  .map(([path, meta]) => {
    const slug = path.split('/')[1];
    return {
      slug,
      meta,
      examples: meta.examples.map((example) => {
        const key = `./${slug}/${example.file}.astro`;
        if (!examples[key]) throw new Error(`Catalog: ${key} is listed in meta.ts but missing`);
        return { ...example, Component: examples[key], source: tidy(sources[key]) };
      }),
    };
  })
  .sort(
    (a, b) =>
      GROUPS.indexOf(a.meta.group) - GROUPS.indexOf(b.meta.group) ||
      (a.meta.order ?? 50) - (b.meta.order ?? 50) ||
      a.meta.title.localeCompare(b.meta.title),
  );

/** Example source as shown in the catalog, with imports written as they
 * would be from a page in src/pages. */
function tidy(source: string) {
  return source.replace(/(['"])(?:\.\.\/)+(components|assets|lib)\//g, '$1../$2/').trim();
}
