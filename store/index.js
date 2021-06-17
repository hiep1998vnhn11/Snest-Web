const state = () => ({
  unread: 0,
  image: null
})

const getters = {
  unread: state => state.unread,
  image: state => state.image
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
  },
  SET_IMAGE: function(state, image) {
    state.image = image
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
