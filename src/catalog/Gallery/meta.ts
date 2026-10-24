import { defineMeta } from '../meta';
import Gallery from '../../components/blocks/Gallery.astro';

export default defineMeta(Gallery, {
  title: 'Gallery',
  group: 'Blocks',
  order: 5.5,
  description:
    'A grid of photos and short video clips that opens full screen in a lightbox, where visitors swipe, zoom and read captions. Event write-ups get one automatically from their gallery list.',
  source: 'src/components/blocks/Gallery.astro',
  options: {
    items: {
      values: '{ image, alt, caption? } · { video, poster, alt, caption? }',
      description:
        'Photos (an imported image) and clips (a /media/events/… path plus a poster image), in order.',
    },
    label: {
      values: 'string',
      description: 'Names the gallery for screen readers, e.g. "Photos and video from …".',
    },
  },
  examples: [{ file: 'default', title: 'Photos and a clip', viewports: true }],
  notes: [
    'Tap a thumbnail to open the lightbox; swipe or use the arrow keys between slides, pinch or double-tap to zoom photos.',
    'Without JavaScript every thumbnail is a link to the full photo or clip, so search engines see the photos, alt text and captions.',
    'Photos are cropped square in the grid and shown whole in the lightbox.',
    'Clips: MP4 (H.264), up to about a minute and 20 MB; the poster is a still from the clip. See docs/event-writeups.md.',
    'Only photos of students whose families signed the photo consent form (docs/brief.md §5.1).',
  ],
});
