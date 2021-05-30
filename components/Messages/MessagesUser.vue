<template>
  <router-link
    :to="
      localePath({
        name: 'messages-room_id',
        params: {
          room_id: 1
        }
      })
    "
    class="queue"
    :class="{ active: isActive }"
    ref="ele"
  >
    <div class="left">
      <base-avatar
        :src="user.profile_photo_path"
        alt="avt"
        :size="50"
        status
        :online="false"
        outlined
      ></base-avatar>
    </div>
    <div class="right">
      <div class="name">{{ user.full_name }}</div>
      <div class="artists">
        <a href="#">
          {{ user.onlineStatus }}
        </a>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          url: '',
          name: '',
          profile_photo_path: ''
        }
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    onClick() {}
  },
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.queue {
  padding: 6px;
  display: flex;
  border-radius: 6px;
  position: relative;
  user-select: none;
  margin-top: 3px;
  align-items: center;
  &.active {
    background: var(--primary) !important;
    color: #fff;
    .artists > a {
      color: #ddd !important;
    }
  }
  &:not(.active) .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--cyan);
    opacity: 0.5;
  }
  &:hover,
  &.playing {
    background: var(--alpha-bg);
    border: solid 1px rgba(0, 0, 0, 0.1);
    .cover {
      opacity: 0 !important;
      z-index: -1;
    }
    .left .overlay {
      visibility: visible;
    }
  }
  .left {
  }
  .right {
    padding-left: 10px;
    .name {
      font-weight: 600;
    }
    .artists {
      margin-top: 5px;
      font-size: 12px;
      > a {
        color: var(--text-secondary);
      }
    }
  }
}
</style>
