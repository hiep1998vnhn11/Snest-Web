<template>
  <div>
    <v-navigation-drawer v-model="drawer" width="22rem" app clipped>
      <template v-slot:prepend>
        <v-toolbar class="font-weight-black elevation-0">
          Message
          <v-spacer />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined icon text class="mr-3" v-bind="attrs" v-on="on">
                <v-icon>mdi-cog-outline</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('common.setting') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                icon
                text
                v-bind="attrs"
                v-on="on"
                :to="localePath({ name: 'messages-new' })"
              >
                <v-icon>mdi-lead-pencil</v-icon>
              </v-btn>
            </template>
            <span>New message</span>
          </v-tooltip>
        </v-toolbar>
        <v-toolbar class="elevation-0">
          <v-btn
            class="grey lighten-3 mr-1 ml-0"
            icon
            text
            small
            @click="onBlurSearch"
            v-if="selectSearch"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            rounded
            autocomplete="off"
            class="grey lighten-3"
            label="Search"
            single-line
            hide-details
            large
            @focus="onEmitSearch"
          >
            <template v-slot:prepend-inner>
              <v-icon class="ml-n4">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-toolbar>
        <v-divider />
      </template>
      <div class="sidebar-container-scroll">
        <message-list-thresh />
      </div>
    </v-navigation-drawer>
    <v-container>
      <nuxt-child />
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
<style lang="scss" scoped>
.message-sidebar-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  overflow-y: hidden;
  &:hover {
    overflow-y: auto;
  }
  &::-webkit-scrollbar {
    width: 0.35rem;
  }
  &::-webkit-scrollbar-track {
    background: white;
    -webkit-border-radius: 10px;
    border-radius: 25px;
    padding: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #9c27b0;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
}
</style>
