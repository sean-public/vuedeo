<template>
  <div id="metrics">
    <h3>Metrics (most recent on top)</h3>
    <div id="metricsContainer" ref="metricsContainer">
      <RoomList :metrics-data="metricsData"/>
    </div>
  </div>
</template>

<script>
import RoomList from './RoomList';
import axios from "axios";

const metrics_url = '/api/metrics'
const get_options = { timeout: 10000 } // 10 seconds

export default {
  name: 'Metrics',
  components: {
    RoomList
  },
  data() {
    return {
      metricsData: {}
    }
  },

  async mounted() {
    try {
      this.metricsData = (await axios.get(metrics_url, get_options)).data
    } catch (error) {
      const metricsContainer = this.$refs['metricsContainer'];
      metricsContainer.innerHTML = 'Problem getting metrics: ' + error;
    }
  }
}
</script>

<style scoped>

</style>
