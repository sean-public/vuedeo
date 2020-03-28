<template>
  <div id="room">
    <h3>Room {{ room_id }}</h3>
    <div id="callContainer" ref="callContainer"></div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  props: {
    room_id: String
  },
  async mounted() {
    const callContainer = this.$refs['callContainer'];
    this.callFrame = window.DailyIframe.createFrame(callContainer);
    this.participants = await this.callFrame.join({
      url: 'https://zpoj.daily.co/'+this.room_id
    });
    setInterval(() => {
      console.log('participants:', this.participants);      
    }, 3000);
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0;
}
a {
  color: #37ded6;
}
#callContainer {
  margin: auto;
  min-width: 640px;
  max-width: 1280px;
  height: 720px;
}
</style>
