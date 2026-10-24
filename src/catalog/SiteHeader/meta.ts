import { defineMeta } from '../meta';
import SiteHeader from '../../components/layout/SiteHeader.astro';

export default defineMeta(SiteHeader, {
  title: 'SiteHeader',
  group: 'Layout',
  description:
    'The fixed header: large and see-through over a landing photo, then a compact green bar with a gold edge. A menu button on phones and tablets, the full menu on desktop.',
  source: 'src/components/layout/SiteHeader.astro',
  options: {},
  examples: [
    {
      file: 'default',
      title: 'Part of every page (PageLayout)',
      notes: 'See it at the top and bottom of this page; the frames show it at each width.',
      viewports: true,
    },
  ],
  notes: [
    'The menu closes on Escape, an outside tap or a link; it works without JavaScript.',
    'White text over photos sits on a fade of at least 60% black (4.5:1).',
  ],
});
