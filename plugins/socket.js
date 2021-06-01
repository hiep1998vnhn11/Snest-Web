import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import { io } from 'socket.io-client'

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io(process.env.NUXT_ENV_SOCKET_URL)
  })
)
