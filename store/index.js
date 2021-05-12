export const actions = {
  clearAllState({ commit }) {
    commit('post/RESET')
    commit('message/RESET')
    commit('notification/RESET')
    commit('thresh/RESET')
    commit('user/RESET')
  }
}
