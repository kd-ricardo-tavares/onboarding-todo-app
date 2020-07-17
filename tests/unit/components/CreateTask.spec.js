import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CreateTask from '@/components/CreateTask.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

let getters;
let store;
let actions;

beforeEach(() => {
  getters = {
    taskList: () => [
      { id: '1', task: 'task1' },
      { id: '2', task: 'task2' },
    ],
  };

  actions = {
    CREATE_TASK: jest.fn(),
    CREATE_RANDOM_TASK: jest.fn(() => Promise.resolve()),
  };

  store = new Vuex.Store({
    modules: {
      tasks: {
        namespaced: true,
        getters,
        actions,
      },
    },
  });
});

describe('TaskList.vue', () => {
  it('renders an input to type in the task and a button to create it', () => {
    const wrapper = shallowMount(CreateTask, { store, localVue });

    expect(wrapper.find('.create-task__input')).toBeTruthy();
    expect(wrapper.find('.create-task__create-btn')).toBeTruthy();
  });

  it('dispatches the create task action when the form is submitted and there is text in the input', () => {
    const wrapper = shallowMount(CreateTask, { store, localVue });

    const task = 'task';

    wrapper.find('.create-task__input').setValue(task);

    wrapper.find('form').trigger('submit.prevent');

    expect(actions.CREATE_TASK).toHaveBeenCalledWith(expect.anything(), task);
  });

  it('does nothing when the form is submitted and there is no text in the input', () => {
    const wrapper = shallowMount(CreateTask, { store, localVue });

    wrapper.find('form').trigger('submit.prevent');

    expect(actions.CREATE_TASK).not.toHaveBeenCalled();
  });

  it('disables the create button when there is no text in the input', () => {
    const wrapper = shallowMount(CreateTask, { store, localVue });

    expect(wrapper.find('.create-task__create-btn').element).toBeDisabled();
  });

  it('dispatches the create random task action when the random button is clicked', () => {
    const wrapper = shallowMount(CreateTask, { store, localVue });

    wrapper.find('.create-task__random-btn').trigger('click');

    expect(actions.CREATE_RANDOM_TASK).toHaveBeenCalledTimes(1);
  });

  it('disables the random button when there is already a task being fetched', async () => {
    const wrapper = shallowMount(CreateTask, { store, localVue });

    await wrapper.setData({ isCreatingRandomTask: true });

    expect(wrapper.find('.create-task__random-btn').element).toBeDisabled();
  });
});
