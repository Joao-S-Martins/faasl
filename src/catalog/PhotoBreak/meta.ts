import { defineMeta } from '../meta';
import PhotoBreak from '../../components/blocks/PhotoBreak.astro';

export default defineMeta(PhotoBreak, {
  title: 'PhotoBreak',
  group: 'Blocks',
  order: 5,
  description: 'A full-width photo between sections, as a breather in a long page.',
  source: 'src/components/blocks/PhotoBreak.astro',
  options: {
    image: { values: 'imported image', description: 'The photo.' },
    alt: { values: 'string', description: 'What the photo shows.' },
  },
  examples: [{ file: 'default', title: 'Between two sections' }],
  notes: ['Use at most once or twice per page.'],
});
