import Vue from 'vue';
import Vuex from 'vuex';
import dataBoard from '@/serverless/dataBoard';
import { saveStatePlugin } from '@/shared/utils';

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || dataBoard;

export default new Vuex.Store({
	plugins: [saveStatePlugin],
	state: {
		board,
	},
	mutations: {
	},
	actions: {
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
