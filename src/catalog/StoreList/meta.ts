import { defineMeta } from '../meta';
import StoreList from '../../components/content/StoreList.astro';

export default defineMeta(StoreList, {
  title: 'StoreList',
  group: 'Content',
  description: 'Music stores from src/content/stores.yaml.',
  source: 'src/components/content/StoreList.astro',
  options: { kind: { values: 'local · online', description: 'Which stores.' } },
  examples: [{ file: 'default', title: 'Default' }],
});
