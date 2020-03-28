<template>
  <div id="roomList">
    <roomItem
      v-for="[roomName, room] of Object.entries(metricsData).reverse()"
      :key="roomName"
      :room="room"
      :roomName="roomName"
    />
  </div>
</template>

<script>
import RoomItem from './RoomItem'

export default {
  name: 'RoomList',
  props: ['metricsData'],
  components: {
    RoomItem
  }
}
</script>

<style scoped>
</style>
