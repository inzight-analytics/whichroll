// @ts-check
import { defineConfig } from 'astro/config';

// For project pages (username.github.io/repo-name), set BASE_PATH=/repo-name/
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.whichroll.co.nz',
  base,
  output: 'static',
  trailingSlash: 'always',
});
