import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TaskList from '@/components/TaskList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

let getters;
let store;

beforeEach(() => {
  getters = {
    taskList: () => [
      { id: '1', task: 'task1' },
      { id: '2', task: 'task2' },
    ],
  };

  store = new Vuex.Store({
    modules: {
      tasks: {
        namespaced: true,
        getters,
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
});
