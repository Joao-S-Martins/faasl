import { defineMeta } from '../meta';
import MapEmbed from '../../components/blocks/MapEmbed.astro';

export default defineMeta(MapEmbed, {
  title: 'MapEmbed',
  group: 'Blocks',
  order: 20,
  description:
    'A Google map that only loads when the visitor asks for it, so the page stays fast and private.',
  source: 'src/components/blocks/MapEmbed.astro',
  options: {
    src: { values: 'embed URL', description: "The map's embed address." },
    title: { values: 'string', description: 'Names the map for screen readers.' },
    label: { values: 'string', default: 'Show the map', description: 'The button label.' },
  },
  examples: [{ file: 'default', title: 'Music stores map' }],
});
