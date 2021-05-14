<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-skeleton-loader
        v-if="loadingUser"
        class="mx-auto mt-3"
        type="card"
      ></v-skeleton-loader>
      <div v-else>
        <base-user-info v-if="!!user && !!currentUser" :user="user" />
        <base-user-friend v-if="user != null" :user="user"></base-user-friend>
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <v-skeleton-loader
        v-if="loadingUser"
        class="mx-auto mt-3"
        type="card"
      ></v-skeleton-loader>
      <post-create
        v-else-if="!!user && !!currentUser && user.id === currentUser.id"
        class="mt-3"
      ></post-create>

      <v-skeleton-loader
        v-if="loadingUser"
        class="mx-auto mt-3"
        type="card"
      ></v-skeleton-loader>
      <v-card
        v-else
        :class="`mt-3 rounded-lg hover-up-half elevation-${elevationFilter}`"
        tile
        @mouseleave="hoverFilter = false"
        @mouseenter="hoverFilter = true"
        outlined
      >
        <v-card-title class="font-weight-bold">
          {{ $t('Posts') }}
          <v-spacer />
          <v-btn
            class="text-capitalize mr-2 primary--text rounded-lg"
            outlined
            text
            @click="filterDialog = true"
          >
            <v-icon class="ml-n3 mr-2">mdi-filter</v-icon>
            {{ $t('profile.Filters') }}
          </v-btn>
          <v-btn class="text-capitalize danger--text rounded-lg" outlined text>
            <v-icon class="ml-n3 mr-2">mdi-cog</v-icon>
            {{ $t('profile.ManagePosts') }}
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-row no-gutters class="pa-1">
          <v-col cols="6">
            <v-btn
              class="text-capitalize"
              block
              text
              :to="localePath({ name: 'index-user-url' })"
              active-class="primary--text"
            >
              <v-icon class="mr-3">mdi-view-list</v-icon>
              {{ $t('profile.ListView') }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn class="text-capitalize" block text>
              <v-icon class="mr-3">mdi-view-grid</v-icon>
              {{ $t('profile.GridView') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <div v-if="userPost.length">
        <post-component
          class="mt-3"
          v-for="(post, index) in userPost"
          :key="`user-post-${post.id}`"
          :post="post"
          :index="index"
          @onLike="onLike"
          @onSubComment="onComment(index, post)"
          @onComment="onComment(index, post)"
        ></post-component>
      </div>
      <observer @intersect="intersected"></observer>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto mt-3"
        type="card"
      ></v-skeleton-loader>
    </v-col>

    <v-dialog width="600" v-model="filterDialog">
      <v-card>
        <v-card-title class="font-weight-bold">
          <v-spacer />
          {{ $t('profile.PostFilters') }}
          <v-spacer />
          <v-btn icon class="pink lighten-5" @click="filterDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-container class="text-body-1">
          <div class="font-weight-bold">
            {{ $t('profile.UseFilters') }}
          </div>
          <div class="text-caption">
            {{ $t('profile.UseFiltersCaption') }}
          </div>
          <v-row>
            <v-col cols="3" class="my-auto">
              {{ $t('profile.GoTo') }}
            </v-col>
            <v-col cols="3">
              <v-select v-model="year" :items="years" dense></v-select>
            </v-col>
            <v-col cols="3" v-show="year">
              <v-select v-model="month" :items="months" dense></v-select>
            </v-col>
            <v-col cols="3" v-show="year && month">
              <v-select v-model="day" :items="days" dense></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="my-auto">
              {{ $t('profile.Privacy') }}
            </v-col>
            <v-col cols="3">
              <v-select v-model="privacy" :items="privacys" dense></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn class="text-capitalize pink lighten-5" text @click="onClear">
            {{ $t('Clear') }}
          </v-btn>
          <v-btn
            class="text-capitalize primary"
            text
            @click="filterDialog = false"
          >
            {{ $t('Done') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  props: ['user', 'loadingUser'],
  data() {
    return {
      loading: false,
      error: null,
      posts: null,
      observer: null,
      page: 1,
      filterDialog: false,
      year: null,
      years: Array.from(
        { length: 30 },
        (_, i) => -i + new Date().getFullYear()
      ),
      day: null,
      month: null,
      hoverFilter: false,
      hoverIntro: false,
      hoverFriend: false,
      months: [
        {
          text: this.$t('month.1'),
          value: 1
        },
        {
          text: this.$t('month.2'),
          value: 2
        },
        {
          text: this.$t('month.3'),
          value: 3
        },
        {
          text: this.$t('month.4'),
          value: 4
        },
        {
          text: this.$t('month.5'),
          value: 5
        },
        {
          text: this.$t('month.6'),
          value: 6
        },
        {
          text: this.$t('month.7'),
          value: 7
        },
        {
          text: this.$t('month.8'),
          value: 8
        },
        {
          text: this.$t('month.9'),
          value: 9
        },
        {
          text: this.$t('month.10'),
          value: 10
        },
        {
          text: this.$t('month.11'),
          value: 11
        },
        {
          text: this.$t('month.12'),
          value: 12
        }
      ],
      postedBy: null,
      privacy: null,
      privacys: [
        {
          value: 'public',
          text: this.$t('create_post.public')
        },
        {
          value: 'private',
          text: this.$t('create_post.private')
        },
        {
          value: 'friend',
          text: this.$t('create_post.friend')
        },
        {
          value: 'all',
          text: this.$t('All')
        }
      ]
    }
  },
  methods: {
    ...mapActions('post', ['getUserPost', 'setPage']),
    async fetchData() {
      const userUrl = this.$route.params.url
      let payload = {
        user_url: userUrl
      }
      this.error = null
      this.loading = true
      try {
        await this.getUserPost(payload)
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    intersected() {
      this.fetchData()
    },
    onClear() {
      this.year = this.postedBy = this.privacy = null
    },
    onDone() {
      this.filterDialog = false
    },
    async onLike(e) {
      console.log(e)
      this.$store.commit('post/LIKE_USER_POST', e)
      let url = `/v1/user/post/${e.post.id}/handle_like`
      await axios.post(url, {
        status: e.status
      })
    },
    onComment(index, post) {
      this.$store.commit('post/COMMENTED_USER_POST', index)
    }
  },
  computed: {
    ...mapGetters('post', ['userPost']),
    ...mapGetters('user', ['currentUser']),
    days() {
      switch (this.month) {
        case 2:
          return Array.from({ length: 29 }, (_, i) => i + 1)
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return Array.from({ length: 31 }, (_, i) => i + 1)
        default:
          return Array.from({ length: 30 }, (_, i) => i + 1)
      }
    },
    elevationFilter() {
      return this.hoverFilter ? 12 : 3
    },
    elevationIntro() {
      return this.hoverIntro ? 12 : 3
    },
    elevationFriend() {
      return this.hoverFriend ? 12 : 3
    }
  },
  watch: {
    '$route.params': function() {
      this.setPage()
    }
  }
}
</script>

<style scoped></style>
