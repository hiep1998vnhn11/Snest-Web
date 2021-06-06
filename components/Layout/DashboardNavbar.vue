<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div slot="brand" class="navbar-wrapper">
        <nuxt-link :to="localePath({ name: 'index' })" class="navbar-brand">
          <img src="/logo.png" />
        </nuxt-link>
      </div>
    </div>

    <ul class="navbar-nav ml-auto">
      <div class="search-bar input-group" @click="searchModalVisible = true">
        <button
          class="btn btn-link"
          id="search-button"
          data-toggle="modal"
          data-target="#searchModal"
        >
          <i class="tim-icons icon-zoom-split"></i>
        </button>
        <!-- You can choose types of search input -->
      </div>
      <modal
        :show.sync="searchModalVisible"
        class="modal-search"
        id="searchModal"
        :centered="false"
        :show-close="true"
      >
        <input
          slot="header"
          v-model="searchQuery"
          type="text"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="SEARCH"
        />
      </modal>
      <base-dropdown
        tag="li"
        menu-on-right
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
        @change="onChaneNotificationDropdown"
      >
        <template slot="title">
          <slide-y-down-transition>
            <div
              class="notification d-none d-lg-block d-xl-block"
              v-if="notification.unread"
            ></div>
          </slide-y-down-transition>
          <i class="tim-icons icon-bell-55"></i>
          <p class="d-lg-none">
            {{ $t('Notifications') }}
          </p>
        </template>
        <div class="scroll-dropdown-container">
          <div class="scroll-header">
            <div class="title">
              {{ $t('Notifications') }}
            </div>
            <nuxt-link :to="localePath({ name: 'messages-room_id' })">
              <base-button icon round size="sm" class="icon">
                <i class="tim-icons icon-alert-circle-exc"></i>
              </base-button>
            </nuxt-link>
          </div>
          <perfect-scrollbar>
            <loading-chasing :loading="notification.loading"></loading-chasing>
            <li
              class="nav-link"
              v-for="notification in notification.list"
              :key="`notification-${notification.id}`"
            >
              <router-link
                v-if="
                  notification.data.type === 'post' &&
                    notification.type == 'App\\Notifications\\LikeNotification'
                "
                :to="
                  localePath({
                    name: 'index-post-post_id',
                    params: { post_id: notification.data.id }
                  })
                "
                class="nav-item dropdown-item"
              >
                {{ notification.data.username }}
                <span v-show="notification.data.likes_count > 1">
                  {{ $t('And') }} {{ notification.data.likes_count - 1 }}
                  {{ $t('Peoples') }}
                </span>
                {{ $t('LikeYourPost') }}
                {{ notification.type }}
              </router-link>
            </li>
          </perfect-scrollbar>
        </div>
      </base-dropdown>
      <base-dropdown
        tag="li"
        menu-on-right
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
        @change="onChangeMessageDropdown"
      >
        <loading-chasing :loading="loading"></loading-chasing>
        <template slot="title">
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-chat-33"></i>
          <p class="d-lg-none">Messages</p>
        </template>
        <div class="scroll-dropdown-container">
          <div class="scroll-header">
            <div class="title">
              {{ $t('Messages') }}
            </div>
            <nuxt-link :to="localePath({ name: 'messages' })">
              <base-button icon round size="sm" class="icon">
                <i class="tim-icons icon-bullet-list-67"></i>
              </base-button>
            </nuxt-link>
          </div>
          <perfect-scrollbar>
            {{ rooms }}
            <li class="nav-link">
              <a href="#" class="nav-item dropdown-item">
                Mike John responded to your email
              </a>
            </li>
          </perfect-scrollbar>
        </div>
      </base-dropdown>
      <base-dropdown
        tag="li"
        menu-on-right
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template slot="title">
          <div class="photo">
            <img :src="currentUser.profile_photo_path" />
          </div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">
            {{ currentUser.firstName }}
          </p>
        </template>
        <li class="nav-link">
          <nuxt-link
            :to="
              localePath({
                name: 'index-user-url',
                params: { url: currentUser.url }
              })
            "
            class="nav-item dropdown-item"
          >
            {{ $t('Profile') }}
          </nuxt-link>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Settings</a>
        </li>
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <nuxt-link
            :to="localePath({ name: 'logout' })"
            class="nav-item dropdown-item"
          >
            {{ $t('common.Logout') }}
          </nuxt-link>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    CollapseTransition
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('thresh', ['rooms'])
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      notification: {
        unread: 0,
        loading: false,
        list: []
      },
      loading: false
    }
  },
  methods: {
    ...mapActions('thresh', ['getRooms']),
    async fetchRooms() {
      this.loading = true
      try {
        await this.getRooms()
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    closeDropDown() {
      this.activeNotifications = false
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    async getNumberUnreadNotification() {
      try {
        const { data } = await this.$axios.$get(
          '/v1/user/notification/number_unread'
        )
        this.notification.unread = data
      } catch (err) {
        this.toastError(err.toString())
      }
    },
    async getNotifications() {
      if (!this.notification.unread) return
      this.notification.loading = true
      try {
        const { data } = await this.$axios.$get('/v1/user/notification/get')
        this.notification.list = data
        this.notification.unread = 0
      } catch (err) {
        this.toastError(err.toString())
      }
      this.notification.loading = false
    },
    onChaneNotificationDropdown(isOpen) {
      if (!isOpen) return
      this.getNotifications()
      this.notification.unread = 0
    },
    onChangeMessageDropdown(isOpen) {
      if (!isOpen || this.rooms.length) return
      this.fetchRooms()
    }
  },
  mounted() {
    this.getNumberUnreadNotification()
  }
}
</script>
<style lang="scss" scoped>
.top-navbar {
  top: 0px;
}

#message-dropdown-container {
}

.scroll-dropdown-container {
  height: 600px;
  min-width: 300px;
  position: relative;
  padding-top: 50px;
  .scroll-header {
    display: flex;
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    .title {
      font-weight: bold;
    }
    .icon {
      padding-top: 3px;

      font-size: 1.2rem;
    }
  }
  .ps {
    height: 100%;
  }
}
</style>
