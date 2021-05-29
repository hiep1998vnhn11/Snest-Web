<template>
  <div class="post-comment">
    <div>
      <base-avatar
        outlined
        :size="30"
        :src="subComment.user.profile_photo_path"
        alt="avt"
      >
      </base-avatar>
    </div>
    <div class="post-comment-right">
      <div class="post-comment-name">
        {{ subComment.user.fullName }}
      </div>
      <div class="post-commentp-content"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    subComment: {
      type: Object,
      default() {
        return {}
      }
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
<style lang="scss"></style>
