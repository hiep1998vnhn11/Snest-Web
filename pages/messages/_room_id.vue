<template>
  <div>
    <messages-sidebar-right :isShowSidebar="isShowSidebar" />
    <messages-action @messageSent="onMessageSent"></messages-action>
    <div class="message-container" ref="messagePageContainer">
      <zoom-center-transition>
        <div class="message__loading-container" v-if="loading">
          <loading-chasing :loading="true"></loading-chasing>
        </div>
      </zoom-center-transition>

      <perfect-scrollbar ref="message-layout-scroll">
        <div v-for="message in messages" :key="`message-row-${message.id}`">
          <messages-row
            :message="message"
            :isCurrent="currentUser.id === message.user_id"
          ></messages-row>
        </div>
        <observer @intersect="intersected"></observer>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { VEmojiPicker } from 'v-emoji-picker'

export default {
  async fetch({ error, store, params }) {
    try {
      await store.dispatch('thresh/getRoom', params.room_id)
    } catch (err) {
      error(err)
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      offset: 0,
      limit: 5,
      text: '',
      load: false,
      rightDrawer: true,
      search: '',
      showEmoji: false,
      isShowSidebar: true,
      currentUserId: null,
      messages: []
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
    ...mapGetters('thresh', ['room', 'participant']),
    ...mapGetters('app', ['mini', 'drawer']),
    breakPoint() {
      return this.$vuetify.breakpoint.name
    },
    messageReverse() {
      return this.messages.slice().reverse()
    }
  },
  middleware: 'auth',
  methods: {
    scrollBottom() {
      this.$refs['message-layout-scroll'].$el.scrollTop = this.$refs[
        'message-layout-scroll'
      ].$el.scrollHeight
    },
    selectEmoji(emoji) {
      this.text += emoji.data
    },
    async fetchMessage(type = 1, roomId = null, offset = 0, limit = 5) {
      if (!roomId) return
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/message/room/${roomId}?offset=${offset}&limit=${limit}`
        )
        if (data.length) {
          this.offset = offset + limit
          if (offset == 0) this.messages = data
          else {
            this.messages = [...this.messages, ...data]
          }
        }
      } catch (err) {
        this.toastError(err.toString())
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
    async intersected() {
      await this.fetchMessage(
        this.room.type,
        this.room.id,
        this.offset,
        this.limit
      )
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
    },
    onMessageSent(message) {
      this.messages.push(message)
      this.offset += 1
      this.scrollBottom()
    }
  },
  async mounted() {
    await this.fetchMessage(this.room.type, this.room.id, 0, this.limit)
    this.scrollBottom()
  }
}
</script>

<style lang="scss">
.message-container {
  position: relative;
  bottom: 0;
  width: 100%;
  .message__loading-container {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50px;
    border-radius: 9999px;
    left: 50%;
    transform: translateX(-50%);
    background: whitesmoke;
    box-shadow: 3px 5px 5px 5px rgba(1, 1, 1, 0.05);
  }
  .ps {
    height: calc(100vh - 140px);
    padding: 5px;
    width: 100%;
    // display: flex;
    // flex-direction: column-reverse;
  }
}

.textarea__emoji-picker {
  position: absolute;
  right: 10px;
  bottom: 58px;
}
</style>
