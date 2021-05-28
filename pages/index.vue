<template>
  <div>
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
    ...mapGetters('user', ['isLoggedIn'])
  }
}
</script>
<style lang="scss" scoped>
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
