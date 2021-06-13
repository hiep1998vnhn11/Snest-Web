<template>
  <div>
    <user-image />
    <user-edit> </user-edit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  created() {
    if (this.$route.params.url !== this.currentUser.url) {
      this.toastError('Permission Denined!')
      this.$router.push(
        this.localePath({
          name: 'index-user-url',
          params: {
            url: this.$route.params.url
          }
        })
      )
    }
  }
}
</script>
<style></style>
