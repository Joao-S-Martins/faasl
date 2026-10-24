import { defineMeta } from '../meta';
import FaqList from '../../components/content/FaqList.astro';

export default defineMeta(FaqList, {
  title: 'FaqList',
  group: 'Content',
  description:
    'The lessons FAQ from src/content/faqs.yaml, with schedule tokens filled in and FAQ search data. Wrap it in an Accordion.',
  source: 'src/components/content/FaqList.astro',
  options: {},
  examples: [{ file: 'default', title: 'Default' }],
});
