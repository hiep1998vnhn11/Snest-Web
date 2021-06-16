const initialState = () => ({
  rooms: [],
  room: null,
  page: 1,
  participant: null
})
const state = () => ({
  rooms: [],
  page: 1,
  room: null,
  participant: null,
  offset: 0,
  messages: [],
  messageOffset: 0
})

const getters = {
  threshes: state => state.threshes,
  room: state => state.room,
  rooms: state => state.rooms,
  participant: state => state.participant,
  messages: state => state.messages
}

const actions = {
  async getRooms({ commit, state }, searchKey = null) {
    let url = `/v1/user/room?limit=10&offset=${state.offset}`
    if (searchKey) url += `&search_key=${searchKey}`
    const response = await this.$axios.$get(url)
    if (response.data.length) {
      commit('SET_ROOMS', response.data)
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
  },
  async onReceivedMessage({ commit, state }, { message, user }) {
    if (message.room_id !== state.room.id) {
      const { data } = await this.$axios.$get(
        `/v1/user/message/user/${user.url}`
      )
      commit('SET_ROOM_BY_URL', data)
    }
  },

  async getMessages({ commit, state }) {
    if (!state.room.id) return
    const { data } = await this.$axios.$get(
      `/v1/user/message/room/${state.room.id}?offset=${state.messageOffset}&limit=5}`
    )
    if (!data.length) return
    commit('SET_MESSAGES', data)
  },

  async sendMessage({ commit, state }, { file, content }) {
    if (!file && !content) return
    const formData = new FormData()
    if (file) formData.append('file', file)
    if (content) formData.append('content', content)
    const url =
      state.room.type === 1
        ? `/v1/user/message/private-chat`
        : `/v1/user/message/chat/${state.room.id}`
    const response = await this.$axios.$post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.data) commit('SEND_MESSAGE', response.data)
    return response.data
  },

  async removeMessage({ commit }, messageId) {
    commit('REMOVE_MESSAGE', messageId)
    // await this.$axios.$post(`/v1/user/message/${messageId}`, {
    //   _method: 'delete'
    // })
  }
}

const mutations = {
  SET_ROOMS: function(state, rooms) {
    state.offset += 10
    state.rooms = [...state.rooms, ...rooms]
  },
  SET_ROOM: function(state, data) {
    state.room = data.room
    state.participant = data.participant
    state.messages = []
    state.messageOffset = 0
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
    state.messages.push(messageObject)
    state.offset = state.offset + 1
  },
  SEND_MESSAGE: function(state, message) {
    state.messages.push(message)
    state.offset = state.offset + 1
  },
  SET_MESSAGES: function(state, messages) {
    messages.forEach(message => state.messages.unshift(message))
    state.messageOffset = state.messageOffset + messages.length
  },
  SET_ROOM_BY_URL: function(state, data) {
    state.room = data.room
    state.participant = data.participant
  },
  REMOVE_ROOM: function(state) {
    state.room = null
    state.participant = null
    state.messages = []
    state.messageOffset = 0
  },
  REMOVE_MESSAGE: function(state, messageId) {
    state.messages = state.messages.filter(message => message.id !== messageId)
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
