<template>
  <div class="message-action">
    <nav :class="{ 'is-sticky': isSticky }">
      <div class="navigation">
        <base-button round icon class="btn-fas" size="sm">
          <i class="fas fa-plus-circle"></i>
        </base-button>
        <base-button round icon class="btn-fas" size="sm">
          <i class="tim-icons icon-image-02"></i>
        </base-button>
      </div>
      <div class="text-area">
        <base-input></base-input>
      </div>
      <div class="left">
        <base-button icon round class="btn-fas">
          <i class="tim-icons icon-send"></i>
        </base-button>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isSticky: true
    }
  },
  methods: {},
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
$top-height: 70px;
.message-action {
  nav {
    padding: 0 20px;
    height: $top-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1112;
    background: whitesmoke;
    border-top: solid 1px rgba(0, 0, 0, 0.1);
    &.is-sticky {
      background: var(--background);
      box-shadow: 0 3px 5px var(--sticky-header-box-shadow);
    }
    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.is-sticky {
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
    }
    .text-area {
      flex: 1;
    }

    .left {
      margin-right: 15px;
      margin-left: 15px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
