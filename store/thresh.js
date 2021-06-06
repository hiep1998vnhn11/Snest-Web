const initialState = () => ({
  threshes: [],
  room: null,
  page: 1,
  participant: null
})
const state = () => ({
  threshes: [],
  page: 1,
  room: null,
  participant: null
})

const getters = {
  threshes: state => state.threshes,
  room: state => state.room,
  participant: state => state.participant
}

const actions = {
  async getThreshes({ commit, state }) {
    const url = '/v1/user/thresh/store'
    let params = {
      params: {
        page: state.page
      }
    }
    const response = await this.$axios.$get(url, params)
    if (response.data.data.length) {
      commit('SET_THRESHES', response.data.data)
    }
  },
  setThreshPage({ commit }) {
    commit('SET_THRESH_PAGE')
  },
  async getParticipant({ commit }, roomId) {
    let url = `/v1/user/thresh/${roomId}/participant/get`
    const response = await this.$axios.$post(url)
    commit('SET_PARTICIPANT', response.data)
  },
  async getRoom({ commit }, roomId) {
    const { data } = await this.$axios.$get(
      `/v1/user/message/room/${roomId}/get-type`
    )
    commit('SET_ROOM', data)
  },
  async getRoomByUrl({ commit }, url) {
    const { data } = await this.$axios.$get(`/v1/user/message/user/${url}`)
    commit('SET_ROOM_BY_URL', data)
  }
}

const mutations = {
  SET_THRESHES: function(state, threshes) {
    state.page += 1
    state.threshes = [...state.threshes, ...threshes]
  },
  SET_ROOM: function(state, data) {
    state.room = data.room
    state.participant = data.participant
  },
  SET_THRESH_PAGE: function(state) {
    state.page = 1
    state.threshes = []
  },
  SET_PARTICIPANT: function(state, participant) {
    state.participant = participant
  },
  RECEIVED_MESSAGE: function(state, payload) {
    const messageObject = Object.assign(payload.message, {
      user: { id: payload.message.user_id, name: payload.userName }
    })
    state.threshes.forEach(thresh => {
      if (thresh.id === Number(payload.message.thresh_id)) {
        thresh.last_message = messageObject
      }
    })
  },
  SEND_MESSAGE: function(state, message) {
    state.threshes.forEach(thresh => {
      if (thresh.id === Number(message.thresh_id)) {
        thresh.last_message = message
      }
    })
  },
  SET_ROOM_BY_URL: function(state, data) {
    state.room = data.room
    state.participant = data.participant
  },
  REMOVE_ROOM: function(state) {
    state.room = null
    state.participant = null
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
