export default function(context) {
  const { store, params, app, redirect } = context
  if (params.url !== store.getters['user/currentUser'].url) {
    app.$notify({
      message: 'Permission Denied',
      timeout: 1500,
      icon: 'tim-icons icon-bell-55',
      horizontalAlign: 'right',
      verticalAlign: 'top',
      type: 'danger'
    })
    return redirect(
      app.localePath({
        name: 'index-user-url',
        params: {
          url: params.url
        }
      })
    )
  }
}
