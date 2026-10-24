import { defineMeta } from '../meta';
import ScrollWell from '../../components/blocks/ScrollWell.astro';

export default defineMeta(ScrollWell, {
  title: 'ScrollWell',
  group: 'Blocks',
  order: 11,
  description:
    "The recessed tray around a sideways row: it clips the row with rounded corners and draws a rim over it. Usually used through CardRow's well option.",
  source: 'src/components/blocks/ScrollWell.astro',
  options: {},
  slot: 'A scrolling row (CardRow does this for you).',
  examples: [{ file: 'default', title: 'Through CardRow' }],
  notes: [
    'Light or dark follows the surface. Cards inside the light tray turn white so they stand out.',
  ],
});
