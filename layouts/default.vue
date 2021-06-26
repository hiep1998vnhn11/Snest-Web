<template>
  <slide-y-down-transition>
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
              <Nuxt></Nuxt>
              <!-- your content here -->
            </zoom-center-transition>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <loading-chasing :loading="true"></loading-chasing>
    </div>
  </slide-y-down-transition>
</template>
<script>
import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue'
import DashboardContent from '@/components/Layout/Content.vue'
import { connectSocket } from '@/utils/socket'
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
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    mountedConnectSocket() {
      connectSocket(this)
    }
  },
  mounted() {
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
