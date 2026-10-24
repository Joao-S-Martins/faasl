import { defineMeta } from '../meta';
import TileWall from '../../components/blocks/TileWall.astro';

export default defineMeta(TileWall, {
  title: 'TileWall',
  group: 'Blocks',
  order: 16,
  description:
    'A wall of alternating rosette and staff tiles with a box cutting into it, snapped to the grout lines. For the support appeal.',
  source: 'src/components/blocks/TileWall.astro',
  options: {},
  slot: 'A heading, a paragraph and a ButtonRow.',
  examples: [{ file: 'default', title: 'Your support is instrumental', viewports: true }],
  notes: [
    'Phones and tablets: two rows of tiles above the box.',
    'Desktop: six rows; the box spans five tiles by four rows, inset by half the grout, so no tile is cut by its edge.',
  ],
});
