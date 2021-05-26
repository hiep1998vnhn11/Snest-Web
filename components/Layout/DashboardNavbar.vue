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
      >
        <template slot="title">
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-sound-wave"></i>
          <p class="d-lg-none">New Notifications</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Mike John responded to your email</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Your friend Michael is in town</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another notification</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another one</a>
        </li>
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
            <img :src="currentUser.info.profile_photo_path" />
          </div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="">
            <nuxt-link :to="localePath({ name: 'logout' })" class="d-lg-none">
              {{ $t('common.Logout') }}
            </nuxt-link>
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
import { mapGetters } from 'vuex'
export default {
  components: {
    CollapseTransition
  },
  computed: {
    routeName() {
      const { path } = this.$route
      let parts = path.split('/')
      if (parts == ',') {
        return 'Dashboard'
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ')
    },
    ...mapGetters('user', ['currentUser'])
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    }
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
