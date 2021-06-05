<template>
  <div>
    <card class="post-card" ref="post-card">
      <div class="post-card-header">
        <base-avatar
          :src="post.user_profile_photo_path"
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
                :user_url="post.user_url"
                :user_name="post.user_name"
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
          <div v-html="post.content"></div>
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
      <div class="post-card-reaction">
        <div class="post-card-reaction-count">
          <div @click="onClickShowLike" v-if="post.likes && post.likes.counter">
            <img
              v-show="post.likes[1]"
              class="reaction-icon"
              src="/img/icons/reaction/like.svg"
            />
            <img
              v-show="post.likes[2]"
              class="reaction-icon"
              src="/img/icons/reaction/love.svg"
            />
            <img
              v-show="post.likes[3]"
              class="reaction-icon"
              src="/img/icons/reaction/haha.svg"
            />
            <img
              v-show="post.likes[4]"
              class="reaction-icon"
              src="/img/icons/reaction/care.svg"
            />
            <img
              v-show="post.likes[5]"
              class="reaction-icon"
              src="/img/icons/reaction/wow.svg"
            />
            <img
              v-show="post.likes[6]"
              class="reaction-icon"
              src="/img/icons/reaction/sad.svg"
            />
            <img
              v-show="post.likes[7]"
              class="reaction-icon"
              src="/img/icons/reaction/angry.svg"
            />
            {{ post.likes.counter }} {{ $t('PeoplesLikePost') }}
          </div>
          <div v-else>
            {{ $t('ThisPostNotHaveAnyLike') }}
          </div>
          <div @click="onClickShowComment" v-if="post.comments_count">
            {{ post.comments_count }} {{ $t('CommentsInPost') }}
          </div>
          <div v-else>
            {{ $t('ThisPostNotHaveAnyComment') }}
          </div>
        </div>

        <hr />
        <div class="row">
          <div class="col-6 comment-emoji-container-cover">
            <slide-y-down-transition>
              <div class="comment-emoji-container">
                <emoji-group @onClick="onClickEmojiPost" />
              </div>
            </slide-y-down-transition>
            <base-button
              block
              :type="reactionTypes[likeStatus.status]"
              @click="onClickLikePost"
            >
              <img
                class="reaction-icon mr-3"
                :src="reactionImg[likeStatus.status]"
              />
              {{ reactionName }}
            </base-button>
          </div>
          <div class="col-6">
            <base-button block type="neutral" @click="onClickShowComment">
              Comment
            </base-button>
          </div>
        </div>
      </div>
      <hr />
      <loading-chasing :loading="loading"></loading-chasing>
      <slide-y-down-transition>
        <div class="post-card-comments" v-show="showComment">
          <div
            class="post-card-comments-showmore"
            v-show="!lastComment && !loading"
            @click="onClickShowMore"
          >
            <i class="tim-icons icon-double-right mr-2"></i>
            <span>
              {{ $t('ShowMoreComments') }}
            </span>
          </div>
          <div v-for="comment in comments" :key="`comment-${comment.id}`">
            <post-comment :comment="comment"></post-comment>
          </div>
        </div>
      </slide-y-down-transition>

      <div class="post-card-actions" v-show="post">
        <base-avatar
          :src="currentUser.profile_photo_path"
          alt="avt"
          outlined
          :size="40"
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
            @keyup.enter="onCommentPost"
          >
          </el-input>
        </div>
        <div>
          <button
            class="btn btn-round btn-neutral btn-icon"
            @click="onClickImage"
          >
            <i class="tim-icons icon-camera-18"></i>
          </button>
          <button class="btn btn-round btn-neutral btn-icon">
            <i class="tim-icons icon-satisfied"></i>
          </button>
          <slide-y-down-transition>
            <button
              class="btn btn-round btn-success btn-icon"
              v-show="!!text || !!file.name"
              @click="onCommentPost"
            >
              <i class="tim-icons icon-send"></i>
            </button>
          </slide-y-down-transition>
        </div>
      </div>
      <input
        ref="post-card-file-input"
        type="file"
        v-show="false"
        @change="onChangeFile"
        accept="image/*"
      />
      <div class="post-card-preview-img" v-show="file.name">
        <button
          class="btn btn-neutral btn-round btn-icon post-card-preview-img-btn btn-sm"
          @click="onRemoveFile"
        >
          <i class="tim-icons icon-trash-simple"></i>
        </button>
        <img ref="post-card-preview-img" src="" />
        {{ file.name }}
      </div>
    </card>

    <el-dialog
      :title="`${likes_count} ${$t('PeopleWhoLikePostOf')} ${post.user_name}`"
      :visible.sync="likeDialog"
      width="500px"
      center
      @closed="onCloseLikeDialog"
    >
      <slide-y-down-transition>
        <div class="post-likes-dialog-content" v-if="likes_count">
          <perfect-scrollbar>
            <div
              class="row mx-0"
              v-for="like in likes"
              :key="`people-like-${like.id}`"
            >
              <div class="col col-8">
                <user-button
                  :user_name="like.user_name"
                  :user_url="like.user_url"
                  :profile_photo_path="like.user_phofile_photo_path"
                >
                </user-button>
              </div>
              <div class="col col-4">
                <img class="mr-3" :src="reactionImg[like.status]" />
                {{ reactionNames[like.status] }}
              </div>
            </div>
          </perfect-scrollbar>
        </div>
        <div v-else-if="!loadingLike">
          {{ $t('ThisPostNotHaveAnyLike') }}
        </div>
      </slide-y-down-transition>

      <loading-chasing :loading="loadingLike"></loading-chasing>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { DEFAULT_PER_PAGE } from '@/const'
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const vm = this
    return {
      hoverLike: false,
      likeDialog: false,
      loadingLike: false,
      likes: [],
      likes_count: 0,
      showPost: false,
      likeOffset: 0,
      showComment: this.show,
      text: '',
      typing: false,
      file: {
        img: null,
        name: null
      },
      comments: [],
      page: 1,
      lastComment: false,
      loading: false,
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
      },
      offset: 0,
      likeStatus: this.post.like_status || { status: 0 }
    }
  },
  methods: {
    onClickEmojiPost(e) {
      this.handleLikeStatus(e)
    },
    async onClickShowLike() {
      this.likeDialog = true
      this.loadingLike = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/post/${this.post.uid}/get_like?offset=${this.offset}`
        )
        this.likes = data.likes
        this.likes_count = data.likes_count
        this.likeOffset += DEFAULT_PER_PAGE
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loadingLike = false
    },
    onCloseLikeDialog() {
      this.likes = []
      this.likes_count = 0
      this.likeOffset = 0
    },
    async getComment(postId = null, offset = 0) {
      if (!postId || this.lastComment) return
      this.loading = true
      try {
        let requestUrl = `/v1/user/post/${postId}/get_comment?offset=${offset}&limit=5`
        const { data } = await this.$axios.get(requestUrl)
        this.offset = this.offset + data.data.length
        this.comments = [...data.data.reverse(), ...this.comments]
        if (data.data.length < 5) this.lastComment = true
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    onClickImage() {
      this.$refs['post-card-file-input'].click()
    },
    onClickLikePost() {
      this.handleLikeStatus(1)
    },
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
      }
      let url = `/v1/user/post/${this.post.id}/handle_like`
      await this.$axios.$post(url, { status })
    },
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
    onClickShowMore() {
      this.getComment(this.post.uid, this.offset)
    },
    onClickShowComment() {
      this.showComment = true
      if (!this.comments.length) this.onClickShowMore()
      this.$refs['post-card-actions-input'].focus()
      // var postCardRef = this.$refs['post-card']
      // postCardRef.scrollTo({
      //   top: postCardRef.scrollHeight,
      //   behavior: 'smooth'
      // })
      this.$refs['post-card'].scrollTop = this.$refs['post-card'].scrollHeight
    },
    async onCommentPost() {
      if (!this.file.img && !this.text) return
      this.loading = true
      try {
        var formData = new FormData()
        if (this.file.img) {
          formData.append('file', this.img)
        }
        if (this.text) formData.append('content', this.text)
        if (!this.showComment) this.showComment = true
        const response = await this.$axios.$post(
          `v1/user/post/${this.post.id}/create_comment`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        //TOTO socket
        const comment = { ...response.data, user: this.currentUser }
        this.comments.push(comment)
        this.offset = this.offset + 1
        this.$emit('increateCommentCount')
        this.post.comments_count = this.post.comments_count + 1
      } catch (err) {
        this.toastError(err.toString())
      }
      this.file.img = null
      this.file.name = null
      this.text = ''
      this.loading = false
    }
  },
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser']),
    reactionName() {
      return this.reactionNames[this.likeStatus.status] || this.$t('Like')
    }
  },
  mounted() {
    let likes = { counter: 0 }
    if (this.post.like_group.length) {
      this.post.like_group.forEach(group => {
        likes.counter += group.counter
        likes[group.status] = group.counter
      })
    }
    this.post.likes = likes
    if (this.show) this.getComment(this.post.uid, 0)
  }
}
</script>
<style lang="scss">
.post-card {
  scroll-behavior: smooth;
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

  .post-card-reaction {
    .post-card-reaction-count {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        cursor: pointer;
      }
    }
  }
  .post-card-comments {
    .post-card-comments-showmore {
      font-weight: 700;
      cursor: pointer;
    }
  }
  .post-card-preview-img {
    position: relative;
    width: 300px;
    text-align: center;
    img {
      width: 100%;
      border-radius: 7px;
      border: solid 1px rgba(0, 0, 0, 0.1);
    }

    .post-card-preview-img-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0;
      transition: opacity ease-in-out 0.5s;
      z-index: 1050;
    }

    &:hover {
      .post-card-preview-img-btn {
        opacity: 1;
        transition: opacity ease-in-out 0.5s;
      }
    }
  }
}

.post-likes-dialog-content {
  .ps {
    height: 500px;
    .post-like-row {
      display: flex;
      justify-content: space-between;
    }
  }
}

.reaction-icon {
  width: 16px;
  height: 16px;
}

.post-card-actions {
  display: flex;
  padding: 5px;
  .post-card-actions-input-container {
    margin-left: 10px;
    padding-right: 10px;
    flex: 1;
    .post-card-actions-input {
      textarea {
        padding: 10px;
        border-radius: 15px;
        height: 30px;
        resize: none;
      }
    }
  }
}
</style>
