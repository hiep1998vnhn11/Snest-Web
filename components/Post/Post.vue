<template>
  <div>
    <card class="post-card">
      <div class="post-card-header">
        <base-avatar :src="post.user.profile_photo_path"> </base-avatar>
      </div>
    </card>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {
          user: {
            profile_photo_path: '/img/default-avatar.png'
          }
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
  computed() {},
  mounted() {}
}
</script>
<style lang="scss"></style>
