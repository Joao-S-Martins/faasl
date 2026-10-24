import { defineMeta } from '../meta';
import LinkMore from '../../components/blocks/LinkMore.astro';

export default defineMeta(LinkMore, {
  title: 'LinkMore',
  group: 'Blocks',
  order: 19,
  description:
    'A "see more" link with an arrow ("All events", "Meet the team"), as a 44px tap target.',
  source: 'src/components/blocks/LinkMore.astro',
  options: {
    href: { values: 'string', description: 'Where it goes.' },
  },
  slot: 'The label.',
  examples: [{ file: 'default', title: 'Default' }],
});
