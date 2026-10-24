import { defineMeta } from '../meta';
import CalendarLink from '../../components/content/CalendarLink.astro';

export default defineMeta(CalendarLink, {
  title: 'CalendarLink',
  group: 'Content',
  description: 'An "add to your calendar" link for one of the public calendars.',
  source: 'src/components/content/CalendarLink.astro',
  options: {
    calendar: { values: 'lessons · performances · social', description: 'Which calendar.' },
  },
  examples: [{ file: 'default', title: 'Default' }],
});
