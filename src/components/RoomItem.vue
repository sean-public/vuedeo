<template>
  <div class="roomItem" :id="roomName">
    <router-link class="name" :to="{ name: 'room', params: { roomName } }">
      Room {{ roomName }}
    </router-link>
    {{ participantCount }} participant{{ participantCount > 1 ? 's' : '' }}
    <div class="chartContainer">
      <Chart v-for="[participant, data] of Object.entries(room)" :chartdata="data" :key="participant" :width="800" :height="320" :title="'Participant '+participant"/>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'

export default {
  name: 'roomItem',
  props: ['room', 'roomName'],
  components: {
    Chart
  },
  computed: {
    participantCount: function() {
      return Object.keys(this.$props.room).length;
    },
  }
}
</script>

<style scoped>
.roomItem {
  width: 820px;
  margin: 15px auto 50px auto;
  padding: 15px 0;
  border-radius: 8px;
  background-color: #eef9ff;
}
.name {
  display: block;
  font-size: 1.5em;
  margin: 0;
}
.chartContainer > div {
  margin: 50px 0;
  margin: 25px auto 5px auto;
  width: 800px;
}
</style>
