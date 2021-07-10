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
              <img
                v-if="comment.image_path"
                :src="comment.image_path"
                class="comment__image"
              />
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
        <div class="post-comment-actions">
          <a href="javascript:void(0);" class="comment-emoji-container-cover">
            <div class="comment-emoji-container">
              <emoji-group @onClick="onClickEmojiComment" />
            </div>
            {{ reactionNames[likeStatus.status] }}
          </a>
          <a href="javascript:void(0);" class="mx-3" @click="onClickReplyLink">
            Reply
          </a>
          <span>
            {{ comment.created_at | relativeTime }}
          </span>
        </div>
        <slide-y-down-transition>
          <div v-if="totalLikes && totalLikes.counter">
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
            {{ totalLikes.counter }} {{ $t('PeoplesLikeComment') }}
          </div>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <a
            href="javascript:void(0);"
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
          </a>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <div v-if="show && subComments.length">
            <transition-group name="list-left">
              <post-sub-comment
                v-for="subComment in subComments"
                :subComment="subComment"
                :key="`sub-comment-${subComment.id}`"
                class="list-item"
              ></post-sub-comment>
            </transition-group>
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
    const vm = this
    return {
      loading: false,
      show: false,
      subComments: [],
      text: '',
      showSubComment: false,
      likeStatus: this.comment.like_status || { status: 0 },
      file: {
        img: null,
        name: null
      },
      reactionNames: {
        2: vm.$t('Love'),
        3: vm.$t('Haha'),
        4: vm.$t('Yay'),
        5: vm.$t('Wow'),
        6: vm.$t('Sad'),
        7: vm.$t('Angry')
      },
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
    onChangeFile(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.file.img = files[0]
      this.file.name = files[0].name
      this.createPreviewImage(files[0])
    },
    createPreviewImage(image) {
      const vm = this
      var reader = new FileReader()
      reader.onload = e =>
        (vm.$refs['post-card-preview-img'].src = e.target.result)
      reader.readAsDataURL(image)
    },
    onRemoveFile() {
      this.file.img = null
      this.file.name = null
      this.$refs['post-card-preview-img'].src = ''
      this.$refs['post-card-file-input'].value = ''
    },
    onClickCommentOption() {
      console.log('test')
    },
    onClickReplyLink() {
      this.show = true
      this.onGetSubComment()
    },
    onClickShowMore() {
      this.show = true
      this.onGetSubComment()
    },
    onClickEmojiComment(e) {
      this.handleLikeStatus(e)
    },
    async onGetSubComment() {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/post/comment/${this.comment.id}/sub_comment`
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
          `/v1/user/post/comment/${this.comment.id}/sub_comment`,
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
    },

    async handleLikeStatus(status) {
      const likeStatus = this.likeStatus.status
      this.likeStatus.status = likeStatus === status ? 0 : status
      if (this.likeStatus.status === 0 && likeStatus !== 0) {
        this.totalLikes.counter -= 1
        if (this.totalLikes[status]) {
          this.totalLikes[status] -= 1
        } else this.totalLikes[status] = 0
      } else if (this.likeStatus.status !== 0 && likeStatus === 0) {
        this.totalLikes.counter += 1
        if (this.totalLikes[status]) this.totalLikes[status] += 1
        else this.totalLikes[status] = 1
        //TOTO socket
        // this.socketLikePost()
      }
      let url = `/v1/user/post/comment/${this.comment.id}/handle_like`
      await this.$axios.$post(url, { status })
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    totalLikes() {
      let likes = { counter: 0 }
      if (this.comment.like_group.length) {
        this.comment.like_group.forEach(group => {
          likes.counter += group.counter
          likes[group.status] = group.counter
        })
      }
      return likes
    }
  }
}
</script>
<style lang="scss">
.post-comment {
  position: relative;
  padding: 5px 5px 5px 5px;
  display: flex;
  width: 100%;
  margin-top: 5px;

  .comment__image {
    max-width: 100%;
    min-width: 50%;
  }
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
