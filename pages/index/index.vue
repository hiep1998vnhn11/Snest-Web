<template>
  <div>
    <!-- sidebar left -->
    <side-bar home backgroundColor="white" class="home-sidebar-left">
      <div class="home-sidebar-left-top">
        <perfect-scrollbar>
          <user-button
            :profile_photo_path="currentUser.profile_photo_path"
            :user_name="currentUser.full_name"
            :user_url="currentUser.url"
            v-for="n in 10"
            :key="n"
          ></user-button>
        </perfect-scrollbar>
      </div>
      <div class="home-sidebar-left-bottom">
        <perfect-scrollbar>
          <user-button
            :profile_photo_path="currentUser.profile_photo_path"
            :user_name="currentUser.full_name"
            :user_url="currentUser.url"
            v-for="n in 10"
            :key="n"
          ></user-button>
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
        <div class="mt-3" v-if="posts.length">
          <post
            class="mt-3"
            v-for="(post, index) in posts"
            :key="`post-component-feed-${index}`"
            :post="post"
            :index="index"
            :like_status="post.like_status"
          ></post>
        </div>
      </div>
      <!-- <observer @intersect="intersected"></observer> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { fetchFeedPost } from '@/api'
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
      offset: 0
    }
  },
  mounted() {
    this.fetchPost(1)
    // if (!this.friends.length && this.isLoggedIn) this.fetchFriend()
    // this.fetchTrending()
  },
  methods: {
    ...mapActions('post', ['getPost', 'setFeedPage']),
    ...mapActions('user', ['getUser', 'getFriend']),
    ...mapActions('app', ['setMini', 'setDrawer']),
    ...mapActions('socket', ['connectSocket']),
    ...mapActions('message', ['getThreshByUser']),
    ...mapActions('app', ['getTrending']),
    onCreatedPost(post) {
      this.posts.unshift(post)
    },
    async fetchPost(page = 1) {
      if (this.lastPost) return
      this.loading = true
      try {
        const { data } = await fetchFeedPost(page)
        if (data.data.length) {
          this.posts = [...this.posts, ...data.data]
          this.page = page + 1
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
        this.error = err.response ? err.response.data.message : err.toString()
      }
      this.loadingTrending = false
    },
    async fetchFriend() {
      this.loadingFriend = true
      this.error = null
      try {
        await this.getFriend()
      } catch (err) {
        this.error = err.response.data.message
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
      this.fetchData(this.page)
    },
    async onLike(e) {
      console.log(e)
      this.$store.commit('post/LIKE_POST', e)
      let url = `/v1/user/post/${e.post.id}/handle_like`
      await this.$axios.$post(url, {
        status: e.status
      })
    },
    onComment(index, post) {
      this.$store.commit('post/COMMENTED_POST', index)
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
</style>
