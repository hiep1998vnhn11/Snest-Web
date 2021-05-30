<template>
  <div class="message-layout">
    <section class="message-layout-content">
      <messages-navbar :isShowSidebar="isShowSidebar" :isSticky="isSticky" />
      <messages-sidebar-left />
      <slide-y-down-transition>
        <messages-action
          v-if="$route.path == localePath({ name: 'messages-room_id' })"
        ></messages-action>
      </slide-y-down-transition>
      <zoom-center-transition :duration="200" mode="out-in">
        <perfect-scrollbar
          @ps-scroll-y="handleScroll"
          ref="message-layout-scroll"
        >
          <div class="message-layout-wrapper">
            <Nuxt></Nuxt>
          </div>
        </perfect-scrollbar>
      </zoom-center-transition>
    </section>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      isShowSidebar: true,
      isSticky: true
    }
  },
  methods: {
    handleScroll(e) {
      const target = e.target
      if (target.scrollTop > 10) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    },
    scrollBottom() {
      this.$refs['message-layout-scroll'].$el.scrollTop = this.$refs[
        'message-layout-scroll'
      ].$el.scrollHeight
    }
  },
  mounted() {},
  watch: {
    $route: {
      handler: 'scrollBottom'
    }
  }
}
</script>
