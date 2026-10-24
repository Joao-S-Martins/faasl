import { defineMeta } from '../meta';
import MediaFeature from '../../components/blocks/MediaFeature.astro';

export default defineMeta(MediaFeature, {
  title: 'MediaFeature',
  group: 'Blocks',
  order: 4,
  description:
    'A photo with a content box overlapping it, so the photo looks shaped around the text. Alternate sides down a page.',
  source: 'src/components/blocks/MediaFeature.astro',
  options: {
    image: { values: 'imported image', description: 'The photo.' },
    alt: { values: 'string', description: 'What the photo shows.' },
    side: { values: 'left · right', default: 'left', description: 'Photo side on desktop.' },
    tone: {
      values: 'plain · tint · green',
      default: 'plain',
      description: 'The box color. Use a box color that differs from the surface.',
    },
  },
  slot: 'A heading, a paragraph or two, and usually a ButtonRow.',
  examples: [
    { file: 'left', title: 'Photo left, white box, on tint', viewports: true },
    { file: 'right-tint', title: 'Photo right, tint box, on white' },
    { file: 'green', title: 'Green box' },
  ],
  notes: [
    'Desktop: the box floats over the photo edge, all corners rounded.',
    'Phones and tablets: photo first, the box butting against it, square where they meet.',
  ],
});
