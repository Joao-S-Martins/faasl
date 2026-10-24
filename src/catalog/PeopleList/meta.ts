import { defineMeta } from '../meta';
import PeopleList from '../../components/content/PeopleList.astro';

export default defineMeta(PeopleList, {
  title: 'PeopleList',
  group: 'Content',
  order: 1,
  description:
    'People with a role (leadership, teacher, conductor…) from src/content/people, as a grid or a sideways row.',
  source: 'src/components/content/PeopleList.astro',
  options: {
    role: {
      values: 'leadership · teacher · conductor · volunteer · musician',
      description: 'Who to show, in their `order`.',
    },
    compact: { values: 'boolean', default: 'false', description: 'Photo, name and title only.' },
    layout: {
      values: 'grid · row',
      default: 'grid',
      description: 'A grid, or a sideways row on phones and tablets (CardRow).',
    },
    well: {
      values: 'boolean',
      default: 'false',
      description: 'The row sits in the recessed tray.',
    },
    label: {
      values: 'string',
      default: 'People',
      description: 'Names the row for screen readers.',
    },
  },
  examples: [
    { file: 'row', title: 'Leadership row in the tray', viewports: true },
    { file: 'grid', title: 'Grid with bios' },
  ],
  notes: [
    'Drafts (missing details) show on beta with a dashed outline, and are left out in production.',
  ],
});
