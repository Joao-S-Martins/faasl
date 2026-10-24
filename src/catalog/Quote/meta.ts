import { defineMeta } from '../meta';
import Quote from '../../components/blocks/Quote.astro';

export default defineMeta(Quote, {
  title: 'Quote',
  group: 'Blocks',
  order: 12.5,
  description:
    'A quotation with the thin gold bar at its left: the treatment every quote on the site gets, from member stories to sayings.',
  source: 'src/components/blocks/Quote.astro',
  options: {
    by: { values: 'string', description: 'Who said it; shown after a dash.' },
  },
  slot: 'The quote, as a paragraph.',
  examples: [{ file: 'default', title: 'A saying' }],
  notes: ['Member stories use Testimonial, which uses this block.'],
});
