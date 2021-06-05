<template>
  <div class="message-layout">
    <section class="message-layout-content">
      <messages-navbar :isShowSidebar="isShowSidebar" :isSticky="isSticky" />
      <messages-sidebar-left />
      <zoom-center-transition :duration="200" mode="out-in">
        <div class="message-layout-wrapper">
          <Nuxt></Nuxt>
        </div>
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
  }
}
</script>
