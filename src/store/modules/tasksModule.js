import Vue from 'vue';
import randomTasksService from '../../services/randomTasksService';

export default {
  namespaced: true,

  state: {
    tasks: {},
  },

  getters: {
    taskList: state => Object.values(state.tasks),
  },

  mutations: {
    STORE_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    STORE_TASK(state, task) {
      Vue.set(state.tasks, task.id, task);
    },
    DELETE_TASK(state, taskId) {
      Vue.delete(state.tasks, taskId);
    },
    UPDATE_TASK(state, task) {
      if (state.tasks[task.id]) {
        state.tasks[task.id] = task;
      }
    },
  },

  actions: {
    CREATE_TASK({ commit }, task) {
      const id = String(Date.now() + Math.random());

      commit('STORE_TASK', { id, task, isDone: false });
    },
    async CREATE_RANDOM_TASK({ dispatch }) {
      const task = await randomTasksService.getRandomTask();

      dispatch('CREATE_TASK', task);
    },
  },
};
