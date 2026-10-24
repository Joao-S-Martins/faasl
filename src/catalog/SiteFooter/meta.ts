import { defineMeta } from '../meta';
import SiteFooter from '../../components/layout/SiteFooter.astro';

export default defineMeta(SiteFooter, {
  title: 'SiteFooter',
  group: 'Layout',
  description:
    'The footer: names and legal line, menu, both addresses, phone and email, social links, the Musicians link and the copyright.',
  source: 'src/components/layout/SiteFooter.astro',
  options: {},
  examples: [
    {
      file: 'default',
      title: 'Part of every page (PageLayout)',
      notes: 'See it at the top and bottom of this page; the frames show it at each width.',
      viewports: true,
    },
  ],
  notes: [],
});
