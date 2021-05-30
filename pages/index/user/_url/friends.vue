<template>
  <card>
    <div class="flex-sb">
      <span class="font-weight-bold">{{ $t('profile.Friends') }}</span>
      <div>
        <base-search
          :placeholder="$t('SearchFriend')"
          @onSearch="searchFriend"
        ></base-search>
      </div>
    </div>
    <div class="">
      <el-tabs v-model="tab" @tab-click="handleClick">
        <el-tab-pane :label="$t('All')" name="all"></el-tab-pane>
        <el-tab-pane :label="$t('Requesting')" name="requesting"></el-tab-pane>
        <el-tab-pane :label="$t('Blocked')" name="blocked"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="position-relative">
      <loading-chasing :loading="loading"></loading-chasing>
      <slide-y-down-transition>
        <div v-if="friends.length" class="row">
          <div
            class="col col-3"
            v-for="friend in friends"
            :key="`friend-${type}-${friend.id}`"
          >
            <base-friend :friend="friend"></base-friend>
          </div>
        </div>
        <div v-else>
          Not have
        </div>
      </slide-y-down-transition>
      <slide-y-down-transition>
        <observer v-if="!lastFriend" @intersect="intersected"></observer>
        <div v-else>
          {{ $t('NotHaveFriendsToFind') }}
        </div>
      </slide-y-down-transition>
    </div>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
import { fetchUserFriend } from '@/api'
export default {
  data() {
    return {
      friendPrivacyDialog: false,
      loadingFriendPrivacy: false,
      changeFriendPrivacy: false,
      tab: 'all',
      items: ['all', 'recent', 'birthday', 'work', 'college', 'current city'],
      loading: false,
      expand: false,
      favorite: false,
      search: '',
      type: null,
      friends: [],
      page: 1,
      lastFriend: false
    }
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  created() {
    this.fetchFriend(1, this.$route.params.url)
  },
  methods: {
    async fetchFriend(page = 1, url = '', searchKey = null, type = null) {
      if (this.lastFriend) return
      this.loading = true
      try {
        this.search = searchKey
        this.type = type
        const response = await fetchUserFriend(
          url,
          page,
          this.search,
          this.type
        )
        if (page !== 1) {
          if (response.data.data.length) {
            this.friends = [...this.friends, ...response.data.data]
            this.page = page + 1
          } else {
            this.lastFriend = true
          }
        } else {
          this.friends = response.data.data
        }
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    onClickOutsideWithConditional() {
      this.expand = false
    },
    closeConditional(e) {
      return this.expand
    },
    handleClick() {
      this.fetchFriend(1, this.$route.params.url, this.search, this.tab)
    },
    onShowFriendTransition() {
      if (this.expand || this.loading) this.expand = !this.expand
      this.expand = this.loading = true
      const vm = this
      setTimeout(() => {
        vm.loading = false
      }, 3000)
    },
    onFavorite() {
      this.favorite = !this.favorite
    },
    onUnfriend() {},
    searchFriend(e) {
      this.fetchFriend(1, this.$route.params.url, e.trim())
    },
    intersected() {
      this.fetchFriend(this.page, this.$route.params.url)
    }
  }
}
</script>
<style scoped>
.show-friend-bar {
  position: absolute;
  z-index: 100;
  top: 100px;
  right: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
  position: absolute;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
