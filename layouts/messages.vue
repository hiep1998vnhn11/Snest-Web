<template>
  <div class="message-layout">
    <section class="content">
      <zoom-center-transition :duration="200" mode="out-in">
        <perfect-scrollbar>
          <messages-navbar :isShowSidebar="isShowSidebar" />
          <div class="wrapper">
            <Nuxt></Nuxt>
          </div>
        </perfect-scrollbar>
      </zoom-center-transition>
    </section>
    <messages-sidebar-left />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      isShowSidebar: true
    }
  },
  methods: {},
  mounted() {}
}
</script>
