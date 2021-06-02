export default async function({ app, store, $axios }) {
  const access_token =
    store.state['user/token'] || app.$cookies.get('access_token')
  if (access_token && !store.getters['user/currentUser']) {
    try {
      store.commit('user/SET_ACCESS_TOKEN', access_token)
      await store.dispatch('user/getUser', access_token)
    } catch (err) {
      app.$cookies.remove('access_token')
    }
  }
}
