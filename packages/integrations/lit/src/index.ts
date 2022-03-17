import type { AstroIntegration } from 'astro';

function getViteConfiguration() {
	return {
		optimizeDeps: {
			include: [
				'@astrojs/lit/client-shim.js',
				'@astrojs/lit/hydration-support.js',
				'@webcomponents/template-shadowroot/template-shadowroot.js',
				'lit/experimental-hydrate-support.js',
			],
			exclude: ['@astrojs/lit/server.js'],
		},
		ssr: {
			external: ['lit-element/lit-element.js', '@lit-labs/ssr/lib/install-global-dom-shim.js', '@lit-labs/ssr/lib/render-lit-html.js', '@lit-labs/ssr/lib/lit-element-renderer.js'],
		},
	};
}

export default function (): AstroIntegration {
	return {
		name: '@astrojs/lit',
		hooks: {
			'astro:config:setup': ({ updateConfig, addRenderer, injectScript }) => {
				injectScript('before-hydration', `import '@astrojs/lit/client-shim.js';`);
				injectScript('before-hydration', `import '@astrojs/lit/hydration-support.js';`);
				addRenderer({
					name: '@astrojs/lit',
					serverEntrypoint: '@astrojs/lit/server.js',
				});
				updateConfig({
					vite: getViteConfiguration(),
				});
			},
		},
	};
}
