import axios from 'axios'
const state = () => ({
  mini: false,
  drawer: true,
  searchResult: [],
  searchHistory: [],
  isSetStorage: false,
  trending: []
})

const getters = {
  mini: state => state.mini,
  drawer: state => state.drawer,
  searchResult: state => state.searchResult,
  searchHistory: state => state.searchHistory,
  isSetStorage: state => state.isSetStorage,
  trending: state => state.trending
}

const actions = {
  setMini({ commit, state }, mini) {
    if (state.mini !== mini) commit('SET_MINI', mini)
  },
  setDrawer({ commit }, drawer) {
    if (state.drawer !== drawer) commit('SET_DRAWER', drawer)
  },
  async search({ commit, state }, payload) {
    const response = await axios.post('/v1/user/search/get', payload)
    const isSearch = state.searchHistory.find(
      search => search === payload.search_key
    )
    if (!isSearch) commit('ADD_SEARCH_HISTORY', payload.search_key)
    commit('SET_SEARCH_RESULT', response.data.data)
  },
  async getSearchHistory({ commit, state }) {
    if (!state.isSetStorage) {
      const response = await axios.post('/v1/user/search/history')
      const _SearchHistory = this.localStorage.getItem('_SearchHistory')
      if (_SearchHistory !== response.data.data) {
        this.localStorage.setItem(
          '_SearchHistory',
          JSON.stringify(response.data.data)
        )
      }
      commit('SET_SEARCH_HISTORY', response.data.data)
      commit('SET_IS_SET_STORAGE', true)
    } else {
      const searchHistory = JSON.parse(
        this.localStorage.getItem('_SearchHistory')
      )
      commit('SET_SEARCH_HISTORY', searchHistory)
    }
  },
  async deleteSearchHistory({ commit }, { key, value }) {
    commit('DELETE_SEARCH_HISTORY', key)
    await axios.delete(`/v1/user/search/${value}/delete`)
  },
  async getTrending({ commit }) {
    const response = await axios.get('/v1/guest/search/trending')
    commit('SET_TRENDING', response.data.data)
  }
}

const mutations = {
  SET_MINI(state, mini) {
    state.mini = mini
  },
  SET_DRAWER(state, drawer) {
    state.drawer = drawer
  },
  SET_SEARCH_RESULT(state, searchResult) {
    state.searchResult = searchResult
  },
  SET_SEARCH_HISTORY(state, searchHistory) {
    state.searchHistory = searchHistory
  },
  SET_IS_SET_STORAGE(state, value) {
    state.isSetStorage = value
  },
  DELETE_SEARCH_HISTORY(state, index) {
    state.searchHistory.splice(index, 1)
  },
  ADD_SEARCH_HISTORY(state, value) {
    state.searchHistory.unshift(value)
  },
  SET_TRENDING(state, trending) {
    state.trending = trending
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
