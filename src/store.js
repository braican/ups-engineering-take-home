import Vuex from 'vuex';
import Vue from 'vue';

import trello from './services/Trello';

Vue.use(Vuex);

const state = {
  loading: false,
  tasks: [],
};

const getters = {
  completedTasks: state => state.tasks.filter(task => task.completed),
  incompleteTasks: state => state.tasks.filter(task => !task.completed),
};

const mutations = {
  'SET_LOADING': (state, loading) => {
    state.loading = loading;
  },
  'SET_TASKS': (state, tasks) => {
    state.tasks = tasks;
  },
  'COMPLETE_TASK': (state, taskId) => {
    const updatedTasks = state.tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }

      return task;
    });

    state.tasks = updatedTasks;
  },
  'UNCOMPLETE_TASK': (state, taskId) => {
    const updatedTasks = state.tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: false };
      }

      return task;
    });

    state.tasks = updatedTasks;
  },
};

const actions = {
  async getTasks({ commit }) {
    commit('SET_LOADING', true);
    const tasks = await trello.getClientTasks();
    commit('SET_TASKS', tasks);
    commit('SET_LOADING', false);
  },

  async completeTask({ commit }, task) {
    commit('COMPLETE_TASK', task);
  },

  async uncompleteTask({ commit }, task) {
    commit('UNCOMPLETE_TASK', task);
  },
};

export default new Vuex.Store({ state, getters, mutations, actions });
