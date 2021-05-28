<template>
  <div class="observer"></div>
</template>

<script>
export default {
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect')
      }
    })
    this.observer.observe(this.$el)
  }
}
</script>

<style></style>
