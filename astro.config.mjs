import { defineConfig } from 'astro/config';
const site = process.env.SITE_URL ?? 'https://kecker.co';
export default defineConfig({ site, output: 'static' });
