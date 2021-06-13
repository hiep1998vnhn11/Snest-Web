<template>
  <card>
    <h5 slot="header" class="title">
      {{ $t('EditProfile') }}
    </h5>
    <form @submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-10">
          <base-input
            type="text"
            :label="$t('UrlToYourProfile')"
            :disabled="true"
            v-model="user.url"
          >
          </base-input>
        </div>
        <div class="col-md-2 change-url-button-container">
          <base-button
            type="success"
            block
            class="change-url-button"
            @click="onClickChangeUrl"
          >
            {{ $t('Change') }}
          </base-button>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Username"
            placeholder="Username"
            v-model="user.username"
          >
          </base-input>
        </div>
        <div class="col-md-8">
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
            v-model="user.first_name"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            v-model="user.last_name"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            :label="$t('Fullname')"
            placeholder="Home Address"
            v-model="user.full_name"
            disabled
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
            :label="$t('Locale')"
            placeholder="ZIP Code"
            v-model="user.locale"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input
            type="text"
            :label="$t('Gender')"
            :placeholder="$t('Gender')"
            :disabled="info.gender"
            v-model="info.gender"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            :disabled="info.birthday"
            type="text"
            label="Country"
            placeholder="Country"
            v-model="info.birthday"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            :label="$t('Locale')"
            placeholder="ZIP Code"
            v-model="info.locale"
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

    <el-dialog
      :title="$t('ReqestingChangeUrl')"
      :visible.sync="url.dialog"
      width="500px"
      center
    >
      <loading-chasing :loading="url.loading"></loading-chasing>
      <span>
        It should be noted that the content will not be aligned in center by
        default
      </span>
      <div class="row">
        <div class="col-md-8">
          <base-input
            placeholder="Url"
            v-model="url.text"
            class="mt-1"
            :error="url.error"
            @change="url.error = ''"
            success="sae"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <button type="success" class="btn-success btn" @click="checkUrl">
            {{ $t('Check') }}
          </button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <base-button @click="url.dialog = false">
          {{ $t('Cancel') }}
        </base-button>
        <base-button type="primary" @click="url.dialog = false">
          {{ $t('Confirm') }}
        </base-button>
      </span>
    </el-dialog>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      user: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        url: '',
        locale: '',
        profile_photo_path: '',
        created_at: '',
        gender: '',
        profile_background_path: '',
        birthday: '',
        live_at: '',
        from: '',
        story: '',
        story_privacy: '',
        locale: '',
        show_live_at: '',
        show_from: ''
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
      },
      url: {
        text: '',
        dialog: false,
        loading: false,
        error: ''
      },
      loading: false
    }
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user))
    },
    async checkUrl() {
      if (!this.url.text) return
      this.url.loading = true
      try {
        await this.$axios.$post(`/v1/user/check-url`, {
          url: this.url.text
        })
        this.url.error = ''
        this.toastSuccess(this.$t('ThisUrlCanBeUsed'))
      } catch (err) {
        this.url.error = this.$t('ValidUrl')
      }
      this.url.loading = false
    },
    onClickChangeUrl() {
      this.url.dialog = true
      this.url.text = this.currentUser.url
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
      this.info[key] = this.currentUser.info[key]
    })
  }
}
</script>
<style lang="scss" scoped>
.change-url-button-container {
  display: flex;
  align-items: center;
}
</style>
