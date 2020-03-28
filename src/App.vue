<template>
  <div id="app">
    <router-link :to="{name: 'home' }">
      <img alt="Vue logo" src="./assets/logo.png" id="logo">
    </router-link>
    <router-view class="view"></router-view>
    <footer v-if="$route.name != 'metrics'">
      <router-link :to="{name: 'metrics' }">
        Call Metrics &#x2B08;
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
body {
  height: 100%;
  background-color: white;
  margin: 0;
}
h3 {
  margin: 40px 0;
}
a {
  color: #07e6ec;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
footer {
  margin: 80px auto 0 auto;
  width: 50%;
  padding: 16px 0;
  background-color: #eff;
  font-size: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 10px;
}
#app #logo {
  width: 170px;
  margin-top: 20px;

}
</style>
