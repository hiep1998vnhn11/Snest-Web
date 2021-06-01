import axios from 'axios'
import { fetchFeedPost } from '@/api'
const initialState = () => ({
  posts: [],
  tab: 'home-tab',
  paramPost: null,
  userPost: [],
  userPostPage: 1,
  feedPage: 1
})

const state = () => ({
  posts: [],
  tab: 'home-tab',
  paramPost: null,
  userPost: [],
  userPostPage: 1,
  feedPage: 1
})

const getters = {
  posts: state => state.posts,
  paramPost: state => state.paramPost,
  tab: state => state.tab,
  userPost: state => state.userPost
}

const actions = {
  async getPost({ commit, state }) {
    const url = '/v1/user/post/store'
    let params = {
      params: {
        type: 'feed',
        page: state.feedPage,
        limit: 5
      }
    }
    const postResponse = await axios.get(url, params)
    if (postResponse.data.data.data.length) {
      commit('SET_POST', postResponse.data.data.data)
    }
  },
  setFeedPage({ commit }) {
    commit('SET_FEED_PAGE')
  },
  async getParamPost({ commit }, postId) {
    const paramPostResponse = await axios.get(`/v1/user/post/${postId}/get`)
    commit('SET_PARAM_POST', paramPostResponse.data.data)
  },
  async createPost({ commit }, post) {
    const response = await axios.post(`v1/user/post/create`, post, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    commit('CREATE_POST', response.data.data)
  },
  async deletePost({ commit }, postId) {
    const url = `/v1/user/post/${postId}/delete`
    await axios.post(url)
    commit('SET_PARAM_POST', null)
    commit('DELETE_POST', postId)
  },
  async updatePost({ commit }, payload) {
    // payload: { post_id: int, post: formData}
    commit('DELETE_POST', payload.post_id)
    const response = await axios.post(`v1/user/post/${payload.post_id}/update`)
    commit('CREATE_POST', response.data.data)
  },
  async getUserPost({ commit, state, rootState }, payload) {
    const url = rootState['user/currentUser']
      ? '/v1/user/post/store'
      : '/v1/guest/post/store'
    const userPostResponse = await axios.get(url, {
      params: {
        user_url: payload.user_url,
        page: state.userPostPage,
        limit: 2
      }
    })
    if (userPostResponse.data.data.data.length) {
      commit('SET_USER_POST', userPostResponse.data.data.data)
    }
  },
  async createUserPost({ commit }, post) {
    const response = await axios.post(`v1/user/post/create`, post)
    commit('CREATE_POST', response.data.data)
  },
  setPage({ commit }) {
    commit('SET_PAGE')
  }
}

const mutations = {
  SET_POST: function(state, posts) {
    state.feedPage = state.feedPage + 1
    state.posts = [...state.posts, ...posts]
  },
  SET_FEED_PAGE: function(state) {
    state.feedPage = 1
    state.posts = []
  },
  SET_PARAM_POST: function(state, post) {
    state.paramPost = post
  },
  DELETE_POST: function(state, postId) {
    state.posts = state.posts.filter(post => post.id !== postId)
  },
  CREATE_POST: function(state, post) {
    state.posts.unshift(post)
  },
  SET_USER_POST: function(state, posts) {
    state.userPostPage = state.userPostPage + 1
    state.userPost = [...state.userPost, ...posts]
  },
  CREATE_USER_POST: function(state, post) {
    state.userPost.unshift(post)
  },
  SET_PAGE: function(state) {
    state.userPostPage = 1
    state.userPost = []
  },
  LIKE_POST: function(state, { status, index, post, user }) {
    if (state.posts[index].like_status) {
      const likeStatus = state.posts[index].like_status.status
      state.posts[index].like_status.status = likeStatus === status ? 0 : status
      if (likeStatus === 0 && state.posts[index].like_status.status !== 0) {
        state.posts[index].liked_count += 1
      } else if (
        likeStatus !== 0 &&
        state.posts[index].like_status.status === 0
      ) {
        state.posts[index].liked_count -= 1
      }
    } else {
      state.posts[index].like_status = {
        status
      }
      if (status > 0) {
        state.posts[index].liked_count += 1
        window.socket.emit('likePost', {
          user,
          post: state.posts[index]
        })
      }
    }
  },
  LIKE_USER_POST: function(state, { status, index, post, user }) {
    if (state.userPost[index].like_status) {
      const likeStatus = state.userPost[index].like_status.status
      state.userPost[index].like_status.status =
        likeStatus === status ? 0 : status
      if (likeStatus === 0 && state.userPost[index].like_status.status !== 0) {
        state.userPost[index].liked_count += 1
      } else if (
        likeStatus !== 0 &&
        state.userPost[index].like_status.status === 0
      ) {
        state.userPost[index].liked_count -= 1
      }
    } else {
      state.userPost[index].like_status = {
        status
      }
      if (status > 0) {
        state.userPost[index].liked_count += 1
        window.socket.emit('likePost', {
          user,
          post: state.userPost[index]
        })
      }
    }
  },
  UNLIKE_POST: function(state, indexPost) {
    state.posts[indexPost].isLiked = false
    state.posts[indexPost].likes_count -= 1
  },
  COMMENTED_POST: function(state, indexPost) {
    state.posts[indexPost].comments_count += 1
  },
  COMMENTED_USER_POST: function(state, indexPost) {
    state.userPost[indexPost].comments_count += 1
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
