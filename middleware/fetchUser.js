import socketService from '@/services/socket'
export default async function(context) {
  if (
    context.store.getters['user/isLoggedIn'] &&
    !context.store.getters['user/currentUser']
  ) {
    await context.store.dispatch('user/getUser')
  }
}
