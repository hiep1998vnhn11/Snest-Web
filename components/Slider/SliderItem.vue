<template>
  <div>
    <div
      class="item-wrapper"
      :class="{
        hidden: hide,
        current: currentIndex === index,
        prev: isPrev,
        next: isNext
      }"
    >
      <router-link class="slider-card" :to="slider.link" :title="slider.title">
        <div class="image">
          <img :src="slider.banner" alt="banner" />
        </div>
        <div class="content"></div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    slider: {
      type: Object,
      required: true
    },
    hide: {
      type: Boolean
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    total: {
      type: Number
    }
  },
  data() {
    return {}
  },
  methods: {
    checkCtrlClass(action) {
      let localIndex = 0
      if (action === 'prev') {
        localIndex = this.index + 1
        if (localIndex > Number(this.total) - 1) {
          localIndex = 0
        }
      } else if (action === 'next') {
        localIndex = this.index - 1
        if (localIndex < 0) {
          localIndex = Number(this.total) - 1
        }
      }
      return this.currentIndex === localIndex
    }
  },
  created() {},
  computed: {
    isNext() {
      return this.checkCtrlClass('next')
    },
    isPrev() {
      return this.checkCtrlClass('prev')
    }
  },
  mounted() {}
}
</script>
<style lang="scss"></style>
