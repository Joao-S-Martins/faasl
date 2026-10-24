import { defineMeta } from '../meta';
import Callout from '../../components/blocks/Callout.astro';

export default defineMeta(Callout, {
  title: 'Callout',
  group: 'Blocks',
  order: 13,
  description:
    "A short note set apart with a thin gold edge, for the one thing a reader shouldn't miss.",
  source: 'src/components/blocks/Callout.astro',
  options: {},
  slot: 'One or two sentences.',
  examples: [{ file: 'default', title: 'Default' }],
  notes: ['At most one per section.'],
});
