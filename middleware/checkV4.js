import { validate as validateV4 } from 'uuid'
export default function({ store, route, redirect, app }) {
  // Add the userAgent property to the context
  if (!validateV4(route.params.call_id) || !store.getters['message/calling']) {
    return redirect(app.localePath({ name: 'index' }))
  }
}
