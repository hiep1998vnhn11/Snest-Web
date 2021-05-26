<template>
  <div class="user-header">
    {{ currentUser }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        phone_number: '',
        url: '',
        locale: '',
        profile_photo_path: '',
        created_at: ''
      },
      info: {
        gender: '',
        profile_background_path: '',
        birthday: '',
        live_at: '',
        from: '',
        story: '',
        story_privacy: '',
        locale: '',
        show_live_at: '',
        show_from: '',
        jobs: [],
        educates: []
      }
    }
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user))
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {
    Object.keys(this.user).forEach(key => {
      this.user[key] = this.currentUser[key]
    })
    Object.keys(this.info).forEach(key => {
      this.info[key] = this.currentUser.info
    })
  }
}
</script>
<style lang="scss">
.user-header {
  .user-cover-photo {
    position: relative;
    .cover-photo {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 700px;
    }
  }
}
</style>
