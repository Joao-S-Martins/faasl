import { defineMeta } from '../meta';
import Button from '../../components/blocks/Button.astro';

export default defineMeta(Button, {
  title: 'Button',
  group: 'Blocks',
  order: 17,
  description:
    'A link styled as a call to action. Green on light surfaces, white on green ones, automatically.',
  source: 'src/components/blocks/Button.astro',
  options: {
    href: { values: 'string', description: 'Where it goes.' },
    variant: {
      values: 'primary · secondary',
      default: 'primary',
      description: 'Filled or outlined.',
    },
  },
  slot: 'The label: a short verb phrase ("Join the band").',
  examples: [
    { file: 'light', title: 'On a light surface' },
    { file: 'dark', title: 'On green' },
  ],
  notes: [
    'One primary button per section; others secondary or plain links.',
    'Always at least 44px tall.',
  ],
});
