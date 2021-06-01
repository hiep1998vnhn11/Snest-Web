import { io } from 'socket.io-client'

const socketService = {
  connectSocket(store) {
    this.socket = io(process.env.NUXT_ENV_SOCKET_URL)
    this.socket.emit('login', store.getters['user/currentUser'].id)
    // this.socket.emit('join', {
    //   userId: store.getters['user/currentUser'].id,
    //   roomId: 1
    // })

    this.socket.on('typing', ({ roomId, isTyping }) => {
      if (
        store.getters['message/thresh'] &&
        Number(store.getters['message/thresh'].id) === Number(roomId)
      ) {
        store.commit('message/TYPING_USER', isTyping)
      }
    })

    // An user had requested a friend request
    // this.socket.on('responseAddFriend', data => {
    //   store.commit('notification/ADD_NOTIFICATION', data, {
    //     root: true
    //   })
    // })

    this.socket.on('people-cancel-call', call_id => {
      if (
        store.getters['message/calling'] &&
        store.getters['message/calling'].call_id === call_id
      ) {
        store.commit('message/SET_CALLING_STATUS', 'canceled')
      }
    })

    // An user had accepted a friend request
    this.socket.on('acceptFriendNotification', data => {
      console.log(data)
    })

    this.socket.on('people-calling', calling => {
      store.commit('message/SET_CALLING_USER', calling)
      store.commit('message/SET_CALLING_STATUS', 'calling')
    })

    // An user had logged in
    this.socket.on('userLoggedIn', userId => {
      store.commit('user/USER_LOGGED_IN', userId, {
        root: true
      })
    })

    // An user had logged out
    this.socket.on('userLoggedOut', userId => {
      store.commit('user/USER_LOGGED_OUT', userId, {
        root: true
      })
    })
  }
}

export default socketService
