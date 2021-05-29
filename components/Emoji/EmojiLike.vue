<template>
  <div class="emoji  emoji--like" @click="$emit('onClickLike')">
    <div class="emoji__hand">
      <div class="emoji__thumb"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.emoji-like-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
