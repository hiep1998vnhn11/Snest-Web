<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <layout-sidebar-share :background-color.sync="sidebarBackground">
    </layout-sidebar-share>

    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-end"
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <nuxt-link :to="localePath({ name: 'index' })" class="navbar-brand">
          <img src="/logo.png" />
        </nuxt-link>
      </div>

      <ul class="navbar-nav">
        <router-link
          class="nav-item"
          tag="li"
          :to="localePath({ name: 'register' })"
        >
          <a class="nav-link">
            <i class="tim-icons icon-laptop"></i>
            {{ $t('Register') }}
          </a>
        </router-link>

        <router-link
          class="nav-item"
          tag="li"
          :to="localePath({ name: 'login' })"
        >
          <a class="nav-link">
            <i class="tim-icons icon-single-02"></i>
            Login
          </a>
        </router-link>
      </ul>
    </base-nav>

    <div class="main-panel" :data="sidebarBackground">
      <div class="nonav-content guest">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <Nuxt></Nuxt>
        </zoom-center-transition>
      </div>
    </div>
  </div>
</template>
<script>
// import TopNavbar from "./TopNavbar.vue";
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    ZoomCenterTransition
  },
  middleware: 'guest',

  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page',
      sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
    }
  },
  computed: {
    title() {
      return `${this.$route.name} Page`
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
      this.showMenu = !this.showMenu
    },
    closeMenu() {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    },
    setPageClass() {
      this.pageClass = `${this.$route.name}-page`.toLowerCase()
    }
  },
  beforeDestroy() {
    this.closeMenu()
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu()
      setTimeout(() => {
        next()
      }, this.menuTransitionDuration)
    } else {
      next()
    }
  },
  mounted() {
    this.setPageClass()
  },
  watch: {
    $route() {
      this.setPageClass()
    }
  }
}
</script>
<style lang="scss">
.navbar.auth-navbar {
  top: 0;
}

$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}

.guest {
  background-image: url('/img/guest-background.jpeg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
