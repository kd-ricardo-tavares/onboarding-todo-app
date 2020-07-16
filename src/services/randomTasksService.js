export default {
  async getRandomTask() {
    try {
      const result = await (
        await fetch(`${process.env.VUE_APP_API_BASE_URL}/randomTask`)
      ).json();

      return result.task;
    } catch (error) {
      console.error(error);

      return Promise.reject(error);
    }
  },
};
