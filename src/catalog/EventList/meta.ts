import { defineMeta } from '../meta';
import EventList from '../../components/content/EventList.astro';

export default defineMeta(EventList, {
  title: 'EventList',
  group: 'Content',
  order: 3,
  description:
    'Upcoming events from one calendar as a simple list, with details (tickets, dress code, call times) from the calendar description.',
  source: 'src/components/content/EventList.astro',
  options: {
    calendar: { values: 'lessons · performances · social', description: 'Which calendar.' },
    limit: { values: 'number', description: 'Show at most this many.' },
    days: { values: 'number', description: 'Only events starting within this many days.' },
    compact: { values: 'boolean', default: 'false', description: 'Date, time and title only.' },
    empty: { values: 'string', description: 'Shown when nothing is coming up.' },
    level: { values: '3 · 4', default: '3', description: 'Heading level for event titles.' },
  },
  examples: [{ file: 'default', title: 'Fundraisers' }],
});
