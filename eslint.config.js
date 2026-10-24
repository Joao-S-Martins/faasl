// @ts-check
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['www/', 'dist/', '.astro/', '.wrangler/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    // Config files and integrations run in Node.
    files: ['*.{js,mjs}', 'src/integrations/**/*.mjs', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    // The Worker runs on Cloudflare (web APIs); its tests run in Node.
    files: ['worker/**/*.js'],
    languageOptions: { globals: { ...globals.serviceworker, ...globals.node } },
  },
);
