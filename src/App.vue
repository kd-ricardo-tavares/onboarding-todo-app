<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-btn {
  background-color: #fff;
  color: #35495e;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;

  border: 2px solid #35495e;

  &:hover {
    background-color: #35495e;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.app-btn--small {
  padding: 5px;
}
</style>
