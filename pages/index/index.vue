<template>
  <div>
    <!-- sidebar left -->
    <side-bar
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
      home
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: $t('Dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: localePath({ name: 'admin' })
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.icons'),
            icon: 'tim-icons icon-atom',
            path: localePath({ name: 'admin-icon' })
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.maps'),
            icon: 'tim-icons icon-pin',
            path: localePath({ name: 'admin-goole' })
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.notifications'),
            icon: 'tim-icons icon-bell-55',
            path: localePath({ name: 'admin-notifications' })
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.userProfile'),
            icon: 'tim-icons icon-single-02',
            path: localePath({ name: 'admin-user' })
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.regularTables'),
            icon: 'tim-icons icon-puzzle-10',
            path: localePath({ name: 'admin-regular' })
          }"
        ></sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.typography'),
            icon: 'tim-icons icon-align-center',
            path: localePath({ name: 'admin-typography' })
          }"
        ></sidebar-item>
      </template>
    </side-bar>
    <div class="home-container">
      <!-- sidebar right -->
      <div width="22rem" style="z-index: 3; overflow: hidden;">
        <!-- Default temblade -->
        <div>
          <div class="trending-card">
            <div class="box">
              <h2>
                {{ $t('Trending') }}
                <div class="description">
                  {{ $t('TrendingDescription') }}
                </div>
              </h2>

              <div class="content">
                <transition name="slide-fade">
                  <table>
                    <tr>
                      <th>Tops</th>
                      <th>Tag</th>
                      <th>Counts</th>
                    </tr>
                    <tr
                      v-for="(value, index) in sortedTrending"
                      :key="value[0]"
                    >
                      <th>{{ index + 1 }}</th>
                      <th>
                        #
                        <nuxt-link
                          custom
                          :to="
                            localePath({
                              name: 'index-search-top',
                              query: { search_key: value[0] }
                            })
                          "
                          v-slot="{ href, navigate }"
                        >
                          <a
                            :href="href"
                            @click="navigate"
                            class="text-decoration-none"
                          >
                            {{ value[0] }}
                          </a>
                        </nuxt-link>
                      </th>
                      <th>{{ value[1] }}</th>
                    </tr>
                  </table>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <slider></slider>
        <post-create :loading="loading_user"></post-create>
      </div>
      <div class="mt-3" v-if="posts.length">
        <post
          class="mt-3"
          v-for="(post, index) in posts"
          :key="`post-component-feed-${index}`"
          :post="post"
          :index="index"
        ></post>
      </div>
      <!-- <observer @intersect="intersected"></observer> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  props: ['loading_user'],
  head() {
    return {
      title: this.isLoggedIn ? 'Home' : 'Login'
    }
  },
  middleware: 'auth',
  computed: {
    ...mapGetters('post', ['posts']),
    ...mapGetters('user', ['currentUser', 'friends', 'isLoggedIn']),
    ...mapGetters('app', ['trending']),
    sortedTrending() {
      return Object.entries(this.trending).sort(([, a], [, b]) => b - a)
    }
  },
  data() {
    return {
      loading: false,
      loadingFriend: false,
      loadingTrending: false,
      error: null,
      drawer: null
    }
  },
  mounted() {
    if (!this.friends.length && this.isLoggedIn) this.fetchFriend()
    this.fetchTrending()
  },
  methods: {
    ...mapActions('post', ['getPost', 'setFeedPage']),
    ...mapActions('user', ['getUser', 'getFriend']),
    ...mapActions('app', ['setMini', 'setDrawer']),
    ...mapActions('socket', ['connectSocket']),
    ...mapActions('message', ['getThreshByUser']),
    ...mapActions('app', ['getTrending']),
    async fetchTrending() {
      this.loadingTrending = true
      try {
        await this.getTrending()
      } catch (err) {
        this.error = err.response ? err.response.data.message : err.toString()
      }
      this.loadingTrending = false
    },
    async fetchFriend() {
      this.loadingFriend = true
      this.error = null
      try {
        await this.getFriend()
      } catch (err) {
        this.error = err.response.data.message
      }
      this.loadingFriend = false
    },
    async onClickFriend(user) {
      try {
        await this.getThreshByUser(user)
      } catch (err) {
        this.$nuxt.error(err)
      }
    },
    async fetchData() {
      this.error = null
      this.loading = true
      try {
        await this.getPost()
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    intersected() {
      this.fetchData()
    },
    async onLike(e) {
      console.log(e)
      this.$store.commit('post/LIKE_POST', e)
      let url = `/v1/user/post/${e.post.id}/handle_like`
      await axios.post(url, {
        status: e.status
      })
    },
    onComment(index, post) {
      this.$store.commit('post/COMMENTED_POST', index)
    }
  }
}
</script>

<style lang="scss">
.sidebar-container-scroll {
  overflow-y: hidden;
  height: 100%;
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
/* .slide-fade-leave-active below version 2.1.8 */
.trending-card {
  position: relative;
  height: 400px;
  .box {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    transition: 0.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    &:hover {
      transition: 0.5s ease-in-out;
      transform: translateY(-10px);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);
      .content {
        display: flex;
      }
      h2 {
        opacity: 0.8;
        z-index: 10;
        transform: translateY(calc(-180px + 50%));
        font-size: 1.8rem;
        transition: 0.5s ease-in-out;
        .description {
          opacity: 1;
        }
      }
    }
    h2 {
      position: absolute;
      opacity: 0.2;
      font-size: 3rem;
      font-weight: 900;
      transition: 0.5s ease-in-out;
      text-align: center;
      .description {
        font-size: 1rem;
        font-weight: 500;
        transition: 0.5s ease-in-out;
        opacity: 0;
      }
    }

    .content {
      position: absolute;
      bottom: 0px;
      text-align: center;
      h3 {
        font-size: 1.8rem;
        z-index: 1000;
        color: rgba(255, 255, 255, 0.5);
        transition: 0.5%;
      }
      p {
        font-size: 1rem;
        z-index: 1000;
        transition: 0.5%;
      }
    }
  }
}
.suggestion-card {
  position: relative;
  height: 300px;
  bottom: 0px;
  .box {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    transition: 0.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    &:hover {
      transition: 0.5s ease-in-out;
      transform: translateY(-10px);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);
      h2 {
        opacity: 0.8;
        transform: translateY(calc(-130px + 50%));
        font-size: 1.8rem;
        transition: 0.5s ease-in-out;
      }
      .content {
        transform: translateY(20px);
        transition: 0.5s ease-in-out;
      }
    }
    h2 {
      position: absolute;
      opacity: 0.2;
      font-size: 3rem;
      font-weight: 900;
      transition: 0.5s ease-in-out;
    }
    .content {
      text-align: center;
      transition: 0.5s ease-in-out;
      width: 100%;
      padding: 10px;
      h3 {
        font-size: 1.225rem;
        z-index: 1000;
        color: rgba(255, 255, 255, 0.5);
        transition: 0.5%;
      }
      p {
        font-size: 1rem;
        z-index: 1000;
        transition: 0.5%;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
