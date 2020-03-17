import Vue from 'vue';
import Vuex from 'vuex';
import dataBoard from '@/serverless/dataBoard';
import { saveStatePlugin, uuid } from '@/shared/utils';

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || dataBoard;

export default new Vuex.Store({
	plugins: [saveStatePlugin],
	state: {
		board,
	},
	mutations: {
		// ADD_FIRST_TASK(state, { fromIndexColumn, fromIndexTask, toTasks }) {
		// 	const { tasks } = state.board.columns[fromIndexColumn];
		// 	const task = tasks.splice(fromIndexTask, 1)[0];
		// 	toTasks.push(task);
		// },
		CREATE_NEW_COLUMN(state, { name }) {
			state.board.columns.push({
				name,
				id: `c-${uuid()}`,
				tasks: [],
			});
		},
		CREATE_NEW_TASK(state, { name, tasks }) {
			const newTask = {
				description: '',
				id: uuid(),
				name,
				tags: [],
				userAssigned: null,
			};
			tasks.push(newTask);
		},
		// DRAGGING_COLUMN(state, { toColumnIndex, fromColumnIndex }) {
		// 	const { columns } = state.board;
		// 	const [fromColumn] = columns.splice(fromColumnIndex, 1);
		// 	columns.splice(toColumnIndex, 0, fromColumn);
		// },
		// /* eslint-disable object-curly-newline */
		// DRAGGING_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
		// 	const [taskToMove] = fromTasks.splice(fromTaskIndex, 1);
		// 	toTasks.splice(toTaskIndex, 0, taskToMove);
		// },
		DROP_COLUMN(state, { columns, fromIndexColumn, toIndexColumn }) {
			const column = columns.splice(fromIndexColumn, 1)[0];
			columns.splice(toIndexColumn, 0, column);
		},
		/* eslint-disable object-curly-newline */
		DROP_TASK(state, { fromColumnIndex, fromTaskIndex, toTaskIndex, toTasks }) {
			const fromTasks = state.board.columns[fromColumnIndex].tasks;
			const task = fromTasks.splice(fromTaskIndex, 1)[0];
			toTasks.splice(toTaskIndex, 0, task);
		},
		UPDATE_COLUMN_NAME(state, { indexColumn, name }) {
			state.board.columns[indexColumn].name = name;
		},
	},
	actions: {
		addNewColumn({ commit }, { name }) {
			commit('CREATE_NEW_COLUMN', { name });
		},
		addNewTask({ commit }, { name, tasks }) {
			commit('CREATE_NEW_TASK', { name, tasks });
		},
		// dropColumnAction({ commit }, { columns, fromIndexColumn, toIndexColumn }) {
		// 	commit('DROP_COLUMN', { columns, fromIndexColumn, toIndexColumn });
		// },
		dropTaskAction({ commit }, { fromColumnIndex, fromTaskIndex, toTaskIndex, toTasks }) {
			commit('DROP_TASK', { fromColumnIndex, fromTaskIndex, toTaskIndex, toTasks });
		},
		// firstTask({ commit }, { fromIndexColumn, fromIndexTask, toTasks }) {
		// 	commit('ADD_FIRST_TASK', { fromIndexColumn, fromIndexTask, toTasks });
		// },
		moveColumn({ commit }, { toColumnIndex, fromColumnIndex }) {
			commit('DRAGGING_COLUMN', { toColumnIndex, fromColumnIndex });
		},
		moveTask({ commit }, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
			commit('DRAGGING_TASK', { fromTasks, toTasks, fromTaskIndex, toTaskIndex });
		},
		updateColumnAction({ commit }, { indexColumn, name }) {
			commit('UPDATE_COLUMN_NAME', { indexColumn, name });
		},
	},
	modules: {
	},
	getters: {
		getTask(state) {
			let task = null;
			const { columns } = state.board;
			const colLen = columns.length;
			return (id) => {
				for (let i = 0; i < colLen; i += 1) {
					const currentCol = columns[i];
					const tasksLength = currentCol.tasks.length;
					for (let t = 0; t < tasksLength; t += 1) {
						const currentTask = currentCol.tasks[t];
						if (currentTask.id === id) {
							task = currentTask;
						}
					}
				}
				return task;
			};
		},
	},
});
