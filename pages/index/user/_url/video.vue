<template>
  <div>
    <base-name-link :user="currentUser"></base-name-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters('user', ['currentUser'])
}
</script>
