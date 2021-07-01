<template>
  <div>
    <!-- sidebar left -->
    <side-bar home backgroundColor="white" class="home-sidebar-left">
      <div class="home-sidebar-left-top">
        <perfect-scrollbar>
          <loading-chasing :loading="follow.loading"></loading-chasing>
          <h3>
            {{ $t('YouAreFollowing') }}
          </h3>
          <transition-group name="list-left" tag="p">
            <user-button
              :profile_photo_path="user.profile_photo_path"
              :user_name="user.full_name"
              :user_url="user.url"
              :onlineStatus="user.online_status"
              v-for="user in follow.users"
              :key="`follow-user-${user.url}`"
              class="list-item"
            ></user-button>
          </transition-group>
        </perfect-scrollbar>
      </div>
      <div class="home-sidebar-left-bottom">
        <perfect-scrollbar>
          <loading-chasing :loading="suggest.loading"></loading-chasing>
          <h3>
            {{ $t('SuggestUser') }}
          </h3>
          <transition-group name="list-right" tag="p">
            <user-button
              :profile_photo_path="user.profile_photo_path"
              :user_name="user.full_name"
              :user_url="user.url"
              :onlineStatus="user.online_status"
              v-for="user in suggest.users"
              :key="`suggest-user-${user.url}`"
              class="list-item"
            ></user-button>
          </transition-group>
        </perfect-scrollbar>
      </div>
    </side-bar>

    <div class="home-container">
      <div class="container">
        <!-- <slider></slider> -->
        <post-create
          :loading="loading_user"
          @created="onCreatedPost"
        ></post-create>
        <slide-y-up-transition>
          <div class="index-loading-cover" v-show="loading">
            <loading-chasing :loading="true"></loading-chasing>
          </div>
        </slide-y-up-transition>

        <slide-y-down-transition>
          <div class="mt-3" v-if="posts.length">
            <transition-group name="list-complete" tag="p">
              <post
                class="mt-3 list-complete-item"
                v-for="(post, index) in posts"
                :key="`post-component-feed-${index}`"
                :post="post"
                :index="index"
                :like_status="post.like_status"
                @deletePost="onDeletePost"
              ></post>
            </transition-group>
            <observer @intersect="intersected"></observer>
          </div>
        </slide-y-down-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { PER_PAGE } from '@/const'
export default {
  props: ['loading_user'],
  head() {
    return {
      title: this.isLoggedIn ? 'Home' : 'Login'
    }
  },
  middleware: 'auth',
  computed: {
    ...mapGetters('user', ['currentUser', 'friends', 'isLoggedIn']),
    ...mapGetters(['image']),
    sortedTrending() {
      return this.trending
        ? Object.entries(this.trending).sort(([, a], [, b]) => b - a)
        : []
    }
  },
  data() {
    return {
      loading: false,
      loadingFriend: false,
      loadingTrending: false,
      error: null,
      drawer: null,
      page: 1,
      posts: [],
      lastPost: false,
      offset: 0,
      suggest: {
        loading: false,
        users: [],
        offset: 0
      },
      follow: {
        users: [],
        loading: false,
        offset: 0
      }
    }
  },
  created() {
    this.onMounted()
    // this.fetchSuggest()
    // this.fetchFollow()
  },
  methods: {
    onCreatedPost(post) {
      this.posts.unshift(post)
    },
    onMounted() {
      this.fetchPost(0)
      this.fetchSuggest()
      this.fetchFollow()
    },
    async fetchPost(offset = 0) {
      if (this.lastPost) return
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/post?offset=${offset}&limit=${PER_PAGE}`
        )
        if (data.length) {
          this.posts = [...this.posts, ...data]
          this.offset = offset + PER_PAGE
        } else {
          this.lastPost = true
        }
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    async fetchTrending() {
      this.loadingTrending = true
      try {
        await this.getTrending()
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loadingTrending = false
    },
    async fetchFriend() {
      this.loadingFriend = true
      this.error = null
      try {
        await this.getFriend()
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loadingFriend = false
    },
    async onClickFriend(user) {
      try {
        await this.getThreshByUser(user)
      } catch (err) {
        this.$nuxt.error(err)
      }
    },
    async fetchData() {
      this.error = null
      this.loading = true
      try {
        await this.getPost()
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    intersected() {
      this.fetchPost(this.page)
    },
    async onLike(e) {
      this.$store.commit('post/LIKE_POST', e)
      let url = `/v1/user/post/${e.post.id}/handle_like`
      await this.$axios.$post(url, {
        status: e.status
      })
    },
    onComment(index, post) {
      this.$store.commit('post/COMMENTED_POST', index)
    },
    async fetchSuggest(offset = 0, limit = 10) {
      this.suggest.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/suggestUser?offset=${offset}&limit=${limit}`
        )
        if (data.length) {
          this.suggest.users = [...this.suggest.users, ...data]
          this.suggest.offset = offset + limit
        }
      } catch (err) {
        this.toastError(err.toString())
      }
      this.suggest.loading = false
    },
    async fetchFollow(offset = 0, limit = 10) {
      this.follow.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/followUser?offset=${offset}&limit=${limit}`
        )
        if (data.length) {
          this.follow.users = [...this.follow.users, ...data]
          this.follow.offset = offset + limit
        }
      } catch (err) {
        this.toastError(err.toString())
      }
      this.follow.loading = false
    },
    onDeletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
    }
  }
}
</script>

<style lang="scss">
.home-sidebar-left {
  padding: 5px 10px;

  .home-sidebar-left-top {
    top: 0;
    left: 0;
    height: 50%;
    width: 100%;
    position: absolute;
    padding: 10px 0;

    .ps {
      height: 100%;
      padding: 5px;
    }
  }
  .home-sidebar-left-bottom {
    bottom: 0;
    left: 0;
    height: 50%;
    width: 100%;
    position: absolute;
    padding: 10px 0;
    .ps {
      height: 100%;
      padding: 5px;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.index-loading-cover {
  position: fixed;
  width: 100px;
  height: 100px;
  z-index: 2000;
  background: white;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  border: solid 1px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}
</style>
