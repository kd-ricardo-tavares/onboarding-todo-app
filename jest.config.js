module.exports = {
  preset: '@vue/cli-plugin-unit-jest',

  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover the bootstrap file
  ],
};
