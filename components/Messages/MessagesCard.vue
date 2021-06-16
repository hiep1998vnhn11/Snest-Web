<template>
  <div>
    <div class="messages-card-container">
      <zoom-center-transition :duration="200" mode="out-in">
        <div class="messages-card new" v-if="showNew">
          <div class="messages-card-title">
            <h5 class="title">
              {{ $t('Search for new Message') }}
            </h5>
            <base-button
              class="btn-danger"
              icon
              size="sm"
              round
              @click="showNew = !showNew"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </div>
          <div class="messages-card-footer new">
            {{ $t('To:') }}
            <div class="messages-card-textarea-container">
              <base-input v-model="search"> </base-input>
            </div>
          </div>
          <perfect-scrollbar>
            <div class="messages-card-content">
              <loading-chasing :loading="loadingNew"></loading-chasing>
              <slide-y-down-transition>
                <div v-if="suggested.length">
                  <span>
                    {{ $t('YourAreFollowing') }}
                  </span>
                  <div
                    v-for="user in suggested"
                    :key="`suggested-user-${user.id}`"
                  >
                    <button
                      class="btn btn-user btn-block btn-neutral"
                      @click="onOpenMessage(user.url)"
                    >
                      <base-avatar
                        :src="user.profile_photo_path"
                        outlined
                        :size="35"
                      ></base-avatar>
                      <div class="btn-user-name">
                        <div>
                          {{ user.full_name }}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div v-else-if="notHaveNew && !loading">
                  {{ $t('NotFoundAnyPeople') }}
                </div>
              </slide-y-down-transition>
            </div>
          </perfect-scrollbar>
        </div>
      </zoom-center-transition>

      <zoom-center-transition :duration="200" mode="out-in">
        <div class="messages-card" v-if="room">
          <div class="messages-card-title">
            <div class="title">
              <base-avatar
                :src="participant.profile_photo_path"
                outlined
                alt="avatar"
                status
                :online="participant.online_status.status"
              >
              </base-avatar>
              <div class="name ml-2">
                {{ participant.full_name }}
                <div class="time" v-if="participant.online_status.status">
                  {{ $t('Active') }}
                </div>
                <div class="time" v-else>
                  {{ $t('Actived') }}
                  {{ participant.online_status.time | offlineTime }}
                </div>
              </div>
            </div>
            <div>
              <router-link
                :to="
                  localePath({
                    name: 'messages-room_id',
                    params: {
                      room_id: room.id
                    }
                  })
                "
              >
                <base-button class="btn-primary" icon size="sm" round>
                  <i class="tim-icons icon-bullet-list-67"></i>
                </base-button>
              </router-link>
              <base-button
                class="btn-success"
                size="sm"
                icon
                round
                @click="showCard = !showCard"
              >
                <i class="fas fa-phone"></i>
              </base-button>
              <base-button
                class="btn-danger"
                icon
                size="sm"
                round
                @click="onCloseMessage"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </div>
          </div>
          <perfect-scrollbar
            ref="messages-card-scrollbar"
            id="messages-card-scrollbar"
            @ps-y-reach-start="onScrollTop"
          >
            <slide-y-down-transition>
              <div class="message-card-loading-container" v-if="loading">
                <loading-chasing :loading="true"></loading-chasing>
              </div>
            </slide-y-down-transition>

            <slide-y-down-transition>
              <div class="messages-card-content" v-if="messages.length">
                <!-- <observer @intersect="intersected"></observer> -->
                <transition-group name="list-complete" tag="p">
                  <div
                    v-for="message in messages"
                    :key="`message-row-card-${message.id}`"
                    class="list-complete-item"
                  >
                    <messages-row
                      :message="message"
                      :isCurrent="message.user_id === currentUser.id"
                      :isCard="true"
                      @selectMessage="onSelectMessage"
                    ></messages-row>
                  </div>
                </transition-group>
              </div>
              <div v-else>
                Not have
              </div>
            </slide-y-down-transition>
          </perfect-scrollbar>

          <div class="messages-card-footer">
            <base-button
              class="btn-primary"
              icon
              size="sm"
              round
              @click="onClickAddFile"
            >
              <i class="tim-icons icon-cloud-upload-94"></i>
            </base-button>
            <div class="messages-card-textarea-container">
              <div class="messages-card-textarea-container__absolute">
                <input
                  type="file"
                  class="custom-file-input"
                  ref="message-input-file"
                  @change="onFileChange"
                  v-show="false"
                />
                <el-input
                  type="textarea"
                  autosize
                  :placeholder="$t('TypeSomething...')"
                  v-model="message.content"
                  @keyup.enter="onSendMessage"
                  class="textarea"
                >
                </el-input>
              </div>
              <slide-y-up-transition>
                <div class="messages-card-img__absolute" v-show="message.file">
                  <span>
                    {{ message.fileName }}
                  </span>
                  <img ref="message-preview-img" src="" />
                  <base-button
                    size="sm"
                    icon
                    round
                    class="image__button"
                    @click="onRemoveFile"
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </div>
              </slide-y-up-transition>
            </div>
            <slide-y-down-transition>
              <base-button
                size="sm"
                icon
                round
                class="btn-info"
                @click="onSendMessage"
                v-show="message.content || message.file"
              >
                <i class="fas fa-paper-plane"></i>
              </base-button>
            </slide-y-down-transition>
          </div>
          <slide-y-down-transition>
            <div class="message--dialog" v-if="selectedMessage">
              <button
                class="btn btn-neutral btn-round btn-icon"
                v-if="deleting"
                @click="onRemoveMessage"
              >
                <i class="tim-icons icon-check-2"></i>
              </button>
              <button
                class="btn btn-danger btn-round btn-icon"
                @click="deleting = !deleting"
              >
                <i
                  class="tim-icons"
                  :class="{
                    'icon-trash-simple': !deleting,
                    'icon-simple-remove': deleting
                  }"
                ></i>
              </button>
            </div>
          </slide-y-down-transition>
        </div>
      </zoom-center-transition>
    </div>
    <base-button
      class="btn-facebook"
      icon
      round
      id="messages-button-create"
      @click="showNew = !showNew"
    >
      <i class="fas fa-edit"></i>
    </base-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      showNew: false,
      loadingNew: false,
      showCard: false,
      notHaveNew: false,
      list: [],
      search: '',
      suggested: [],
      loading: false,
      offset: 0,
      message: {
        content: '',
        file: null,
        fileName: null
      },
      fetching: false,
      selectedMessage: null,
      deleting: false
    }
  },
  computed: {
    ...mapGetters('thresh', ['room', 'participant', 'messages']),
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    ...mapActions('thresh', [
      'getRoomByUrl',
      'getMessages',
      'sendMessage',
      'removeMessage'
    ]),
    scrollToBottomElement(element) {
      this.$nextTick(() => {
        element.$el.scrollTop = element.$el.scrollHeight
      })
    },
    async onSendMessage() {
      if (!this.message.content && !this.message.file) return
      this.loading = true
      try {
        const message = await this.sendMessage(this.message)
        this.sendMessageSocket(message)
      } catch (err) {
        this.toastError(err.toString())
      }
      this.message.content = ''
      this.onRemoveFile()
      this.loading = false
    },
    onRemoveMessage() {
      if (this.selectedMessage.user_id !== this.currentUser.id) return
      this.removeMessage(this.selectedMessage.id)
      this.selectedMessage = null
      this.deleting = false
    },
    onFileChange(e) {
      this.$refs['message-preview-img'].src = ''
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.message.file = files[0]
      this.message.fileName = files[0].name
      if (this.checkImage(files[0].type)) this.createPreviewImage(files[0])
    },
    checkImage(type) {
      if (type.split('/')[0] === 'image') return true
      return false
    },
    createPreviewImage(image) {
      const vm = this
      var reader = new FileReader()
      reader.onload = e =>
        (vm.$refs['message-preview-img'].src = e.target.result)
      reader.readAsDataURL(image)
    },
    onRemoveFile() {
      this.message.file = null
      this.message.fileName = null
      this.$refs['message-preview-img'].src = ''
      this.$refs['message-input-file'].value = ''
    },
    onClickAddFile() {
      this.$refs['message-input-file'].click()
    },
    async searchList(value) {
      this.loadingNew = true
      this.notHaveNew = false
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/follow?search_key=${value}`
        )
        this.suggested = data.data
        if (!data.data.length) this.notHaveNew = true
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loadingNew = false
    },
    onCloseMessage() {
      this.$store.commit('thresh/REMOVE_ROOM')
    },
    sendMessageSocket(message) {
      if (
        this.participant.id === this.currentUser.id ||
        typeof window.socket === 'undefined' ||
        window.socket.disconnected
      )
        return
      window.socket.emit('sendToUser', {
        userId: this.participant.id,
        url: this.currentUser.url,
        message: message
      })
    },
    async getMessage() {
      this.loading = true
      const messageEl = this.$refs['messages-card-scrollbar']
      let scrollHeight = 0
      if (messageEl) {
        scrollHeight = messageEl.$el.scrollHeight
      }
      try {
        await this.getMessages()
        if (messageEl && scrollHeight)
          this.$nextTick(() => {
            messageEl.$el.scrollTop = messageEl.$el.scrollHeight - scrollHeight
          })
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    intersected() {
      this.getMessage(this.room.id, this.offset, 5, true)
    },
    async onOpenMessage(url) {
      this.loadingNew = true
      try {
        await this.getRoomByUrl(url)
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loadingNew = false
    },
    onScrollTop: debounce(function() {
      if (this.loading || this.fetching) return
      console.log('reach top')
      this.getMessage(this.room.id, this.offset, 5, true)
    }, 450),
    async firstTime() {
      this.fetching = true
      await this.getMessage()
      await new Promise(resolve => setTimeout(resolve, 500))
      this.$nextTick(() => {
        this.$refs['messages-card-scrollbar'].$el.scrollTop = this.$refs[
          'messages-card-scrollbar'
        ].$el.scrollHeight
      })
      this.fetching = false
    },
    onSelectMessage(messageId) {
      if (this.selectedMessage === messageId) this.selectedMessage = null
      else this.selectedMessage = messageId
    }
  },
  mounted() {
    if (typeof window.socket !== 'undefined' && window.socket.connected) {
      window.socket.on('receivedMessage', context => console.log(context))
    }
  },

  watch: {
    search: debounce(function(value) {
      this.searchList(value)
    }, 500),
    room(value) {
      if (!value) return
      this.firstTime(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.messages-card-container {
  position: fixed;
  z-index: 1040;
  display: flex;
  bottom: 20px;
  right: 60px;
  height: 500px;

  .messages-card {
    width: 330px;
    height: 500px;
    margin-right: 10px;
    position: relative;
    border: 1px solid;
    border-color: rgba(1, 1, 1, 0.1);
    border-radius: 10px;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.5s ease-in-out;
    background: #fff;
    & > .ps {
      height: 400px;
      margin-top: 50px;
    }
    &.new {
      & > .ps {
        height: 400px;
        margin-top: 100px;
      }
    }
    &:hover {
      transition: 0.5s ease-in-out;
      transform: translateY(-10px);
    }

    .message--dialog {
      position: absolute;
      top: 70px;
      left: 50%;
      padding-left: 20px;
      padding-right: 20px;
      transform: translateX(-50%);
      border: solid 1px rgba(0, 0, 0, 0.1);
      background: whitesmoke;
      border-radius: 10px;
    }

    .messages-card-title {
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 5px 10px 5px;
      width: 100%;
      border-bottom: solid 1px rgba(1, 1, 1, 0.1);
      z-index: 1050;
      .title {
        display: flex;
        font-weight: bold;
        .time {
          font-weight: 100;
          font-size: 0.8rem;
        }
      }
    }

    .messages-card-content {
      padding: 5px 5px 5px 5px;
    }

    .messages-card-footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      left: 0px;
      height: 50px;
      display: flex;
      padding: 5px 10px 5px;
      justify-content: flex-end;
      border-top: solid 1px rgba(0, 0, 0, 0.1);
      &.new {
        bottom: auto;
        top: 50px;
        border: none;
      }
      .messages-card-textarea-container {
        position: relative;
        flex: 1;
        margin-left: 5px;
        margin-right: 5px;
        .messages-card-textarea-container__absolute {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
        }

        .messages-card-img__absolute {
          position: absolute;
          max-width: 200px;
          word-wrap: break-word;
          top: -10px;
          transform: translateY(-100%);
          right: 0;
          background: white;
          border-radius: 3px;
          border: solid 1px rgba(1, 1, 1, 0.08);
          text-align: center;
          padding: 3px;
          img {
            width: 200px;
            border: solid 1px rgba(0, 0, 0, 0.08);
            cursor: pointer;
          }
          .image__button {
            position: absolute;
            top: 5px;
            right: 5px;
            transition: opacity ease-in-out 0.5s;
            opacity: 0;
          }

          &:hover {
            .image__button {
              opacity: 1;
              transition: opacity ease-in-out 0.5s;
            }
          }
        }
      }
    }
  }

  .messages-search {
  }
}

#messages-button-create {
  position: fixed;
  z-index: 1040;
  bottom: 20px;
  right: 20px;
}

.message-card-loading-container {
  border-radius: 9999px;
  border: solid 1px rgba(0, 0, 0, 0.08);
  background: whitesmoke;
  position: absolute;
  width: 70px;
  height: 70px;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
}
</style>
