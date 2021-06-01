<template>
  <div>
    <div class="post-comment">
      <div class="mr-2">
        <base-avatar
          outlined
          :size="35"
          :src="comment.user.profile_photo_path"
          alt="avt"
        ></base-avatar>
      </div>
      <div class="post-comment-container">
        <div class="post-comment-right">
          <div class="post-comment-name">
            <user-name
              :key="comment.user.url"
              :user_url="comment.user.url"
              :user_name="comment.user.full_name"
            ></user-name>
          </div>
          <div class="post-comment-content">
            <div class="post-comment-button">
              <base-button
                type="neutral"
                round
                icon
                @click="onClickCommentOption"
              >
                <i class="tim-icons icon-sound-wave" aria-hidden="true"></i>
              </base-button>
            </div>
            <loading-chasing :loading="loading"></loading-chasing>
            {{ comment.content }}
          </div>
          <div class="post-comment-actions">
            <a href="javascript:void();" class="comment-emoji-container-cover">
              <div class="comment-emoji-container">
                <emoji-group @onClick="onClickEmojiComment" />
              </div>
              Like
            </a>

            <a href="javascript:void();" class="mx-3">
              Reply
            </a>
            <span>
              {{ comment.created_at | relativeTime }}
            </span>
          </div>
          <slide-y-down-transition>
            <div
              class="post-comment-subcomment"
              v-if="comment.sub_comments_count && !show"
              @click="onClickShowMore"
            >
              <i class="tim-icons icon-double-right mr-2"></i>
              <span>
                {{ $t('ShowMore') }}
                {{ comment.sub_comments_count }}
                {{ $t('Replies') }}
              </span>
            </div>
          </slide-y-down-transition>
        </div>

        <slide-y-down-transition>
          <div v-if="show && subComments.length">
            <post-sub-comment
              v-for="subComment in subComments"
              :subComment="subComment"
              :key="`sub-comment-${subComment.id}`"
            ></post-sub-comment>
          </div>
        </slide-y-down-transition>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      subComments: []
    }
  },
  methods: {
    onClickCommentOption() {},
    onClickShowMore() {
      this.show = true
      this.onGetSubComment()
    },
    onClickEmojiComment() {},
    async onGetSubComment() {
      this.loading = true
      try {
        const { data } = await this.$axiox.$get(
          `/v1/user/post/comment/${this.comment.id}/get_sub_comment`
        )
        this.subComments = data.data
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    }
  },
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss">
.post-comment {
  position: relative;
  padding: 5px 5px 5px 5px;
  display: flex;
  .post-comment-right {
    flex: 1;
    background: whitesmoke;
    padding: 10px 15px 10px;
    border-radius: 15px;
    border: solid 1px rgba(1, 1, 1, 0.1);
    .post-comment-name {
      font-weight: bold;
    }

    .post-comment-content {
      position: relative;
      .post-comment-button {
        display: none;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
      }
    }
    &:hover {
      .post-comment-button {
        display: block;
      }
    }

    .post-comment-actions {
      display: flex;
    }

    .post-comment-subcomment {
      display: flex;
      font-weight: bold;
      cursor: pointer;
      margin-top: 5px;
    }
  }
}
</style>
