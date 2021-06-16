<template>
  <nuxt-link
    :to="localePath({ name: 'index-user-url', params: { url: user_url } })"
    class="btn btn-block btn-user btn-neutral"
  >
    <base-avatar
      :src="profile_photo_path"
      online
      status
      outlined
      :size="35"
    ></base-avatar>
    <div class="btn-user-name">
      <div>
        {{ user_name }}
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    user_name: {
      type: String,
      default: ''
    },
    user_url: {
      type: String,
      default: ''
    },
    profile_photo_path: {
      type: String,
      default: '/img/default-avatar.png'
    },
    onlineStatus: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
