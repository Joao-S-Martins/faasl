import { defineMeta } from '../meta';
import Hero from '../../components/blocks/Hero.astro';

export default defineMeta(Hero, {
  title: 'Hero',
  group: 'Blocks',
  order: 2,
  description:
    'The landing photo at the top of a page, with the title box overlapping its bottom edge, so the heading never depends on the photo for contrast.',
  source: 'src/components/blocks/Hero.astro',
  options: {
    image: {
      values: 'imported image',
      description:
        "The photo (from src/assets). Leave out while it's missing: beta shows a placeholder, production the title box alone.",
    },
    alt: { values: 'string', description: 'What the photo shows.' },
    needs: {
      values: 'string',
      default: 'a photo',
      description:
        'Without an image: the photo the page needs, shown in the placeholder (and listed in docs/todo.md, Photos).',
    },
    size: {
      values: 'home · page',
      default: 'home',
      description: 'Tall for the home page, shorter for inner pages.',
    },
    surface: {
      values: 'plain · tint · green',
      default: 'plain',
      description: 'The color around the box; match the next section so the two read as one.',
    },
    focus: {
      values: 'CSS object-position',
      default: 'center 30%',
      description: 'Where to keep the subject when the photo is cropped on phones.',
    },
  },
  slot: "The box content: the page's h1, a .sub line, a short paragraph.",
  examples: [
    { file: 'home', title: 'Home size, on green', viewports: true },
    { file: 'page', title: 'Page size, on tint' },
    { file: 'missing', title: 'Photo still missing (beta placeholder)' },
  ],
  notes: [
    'Pass `hero` to PageLayout on pages that open with a Hero: the header starts large over the photo.',
    'One Hero per page, always first.',
    'Later: a short silent video loop; the photo stays the first thing that loads.',
  ],
});
