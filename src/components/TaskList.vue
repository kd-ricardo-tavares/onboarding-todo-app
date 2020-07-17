<template>
  <div class="task-list">
    <div v-for="task in taskList" :key="task.id" class="task-list__task">
      <div class="task-list__task-description">
        {{ task.task }}
      </div>

      <button
        class="app-btn task-list__delete-task-btn app-btn--small"
        @click="deleteTask(task.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskList',

  computed: {
    ...mapGetters('tasks', ['taskList']),
  },

  methods: {
    deleteTask(taskId) {
      this.$store.commit('tasks/DELETE_TASK', taskId);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  text-align: left;
  width: 700px;
  margin: 0 auto;
  margin-top: 10px;
}

.task-list__task {
  padding: 10px;
  display: flex;
  align-content: center;
  align-items: center;

  &:hover {
    background-color: #afe3cc;
  }
}

.task-list__task-description {
  flex: 1;
}
</style>
