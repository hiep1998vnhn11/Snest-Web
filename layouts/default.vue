<template>
  <div v-if="currentUser">
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
      <notifications></notifications>
      <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
      <layout-sidebar-share :background-color.sync="sidebarBackground">
      </layout-sidebar-share>
      <div class="main-panel" :data="sidebarBackground">
        <dashboard-navbar></dashboard-navbar>
        <div class="content-home" @click="toggleSidebar">
          <zoom-center-transition :duration="200" mode="out-in">
            <!-- your content here -->
            <Nuxt></Nuxt>
          </zoom-center-transition>
        </div>
        <layout-footer></layout-footer>
      </div>
    </div>
  </div>

  <div v-else>
    <loading-chasing :loading="true"></loading-chasing>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue'
import DashboardContent from '@/components/Layout/Content.vue'
import { connectSocket, loginSocket } from '@/utils/socket'
import { mapGetters } from 'vuex'
export default {
  components: {
    DashboardNavbar,
    DashboardContent
  },
  middleware: 'auth',
  data() {
    return {
      sidebarBackground: 'vue',
      isSticky: false
    }
  },
  computed: {
    isFullScreenRoute() {
      return this.$route.path === '/maps/full-screen'
    },
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList
      let isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar')
        initScrollbar('main-panel')
        initScrollbar('sidebar-wrapper')
        docClasses.add('perfect-scrollbar-on')
      } else {
        docClasses.add('perfect-scrollbar-off')
      }
    },
    mountedConnectSocket() {
      const vm = this
      connectSocket(vm)
    }
  },
  mounted() {
    this.initScrollbar()
    connectSocket(this)
  }
}
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
