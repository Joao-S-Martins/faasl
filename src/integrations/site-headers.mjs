// @ts-check
import { writeFile } from 'node:fs/promises';

/**
 * Writes `robots.txt` and the Cloudflare `_headers` file into the build output.
 * Builds that aren't production (beta, local) block all crawlers, so a beta can
 * never compete with the live site in search results.
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function siteHeaders() {
  /** @type {URL | undefined} */
  let site;
  return {
    name: 'faasl:site-headers',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site ? new URL(config.site) : undefined;
      },
      'astro:build:done': async ({ dir }) => {
        const isProduction = process.env.SITE_ENV === 'production';

        const robots = isProduction
          ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`
          : 'User-agent: *\nDisallow: /\n';

        const headers = [
          '/*',
          '  X-Content-Type-Options: nosniff',
          '  Referrer-Policy: strict-origin-when-cross-origin',
          '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
          ...(isProduction ? [] : ['  X-Robots-Tag: noindex, nofollow']),
          '',
          '/_astro/*',
          '  Cache-Control: public, max-age=31536000, immutable',
          '',
        ].join('\n');

        await writeFile(new URL('robots.txt', dir), robots);
        await writeFile(new URL('_headers', dir), headers);
      },
    },
  };
}
