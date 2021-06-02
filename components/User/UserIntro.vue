<template>
  <card class="card-user">
    <h4 class="title">
      {{ $t('Intro') }}
    </h4>
    <div class="card-description">
      <div>
        <i class="tim-icons icon-map-big"></i>
        {{ $t('LiveIn') }} <strong>{{ user.live_at }}</strong>
      </div>
      <div>
        <i class="tim-icons icon-square-pin"></i>
        {{ $t('From') }} <strong>{{ user.from }}</strong>
      </div>
      <div>
        <i class="tim-icons icon-gift-2"></i>
        {{ $t('BirthDay') }} <strong>{{ user.birthday }}</strong>
      </div>
      <div>
        <i class="tim-icons icon-gift-2"></i>
        {{ user.name }}{{ $t('IsFollowing') }}
        <strong>{{ user.follows_count }} </strong>
        {{ $t('People') }}
      </div>
      <div>
        <i class="tim-icons icon-heart-2"></i>
        <strong>{{ user.followeds_count }}</strong>
        {{ $t('PeopleAreFolowing') }}
      </div>
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
  data() {
    return {
      tabIndex: 1
    }
  }
}
</script>
<style lang="scss"></style>
