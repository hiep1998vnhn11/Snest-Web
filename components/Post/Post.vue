<template>
  <div>
    <card class="post-card" ref="post-card">
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
          <div>{{ post.content }}</div>
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
          <div>
            <img src="@/assets/img/icons/reaction/like.svg" />
            {{ post.liked_count }} {{ $t('PeoplesLikePost') }}
          </div>
          <div @click="onClickShowComment">
            {{ post.comments_count }} {{ $t('CommentsInPost') }}
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
            <base-button block type="neutral" @click="onClickLikePost">
              Like
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

      <div class="post-card-actions">
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
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { fetchPostComment } from '@/api'
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
    return {
      hoverLike: false,
      showPost: false,
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
      loading: false
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
    async getComment(postId = null, page = 1) {
      if (!postId) return
      this.loading = true
      try {
        const { data } = await fetchPostComment(postId, page)
        if (data.data.length) {
          this.page = page + 1
          this.comments = [...data.data.reverse(), ...this.comments]
          if (!data.next_page_url) this.lastComment = true
        } else {
          this.lastComment = true
        }
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    onClickImage() {
      this.$refs['post-card-file-input'].click()
    },
    onClickLikePost() {
      if (!this.comment.like_status || this.comment.like_status.status === 0) {
        this.onClickLike(1)
      } else {
        this.onClickLike(0)
      }
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
      this.$refs['post-card-preview-img'].src
      this.$refs['post-card-file-input'].value = ''
    },
    onClickShowMore() {
      this.getComment(this.post.uid, this.page)
    },
    onClickShowComment() {
      this.showComment = true
      this.$refs['post-card-actions-input'].focus()
      // var postCardRef = this.$refs['post-card']
      // postCardRef.scrollTo({
      //   top: postCardRef.scrollHeight,
      //   behavior: 'smooth'
      // })
      this.$refs['post-card'].scrollTop = this.$refs['post-card'].scrollHeight
    },
    async onCommentPost() {
      try {
        console.log(window.socket)
      } catch (err) {
        this.toastError(err.toString())
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {
    if (this.show) this.getComment(this.post.uid, 1)
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
</style>
