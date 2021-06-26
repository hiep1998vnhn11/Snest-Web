<template>
  <div class="error">
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
        <div v-else-if="error.statusCode === 404">
          <div class="text-center">
            <h1 class="text-warning">
              404
            </h1>
            <h5 class="text-danger">
              {{ $t('Error') }}
            </h5>
            <p class="text-danger">
              {{ $t('PageNotFound') }}
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
        <div v-else>
          <div class="text-center">
            <h1 class="text-warning">
              500
            </h1>
            <h5 class="text-danger">
              {{ $t('Error') }}
            </h5>
            <p class="text-danger">
              {{ $t('ServerError') }}
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
.error {
  display: flex;
  position: fixed;
  z-index: 3000;
  background: white;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
}
</style>
