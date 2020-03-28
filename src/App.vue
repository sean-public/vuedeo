<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width=170>
    <Room room_id="test-call"/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from './components/Room.vue'

Vue.use(VueRouter)

export default {
  name: 'app',
  components: {
    Room
  }
}
</script>

<style>
body {
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
