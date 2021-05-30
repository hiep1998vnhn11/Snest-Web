<template>
  <nuxt-child :key="$route.fullPath" />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'messages',
  data() {
    return {
      drawer: null,
      search: '',
      selectSearch: false
    }
  },
  computed: {
    ...mapGetters('thresh', ['threshes'])
  },
  methods: {
    ...mapActions('message', ['getRoom', 'getMessage']),
    ...mapActions('thresh', ['getThreshes', 'setThreshPage']),
    async fetchThresh() {
      if (this.threshes.length) return
      this.loading = true
      this.error = null
      try {
        await this.getThreshes()
      } catch (err) {
        this.error = err.response.data.message
      }
      this.loading = false
    },
    async fetchFriend(searchKey) {
      this.loadingSearch = true
      try {
        const response = await axios.post('/v1/user/friend/get', {
          search_key: searchKey
        })
        this.friends = response.data.data
      } catch (err) {
        this.errorSearch = err.response.data.message
      }
      this.loadingSearch = false
    },
    onEmitSearch() {
      this.selectSearch = true
      this.fetchFriend()
    },
    onBlurSearch() {
      this.selectSearch = false
      this.friends = []
    },
    onClickOption(roomId) {
      console.log(roomId)
    },
    intersected() {
      this.fetchThresh()
    },
    convertInfo() {
      this.convert = !this.convert
    },
    onClickSearchResult(user) {
      console.log(user)
    }
  },
  mounted() {
    if (!this.threshes.length) this.fetchThresh()
  }
}
</script>
