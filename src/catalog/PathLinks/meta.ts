import { defineMeta } from '../meta';
import PathLinks from '../../components/blocks/PathLinks.astro';

export default defineMeta(PathLinks, {
  title: 'PathLinks',
  group: 'Blocks',
  order: 3,
  description:
    'The "I want to…" links: each a whole clickable block with an icon, a title, a line of text and an arrow. Routes each audience to its page.',
  source: 'src/components/blocks/PathLinks.astro',
  options: {
    label: {
      values: 'string',
      description: 'Names the navigation for screen readers ("I want to…").',
    },
    links: {
      values: '{ icon, title, text, href }[]',
      description: 'Three is the sweet spot. Icons from @lucide/astro.',
    },
  },
  examples: [{ file: 'default', title: 'Under the home hero', viewports: true }],
  notes: [
    'Stacked on phones, three across from tablets, inside the content width.',
    'Thin gold rules separate the links (uniform trim).',
  ],
});
