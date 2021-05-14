.<template>
  <div>
    <profile-header
      :user="paramUser"
      :loading="loading"
      class="index-3"
      @changed-avatar="fetchData(true)"
      @changed-background="fetchData(true)"
      @changed-status-friend="changeStatusFriend"
    ></profile-header>
    <nuxt-child :user="paramUser" :loadingUser="loading"></nuxt-child>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: this.loading
        ? 'Loading |'
        : this.paramUser
        ? `${this.paramUser.name} |`
        : 'Loading User |'
    }
  },
  data() {
    return {
      paramUser: null,
      loading: false
    }
  },
  async created() {
    if (!this.paramUser) this.fetchData()
  },
  watch: {
    '$route.params': 'fetchData'
  },
  computed: mapGetters('user', ['isLoggedIn']),
  methods: {
    async fetchData(reload) {
      const userUrl = this.$route.params.url
      if (this.paramUser && userUrl === this.paramUser.url && reload !== true) {
        return
      }
      this.loading = true
      try {
        const url = this.isLoggedIn ? '/v1/user/get_user' : '/v1/guest/user/get'
        const response = await axios.get(url, {
          params: {
            user_url: userUrl
          }
        })
        this.paramUser = response.data.data
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
