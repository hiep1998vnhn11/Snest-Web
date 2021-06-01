<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown" class="settings-icon">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown"> </i>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title">Sidebar Background</li>
        <li class="adjustments-line">
          <a class="switch-trigger background-color">
            <div class="badge-colors text-center">
              <span
                v-for="item in sidebarColors"
                :key="item.color"
                class="badge filter"
                :class="[`badge-${item.color}`, { active: item.active }]"
                :data-color="item.color"
                @click="changeSidebarBackground(item)"
              ></span>
            </div>
            <div class="clearfix"></div>
          </a>
        </li>

        <li class="header-title">Sidebar Mini</li>
        <li class="adjustments-line">
          <div class="togglebutton switch-change-color mt-3">
            <span class="label-switch">LIGHT MODE</span>
            <base-switch v-model="darkMode" @input="toggleMode"></base-switch>
            <span class="label-switch label-right">DARK MODE</span>
          </div>
        </li>

        <li class="button-container mt-4"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layout-sidebar-share',
  props: {
    backgroundColor: String
  },
  data() {
    return {
      sidebarMini: true,
      darkMode: false,
      isOpen: false,
      sidebarColors: [
        { color: 'primary', active: false, value: 'primary' },
        { color: 'vue', active: true, value: 'vue' },
        { color: 'info', active: false, value: 'blue' },
        { color: 'success', active: false, value: 'green' }
      ]
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    },
    toggleList(list, itemToActivate) {
      list.forEach(listItem => {
        listItem.active = false
      })
      itemToActivate.active = true
    },
    changeSidebarBackground(item) {
      this.$emit('update:backgroundColor', item.value)
      this.toggleList(this.sidebarColors, item)
    },
    toggleMode(type) {
      let docClasses = document.body.classList
      if (type) {
        docClasses.remove('white-content')
      } else {
        docClasses.add('white-content')
      }
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize()
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/assets/sass/dashboard/custom/variables';

.settings-icon {
  cursor: pointer;
}

.badge-vue {
  background-color: $vue;
}
</style>
