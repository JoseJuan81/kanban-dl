import { uuid } from '@/shared/utils';

const board = {
	columns: [
		{
			name: 'Por Defecto',
			id: `c-${uuid()}`,
			tasks: [],
		},
	],
};

export default board;
