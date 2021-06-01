<template>
  <div class="container">
    <post :post="post" show class="mt-1"></post>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params, store, $http, error }) {
    const postId = params.post_id
    const url = store.getters['user/currentUser']
      ? `/v1/user/post/${postId}/get`
      : `/v1/guest/post/${postId}/get`
    try {
      const response = await axios.get(url)
      const commentsResponse = await axios.get(
        `/v1/user/post/${postId}/get_comment`
      )
      return {
        post: response.data.data,
        comments: commentsResponse.data.data
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>
