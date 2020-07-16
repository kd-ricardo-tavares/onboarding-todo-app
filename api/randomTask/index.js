/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

const tasks = [
  'Clean the kitchen',
  'Buy light bulbs',
  'Charge the camera batteries',
  'Take the parrot to the vet',
  'Clean the living room',
  'Take out the trash',
  'Write more tasks',
  'Have fun',
];

module.exports = async function(context) {
  context.res = {
    // return a random task
    body: {
      task: tasks[Math.floor(Math.random() * tasks.length)],
    },
  };
};
