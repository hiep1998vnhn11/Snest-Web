<template>
  <card class="card-user">
    <div class="title flex-sb">
      {{ $t('Friends') }}
      <nuxt-link
        :to="
          localePath({
            name: 'index-user-url-friends',
            params: { url: $route.params.url }
          })
        "
        class=""
      >
        {{ $t('SeeAllFriends') }}
      </nuxt-link>
    </div>
    <div>{{ user.friends_count }} {{ $t('Friends') }}</div>
  </card>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss"></style>
