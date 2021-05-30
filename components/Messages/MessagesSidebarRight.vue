<template>
  <div class="message-sidebar-right">
    <aside :class="{ fixed: isShow }" @click.stop>
      <perfect-scrollbar
        @ps-scroll-y="handleScroll"
        ref="messages-sidebar-right-scrollbar"
      >
        <div class="header" :class="{ 'is-sticky': isSticky }">
          <div class="avatar">
            <base-avatar
              :src="currentUser.profile_photo_path"
              :size="100"
              alt="avt"
            ></base-avatar>
          </div>
          <div class="logo">
            <user-name
              :user_url="currentUser.url"
              :user_name="currentUser.full_name"
            ></user-name>
            <span v-if="currentUser.online_status.status">
              {{ $t('Active') }}
            </span>
          </div>
          <div class="tab">
            <button class="btn btn-success current">
              Danh sách phát
            </button>
            <button class="btn btn-neutral">
              Nghe gần đây
            </button>
          </div>
        </div>
      </perfect-scrollbar>
    </aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSticky: true
    }
  },
  methods: {
    handleScroll(e) {
      const target = e.target
      if (target.scrollTop > 10) {
        isSticky.value = true
      } else {
        isSticky.value = false
      }
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser'])
  }
}
</script>
