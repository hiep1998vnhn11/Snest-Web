.<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <user-card :user="user"> </user-card>
          <nuxt-child></nuxt-child>
        </div>
        <div class="col-md-4">
          <user-intro :user="user" />
          <user-action
            :user="user"
            :friendStatus="friendStatus"
            :followStatus="followStatus"
            :friendRequest="friendRequest"
            v-if="$route.params.url !== currentUser.url"
          ></user-action>
          <user-friend :friends="friends" :friends_count="user.friends_count" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData({ params, $axios, error }) {
    const url = params.url
    try {
      const response = await $axios.$get(`/v1/guest/user/${url}`)
      return {
        user: response.data.user,
        friends: response.data.friends,
        friendStatus: response.data.friend_status || { status: 0 },
        followStatus: response.data.follow_status || { status: 0 },
        friendRequest: response.data.friend_request || null
      }
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
  computed: mapGetters('user', ['isLoggedIn', 'currentUser']),
  methods: {
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
