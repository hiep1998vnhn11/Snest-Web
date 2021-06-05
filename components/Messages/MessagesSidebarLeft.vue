<template>
  <div class="message-sidebar-left">
    <aside :class="{ fixed: true }" @click.stop>
      <perfect-scrollbar @ps-scroll-y="handleScroll" ref="scrollbar">
        <div class="header" :class="{ 'is-sticky': isSticky }">
          <div class="logo">
            <nuxt-link :to="localePath({ name: 'index' })" class="navbar-brand">
              <img src="/logo.png" />
            </nuxt-link>
          </div>
          <div class="title">
            <span>
              {{ $t('Chats') }}
            </span>
            <base-button icon round>
              <i class="tim-icons icon-double-right"></i>
            </base-button>
          </div>
          <div class="tab">
            <button class="btn btn-success current">
              Danh sách phát
            </button>
            <button class="btn btn-neutral">
              Nghe gần đây
            </button>
          </div>
          <div class="search">
            <base-search
              :placeholder="$t('SearchMessage')"
              @onSearch="onSearch"
            ></base-search>
          </div>
          <hr class="my-1" />
        </div>
        <div class="playlist">
          <div class="list" ref="recent">
            <div v-for="room in rooms" :key="`message-button-room-${room.id}`">
              <messages-user :user="room"></messages-user>
            </div>
            <messages-user :user="currentUser"></messages-user>
          </div>
        </div>
      </perfect-scrollbar>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {},
  data() {
    return {
      isSticky: true,
      page: 1,
      search: '',
      rooms: [],
      lastRoom: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('thresh', ['threshes']),
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    ...mapActions('thresh', ['getThreshes', 'setThreshPage']),
    handleScroll(e) {
      const target = e.target
      if (target.scrollTop > 10) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    },

    async fetchRoom(page = 1, searchKey = null) {
      this.search = searchKey || ''
      this.loading = true
      try {
        let requestUrl = `/v1/user/room/get?limit=12&page=${page}`
        if (searchKey) requestUrl += `&search_key=${searchKey}`
        const { data } = await this.$axios.$get(requestUrl)
        if (page == 1) {
          this.rooms = data.data
        } else {
          if (data.data.length) {
            this.rooms = [...this.rooms, ...data.data]
          } else {
            this.lastRoom = true
          }
        }
        this.page = page + 1
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },

    onSearch(e) {
      this.fetchRoom(1, e.trim())
    },

    async fetchThresh() {
      if (this.threshes.length) return
      this.loading = true
      try {
        await this.getThreshes()
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    }
  },
  created() {
    this.fetchThresh()
  }
}
</script>

<style lang="scss" scoped></style>
