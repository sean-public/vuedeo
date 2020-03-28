import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

import App from './App.vue'
import Home from './components/Home.vue'
import Room from './components/Room.vue'
import Metrics from './components/Metrics.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home, name: "home"},
    { path: '/room/:roomName', component: Room , name: "room"},
    { path: '/metrics', component: Metrics , name: "metrics"}
  ]
});

new Vue({ el: '#app', router, render: h => h(App) })
