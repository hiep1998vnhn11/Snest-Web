<template>
  <div class="base-friend">
    <nuxt-link
      :to="localePath({ name: 'index-user-url', params: { url: friend.url } })"
      class="base-friend-image"
    >
      <img v-lazy="friend.profile_photo_path" alt="avt" />
    </nuxt-link>
    <div class="base-friend-name">
      <user-name
        :user_name="friend.full_name"
        :user_url="friend.url"
      ></user-name>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    friend: {
      type: Object,
      default() {
        return {
          full_name: '',
          url: '',
          profile_photo_path: ''
        }
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
<style lang="scss">
.base-friend {
  width: 100%;
  text-align: center;
  .base-friend-image {
    img {
      border-radius: 5px;
      border: solid 1px rgba(0, 0, 0, 0.05);
      max-width: 100px;
      cursor: pointer;
    }
  }

  .base-friend-name {
    margin-top: 5px;
  }
}
</style>
