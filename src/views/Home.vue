<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="home__vue-logo" />
    <h1>Task List</h1>

    <create-task />
    <task-list />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
import CreateTask from '@/components/CreateTask.vue';

export default {
  name: 'Home',
  components: {
    TaskList,
    CreateTask,
  },
};
</script>

<style lang="scss" scoped>
.home__vue-logo {
  height: 100px;
}
</style>
