import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TaskList from '@/components/TaskList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

let getters;
let store;
let mutations;

beforeEach(() => {
  getters = {
    taskList: () => [
      { id: '1', task: 'task1' },
      { id: '2', task: 'task2' },
    ],
  };

  mutations = {
    DELETE_TASK: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      tasks: {
        namespaced: true,
        getters,
        mutations,
      },
    },
  });
});

describe('TaskList.vue', () => {
  it('renders an item for each of the stored tasks', () => {
    const wrapper = shallowMount(TaskList, { store, localVue });

    expect(wrapper.findAll('.task-list__task')).toHaveLength(
      getters.taskList().length,
    );
  });

  it('renders a delete button for each item', () => {
    const wrapper = shallowMount(TaskList, { store, localVue });

    expect(wrapper.findAll('.task-list__delete-task-btn')).toHaveLength(
      getters.taskList().length,
    );
  });

  it('commits the delete mutation with the task id when its delete button is clicked', () => {
    const wrapper = shallowMount(TaskList, { store, localVue });

    wrapper.find('.task-list__delete-task-btn').trigger('click');

    expect(mutations.DELETE_TASK).toHaveBeenCalledWith(
      expect.anything(),
      getters.taskList()[0].id,
    );
  });
});
