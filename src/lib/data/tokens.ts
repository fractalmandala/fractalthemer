export interface TokenMeta {
	key: string;
	label: string;
	category: 'surface' | 'typography' | 'border' | 'state' | 'accent';
	description: string;
	defaultVal: string;
}

export const CORE_TOKENS: TokenMeta[] = [
	{ key: 'bg', label: 'App Canvas Base', category: 'surface', description: 'Deepest backdrop surface of the application', defaultVal: '#FFFFFF' },
	{ key: 'bg-surface', label: 'Card Surface', category: 'surface', description: 'Primary card and content container background', defaultVal: '#F8F9FA' },
	{ key: 'bg-raised', label: 'Raised Elements', category: 'surface', description: 'Elevated popovers, floating headers, tooltips', defaultVal: '#FFFFFF' },
	{ key: 'bg-panel', label: 'Sidebars & Panels', category: 'surface', description: 'Navbars, lateral sidebars, drawer panels', defaultVal: '#F1F3F5' },
	{ key: 'bg-footer', label: 'Footer Surface', category: 'surface', description: 'Bottom footer area', defaultVal: '#E9ECEF' },
	{ key: 'bg-popover', label: 'Popover & Modals', category: 'surface', description: 'Modal dialogs, dropdowns, popup menus', defaultVal: '#FFFFFF' },
	{ key: 'bg-dialog', label: 'Dialog Backdrop', category: 'surface', description: 'Dialog card background', defaultVal: '#FFFFFF' },
	{ key: 'bg-terminal', label: 'Code & Terminal', category: 'surface', description: 'Terminal blocks and code view background', defaultVal: '#0F172A' },
	{ key: 'bg-input', label: 'Form Inputs', category: 'surface', description: 'Input fields, textareas, select boxes', defaultVal: '#FFFFFF' },
	{ key: 'bg-canvas', label: 'Canvas / Viewport', category: 'surface', description: 'Outer workspace canvas background', defaultVal: '#F8F9FA' },
	{ key: 'border', label: 'Standard Border', category: 'border', description: 'Primary borders, card outlines, separators', defaultVal: '#E2E8F0' },
	{ key: 'border-subtle', label: 'Subtle Border', category: 'border', description: 'Faint divider lines and inner item borders', defaultVal: '#EDF2F7' },
	{ key: 'text-primary', label: 'Primary Text', category: 'typography', description: 'Headings, titles, high-contrast text', defaultVal: '#0F172A' },
	{ key: 'text-secondary', label: 'Secondary Text', category: 'typography', description: 'Body paragraphs, descriptions, labels', defaultVal: '#475569' },
	{ key: 'text-muted', label: 'Muted Text', category: 'typography', description: 'Captions, timestamps, metadata', defaultVal: '#7F91AA' },
	{ key: 'text-inverse', label: 'Inverse Text', category: 'typography', description: 'Contrast text on brand/accent buttons', defaultVal: '#FFFFFF' },
	{ key: 'state-hover', label: 'Hover State', category: 'state', description: 'Background tint on button and card hover', defaultVal: '#E2E8F0' },
	{ key: 'state-hover-subtle', label: 'Subtle Hover', category: 'state', description: 'Gentle hover state on list items', defaultVal: '#F1F5F9' },
	{ key: 'state-selected', label: 'Selected State', category: 'state', description: 'Active tab, selected item highlight', defaultVal: '#CBD5E1' },
	{ key: 'theme-color', label: 'Brand Accent', category: 'accent', description: 'Primary brand action color, active badges, highlights', defaultVal: '#04825B' },
	{ key: 'theme-color-alt', label: 'Accent Alternate', category: 'accent', description: 'Hover state for brand accent buttons', defaultVal: '#047857' },
	{ key: 'feedback-error', label: 'Error Feedback', category: 'state', description: 'Validation errors and destructive alerts', defaultVal: '#DC2626' }
];
