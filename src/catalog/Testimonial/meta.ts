import { defineMeta } from '../meta';
import Testimonial from '../../components/content/Testimonial.astro';

export default defineMeta(Testimonial, {
  title: 'Testimonial',
  group: 'Content',
  description:
    'A pull quote from a member story, picked for an audience. Shows a TODO on beta when no story fits yet.',
  source: 'src/components/content/Testimonial.astro',
  options: {
    audience: {
      values: 'students · families · musicians · donors · funders',
      description: 'Who the quote should speak to.',
    },
  },
  examples: [{ file: 'default', title: 'Default' }],
});
