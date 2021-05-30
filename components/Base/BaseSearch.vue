<template>
  <div class="search-bar">
    <div class="search">
      <i class="tim-icons icon-zoom-split"></i>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="search"
        @keydown.enter="$emit('onSearch', search)"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {},
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss">
.search-bar {
  flex: 1 1;
  margin-left: 10px;
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
</style>
