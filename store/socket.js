const state = () => ({
  peers: []
})

const getters = {
  peers: state => state.peers
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
