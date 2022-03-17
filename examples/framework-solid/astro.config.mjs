import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid';

// https://astro.build/config
export default defineConfig({
	// Enable Solid to support Solid JSX components.
	integrations: [solid()],
});
