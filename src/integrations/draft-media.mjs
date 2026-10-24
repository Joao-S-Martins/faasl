// @ts-check
import { readdir, readFile, rm } from 'node:fs/promises';

const WRITEUPS = new URL('../content/event-writeups/', import.meta.url);

/**
 * Video clips live in public/media/events/<write-up name>/, which Astro copies
 * into every build. A draft write-up isn't published in production, so its
 * clips are removed from production builds too.
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function draftMedia() {
  return {
    name: 'faasl:draft-media',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (process.env.SITE_ENV !== 'production') return;
        for (const file of await readdir(WRITEUPS)) {
          const name = file.match(/^(.+)\.mdx?$/)?.[1];
          if (!name) continue;
          const frontmatter = (await readFile(new URL(file, WRITEUPS), 'utf8')).split(/^---$/m)[1];
          if (/^draft:\s*true\s*$/m.test(frontmatter ?? '')) {
            await rm(new URL(`media/events/${name}/`, dir), { recursive: true, force: true });
            logger.info(`left out the clips of draft write-up ${name}`);
          }
        }
      },
    },
  };
}
