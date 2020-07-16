<template>
  <form class="create-task" @submit.prevent="createTask">
    <input
      v-model="task"
      type="text"
      class="create-task__input"
      placeholder="New task"
    />
    <button :disabled="!task" type="text" class="create-task__create-btn">
      Create task
    </button>
  </form>
</template>

<script>
export default {
  name: 'CreateTask',

  data() {
    return {
      task: '',
    };
  },

  methods: {
    createTask() {
      if (this.task) {
        this.$store.dispatch('tasks/CREATE_TASK', this.task);

        this.task = '';
      }
    },
  },
};
</script>

<style lang="scss">
.create-task__input {
  padding: 10px;
  border: 2px solid #41b883;
  width: 300px;

  &:focus {
    border-color: #35495E;
  }
}

.create-task__create-btn {
  background-color: #fff;
  color: #35495E;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;

  border: 2px solid #35495E;

  margin-left: 10px;

  &:hover {
    background-color: #35495E;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
