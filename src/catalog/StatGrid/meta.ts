import { defineMeta } from '../meta';
import StatGrid from '../../components/blocks/StatGrid.astro';

export default defineMeta(StatGrid, {
  title: 'StatGrid',
  group: 'Blocks',
  order: 6,
  description:
    'Big numbers, each with a large icon above it. Icons, numbers and the first line of each label line up across the row.',
  source: 'src/components/blocks/StatGrid.astro',
  options: {
    stats: {
      values: '{ icon, value, label }[]',
      description:
        'Four reads best (two rows of two on phones). Numbers come from src/content/impact.yaml.',
    },
  },
  examples: [
    { file: 'white', title: 'On white (bold green numbers)', viewports: true },
    { file: 'green', title: 'On green' },
  ],
  notes: ["Colors follow the surface; there's no tone option."],
});
