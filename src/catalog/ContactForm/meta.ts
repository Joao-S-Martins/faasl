import { defineMeta } from '../meta';
import ContactForm from '../../components/blocks/ContactForm.astro';

export default defineMeta(ContactForm, {
  title: 'ContactForm',
  group: 'Blocks',
  order: 21,
  description:
    'The contact form: a plain HTML form posted to our own handler on Cloudflare (worker/contact.js), with Turnstile and a hidden trap field. Checks run on beta; emails switch on at launch.',
  source: 'src/components/blocks/ContactForm.astro',
  options: {},
  examples: [{ file: 'default', title: 'Default' }],
});
