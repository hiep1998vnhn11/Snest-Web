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
          <div class="post-comment-content-container">
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
          </div>
          <div class="flex-1"></div>
        </div>
        <div class="post-comment-actions">
          <a href="javascript:void();" class="comment-emoji-container-cover">
            <div class="comment-emoji-container">
              <emoji-group @onClick="onClickEmojiComment" />
            </div>
            Like
          </a>
          <a href="javascript:void();" class="mx-3" @click="onClickReplyLink">
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
        <slide-y-down-transition>
          <div v-if="show && subComments.length">
            <post-sub-comment
              v-for="subComment in subComments"
              :subComment="subComment"
              :key="`sub-comment-${subComment.id}`"
            ></post-sub-comment>
          </div>
        </slide-y-down-transition>

        <div class="post-card-actions" v-if="show">
          <base-avatar
            :src="currentUser.profile_photo_path"
            alt="avt"
            outlined
            :size="30"
            online
            status
          ></base-avatar>
          <div class="post-card-actions-input-container">
            <el-input
              class="post-card-actions-input"
              type="textarea"
              autosize
              :placeholder="$t('CommentSomething')"
              v-model="text"
              ref="post-card-actions-input"
              @keyup.enter="onReplyComment"
            >
            </el-input>
          </div>
          <div>
            <button class="btn btn-round btn-neutral btn-icon">
              <i class="tim-icons icon-satisfied"></i>
            </button>
            <slide-y-down-transition>
              <button
                class="btn btn-round btn-success btn-icon"
                v-show="text"
                @click="onReplyComment"
              >
                <i class="tim-icons icon-send"></i>
              </button>
            </slide-y-down-transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
      subComments: [],
      text: '',
      showSubComment: false
    }
  },
  methods: {
    onClickCommentOption() {},
    onClickReplyLink() {
      this.show = true
      this.onGetSubComment()
    },
    onClickShowMore() {
      this.show = true
      this.onGetSubComment()
    },
    onClickEmojiComment() {},
    async onGetSubComment() {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/post/comment/${this.comment.id}/get_sub_comment`
        )
        this.subComments = data
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    async onReplyComment() {
      if (!this.text) return
      this.loading = true
      try {
        const response = await this.$axios.$post(
          `v1/user/post/comment/${this.comment.id}/create_sub_comment`,
          {
            content: this.text
          }
        )
        //TOTO socket
        const comment = { ...response.data, user: this.currentUser }
        this.subComments.push(comment)
        this.offset = this.offset + 1
        this.comment.sub_comments_count = this.comment.sub_comments_count + 1
      } catch (err) {
        this.toastError(err.toString())
      }
      this.text = ''
      this.loading = false
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
.post-comment {
  position: relative;
  padding: 5px 5px 5px 5px;
  display: flex;
  width: 100%;
  margin-top: 5px;
  .post-comment-container {
    flex: 1;
    .post-comment-right {
      flex: 1;
      display: flex;

      .post-comment-content-container {
        padding: 10px 15px 10px;
        border-radius: 15px;
        border: solid 1px rgba(1, 1, 1, 0.1);
        background: whitesmoke;
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
      }

      .flex-1 {
        flex: 1;
      }

      &:hover {
        .post-comment-button {
          display: block;
        }
      }

      .post-comment-actions {
        display: flex;
        width: 100%;
      }

      .post-comment-subcomment {
        display: flex;
        font-weight: bold;
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }
}
</style>
