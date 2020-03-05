import { uuid } from '@/shared/utils';

const board = {
	columns: [
		{
			name: 'Pendiente',
			id: `c-${uuid()}`,
			tasks: [
				{
					description: 'descripcioón de la tarea',
					id: uuid(),
					name: 'First task',
					tags: [],
					userAssigned: null,
				},
				{
					description: '',
					id: uuid(),
					name: 'Second task',
					tags: [],
					userAssigned: null,
				},
				{
					description: '',
					id: uuid(),
					name: 'Third task',
					tags: [],
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
					tags: [],
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
					tags: [],
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
					tags: [],
					userAssigned: null,
				},
			],
		},
	],
};

export default board;
