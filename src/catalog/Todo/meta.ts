import { defineMeta } from '../meta';
import Todo from '../../components/layout/Todo.astro';

export default defineMeta(Todo, {
  title: 'Todo',
  group: 'Layout',
  description:
    'Marks missing content. Visible on beta and local builds as a reminder; renders nothing in production.',
  source: 'src/components/layout/Todo.astro',
  options: {
    block: {
      values: 'boolean',
      default: 'false',
      description: 'Its own paragraph instead of inline.',
    },
  },
  slot: "What's missing.",
  examples: [{ file: 'default', title: 'Inline and block' }],
});
