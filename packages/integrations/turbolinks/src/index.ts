import type { AstroIntegration } from 'astro';

export default function createPlugin(): AstroIntegration {
	return {
		name: '@astrojs/turbolinks',
		hooks: {
			'astro:config:setup': ({ injectScript }) => {
				injectScript('page', `import Turbolinks from "turbolinks"; Turbolinks.start();`);
			},
		},
	};
}
