<template>
  <div style="position: relative">
    <loading-chasing :loading="loading"></loading-chasing>
    <card class="post-create">
      <div class="flex">
        <base-avatar
          :src="currentUser.profile_photo_path"
          alt="Avatar"
          outlined
          :size="50"
        ></base-avatar>
        <div class="post-create-title">
          <input
            type="file"
            class="custom-file-input"
            ref="create-post-input-image"
            accept="image/*"
            multiple
            @change="onFileChange"
            v-show="false"
          />
          <el-input
            type="textarea"
            autosize
            :placeholder="$t('Post.DisableInput')"
            v-model="post.content"
          >
          </el-input>
        </div>
      </div>
      <SlideYDownTransition>
        <div class="row mx-3" v-if="imageSrc">
          <div
            class="mt-3 create-post-preview-image"
            :class="{
              'col-12':
                imageSrc.length % 2 == 1 && index == imageSrc.length - 1,
              'col-6': imageSrc.length % 2 == 0 || index < imageSrc.length
            }"
            v-for="(src, index) in imageSrc"
            :key="`image-preview-${index}`"
          >
            <img :src="src" alt="Loading..." />
            <div class="create-post-image-remove-button">
              <base-button
                type="primary"
                @click="onRemoveImage(index)"
                round
                size="sm"
              >
                <i class="tim-icons icon-trash-simple"></i>
              </base-button>
            </div>
          </div>
        </div>
      </SlideYDownTransition>
      <hr class="my-2" />
      <div class="row">
        <div class="col-6">
          <base-button
            type="success"
            block
            @click="onClickAddImage"
            :disabled="loading"
          >
            <i class="fas fa-images"></i>
            {{ $t('Post.AddImage') }}
          </base-button>
        </div>
        <div class="col-6">
          <base-button type="warning" block @click="onPost" :disabled="loading">
            <i class="fas fa-mail-bulk"></i>
            {{ $t('Post.Create') }}
          </base-button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { SlideYDownTransition } from 'vue2-transitions'

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      dialog: false,
      post: {
        content: '',
        images: [],
        privacy: 'public'
      },
      imageSrc: [],
      inputImage: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    onClickAddImage() {
      this.$refs['create-post-input-image'].click()
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createPreviewImage(files)
    },
    createPreviewImage(files) {
      const vm = this
      files.forEach(function(image) {
        vm.post.images.push(image)
        console.log(vm.post.images)
        var reader = new FileReader()
        reader.onload = e => {
          vm.imageSrc.push(e.target.result)
        }
        reader.readAsDataURL(image)
      })
    },
    onRemoveImage(index) {
      if (this.post.images[index] && this.imageSrc[index]) {
        this.post.images.splice(index, 1)
        this.imageSrc.splice(index, 1)
      }
    },

    async onPost() {
      if (!this.post.content && !this.post.images.length) return
      this.loading = true
      try {
        var formData = new FormData()
        if (this.post.images.length) {
          this.post.images.forEach(function(image) {
            formData.append('files[]', image)
          })
        }
        if (this.post.content) formData.append('content', this.post.content)
        formData.append('privacy', this.post.privacy)
        const response = await this.$axios.$post(
          `v1/user/post/create`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        this.$emit('created', response.data)
      } catch (err) {
        this.toastError(err.toString())
      }
      this.visible = 'public'
      this.post.content = ''
      this.post.images = []
      this.imageSrc = []
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.post-create {
  .create-post-preview-image {
    position: relative;
    border-radius: 10px;
    width: 100%;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      border: solid 1px rgba(1, 1, 1, 0.2);
      border-radius: 5px;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.05);
        transition: 0.5s ease-in-out;
      }
      .create-post-image-remove-button {
        display: block;
      }
    }
    .create-post-image-remove-button {
      position: absolute;
      display: none;
      width: 100%;
      height: 100%;
      z-index: 5;
      justify-content: center;
      align-items: center;
    }
  }
  .post-create-title {
    flex: 1;
    align-items: center;
    padding-left: 15px;
    padding-top: 5px;
  }
}
</style>
