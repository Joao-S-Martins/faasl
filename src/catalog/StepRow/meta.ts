import { defineMeta } from '../meta';
import StepRow from '../../components/blocks/StepRow.astro';

export default defineMeta(StepRow, {
  title: 'StepRow',
  group: 'Blocks',
  order: 9,
  description:
    'Numbered steps as boxes that butt together, square where they meet; the last step is emphasized in green.',
  source: 'src/components/blocks/StepRow.astro',
  options: {
    steps: { values: '{ title, text }[]', description: 'Two to four steps.' },
    level: { values: '3 · 4', default: '3', description: 'Heading level of each step title.' },
  },
  examples: [{ file: 'default', title: 'The lessons pathway', viewports: true }],
});
