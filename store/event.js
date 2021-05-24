const state = () => ({
  dialog: false,
  dialogType: null
})

const getters = {
  dialog: state => state.dialog,
  dialogType: state => state.dialogType
}

const actions = {
  changeDialog({ commit, state }, type) {
    console.log(type)
    commit('SET_DIALOG')
    commit('SET_DIALOG_TYPE', type)
  },
  closeDialog({ commit, state }) {
    if (!state.dialogType) commit('CLOSE_DIALOG')
  },
  removeDialogType({ commit }) {
    commit('REMOVE_DIALOG_TYPE')
  }
}

const mutations = {
  SET_DIALOG(state) {
    state.dialog = true
  },
  SET_DIALOG_TYPE(state, type) {
    state.dialogType = type
  },
  CLOSE_DIALOG(state) {
    state.dialog = false
  },
  REMOVE_DIALOG_TYPE(state) {
    state.dialogType = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
