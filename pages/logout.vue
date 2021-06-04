<template>
  <div></div>
</template>

<script>
export default {
  async fetch({ store, app, error, redirect }) {
    try {
      await store.dispatch('user/logout')
      return redirect(app.localePath({ name: 'login' }))
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style></style>
