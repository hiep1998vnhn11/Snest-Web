<template>
  <div class="base-avatar" :style="imgStyle">
    <img
      :src="src"
      :alt="alt"
      :style="imgStyle"
      :class="{
        'avatar-outlined': outlined
      }"
    />
    <span
      v-if="status"
      :style="{ background: online ? 'fuchsia' : 'gray' }"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 40
    },
    src: {
      type: String,
      default: '/img/default-avatar.png'
    },
    outlined: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: 'base-avatar'
    },
    status: {
      type: Boolean,
      default: false
    },
    online: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.base-avatar {
  position: relative;
  img {
    overflow: hidden;
    border-radius: 50%;
  }
  .avatar-outlined {
    border: solid 1px;
    border-color: rgba(1, 1, 1, 0.2);
  }

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    bottom: 2px;
    right: 3px;
  }
}
</style>
