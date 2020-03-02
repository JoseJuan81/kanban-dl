import Vue from 'vue';
import Vuex from 'vuex';
import dataBoard from '@/serverless/dataBoard';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: dataBoard,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
