import { defineMeta } from '../meta';
import FormList from '../../components/content/FormList.astro';

export default defineMeta(FormList, {
  title: 'FormList',
  group: 'Content',
  description: 'The printable onboarding forms for the Musicians page.',
  source: 'src/components/content/FormList.astro',
  options: {},
  examples: [{ file: 'default', title: 'Default' }],
});
