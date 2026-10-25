import { defineMeta } from '../meta';
import CardRow from '../../components/blocks/CardRow.astro';

export default defineMeta(CardRow, {
  title: 'CardRow',
  group: 'Blocks',
  order: 10,
  description:
    'A row of cards that scrolls sideways (with a peek of the next card) on phones and tablets, and lays out as a grid on desktop unless it always scrolls. Optionally in the recessed tray.',
  source: 'src/components/blocks/CardRow.astro',
  options: {
    label: { values: 'string', description: 'Names the scrolling region for screen readers.' },
    well: {
      values: 'boolean',
      default: 'false',
      description: 'Sit in the recessed tray (ScrollWell): cards slide under its rounded rim.',
    },
    scroll: {
      values: 'until-desktop · always',
      default: 'until-desktop',
      description: 'Whether the row also scrolls on desktop.',
    },
    cardWidth: {
      values: 'CSS length',
      default: '17rem',
      description: 'Card width while scrolling.',
    },
  },
  slot: 'A <ul> or <ol> of cards.',
  examples: [
    { file: 'plain', title: 'Scrolling row', viewports: true },
    { file: 'well', title: 'In the tray, on white' },
    { file: 'well-green', title: 'In the tray, on green' },
  ],
  notes: [
    'Every card is in the page from the start; nothing loads as you scroll.',
    'The row is a focusable region, so it scrolls with the keyboard too.',
    'When the row overflows, round arrow buttons under it (right corner) scroll a screen of cards at a time, for mice and trackpads without sideways scrolling. Touch screens swipe instead, so they get no arrows.',
  ],
});
