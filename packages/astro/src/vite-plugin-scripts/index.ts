import { Plugin as VitePlugin } from 'vite';
import { AstroConfig } from '../@types/astro.js';

const SCRIPT_ID_PREFIX = `$scripts/`;
const BEFORE_HYDRATION_SCRIPT_ID = `${SCRIPT_ID_PREFIX}before-hydration.js`;
const PAGE_SCRIPT_ID = `${SCRIPT_ID_PREFIX}page.js`;

export default function astroScriptsPlugin({ config }: { config: AstroConfig }): VitePlugin {
	return {
		name: 'astro:scripts',
		async resolveId(id) {
			if (id.startsWith(SCRIPT_ID_PREFIX)) {
				return id;
			}
			return undefined;
		},

		async load(id) {
			if (id === BEFORE_HYDRATION_SCRIPT_ID) {
				return config._ctx.scripts
					.filter((s) => s.stage === 'before-hydration')
					.map((s) => s.content)
					.join('\n');
			}
			if (id === PAGE_SCRIPT_ID) {
				return config._ctx.scripts
					.filter((s) => s.stage === 'page')
					.map((s) => s.content)
					.join('\n');
			}
			return null;
		},
		buildStart(options) {
			// We only want to inject this script if we are building
			// for the frontend AND some hydrated components exist in
			// the final build. We can detect this by looking for a
			// `astro/client/*` input, which signifies both conditions are met.
			const hasHydratedComponents = Array.isArray(options.input) && options.input.some((input) => input.startsWith('astro/client'));
			if (hasHydratedComponents) {
				this.emitFile({
					type: 'chunk',
					id: BEFORE_HYDRATION_SCRIPT_ID,
					name: BEFORE_HYDRATION_SCRIPT_ID,
				});
			}
		},
	};
}
