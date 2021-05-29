<template>
  <div class="post-comment">
    <div class="mr-2">
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
        <user-name
          :key="subComment.user.url"
          :user_url="subComment.user.url"
          :user_name="subComment.user.full_name"
        ></user-name>
      </div>
      <div class="post-comment-content">
        <div class="post-comment-button">
          <base-button
            type="neutral"
            round
            icon
            @click="onClickSubCommentOption"
          >
            <i class="tim-icons icon-sound-wave" aria-hidden="true"></i>
          </base-button>
        </div>
        {{ subComment.content }}
      </div>
      <div class="post-comment-actions">
        <a href="javascript:void();" class="comment-emoji-container-cover">
          <div class="comment-emoji-container">
            <emoji-group @onClick="onClickEmojiSubComment" />
          </div>
          Like
        </a>
        <a href="javascript:void();" class="mx-3">
          Reply
        </a>
        <span>
          {{ subComment.created_at | relativeTime }}
        </span>
      </div>
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
  methods: {
    onClickEmojiSubComment() {},
    onClickSubCommentOption() {}
  },
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss"></style>
