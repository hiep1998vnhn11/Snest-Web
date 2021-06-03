<template>
  <div>
    <user-edit> </user-edit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user',
  middleware: 'checkUrl',
  computed: {
    ...mapGetters('user', ['currentUser'])
  }
}
</script>
<style></style>
