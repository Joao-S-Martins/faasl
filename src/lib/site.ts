import { getEntry } from 'astro:content';
import { SITE_ENV } from 'astro:env/server';

export const isProduction = SITE_ENV === 'production';

/** Organization facts from src/content/site.yaml. */
export async function getSite() {
  const entry = await getEntry('site', 'faasl');
  if (!entry) throw new Error('Missing src/content/site.yaml entry "faasl"');
  return entry.data;
}

/** Years since the band was founded, so the copy never goes stale. */
export function yearsSince(year: number, now = new Date()) {
  return now.getFullYear() - year;
}
