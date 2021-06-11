<template>
  <div class="message-sidebar-left">
    <aside :class="{ fixed: true }" @click.stop>
      <loading-chasing :loading="loading"></loading-chasing>
      <perfect-scrollbar @ps-scroll-y="handleScroll" ref="scrollbar">
        <div class="header" :class="{ 'is-sticky': isSticky }">
          <div class="logo">
            <nuxt-link :to="localePath({ name: 'index' })" class="navbar-brand">
              <img src="/logo.png" />
            </nuxt-link>
          </div>
          <div class="title">
            <span>
              {{ $t('Search') }}
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
            <div class="search-bar">
              <div class="search">
                <i class="tim-icons icon-zoom-split"></i>
                <input
                  type="text"
                  :placeholder="$t('Search')"
                  v-model="search"
                />
              </div>
            </div>
          </div>
          <hr class="my-1" />
          <button class="btn btn-block btn-outline-danger btn-neutral">
            123
          </button>
          <button class="btn btn-block btn-outline-danger btn-neutral">
            123
          </button>
          <button class="btn btn-block btn-outline-danger btn-neutral">
            123
          </button>
        </div>
      </perfect-scrollbar>
    </aside>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  data() {
    return {
      isSticky: true,
      offset: 0,
      search: '',
      lastRoom: false,
      loading: false,
      rooms: []
    }
  },
  methods: {
    handleScroll(e) {
      const target = e.target
      if (target.scrollTop > 10) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    },
    async fetchRoom(offset = 0, searchKey = null) {
      this.loading = true
      try {
        let url = `/v1/user/room?limit=10`
        if (offset) url += `&offset=${offset}`
        if (searchKey) url += `&search_key=${searchKey}`
        const { data } = await this.$axios.$get(url)
        if (!data.length) return
        if (offset === 0) this.rooms = data
        else this.rooms = [...this.rooms, ...data]
        this.offset = offset + 10
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    }
  },
  watch: {
    search: {
      handler: debounce(function(value) {
        this.fetchRoom(0, value)
      }, 500),
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  flex: 1 1;
  margin-left: 10px;
  .search {
    padding: 7px 10px;
    background: rgba(0, 0, 0, 0.05);
    max-width: 540px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    &:focus-within {
      background: #fff;
    }
    i {
      font-size: 20px;
      color: #444;
      padding-right: 8px;
      margin-top: 5px;
    }
    input {
      background: transparent !important;
      outline: none !important;
      border: none !important;
      color: #444;
      font-size: 15px;
      width: 100%;
      display: block;
    }
  }
}
</style>
