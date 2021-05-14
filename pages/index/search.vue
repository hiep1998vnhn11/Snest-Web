<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      bottom
      width="22rem"
      fixed
      app
    >
      <template v-slot:prepend>
        <v-sheet class="mt-3">
          <h2>
            {{ $t('SearchResultFor') }}
          </h2>
          {{ $route.query.search_key }}
          <v-divider class="mx-4" />
        </v-sheet>
      </template>
      <v-container>
        <v-btn
          v-for="item in searchLink"
          :key="`search-link-${item.text}`"
          class="text-capitalize mt-1"
          large
          block
          text
          active-class="primary--text"
          :to="localePath({ name: item.name, query: $route.query })"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-btn>
      </v-container>
    </v-navigation-drawer>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  data() {
    const _this = this
    return {
      drawer: null,
      searchLink: [
        {
          icon: 'mdi-dock-top',
          text: _this.$t('All'),
          name: 'index-search-top'
        },
        {
          icon: 'mdi-dock-top',
          text: _this.$t('Posts'),
          name: 'index-search-posts'
        },
        {
          icon: 'mdi-dock-top',
          text: _this.$t('People'),
          name: 'index-search-people'
        }
      ]
    }
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {}
}
</script>
<style scoped></style>
