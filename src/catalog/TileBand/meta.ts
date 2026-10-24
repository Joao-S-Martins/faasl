import { defineMeta } from '../meta';
import TileBand from '../../components/blocks/TileBand.astro';

export default defineMeta(TileBand, {
  title: 'TileBand',
  group: 'Blocks',
  order: 15,
  description:
    'A horizontal rule of staff tiles, one tile high, centered so cut tiles are equal on both sides.',
  source: 'src/components/blocks/TileBand.astro',
  options: {
    tile: {
      values: '48 · 64',
      default: '64',
      description: 'Tile size in pixels (whole-pixel sizes only).',
    },
  },
  examples: [
    { file: 'default', title: '64px' },
    { file: 'small', title: '48px' },
  ],
  notes: ['Between sections, or above the footer. Not every section needs one.'],
});
