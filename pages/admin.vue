<template>
  <nuxt-child :key="$route.fullPath"></nuxt-child>
</template>
<script>
export default {
  layout: 'admin'
}
</script>
