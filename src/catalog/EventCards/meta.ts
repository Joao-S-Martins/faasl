import { defineMeta } from '../meta';
import EventCards from '../../components/content/EventCards.astro';

export default defineMeta(EventCards, {
  title: 'EventCards',
  group: 'Content',
  order: 2,
  description:
    'Upcoming performances and fundraisers as a sideways row of cards. No event search data here (only on single event pages).',
  source: 'src/components/content/EventCards.astro',
  options: {
    limit: { values: 'number', default: '6', description: 'How many to show.' },
    well: {
      values: 'boolean',
      default: 'false',
      description: 'The row sits in the recessed tray.',
    },
    empty: { values: 'string', description: 'Shown when nothing is coming up.' },
  },
  examples: [{ file: 'default', title: 'On green, in the tray' }],
});
