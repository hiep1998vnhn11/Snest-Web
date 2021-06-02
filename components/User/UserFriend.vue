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
    <div>{{ friends_count }} {{ $t('Friends') }}</div>
    <div v-for="friend in friends" :key="`friend-card-${friend.id}`">
      {{ Friend }}
    </div>
  </card>
</template>
<script>
export default {
  props: {
    friends: {
      type: Array
    },
    friends_count: {
      type: Number,
      default: 0
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
