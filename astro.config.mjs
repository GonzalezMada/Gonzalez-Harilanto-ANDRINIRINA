// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const base = '/Gonzalez-Harilanto-ANDRINIRINA';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://gonzalezmada.github.io',
  base,
  trailingSlash: 'always',
  redirects: {
    '/': `${base}/fr/`,
  },
  vite: {
    plugins: [tailwindcss()]
  }
});