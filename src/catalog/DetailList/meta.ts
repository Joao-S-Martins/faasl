import { defineMeta } from '../meta';
import DetailList from '../../components/blocks/DetailList.astro';

export default defineMeta(DetailList, {
  title: 'DetailList',
  group: 'Blocks',
  order: 8,
  description:
    'Details as a two-column description list, for reference facts (Impact "At a glance", an event\'s when and where).',
  source: 'src/components/blocks/DetailList.astro',
  options: {
    facts: { values: '{ term, detail }[]', description: 'Term on the left, detail on the right.' },
  },
  examples: [{ file: 'default', title: 'At a glance' }],
});
