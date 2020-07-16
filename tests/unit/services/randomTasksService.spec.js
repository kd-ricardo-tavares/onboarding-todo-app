import randomTasksService from '@/services/randomTasksService';

const json = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json,
  }),
);

describe('randomTasksService', () => {
  describe('getRandomTask', () => {
    it('fetches a random task and returns a promise that resolves a string', async () => {
      const task = 'do something';
      json.mockReturnValueOnce(Promise.resolve({ task }));

      const randomTask = await randomTasksService.getRandomTask();

      expect(randomTask).toEqual(task);
    });

    it('logs an error and returns an error promise it when something foes wrong', async () => {
      const error = 'oops';
      json.mockReturnValueOnce(Promise.reject(error));

      const errorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementationOnce(() => {});

      try {
        await randomTasksService.getRandomTask();
      } catch (e) {
        expect(global.console.error).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledWith(error);

        expect(e).toEqual(error);
      }

      errorSpy.mockRestore();
    });
  });
});
