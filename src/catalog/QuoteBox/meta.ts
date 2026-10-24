import { defineMeta } from '../meta';
import QuoteBox from '../../components/blocks/QuoteBox.astro';

export default defineMeta(QuoteBox, {
  title: 'QuoteBox',
  group: 'Blocks',
  order: 12,
  description:
    'A white box for a quote or a short message, floating on its surface. Pairs with the staff field.',
  source: 'src/components/blocks/QuoteBox.astro',
  options: {},
  slot: 'A Testimonial, or a heading, a sentence and a button.',
  examples: [{ file: 'default', title: 'A member quote on the staff field' }],
});
