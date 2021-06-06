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
                    <user-button
                      :profile_photo_path="user.profile_photo_path"
                      :user_name="user.full_name"
                      :user_url="user.url"
                    ></user-button>
                  </div>
                  {{ suggested }}
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
          <perfect-scrollbar ref="messages-card-scrollbar">
            <slide-y-down-transition>
              <div class="messages-card-content" v-if="messages.length">
                <observer @intersec="intersected"></observer>

                <div
                  v-for="message in messages"
                  :key="`message-row-card-${message.id}`"
                >
                  <messages-row
                    :message="message"
                    :isCurrent="true"
                    :isCard="true"
                  ></messages-row>
                </div>
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
import { mapGetters } from 'vuex'
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
      messages: [],
      offset: 0,
      message: {
        content: '',
        file: null,
        fileName: null
      }
    }
  },
  computed: {
    ...mapGetters('thresh', ['room', 'participant']),
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    scrollToBottomElement(element) {
      this.$nextTick(() => {
        element.$el.scrollTop = element.$el.scrollHeight
      })
    },
    async onSendMessage() {
      if (!this.message.content && !this.message.file) return
      this.loading = true
      try {
        var formData = new FormData()
        if (this.message.file) formData.append('file', this.message.file)
        if (this.message.content)
          formData.append('content', this.message.content)
        const url =
          this.room.type == 1
            ? `/v1/user/message/private-chat`
            : `/v1/user/message/chat/${this.room.id}`
        const response = await this.$axios.$post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.messages.push(response.data)
        this.offset += 1
        this.scrollToBottomElement(this.$refs['messages-card-scrollbar'])
      } catch (err) {
        this.toastError(err.toString())
      }
      this.message.content = ''
      this.message.img = null
      this.message.imgName = null
      this.loading = false
    },
    onFileChange(e) {
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
      this.messages = []
      this.offset = 0
    },
    async getMessage(roomId = null, offset = 0, limit = 5, isIntersec = false) {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/message/room/${roomId}?offset=${offset}&limit=${limit}`
        )
        if (data.length) {
          this.messages = [...this.messages, ...data.reverse()]
          this.offset += limit
          if (!isIntersec)
            this.scrollToBottomElement(this.$refs['messages-card-scrollbar'])
        }
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    intersected() {
      this.getMessage(this.room.id, this.offset, 5, true)
    }
  },
  watch: {
    search: debounce(function(value) {
      this.searchList(value)
    }, 500),
    room(value) {
      if (!value) return
      this.getMessage(value.id, this.offset, 15)
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
          bottom: 0;
          right: 0;
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
</style>
