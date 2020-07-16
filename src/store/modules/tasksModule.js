import Vue from 'vue';

export default {
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

      commit({ id, task, isDone: false });
    },
  },
};
