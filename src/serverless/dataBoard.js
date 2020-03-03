import { uuid } from '@/shared/utils';

const board = {
	columns: [
		{
			name: 'Pendiente',
			id: `c-${uuid()}`,
			tasks: [
				{
					description: '',
					id: uuid(),
					name: 'First task',
					userAssigned: null,
				},
				{
					description: '',
					id: uuid(),
					name: 'Second task',
					userAssigned: null,
				},
				{
					description: '',
					id: uuid(),
					name: 'Third task',
					userAssigned: null,
				},
			],
		},
		{
			name: 'En progreso',
			id: `c-${uuid()}`,
			tasks: [
				{
					description: '',
					id: uuid(),
					name: 'Fourth task',
					userAssigned: null,
				},
			],
		},
		{
			name: 'Hecho',
			id: `c-${uuid()}`,
			tasks: [
				{
					description: '',
					id: uuid(),
					name: 'fiveth task',
					userAssigned: null,
				},
			],
		},
		{
			name: 'Revisado',
			id: `c-${uuid()}`,
			tasks: [
				{
					description: '',
					id: uuid(),
					name: 'sixth task',
					userAssigned: null,
				},
			],
		},
	],
};

export default board;
