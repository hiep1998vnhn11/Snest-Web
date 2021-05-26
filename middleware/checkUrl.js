export default function({ store, params, app }) {
  if (params.url !== store.getters['user/currentUser'].url) {
    return redirect(app.localePath({ name: 'index' }))
  }
}
