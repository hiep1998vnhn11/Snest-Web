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
        <div class="row text-center">
          <div class="col-12">
            <div class="row">
              <div class="col-md-6">
                <vue-avatar
                  :width="150"
                  :height="150"
                  :rotation="rotation"
                  :borderRadius="999"
                  :scale="scale"
                  ref="vueavatar"
                  @vue-avatar-editor:image-ready="onImageReady"
                >
                </vue-avatar>
              </div>
              <div class="col-md-6">
                <slide-y-down-transition>
                  <img ref="image" class="profile-photo" v-show="preview" />
                </slide-y-down-transition>
              </div>
            </div>
            <br />
            <label>
              Zoom : {{ scale }}x
              <br />
              <input type="range" min="1" max="3" step="0.02" v-model="scale" />
            </label>
            <br />
            <label>
              {{ $t('Rotation') }} : {{ rotation }}°
              <br />
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                v-model="rotation"
              />
            </label>
            <br />
            <div class="row">
              <div class="col-6">
                <button
                  class="btn btn-success"
                  v-on:click="saveClicked"
                  :disabled="!hasFile"
                >
                  {{ $t('PreviewImage') }}
                </button>
              </div>
              <div class="col-6">
                <button
                  class="btn btn-success"
                  v-on:click="changeAvatar"
                  :disabled="!preview"
                >
                  {{ $t('SaveImage') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card>
    <card>
      <h5 slot="header" class="title">
        {{ $t('EditUserCoverPhoto') }}
      </h5>
    </card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { VueAvatar } from 'vue-avatar-editor-improved'

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
  components: {
    VueAvatar
  },
  methods: {
    saveClicked() {
      this.img = this.$refs.vueavatar.getImageScaled()
      this.$refs.image.src = this.img.toDataURL()
      this.preview = true
    },
    onImageReady() {
      this.scale = 1
      this.rotation = 0
      this.hasFile = true
      this.preview = false
    },
    changeAvatar() {
      const vm = this
      this.img.toBlob(async function(blob) {
        console.log(blob)
        vm.loadingAvatar = true
        try {
          var formData = new FormData()
          formData.append('image', blob)
          await vm.$axios.$post('/v1/user/upload_avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json'
            }
          })
          vm.img = null
          vm.$emit('changed-avatar')
        } catch (error) {
          vm.toastError(error.toString())
        }
        vm.img = null
        vm.loadingAvatar = false
        vm.preview = false
        vm.hasFile = false
      })
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
.profile-photo {
  border: solid 1px rgba(1, 1, 1, 0.08);
  border-radius: 999px;
  width: 150px;
  height: 150px;
}
</style>
