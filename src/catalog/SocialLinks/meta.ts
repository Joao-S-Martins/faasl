import { defineMeta } from '../meta';
import SocialLinks from '../../components/content/SocialLinks.astro';

export default defineMeta(SocialLinks, {
  title: 'SocialLinks',
  group: 'Content',
  description: 'Links to our social accounts, from src/content/site.yaml.',
  source: 'src/components/content/SocialLinks.astro',
  options: {},
  examples: [{ file: 'default', title: 'Default' }],
});
