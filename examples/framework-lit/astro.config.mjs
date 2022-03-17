import { defineConfig } from 'astro/config';

import litPlugin from '@astrojs/lit';
import tailwindPlugin from '@astrojs/tailwind';
import sitemapPlugin from '@astrojs/sitemap';
import partytownPlugin from '@astrojs/partytown';

export default defineConfig({
	integrations: [litPlugin(), tailwindPlugin(), sitemapPlugin(), partytownPlugin()],
});
