import { defineMeta } from '../meta';
import Address from '../../components/content/Address.astro';

export default defineMeta(Address, {
  title: 'Address',
  group: 'Content',
  description: 'The clubhouse or mailing address, from src/content/site.yaml.',
  source: 'src/components/content/Address.astro',
  options: {
    which: { values: 'clubhouse · mailing', default: 'clubhouse', description: 'Which address.' },
    directions: {
      values: 'boolean',
      default: 'false',
      description: 'Add a Directions link (clubhouse only).',
    },
  },
  examples: [{ file: 'default', title: 'Default' }],
});
