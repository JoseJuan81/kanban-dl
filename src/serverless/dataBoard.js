import { uuid } from '@/shared/utils';

const columns = [
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
];

export default columns;
