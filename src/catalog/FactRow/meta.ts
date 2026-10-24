import { defineMeta } from '../meta';
import FactRow from '../../components/blocks/FactRow.astro';

export default defineMeta(FactRow, {
  title: 'FactRow',
  group: 'Blocks',
  order: 7,
  description:
    'Key facts at a glance: a small label above a big answer, with an icon. For the few things a reader needs first (cost, ages, when, how to start).',
  source: 'src/components/blocks/FactRow.astro',
  options: {
    facts: {
      values: '{ icon, label, value, detail? }[]',
      description: 'Keep values short ("Free", "Fridays"); put the rest in detail.',
    },
  },
  examples: [{ file: 'default', title: 'Lessons at a glance', viewports: true }],
  notes: ['For longer reference facts, use DetailList.'],
});
