<template>
  <div id="room">
    <h3>{{ $route.params.roomName }}</h3>
    other people can join at this same URL
    <div id="callContainer" ref="callContainer"></div>
  </div>
</template>

<script>
import axios from "axios";

const metrics_interval_ms = 15000
const metrics_url = '/api/metrics'
const post_options = { timeout: 10000 } // 10 seconds

export default {
  name: 'Room',
  props: {
    href: window.location.href
  },
  async mounted() {
    const callContainer = this.$refs['callContainer'];
    this.callFrame = window.DailyIframe.createFrame(callContainer);
    this.participants = await this.callFrame.join({
      url: 'https://zpoj.daily.co/' + this.$route.params.roomName
    });

    // Every 15s, try submitting the current call metrics
    setInterval(async () => {
      try {
        var netStats = await this.callFrame.getNetworkStats();
      } catch {
        // We couldn't generate network stats, probably not in a call
        // TODO: check meetingState() before trying to get stats
        return
      }
      if (netStats.stats.latest.timestamp) {
        try {
          netStats.stats.latest['roomName'] = this.$route.params.roomName;
          netStats.stats.latest['participant'] = this.participants.local.user_id;
          await axios.post(metrics_url, netStats.stats.latest, post_options);
        } catch (error) {
          console.error('Problem sending metrics:', error);
        }
      }
    }, metrics_interval_ms);
  }
}
</script>

<style scoped>
h3 {
  margin-bottom: 4px;
}
#callContainer {
  margin: 12px auto;
  min-width: 640px;
  max-width: 1080px;
  height: 680px;
}
</style>
