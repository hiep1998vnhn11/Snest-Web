<template>
  <div class="test">
    <div class="test__1">
      123
    </div>
    <div class="test__2">321</div>
  </div>
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
<style lang="scss">
.test {
  display: flex;
  width: 100%;
  height: 500px;
  background: red;
  flex-direction: column-reverse;
  .test__1 {
    display: flex;
    width: 100%;
  }

  .test__2 {
    display: flex;
    width: 100%;
  }
}
</style>
