<template>
  <div>
    <card>
      <slide-y-up-transition>
        <div v-show="loadingAvatar">
          <loading-chasing :loading="true"></loading-chasing>
        </div>
      </slide-y-up-transition>
      <h5 slot="header" class="title">
        {{ $t('EditUserAvatar') }}
      </h5>
      <div>
        {{ $t('SelectImageToChangeYourAvatar') }}
        <div class="photo-container">
          <input
            type="file"
            accept="image/*"
            ref="image-upload-input"
            hidden
            @change="onFileChange"
          />
          <div class="photo-cover" @click="onClickUploadCover">
            <img
              ref="image"
              class="profile-photo"
              v-lazy="currentUser.profile_photo_path"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <slide-y-down-transition>
                  <button
                    class="btn btn-neutral btn-block"
                    v-on:click="onRemoveImage"
                    v-show="img"
                  >
                    {{ $t('ReverseImage') }}
                  </button>
                </slide-y-down-transition>
              </div>
              <div class="col-6">
                <button
                  class="btn btn-success btn-block"
                  v-on:click="changeAvatar"
                  :disabled="!img"
                >
                  {{ $t('SaveImage') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      rotation: 0,
      scale: 1,
      preview: false,
      img: null,
      hasFile: false,
      loadingAvatar: false,
      loadingCover: false
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createPreviewImage(files[0])
    },
    createPreviewImage(image) {
      this.img = image
      const vm = this
      var reader = new FileReader()
      reader.onload = e => (vm.$refs['image'].src = e.target.result)
      reader.readAsDataURL(image)
    },
    onRemoveImage() {
      this.img = null
      this.$refs['image'].src = this.currentUser.profile_photo_path
    },
    async changeAvatar() {
      if (!this.img) return
      this.loadingAvatar = true
      try {
        var formData = new FormData()
        formData.append('image', this.img)
        const { data } = await this.$axios.$post(
          '/v1/user/upload_avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json'
            }
          }
        )
        this.$router.go(this.$router.currentRoute)
      } catch (error) {
        this.toastError(error.toString())
      }
      this.img = null
      this.loadingAvatar = false
      this.preview = false
      this.hasFile = false
    },
    onClickUploadCover() {
      this.$refs['image-upload-input'].click()
    }
  },
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.photo-container {
  position: relative;
  padding: 10px;
  .photo-cover {
    padding: 5px;
    border-radius: 50%;
    border: solid 1px rgba(1, 1, 1, 0.08);
    cursor: pointer;
    width: 200px;
    height: 200px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .profile-photo {
      border-radius: 50%;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
