<template>
  <div class="message-action">
    <header>
      <div class="navigation">
        <base-button
          round
          icon
          class="btn-fas"
          size="sm"
          @click="onClickAddFile"
        >
          <i class="fas fa-plus-circle"></i>
        </base-button>
        <base-button
          round
          icon
          class="btn-fas"
          size="sm"
          @click="onClickAddImage"
        >
          <i class="tim-icons icon-image-02"></i>
        </base-button>
      </div>
      <div class="message-action__textarea">
        <input
          type="file"
          class="custom-file-input"
          ref="message-input-file"
          @change="onFileChange"
          v-show="false"
        />
        <input
          type="file"
          class="custom-file-input"
          ref="message-input-image"
          @change="onFileChange"
          accept="image/*"
          v-show="false"
        />
        <div class="textarea-container">
          <el-input
            type="textarea"
            autosize
            :placeholder="$t('Post.DisableInput')"
            v-model="message.content"
            @keyup.enter="onSendMessage"
            class="textarea"
          >
          </el-input>
          <slide-y-down-transition>
            <div class="textarea__image" v-if="message.img">
              <div class="image__button">
                <base-button
                  icon
                  type="danger"
                  round
                  size="sm"
                  @click="onRemoveFile"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </div>
              <img ref="message-preview-img" src="" v-show="message.img" />
              <div v-show="message.imgName">
                {{ message.imgName }}
              </div>
            </div>
          </slide-y-down-transition>
        </div>
      </div>
      <div class="left">
        <base-button icon round class="btn-fas" @click="onSendMessage">
          <i class="tim-icons icon-send"></i>
        </base-button>
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isSticky: true,
      message: {
        content: '',
        img: null,
        imgName: null
      }
    }
  },
  methods: {
    onClickAddFile() {
      this.$refs['message-input-file'].click()
    },
    onClickAddImage() {
      this.$refs['message-input-image'].click()
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.message.img = files[0]
      console.log(files[0])
      this.message.imgName = files[0].name
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
      this.message.img = null
      this.message.imgName = null
      this.$refs['message-preview-img'].src = ''
      this.$refs['message-input-image'].value = ''
      this.$refs['message-input-file'].value = ''
    },
    async onSendMessage() {
      if (!this.message.content && !this.message.img) return
      this.loading = true
      try {
        var formData = new FormData()
        if (this.message.img) formData.append('file', this.message.img)
        if (this.message.content)
          formData.append('content', this.message.content)
        const url = this.room.type == 1 ? `/v1/user/message/private-chat` : ''
        const response = await this.$axios.$post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$emit('messageSent', response.data)
        this.offset += 1
      } catch (err) {
        this.toastError(err.toString())
      }
      this.message.content = ''
      this.message.img = null
      this.message.imgName = null
      this.loading = false
    }
  },
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('thresh', ['room', 'participant'])
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.message-action {
  header {
    padding: 0 20px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1112;
    background: whitesmoke;
    border-top: solid 1px rgba(0, 0, 0, 0.1);
    width: 100%;
    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .message-action__textarea {
      flex: 1;
      margin-left: 10px;
      position: relative;
      .textarea-container {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -23px;
        display: flex;
        align-items: flex-end;
        .textarea__image {
          margin-left: 10px;
          position: relative;
          max-width: 200px;
          word-wrap: break-word;
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
    &.is-sticky {
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
    }
    .left {
      margin-right: 15px;
      margin-left: 15px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
