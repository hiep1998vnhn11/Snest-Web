import axios from 'axios'
import Cookies from 'js-cookie'
const initialState = () => ({
  currentUser: null,
  token: Cookies.get('access_token') || null,
  socket: null,
  setHeader() {
    axios.defaults.headers.common['Authorization'] =
      'Bearer' + Cookies.get('access_token')
  },
  friends: []
})
const state = () => ({
  currentUser: null,
  token: Cookies.get('access_token') || null,
  socket: null,
  setHeader() {
    axios.defaults.headers.common['Authorization'] =
      'Bearer' + Cookies.get('access_token')
  },
  friends: [],
  user: {}
})

const getters = {
  currentUser: state => state.currentUser,
  socket: state => state.socket,
  friends: state => state.friends,
  isLoggedIn: state => !!state.token,
  user: state => state.user
}

const actions = {
  async login({ commit, state }, user) {
    const response = await axios.post('/auth/login', {
      email: user.email,
      password: user.password
    })
    const token = response.data.access_token
    Cookies.set('access_token', token, { expires: 1 })
    commit('SET_ACCESS_TOKEN', token)
  },

  async fetchUserParam({ commit, state }, userUrl) {
    const url = state.token ? '/v1/user/get_user' : '/v1/guest/user/get'
    const { data } = await axios.get(url, {
      params: {
        user_url: userUrl
      }
    })
    commit('SET_PARAM_USER', data.data)
  },

  async loginFacebook({ commit, state }, access_token) {
    const response = await axios.post('/auth/facebook/login', {
      access_token
    })
    const token = response.data.access_token
    Cookies.set('access_token', token, { expires: 1 })
    commit('SET_ACCESS_TOKEN', token)
    state.setHeader()
    const responseUser = await axios.post('/auth/me')
    commit('SET_CURRENT_USER', responseUser.data.data)
  },
  async loginGoogle({ commit, state }, id_token) {
    const response = await axios.post('/auth/google/login', {
      id_token
    })
    const token = response.data.access_token
    Cookies.set('access_token', token, {
      expires: response.data.expires_in / (60 * 60 * 24)
    })
    commit('SET_ACCESS_TOKEN', token)
    state.setHeader()
    const responseUser = await axios.post('/auth/me')
    commit('SET_CURRENT_USER', responseUser.data.data)
  },

  async getUser({ commit, state }) {
    state.setHeader()
    try {
      const response = await axios.post('/auth/me')
      commit('SET_CURRENT_USER', response.data.data)
    } catch (err) {
      Cookies.remove('access_token')
      commit('DESTROY_TOKEN')
    }
  },
  async logout({ commit }) {
    // if (FB && typeof (FB !== undefined))
    //   FB.getLoginStatus(async response => {
    //     if (response.status === 'connected') {
    //       await FB.logout()
    //     }
    //   })
    await axios.post('/auth/logout')
    Cookies.remove('access_token')
    commit('DESTROY_TOKEN')
  },
  async register({}, user) {
    await axios.post('/auth/register', user)
  },
  async changeInfo(context, payload) {
    const url = '/v1/user/update_profile'
    const response = await axios.post(url, payload)
    return response.data
  },
  async getFriend(context) {
    const url = '/v1/user/relationship/friend/store?status=1'
    const response = await axios.get(url)
    context.commit('SET_FRIENDS', response.data.data)
  },
  async refreshToken({ commit, state }) {
    state.setHeader()
    const url = '/auth/token/refresh'
    const response = await axios.post(url)
    const token = response.data.access_token
    Cookies.set('access_token', token, { expires: 1 })
    commit('SET_ACCESS_TOKEN', token)
  }
}

const mutations = {
  SET_CURRENT_USER: function(state, user) {
    state.currentUser = user
  },
  SET_ACCESS_TOKEN: function(state, token) {
    state.token = token
  },
  DESTROY_TOKEN: function(state) {
    state.token = null
    state.currentUser = null
    state.friends = []
  },
  SET_FRIENDS: function(state, friends) {
    state.friends = friends
  },
  USER_LOGGED_IN: function(state, userId) {
    state.friends.forEach(friend => {
      if (friend.friend_id === userId) {
        friend.user_friend.online_status.status = true
      }
    })
  },
  USER_LOGGED_OUT: function(state, userId) {
    state.friends.forEach(friend => {
      if (friend.friend_id === userId) {
        friend.user_friend.online_status.status = false
      }
    })
  },
  SET_STORY: function(state, story) {
    state.user.info.story = story
  },
  SET_PARAM_USER: function(state, user) {
    state.user = user
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
