import axios from 'axios'

const initialState = () => ({
  numberUnread: 0,
  notifications: []
})
const state = () => ({
  numberUnread: 0,
  notifications: []
})

const getters = {
  numberUnread: state => state.numberUnread,
  notifications: state => state.notifications
}

const actions = {
  async getNumberUnread({ commit }) {
    const response = await this.$axiox.$post(
      '/v1/user/notification/number_unread'
    )
    commit('SET_NUMBER_UNREAD', response.data)
  },
  async getNotifications({ commit }) {
    const response = await this.$axiox.$post('/v1/user/notification/get')
    commit('SET_NOTIFICATION', response.data.data)
    commit('SET_NUMBER_UNREAD', 0)
  }
}

const mutations = {
  SET_NOTIFICATION: function(state, notifications) {
    state.notifications = notifications
  },
  SET_NUMBER_UNREAD: function(state, number) {
    state.numberUnread = number
  },
  ADD_NOTIFICATION: function(state) {
    state.numberUnread += 1
  },
  RESET: function(state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
