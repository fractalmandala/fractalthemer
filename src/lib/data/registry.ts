// Typed handle for the generated class registry.
//
// registry.json is produced by scripts/build-registry.mjs (also run by the Vite
// plugin on every styles change) — never edit it by hand. This module only adds
// the shape, mirroring the auras.json / auras.ts pairing in this directory.

import data from './registry.json';

export type RegistryKind = 'class' | 'token' | 'element' | 'keyframes';

export interface RegistryGroup {
	/** Family key, e.g. 'gaps'. */
	id: string;
	/** Display label, e.g. 'gaps' or 'size (height & width)'. */
	label: string;
}

export interface RegistryItem {
	/** '.gp-md', '--text-primary', 'body', '*' … */
	name: string;
	kind: RegistryKind;
	/** Sub-family within the layer, when the layer has a taxonomy. */
	group?: string;
}

export interface RegistryLayer {
	/** Layer key from index.sass, e.g. '02_dimensions'. */
	id: string;
	/** Display label, e.g. 'dimensions'. */
	label: string;
	/** Source partial, e.g. '_02_dimensions.sass'. */
	file: string;
	/** Position in index.sass. */
	order: number;
	items: RegistryItem[];
	/** Sub-family filters, present only on layers that have a taxonomy. */
	groups?: RegistryGroup[];
}

export interface Registry {
	generatedAt: string;
	totals: Record<RegistryKind, number>;
	layers: RegistryLayer[];
}

export const REGISTRY = data as unknown as Registry;
