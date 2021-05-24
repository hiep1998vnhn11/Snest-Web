import axios from 'axios'
import moment from 'moment'

const initialState = () => ({
  rooms: [],
  messages: [],
  pageMessage: 1,
  thresh: null,
  messageCards: [],
  calling: null,
  callingStatus: null
})
const state = () => ({
  rooms: [],
  messages: [],
  pageMessage: 1,
  thresh: null,
  messageCards: [],
  calling: null,
  callingStatus: null
})

const getters = {
  rooms: state => state.rooms,
  messages: state => state.messages,
  messageCards: state => state.messageCards,
  thresh: state => state.thresh,
  calling: state => state.calling,
  callingStatus: state => state.callingStatus
}
const actions = {
  //Get thresh by userId
  async getThreshByUser({ commit, state }, user) {
    const response = await axios.post(`/v1/user/thresh/${user.id}/get`)
    if (response.data.data) {
      const thresh = Object.assign(response.data.data, {
        participants: user,
        typing: false
      })
      commit('SET_THRESH', thresh)
    } else {
      commit('SET_THRESH', {
        participants: user,
        typing: false
      })
    }
  },
  async getMessageCard({ commit, state }) {
    if (state.thresh.id) {
      const response = await axios.get(
        `/v1/user/thresh/${state.thresh.id}/message/get`,
        {
          params: {
            page: state.pageMessage,
            limit: 10
          }
        }
      )
      const messages = response.data.data.data
      if (messages && messages.length) {
        commit('SET_MESSAGE', response.data.data.data)
      }
    }
  },
  async getRoom({ commit }) {
    const url = '/v1/user/room/store'
    const response = await axios.get(url)
    commit('SET_ROOM', response.data.data)
  },
  async getMessage({ commit, state }, roomId) {
    const url = `/v1/user/thresh/${roomId}/message/get`
    const response = await axios.get(url, {
      params: {
        page: state.pageMessage,
        limit: 25
      }
    })
    const messages = response.data.data.data
    if (messages && messages.length) {
      commit('SET_MESSAGE', messages)
    }
  },
  async sendMessage({ commit }, message) {
    const url = `/v1/user/thresh/${message.thresh_id}/message/send`
    commit('SEND_MESSAGE', message)
    commit('thresh/SEND_MESSAGE', message, { root: true })
    await axios.post(url, {
      content: message.content
    })
  },
  newMessage({ commit, state }, payload) {
    if (payload.type === 'new') {
      commit('PUSH_NEW_MESSAGE_CARD')
    } else {
      commit('PUSH_USER_MESSAGE_CARD', payload.room)
    }
  },
  closeMessageCard({ commit }, index) {
    commit('CLOSE_MESSAGE_CARD', index)
  },
  setDefaultMessage({ commit }) {
    commit('SET_DEFAULT_MESSAGE')
  },
  setMessagePage({ commit }) {
    commit('SET_PAGE_MESSAGE')
  },
  async setThreshCard({ commit }, user) {
    if (user) {
      const response = await axios.post(`/v1/user/thresh/${user.id}/get`)
      if (response.data.data) {
        commit('SET_THRESH_CARD', {
          room: response.data.data,
          participants: user
        })
      } else {
        commit('SET_THRESH_CARD', {
          room: {
            user_with: user
          },
          participants: user
        })
      }
    } else {
      commit('SET_THRESH_CARD', null)
    }
  },
  async deleteMessage({ commit }, { messageId, messageIndex }) {
    commit('DELETE_MESSAGE', messageIndex)
    await axios.delete(`/v1/user/thresh/message/${messageId}/delete`)
  },
  async reverseMessage({ commit }, { messageId, messageIndex }) {
    commit('REVERSE_MESSAGE', messageIndex)
    await axios.patch(`/v1/user/thresh/message/${messageId}/reverse`)
  }
}
const mutations = {
  SET_ROOM: function(state, rooms) {
    state.rooms = rooms
  },
  SET_MESSAGE: function(state, messages) {
    state.messages = [...state.messages, ...messages]
    state.pageMessage = state.pageMessage + 1
  },
  SET_PAGE_MESSAGE: function(state) {
    state.pageMessage = 1
    state.messages = []
  },
  SEND_MESSAGE: function(state, message) {
    state.messages.unshift(message)
  },
  PUSH_NEW_MESSAGE_CARD: function(state) {
    if (state.messageCards.length === 3) {
      state.messageCards.pop()
    }
    state.messageCards.unshift('new')
  },
  PUSH_USER_MESSAGE_CARD: function(state, room) {
    // console.log(card)
    const card = { type: 'room', room: room }
    // if (state.messageCards.find(card)) return
    if (state.messageCards.length === 3) {
      state.messageCards.pop()
    }
    state.messageCards.unshift(card)
  },
  CLOSE_MESSAGE_CARD: function(state, index) {
    state.messageCards.splice(index, 1)
  },
  SET_DEFAULT_MESSAGE: function(state) {
    state.messages = []
    state.pageMessage = 1
  },
  DELETE_MESSAGE(state, messageIndex) {
    state.messages[
      state.messages.length - messageIndex - 1
    ].deleted_at = moment.utc().format()
  },
  REVERSE_MESSAGE(state, messageIndex) {
    state.messages[state.messages.length - messageIndex - 1].deleted_at = null
  },
  /*
    When user received an message on socket server,
    params:
      message:  Object {id, content, thresh_id, user_id}
  */
  RECEIVED_MESSAGE: function(state, message) {
    state.messages.unshift(message)
  },
  SET_THRESH: function(state, thresh) {
    state.thresh = thresh
  },
  RESET: function(state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },
  TYPING_USER: function(state, isTyping) {
    state.thresh.typing = isTyping
  },
  SET_CALLING_USER: function(state, calling) {
    state.calling = calling
  },
  SET_CALLING_STATUS: function(state, status) {
    state.callingStatus = status
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
