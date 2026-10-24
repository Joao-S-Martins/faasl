import { defineMeta } from '../meta';
import Logo from '../../components/patterns/Logo.astro';

export default defineMeta(Logo, {
  title: 'Logo',
  group: 'Patterns',
  order: 2,
  description:
    'The lyre, inline so it takes the color around it: gold on green and over photos, green on white.',
  source: 'src/components/patterns/Logo.astro',
  options: {
    size: { values: 'number', default: '48', description: 'Size in pixels.' },
    label: {
      values: 'string',
      description: 'Accessible name; leave empty when the name is written next to it.',
    },
  },
  examples: [{ file: 'default', title: 'Gold on green, green on white' }],
});
