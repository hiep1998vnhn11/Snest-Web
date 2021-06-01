<template>
  <div>
    <messages-sidebar-right :isShowSidebar="isShowSidebar" />
    <div class="message-container" ref="messagePageContainer">
      <div v-for="message in messagesList" :key="`message-row-${message.id}`">
        <messages-row
          :message="message"
          :isCurrent="currentUserId === message.user_id"
        ></messages-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { VEmojiPicker } from 'v-emoji-picker'

export default {
  data() {
    return {
      loading: false,
      error: null,
      text: '',
      load: false,
      rightDrawer: true,
      search: '',
      showEmoji: false,
      isShowSidebar: true,
      currentUserId: null,
      messagesList: [
        {
          id: 1,
          user_id: 1,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello'
        },
        {
          id: 2,
          user_id: 1,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello 11'
        },
        {
          id: 6,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello'
        },
        {
          id: 3,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello 11'
        },
        {
          id: 5,
          user_id: 1,

          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello'
        },
        {
          id: 4,
          user_id: 1,

          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello 11'
        }
      ]
    }
  },
  head() {
    return {
      title: this.loading ? 'Loading |' : 'Messages |'
    }
  },
  components: {
    VEmojiPicker
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('message', ['messages', 'thresh']),
    ...mapGetters('app', ['mini', 'drawer']),
    breakPoint() {
      return this.$vuetify.breakpoint.name
    },
    messageReverse() {
      return this.messages.slice().reverse()
    }
  },
  watch: {
    // $route() {
    //   this.loading = true
    //   this.setDefaultMessage()
    //   this.fetchData()
    // }
  },
  mounted() {
    this.currentUserId = this.currentUser.id
    // this.setDefaultMessage()
    // this.fetchData()
  },
  middleware: 'auth',
  methods: {
    ...mapActions('message', ['setDefaultMessage', 'getMessageCard']),
    ...mapActions('thresh', ['getParticipant']),
    selectEmoji(emoji) {
      this.text += emoji.data
    },
    async getParticipant() {
      const url = `/v1/user/thresh/${this.$route.params.room_id}/participant/get`
      const response = await this.$axios.$post(url)
      if (response.data)
        this.$store.commit('message/SET_THRESH', {
          id: this.$route.params.room_id,
          participants: response.data,
          typing: false
        })
    },
    async fetchData() {
      this.loading = true
      try {
        await this.getParticipant()
        await this.getMessageCard()
        this.scrollToBottom()
      } catch (err) {
        this.$nuxt.error(err)
      }
      this.loading = false
    },
    async fetchMessage() {
      this.loading = true
      try {
        await this.getMessageCard()
      } catch (err) {
        this.$nuxt.error(err)
      }
      this.loading = false
    },
    convertInfo() {
      this.$emit('convert-info')
    },
    onFocusTyping() {
      this.socket.emit('typingUser', {
        userId: this.thresh.participants.id,
        userName: this.thresh.participants.name,
        roomId: this.thresh.id,
        isTyping: true
      })
    },
    onBlurTyping() {
      this.socket.emit('typingUser', {
        userId: this.thresh.participants.id,
        userName: this.thresh.participants.name,
        roomId: this.thresh.id,
        isTyping: false
      })
    },
    async onSendMessage() {
      if (this.text) {
        const message = {
          id: Math.random(),
          thresh_id: this.$route.params.room_id,
          user_id: this.currentUser.id,
          content: this.text,
          user: {
            id: this.currentUser.id,
            name: this.currentUser.name
          }
        }
        this.$store.commit('message/SEND_MESSAGE', message)
        this.text = ''
        try {
          const url = `/v1/user/thresh/${this.thresh.id}/message/send`
          const response = await this.$axios.$post(url, {
            content: message.content
          })
          if (this.thresh.participants.id !== this.currentUser.id) {
            this.socket.emit('sendToUser', {
              userId: this.thresh.participants.id,
              roomId: this.$route.params.room_id,
              message: response.data,
              user: this.currentUser
            })
          }
        } catch (err) {
          this.$nuxt.error(err)
        }
        this.load = true
        this.scrollToBottom()
      }
    },
    scrollToBottom() {
      const container = this.$refs['messagePageContainer']
      if (container) container.scrollTop = container.scrollHeight
    },
    intersected() {
      this.fetchMessage()
    },
    newLine() {
      this.text += '//n'
    },
    createNewCall() {
      const call_id = v4()
      this.socket.emit('create-call', {
        call_id,
        user_id: this.thresh.participants.id,
        user: this.currentUser
      })
      this.socket.on('create-call-success', () => {
        this.$route.push(
          this.localePath({
            name: 'call-call_id',
            params: {
              call_id
            }
          })
        )
      })
    },
    createNewPrivateCall() {
      const call_id = uuidv4()
      this.socket.emit('create-call', {
        call_id,
        user_id: this.thresh.participants.id,
        user: this.currentUser
      })
      this.$router.push(
        this.localePath({
          name: 'call-call_id',
          params: { call_id },
          query: {
            video: true,
            type: 'private',
            audio: true
          }
        })
      )
      this.$store.commit('message/SET_CALLING_USER', {
        call_id,
        user: this.thresh.participants
      })
      //call with userId
      //   // if (this.thresh.participants.online_status) const call_id = v4()
      //   this.socket.emit('create-private-call', {
      //     call_id,
      //     user_id: userId
      //   })
      //   this.$router.push(
      //     this.localePath({
      //       name: 'call-call_id',
      //       params: {
      //         call_id
      //       }
      //     })
      //   )
    },
    onClickOutsideWithConditional() {
      this.showEmoji = false
    },
    closeConditional(e) {
      return this.showEmoji
    }
  }
}
</script>

<style lang="scss">
.message-container {
  position: relative;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  flex-direction: column-reverse;
}

.textarea__emoji-picker {
  position: absolute;
  right: 10px;
  bottom: 58px;
}
</style>
