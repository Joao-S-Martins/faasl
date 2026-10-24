import { defineMeta } from '../meta';
import Surface from '../../components/blocks/Surface.astro';

export default defineMeta(Surface, {
  title: 'Surface',
  group: 'Blocks',
  order: 1,
  description:
    'A full-width page section: what it sits on, an optional heading, and the content column. Every section of every page is a Surface (or a block that paints its own background, like Hero or TileWall).',
  source: 'src/components/blocks/Surface.astro',
  options: {
    surface: {
      values: 'plain · tint · green',
      default: 'plain',
      description:
        'White, off-white or hunter green. Sets the contrast context, so text, links, buttons and focus rings inside adapt.',
    },
    pattern: {
      values: 'none · field',
      default: 'none',
      description: 'The faint staff lines on top of the surface.',
    },
    width: {
      values: 'content · narrow · centered',
      default: 'content',
      description:
        'Full content width; reading width on the page grid; or reading width centered (for a quote box).',
    },
    title: {
      values: 'string',
      description: 'Renders the section heading and labels the section with it.',
    },
    level: { values: '2 · 3', default: '2', description: 'Heading level of the title.' },
    id: {
      values: 'string',
      default: 'the title, slugified',
      description: 'Anchor for links to this section.',
    },
    centerTitle: {
      values: 'boolean',
      default: 'false',
      description: 'Center the heading (for stat grids).',
    },
  },
  slot: 'The section content.',
  examples: [
    { file: 'plain', title: 'Plain, with a title' },
    { file: 'tint', title: 'Tint' },
    {
      file: 'green-field',
      title: 'Green with the staff field',
      notes: 'Text, links and buttons turn white automatically.',
    },
    { file: 'narrow', title: 'Narrow (reading width, on the page grid)' },
  ],
  notes: [
    'Bold green is one tool among several: rarely two green sections in a row (a guideline, not enforced).',
    "Every section heading gets the same space below it; don't add margins to headings in pages.",
    "Pages with a title Surface get a named region for screen readers; untitled ones don't.",
  ],
});
