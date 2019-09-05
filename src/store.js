import Vuex from 'vuex';
import Vue from 'vue';

import trello from './services/Trello';

Vue.use(Vuex);

const state = {
  loading: false,
  tasks: [],
};

const mutations = {
  'SET_LOADING': (state, loading) => {
    state.loading = loading;
  },
  'SET_TASKS': (state, tasks) => {
    state.tasks = tasks;
  },
};

const actions = {
  async getTasks({ commit }) {
    commit('SET_LOADING', true);
    const tasks = await trello.getClientTasks();
    commit('SET_TASKS', tasks);
    commit('SET_LOADING', false);
  },
};

export default new Vuex.Store({ state, mutations, actions });
