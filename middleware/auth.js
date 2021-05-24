export default function({ store, redirect, app }) {
  // Add the userAgent property to the context
  const isLoggedIn = store.getters['user/isLoggedIn']
  if (!isLoggedIn) return redirect(app.localePath({ name: 'login' }))
}
