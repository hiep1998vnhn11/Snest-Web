<template>
  <div class="sidebar" :data="backgroundColor" :home="home">
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <div class="logo" v-if="!home">
        <nuxt-link
          :to="localePath({ path: '/' })"
          class="simple-text logo-mini"
        >
          <img :src="logo" alt="app-logo" />
        </nuxt-link>
        <nuxt-link
          :to="localePath({ path: '/' })"
          class="simple-text logo-normal"
        >
          {{ title }}
        </nuxt-link>
      </div>
      <slot></slot>
      <ul class="nav">
        <slot name="links">
          <sidebar-item
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          >
          </sidebar-item>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    home: {
      type: Boolean,
      default: false,
      description: 'Side bar widtd size'
    },
    title: {
      type: String,
      default: 'Hiệp Trần',
      description: 'Sidebar title'
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title'
    },
    logo: {
      type: String,
      default: '/logo.png',
      description: 'Sidebar app logo'
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: value => {
        let acceptedValues = ['', 'vue', 'blue', 'green', 'primary', 'white']
        return acceptedValues.indexOf(value) !== -1
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  }
}
</script>
<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
