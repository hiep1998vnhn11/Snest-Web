<template>
  <card style="position: relative">
    <h5 slot="header" class="title">
      {{ $t('EditProfile') }}
    </h5>
    <form @submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-5">
          <base-input
            type="text"
            label="Company"
            :disabled="true"
            placeholder="Company"
            v-model="user.company"
          >
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input
            type="text"
            label="Username"
            placeholder="Username"
            v-model="user.username"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="email"
            :label="$t('Email address')"
            placeholder="youremail@example.com"
            disabled
            v-model="user.email"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="First Name"
            placeholder="First Name"
            v-model="user.firstName"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            v-model="user.lastName"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Address"
            placeholder="Home Address"
            v-model="user.address"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input
            type="text"
            label="City"
            placeholder="City"
            v-model="user.city"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Country"
            placeholder="Country"
            v-model="user.country"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            label="Postal Code"
            placeholder="ZIP Code"
            v-model="user.postalCode"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="About Me">
            <textarea
              class="form-control"
              placeholder="ZIP Code"
              v-model="user.aboutMe"
            >
            </textarea>
          </base-input>
        </div>
      </div>

      <base-button native-type="submit" type="primary" class="btn-fill">
        Save
      </base-button>
    </form>
  </card>
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
<style></style>
