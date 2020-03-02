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
});
