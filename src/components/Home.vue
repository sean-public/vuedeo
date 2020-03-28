<template>
  <div id="home">
    <h3>Welcome!</h3>
    <v-button @click.native="createRoom" id="createRoomBtn">create new video chat room</v-button>
  </div>
</template>

<script>
import Button from './Button'

import axios from "axios";

const room_url = '/api/room'
const post_options = { timeout: 10000 } // 10 seconds

export default {
  name: 'Home',
  props: {
  },
  components: {
    'v-button': Button
  },
  methods: {
    async createRoom() {
      try {
        var newRoom = await axios.post(room_url, {}, post_options)
      } catch (error) {
        console.error('Problem creating a new room: ', error);
        return;
      }
      this.$router.push({
        name: 'room',
        params: { roomName: newRoom.data.name }
      });
    }
  }
}
</script>

<style scoped>
#createRoomBtn {
  margin-top: 50px;
}
</style>
