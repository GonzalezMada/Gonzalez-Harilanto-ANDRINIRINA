// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://gonzalezmada.github.io',
  base: '/Gonzalez-Harilanto-ANDRINIRINA',
  trailingSlash: 'always',
  redirects: {
    '/': '/fr',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});