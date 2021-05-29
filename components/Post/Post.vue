<template>
  <div>
    <card class="post-card">
      <div class="post-card-header">
        <base-avatar
          :src="post.user.profile_photo_path"
          alt="avt"
          outlined
          :size="40"
          class="mr-2"
        >
        </base-avatar>
        <div class="post-card-header-right">
          <div>
            <div class="post-card-header-name">
              <user-name
                :user_url="post.user.url"
                :user_name="post.user.full_name"
              ></user-name>
            </div>
            <p>
              {{ post.created_at | relativeTime }}
            </p>
          </div>

          <base-button type="neutral" size="sm" icon round>
            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
          </base-button>
        </div>
      </div>

      <div class="post-card-content">
        <div>
          {{ post.content }}
          <div class="row">
            <div
              class="col"
              v-for="image in post.images"
              :key="`post-image-${image.id}`"
            >
              <img :src="image.path" />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div class="post-card-actions">
        {{ post.liked_count }} Like Count {{ post.comments_count }} comment
        count
        <hr />
        <div class="row">
          <div class="col-6 comment-emoji-container-cover">
            <slide-y-down-transition>
              <div class="comment-emoji-container">
                <emoji-group @onClick="onClickEmojiPost" />
              </div>
            </slide-y-down-transition>
            <base-button block type="neutral" @click="onClickLikePost">
              Like
            </base-button>
          </div>
          <div class="col-6">
            <base-button block type="neutral">
              Comment
            </base-button>
          </div>
        </div>
      </div>
      <hr />
      <div class="post-card-comments">
        <div v-for="comment in comments" :key="`comment-${comment.id}`">
          <post-comment :comment="comment"></post-comment>
        </div>
        <div class="post-card-comment"></div>
      </div>
    </card>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    },
    comments: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      hoverLike: false
    }
  },
  methods: {
    async onClickEmojiPost(e) {
      if (!this.currentUser) return
      if (this.comment.like_status) {
        const likeStatus = this.comment.like_status.status
        this.comment.like_status.status = likeStatus === e ? 0 : e
        if (this.comment.like_status.status === 0 && likeStatus !== 0) {
          this.comment.liked_count -= 1
        } else if (this.comment.like_status.status !== 0 && likeStatus === 0)
          this.comment.liked_count += 1
      } else {
        this.comment.like_status = {
          status: e
        }
        if (e > 0) this.comment.liked_count += 1
      }
      let url = `/v1/user/post/comment/${this.comment.id}/handle_like`
      await axios.post(url, {
        status: e
      })
    },

    onClickLikePost() {
      if (!this.comment.like_status || this.comment.like_status.status === 0) {
        this.onClickLike(1)
      } else {
        this.onClickLike(0)
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {}
}
</script>
<style lang="scss">
.post-card {
  .post-card-header {
    display: flex;
    .post-card-header-right {
      display: flex;
      flex: 1;
      justify-content: space-between;

      .post-card-header-name {
        font-weight: bold;
      }
    }
  }
}

.post-card-comments {
  .post-card-comment {
  }
}
</style>
