import { defineMeta } from '../meta';
import Accordion from '../../components/blocks/Accordion.astro';

export default defineMeta(Accordion, {
  title: 'Accordion',
  group: 'Blocks',
  order: 14,
  description:
    'Groups <details> elements into an accordion with 56px rows and a green chevron. For the FAQ and long lists.',
  source: 'src/components/blocks/Accordion.astro',
  options: {},
  slot: '<details> elements, or a component that renders them (FaqList).',
  examples: [{ file: 'default', title: 'Getting ready' }],
  notes: ["Content inside stays in the page (good for search); it's only collapsed."],
});
