<template>
  <section class="search-section">
    <div class="search-navbar">
      <div class="search">
        <div class="search-bar">
          <div class="search">
            <i class="tim-icons icon-zoom-split"></i>
            <input
              type="text"
              :placeholder="$t('SearchMessage')"
              v-model="search"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="search-content-wraper">
      <perfect-scrollbar ref="search-scrollbar">
        <nuxt-child></nuxt-child>
      </perfect-scrollbar>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {},
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.search-section {
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;
  bottom: 72px;
  padding: 50px 10px 10px 10px;
  .search-navbar {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search-bar {
      flex: 1 1;
      margin-left: 10px;
      min-width: 300px;
      .search {
        padding: 7px 10px;
        background: rgba(0, 0, 0, 0.05);
        max-width: 540px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        &:focus-within {
          background: #fff;
        }
        i {
          font-size: 20px;
          color: #444;
          padding-right: 8px;
          margin-top: 5px;
        }
        input {
          background: transparent !important;
          outline: none !important;
          border: none !important;
          color: #444;
          font-size: 15px;
          width: 100%;
          display: block;
        }
      }
    }
  }
  .search-content-wraper {
    .ps {
      height: 100%;
    }
  }
}
</style>
