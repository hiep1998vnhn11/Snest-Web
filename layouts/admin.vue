<template>
  <slide-y-down-transition>
    <div
      class="wrapper"
      :class="{ 'nav-open': $sidebar.showSidebar }"
      v-if="isAdmin"
    >
      <notifications></notifications>
      <side-bar
        :background-color="sidebarBackground"
        :short-title="$t('sidebar.shortTitle')"
        :title="$t('sidebar.title')"
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
              path: localePath({ name: 'admin-icons' })
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.maps'),
              icon: 'tim-icons icon-pin',
              path: localePath({ name: 'admin-google' })
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
      <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
      <layout-sidebar-share :background-color.sync="sidebarBackground">
      </layout-sidebar-share>
      <div class="main-panel" :data="sidebarBackground">
        <dashboard-navbar></dashboard-navbar>
        <div :class="{ content: !isFullScreenRoute }" @click="toggleSidebar">
          <zoom-center-transition :duration="200" mode="out-in">
            <!-- your content here -->
            <Nuxt></Nuxt>
          </zoom-center-transition>
        </div>
        <layout-footer v-if="!isFullScreenRoute"></layout-footer>
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
import { mapGetters } from 'vuex'
export default {
  components: {
    DashboardNavbar,
    DashboardContent
  },
  data() {
    return {
      sidebarBackground: 'vue'
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser', 'isAdmin'])
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
    async checkRole() {
      try {
        await this.$axios.$post('/v1/admin/user/getRole')
        this.$store.commit('user/SET_ADMIN', true)
      } catch (err) {
        this.$nuxt.error(err)
      }
    }
  },
  mounted() {
    this.checkRole()
    this.initScrollbar()
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
