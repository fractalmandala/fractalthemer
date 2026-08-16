// Artisan Color Swatch Reference Library with WCAG Contrast Ratings

export interface ArtisanColor {
	name: string;
	hex: string;
	category: 'grey' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown';
	contrastWhite: number;
	contrastBlack: number;
}

export const ARTISAN_COLORS: ArtisanColor[] = [
	// Greys & Blacks
	{ name: 'Black', hex: '#000000', category: 'grey', contrastWhite: 21, contrastBlack: 1 },
	{ name: 'Black Ink', hex: '#1C1D21', category: 'grey', contrastWhite: 17.5, contrastBlack: 1.2 },
	{ name: 'Ink Grey', hex: '#2B2D42', category: 'grey', contrastWhite: 14.1, contrastBlack: 1.49 },
	{ name: 'Dull Grey', hex: '#6C757D', category: 'grey', contrastWhite: 4.62, contrastBlack: 4.54 },
	{ name: 'Sooty Bamboo', hex: '#4A4E69', category: 'grey', contrastWhite: 8.35, contrastBlack: 2.51 },
	{ name: 'Charcoal', hex: '#22223B', category: 'grey', contrastWhite: 16.2, contrastBlack: 1.3 },
	{ name: 'Smoke Grey', hex: '#8D99AE', category: 'grey', contrastWhite: 2.82, contrastBlack: 7.44 },
	{ name: 'Silk Grey', hex: '#E0E1DD', category: 'grey', contrastWhite: 1.32, contrastBlack: 15.9 },
	{ name: 'Shell White', hex: '#F8F9FA', category: 'grey', contrastWhite: 1.06, contrastBlack: 19.8 },

	// Reds & Corals
	{ name: 'Cherry Blossom', hex: '#FFB7B2', category: 'red', contrastWhite: 1.76, contrastBlack: 11.9 },
	{ name: 'Pale Crimson', hex: '#E56B6F', category: 'red', contrastWhite: 3.65, contrastBlack: 5.75 },
	{ name: 'Adzuki Bean', hex: '#6D2E46', category: 'red', contrastWhite: 11.2, contrastBlack: 1.87 },
	{ name: 'Coral', hex: '#F28482', category: 'red', contrastWhite: 2.67, contrastBlack: 7.86 },
	{ name: 'Crimson', hex: '#B80C09', category: 'red', contrastWhite: 6.78, contrastBlack: 3.1 },
	{ name: 'Madder Red', hex: '#A4161A', category: 'red', contrastWhite: 8.44, contrastBlack: 2.49 },
	{ name: 'Vermilion', hex: '#E63946', category: 'red', contrastWhite: 4.41, contrastBlack: 4.76 },
	{ name: 'Rusted Red', hex: '#800E13', category: 'red', contrastWhite: 12.1, contrastBlack: 1.73 },
	{ name: 'Red Plum', hex: '#660708', category: 'red', contrastWhite: 15.4, contrastBlack: 1.36 },

	// Yellows & Oranges
	{ name: 'Persimmon', hex: '#F77F00', category: 'yellow', contrastWhite: 2.38, contrastBlack: 8.82 },
	{ name: 'Kerria Gold', hex: '#FCBF49', category: 'yellow', contrastWhite: 1.58, contrastBlack: 13.3 },
	{ name: 'Sunflower', hex: '#FFD166', category: 'yellow', contrastWhite: 1.45, contrastBlack: 14.5 },
	{ name: 'Ivory', hex: '#FEFAE0', category: 'yellow', contrastWhite: 1.05, contrastBlack: 20.0 },
	{ name: 'Eggshell', hex: '#F3E9D2', category: 'yellow', contrastWhite: 1.21, contrastBlack: 17.3 },
	{ name: 'Pale Yellow', hex: '#FFF3B0', category: 'yellow', contrastWhite: 1.15, contrastBlack: 18.2 },
	{ name: 'Cork Tree Yellow', hex: '#E09F3E', category: 'yellow', contrastWhite: 2.22, contrastBlack: 9.45 },
	{ name: 'Ochre', hex: '#C97A1E', category: 'yellow', contrastWhite: 3.65, contrastBlack: 5.75 },
	{ name: 'Bitter Orange', hex: '#FB8500', category: 'yellow', contrastWhite: 2.41, contrastBlack: 8.71 },

	// Greens & Mints
	{ name: 'Pine Needle', hex: '#2D6A4F', category: 'green', contrastWhite: 6.32, contrastBlack: 3.32 },
	{ name: 'Young Bamboo', hex: '#52B788', category: 'green', contrastWhite: 2.31, contrastBlack: 9.09 },
	{ name: 'Celadon', hex: '#74C69D', category: 'green', contrastWhite: 1.91, contrastBlack: 10.9 },
	{ name: 'Sprout Green', hex: '#95D5B2', category: 'green', contrastWhite: 1.56, contrastBlack: 13.4 },
	{ name: 'Pale Green', hex: '#D8F3DC', category: 'green', contrastWhite: 1.16, contrastBlack: 18.1 },
	{ name: 'Evergreen', hex: '#1B4332', category: 'green', contrastWhite: 11.8, contrastBlack: 1.77 },
	{ name: 'Moss', hex: '#40916C', category: 'green', contrastWhite: 3.65, contrastBlack: 5.75 },
	{ name: 'Seaweed', hex: '#081C15', category: 'green', contrastWhite: 18.9, contrastBlack: 1.11 },
	{ name: 'Nightingale', hex: '#606C38', category: 'green', contrastWhite: 5.45, contrastBlack: 3.85 },
	{ name: 'Willow', hex: '#283618', category: 'green', contrastWhite: 14.6, contrastBlack: 1.44 },

	// Blues & Indigos
	{ name: 'Samurai Indigo', hex: '#03045E', category: 'blue', contrastWhite: 17.8, contrastBlack: 1.18 },
	{ name: 'Deep Indigo', hex: '#023E8A', category: 'blue', contrastWhite: 11.2, contrastBlack: 1.87 },
	{ name: 'Lapis', hex: '#0077B6', category: 'blue', contrastWhite: 4.88, contrastBlack: 4.3 },
	{ name: 'Glazed Azure', hex: '#0096C7', category: 'blue', contrastWhite: 3.51, contrastBlack: 5.98 },
	{ name: 'Clear Hanada', hex: '#00B4D8', category: 'blue', contrastWhite: 2.32, contrastBlack: 9.05 },
	{ name: 'Sky', hex: '#48CAE4', category: 'blue', contrastWhite: 1.84, contrastBlack: 11.4 },
	{ name: 'Pale Hanada', hex: '#ADE8F4', category: 'blue', contrastWhite: 1.25, contrastBlack: 16.8 },
	{ name: 'Midnight', hex: '#0B132B', category: 'blue', contrastWhite: 18.2, contrastBlack: 1.15 },
	{ name: 'Navy', hex: '#1C2541', category: 'blue', contrastWhite: 14.9, contrastBlack: 1.41 },

	// Purples & Violets
	{ name: 'Wisteria', hex: '#7209B7', category: 'purple', contrastWhite: 8.21, contrastBlack: 2.56 },
	{ name: 'Dark Purple', hex: '#3A0CA3', category: 'purple', contrastWhite: 13.9, contrastBlack: 1.51 },
	{ name: 'Plum Smoke', hex: '#560BAD', category: 'purple', contrastWhite: 11.6, contrastBlack: 1.81 },
	{ name: 'Bellflower Purple', hex: '#B5179E', category: 'purple', contrastWhite: 4.95, contrastBlack: 4.24 },
	{ name: 'Ibis Pink', hex: '#F72585', category: 'purple', contrastWhite: 3.42, contrastBlack: 6.14 },
	{ name: 'Edo Purple', hex: '#480CA8', category: 'purple', contrastWhite: 12.8, contrastBlack: 1.64 },
	{ name: 'Orchid', hex: '#C77DFF', category: 'purple', contrastWhite: 2.34, contrastBlack: 8.97 },
	{ name: 'Pale Lavender', hex: '#E0AAFF', category: 'purple', contrastWhite: 1.48, contrastBlack: 14.2 },

	// Browns & Earths
	{ name: 'Dark Brown', hex: '#38220F', category: 'brown', contrastWhite: 15.6, contrastBlack: 1.34 },
	{ name: 'Chestnut', hex: '#634832', category: 'brown', contrastWhite: 8.95, contrastBlack: 2.34 },
	{ name: 'Walnut', hex: '#895737', category: 'brown', contrastWhite: 6.42, contrastBlack: 3.27 },
	{ name: 'Tea Grey', hex: '#C08552', category: 'brown', contrastWhite: 3.25, contrastBlack: 6.46 },
	{ name: 'Flax', hex: '#DAB49D', category: 'brown', contrastWhite: 1.88, contrastBlack: 11.2 },
	{ name: 'Cinnamon', hex: '#9C6644', category: 'brown', contrastWhite: 5.61, contrastBlack: 3.74 },
	{ name: 'Shrimp Brown', hex: '#7F4F24', category: 'brown', contrastWhite: 7.92, contrastBlack: 2.65 }
];
