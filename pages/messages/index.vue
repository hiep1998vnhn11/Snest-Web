<template>
  <div>
    Main messagte
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>

<style></style>
