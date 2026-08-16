export interface SilhouetteShape {
	id: string;
	name: string;
	path: string;
}

export const SILHOUETTE_SHAPES: SilhouetteShape[] = [
	{
		id: 'arch',
		name: 'Arch',
		path: 'M 10,90 L 10,50 A 40,40 0 0,1 90,50 L 90,90 Z'
	},
	{
		id: 'clover',
		name: 'Clover',
		path: 'M 50,50 C 30,20 10,40 30,60 C 10,80 30,100 50,70 C 70,100 90,80 70,60 C 90,40 70,20 50,50 Z'
	},
	{
		id: 'heart',
		name: 'Heart',
		path: 'M 50,85 C 10,55 10,20 35,20 C 45,20 50,30 50,30 C 50,30 55,20 65,20 C 90,20 90,55 50,85 Z'
	},
	{
		id: 'drapery',
		name: 'Drapery',
		path: 'M 15,15 Q 32,25 32,50 Q 32,75 15,85 L 85,85 Q 68,75 68,50 Q 68,25 85,15 Z'
	},
	{
		id: 'leaf4',
		name: '4-Leaf',
		path: 'M 50,10 C 60,35 65,40 90,50 C 65,60 60,65 50,90 C 40,65 35,60 10,50 C 35,40 40,35 50,10 Z'
	},
	{
		id: 'sunburst',
		name: 'Sunburst',
		path: 'M 50,15 L 58,35 L 80,25 L 70,45 L 90,55 L 70,65 L 80,85 L 58,75 L 50,95 L 42,75 L 20,85 L 30,65 L 10,55 L 30,45 L 20,25 L 42,35 Z'
	},
	{
		id: 'flower',
		name: 'Flower',
		path: 'M 50,35 A 15,15 0 0,0 35,50 A 15,15 0 0,0 50,65 A 15,15 0 0,0 65,50 A 15,15 0 0,0 50,35 M 50,10 A 15,15 0 0,1 65,25 A 15,15 0 0,1 50,40 A 15,15 0 0,1 35,25 A 15,15 0 0,1 50,10 Z'
	},
	{
		id: 'starburst',
		name: 'Starburst',
		path: 'M 50,5 L 62,38 L 95,50 L 62,62 L 50,95 L 38,62 L 5,50 L 38,38 Z'
	},
	{
		id: 'cross',
		name: 'Cross',
		path: 'M 35,10 L 65,10 L 65,35 L 90,35 L 90,65 L 65,65 L 65,90 L 35,90 L 35,65 L 10,65 L 10,35 L 35,35 Z'
	},
	{
		id: 'ring',
		name: 'Ring',
		path: 'M 50,10 A 40,40 0 1,0 50,90 A 40,40 0 1,0 50,10 M 50,28 A 22,22 0 1,1 50,72 A 22,22 0 1,1 50,28 Z'
	},
	{
		id: 'sparkle',
		name: 'Sparkle',
		path: 'M 50,10 Q 50,50 90,50 Q 50,50 50,90 Q 50,50 10,50 Q 50,50 50,10 Z'
	},
	{
		id: 'stripes',
		name: 'Parallel Stripes',
		path: 'M 10,20 L 90,20 L 90,32 L 10,32 Z M 10,44 L 90,44 L 90,56 L 10,56 Z M 10,68 L 90,68 L 90,80 L 10,80 Z'
	},
	{
		id: 'dome',
		name: 'Dome',
		path: 'M 20,80 A 30,30 0 0,1 80,80 Z'
	},
	{
		id: 'propeller',
		name: 'Propeller',
		path: 'M 50,50 L 30,20 A 15,15 0 0,1 50,10 L 50,50 L 70,80 A 15,15 0 0,1 50,90 Z'
	},
	{
		id: 'squiggle',
		name: 'Squiggle',
		path: 'M 20,20 Q 50,40 20,60 Q 50,80 20,100 L 40,100 Q 70,80 40,60 Q 70,40 40,20 Z'
	},
	{
		id: 'flower8',
		name: 'Flower 8',
		path: 'M 50,20 C 58,20 60,35 70,30 C 80,25 85,40 80,50 C 85,60 80,75 70,70 C 60,65 58,80 50,80 C 42,80 40,65 30,70 C 20,75 15,60 20,50 C 15,40 20,25 30,30 C 40,35 42,20 50,20 Z'
	},
	{
		id: 'teardrop',
		name: 'Teardrop',
		path: 'M 50,10 C 50,10 80,50 80,68 A 30,30 0 0,1 20,68 C 20,50 50,10 50,10 Z'
	},
	{
		id: 'circle',
		name: 'Circle',
		path: 'M 50,10 A 40,40 0 1,0 50,90 A 40,40 0 1,0 50,10 Z'
	},
	{
		id: 'pebble',
		name: 'Pebble',
		path: 'M 30,25 C 60,15 85,30 80,60 C 75,90 40,85 25,70 C 10,55 10,35 30,25 Z'
	},
	{
		id: 'eyering',
		name: 'Eye Ring',
		path: 'M 10,50 Q 50,15 90,50 Q 50,85 10,50 Z M 50,35 A 15,15 0 1,1 50,65 A 15,15 0 1,1 50,35 Z'
	},
	{
		id: 'crescent',
		name: 'Crescent',
		path: 'M 50,15 A 35,35 0 1,0 85,50 A 28,28 0 0,1 50,15 Z'
	},
	{
		id: 'star',
		name: '5-Point Star',
		path: 'M 50,15 L 61,38 L 86,41 L 68,58 L 73,83 L 50,71 L 27,83 L 32,58 L 14,41 L 39,38 Z'
	},
	{
		id: 'xpill',
		name: 'X-Pill',
		path: 'M 20,35 L 35,20 L 50,35 L 65,20 L 80,35 L 65,50 L 80,65 L 65,80 L 50,65 L 35,80 L 20,65 L 35,50 Z'
	},
	{
		id: 'wave',
		name: 'Wave',
		path: 'M 10,60 Q 30,30 50,60 T 90,60 L 90,85 L 10,85 Z'
	}
];
