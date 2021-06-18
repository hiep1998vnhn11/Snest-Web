<template>
  <div class="container">
    <div class="error-container">
      <div v-if="error.statusCode === 403">
        <div class="text-center">
          <h1 class="text-warning">
            403
          </h1>
          <h5 class="text-danger">
            {{ $t('Forbiden') }}
          </h5>
          <p class="text-danger">
            {{ $t('AccessForbiden') }}
          </p>
          <div class="error-actions">
            <nuxt-link :to="localePath({ name: 'logout' })">
              {{ $t('Logout') }}
            </nuxt-link>
            <nuxt-link :to="localePath({ name: 'index' })">
              {{ $t('HomePage') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <h1 v-else-if="error.statusCode === 404">
        Page not found
        <NuxtLink to="/">Home page</NuxtLink>
      </h1>
      <div v-else>
        <div class="text-center">
          <h1 class="text-warning">
            500
          </h1>
          <h5 class="text-danger">
            {{ $t('Error') }}
          </h5>
          <p class="text-danger">
            {{ $t('AccessForbiden') }}
          </p>
          <div class="error-actions">
            <nuxt-link :to="localePath({ name: 'logout' })">
              {{ $t('Logout') }}
            </nuxt-link>
            <nuxt-link :to="localePath({ name: 'index' })">
              {{ $t('HomePage') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.error-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  h1 {
    font-size: 12rem;
  }
  h5 {
    font-size: 4rem;
  }

  .error-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
