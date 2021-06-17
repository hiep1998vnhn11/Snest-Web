<template>
  <div>
    <slide-y-down-transition>
      <div class="image-preview-container" v-if="image">
        <div class="container">
          <div class="image-preview">
            <div class="image-preview--header">
              <button
                class="btn btn-success btn-round btn-icon"
                @click="onClosePreviewImage"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
            <div class="image-preview--content">
              <img :src="image" :alt="$t('PreviewImage')" />
            </div>
          </div>
        </div>
      </div>
    </slide-y-down-transition>
    <messages-card />
    <nuxt-child />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      error: null,
      loadingMessageCard: false
    }
  },
  computed: {
    ...mapGetters('message', ['thresh']),
    ...mapGetters('user', ['isLoggedIn']),
    ...mapGetters(['image'])
  },
  methods: {
    onClosePreviewImage() {
      if (!this.image) return
      this.$store.commit('SET_IMAGE', null)
    },
    onKeyDown(e) {
      if (e.keyCode === 27) {
        this.$store.commit('SET_IMAGE', null)
      }
    }
  },
  watch: {
    image(value) {
      if (value) {
        document.onkeydown = this.onKeyDown
      } else {
        document.onkeydown = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image-preview-container {
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 1, 1, 0.2);
  .image-preview {
    width: 100%;
    height: 100%;
    background: white;
    padding: 0 5px 5px 5px;
    border-radius: 10px;
    border: solid 1px rgba(1, 1, 1, 0.05);
    .image-preview--header {
      display: flex;
      justify-content: flex-end;
    }
    .image-preview-content {
      padding: 5px;
      border-radius: 15px;
      border: solid 1px rgba(0, 0, 0, 0.05);
      img {
        max-width: 100%;
        max-height: 80%;
      }
    }
  }
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
