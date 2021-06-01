.<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <user-card :user="user"> </user-card>
          <!-- <user-edit :user="user"> </user-edit> -->
          <nuxt-child></nuxt-child>
        </div>
        <div class="col-md-4">
          <user-intro :user="user" />
          <user-friend :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  async fetch({ params, store, error }) {
    try {
      await store.dispatch('user/fetchUserParam', params.url)
    } catch (err) {
      error(err)
    }
  },
  head() {
    return {
      title: this.user?.full_name || 'Loading'
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      posts: []
    }
  },
  computed: mapGetters('user', ['isLoggedIn', 'user', 'currentUser']),
  methods: {
    async fetchData(reload) {
      const userUrl = this.$route.params.url
      if (this.paramUser && userUrl === this.paramUser.url && reload !== true) {
        return
      }
      this.loading = true
      try {
        const url = this.isLoggedIn ? '/v1/user/get_user' : '/v1/guest/user/get'
        const response = await this.$axiox.$get(url, {
          params: {
            user_url: userUrl
          }
        })
        this.paramUser = response.data
      } catch (err) {
        this.$nuxt.error(err)
        this.paramUser = null
      }
      this.loading = false
    },

    changeStatusFriend(e) {
      console.log(e)
      this.paramUser.myRElation = e
    },
    changeStatusFriendDenied() {
      this.paramUser.friend_status = 0
    },
    changeStatusFriendAdded() {
      this.paramUser.friend_status = 4
    }
  }
}
</script>

<style>
.index-3 {
  z-index: 3;
}
</style>
