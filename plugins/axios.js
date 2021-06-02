export default function({ $axios, store, app }) {
  $axios.onRequest(config => {
    const token = store.state['user/token'] || app.$cookies.get('access_token')
    if (token) config.headers.common['Authorization'] = `Bearer ${token}`
  })
}
