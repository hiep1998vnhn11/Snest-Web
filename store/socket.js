import { io } from 'socket.io-client'
const state = () => ({
  socket: null,
  peers: []
})

const getters = {
  peers: state => state.peers,
  socket: state => state.socket
}

const actions = {
  pushPeers({ commit }, { key, value }) {
    commit('PUSH_PEERS', {
      peer_id: key,
      stream: value
    })
  }
}

const mutations = {
  PUSH_PEERS: function(state, { peer_id, stream }) {
    state.peers[peer_id] = stream
  },
  DISCONNECT_PEER: function(state) {
    state.peers = null
  },
  CONNECT_SOCKET: function(state) {
    state.socket = io(process.env.NUXT_ENV_SOCKET_URL)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
