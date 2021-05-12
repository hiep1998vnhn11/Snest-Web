import { io } from 'socket.io-client'

const socketService = {
  connectSocket(store) {
    window.socket = io(process.env.NUXT_ENV_SOCKET_URL)
    window.socket.emit('login', store.getters['user/currentUser'].id)
    // window.socket.emit('join', {
    //   userId: store.getters['user/currentUser'].id,
    //   roomId: 1
    // })

    window.socket.on('typing', ({ roomId, isTyping }) => {
      if (
        store.getters['message/thresh'] &&
        Number(store.getters['message/thresh'].id) === Number(roomId)
      ) {
        store.commit('message/TYPING_USER', isTyping)
      }
    })

    // An user had requested a friend request
    // window.socket.on('responseAddFriend', data => {
    //   store.commit('notification/ADD_NOTIFICATION', data, {
    //     root: true
    //   })
    // })

    window.socket.on('people-cancel-call', call_id => {
      if (
        store.getters['message/calling'] &&
        store.getters['message/calling'].call_id === call_id
      ) {
        store.commit('message/SET_CALLING_STATUS', 'canceled')
      }
    })

    // An user had accepted a friend request
    window.socket.on('acceptFriendNotification', data => {
      console.log(data)
    })

    window.socket.on('people-calling', calling => {
      store.commit('message/SET_CALLING_USER', calling)
      store.commit('message/SET_CALLING_STATUS', 'calling')
    })

    // An user had logged in
    window.socket.on('userLoggedIn', userId => {
      store.commit('user/USER_LOGGED_IN', userId, {
        root: true
      })
    })

    // An user had logged out
    window.socket.on('userLoggedOut', userId => {
      store.commit('user/USER_LOGGED_OUT', userId, {
        root: true
      })
    })
  }
}

export default socketService
