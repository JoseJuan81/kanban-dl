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
		CREATE_NEW_TASK(state, { name, tasks }) {
			const newTask = {
				description: '',
				id: uuid(),
				name,
				userAssigned: null,
			};
			tasks.push(newTask);
		},
	},
	actions: {
		addNewTask({ commit }, { name, tasks }) {
			commit('CREATE_NEW_TASK', { name, tasks });
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
