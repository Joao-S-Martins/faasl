import { defineMeta } from '../meta';
import ButtonRow from '../../components/blocks/ButtonRow.astro';

export default defineMeta(ButtonRow, {
  title: 'ButtonRow',
  group: 'Blocks',
  order: 18,
  description:
    'A row of calls to action, wrapping on narrow screens, set 2rem below the text above it.',
  source: 'src/components/blocks/ButtonRow.astro',
  options: {},
  slot: 'Buttons, LinkMores or plain links.',
  examples: [{ file: 'default', title: 'Default' }],
});
