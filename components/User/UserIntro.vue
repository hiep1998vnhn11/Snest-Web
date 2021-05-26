<template>
  <card class="card-user">
    <h4 class="title">
      {{ $t('Intro') }}
    </h4>
    <div class="card-description">
      <p>
        <i class="tim-icons icon-map-big"></i>
        {{ $t('LiveIn') }} <strong>{{ user.info.live_at }}</strong>
      </p>
      <p>
        <i class="tim-icons icon-square-pin"></i>
        {{ $t('From') }} <strong>{{ user.info.from }}</strong>
      </p>
      <p>
        <i class="tim-icons icon-gift-2"></i>
        {{ $t('BirthDay') }} <strong>{{ user.info.birthday }}</strong>
      </p>
    </div>
  </card>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data: {
    tabIndex: 1
  }
}
</script>
<style lang="scss">
.user-cover-photo {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
