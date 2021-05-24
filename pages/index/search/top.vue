<template>
  <v-skeleton-loader
    class="mx-auto"
    type="card"
    v-if="loading"
  ></v-skeleton-loader>
  <div v-else>
    {{ searchResult }}
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapActions('app', ['search']),
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        await this.search({
          search_key: this.$route.query.search_key,
          history: true
        })
      } catch (err) {
        this.error = err.response ? err.response.data.message : err.toString()
      }
      this.loading = false
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters('app', ['searchResult'])
  }
}
</script>
<style scoped></style>
