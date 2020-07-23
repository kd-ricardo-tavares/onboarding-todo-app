<template>
  <div class="create-task">
    <form @submit.prevent="createTask">
      <input
        v-model="task"
        type="text"
        class="create-task__input"
        placeholder="New task"
      />
      <button
        :disabled="!task"
        type="submit"
        class="app-btn create-task__create-btn"
      >
        Create task
      </button>
    </form>

    <button
      :disabled="isCreatingRandomTask"
      type="button"
      class="app-btn create-task__random-btn"
      @click="createRandomTask"
    >
      Create a random task
    </button>
  </div>
</template>

<script>
export default {
  name: 'CreateTask',

  data() {
    return {
      task: '',
      isCreatingRandomTask: false,
    };
  },

  methods: {
    createTask() {
      if (this.task) {
        this.$store.dispatch('tasks/CREATE_TASK', this.task);

        this.task = '';
      }
    },

    async createRandomTask() {
      try {
        this.isCreatingRandomTask = true;
        await this.$store.dispatch('tasks/CREATE_RANDOM_TASK');
      } catch (e) {
        // show an error
      } finally {
        this.isCreatingRandomTask = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-task__input {
  padding: 10px;
  border: 2px solid #41b883;
  width: 300px;

  &:focus {
    border-color: #35495e;
  }
}

.create-task__create-btn {
  margin-left: 10px;
}

.create-task__random-btn {
  margin-top: 20px;
}
</style>
