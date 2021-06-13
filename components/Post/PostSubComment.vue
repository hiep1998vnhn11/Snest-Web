<template>
  <div class="post-subcomment">
    <div class="mr-2">
      <base-avatar
        outlined
        :size="30"
        :src="subComment.user.profile_photo_path"
        alt="avt"
      >
      </base-avatar>
    </div>
    <div class="post-subcomment-container">
      <div class="post-subcomment-right">
        <div class="post-subcomment-content-container">
          <div class="post-subcomment-name">
            <user-name
              :key="subComment.user.url"
              :user_url="subComment.user.url"
              :user_name="subComment.user.full_name"
            ></user-name>
          </div>

          <div class="post-subcomment-content">
            <div class="post-subcomment-button">
              <a
                class="btn btn-round btn-icon btn-neutral btn-sm"
                @click="onClickSubCommentOption"
              >
                <i class="tim-icons icon-sound-wave" aria-hidden="true"></i>
              </a>
            </div>
            {{ subComment.content }}
          </div>
        </div>
      </div>
      <div class="post-subcomment-actions">
        <div @click="onClickShowLike" v-if="totalLikes && totalLikes.counter">
          <img
            v-show="totalLikes[1]"
            class="reaction-icon"
            src="/img/icons/reaction/like.svg"
          />
          <img
            v-show="totalLikes[2]"
            class="reaction-icon"
            src="/img/icons/reaction/love.svg"
          />
          <img
            v-show="totalLikes[3]"
            class="reaction-icon"
            src="/img/icons/reaction/haha.svg"
          />
          <img
            v-show="totalLikes[4]"
            class="reaction-icon"
            src="/img/icons/reaction/care.svg"
          />
          <img
            v-show="totalLikes[5]"
            class="reaction-icon"
            src="/img/icons/reaction/wow.svg"
          />
          <img
            v-show="totalLikes[6]"
            class="reaction-icon"
            src="/img/icons/reaction/sad.svg"
          />
          <img
            v-show="totalLikes[7]"
            class="reaction-icon"
            src="/img/icons/reaction/angry.svg"
          />
          {{ totalLikes.counter }} {{ $t('PeoplesLikePost') }}
        </div>
        <a href="javascript:void();" class="comment-emoji-container-cover">
          <div class="comment-emoji-container">
            <emoji-group @onClick="onClickEmojiSubComment" />
          </div>
          Like
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
    return {
      reactionTypes: {
        0: 'neutral',
        1: 'info',
        2: 'danger',
        3: 'success',
        4: 'success',
        5: 'success',
        6: 'secondary',
        7: 'danger'
      },
      reactionImg: {
        0: '/img/icons/reaction/like.svg',
        1: '/img/icons/reaction/like.svg',
        2: '/img/icons/reaction/love.svg',
        3: '/img/icons/reaction/haha.svg',
        4: '/img/icons/reaction/care.svg',
        5: '/img/icons/reaction/wow.svg',
        6: '/img/icons/reaction/sad.svg',
        7: '/img/icons/reaction/angry.svg'
      }
    }
  },
  methods: {
    onClickEmojiSubComment() {},
    onClickSubCommentOption() {},
    async handleLikeStatus(status) {
      const likeStatus = this.likeStatus.status
      this.likeStatus.status = likeStatus === status ? 0 : status
      if (this.likeStatus.status === 0 && likeStatus !== 0) {
        this.post.likes.counter -= 1
        if (this.post.likes[status]) {
          this.post.likes[status] -= 1
        } else this.post.likes[status] = 0
      } else if (this.likeStatus.status !== 0 && likeStatus === 0) {
        this.post.likes.counter += 1
        if (this.post.likes[status]) this.post.likes[status] += 1
        else this.post.likes[status] = 1
        //TOTO socket
        // this.socketLikePost()
      }
      let url = `/v1/user/post/comment/sub_comment/${this.subComment.id}/handle_like`
      await this.$axios.$post(url, { status })
    }
  },
  created() {},
  computed: {
    totalLikes() {
      let likes = { counter: 0 }
      if (this.subComment.like_group.length) {
        this.subComment.like_group.forEach(group => {
          likes.counter += group.counter
          likes[group.status] = group.counter
        })
      }
      return likes
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.post-subcomment {
  position: relative;
  padding: 5px 5px 5px 5px;
  display: flex;
  width: 100%;
  margin-top: 5px;
  .post-subcomment-container {
    flex: 1;
    .post-subcomment-right {
      flex: 1;
      display: flex;

      .post-subcomment-content-container {
        padding: 10px 15px 10px;
        border-radius: 15px;
        border: solid 1px rgba(1, 1, 1, 0.1);
        background: whitesmoke;
        .post-subcomment-name {
          font-weight: bold;
        }
        .post-subcomment-content {
          position: relative;
          .post-subcomment-button {
            display: none;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(100%, -50%);
          }
        }
        &:hover {
          .post-subcomment-button {
            display: block;
          }
        }
      }

      .flex-1 {
        flex: 1;
      }

      .post-subcomment-actions {
        display: flex;
        width: 100%;
      }

      .post-subcomment-subcomment {
        display: flex;
        font-weight: bold;
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }
}
</style>
