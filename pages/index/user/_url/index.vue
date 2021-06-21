<template>
  <div>
    <post-create
      v-if="user && currentUser && user.id === currentUser.id"
      class="mt-3"
    ></post-create>
    <loading-chasing :loading="loading"></loading-chasing>
    <div v-if="posts.length">
      <post
        :post="post"
        v-for="post in posts"
        :key="`user-param-post-${post.id}`"
        @deletePost="onDeletePost"
      ></post>
      <slide-y-down-transition>
        <observer v-if="!lastPost" @intersect="intersected"></observer>
        <div v-else>
          {{ $t('NotHavePostToFind') }}
        </div>
      </slide-y-down-transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      lastPost: false,
      loading: false,
      error: null,
      posts: [],
      observer: null,
      page: 1,
      filterDialog: false,
      year: null,
      years: Array.from(
        { length: 30 },
        (_, i) => -i + new Date().getFullYear()
      ),
      day: null,
      month: null,
      hoverFilter: false,
      hoverIntro: false,
      hoverFriend: false,
      months: [
        {
          text: this.$t('month.1'),
          value: 1
        },
        {
          text: this.$t('month.2'),
          value: 2
        },
        {
          text: this.$t('month.3'),
          value: 3
        },
        {
          text: this.$t('month.4'),
          value: 4
        },
        {
          text: this.$t('month.5'),
          value: 5
        },
        {
          text: this.$t('month.6'),
          value: 6
        },
        {
          text: this.$t('month.7'),
          value: 7
        },
        {
          text: this.$t('month.8'),
          value: 8
        },
        {
          text: this.$t('month.9'),
          value: 9
        },
        {
          text: this.$t('month.10'),
          value: 10
        },
        {
          text: this.$t('month.11'),
          value: 11
        },
        {
          text: this.$t('month.12'),
          value: 12
        }
      ],
      postedBy: null,
      privacy: null,
      privacys: [
        {
          value: 'public',
          text: this.$t('create_post.public')
        },
        {
          value: 'private',
          text: this.$t('create_post.private')
        },
        {
          value: 'friend',
          text: this.$t('create_post.friend')
        },
        {
          value: 'all',
          text: this.$t('All')
        }
      ]
    }
  },
  methods: {
    ...mapActions('post', ['getUserPost', 'setPage']),
    async fetchData() {
      const userUrl = this.$route.params.url
      let payload = {
        user_url: userUrl
      }
      this.error = null
      this.loading = true
      try {
        await this.getUserPost(payload)
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    async fetchPost(page = 1, url = '') {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          `/v1/user/${url}/get_post?page=${page}&limit=2`
        )
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
    intersected() {
      this.fetchPost(this.page, this.$route.params.url)
    },
    onClear() {
      this.year = this.postedBy = this.privacy = null
    },
    onDone() {
      this.filterDialog = false
    },
    async onLike(e) {
      console.log(e)
      this.$store.commit('post/LIKE_USER_POST', e)
      let url = `/v1/user/post/${e.post.id}/handle_like`
      await this.$axios.$post(url, {
        status: e.status
      })
    },
    onComment(index, post) {
      this.$store.commit('post/COMMENTED_USER_POST', index)
    },
    onDeletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
    }
  },
  created() {
    this.fetchPost(1, this.$route.params.url)
  },
  computed: {
    ...mapGetters('post', ['userPost']),
    ...mapGetters('user', ['currentUser', 'user']),
    days() {
      switch (this.month) {
        case 2:
          return Array.from({ length: 29 }, (_, i) => i + 1)
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return Array.from({ length: 31 }, (_, i) => i + 1)
        default:
          return Array.from({ length: 30 }, (_, i) => i + 1)
      }
    },
    elevationFilter() {
      return this.hoverFilter ? 12 : 3
    },
    elevationIntro() {
      return this.hoverIntro ? 12 : 3
    },
    elevationFriend() {
      return this.hoverFriend ? 12 : 3
    }
  }
}
</script>

<style lang="scss">
.test-loading {
  position: relative;
}
</style>
