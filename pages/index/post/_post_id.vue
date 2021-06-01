<template>
  <div class="container">
    <post
      :post="post"
      show
      class="mt-1"
      @likePost="onLikePost"
      :key="`post-page-${post.id}`"
    ></post>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store, $axios, error }) {
    const postId = params.post_id
    const url = store.getters['user/currentUser']
      ? `/v1/user/post/${postId}/get`
      : `/v1/guest/post/${postId}/get`
    try {
      const response = await $axios.$get(url)
      if (!response.data.like_status) response.data.like_status = { status: 0 }
      return {
        post: response.data
      }
    } catch (err) {
      this.toastError(err.toString())
    }
  },
  data() {
    return {}
  },
  methods: {
    async onLikePost(status) {
      const post = this.post
      const likeStatus = post.like_status.status
      post.like_status.status = likeStatus === status ? 0 : status
      if (post.like_status.status === 0 && likeStatus !== 0) {
        post.liked_count -= 1
      } else if (post.like_status.status !== 0 && likeStatus === 0) {
        post.liked_count += 1
        //TOTO socket
      }
      this.post = post
      let url = `/v1/user/post/${post.id}/handle_like`
      await this.$axios.$post(url, { status })
    }
  }
}
</script>
