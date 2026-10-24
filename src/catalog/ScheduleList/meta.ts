import { defineMeta } from '../meta';
import ScheduleList from '../../components/content/ScheduleList.astro';

export default defineMeta(ScheduleList, {
  title: 'ScheduleList',
  group: 'Content',
  description:
    'The weekly schedule from src/content/schedule.yaml (the only place days and times are set).',
  source: 'src/components/content/ScheduleList.astro',
  options: { only: { values: 'schedule ids', default: 'all', description: 'Only these entries.' } },
  examples: [{ file: 'default', title: 'Default' }],
});
