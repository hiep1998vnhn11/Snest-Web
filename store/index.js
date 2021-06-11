const state = () => ({
  unread: 0
})

const getters = {
  unread: state => state.unread
}
const actions = {
  clearAllState({ commit }) {
    commit('post/RESET')
    commit('message/RESET')
    commit('notification/RESET')
    commit('thresh/RESET')
    commit('user/RESET')
  }
}
const mutations = {
  SET_UNREAD: function(state, value) {
    state.unread = value
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
