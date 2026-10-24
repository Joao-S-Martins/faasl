import { defineMeta } from '../meta';
import InstrumentPicker from '../../components/blocks/InstrumentPicker';

export default defineMeta(InstrumentPicker, {
  title: 'InstrumentPicker',
  group: 'Blocks',
  order: 22,
  description:
    'Instrument buttons with a demo video under them. The video only loads after a pick; on small screens it scrolls into view. Instruments without a demo show as "coming soon".',
  source: 'src/components/blocks/InstrumentPicker.tsx',
  options: {
    videoId: { values: 'YouTube id', description: 'The demo video (src/content/lessons.yaml).' },
    instruments: {
      values: '{ id, name, beginnerFriendly, demoStartSeconds? }[]',
      description: 'From src/content/instruments.yaml.',
    },
  },
  examples: [{ file: 'default', title: 'On the Lessons page' }],
  notes: ['The only interactive island on the site (React, loaded when it scrolls into view).'],
});
