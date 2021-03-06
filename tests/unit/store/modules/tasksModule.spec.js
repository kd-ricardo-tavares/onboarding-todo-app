import tasksModule from '@/store/modules/tasksModule';
import randomTasksService from '@/services/randomTasksService';

jest.mock('@/services/randomTasksService', () => ({
  __esModule: true,
  default: { getRandomTask: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('tasksModule', () => {
  describe('state', () => {
    it('contains a tasks property initialized with an empty object', () => {
      expect(tasksModule.state.tasks).toEqual({});
    });
  });

  describe('getters', () => {
    describe('taskList', () => {
      it('returns the list of stored tasks', () => {
        const task1 = { id: '1594903261702.2197', task: 'task1' };
        const task2 = { id: '1594903261703.2197', task: 'task2' };

        const state = {
          tasks: {
            [task1.id]: task1,
            [task2.id]: task2,
          },
        };

        expect(tasksModule.getters.taskList(state)).toEqual([task1, task2]);
      });
    });
  });

  describe('mutations', () => {
    describe('STORE_TASKS', () => {
      it('it stores a given list of tasks in the state', () => {
        const state = {
          tasks: [],
        };

        const tasks = {
          1: { id: 1, task: 'task1' },
          2: { id: 2, task: 'task2' },
          3: { id: 3, task: 'task3' },
        };

        tasksModule.mutations.STORE_TASKS(state, tasks);

        expect(state.tasks).toEqual(tasks);
      });
    });

    describe('STORE_TASK', () => {
      it('it stores a given task in the state', () => {
        const state = {
          tasks: {},
        };

        const task = { id: '1594903261702.2197', task: 'task1' };

        tasksModule.mutations.STORE_TASK(state, task);

        expect(state.tasks).toEqual({ [task.id]: task });
      });
    });

    describe('DELETE_TASK', () => {
      it('it removes a task from the state using the given id', () => {
        const task1 = { id: '1594903261702.2197', task: 'task1' };
        const task2 = { id: '1594903261703.2197', task: 'task2' };

        const state = {
          tasks: {
            [task1.id]: task1,
            [task2.id]: task2,
          },
        };

        tasksModule.mutations.DELETE_TASK(state, task1.id);

        expect(state.tasks).toEqual({ [task2.id]: task2 });
      });
    });

    describe('UPDATE_TASK', () => {
      it('it updates a stored task', () => {
        const task1 = { id: '1594903261702.2197', task: 'task1' };
        const task2 = { id: '1594903261703.2197', task: 'task2' };

        const updatedTask1 = {
          id: '1594903261702.2197',
          task: 'task1',
          isDone: true,
        };

        const state = {
          tasks: {
            [task1.id]: task1,
            [task2.id]: task2,
          },
        };

        tasksModule.mutations.UPDATE_TASK(state, updatedTask1);

        expect(state.tasks).toEqual({
          [task1.id]: updatedTask1,
          [task2.id]: task2,
        });
      });

      it('does nothing if the passed task does not exist in the store', () => {
        const task1 = { id: '1594903261702.2197', task: 'task1' };
        const task2 = { id: '1594903261703.2197', task: 'task2' };

        const updatedTask = {
          id: '123',
          task: 'task1',
          isDone: true,
        };

        const state = {
          tasks: {
            [task1.id]: task1,
            [task2.id]: task2,
          },
        };

        tasksModule.mutations.UPDATE_TASK(state, updatedTask);

        expect(state.tasks).toEqual({
          [task1.id]: task1,
          [task2.id]: task2,
        });
      });
    });
  });

  describe('actions', () => {
    describe('CREATE_TASK', () => {
      it('stores a new task with a random id', () => {
        const commit = jest.fn();
        const task = 'task';

        tasksModule.actions.CREATE_TASK({ commit }, task);
        tasksModule.actions.CREATE_TASK({ commit }, task);

        expect(commit).toHaveBeenCalledTimes(2);

        // expect the ids to be different
        expect(commit.mock.calls[0][1].id).not.toEqual(
          commit.mock.calls[1][1].id,
        );
      });
    });

    describe('CREATE_RANDOM_TASK', () => {
      it('fetches a random task and dispatches the create task action with the result', async () => {
        const dispatch = jest.fn();
        const task = 'task';
        const randomTask = 'random task';

        randomTasksService.getRandomTask.mockReturnValueOnce(
          Promise.resolve(randomTask),
        );

        await tasksModule.actions.CREATE_RANDOM_TASK({ dispatch }, task);

        expect(randomTasksService.getRandomTask).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith('CREATE_TASK', randomTask);
      });
    });
  });
});
