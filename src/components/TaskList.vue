<template>
  <div class="task-list">
    <div v-for="task in taskList" :key="task.id" class="task-list__task">
      {{ task.task }}
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
};
</script>

<style></style>
