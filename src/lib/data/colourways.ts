export interface ColourwayPreset {
	id: string;
	name: string;
	colors: string[];
}

export const COLOURWAY_PRESETS: ColourwayPreset[] = [
	{
		id: 'solar',
		name: 'Solar',
		colors: ['#FEE440', '#F77F00', '#D62828', '#7209B7']
	},
	{
		id: 'lagoon',
		name: 'Lagoon',
		colors: ['#52B788', '#00B4D8', '#0077B6', '#03045E']
	},
	{
		id: 'coral',
		name: 'Coral',
		colors: ['#F4A261', '#E76F51', '#E63946', '#6D2E46']
	},
	{
		id: 'aerial',
		name: 'Aerial',
		colors: ['#A0C4FF', '#70A6FF', '#BDB2FF', '#5E60CE']
	},
	{
		id: 'botanic',
		name: 'Botanic',
		colors: ['#95D5B2', '#52B788', '#2D6A4F', '#1B4332']
	},
	{
		id: 'violet',
		name: 'Violet',
		colors: ['#E2AFFF', '#B185DB', '#7209B7', '#3F37C9']
	},
	{
		id: 'cobalt',
		name: 'Cobalt',
		colors: ['#03045E', '#023E8A', '#0077B6', '#90E0EF']
	},
	{
		id: 'cinder',
		name: 'Cinder',
		colors: ['#2B2D42', '#8D99AE', '#F77F00', '#D62828']
	},
	{
		id: 'vivid',
		name: 'Vivid',
		colors: ['#FFD166', '#EF476F', '#06D6A0', '#118AB2']
	},
	{
		id: 'rainbow',
		name: 'Rainbow',
		colors: ['#EF476F', '#F78C6B', '#FFD166', '#06D6A0', '#118AB2', '#7209B7']
	},
	{
		id: 'rosewater',
		name: 'Rosewater',
		colors: ['#FFCCD5', '#FFB3C1', '#FF758F', '#C9184A']
	},
	{
		id: 'midnight',
		name: 'Midnight',
		colors: ['#0B132B', '#1C2541', '#3A506B', '#5BC0BE']
	}
];
