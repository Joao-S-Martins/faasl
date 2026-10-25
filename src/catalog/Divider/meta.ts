import { defineMeta } from '../meta';
import Divider from '../../components/blocks/Divider.astro';

export default defineMeta(Divider, {
  title: 'Divider',
  group: 'Blocks',
  order: 5.2,
  description:
    'A thin gold line across the whole page, between two sections that would otherwise blend together.',
  source: 'src/components/blocks/Divider.astro',
  options: {},
  examples: [{ file: 'default', title: 'Between two green sections' }],
  notes: [
    'Used on Home between the green hero and the green "I want to…" links.',
    'Gold is for trim: use it sparingly, where two same-colored sections meet.',
  ],
});
