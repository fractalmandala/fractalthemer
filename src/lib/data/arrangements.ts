export interface ArrangementPreset {
	id: string;
	name: string;
	engineType: string;
	pins: Array<{ x: number; y: number; radius: number }>;
}

export const ARRANGEMENT_PRESETS: ArrangementPreset[] = [
	// Lines Arrangements
	{
		id: 'snake',
		name: 'Snake',
		engineType: 'lines',
		pins: [
			{ x: 15, y: 20, radius: 40 },
			{ x: 85, y: 35, radius: 40 },
			{ x: 15, y: 65, radius: 40 },
			{ x: 85, y: 80, radius: 40 }
		]
	},
	{
		id: 'drops',
		name: 'Drops',
		engineType: 'lines',
		pins: [
			{ x: 25, y: 25, radius: 30 },
			{ x: 75, y: 30, radius: 35 },
			{ x: 40, y: 70, radius: 45 },
			{ x: 80, y: 80, radius: 30 }
		]
	},
	{
		id: 'loops',
		name: 'Loops',
		engineType: 'lines',
		pins: [
			{ x: 20, y: 50, radius: 50 },
			{ x: 40, y: 20, radius: 40 },
			{ x: 60, y: 80, radius: 40 },
			{ x: 80, y: 50, radius: 50 }
		]
	},
	{
		id: 'ribbon',
		name: 'Ribbon',
		engineType: 'lines',
		pins: [
			{ x: 10, y: 30, radius: 45 },
			{ x: 50, y: 80, radius: 60 },
			{ x: 90, y: 20, radius: 45 }
		]
	},
	{
		id: 'doodle',
		name: 'Doodle',
		engineType: 'lines',
		pins: [
			{ x: 15, y: 30, radius: 35 },
			{ x: 45, y: 75, radius: 45 },
			{ x: 70, y: 25, radius: 40 },
			{ x: 90, y: 65, radius: 35 }
		]
	},
	{
		id: 'wander',
		name: 'Wander',
		engineType: 'lines',
		pins: [
			{ x: 30, y: 80, radius: 40 },
			{ x: 30, y: 30, radius: 50 },
			{ x: 70, y: 30, radius: 50 },
			{ x: 70, y: 80, radius: 40 }
		]
	},
	{
		id: 'waves',
		name: 'Waves',
		engineType: 'lines',
		pins: [
			{ x: 10, y: 40, radius: 40 },
			{ x: 35, y: 65, radius: 40 },
			{ x: 65, y: 35, radius: 40 },
			{ x: 90, y: 60, radius: 40 }
		]
	},
	{
		id: 'echo',
		name: 'Echo',
		engineType: 'lines',
		pins: [
			{ x: 20, y: 80, radius: 45 },
			{ x: 50, y: 20, radius: 55 },
			{ x: 80, y: 75, radius: 45 }
		]
	},

	// Flow Arrangements
	{
		id: 'flow-cloud',
		name: 'Iridescent Cloud',
		engineType: 'flow',
		pins: [
			{ x: 30, y: 30, radius: 60 },
			{ x: 70, y: 40, radius: 50 },
			{ x: 40, y: 75, radius: 55 }
		]
	},
	{
		id: 'flow-opal',
		name: 'Opal',
		engineType: 'flow',
		pins: [
			{ x: 25, y: 35, radius: 45 },
			{ x: 75, y: 25, radius: 50 },
			{ x: 50, y: 70, radius: 60 },
			{ x: 80, y: 80, radius: 40 }
		]
	},
	{
		id: 'flow-solar',
		name: 'Solar Flare',
		engineType: 'flow',
		pins: [
			{ x: 50, y: 50, radius: 70 },
			{ x: 20, y: 20, radius: 40 },
			{ x: 80, y: 80, radius: 40 }
		]
	},
	{
		id: 'flow-tide',
		name: 'Electric Tide',
		engineType: 'flow',
		pins: [
			{ x: 15, y: 50, radius: 55 },
			{ x: 50, y: 25, radius: 45 },
			{ x: 85, y: 55, radius: 60 }
		]
	}
];
