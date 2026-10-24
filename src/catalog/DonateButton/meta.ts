import { defineMeta } from '../meta';
import DonateButton from '../../components/layout/DonateButton.astro';

export default defineMeta(DonateButton, {
  title: 'DonateButton',
  group: 'Layout',
  description:
    'A small Donate button floating near the bottom of the screen, hidden while a landing photo is in view.',
  source: 'src/components/layout/DonateButton.astro',
  options: {},
  examples: [
    {
      file: 'default',
      title: 'Part of every page (PageLayout)',
      notes: 'See it at the top and bottom of this page; the frames show it at each width.',
      viewports: true,
    },
  ],
  notes: ['Has a white ring so it shows on green sections.'],
});
