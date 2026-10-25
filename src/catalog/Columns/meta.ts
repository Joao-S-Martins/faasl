import { defineMeta } from '../meta';
import Columns from '../../components/blocks/Columns.astro';

export default defineMeta(Columns, {
  title: 'Columns',
  group: 'Blocks',
  order: 2.5,
  description:
    'Two columns side by side on desktop, stacked on phones and tablets: a form and its details, text and a quote, or two short related sections that would each look thin across the page.',
  source: 'src/components/blocks/Columns.astro',
  options: {
    split: {
      values: 'even · wide-start',
      default: 'even',
      description: 'wide-start makes the first column wider (3 to 2), e.g. a form.',
    },
    align: {
      values: 'start · center',
      default: 'start',
      description: 'center lines the columns up on their middles, e.g. text beside a quote.',
    },
  },
  slot: 'Two elements, one per column (usually each a div.stack with its own h2).',
  examples: [
    { file: 'default', title: 'Two short sections', viewports: true },
    { file: 'quote', title: 'Text beside a quote' },
  ],
  notes: [
    'Each column with its own h2 keeps the page outline right; give each h2 an id for links.',
    'One of several ways to vary a page: also MediaFeature (photo and text), PhotoBreak, and Surface align="center".',
  ],
});
