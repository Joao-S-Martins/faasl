// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import siteHeaders from './src/integrations/site-headers.mjs';
import draftMedia from './src/integrations/draft-media.mjs';

// Pages that should never appear in the sitemap.
const UNLISTED = ['/musicians', '/404', '/design', '/message-'];

export default defineConfig({
  site: 'https://www.faasl.org',
  trailingSlash: 'never',
  build: {
    // /lessons is served from lessons.html, so URLs have no trailing slash.
    format: 'file',
  },
  env: {
    schema: {
      // Set by the deploy workflows. Anything other than "production" is
      // hidden from search engines.
      SITE_ENV: envField.enum({
        context: 'server',
        access: 'public',
        values: ['development', 'beta', 'production'],
        default: 'development',
      }),
      // The contact form's Turnstile widget (docs/services.md §1). Public by
      // design; set by the production deploy at launch. The default is
      // Cloudflare's always-pass test key.
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        default: '1x00000000000000000000AA',
      }),
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !UNLISTED.some((path) => new URL(page).pathname.startsWith(path)),
    }),
    siteHeaders(),
    draftMedia(),
  ],
});
