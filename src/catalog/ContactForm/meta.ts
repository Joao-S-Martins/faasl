import { defineMeta } from '../meta';
import ContactForm from '../../components/blocks/ContactForm.astro';

export default defineMeta(ContactForm, {
  title: 'ContactForm',
  group: 'Blocks',
  order: 21,
  description: 'The contact form. Disabled until a form service is chosen (docs/todo.md).',
  source: 'src/components/blocks/ContactForm.astro',
  options: {},
  examples: [{ file: 'default', title: 'Default' }],
});
